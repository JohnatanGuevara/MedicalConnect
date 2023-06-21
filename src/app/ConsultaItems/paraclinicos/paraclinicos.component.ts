import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Paciente, User } from 'src/app/models/models';
import { PacienteDataService } from 'src/app/paciente-data.service';
import { PacientesService } from 'src/app/services/pacientes.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-paraclinicos',
  templateUrl: './paraclinicos.component.html',
  styleUrls: ['./paraclinicos.component.css', './nicepage.css'], 
})
export class ParaclinicosComponent implements OnInit {
  @ViewChild('recipeTextarea') recipeTextarea!: ElementRef;
  @ViewChild('indicacionesTextarea') indicacionesTextarea!: ElementRef;
  
  paciente: Paciente | null = null;
  usuario: User | null = null;

  constructor(private pacienteDataService: PacienteDataService, private pacientesService: PacientesService, private authService: AuthService) {}

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

  actualizarPaciente() {
    if (this.paciente && this.paciente.id) {
      this.pacientesService.actualizarPaciente(this.paciente.id, this.paciente)
        .then(() => {
          console.log('Paciente actualizado correctamente');
          window.alert('Paciente Actualizado')
        })
        .catch((error) => {
          console.error('Error al actualizar el paciente:', error);
        });
    } else {
      console.error('No se puede actualizar el paciente: ID no válido');
    }
  }
  generarPDF() {
    if (this.recipeTextarea) {
      const recipeElement = this.recipeTextarea.nativeElement;
      
  
      html2canvas(recipeElement).then((recipeCanvas) => {
       
          const pdf = new jsPDF('landscape', 'mm', 'a4');
          const recipeImgData = recipeCanvas.toDataURL('image/png');
        
          const imgWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = pdf.internal.pageSize.getHeight();
        const imgData = 'assets/img/FormatoOPPNG-01.png'; // Reemplaza 'ruta_de_la_imagen.jpg' con la ruta de tu imagen

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, '', 'FAST');
  
  
          pdf.setFont('Montserrat');
          pdf.setFontSize(14);
          const recipeContent = this.recipeTextarea.nativeElement.value;
          
  
          // Calcular la mitad de la página
          const halfPageWidth = pdf.internal.pageSize.getWidth() / 2;
          const quarterPageHeight = pdf.internal.pageSize.getHeight() / 4;
  
         
          
  
          // Agregar el contenido del recipeTextarea en la mitad izquierda con margen izquierdo adicional
          const recipeMarginLeft = 12
          pdf.text(recipeContent, recipeMarginLeft, quarterPageHeight + 10, { maxWidth: halfPageWidth - 20 });
  
        

          const nombres = this.paciente?.nombres || '';
        const apellidos = this.paciente?.apellidos || '';
        const cedula = this.paciente?.cedula || '';
        const nombresMarginTop = quarterPageHeight + 120;
        const apellidosMarginTop = quarterPageHeight + 125;
        const cedulaMarginTop = quarterPageHeight + 130;
        const marginNames = 70;
        const edad=this.paciente?.edad || '';
        const fechaActual = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'numeric', day: 'numeric' });


        pdf.text(`Nombres: ${nombres}`, marginNames, nombresMarginTop);
        pdf.text(`Apellidos: ${apellidos}`, marginNames, apellidosMarginTop);
        pdf.text(`Cédula: ${cedula}`, marginNames, cedulaMarginTop);
        pdf.text(`Edad: ${edad}`, marginNames, cedulaMarginTop + 5);
        pdf.text(`Fecha: ${fechaActual}`, marginNames, cedulaMarginTop + 10);

       
        const nombreDoc = this.usuario?.nombres || '';
          const apellidosDoc = this.usuario?.apellidos || '';
          const rif = this.usuario?.RIF || '';
          const mpps = this.usuario?.MPPS || '';
          const cm = this.usuario?.CM || '';

          const marginTop = 15;
          const marginLeft = 50;

          // Agregar los datos del usuario en la parte superior de la página
          pdf.text(`${nombreDoc}  ${apellidosDoc}`, marginLeft - 20, marginTop);
          pdf.text(`RIF: ${rif}`, marginLeft + 1, marginTop + 5);
          pdf.text(`MPPS: ${mpps}`, marginLeft + 3, marginTop + 10);
          pdf.text(`${cm}`, marginLeft + 1, marginTop + 15);

         




        

          
          // Guardar el PDF
          pdf.save('OrdenesParaclínicos.pdf');
        });
      };
    }
  }


