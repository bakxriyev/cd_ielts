import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript"
import { User } from "../../user/user.model"
import { Exam } from "../../exam/exam.model"
import { Writing } from "../../writing/model/writing.model"
import { WritingPart } from "@/modules/writing/model/writing-parts"

@Table({ tableName: "writing_answers", timestamps: false })
export class WritingAnswer extends Model<WritingAnswer> {
  @Column({ type: DataType.BIGINT, autoIncrement: true, primaryKey: true })
  id: number

  @ForeignKey(() => User)
  @Column(DataType.STRING)
  user_id: string

  @ForeignKey(() => Exam)
  @Column(DataType.BIGINT)
  exam_id: number

  @ForeignKey(() => Writing)
  @Column(DataType.BIGINT)
  writing_id: number

 @Column({
    type: DataType.ENUM(...Object.values(WritingPart)),
    allowNull: true,
  })
  part: WritingPart

  @Column(DataType.TEXT)
  answer_text: string

  @Column(DataType.INTEGER)
  score: number

  @Column(DataType.DATE)
  submitted_at: Date

  @BelongsTo(() => User)
  user: User

  @BelongsTo(() => Exam)
  exam: Exam

  @BelongsTo(() => Writing)
  writing: Writing
}
