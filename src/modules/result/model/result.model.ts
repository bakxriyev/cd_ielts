import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "../../user/user.model";
import { Exam } from "../../exam/exam.model";

@Table({ tableName: "results", timestamps: true })
export class Result extends Model<Result> {
  @Column({ type: DataType.BIGINT, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.STRING })
  user_id: string;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Exam)
  @Column({ type: DataType.BIGINT })
  exam_id: number;

  @BelongsTo(() => Exam)
  exam: Exam;

  @Column({ type: DataType.INTEGER })
  reading_total_questions: number;

  @Column({ type: DataType.INTEGER })
  reading_correct_answers: number;

  @Column({ type: DataType.FLOAT })
  reading_band_score: number;

  @Column({ type: DataType.INTEGER })
  listening_total_questions: number;

  @Column({ type: DataType.INTEGER })
  listening_correct_answers: number;

  @Column({ type: DataType.FLOAT })
  listening_band_score: number;

  @Column({ type: DataType.FLOAT })
  writing_part1_score: number;

  @Column({ type: DataType.FLOAT })
  writing_part2_score: number;

  @Column({ type: DataType.FLOAT })
  overall_band_score: number;

   // ✅ Yangi qo‘shilgan
  @Column({ type: DataType.FLOAT })
  writing_band_score: number;

  // ✅ Yangi qo‘shilgan
  @Column({ type: DataType.FLOAT })
  speaking_score: number;

  @Column({ type: DataType.DATE })
  taken_at: Date;
}
