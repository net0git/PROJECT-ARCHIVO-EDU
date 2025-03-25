import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SubnavabarComponent } from '../../components/subnavabar/subnavabar.component';
import { ExpedienteResponseList } from '../../../domain/dto/Expediente.dto';
import { BusquedaService } from '../../services/remoto/busqueda/busqueda.service';
import { FormsModule } from '@angular/forms'; // Importar FormsModule en Standalone
import { CommonModule } from '@angular/common';
import { busqueda_codigo_vf } from '../../validator/busqueda.validator';
import { busqueda_nro_anio_vf } from '../../validator/busqueda.validator';
import { busqueda_nombre_parte_vf } from '../../validator/busqueda.validator';
import { SoloNumerosDirective } from '../../directives/solo-numeros.directive';
import { generatePDFreporte } from '../../components/pdfprint/pdfprint';
import { CredencialesService } from '../../services/local/credenciales.service';
declare var bootstrap: any;



@Component({
  selector: 'app-principal',
  imports: [NavbarComponent, SubnavabarComponent, FormsModule, CommonModule, SoloNumerosDirective],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css',

})
export class PrincipalComponent implements OnInit {

  pdfUrl: SafeResourceUrl | null = null;

  private myModal: any;
  selectedValue: string = 'codigo';
  showCodigo = false;
  showNumeroAnio = false;
  showNombreParte = false;

  codigoExpediente: string = '';
  numeroExpediente: string = '';
  anioExpediente: string = '';
  nombreParte: string = '';

  // dataExpediente: ExpedienteResponseList[] = {
  //   nro_expediente: '',
  //   codg_expediente: '',
  //   parte_demanda: '',
  //   parte_demandado: '',
  //   cod_anio_origen: '',
  //   nro_folios: '',
  //   fecha_conclu: new Date,
  //   estado: '',
  //   codg_anaquel: '',
  //   codg_fila: '',
  //   codg_column: '',
  //   codg_paquet: '',
  //   base_de_datos: ''
  // };

  dataExpediente: ExpedienteResponseList[] = []

  constructor(private busquedaService: BusquedaService, private sanitizer: DomSanitizer, private credencialesService:CredencialesService) { }
  ngOnInit(): void {
    this.onSelectionChange('codigo');
    // this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`/doc/error_carga.pdf`);
    this.pdfUrl = null;
  }

  openModal(expediente: ExpedienteResponseList) {
    this.myModal = new bootstrap.Modal(document.getElementById('exampleModalCenter'));
    this.myModal.show();
    this.generarPDF(expediente)
  }

  closeModal() {
    this.myModal.hide();
  }

  onSelectionChange(value: string) {
    this.selectedValue = value;

    if (value === 'codigo') {
      this.showNumeroAnio = false;
      this.showNombreParte = false;
      setTimeout(() => this.showCodigo = true, 50);
    }
    if (value === 'numeroAnio') {
      this.showCodigo = false;
      this.showNombreParte = false;
      setTimeout(() => this.showNumeroAnio = true, 50);
    }
    if (value === 'nombreParte') {
      this.showCodigo = false;
      this.showNumeroAnio = false;
      setTimeout(() => this.showNumeroAnio = true, 50);
    }
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
      next: (data: ExpedienteResponseList[]) => {

        this.dataExpediente = data;
        console.log(this.dataExpediente);
      },
      error: (error) => {
        console.log(error);
        this.dataExpediente = [];
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

    this.numeroExpediente = String(this.numeroExpediente).replace(/^0+/, '');

    this.busquedaService.BuscarPorNumeroAnio(this.numeroExpediente, this.anioExpediente).subscribe({
      next: (data: ExpedienteResponseList[]) => {

        this.dataExpediente = data;
        console.log(this.dataExpediente);

      },
      error: (error) => {
        console.log(error);
        this.dataExpediente = []
      },
      complete: () => {
        console.log('completado');
      }
    })
  }

  BuscarPorNombreParte() {
    const erroresValidacion = busqueda_nombre_parte_vf(this.nombreParte)
    if (erroresValidacion.length > 0) {
      let errorMensaje = '';
      erroresValidacion.forEach(error => {
        errorMensaje += `Error en el campo :"${error.campo}": ${error.mensaje} \n`;
      });
      alert(errorMensaje);
      return;
    }

    this.nombreParte = this.nombreParte.trim();

    this.busquedaService.BuscarPorNombreParte(this.nombreParte).subscribe({
      next: (data: ExpedienteResponseList[]) => {

        this.dataExpediente = data;
        console.log(this.dataExpediente);

      },
      error: (error) => {
        console.log(error);
        this.dataExpediente = []
      },
      complete: () => {
        console.log('completado');
      }
    })

  }

  generarPDF(expediente: ExpedienteResponseList) {


    this.pdfUrl = generatePDFreporte(expediente, this.credencialesService.credenciales.usuario, this.sanitizer)

  }

}
