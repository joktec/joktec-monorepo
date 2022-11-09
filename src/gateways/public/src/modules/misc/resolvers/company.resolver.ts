import { Company } from '@jobhopin/graphql';
import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql';
@Resolver(() => Company)
export class CompanyResolver {
  @ResolveField()
  async organization(@Parent() parent, @Context() { loaders }) {
    try {
      return loaders.organization.load(parent.organizationId);
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}
