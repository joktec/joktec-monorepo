import { HighlightCompany } from '@jobhopin/graphql';
import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql';
@Resolver(() => HighlightCompany)
export class HighlightCompanyResolver {
  @ResolveField()
  async organization(@Parent() highlightCompany, @Context() { loaders }) {
    try {
      return loaders.organization.load(highlightCompany.organizationId);
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}
