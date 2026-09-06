import { Injectable } from '@nestjs/common';
import { TypesOfProductions } from './types_of_productions.model.js';

@Injectable()
export class TypesOfProductionsService {
  private readonly types_of_productions_list: TypesOfProductions[] = [
    {
      production_id: 1,
      craft_title: 'Гончарное производство',
      production_output_rate: 150,
      defect_waste_quantity: 18,
      dating_century: 4,
      technological_cycle_hours: 48,
      status: 'published',
      image_key: 'pottery.jpg',
      video_key: 'pottery_video.mp4',
      user_liked_ids: [10, 15, 20],
    },
    {
      production_id: 2,
      craft_title: 'Металлургия',
      production_output_rate: 40,
      defect_waste_quantity: 65,
      dating_century: 9,
      technological_cycle_hours: 72,
      status: 'published',
      image_key: 'metallurgy.jpg',
      video_key: 'metallurgy_video.mp4',
      user_liked_ids: [10, 33],
    },
    {
      production_id: 3,
      craft_title: 'Кожевенное дело',
      production_output_rate: 85,
      defect_waste_quantity: 12,
      dating_century: 11,
      technological_cycle_hours: 24,
      status: 'published',
      image_key: 'leather.jpg',
      video_key: 'leather_video.mp4',
      user_liked_ids: [10, 15, 45, 99],
    },
    {
      production_id: 4,
      craft_title: 'Деревообработка',
      production_output_rate: 60,
      defect_waste_quantity: 30,
      dating_century: 7,
      technological_cycle_hours: 36,
      status: 'draft',
      image_key: 'woodworking.jpg',
      video_key: 'woodworking_video.mp4',
      user_liked_ids: [],
    },
    {
      production_id: 5,
      craft_title: 'Ткачество',
      production_output_rate: 20,
      defect_waste_quantity: 80,
      dating_century: 3,
      technological_cycle_hours: 90,
      status: 'deleted',
      image_key: 'weaving.jpg',
      video_key: 'weaving_video.mp4',
      user_liked_ids: [],
    },
  ];

  private get_visible(): TypesOfProductions[] {
    return this.types_of_productions_list.filter((item) => item.status !== 'deleted');
  }

  find_all_published(min_rate?: number) {
    return this.get_visible()
      .filter((item) => item.status === 'published')
      .filter((item) => (min_rate ? item.production_output_rate >= min_rate : true));
  }

  find_draft(): TypesOfProductions | undefined {
    return this.types_of_productions_list.find((item) => item.status === 'draft');
  }

  find_feed_item(id?: number, next?: boolean): TypesOfProductions | undefined {
    const list = this.get_visible().filter((item) => item.status === 'published');
    if (!id) return list[0];

    const index = list.findIndex((item) => item.production_id === id);
    if (index === -1) return list[0];

    if (next) {
      return list[index + 1] ?? list[0];
    }
    return list[index];
  }

  count_likes(item: TypesOfProductions): number {
    return item.user_liked_ids.length;
  }
}