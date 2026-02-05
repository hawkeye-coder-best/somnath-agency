import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Product } from './entities/product.entity';
import { Enquiry } from './entities/enquiry.entity';
import { StoreConfig } from './entities/store-config.entity';
import { ProductsModule } from './products/products.module';
import { StoreConfigModule } from './store-config/store-config.module';
import { EnquiriesModule } from './enquiries/enquiries.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: (process.env.DATABASE_URL ? 'postgres' : 'sqlite') as any,
      database: process.env.DATABASE_URL || 'somnath_agency.sqlite',
      url: process.env.DATABASE_URL,
      entities: [Product, StoreConfig, Enquiry],
      synchronize: true, // Auto-create tables (dev only)
      autoLoadEntities: true,
      ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
    }),
    ProductsModule,
    StoreConfigModule,
    EnquiriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
