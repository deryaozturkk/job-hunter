import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job } from './entities/job.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
  ) {}

  create(createJobDto: CreateJobDto) {
    return this.jobRepository.save(createJobDto);
  }

  findAll() {
    return this.jobRepository.find();
  }

  findOne(id: number) {
    return this.jobRepository.findOneBy({ id });
  }

  async update(id: number, updateJobDto: UpdateJobDto) {
    await this.jobRepository.update(id, updateJobDto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.jobRepository.delete(id);
  }
  
  // İstatistikleri getiren metot
  async getJobStats() {
    return this.jobRepository
      .createQueryBuilder('job')
      .select('job.status', 'status')
      .addSelect('COUNT(job.id)', 'count')
      .groupBy('job.status')
      .getRawMany();
  }
}