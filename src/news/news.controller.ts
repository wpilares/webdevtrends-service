import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  create(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.create(createNewsDto);
  }

  @Cron(CronExpression.EVERY_HOUR)
  @ApiOperation({ summary: 'Save news periodically' })
  saveNewsPeriodic() {
    return this.newsService.saveNewsPeriodic();
  }

  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(+id);
  }
}
