import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Result } from "./model/result.model";
import { UpdateResultDto } from "./dto";
import { ReadingAnswer } from "../reading_answers/entities/reading_answer.entity";
import { ListeningAnswer } from "../listening_answers/entities/listening_answer.entity";
import { WritingAnswer } from "../writing_answers/entities/writing_answer.entity";
import { User } from "../user/user.model";
import { WritingPart } from "../writing/model/writing-parts";
import { SpeakingAnswer } from "../speaking_answers/entities/speaking_answer.entity";

@Injectable()
export class ResultService {
  constructor(
    @InjectModel(Result) private readonly resultRepo: typeof Result,
    @InjectModel(ReadingAnswer) private readonly readingRepo: typeof ReadingAnswer,
    @InjectModel(ListeningAnswer) private readonly listeningRepo: typeof ListeningAnswer,
    @InjectModel(WritingAnswer) private readonly writingRepo: typeof WritingAnswer,
    @InjectModel(SpeakingAnswer) private readonly speakingRepo: typeof SpeakingAnswer,
    @InjectModel(User) private readonly userRepo: typeof User
  ) {}

  // Reading/Listening uchun jadval asosida hisoblash
  private calculateBandFromTable(correct: number): number {
    if (correct >= 39) return 9;
    if (correct >= 37) return 8.5;
    if (correct >= 35) return 8;
    if (correct >= 33) return 7.5;
    if (correct >= 30) return 7;
    if (correct >= 27) return 6.5;
    if (correct >= 23) return 6;
    if (correct >= 19) return 5.5;
    if (correct >= 15) return 5;
    if (correct >= 13) return 4.5;
    if (correct >= 10) return 4;
    if (correct >= 8) return 3.5;
    if (correct >= 6) return 3;
    if (correct >= 4) return 2.5;
    return 0;
  }

  private calculateWritingScore(part1: number, part2: number): number {
    if (!part1 && !part2) return 0;
    return (part1 + part2) / 2;
  }

  private roundOverall(score: number): number {
    const floor = Math.floor(score);
    const decimal = score - floor;

    if (decimal < 0.25) return floor;
    if (decimal < 0.75) return floor + 0.5;
    return floor + 1;
  }

  private calculateOverall(reading: number, listening: number, writing: number, speaking: number): number {
    const avg = (reading + listening + writing + speaking) / 4;
    return this.roundOverall(parseFloat(avg.toFixed(2)));
  }

  // ✅ user_id endi string
  async calculateUserResult(user_id: string, exam_id: number) {
    const readingAnswers = await this.readingRepo.findAll({ where: { userId: user_id, examId: exam_id } });
    const reading_total_questions = readingAnswers.length;
    const reading_correct_answers = readingAnswers.filter(a => a.is_correct).length;
    const reading_band_score = this.calculateBandFromTable(reading_correct_answers);

    const listeningAnswers = await this.listeningRepo.findAll({ where: { userId: user_id, examId: exam_id } });
    const listening_total_questions = listeningAnswers.length;
    const listening_correct_answers = listeningAnswers.filter(a => a.is_correct).length;
    const listening_band_score = this.calculateBandFromTable(listening_correct_answers);

    const writingAnswers = await this.writingRepo.findAll({ where: { user_id, exam_id } });
    const writing_part1_score = writingAnswers.find(a => a.part === WritingPart.PART1)?.score ?? 0;
    const writing_part2_score = writingAnswers.find(a => a.part === WritingPart.PART2)?.score ?? 0;
    const writing_band_score = this.calculateWritingScore(writing_part1_score, writing_part2_score);

    const speakingAnswer = await this.speakingRepo.findOne({ where: { user_id, exam_id } });
    const speaking_score = speakingAnswer?.score ?? 0;

    const overall_band_score = this.calculateOverall(
      reading_band_score,
      listening_band_score,
      writing_band_score,
      speaking_score
    );

    const existing = await this.resultRepo.findOne({ where: { user_id, exam_id } });
    if (existing) {
      return existing.update({
        reading_total_questions,
        reading_correct_answers,
        reading_band_score,
        listening_total_questions,
        listening_correct_answers,
        listening_band_score,
        writing_part1_score,
        writing_part2_score,
        writing_band_score,
        speaking_score,
        overall_band_score,
        taken_at: new Date()
      });
    }

    return this.resultRepo.create({
      user_id,
      exam_id,
      reading_total_questions,
      reading_correct_answers,
      reading_band_score,
      listening_total_questions,
      listening_correct_answers,
      listening_band_score,
      writing_part1_score,
      writing_part2_score,
      writing_band_score,
      speaking_score,
      overall_band_score,
      taken_at: new Date()
    });
  }

  async calculateAllResults() {
    const users = await this.userRepo.findAll();
    const results = [];

    for (const user of users) {
      const readingAns = await this.readingRepo.findOne({
        where: { userId: user.id },
        order: [["examId", "DESC"]],
      });
      const exam_id = readingAns?.examId ?? 1;

      // ✅ endi user.id string bo‘lgani uchun xato chiqmaydi
      const res = await this.calculateUserResult(user.id, exam_id);
      results.push({
        user: { id: user.id, full_name: user.name, email: user.email },
        exam_id,
        reading_band_score: res.reading_band_score,
        listening_band_score: res.listening_band_score,
        writing_band_score: res.writing_band_score,
        speaking_score: res.speaking_score,
        overall_band_score: res.overall_band_score,
        taken_at: res.taken_at,
      });
    }

    return results;
  }

  async findAll() {
    return this.resultRepo.findAll({ include: [User] });
  }

  // ✅ user_id endi string
  async findByUserId(user_id: string) {
    const result = await this.resultRepo.findAll({ where: { user_id }, include: [User] });
    if (!result.length) throw new NotFoundException("Results not found for this user");

    const readingAnswers = await this.readingRepo.findAll({ where: { userId: user_id } });
    const listeningAnswers = await this.listeningRepo.findAll({ where: { userId: user_id } });
    const writingAnswers = await this.writingRepo.findAll({ where: { user_id } });
    const speakingAnswers = await this.speakingRepo.findAll({ where: { user_id } });

    return {
      user_id,
      results: result,
      readingAnswers,
      listeningAnswers,
      writingAnswers,
      speakingAnswers,
    };
  }

  async findByDate(date: string) {
    const start = new Date(date);
    const end = new Date(date);
    end.setDate(end.getDate() + 1);
    return this.resultRepo.findAll({
      where: { taken_at: { $between: [start, end] } },
      include: [User],
    });
  }

  async update(id: number, dto: UpdateResultDto) {
    const result = await this.resultRepo.findByPk(id);
    if (!result) throw new NotFoundException("Result not found");
    return result.update(dto);
  }

  async remove(id: number) {
    const result = await this.resultRepo.findByPk(id);
    if (!result) throw new NotFoundException("Result not found");
    await result.destroy();
    return { message: "Result deleted successfully" };
  }
}
