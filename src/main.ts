import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Configure global pipes for validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors( {origin: '*'} );

  const config = new DocumentBuilder()
    .setTitle("IELTS Exam Management System")
    .setDescription(
      "Complete API documentation for IELTS exam management system with authentication, file uploads, and email notifications",
    )
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "Enter JWT token",
        in: "header",
      },
      "JWT-auth",
    )
    .addTag("Authentication", "User authentication and authorization endpoints")
    .addTag("Users", "User management operations")
    .addTag("Exams", "Exam management and configuration")
    .addTag("Listening", "Listening section with audio file uploads")
    .addTag("Reading", "Reading comprehension sections")
    .addTag("Writing", "Writing task management")
    .addTag("Speaking", "Speaking test sections")
    .addTag("Results", "Exam results and email notifications")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/v1/realexamielts", app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = configService.get<number>("PORT") || 3000;
  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger documentation: http://localhost:${port}/api`);
}
bootstrap();
