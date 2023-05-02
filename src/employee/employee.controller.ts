import { EmployeeService } from './employee.service';
import { Controller, Get, Post, Delete, Param, Patch, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { constants } from 'src/config/constant';
import { sendErrorResponse, sendResponse } from 'src/services/common.services';

@Controller('/api/v1/employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) { }


  @Post('/add')
  async create(@Res() res: Response, @Req() req: Request): Promise<any> {
    try {
      const result = await this.employeeService.create(req.body);
      return sendResponse(
        res,
        constants.WEB_STATUS_CODE.OK,
        constants.STATUS_CODE.SUCCESS,
        'COMMONMESSAGES.EMPLOYEE_CREATED',
        result,
        req.headers.lang,
      );
    } catch (err) {
      return sendErrorResponse(
        res,
        constants.WEB_STATUS_CODE.OK,
        constants.STATUS_CODE.FAIL,
        err,
        '',
        req.headers.lang,
      );
    }
  }

  @Get('/findAll')
  async findAll(@Res() res: Response, @Req() req: Request): Promise<any> {

    const result = await this.employeeService.findAll(req);

    return sendResponse(
      res,
      constants.WEB_STATUS_CODE.OK,
      constants.STATUS_CODE.SUCCESS,
      'COMMONMESSAGES.GET_ALL_EMPLOYEE',
      result,
      req.headers.lang,
    );
  }

  @Patch('/update/:id')
  async update(@Res() res: Response, @Req() req: Request, @Param('id') id: string): Promise<any> {
    try {

      const result = await this.employeeService.update(id, req);

      return sendResponse(
        res,
        constants.WEB_STATUS_CODE.OK,
        constants.STATUS_CODE.SUCCESS,
        'COMMONMESSAGES.UPDATE_EMPLOYEE',
        result,
        req.headers.lang,
      );

    } catch (err) {
      return sendErrorResponse(
        res,
        constants.WEB_STATUS_CODE.OK,
        constants.STATUS_CODE.FAIL,
        err,
        '',
        req.headers.lang,
      );
    }

  }

  @Delete('/delete/:id')
  async delete(@Res() res: Response, @Req() req: Request, @Param('id') id: string): Promise<any> {
    const result = await this.employeeService.delete(id);

    return sendResponse(
      res,
      constants.WEB_STATUS_CODE.OK,
      constants.STATUS_CODE.SUCCESS,
      'COMMONMESSAGES.DELETE_EMPLOYEE',
      result,
      req.headers.lang,
    );
  }
}
