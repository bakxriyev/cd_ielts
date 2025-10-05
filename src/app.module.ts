import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { join } from "path";
import { AppConfig } from "./config/app.config";
import { DatabaseConfig } from "./config/database.config";
import { AuthModule } from "./modules/auth/auth.module";
import { UserModule } from "./modules/user/user.module";
import { ExamModule } from "./modules/exam/exam.module";
import { ListeningModule } from "./modules/listening/listening.module";
import { ReadingModule } from "./modules/reading/reading.module";
import { WritingModule } from "./modules/writing/writing.module";
import { SpeakingModule } from "./modules/speaking/speaking.module";
import { ResultsModule } from "./modules/result/result.module";
import { ReadingQuestionModule } from "./modules/reading_question/reading_question.module";
import { ListeningQuestionModule } from "./modules/listening_question/listening_question.module";
import { ListeningAnswerModule } from "./modules/listening_answers/listening_answers.module";
import { SpeakingAnswerModule } from "./modules/speaking_answers/speaking_answers.module";
import { WritingAnswersModule } from "./modules/writing_answers/writing_answers.module";
import { ReadingAnswersModule } from "./modules/reading_answers/reading_answers.module";

import { ServeStaticModule } from "@nestjs/serve-static";
import { AdminModule } from './modules/admin/admin.module';
import { ClientModule } from './modules/client/client.module';
import { RQuestionModule } from "./modules/reading_subquestions/reading_subquestions.module";
import { LQuestionModule } from "./modules/l_questions/l_questions.module";
import { AdminSeed } from "./seeders/create-admin";
import { Admin } from "./modules/admin/model/admin.entity";
import { PassagesModule } from './modules/passages/passages.module';



@Module({
  imports: [
    ServeStaticModule.forRootAsync({
  useFactory: async () => [
    {
      rootPath: join(__dirname, "..", "uploads"),
      serveRoot: "/uploads",
    },
  ],
}),

    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig, DatabaseConfig],
    }),

    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dialect: "postgres",
        host: config.get<string>("database.host"),
        port: config.get<number>("database.port"),
        username: config.get<string>("database.username"),
        password: config.get<string>("database.password"),
        database: config.get<string>("database.database"),
        autoLoadModels: true,
        synchronize: true,
        // sync: { force: true },
        logging: config.get<string>("app.nodeEnv") === "development",
      }),
    }),
    SequelizeModule.forFeature([Admin]),

    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get<string>("MAIL_HOST"),
          port: parseInt(config.get<string>("MAIL_PORT") ?? "587", 10),
          secure: false,
          auth: {
            user: config.get<string>("MAIL_USER"),
            pass: config.get<string>("MAIL_PASS"),
          },
        },
        defaults: {
          from: config.get<string>("MAIL_FROM"),
        },
        template: {
          dir: join(__dirname, "templates"),
          adapter: new HandlebarsAdapter(),
          options: { strict: true },
        },
      }),
    }),

    AuthModule,
    UserModule,
    ExamModule,
    ListeningModule,
    ReadingModule,
    WritingModule,
    SpeakingModule,
    ResultsModule,
    ReadingQuestionModule,
    ListeningQuestionModule,
    ListeningAnswerModule,
    SpeakingAnswerModule,
    WritingAnswersModule,
    ReadingAnswersModule,
    AdminModule,
    ClientModule,
    RQuestionModule,
    LQuestionModule,
    PassagesModule,
  ],
  providers: [AdminSeed]
})
export class AppModule {}
