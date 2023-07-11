import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Paciente, User } from 'src/app/models/models';
import { PacienteDataService } from 'src/app/paciente-data.service';
import { PacientesService } from 'src/app/services/pacientes.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AuthService } from 'src/app/services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
 



@Component({
  selector: 'app-pdf1-prueba',
  templateUrl: './pdf1-prueba.component.html',
  styleUrls: ['./pdf1-prueba.component.css']
})
export class Pdf1PruebaComponent { cssUrl!: string;

  title='dinamic-styles';
  paciente: Paciente | null = null;
  usuario: User | null = null;

  constructor(public sanitizer: DomSanitizer,private pacienteDataService: PacienteDataService, private pacientesService: PacientesService, private authService: AuthService) {this.cssUrl = '/assets/nicepage.css'}

  ngOnInit() {
    
    this.paciente = this.pacienteDataService.getPaciente();
    this.authService.obtenerUsuarioActual().then((user) => {
      if (user) {
        this.usuario = {
          nombres: user.nombres ?? '',
          apellidos: user.apellidos ?? '',
          correo: user.correo ?? '',
          cedula: user.cedula ?? '',
          password:user.nombres ?? '', 
          perfil:user.nombres ?? '', 
          uid: '',
          CM:user.CM ?? '', 
          telefono: user.nombres ?? '',
          MPPS: user.MPPS ?? '',
          RIF: user.RIF ?? '',
          Univ:user.Univ ?? '',
          Merito:user.Merito ?? '',
        };
      }
    });
  }
 

  generarPDF() {
    const pdf = new jsPDF('portrait', 'mm', 'a4');
    const imgWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = pdf.internal.pageSize.getHeight();
    const imgData = 'assets/img/FormatoINFPNG-01.png'; // Reemplaza 'ruta_de_la_imagen.jpg' con la ruta de tu imagen
  
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, '', 'FAST');
  
    pdf.setFont('Montserrat');
    pdf.setFontSize(8);
  
    const nombres = this.paciente?.nombres || '';
    const apellidos = this.paciente?.apellidos || '';
    const cedula = this.paciente?.cedula || '';
    const motivo = this.paciente?.motivo || '';
    const enfermedad = this.paciente?.ENFERMEDADACT || '';
    const TA = this.paciente?.TA || '';
    const FC = this.paciente?.FC || '';
    const FR = this.paciente?.FR || '';
    const SAT = this.paciente?.SATO2 || '';
    const PESO = this.paciente?.peso || '';
    const TALLA = this.paciente?.talla || '';
    const IMC  = this.paciente?.IMC || '';
    const DESCRIPCION = this.paciente?.DESCRIPCION || '';
    const IMPRESIONDIAG = this.paciente?.IMPRESIONDIAG || '';
    const PLAN = this.paciente?.PLAN || '';
    const INDICACIONES= this.paciente?.INDICACIONES || '';
    const antecedenteM= this.paciente?.DESCRIPCIONAM|| '';
    const antecedenteQ= this.paciente?.antecedenteQ || '';
    const antecedentesAbuelo= this.paciente?.ABUELOS || '';
    const antecedentesPadre= this.paciente?.PADRE || '';
    const antecedentesMadre= this.paciente?.MADRE || '';
    const antecedentesHermana= this.paciente?.HERMANOS || '';
    const paraclinicos= this.paciente?.PARACLINICOS || '';
    const edad= this.paciente?.edad || '';
    
    


   const consultaMarginTop = + 50;
   const consultaMarginLeft = + 20;
   const maxWidth = 170;
   


