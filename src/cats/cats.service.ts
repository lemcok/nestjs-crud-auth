import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {

  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>
  ){}

  async create(createCatDto: CreateCatDto) { 
    return await this.catRepository.save(createCatDto);
  }

  findAll() {
    return this.catRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} cat`;
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    const cartUpdated = await this.catRepository.update(id, updateCatDto)
    return cartUpdated
  }

  async remove(id: number) {
    return await this.catRepository.softDelete({id}) //softDelte(): hace una eliminacion logica, se le pasa el id
    // return await this.catRepository.softRemove(id) //se le pasa la instancia
  }
}
