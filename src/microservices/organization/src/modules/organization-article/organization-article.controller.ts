import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrganizationArticleService } from './organization-article.service';
import { CreateOrganizationArticleDto } from './dto/create-organization-article.dto';
import { UpdateOrganizationArticleDto } from './dto/update-organization-article.dto';

@Controller()
export class OrganizationArticleController {
  constructor(private readonly organizationArticleService: OrganizationArticleService) {}

  @MessagePattern('createOrganizationArticle')
  create(@Payload() createOrganizationArticleDto: CreateOrganizationArticleDto) {
    return this.organizationArticleService.create(createOrganizationArticleDto);
  }

  @MessagePattern('findAllOrganizationArticle')
  findAll() {
    return this.organizationArticleService.findAll();
  }

  @MessagePattern('findOneOrganizationArticle')
  findById(@Payload() id: string) {
    return this.organizationArticleService.findById(id);
  }

  @MessagePattern('updateOrganizationArticle')
  update(@Payload() updateOrganizationArticleDto: UpdateOrganizationArticleDto) {
    return this.organizationArticleService.update(updateOrganizationArticleDto.id, updateOrganizationArticleDto);
  }

  @MessagePattern('removeOrganizationArticle')
  remove(@Payload() id: string) {
    return this.organizationArticleService.remove(id);
  }
}