   pdf.text(`- Antecedentes Médicos: ${antecedenteM}`, consultaMarginLeft, consultaMarginTop, { maxWidth:  170 });
   pdf.text(`- Antecentes Quirúrgicos: ${antecedenteQ}`, consultaMarginLeft, consultaMarginTop + 15, { maxWidth:  170 });
   pdf.text(`- Antecedentes Familiares: `, consultaMarginLeft, consultaMarginTop + 35, { maxWidth:  170 });
   pdf.text(`Abuelo: ${antecedentesAbuelo}`, consultaMarginLeft, consultaMarginTop + 40, { maxWidth:  170 });
   pdf.text(`Padre: ${antecedentesPadre}`, consultaMarginLeft, consultaMarginTop + 45, { maxWidth:  170 });
   pdf.text(`Madre: ${antecedentesMadre}`, consultaMarginLeft, consultaMarginTop + 50, { maxWidth:  170 });
   pdf.text(`Hermanos: ${antecedentesHermana}`, consultaMarginLeft, consultaMarginTop + 55, { maxWidth:  170 });
   pdf.text(`- Motivo de Consulta: ${motivo}`, consultaMarginLeft, consultaMarginTop + 65, { maxWidth:  170 });
   pdf.text(`- Enfermedad Actual: ${enfermedad}`,consultaMarginLeft, consultaMarginTop + 75, { maxWidth:  170 });
   pdf.text(`TA: ${TA}mmHg`,consultaMarginLeft, consultaMarginTop + 105, { maxWidth:  170 });
   pdf.text(`FC: ${FC}lpm`,consultaMarginLeft + 30, consultaMarginTop + 105, { maxWidth:  170 });
   pdf.text(`FR: ${FR}rpm`,consultaMarginLeft + 60, consultaMarginTop + 105, { maxWidth:  170 });
   pdf.text(`SATO2: ${SAT}%`,consultaMarginLeft + 90, consultaMarginTop + 105, { maxWidth:  170 });
   pdf.text(`PESO: ${PESO}Kg`,consultaMarginLeft + 120, consultaMarginTop + 105, { maxWidth:  170 });
   pdf.text(`TALLA: ${TALLA}m`,consultaMarginLeft, consultaMarginTop + 110, { maxWidth:  170 });
   pdf.text(`IMG: ${IMC}Kg/m2`,consultaMarginLeft + 35, consultaMarginTop + 110, { maxWidth:  170 });
   pdf.text(`- Descripción: ${DESCRIPCION}`,consultaMarginLeft, consultaMarginTop + 115, { maxWidth:  170 });
   pdf.text(`- Impresión Diagnóstica: ${IMPRESIONDIAG}`,consultaMarginLeft, consultaMarginTop + 155, { maxWidth:  170 });
   pdf.text(`- Plan: ${PLAN}`,consultaMarginLeft, consultaMarginTop + 170, { maxWidth:  170 });
   pdf.text(`- Indicaciones: ${INDICACIONES}`,consultaMarginLeft, consultaMarginTop + 190, { maxWidth:  170 });
   pdf.text(`- Ordenes Paraclínicos: ${paraclinicos}`,consultaMarginLeft, consultaMarginTop + 200, { maxWidth:  170 });
   
   
   
   

   

   const marginTopDr = 10;
   const marginTop = 15;
   const marginLeft = 90;
   const fechaActual = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  


    const nombresMarginTop = + 260;
    const apellidosMarginTop = + 265;
    const cedulaMarginTop = + 270;
    const marginNames = 115;
    pdf.text(`Nombres: ${nombres}`,25, marginTop + 15);
    pdf.text(`Apellidos: ${apellidos}`, 85, marginTop + 15);
    pdf.text(`Cédula: ${cedula}`, 140, marginTop + 15);
    pdf.text(`Edad: ${edad}años`, 170, marginTop + 15);
    pdf.text(`Fecha: ${fechaActual}`, 150, marginTop + 20);

  
    const nombreDoc = this.usuario?.nombres || '';
    const apellidosDoc = this.usuario?.apellidos || '';
    const rif = this.usuario?.RIF || '';
    const mpps = this.usuario?.MPPS || '';
    const cm = this.usuario?.CM || '';
    const Univ = this.usuario?.Univ || '';
  
 
  
    // Agregar los datos del usuario en la parte superior de la página
    pdf.text(`${nombreDoc} ${apellidosDoc}`, marginLeft - 13.5, marginTopDr);
    pdf.text(`${Univ}`, marginLeft - 8, marginTopDr + 4);
    pdf.text(`RIF: ${rif}`, marginLeft - 11, marginTopDr + 8);
    pdf.text(`MPPS: ${mpps}`, marginLeft + 12.5, marginTopDr +8);
    pdf.text(`${cm}`, marginLeft - 3.5, marginTopDr + 12);
  
    // Guardar el PDF
    pdf.save(`ID-${cedula}-InformeMedico.pdf`);
  }
   
}
