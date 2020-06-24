import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import mongoose from 'mongoose';
import { AccessType } from '../enums/access-type.enum';

export class CreateShareItemDto {
  @ApiProperty()
  @IsString()
  itemId: mongoose.Types.ObjectId;

  @ApiProperty()
  @IsString()
  userId: mongoose.Types.ObjectId;

  @ApiProperty({ enum: AccessType })
  @IsNumber()
  accessType: number;
}
