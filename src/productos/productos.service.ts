import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';

@Injectable()
export class ProductosService extends PrismaClient implements OnModuleInit  {
  private readonly logger = new Logger('ProductsService');
  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connected');
  }
  create(createProductoDto: CreateProductoDto) {
    console.log(createProductoDto)
    return this.producto.create ({
      data: createProductoDto
    })
  }

  async findAll(paginationDTO: PaginationDto) {

    const { page, limit } = paginationDTO;
    const totalPages = await this.producto.count();
    const lastPage = Math.ceil (totalPages / limit )
    return {
      data: await this.producto.findMany({
              take: limit,
              skip: (page - 1) * limit
            }),
      meta: {
        pageActual: page,
        total: totalPages,
        lastPage: lastPage
      }
      
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} producto`;
  }

  async update(id: number, updateProductDto: UpdateProductoDto) {
    
    const { id: __, ...data } = updateProductDto;

    await this.findOne(id);

    return this.producto.update({
      where: { id },
      data: data,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} producto`;
  }
}
