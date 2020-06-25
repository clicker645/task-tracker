import { ItemService } from './item.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ItemType } from './types/item.type';
import { PaginateItems } from './types/paginate-items.type';
import { ItemArgs } from './dto/item.args';
import { CurrentUser } from '../auth/token/decorators/verify-token.decorator';
import { ITokenPayload } from '../auth/token/interfaces/token-payload.interface';
import { CreateItemDto } from './dto/create-item.dto';

@Resolver(of => ItemType)
export class ItemResolver {
  constructor(private readonly itemService: ItemService) {}

  @Query(returns => PaginateItems)
  async items(@Args() args: ItemArgs): Promise<PaginateItems> {
    return this.itemService.get(args);
  }

  @Query(returns => PaginateItems)
  async itemsByUser(
    @Args() args: ItemArgs,
    @CurrentUser() currentUser: ITokenPayload,
  ): Promise<PaginateItems> {
    return this.itemService.getByUser(currentUser._id, args);
  }

  @Mutation(returns => ItemType)
  async addItem(
    @Args('input') newItemData: CreateItemDto,
    @CurrentUser() currentUser: ITokenPayload,
  ) {
    return this.itemService.create(currentUser._id, newItemData);
  }
}
