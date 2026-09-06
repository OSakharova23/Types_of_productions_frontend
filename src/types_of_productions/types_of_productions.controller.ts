import { Controller, Get, Param, Query, Render, Res } from '@nestjs/common';
import type { Response } from 'express';
import { TypesOfProductionsService } from './types_of_productions.service.js';
import { TypesOfProductions } from './types_of_productions.model.js';

@Controller('types_of_productions')
export class TypesOfProductionsController {
  constructor(private readonly types_of_productions_service: TypesOfProductionsService) {}

  // 1. ПЛИТКА: GET /types_of_productions
  @Get()
  @Render('types_of_productions_tile')
  render_tile(@Query('production_output_rate') production_output_rate?: string) {
    const parsed_rate = production_output_rate ? Number(production_output_rate) : undefined;
    const list = this.types_of_productions_service.find_all_published(parsed_rate);

    const items_with_likes = list.map((item: TypesOfProductions) => ({
      ...item,
      likes_count: this.types_of_productions_service.count_likes(item),
    }));

    return {
      title: 'Типы производств',
      search_rate: production_output_rate ?? '',
      productions: items_with_likes,
    };
  }

  // 2. ДОБАВЛЕНИЕ (ЧЕРНОВИК): GET /types_of_productions/draft
  @Get('draft')
  @Render('types_of_productions_add')
  render_draft() {
    const draft = this.types_of_productions_service.find_draft();
    return {
      title: 'Черновик типа производства',
      draft,
    };
  }

  // 3. ЛЕНТА: GET /types_of_productions/feed (первый элемент)
  @Get('feed')
  render_feed_first(@Res() res: Response) {
    const item = this.types_of_productions_service.find_feed_item(undefined, false);
    return res.render('types_of_productions_feed', {
      title: item ? item.craft_title : 'Не найдено',
      item,
      likes_count: item ? this.types_of_productions_service.count_likes(item) : 0,
    });
  }

  // 4. ЛЕНТА: GET /types_of_productions/feed/:id
  @Get('feed/:id')
  render_feed_with_id(
    @Param('id') id: string,
    @Query('next') next: string,
    @Res() res: Response,
  ) {
    const parsed_id = Number(id);
    const is_next = next === 'true';
    const item = this.types_of_productions_service.find_feed_item(parsed_id, is_next);

    if (is_next && item) {
      return res.redirect(`/types_of_productions/feed/${item.production_id}`);
    }

    return res.render('types_of_productions_feed', {
      title: item ? item.craft_title : 'Не найдено',
      item,
      likes_count: item ? this.types_of_productions_service.count_likes(item) : 0,
    });
  }
}