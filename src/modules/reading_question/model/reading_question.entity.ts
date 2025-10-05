// models/reading_question.entity.ts
import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { Reading } from "../../reading/reading.model";
import { RQuestion } from "../../reading_subquestions/model/reading_subquestion.entity";

@Table({ tableName: "reading_questions", timestamps: true })
export class ReadingQuestion extends Model<ReadingQuestion> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: true })
  title: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  instruction: string;

  @Column({ type: DataType.STRING, allowNull: true })
  photo: string;

  // Yangi qo‘shildi: part
  @Column({ type: DataType.ENUM("PART1", "PART2", "PART3"), allowNull: false })
  part: string;

  @ForeignKey(() => Reading)
  @Column({ type: DataType.INTEGER })
  reading_id: number;

  @BelongsTo(() => Reading)
  reading: Reading;

   @HasMany(() => RQuestion)
  r_questions: RQuestion[];
}
