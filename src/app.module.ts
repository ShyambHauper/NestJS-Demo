import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeModule } from './employee/employee.module';
require('dotenv').config();

@Module({
  imports: [ MongooseModule.forRoot(process.env.DB),EmployeeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
