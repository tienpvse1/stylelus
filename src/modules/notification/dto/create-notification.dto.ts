import { IsString, Length } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @Length(1)
  senderId: string;
  @IsString()
  @Length(1)
  receiverId: string;
}
