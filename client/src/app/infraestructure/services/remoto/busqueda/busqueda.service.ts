import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { ExpedienteResponseList } from '../../../../domain/dto/Expediente.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

  // this.router.get('/api/expediente/buscar-codigo/:codigoExpediente',busquedaController.buscarExpedienteCodigo)
  //this.router.get('/api/expediente/buscar-nro-anio/:numero/:anio',busquedaController.buscarPorNumeroYAnio)
  private url_api_busqueda = `${environment.urlApi}/expediente`;
  constructor(private http: HttpClient) { }


  BuscarPorCodigo(codigoExpediente: string): Observable<ExpedienteResponseList[]> {
    return this.http.get<ExpedienteResponseList[]>(`${this.url_api_busqueda}/buscar-codigo/${codigoExpediente}`)
  }

  BuscarPorNumeroAnio(numero: string, anio: string): Observable<ExpedienteResponseList[]> {
    return this.http.get<ExpedienteResponseList[]>(`${this.url_api_busqueda}/buscar-nro-anio/${numero}/${anio}`)
  }

}
