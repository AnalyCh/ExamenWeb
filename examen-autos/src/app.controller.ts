import {Get, Controller, Res} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(
    @Res() response
  ){
    //return this.appService.root();
    response.render(
      'pruebas'
    )
  };

  @Get('prueba')
  prueba(
    @Res() response
  ){
    response.render(
      'pruebas'
    )
  }



}
