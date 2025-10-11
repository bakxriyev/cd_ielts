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
    const question = await this.readingQuestionModel.findByPk(dto.questionId);
    if (!question) throw new NotFoundException("ReadingQuestion not found");

    const subQuestion = await this.rQuestionModel.findByPk(dto.r_questionsID);
    if (!subQuestion) throw new NotFoundException("RQuestion not found");

    const correctAnswers = subQuestion.correct_answers || [];
    const questionType = subQuestion.q_type;
    const userAnswer = dto.answer;
    let isCorrect = false;

    // 🔍 Normalizatsiya yordamchi funksiyasi
    const normalize = (str: string) =>
      str
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ")
        .split(" ")
        .filter(Boolean)
        .sort()
        .join(" ");

    // ✅ Javoblarni tekshirish
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
          isCorrect = normalizedCorrect.includes(userAnswer.trim().toLowerCase());
        } else if (Array.isArray(userAnswer)) {
          isCorrect = (userAnswer as string[]).every(a =>
            normalizedCorrect.includes(a.trim().toLowerCase()),
          );
        }
        break;
      }

      // ✅ TABLE_COMPLETION — jadval bo‘yicha to‘g‘ri tekshirish
      case "TABLE_COMPLETION": {
        try {
          const userObj =
            typeof userAnswer === "string" ? JSON.parse(userAnswer) : userAnswer;

          const correctChoices =
            typeof subQuestion.choices === "string"
              ? JSON.parse(subQuestion.choices)
              : subQuestion.choices;

          if (userObj && correctChoices) {
            const keys = Object.keys(userObj);

            isCorrect = keys.every(key => {
              const userVal = (userObj[key] || "").trim().toLowerCase();
              const correctVal = (correctChoices[key] || "").trim().toLowerCase();

              if (userVal && correctVal) {
                return normalize(userVal) === normalize(correctVal);
              }
              return false;
            });
          } else {
            isCorrect = false;
          }
        } catch (error) {
          console.error("TABLE_COMPLETION check error:", error);
          isCorrect = false;
        }
        break;
      }

      // ✅ MATCHING_INFORMATION — to‘g‘ri logika
      case "MATCHING_INFORMATION": {
        try {
          const userObj =
            typeof userAnswer === "string" ? JSON.parse(userAnswer) : userAnswer;

          const correctObj =
            typeof subQuestion.answers === "string"
              ? JSON.parse(subQuestion.answers)
              : subQuestion.answers;

          if (userObj && correctObj) {
            const keys = Object.keys(userObj);
            isCorrect = keys.every(key => {
              const userVal = (userObj[key] || "").trim().toLowerCase();
              const correctVal = (correctObj[key] || "").trim().toLowerCase();

              return normalize(userVal) === normalize(correctVal);
            });
          } else {
            isCorrect = false;
          }
        } catch (error) {
          console.error("MATCHING_INFORMATION check error:", error);
          isCorrect = false;
        }
        break;
      }

      // ✅ MATCHING_HEADINGS
      case "MATCHING_HEADINGS": {
        try {
          const userObj =
            typeof userAnswer === "string" ? JSON.parse(userAnswer) : userAnswer;

          const correctObj =
            typeof subQuestion.answers === "string"
              ? JSON.parse(subQuestion.answers)
              : subQuestion.answers;

          if (userObj && correctObj) {
            const key = Object.keys(userObj)[0];
            const userVal = (userObj[key] || "").trim().toLowerCase();
            const correctVal = (correctObj[key] || "").trim().toLowerCase();
            isCorrect = userVal === correctVal;
          }
        } catch {
          isCorrect = false;
        }
        break;
      }

      // ✅ NOTE_COMPLETION
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
              return normalize(userVal) === normalize(correctVal);
            });
          }
        } catch {
          isCorrect = false;
        }
        break;
      }

      // Default
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
    return this.readingAnswerModel.findAll({ include: [{ all: true }] });
  }

  // ✅ FIND ONE
  async findOne(id: string): Promise<ReadingAnswer> {
    const answer = await this.readingAnswerModel.findByPk(id, {
      include: [{ all: true }],
    });
    if (!answer) throw new NotFoundException("Reading answer not found");
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
