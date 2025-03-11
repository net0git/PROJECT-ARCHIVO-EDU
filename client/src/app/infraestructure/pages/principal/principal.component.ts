import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SubnavabarComponent } from '../../components/subnavabar/subnavabar.component';
import { ExpedienteResponseList } from '../../../domain/dto/Expediente.dto';
import { BusquedaService } from '../../services/remoto/busqueda/busqueda.service';
import { FormsModule } from '@angular/forms'; // Importar FormsModule en Standalone
import { CommonModule } from '@angular/common';
import { busqueda_codigo_vf } from '../../validator/busqueda.validator';
import { busqueda_nro_anio_vf } from '../../validator/busqueda.validator';
import { SoloNumerosDirective } from '../../directives/solo-numeros.directive';



@Component({
  selector: 'app-principal',
  imports: [NavbarComponent, SubnavabarComponent, FormsModule, CommonModule, SoloNumerosDirective],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css',
 
})
export class PrincipalComponent {
  selectedValue: string = 'codigo';

  codigoExpediente: string='';
  numeroExpediente: string='';
  anioExpediente: string='';

  dataExpediente: ExpedienteResponseList = {
    nro_expediente: '',
    codg_expediente: '',
    parte_demanda: '',
    parte_demandado: '',
    cod_anio_origen: '',
    nro_folios: '',
    fecha_conclu: new Date,
    estado: '',
    codg_anaquel: '',
    codg_fila: '',
    codg_column: '',
    codg_paquet: '',
    base_de_datos: ''
  };

  constructor(private busquedaService: BusquedaService) { }

  onSelectionChange(value: string) {
    this.selectedValue = value;
  }

  BuscarExpedientePorCodigo() {
    const erroresValidacion = busqueda_codigo_vf(this.codigoExpediente)
    if (erroresValidacion.length > 0) {
      let errorMensaje = '';
      erroresValidacion.forEach(error => {
        errorMensaje += `Error en el campo :"${error.campo}": ${error.mensaje} \n`;
      });
      alert(errorMensaje);
      return;
    }

    this.busquedaService.BuscarPorCodigo(this.codigoExpediente).subscribe({
      next: (data:ExpedienteResponseList) => {
        
        this.dataExpediente=data;
        console.log(this.dataExpediente);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('completado');
      }
    })
  }

  BuscarPorNumeroAnio() {
    const erroresValidacion = busqueda_nro_anio_vf(this.numeroExpediente, this.anioExpediente)
    if (erroresValidacion.length > 0) {
      let errorMensaje = '';
      erroresValidacion.forEach(error => {
        errorMensaje += `Error en el campo :"${error.campo}": ${error.mensaje} \n`;
      });
      alert(errorMensaje);
      return;
    }

    this.busquedaService.BuscarPorNumeroAnio(this.numeroExpediente, this.anioExpediente).subscribe({
      next: (data:ExpedienteResponseList) => {
        
        this.dataExpediente=data;
        console.log(this.dataExpediente);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('completado');
      }
    })
  }

}
