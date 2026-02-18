import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createJobDto: CreateJobDto, userId: number) {
    const newJob = this.jobRepository.create({
      ...createJobDto,
      userId: userId,
    });
    return this.jobRepository.save(newJob);
  }

  async findAll(userId: number) {
    return this.jobRepository.find({
      where: { userId: userId },
      order: { id: 'DESC' }
    });
  }

  async getJobStats(userId: number) {
    return this.jobRepository
      .createQueryBuilder('job')
      .select('job.status', 'status')
      .addSelect('COUNT(job.id)', 'count')
      .where('job.userId = :userId', { userId })
      .groupBy('job.status')
      .getRawMany();
  }

  async findOne(id: number) {
    const job = await this.jobRepository.findOne({ where: { id } });
    if (!job) throw new NotFoundException(`${id} numaralı iş bulunamadı.`);
    return job;
  }

  async update(id: number, updateJobDto: UpdateJobDto) {
    await this.jobRepository.update(id, updateJobDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.jobRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Silinecek iş bulunamadı.');
    return { success: true };
  }
}