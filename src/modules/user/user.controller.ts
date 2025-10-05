import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import {
  ApiTags,
  ApiConsumes,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from "@nestjs/swagger";

@ApiTags("Users")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: "Create User" })
  @ApiConsumes("application/json")
  @ApiBody({ type: CreateUserDto })
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha userlarni olish" })
  @ApiResponse({ status: 200, description: "List of users" })
  findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha userni olish" })
  @ApiParam({ name: "id", type: "string", example: "REI000001" })
  findOne(@Param("id") id: string) {
    return this.userService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Userni yangilash" })
  @ApiConsumes("application/json")
  @ApiParam({ name: "id", type: "string", example: "REI000001" })
  @ApiBody({ type: UpdateUserDto })
  update(
    @Param("id") id: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Userni o‘chirish" })
  @ApiParam({ name: "id", type: "string", example: "REI000001" })
  remove(@Param("id") id: string) {
    return this.userService.remove(id);
  }
}
