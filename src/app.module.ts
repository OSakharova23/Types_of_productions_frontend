import { Module } from '@nestjs/common';
import { ProductionTypesModule } from './production_types/production_types.module.js';

@Module({
  imports: [ProductionTypesModule],
})
export class AppModule {}