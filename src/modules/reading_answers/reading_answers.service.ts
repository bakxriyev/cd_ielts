import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ReadingAnswer } from "./entities/reading_answer.entity";
import { CreateReadingAnswerDto, UpdateReadingAnswerDto } from "./dto";
import { ReadingQuestion } from "../reading_question/model/reading_question.entity";
import { RQuestion } from "../reading_subquestions/model/reading_subquestion.entity";

@Injectable()
export class ReadingAnswersService {
  constructor(
    @InjectModel(ReadingAnswer)
    private readonly readingAnswerModel: typeof ReadingAnswer,

    @InjectModel(ReadingQuestion)
    private readonly readingQuestionModel: typeof ReadingQuestion,

    @InjectModel(RQuestion)
    private readonly rQuestionModel: typeof RQuestion,
  ) {}

  // ✅ CREATE
  async create(dto: CreateReadingAnswerDto): Promise<ReadingAnswer> {
    // Asosiy questionni tekshirish
    const question = await this.readingQuestionModel.findByPk(dto.questionId);
    if (!question) {
      throw new NotFoundException("ReadingQuestion (question) not found");
    }

    // Sub-questionni tekshirish
    const subQuestion = await this.rQuestionModel.findByPk(dto.r_questionsID);
    if (!subQuestion) {
      throw new NotFoundException("RQuestion (reading sub-question) not found");
    }

    const correctAnswers = subQuestion.correct_answers || [];
    const questionType = subQuestion.q_type;
    const userAnswer = dto.answer;
    let isCorrect = false;

    // ✅ Javoblarni tekshirish algoritmi
    switch (questionType) {
      case "TFNG":
      case "MCQ_SINGLE": {
        if (Array.isArray(correctAnswers)) {
          const normalizedCorrect = correctAnswers.map(a => a.trim().toLowerCase());
          if (typeof userAnswer === "string") {
            isCorrect = normalizedCorrect.includes(userAnswer.trim().toLowerCase());
          }
        }
        break;
      }

      case "MCQ_MULTI": {
        const normalizedCorrect = correctAnswers.map(a => a.trim().toLowerCase());
        if (typeof userAnswer === "string") {
          // Foydalanuvchi bitta javob yuborsa
          isCorrect = normalizedCorrect.includes(userAnswer.trim().toLowerCase());
        } else if (Array.isArray(userAnswer)) {
          // Foydalanuvchi bir nechta javob yuborsa
          isCorrect = (userAnswer as string[]).every(a =>
            normalizedCorrect.includes(a.trim().toLowerCase()),
          );
        }
        break;
      }

      case "MATCHING_INFORMATION":
      case "TABLE_COMPLETION":
      case "NOTE_COMPLETION": {
        try {
          const userObj =
            typeof userAnswer === "string" ? JSON.parse(userAnswer) : userAnswer;
          const correctObj =
            typeof correctAnswers === "string"
              ? JSON.parse(correctAnswers)
              : correctAnswers;

          if (userObj && correctObj) {
            const keys = Object.keys(userObj);
            isCorrect = keys.every(key => {
              const userVal = (userObj[key] || "").trim().toLowerCase();
              const correctVal = (correctObj[key] || "").trim().toLowerCase();
              return userVal === correctVal;
            });
          }
        } catch {
          isCorrect = false;
        }
        break;
      }

      // ✅ TO‘G‘RILANGAN QISM — MATCHING_HEADINGS
      case "MATCHING_HEADINGS": {
        try {
          // foydalanuvchi javobi
          const userObj =
            typeof userAnswer === "string" ? JSON.parse(userAnswer) : userAnswer;

          // backenddagi to‘g‘ri javoblar
          const correctObj =
            typeof subQuestion.answers === "string"
              ? JSON.parse(subQuestion.answers)
              : subQuestion.answers;

          // misol:
          // userObj = { "4": "G" }
          // correctObj = { "1": "A", "2": "B", "3": "C", "4": "G" }

          if (userObj && correctObj) {
            const key = Object.keys(userObj)[0]; // "4"
            const userVal = (userObj[key] || "").trim().toLowerCase();
            const correctVal = (correctObj[key] || "").trim().toLowerCase();

            // solishtirish
            isCorrect = userVal === correctVal;
          }
        } catch {
          isCorrect = false;
        }
        break;
      }

      // Default fallback (oddiy string javoblar uchun)
      default: {
        if (Array.isArray(correctAnswers) && typeof userAnswer === "string") {
          isCorrect = correctAnswers.some(
            a => a.trim().toLowerCase() === userAnswer.trim().toLowerCase(),
          );
        }
        break;
      }
    }

    // ✅ Natijani saqlash
    return this.readingAnswerModel.create({
      ...dto,
      is_correct: isCorrect,
    });
  }

  // ✅ FIND ALL
  async findAll(): Promise<ReadingAnswer[]> {
    return this.readingAnswerModel.findAll({
      include: [{ all: true }],
    });
  }

  // ✅ FIND ONE
  async findOne(id: string): Promise<ReadingAnswer> {
    const answer = await this.readingAnswerModel.findByPk(id, {
      include: [{ all: true }],
    });

    if (!answer) {
      throw new NotFoundException("Reading answer not found");
    }
    return answer;
  }

  // ✅ UPDATE
  async update(id: string, dto: UpdateReadingAnswerDto): Promise<ReadingAnswer> {
    const answer = await this.findOne(id);
    await answer.update(dto);
    return answer;
  }

  // ✅ DELETE
  async remove(id: string): Promise<{ message: string }> {
    const answer = await this.findOne(id);
    await answer.destroy();
    return { message: "Reading answer successfully deleted" };
  }
}
