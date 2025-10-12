// models/reading-subquestion.entity.ts
import { ListeningQuestion } from "@/modules/listening_question/entities/listening_question.entity";
import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";

// Quyidagi enumni alohida faylda e'lon qiling (yoki DB da)
export enum ListeningQuestionType {
  TRUE_FALSE_NOT_GIVEN = "TFNG",
  MULTIPLE_CHOICE_SINGLE = "MCQ_SINGLE",
  MULTIPLE_CHOICE_MULTI = "MCQ_MULTI",
  TABLE_COMPLETION = "TABLE_COMPLETION",  
  MATCHING_INFORMATION = "MATCHING_INFORMATION",       
  SENTENCE_COMPLETION = "SENTENCE_COMPLETION", 
  SUMMARY_DRAG = "SUMMARY_DRAG",
  SHORT_ANSWER = "SHORT_ANSWER",        
  SENTENCE_ENDINGS = "SENTENCE_ENDINGS",                          
  MAP_LABELING = "MAP_LABELING",      
  FLOW_CHART = "FLOW_CHART", 
  NOTE_COMPLETION = "NOTE_COMPLETION",               
}

@Table({
  tableName: "l_questions",
  timestamps: true,
})
export class LQuestion extends Model<LQuestion> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => ListeningQuestion)
  @Column({ type: DataType.INTEGER, allowNull: false })
  listening_questions_id: number;

  @BelongsTo(() => ListeningQuestion)
  listening_questions: ListeningQuestion;

  @Column({
    type: DataType.ENUM(...Object.values(ListeningQuestionType)),
    allowNull: false,
  })
  q_type: ListeningQuestionType;

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