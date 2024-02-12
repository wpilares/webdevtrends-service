import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateNewsDto {
  @IsString()
  author: string;

  @IsNumber()
  storyId: number;

  @IsString()
  storyTitle: string;

  @IsString()
  storyURL: string;

  @IsDate()
  createdAt: Date;
}
