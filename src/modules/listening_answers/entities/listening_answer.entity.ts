import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript"
import { User } from "../../user/user.model"
import { Exam } from "../../exam/exam.model"
import { ListeningQuestion } from "../../listening_question/entities/listening_question.entity"
import { LQuestion } from "../../l_questions/entities/l_question.entity"

@Table({ tableName: "listening_answers", timestamps: false })
export class ListeningAnswer extends Model<ListeningAnswer> {
  @Column({ type: DataType.BIGINT, autoIncrement: true, primaryKey: true })
  id: number

  @ForeignKey(() => User)
  @Column(DataType.STRING)
  userId: string

  @ForeignKey(() => Exam)
  @Column(DataType.BIGINT)
  examId: number

  @ForeignKey(() => ListeningQuestion)
  @Column(DataType.BIGINT)
  questionId: number

  @ForeignKey(() => LQuestion)
  @Column(DataType.BIGINT)
  l_questionsID: number;

  @Column({ type: DataType.JSONB, allowNull: true })
  answer: any

  @Column(DataType.BOOLEAN)
  is_correct: boolean

  @Column(DataType.DATE)
  submitted_at: Date

  @Column({ type: DataType.STRING, allowNull: false })
  question_type: string;

  @BelongsTo(() => User)
  user: User

  @BelongsTo(() => Exam)
  exam: Exam

  // 🟢 LQuestion bilan alias belgilanadi
  @BelongsTo(() => LQuestion, { as: "l_question" }) // <-- MUHIM
  l_question: LQuestion;

  @BelongsTo(() => ListeningQuestion)
  question: ListeningQuestion
}
