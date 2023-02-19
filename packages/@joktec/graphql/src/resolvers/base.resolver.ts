import { Args, Mutation, Query } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

export interface IBaseResolverProps {
  viewDto: any;
  createInput: any;
  updateInput: any;
  listQueryInput: any;
  listViewDto: any;
  name: any;
  pluralName: any;
}

export const BaseResolver = <CREATEINPUT, UPDATEINPUT, LISTQUERYINPUT>({
  viewDto,
  createInput,
  updateInput,
  listQueryInput,
  listViewDto,
  name,
  pluralName,
}: IBaseResolverProps): any => {
  const nameCapitalize = name.charAt(0).toUpperCase() + name.slice(1);
  const createMutationName = `create${nameCapitalize}`;
  const updateMutationName = `update${nameCapitalize}`;
  const deleteMutationName = `delete${nameCapitalize}`;
  class Resolver {
    constructor(private readonly baseMicroservice: ClientProxy, private message: any) {}

    @Query(() => listViewDto, { name: pluralName })
    async findAll(
      @Args('query', {
        type: () => listQueryInput,
        nullable: true,
        defaultValue: {},
      })
      query: LISTQUERYINPUT,
    ) {
      const { condition, pagination } = query as any;
      return await firstValueFrom(
        this.baseMicroservice.send(this.message.LIST, {
          condition,
          pagination,
        }),
      );
    }

    @Query(() => viewDto, { name })
    async findOne(@Args('id', { type: () => String }) id: string) {
      return await firstValueFrom(this.baseMicroservice.send(this.message.GET, { id }));
    }

    // @Mutation(() => viewDto, { name: createMutationName })
    // async create(
    //   @Args("input", { type: () => createInput }) input: CREATEINPUT
    // ) {
    //   const response = await firstValueFrom(
    //     this.baseMicroservice.send(this.message.CREATE, {
    //       input,
    //     })
    //   );

    //   return response;
    // }

    // @Mutation(() => viewDto, { name: updateMutationName })
    // async update(
    //   @Args("id", { type: () => String }) id: string,
    //   @Args("input", { type: () => updateInput }) input: UPDATEINPUT
    // ) {
    //   const response = await firstValueFrom(
    //     this.baseMicroservice.send(this.message.UPDATE, {
    //       id,
    //       input,
    //     })
    //   );

    //   return response;
    // }

    // @Mutation(() => viewDto, { name: deleteMutationName })
    // async delete(@Args("id", { type: () => String }) id: string) {
    //   const response = await firstValueFrom(
    //     this.baseMicroservice.send(this.message.DELETE, { id })
    //   );

    //   return response;
    // }
  }

  return Resolver;
};
