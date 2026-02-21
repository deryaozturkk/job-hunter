import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ParseIntPipe } from '@nestjs/common';

@Controller('jobs')
@UseGuards(JwtAuthGuard) //jwt.strategy.ts dosyasındaki validate() metodundan gelen verinin varlığını kontrol eder.
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  create(@Body() createJobDto: CreateJobDto, @Request() req) {
    // req.user.userId -> JWT'den gelen ID'yi servise gönderiyoruz
    return this.jobsService.create(createJobDto, req.user.userId);
  }

  @Get()
  findAll(@Request() req) {
    return this.jobsService.findAll(req.user.userId);
  }

  @Get('stats')
  getStats(@Request() req) {
    return this.jobsService.getJobStats(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) { // kod tekrarından kaçınmak ve veri güvenliği için Built-in Pipe'ları tercih ettim.
    return this.jobsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(+id, updateJobDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.jobsService.remove(id);
  }
}