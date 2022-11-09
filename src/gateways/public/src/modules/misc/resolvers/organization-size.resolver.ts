import { OrganizationSize } from '@jobhopin/graphql';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
@Resolver(() => OrganizationSize)
export class OrganizationSizeResolver {
  @ResolveField()
  async localizedName(@Parent() parent) {
    try {
      return { vi: parent.name, en: parent.nameEn };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
