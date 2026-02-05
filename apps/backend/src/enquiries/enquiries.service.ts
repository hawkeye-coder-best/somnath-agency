import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enquiry } from '../entities/enquiry.entity';

@Injectable()
export class EnquiriesService {
    constructor(
        @InjectRepository(Enquiry)
        private enquiriesRepository: Repository<Enquiry>,
    ) { }

    create(enquiryData: Partial<Enquiry>) {
        return this.enquiriesRepository.save(enquiryData);
    }

    findAll() {
        return this.enquiriesRepository.find({
            order: { createdAt: 'DESC' }
        });
    }

    async updateStatus(id: number, status: string) {
        await this.enquiriesRepository.update(id, { status });
        return this.enquiriesRepository.findOneBy({ id });
    }

    remove(id: number) {
        return this.enquiriesRepository.delete(id);
    }
}
