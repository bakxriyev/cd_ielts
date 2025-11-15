// models/reading-answer.entity.ts
import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "../../user/user.model";
import { ReadingQuestion } from "../../reading_question/model/reading_question.entity";
import { Exam } from "../../exam/exam.model";
import { RQuestion } from "../../reading_subquestions/model/reading_subquestion.entity";

@Table({
  tableName: "reading_answers",
  timestamps: true,
})
export class ReadingAnswer extends Model<ReadingAnswer> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.STRING, allowNull: false })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  // Original ReadingQuestion bilan bog'lanish
  @ForeignKey(() => ReadingQuestion)
  @Column({ type: DataType.INTEGER, allowNull: false })
  questionId: number;

  @BelongsTo(() => ReadingQuestion)
  question: ReadingQuestion;

  @Column({ type: DataType.STRING, allowNull: false })
  question_type: string;

  // RQuestion bilan bog'lanish


   // 🟢 RQuestion bilan to‘g‘ri aloqasi (as: "r_question")
  @ForeignKey(() => RQuestion)
  @Column({ type: DataType.INTEGER, allowNull: true })
  r_questionsID: number;

  @BelongsTo(() => RQuestion, { as: "r_question" }) // <-- MUHIM
  r_question: RQuestion;

  @ForeignKey(() => Exam)
  @Column({ type: DataType.INTEGER, allowNull: false })
  examId: number;

  @BelongsTo(() => Exam)
  exam: Exam;

  @Column({ type: DataType.JSONB, allowNull: true })
  answer: any;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  is_correct: boolean;
  
}
