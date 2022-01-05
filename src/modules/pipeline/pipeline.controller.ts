import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PipelineService } from './pipeline.service';
import { CreatePipelineDto } from './dto/create-pipeline.dto';
import { UpdatePipelineDto } from './dto/update-pipeline.dto';
import { FindManyOptions, getCustomRepository } from 'typeorm';
import { Pipeline } from './entities/pipeline.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AUTHORIZATION } from 'src/constance/swagger';
import { AccountRepository } from '../account/account.repository';
import { Account } from '../account/entities/account.entity';
import { User } from 'src/common/decorators/user.decorator';

@Controller('pipeline')
@ApiBearerAuth(AUTHORIZATION)
@ApiTags('pipeline')
export class PipelineController {
  constructor(private readonly pipelineService: PipelineService) {}

  @Post()
  create(@Body() { name }: CreatePipelineDto, @User('id') accountId: string) {
    const accountRepository = getCustomRepository(AccountRepository);
    return this.pipelineService.addWithRelation<Account>(
      { name },
      accountId,
      accountRepository,
      'pipeline',
    );
  }

  @Get()
  findAll(@Body() filter: FindManyOptions<Pipeline>) {
    return this.pipelineService.findMany(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pipelineService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePipelineDto: UpdatePipelineDto,
  ) {
    return this.pipelineService.update(id, updatePipelineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pipelineService.delete(id);
  }
}
