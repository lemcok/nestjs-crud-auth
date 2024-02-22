import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { Task } from "@prisma/client";

// import { CreateTaskDto } from "./dto/create-task.dto";
// import { UpdateTaskDto } from "./dto/update-task.dto";
import { TasksService } from "./tasks.service";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: Task) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const taskFound = await this.tasksService.findOne(+id);
    if (!taskFound) throw new NotFoundException("Task does not exits");
    return taskFound;
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateTaskDto: Task) {
    try {
      return await this.tasksService.update(+id, updateTaskDto);
    } catch (error) {
      throw new NotFoundException("Task does not exists");
    }
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    try {
      return await this.tasksService.delete(+id);
    } catch (error) {
      throw new NotFoundException("Task does not exists");
    }
  }
}
