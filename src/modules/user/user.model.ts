import { Table, Column, Model, DataType, HasMany, BeforeCreate } from "sequelize-typescript";
import { Result } from "../result/model/result.model";
import { ListeningAnswer } from "../listening_answers/entities/listening_answer.entity";
import { WritingAnswer } from "../writing_answers/entities/writing_answer.entity";
import { SpeakingAnswer } from "../speaking_answers/entities/speaking_answer.entity";
import { ReadingAnswer } from "../reading_answers/entities/reading_answer.entity";

@Table({ tableName: "users", timestamps: true })
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  id: string; // endi string formatda bo‘ladi (masalan: REI000001)

  @Column({ type: DataType.STRING,allowNull: true })
  name: string;

  @Column({ type: DataType.STRING,allowNull: true })
  email: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: true })
  username: string;

  @Column({ type: DataType.STRING,allowNull: true })
  password: string;

  @Column({ type: DataType.STRING , allowNull: false})
  location: string; 

  @Column({ type: DataType.STRING, allowNull: true })
  refreshToken: string;

  @HasMany(() => Result)
  results: Result[];

  @HasMany(() => WritingAnswer)
  writingAnswers: WritingAnswer[];

  @HasMany(() => SpeakingAnswer)
  speakingAnswers: SpeakingAnswer[];

  @HasMany(() => ListeningAnswer)
  listeningAnswers: ListeningAnswer[];

  @HasMany(() => ReadingAnswer)
  readingAnswers: ReadingAnswer[];

  // ✅ BeforeCreate hook orqali avtomatik ID yaratish
  @BeforeCreate
static async generateCustomId(user: User) {
  const prefix = user.location?.toUpperCase() || "REI";

  const lastUser = await User.findOne({
    where: { location: user.location },
    order: [["createdAt", "DESC"]],
  });

  let nextNumber = 1;
  if (lastUser && lastUser.id) {
    const lastNumber = parseInt(lastUser.id.slice(prefix.length)) || 0;
    nextNumber = lastNumber + 1;
  }

  const formattedNumber = nextNumber.toString().padStart(6, "0");
  user.id = `${prefix}${formattedNumber}`;
}

}
