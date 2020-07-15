import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { AccessType } from '../share-item.entity';

export class CreateShareItemDto {
  @ApiProperty()
  @IsString()
  itemId: string;

  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty({ enum: AccessType })
  @IsNumber()
  accessType: number;
}
