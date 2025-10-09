import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: "otps", timestamps: true })
export class Otp extends Model<Otp> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  code: string; // 6 xonali OTP

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  expires_at: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  role: string; // 'admin' yoki 'client'
}
