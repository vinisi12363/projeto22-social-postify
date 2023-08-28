import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { MediasService } from './medias.service';
import { CreateMediaDto } from './dto/create-media.dto';

@Controller('medias')
export class MediasController {
  constructor(private readonly mediasService: MediasService) {}

  @Post()
  create(@Body() createMediaDto: CreateMediaDto) {
    return this.mediasService.create(createMediaDto);
  }

  @Get()
  findAll() {
    return this.mediasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mediasService.findMediaById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMediaDto: CreateMediaDto) {
    return this.mediasService.updateMediaById(+id, updateMediaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mediasService.removeMediaById(Number(id));
  }
  
}
