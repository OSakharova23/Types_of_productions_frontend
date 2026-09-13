import { Module } from '@nestjs/common';
import { ProductionTypesController } from './production_types.controller.js';
import { ProductionTypesService } from './production_types.service.js';

@Module({
  controllers: [ProductionTypesController],
  providers: [ProductionTypesService],
})
export class ProductionTypesModule {}