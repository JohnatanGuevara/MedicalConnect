import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Paciente, User } from 'src/app/models/models';
import { PacienteDataService } from 'src/app/paciente-data.service';
import { PacientesService } from 'src/app/services/pacientes.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AuthService } from 'src/app/services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';


  

@Component({
  selector: 'app-evpreoperatoria',
  templateUrl: './evpreoperatoria.component.html',
  styleUrls: ['./evpreoperatoria.component.css']
})
export class EVPREOPERATORIAComponent { 
  cssUrl!: string;
  title='dinamic-styles';
  paciente: Paciente | null = null;
  usuario: User | null = null;
  @ViewChild('diagnosticoTextarea') diagnosticoTextarea!: ElementRef;
  @ViewChild('cirugiaTextarea') cirugiaTextarea!: ElementRef;
  @ViewChild('cirujanoTextarea') cirujanoTextarea!: ElementRef;
  @ViewChild('antecedentesTextarea') antecedentesTextarea!: ElementRef;
  @ViewChild('examenTextarea') examenTextarea!: ElementRef;
  @ViewChild('asaTextarea') asaTextarea!: ElementRef;
  @ViewChild('goldmanTextarea') goldmanTextarea!: ElementRef;
  @ViewChild('conclusionesTextarea') conclusionesTextarea!: ElementRef;
  
                     constructor(public sanitizer: DomSanitizer, private pacienteDataService: PacienteDataService, private pacientesService: PacientesService, private authService: AuthService){

                                                                  this.cssUrl = '/assets/nicepage.css' }

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
      const imgData = 'assets/img/EVPREOPERATORIA.png';
      const diagnosticoElement = this.diagnosticoTextarea.nativeElement.value;
      const cirugiaElement = this.cirugiaTextarea.nativeElement.value;
      const cirujanoElement = this.cirujanoTextarea.nativeElement.value;
      const antecedentesElement = this.antecedentesTextarea.nativeElement.value;
      const examenElement = this.examenTextarea.nativeElement.value;
      const asaElement = this.asaTextarea.nativeElement.value;
      const goldmanElement = this.goldmanTextarea.nativeElement.value;
      const conclusionesElement = this.conclusionesTextarea.nativeElement.value;
     
    
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, '', 'FAST');
    
      pdf.setFont('Montserrat');
      pdf.setFontSize(10);
    
      const nombres = this.paciente?.nombres || '';
      const apellidos = this.paciente?.apellidos || '';
      const cedula = this.paciente?.cedula || '';
    
      const edad= this.paciente?.edad || '';
      
      
  
  
     const consultaMarginTop = + 35;
     const consultaMarginLeft = + 20;
     const maxWidth = 170;
     
  
  
     pdf.text(`- Diagnóstico: ${diagnosticoElement}`, consultaMarginLeft, consultaMarginTop +15, { maxWidth:  170 });
     pdf.text(`- Cirugía propuesta: ${cirugiaElement}`, consultaMarginLeft, consultaMarginTop + 30, { maxWidth:  170 }); 
     pdf.text(`- Cirujano: ${cirujanoElement} `, consultaMarginLeft, consultaMarginTop + 45, { maxWidth:  170 });
    
     pdf.text(`- Antecedentes: ${antecedentesElement}`,consultaMarginLeft, consultaMarginTop + 55, { maxWidth:  170 });
    
     pdf.text(`- Examen físico: ${examenElement}`,consultaMarginLeft, consultaMarginTop + 95, { maxWidth:  170 });
     pdf.text(`- ASA: ${asaElement}`,consultaMarginLeft, consultaMarginTop + 145, { maxWidth:  170 });
     pdf.text(`- GOLDMAN: ${goldmanElement}`,consultaMarginLeft, consultaMarginTop + 155, { maxWidth:  170 });
     pdf.text(`- Conclusiones: ${conclusionesElement}`,consultaMarginLeft, consultaMarginTop + 165, { maxWidth:  170 });

     
     
     
     
  
     
  
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
      pdf.save(`ID-${cedula}-EVPREOPERATORIA.pdf`);
    }
     
  }




