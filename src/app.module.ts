import { Module } from '@nestjs/common';
import { TypesOfProductionsModule } from './types_of_productions/types_of_productions.module.js';

@Module({
  imports: [TypesOfProductionsModule],
})
export class AppModule {}