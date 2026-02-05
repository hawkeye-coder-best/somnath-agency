import { Controller, Get, Put, Body } from '@nestjs/common';
import { StoreConfigService } from './store-config.service';
import { StoreConfig } from '../entities/store-config.entity';

@Controller('config')
export class StoreConfigController {
    constructor(private readonly configService: StoreConfigService) { }

    @Get()
    getConfig() {
        return this.configService.getConfig();
    }

    @Put()
    updateConfig(@Body() config: Partial<StoreConfig>) {
        return this.configService.updateConfig(config);
    }
}
