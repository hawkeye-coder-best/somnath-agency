import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreConfigService } from './store-config.service';
import { StoreConfigController } from './store-config.controller';
import { StoreConfig } from '../entities/store-config.entity';

@Module({
    imports: [TypeOrmModule.forFeature([StoreConfig])],
    controllers: [StoreConfigController],
    providers: [StoreConfigService],
})
export class StoreConfigModule { }
