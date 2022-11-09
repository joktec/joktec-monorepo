import { Module } from '@nestjs/common';
import { OrganizationArticleService } from './organization-article.service';
import { OrganizationArticleController } from './organization-article.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationArticle, OrganizationArticleSchema } from './schemas/organization-article.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OrganizationArticle.name, schema: OrganizationArticleSchema }]),
  ],
  controllers: [OrganizationArticleController],
  providers: [OrganizationArticleService]
})
export class OrganizationArticleModule {}
