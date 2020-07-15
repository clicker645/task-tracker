// import { ItemService } from './item.service';
// import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
// import { ItemType } from './types/item.type';
// import { PaginateItems } from './types/paginate-items.type';
// import { QueryItemDto } from './dto/item.args';
// import { CreateItemDto } from './dto/create-item.dto';
//
// @Resolver(of => ItemType)
// export class ItemResolver {
//   constructor(private readonly itemService: ItemService) {}
//
//   @Query(returns => PaginateItems)
//   async items(@Args() args: QueryItemDto): Promise<PaginateItems> {
//     return this.itemService.get(args);
//   }
//
//   @Query(returns => PaginateItems)
//   async itemsByUser(@Args() args: QueryItemDto): Promise<PaginateItems> {
//     return this.itemService.getByUser('', args);
//   }
//
//   @Mutation(returns => ItemType)
//   async addItem(@Args('input') newItemData: CreateItemDto) {
//     return this.itemService.create('', newItemData);
//   }
// }
