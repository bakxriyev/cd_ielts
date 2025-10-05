import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { Reading } from "../reading/reading.model";
import { Listening } from "../listening/listening.model";
import { Speaking } from "../speaking/model/speaking.model";
import { Writing } from "../writing/model/writing.model";

@Table({ tableName: "exams", timestamps: false })
export class Exam extends Model<Exam> {
  @Column({ type: DataType.BIGINT, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
  title: string;

  @Column({ type: DataType.STRING })
  description: string;

  @Column({ type: DataType.STRING })
  password: string;

  @Column({ type: DataType.STRING })
  duration: string;

  @Column({ type: DataType.STRING })
  photo: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  is_active: boolean;

  @HasMany(() => Reading)
  readings: Reading[];

  @HasMany(() => Listening)
  listenings: Listening[];

  @HasMany(() => Speaking)
  speakings: Speaking[];

  @HasMany(() => Writing)
  writings: Writing[];
}
