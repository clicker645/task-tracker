// import { RolesGuard } from './../auth/guards/roles.guard';
// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   Patch,
//   Post,
//   Query,
//   ValidationPipe,
//   UseGuards,
//   Req,
// } from '@nestjs/common';
// import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
// import { ItemService } from './item.service';
// import { PaginationOptions } from '../../infrastructure/databases/mongoose/pagination/paginate.params';
// import { CreateItemDto } from './dto/create-item.dto';
// import { UpdateItemDto } from './dto/update-item.dto';
// import { VerifyToken } from '../auth/token/decorators/verify-token.decorator';
// import { ITokenPayload } from '../auth/token/interfaces/token-payload.interface';
// import { Roles } from '../auth/decorators/roles.decorator';
// import { JwtAuthGuard } from '../auth/guards/jwt.guard';

// @ApiBearerAuth()
// @ApiTags('item')
// @Controller('item')
// @UseGuards(RolesGuard)
// export class ItemController {
//   constructor(private readonly itemService: ItemService) {}

//   @Get('/')
//   @UseGuards(JwtAuthGuard)
//   @Roles('admin')
//   async get(
//     @VerifyToken() tokenUser: ITokenPayload,
//     @Query(new ValidationPipe()) pagination: PaginationOptions,
//   ) {
//     return this.itemService.getByUser(tokenUser._id, pagination);
//   }

//   @Post('/')
//   async create(
//     @VerifyToken() tokenUser: ITokenPayload,
//     @Body(new ValidationPipe()) data: CreateItemDto,
//   ) {
//     return this.itemService.create(tokenUser._id, data);
//   }

//   @Patch('/:id')
//   async update(
//     @VerifyToken() tokenUser: ITokenPayload,
//     @Param('id') id: string,
//     @Body(new ValidationPipe()) data: UpdateItemDto,
//   ) {
//     return this.itemService.update(tokenUser._id, id, data);
//   }

//   @Get('/shared')
//   async getSharedItems(
//     @VerifyToken() tokenUser: ITokenPayload,
//     @Query() pagination: PaginationOptions,
//   ) {
//     return this.itemService.getSharedItems(tokenUser._id, pagination);
//   }

//   @Get('/history/:id')
//   async getHistoryBy(
//     @Param('id') id: string,
//     @Query() pagination: PaginationOptions,
//   ) {
//     return this.itemService.getHistoryBy(id, pagination);
//   }

//   @Delete('/:id')
//   delete(@VerifyToken() tokenUser: ITokenPayload, @Param('id') id: string) {
//     return this.itemService.delete(tokenUser._id, id);
//   }
// }
