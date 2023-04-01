import { Model, DataTypes } from "sequelize";
import dbConnection from "../config/db/pg-connector";

enum Gender {
  'Male',
  'Female',
  'Other'
}

interface CustomerInstance extends Model {
  id: number;
  name: string;
  email: string;
  gender: Gender;
  created_at: Date;
  updated_at: Date | null; //mixed
}

const CustomerModel = dbConnection.define<CustomerInstance>(
  "customers",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Automatically gets converted to SERIAL for postgres
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM('Male','Female','Other'),
      defaultValue: 'Male',
    },
    createdAt: {
      field: "created_at",
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      field: "updated_at",
      type: DataTypes.DATE,
      defaultValue: null,
    },
  }
);

export { CustomerModel };
