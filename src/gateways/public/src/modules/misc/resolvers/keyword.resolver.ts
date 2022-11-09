import { Keyword } from '@jobhopin/graphql';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
@Resolver(() => Keyword)
export class KeywordResolver {
  @ResolveField()
  async localizedName(@Parent() parent) {
    try {
      return { vi: parent.content, en: parent.contentEng };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
