// models/reading.model.ts
import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { Exam } from "../exam/exam.model";
import { ReadingQuestion } from "../reading_question/model/reading_question.entity";
import { Passage } from "../passages/model/passage.entity";

@Table({ tableName: "readings", timestamps: false })
export class Reading extends Model<Reading> {
  @Column({ type: DataType.BIGINT, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Exam)
  @Column(DataType.BIGINT)
  exam_id: number;

  @Column(DataType.STRING)
  passage_title: string;

  @Column(DataType.DATE)
  created_at: Date;

  @BelongsTo(() => Exam)
  exam: Exam;

  @HasMany(() => ReadingQuestion)
  questions: ReadingQuestion[];

  @HasMany(() => Passage)
  passages: Passage[];
  
}
