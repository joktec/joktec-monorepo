import { JobTitle } from '@jobhopin/graphql';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
@Resolver(() => JobTitle)
export class JobTitleResolver {
  @ResolveField()
  async localizedName(@Parent() parent) {
    try {
      return { vi: parent.name, en: parent.nameEn };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
