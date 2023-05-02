import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { Employee, EmployeeSchema } from './employee.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Employee.name, schema:EmployeeSchema }]),
  ],
  providers: [EmployeeService],
  controllers: [EmployeeController]

})
export class EmployeeModule {}
