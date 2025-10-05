// models/reading-subquestion.entity.ts
import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { ReadingQuestion } from "../../reading_question/model/reading_question.entity";

// Quyidagi enumni alohida faylda e'lon qiling (yoki DB da)
export enum ReadingQuestionType {
  TRUE_FALSE_NOT_GIVEN = "TFNG",
  MULTIPLE_CHOICE_SINGLE = "MCQ_SINGLE",
  MULTIPLE_CHOICE_MULTI = "MCQ_MULTI",
  SENTENCE_COMPLETION = "SENTENCE_COMPLETION",
  TABLE_COMPLETION = "TABLE_COMPLETION",
  MATCHING_INFORMATION = "MATCHING_INFORMATION",
  SUMMARY_COMPLETION = "SUMMARY_COMPLETION",
  SUMMARY_DRAG = "SUMMARY_DRAG",
  SENTENCE_ENDINGS = "SENTENCE_ENDINGS",
  MATCHING_HEADINGS = "MATCHING_HEADINGS",

  SHORT_ANSWER = "SHORT_ANSWER",//hozircha kerak emas
  NOTE_COMPLETION = "NOTE_COMPLETION", //hozircha kerak emas
}

@Table({
  tableName: "r_questions",
  timestamps: true,
})
export class RQuestion extends Model<RQuestion> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => ReadingQuestion)
  @Column({ type: DataType.INTEGER, allowNull: false })
  reading_questions_id: number;

  @BelongsTo(() => ReadingQuestion)
  reading_question: ReadingQuestion;

  @Column({
    type: DataType.ENUM(...Object.values(ReadingQuestionType)),
    allowNull: false,
  })
  q_type: ReadingQuestionType;

  @Column({ type: DataType.TEXT, allowNull: true })
  q_text: string;

  @Column({ type: DataType.JSONB, allowNull: true })
  options: any;

  @Column({ type: DataType.JSONB, allowNull: true })
  correct_answers: any;
  
  @Column({ type: DataType.JSONB, allowNull: true })
  columns:any

  @Column({ type: DataType.JSONB, allowNull: true })
  rows:any

  @Column({ type: DataType.JSONB, allowNull: true })
  choices: any; // { A: "the Chinese", B: "the Indians", ... }

  @Column({ type: DataType.JSONB, allowNull: true })
  answers: any

  @Column({ type: DataType.JSONB, allowNull: true })
  match_pairs: any;

  @Column({ type: DataType.STRING, allowNull: true })
  photo: string;

}