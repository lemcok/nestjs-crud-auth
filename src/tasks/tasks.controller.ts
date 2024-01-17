import {
  Body,
  Controller,
  Delete,
  Get,
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
  findOne(@Param("id") id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateTaskDto: Task) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.tasksService.delete(+id);
  }
}
