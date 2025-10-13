import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  BeforeValidate,
} from "sequelize-typescript";
import { Reading } from "../reading/reading.model";
import { Listening } from "../listening/listening.model";
import { Speaking } from "../speaking/model/speaking.model";
import { Writing } from "../writing/model/writing.model";

@Table({ tableName: "exams", timestamps: false })
export class Exam extends Model<Exam> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
  })
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

  // ✅ ID ni validatsiyadan oldin yaratamiz
  @BeforeValidate
  static async generateRandomId(exam: Exam) {
    if (!exam.id) {
      let unique = false;
      let newId: number;

      while (!unique) {
        newId = Math.floor(100000 + Math.random() * 900000);
        const existing = await Exam.findOne({ where: { id: newId } });
        if (!existing) unique = true;
      }

      exam.id = newId;
    }
  }
}
