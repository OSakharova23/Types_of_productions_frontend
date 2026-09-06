import { Module } from '@nestjs/common';
import { TypesOfProductionsController } from './types_of_productions.controller.js';
import { TypesOfProductionsService } from './types_of_productions.service.js';

@Module({
  controllers: [TypesOfProductionsController],
  providers: [TypesOfProductionsService],
})
export class TypesOfProductionsModule {}