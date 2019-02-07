import { Controller, Get, Query, Res, Param } from "@nestjs/common";
import { EventoPorConductorService } from "./evento-por-conductor.service";

@Controller()

export class EventoPorConductorController{

    constructor(
        private readonly _eventoPorConductor: EventoPorConductorService
    ){}

    @Get('listar-evento-publico/:idEvento')
    async listarEventoPublico(
        @Res() response,
        @Param('idEvento') idEvento,
        
    ){
        let evento;
        
        if(idEvento){
            const consulta: number = +idEvento;
            evento = await this._eventoPorConductor.buscarPorID(consulta) ;
            
            response.render(
                'listar-eventos-publico',
                {
                    
                }
            )
        } else{
            response.render(
                'mostrar-eventos-publico',
                {
                    
                }
            )
        }

        

    }


}