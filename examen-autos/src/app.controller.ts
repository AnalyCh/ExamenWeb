import { Controller, Get, Res } from '@nestjs/common';
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
