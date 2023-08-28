import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { CreatePublicationDto } from './dto/create-publication.dto';


@Controller('publication')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Get("health")
  getHealthPotsController(): string {
      return this.publicationService.getHealthPublications();
  }

  @Post()
  create(@Body() createPublicationDto: CreatePublicationDto) {
    return this.publicationService.addNewPublication(createPublicationDto);
  }

  @Get()
  findAll(@Query("published") published: string = null, @Query("after") after: Date = null): Promise<CreatePublicationDto[]> {
    return this.publicationService.getAllPublications(published, after);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicationService.getPublicationById(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePublicationDto: CreatePublicationDto) {
    return this.publicationService.updatePublication(Number(id), updatePublicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicationService.deletePublicationById(Number(id));
  }
}
