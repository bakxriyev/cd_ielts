import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Reading } from '../../reading/reading.model'; // reading modeli

export enum PartEnum {
  PART1 = 'PART1',
  PART2 = 'PART2',
  PART3 = 'PART3',
}

export enum PassageType {
  DEFAULT = 'default',
  MATCHING = 'matching',
}

@Table({ tableName: 'passages', timestamps: true })
export class Passage extends Model<Passage> {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Reading)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  reading_id: number;

  @BelongsTo(() => Reading)
  reading: Reading;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  reading_text: string;

  @Column({
    type: DataType.ENUM(...Object.values(PartEnum)),
    allowNull: false,
  })
  part: PartEnum;

  @Column({
    type: DataType.ENUM(...Object.values(PassageType)),
    allowNull: false,
    defaultValue: PassageType.DEFAULT,
  })
  type: PassageType;
}
