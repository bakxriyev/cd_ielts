import { Column, DataType, Model, Table } from 'sequelize-typescript';

export enum AdminType {
  ADMIN = 'admin',
  SUPERADMIN = 'superadmin',
}

@Table({ tableName: 'admins', timestamps: true })
export class Admin extends Model<Admin> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  full_name: string;

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
    type: DataType.ENUM(...Object.values(AdminType)),

    allowNull: true,
  })
  type: AdminType;
}
