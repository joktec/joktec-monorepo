import { Industry } from '@jobhopin/graphql';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
@Resolver(() => Industry)
export class IndustryResolver {
  @ResolveField()
  async localizedName(@Parent() parent) {
    try {
      return { vi: parent.name, en: parent.nameEng };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
