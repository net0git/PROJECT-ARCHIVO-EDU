import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { encabezadoIconPDF } from '../../../../../public/icon/encabezadoIconPDF_base64';

import { formatDate } from '@angular/common';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'

import { PDFDocument, rgb } from 'pdf-lib';
import { ExpedienteResponseList } from '../../../domain/dto/Expediente.dto';


export function generatePDFreporte(
 
   
    expediente: ExpedienteResponseList,
    usuario: string,
    sanitizer: DomSanitizer) {
    // Obtener la fecha y hora actual
    const fechaHoraActual = new Date();
  
    // Obtener la fecha actual (en formato YYYY-MM-DD)
    const fechaActual = fechaHoraActual.toISOString().split('T')[0];
  
    // Obtener la hora actual (en formato HH:MM:SS)
    const horaActual = fechaHoraActual.toTimeString().split(' ')[0];
  
    const doc = new jsPDF();
  
  
  
  
    // **************************************************************************************
    // Datos de la tabla
    // const tableDataVehiculos: (string | number)[][] = [
    //   ['N', 'PLACA', 'AÑO', 'MODELO', 'MARCA', 'CTG', 'DOCUMENTO'],
  
    // ];
  
    // for (let i = 0; i < lista_vehiculos.length; i++) {
    //   const vehiculo = lista_vehiculos[i];
    //   const fila = [
    //     i + 1, // Número de fila
    //     vehiculo.placa,
    //     vehiculo.anio_fabricacion,
    //     vehiculo.modelo,
    //     vehiculo.marca,
    //     vehiculo.categoria,
    //     vehiculo.nombre_resolucion,
    //   ];
    //   tableDataVehiculos.push(fila);
    // }
  
    // console.log(tableDataVehiculos)
    // *****************************************************************************
    // Agregar una imagen a tu PDF
  
    // Posición y tamaño de la imagen en el PDF
  
  
    let imgData = encabezadoIconPDF
    doc.addImage(imgData, 'JPEG', 10, 12, 28, 20);//(x,y,ancho,alto)
    
    doc.setFontSize(8)
    doc.text('Fecha: ' + fechaActual, 170, 20);
    doc.text('Hora: ' + horaActual, 170, 5 + 20);
    doc.text('Resp: ' + usuario, 170, 5 + 5 + 20);
  
    doc.setFontSize(10)
    doc.text('INFORMACIÓN DEL EXPEDIENTE', 80 , 32);

    doc.line(10, 35, 200, 35);//(x1,y1,x2,y2)
    // Establece el tamaño de fuente más pequeño
    doc.setFontSize(11); // Cambia el valor a tu tamaño de fuente deseado
    //textos subtitulos
    const text1 = 'EXPEDIENTE :';
    const text2 = 'CODIGO :';
    const text3 = 'ESTADO :';
    const text4 = 'FOLIOS :';
    const text5 = 'DEMANDANTE :';
    const text6 = 'DEMANDADO :';
    const text7 = 'FEC. CONCLU :';
    //textos constenido
    const contenido1 = expediente.nro_expediente;
    const contenido2 = expediente.codg_expediente;
    const contenido3 = expediente.estado;
    const contenido4 = expediente.nro_folios;
    const contenido5 = expediente.parte_demanda;
    const contenido6 = expediente.parte_demandado; 
    const contenido7 = formatDate(expediente.fecha_conclu, 'dd/MM/yyyy', 'en-US');
  
    // for (let i = 0; i < resoluciones_empresa_servicio.length; i++) {
    //   const fecha_resolucion = formatDate(resoluciones_empresa_servicio[i].fecha_resolucion, 'dd/MM/yyyy', 'en-US');
    //   if (formatDate(empresa_detalle.fecha_inicial, 'dd/MM/yyyy', 'en-US') === fecha_resolucion) {
    //     //console.log(contenido6)
    //     contenido7 = resoluciones_empresa_servicio[i].nombre_resolucion
    //     //console.log(this.resoluciones_empresa_servicio[i].nombre_resolucion)
    //   }
  
    //   console.log(empresa_detalle)
    // }
    const x = 14; // Posición horizontal
    const y = 40; // Posición vertical
    const rectWidth = 42; // Ancho del rectángulo basado en el texto
    const rectHeight = 8; // Altura del rectángulo
  
  
    //SUBTITULOS DATOS
    //EXPEDIENTE
    // Establece el color de fondo del rectángulo a gris
    doc.setFillColor(140, 140, 140); // Gris en RGB
    doc.rect(x, y, rectWidth, rectHeight, 'F'); //  'F' indica que se debe rellenar
    doc.setTextColor(255, 255, 255); // Blanco en RGB
    doc.text(text1, x + 2, y + rectHeight - 2);
    //CODIGO
    // Establece el color de fondo del rectángulo a gris
    doc.setFillColor(140, 140, 140); // Gris en RGB
    doc.rect(x, y + 10, rectWidth, rectHeight, 'F'); //  'F' indica que se debe rellenar
    doc.setTextColor(255, 255, 255); // Blanco en RGB
    doc.text(text2, x + 2, y + 10 + rectHeight - 2);
    //ESTADO 
    // Establece el color de fondo del rectángulo a gris
    doc.setFillColor(140, 140, 140); // Gris en RGB
    doc.rect(x, y + 20, rectWidth, rectHeight, 'F'); //  'F' indica que se debe rellenar
    doc.setTextColor(255, 255, 255); // Blanco en RGB
    doc.text(text3, x + 2, y + 20 + rectHeight - 2);
    //FOLIOS
    // Establece el color de fondo del rectángulo a gris
    doc.setFillColor(140, 140, 140); // Gris en RGB
    doc.rect(x, y + 30, rectWidth, rectHeight, 'F'); //  'F' indica que se debe rellenar
    doc.setTextColor(255, 255, 255); // Blanco en RGB
    doc.text(text4, x + 2, y + 30 + rectHeight - 2);
    //DEMANDANTE
    // Establece el color de fondo del rectángulo a gris
    doc.setFillColor(140, 140, 140); // Gris en RGB
    doc.rect(x, y + 40, rectWidth, rectHeight, 'F'); //  'F' indica que se debe rellenar
    doc.setTextColor(255, 255, 255); // Blanco en RGB
    doc.text(text5, x + 2, y + 40 + rectHeight - 2);
    //DEMANDADO
    // Establece el color de fondo del rectángulo a gris
    doc.setFillColor(140, 140, 140); // Gris en RGB
    doc.rect(x, y + 50, rectWidth, rectHeight, 'F'); //  'F' indica que se debe rellenar
    doc.setTextColor(255, 255, 255); // Blanco en RGB
    doc.text(text6, x + 2, y + 50 + rectHeight - 2);
    //FEC. CONCLU
    // Establece el color de fondo del rectángulo a gris
    doc.setFillColor(140, 140, 140); // Gris en RGB
    doc.rect(x, y + 60, rectWidth, rectHeight, 'F'); //  'F' indica que se debe rellenar
    doc.setTextColor(255, 255, 255); // Blanco en RGB
    doc.text(text7, x + 2, y + 60 + rectHeight - 2);
  
    //CONTENIDO DATOS
    doc.setTextColor(0, 0, 0); // Blanco en RGB
    //RAZON SOCIAL 
    // Dibuja el rectángulo para ruc
    doc.rect(x + 45, y, rectWidth + 95, rectHeight);
    doc.text(contenido1, x + 47, y + rectHeight - 2);
    //RUC
    doc.rect(x + 45, y + 10, rectWidth + 95, rectHeight);
    doc.text(contenido2, x + 47, y + 10 + rectHeight - 2);
    //DIRECCION
    doc.rect(x + 45, y + 20, rectWidth + 95, rectHeight);
    doc.text(contenido3, x + 47, y + 20 + rectHeight - 2);
    //TELEFONOS
    doc.rect(x + 45, y + 30, rectWidth + 95, rectHeight);
    doc.text(contenido4, x + 47, y + 30 + rectHeight - 2);
    //REPRESENTANTE
    doc.rect(x + 45, y + 40, rectWidth + 95, rectHeight);
    doc.text(contenido5, x + 47, y + 40 + rectHeight - 2);
    //DEMANDA
    doc.rect(x + 45, y + 50, rectWidth + 95, rectHeight);
    doc.text(contenido6, x + 47, y + 50 + rectHeight - 2);
    ////DEMANDADO
    doc.rect(x + 45, y + 60, rectWidth + 95, rectHeight);
    doc.text(contenido7, x + 47, y + 60 + rectHeight - 2)
    
    doc.setFontSize(10)
    doc.text('UBICACIÓN : '+expediente.base_de_datos, x + 120, y + 70 + rectHeight );
    doc.text('Anaquel : '+expediente.codg_anaquel, x + 120, y + 75 + rectHeight );
    doc.text('Fila : '+expediente.codg_fila, x + 120, y + 80 + rectHeight );
    doc.text('Columna : '+expediente.codg_column, x + 120, y + 85 + rectHeight );
    doc.text('Paquete : '+expediente.codg_paquet, x + 120, y + 90 + rectHeight );
  

    for (let i = 1; i <= doc.internal.pages.length - 1; i++) {
      doc.setFontSize(10)
      doc.text('Poder Judicial del Peru', 10, 280)  
      doc.text('Sistema Unificado de Búsqueda de Archivos', 130, 280)  
      doc.setPage(i); // Cambiar a la página con el índice deseado
      doc.line(10, doc.internal.pageSize.height - 14, 200, doc.internal.pageSize.height - 14);
      doc.text('página ' + i + ' de ' + (doc.internal.pages.length - 1), 170, doc.internal.pageSize.height - 10);
    }
    // Genera una representación en Blob del PDF
    const blob = doc.output('blob');
    return sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
  }