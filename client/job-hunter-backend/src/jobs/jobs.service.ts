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

  update(id: number, updateJobDto: UpdateJobDto) {
    return this.jobRepository.update(id, updateJobDto);
  }

  remove(id: number) {
    return this.jobRepository.delete(id);
  }
}