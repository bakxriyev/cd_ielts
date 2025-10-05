import { AllowNull, Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'clients', timestamps: true })
export class Client extends Model<Client> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  full_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  logo: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone_number: string;

  @Column({
    type: DataType.FLOAT,
    defaultValue: 0,
  })
  balance: number;

  @Column({
    type: DataType.FLOAT,
    defaultValue: 0,
    allowNull:false
  })
  mock_price: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  location: string;
}
