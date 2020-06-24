import { PaginationOptions } from '../../../infrastructure/databases/mongoose/pagination/paginate.params';
import { ArgsType } from '@nestjs/graphql';

@ArgsType()
export class ItemArgs extends PaginationOptions {}
