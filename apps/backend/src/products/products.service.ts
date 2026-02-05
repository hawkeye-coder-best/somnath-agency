import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
    ) { }

    findAll(): Promise<Product[]> {
        return this.productsRepository.find();
    }

    findOne(id: string): Promise<Product | null> {
        return this.productsRepository.findOneBy({ id });
    }

    create(product: Partial<Product>): Promise<Product> {
        return this.productsRepository.save(product);
    }

    async remove(id: string): Promise<void> {
        await this.productsRepository.delete(id);
    }

    async update(id: string, product: Partial<Product>): Promise<Product | null> {
        console.log(`Updating product ${id} with:`, product);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id: _, ...data } = product; // Ensure ID is not in update set
        await this.productsRepository.update(id, data);
        return this.productsRepository.findOneBy({ id });
    }
}
