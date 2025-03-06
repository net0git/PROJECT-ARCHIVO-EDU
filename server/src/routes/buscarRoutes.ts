import { Router } from "express";
import busquedaController from "../controllers/busquedaController";

class BusquedaRoutes{

    public router: Router;

    constructor(){
        this.router=Router();
        this.config();
        
    }
    config():void{
  
       
         this.router.get('/api/expediente/buscar/:codigoExpediente',busquedaController.buscarExpedienteCodigo)
         this.router.get('/api/expediente/buscar/:numero/:anio',busquedaController.buscarPorNumeroYAnio)
        
          
    }
}

const busquedaRoutes = new BusquedaRoutes
export default busquedaRoutes.router;