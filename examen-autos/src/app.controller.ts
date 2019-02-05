import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('inicio')
  LlamarVistaInicio( 
    @Res() res
    )
  {
    res.render('inicio');
  }
  @Get('login')
  LlamarVistaLogin( 
    @Res() res
    )
  {
    res.render('login');
  }
  @Get('register')
  LlamarVistaRegistro( 
    @Res() res
    )
  {
    res.render('register');
  }

}
