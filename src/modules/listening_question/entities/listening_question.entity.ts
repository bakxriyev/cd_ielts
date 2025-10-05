import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript"
import { Listening } from "../../listening/listening.model"
import { ListeningAnswer } from "../../listening_answers/entities/listening_answer.entity"
import { ListeningPart } from "./listening-parts"
import { LQuestion } from "@/modules/l_questions/entities/l_question.entity"




@Table({ tableName: "listening_questions", timestamps: false })
export class ListeningQuestion extends Model<ListeningQuestion> {
  @Column({ type: DataType.BIGINT, autoIncrement: true, primaryKey: true })
  id: number

  @ForeignKey(() => Listening)
  @Column(DataType.BIGINT)
  listening_id: number

  @Column({ type: DataType.STRING, allowNull: true })
  title: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  instruction: string;

  @Column({ type: DataType.STRING, allowNull: true })
  photo: string;

  @Column({ type: DataType.ENUM("PART1", "PART2", "PART3","PART4"), allowNull: false })
  part: string;

  @Column(DataType.STRING)
  audio: string

  @Column(DataType.DATE)
  created_at: Date

  @BelongsTo(() => Listening)
  listening: Listening

  @HasMany(() => LQuestion)
  l_questions: LQuestion[];

  @HasMany(() => ListeningAnswer)
  listening_answers: ListeningAnswer[];
}
