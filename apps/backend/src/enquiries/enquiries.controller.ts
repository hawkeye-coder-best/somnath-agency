import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EnquiriesService } from './enquiries.service';
import { Enquiry } from '../entities/enquiry.entity';

@Controller('enquiries')
export class EnquiriesController {
    constructor(private readonly enquiriesService: EnquiriesService) { }

    @Post()
    create(@Body() enquiryData: Partial<Enquiry>) {
        return this.enquiriesService.create(enquiryData);
    }

    @Get()
    findAll() {
        return this.enquiriesService.findAll();
    }

    @Patch(':id/status')
    updateStatus(@Param('id') id: string, @Body('status') status: string) {
        return this.enquiriesService.updateStatus(+id, status);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.enquiriesService.remove(+id);
    }
}
