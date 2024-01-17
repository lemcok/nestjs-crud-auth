import { Injectable } from "@nestjs/common";
import { Task } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";
// import { CreateTaskDto } from "./dto/create-task.dto";
// import { UpdateTaskDto } from "./dto/update-task.dto";

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: Task): Promise<Task> {
    return await this.prisma.task.create({
      data: createTaskDto,
    });
  }

  async findAll(): Promise<Task[]> {
    return await this.prisma.task.findMany();
  }

  async findOne(id: number): Promise<Task> {
    return this.prisma.task.findUniqueOrThrow({ where: { id } });
  }

  async update(id: number, updateTaskDto: Task): Promise<Task> {
    return this.prisma.task.update({
      where: {
        id,
      },
      data: updateTaskDto,
    });
  }

  async delete(id: number) {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}
