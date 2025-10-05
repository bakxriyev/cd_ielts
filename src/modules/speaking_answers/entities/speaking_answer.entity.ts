import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript"
import { User } from "../../user/user.model"
import { Exam } from "../../exam/exam.model"
import { Speaking } from "../../speaking/model/speaking.model"

@Table({ tableName: "speaking_answers", timestamps: false })
export class SpeakingAnswer extends Model<SpeakingAnswer> {
  @Column({ type: DataType.BIGINT, autoIncrement: true, primaryKey: true })
  id: number

  @ForeignKey(() => User)
  @Column(DataType.STRING)
  user_id: string

  @ForeignKey(() => Exam)
  @Column(DataType.BIGINT)
  exam_id: number

  @ForeignKey(() => Speaking)
  @Column(DataType.BIGINT)
  speaking_id: number

  @Column(DataType.STRING)
  audio_answer: string

  @Column(DataType.FLOAT)
  score: number

  @Column(DataType.DATE)
  submitted_at: Date

  @BelongsTo(() => User)
  user: User

  @BelongsTo(() => Exam)
  exam: Exam

  @BelongsTo(() => Speaking)
  speaking: Speaking
}
