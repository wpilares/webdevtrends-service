import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from './entities/news.entity';

interface HitsInterface {
  author: string;
  story_id: number;
  story_title: string;
  story_url: string;
  created_at: Date;
}

@Injectable()
export class NewsService {
  private readonly logger = new Logger('NewsService');

  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
  ) {}

  async create(createNewsDto: CreateNewsDto) {
    try {
      const news = this.newsRepository.create(createNewsDto);
      await this.newsRepository.save(news);
      return news;
    } catch (error) {
      this.logger.error(`Error creating news: ${createNewsDto.storyId}`, error);
      return null;
    }
  }

  async findAll() {
    return await this.newsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} news`;
  }

  remove(id: number) {
    return `This action removes a #${id} news`;
  }

  async fetchApi() {
    try {
      this.logger.log('Getting data from the API');
      const response = await axios.get<any>(
        'https://hn.algolia.com/api/v1/search_by_date?query=software',
      );
      const hits: HitsInterface[] = response.data.hits;
      return hits.map(
        ({ author, story_title, story_id, story_url, created_at }) => ({
          author,
          storyTitle: story_title,
          storyId: story_id,
          storyURL: story_url,
          createdAt: created_at,
        }),
      );
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async saveNewsPeriodic() {
    try {
      const newsList = await this.fetchApi();
      for (let i = 0; i < newsList.length; i++) {
        await this.create(newsList[i]);
      }
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  private handleExceptions(error: any) {
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
