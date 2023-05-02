import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee, EmployeeDocument } from './employee.schema';

@Injectable()
export class EmployeeService {
  constructor(@InjectModel(Employee.name) private Employee: Model<EmployeeDocument>) { }

  async create(employee: Employee): Promise<Employee> {
    const createdEmployee = new this.Employee(employee);
    return createdEmployee.save();
  }

  async findAll(req: any): Promise<any> {
    let skip: any;
    let limit: any;
    const searchValue = req.query.search;

    skip = req.query.skip || 1;
    limit = req.query.limit || 10;

    const searchRegex = new RegExp(searchValue, 'i');


    let employeeData = await this.Employee.find({
      $or: [
        { 'personalDetails.firstName': searchRegex },
        { 'personalDetails.lastName': searchRegex },
        { 'personalDetails.email': searchRegex },
        { 'personalDetails.phone': searchRegex },
        { 'personalDetails.address': searchRegex },
      ],
    })
      .sort({ createdAt: -1 })
      .lean();



    employeeData = employeeData.slice((skip - 1) * limit, skip * limit);

    return { employeeData: employeeData, count: employeeData.length };
  }


  async update(id: string, req: any): Promise<any> {

    const updatedData = req.body
    const result = await this.Employee.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    })
    return result
  }

  async delete(id: string): Promise<Employee> {
    this.Employee.findByIdAndDelete(id).exec();
    return
  }
}
