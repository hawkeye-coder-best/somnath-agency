import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreConfig } from '../entities/store-config.entity';

@Injectable()
export class StoreConfigService {
    constructor(
        @InjectRepository(StoreConfig)
        private configRepository: Repository<StoreConfig>,
    ) { }

    async getConfig(): Promise<StoreConfig> {
        const config = await this.configRepository.findOne({ where: { id: 1 } });
        if (!config) {
            // Create default config if not exists
            return this.configRepository.save({
                name: 'Somnath Agency',
                phone: '+91 98765 43210',
                email: 'sales@somnathagency.com',
                address: '123, Main Market Road, Mumbai',
            });
        }
        return config;
    }

    async updateConfig(config: Partial<StoreConfig>): Promise<StoreConfig> {
        await this.configRepository.update(1, config);
        return this.getConfig();
    }
}
