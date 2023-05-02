import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee extends Document {

  @Prop({
    type: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      phone: {
        type: String, required: true, validate: {
          validator: (value) => {
            const phoneRegex = /^[0-9]{10}$/;
            return phoneRegex.test(value);
          },
          message: 'Invalid phone number',
        },
      },
      address: { type: String, required: true },
    },
  })
  personalDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
  };

  @Prop({
    type: [
      {
        degree: { type: String, required: true },
        fieldOfStudy: { type: String, required: true }
      },
    ],
  })
  educationalDetails: {
    degree?: string;
    fieldOfStudy?: string;
  }[];

  @Prop({
    type: [
      {
        compnyName: { type: String, required: true },
        yearOfExp: { type: String, required: true }
      },
    ],
  })
  experienceDetails: {
    compnyName?: string;
    yearOfExp?: string;
  }[];


  @Prop({
    type: {
      bankName: { type: String, required: true },
      accountNUmber: { type: String, required: true }
    },
  })
  bankDetails: {
    bankName: string;
    accountNUmber: string;
  }[];
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);


