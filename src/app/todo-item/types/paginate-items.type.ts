import { Paginated } from '../../../infrastructure/databases/mongoose/pagination/pagination.output';
import { ItemType } from './item.type';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginateItems extends Paginated(ItemType) {}
