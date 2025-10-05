import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ListeningAnswer } from "./entities/listening_answer.entity";
import { CreateListeningAnswerDto, UpdateListeningAnswerDto } from "./dto";
import { LQuestion } from "../l_questions/entities/l_question.entity";

@Injectable()
export class ListeningAnswerService {
  constructor(
    @InjectModel(ListeningAnswer)
    private readonly listeningAnswerModel: typeof ListeningAnswer,

    @InjectModel(LQuestion)
    private readonly lQuestionModel: typeof LQuestion,
  ) {}

  // ✅ CREATE
  async create(dto: CreateListeningAnswerDto): Promise<ListeningAnswer> {
    const question = await this.lQuestionModel.findByPk(dto.l_questionsID);

    if (!question) {
      throw new NotFoundException("LQuestion (listening sub-question) not found");
    }

    const correctAnswers = question.correct_answers || [];
    const questionType = question.q_type;
    const userAnswer = dto.answer;
    let isCorrect = false;

    switch (questionType) {
      // 1️⃣ TRUE_FALSE_NOT_GIVEN & MCQ_SINGLE → oddiy javoblar (masalan "A", "TRUE")
      case "TFNG":
      case "MCQ_SINGLE": {
        if (Array.isArray(correctAnswers)) {
          const normalizedCorrect = correctAnswers.map(a =>
            String(a).trim().toLowerCase(),
          );
          const normalizedUser = String(userAnswer).trim().toLowerCase();
          isCorrect = normalizedCorrect.includes(normalizedUser);
        }
        break;
      }

      // 2️⃣ MCQ_MULTI → foydalanuvchi bir nechta javob tanlagan bo‘lishi mumkin
      case "MCQ_MULTI": {
        const userAnswers = Array.isArray(userAnswer)
          ? userAnswer.map(a => String(a).trim().toLowerCase())
          : String(userAnswer)
              .split(",")
              .map(a => a.trim().toLowerCase())
              .filter(a => a.length > 0);

        const normalizedCorrect = Array.isArray(correctAnswers)
          ? correctAnswers.map(a => String(a).trim().toLowerCase())
          : [];

        const allCorrect = userAnswers.every(a => normalizedCorrect.includes(a));
        const sameLength = userAnswers.length === normalizedCorrect.length;

        isCorrect = allCorrect && sameLength;
        break;
      }

      // 3️⃣ JSON tipidagi javoblar (MATCHING_INFORMATION, TABLE_COMPLETION, MAP_LABELING)
      case "MATCHING_INFORMATION":
      case "TABLE_COMPLETION":
      case "MAP_LABELING": {
        try {
          const userObj =
            typeof userAnswer === "string" ? JSON.parse(userAnswer) : userAnswer;
          const correctObj =
            typeof correctAnswers === "string" ? JSON.parse(correctAnswers) : correctAnswers;

          if (typeof userObj === "object" && typeof correctObj === "object") {
            const allKeys = Object.keys(correctObj);
            isCorrect = allKeys.every(key => {
              const userVal = String(userObj[key] || "").trim().toLowerCase();
              const correctVal = String(correctObj[key] || "").trim().toLowerCase();
              return userVal === correctVal;
            });
          } else {
            isCorrect = false;
          }
        } catch (e) {
          isCorrect = false;
        }
        break;
      }

      // 4️⃣ Qolgan barcha turlar uchun umumiy tekshiruv
      default: {
        if (Array.isArray(correctAnswers)) {
          const normalizedCorrect = correctAnswers.map(a =>
            String(a).trim().toLowerCase(),
          );
          const normalizedUser = String(userAnswer).trim().toLowerCase();
          isCorrect = normalizedCorrect.includes(normalizedUser);
        }
        break;
      }
    }

    // ✅ Natijani saqlash
    const newAnswer = await this.listeningAnswerModel.create({
      ...dto,
      is_correct: isCorrect,
      submitted_at: new Date(),
    });

    return newAnswer;
  }

  // ✅ FIND ALL
  async findAll(): Promise<ListeningAnswer[]> {
    return this.listeningAnswerModel.findAll({
      include: [{ all: true }],
    });
  }

  // ✅ FIND ONE
  async findOne(id: number): Promise<ListeningAnswer> {
    const answer = await this.listeningAnswerModel.findByPk(id, {
      include: [{ all: true }],
    });

    if (!answer) {
      throw new NotFoundException("Listening answer not found");
    }

    return answer;
  }

  // ✅ UPDATE
  async update(id: number, dto: UpdateListeningAnswerDto): Promise<ListeningAnswer> {
    const answer = await this.findOne(id);
    await answer.update(dto);
    return answer;
  }

  // ✅ REMOVE
  async remove(id: number): Promise<{ message: string }> {
    const answer = await this.findOne(id);
    await answer.destroy();
    return { message: "Listening answer successfully deleted" };
  }
}
