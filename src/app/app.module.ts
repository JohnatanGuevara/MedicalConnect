import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule, Routes, ExtraOptions} from '@angular/router'
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import {EventInput} from '@fullcalendar/core';
import { OrderByPipe } from 'ngx-pipes';
import { OrderModule } from 'ngx-order-pipe';
import { DatePipe } from '@angular/common';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { InicioComponent } from './inicio/inicio.component';
import { NuevoPacienteComponent } from './Pacientes/nuevo-paciente/nuevo-paciente.component';



import { HeaderbeforeComponent } from './headerbefore/headerbefore.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import {AngularFireModule} from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { PacientesService } from './services/pacientes.service';
import { RegistroComponent } from './auth/registro/registro.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AuthService } from './services/auth.service';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { ListapacientesComponent } from './Pacientes/listapacientes/listapacientes.component';
import { DetallesComponent } from './Pacientes/detalles/detalles.component';


import { CalendarioComponent } from './Calendario/calendario/calendario.component';
import { CalendarService } from './services/calendar.service';
import { NewheaderComponent } from './newheader/newheader.component';
import { ConsultaHOMEComponent } from './consulta-home/consulta-home.component';
import { DatosFiliatoriosComponent } from './ConsultaItems/datos-filiatorios/datos-filiatorios.component';
import { HeaderConsultaComponent } from './header-consulta/header-consulta.component';
import { InfoyAntComponent } from './ConsultaItems/infoy-ant/infoy-ant.component';
import { PacienteDataService } from './paciente-data.service';
import { DatosDeConsultaComponent } from './ConsultaItems/datos-de-consulta/datos-de-consulta.component';
import { RecipeComponent } from './ConsultaItems/recipe/recipe.component';
import { Pdf1PruebaComponent } from './Pdfs/pdf1-prueba/pdf1-prueba.component';
import { ConsultasService } from './services/consultas.service';
import { ArchivosComponent } from './archivos/archivos.component';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { ParaclinicosComponent } from './ConsultaItems/paraclinicos/paraclinicos.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RecipeNewComponent } from './ConsultaItems/recipe-new/recipe-new.component';
import { EVPREOPERATORIAComponent } from './ConsultaItems/evpreoperatoria/evpreoperatoria.component';
import { NOTAOPERATORIAComponent } from './ConsultaItems/notaoperatoria/notaoperatoria.component';





const routes: Routes = [
  { path: '', component: InicioComponent},
  { path: 'index', component: InicioComponent},
  { path: 'nuevopaciente', component:NuevoPacienteComponent },
  { path: 'homePage', component: HomepageComponent},
  { path: 'home', component: AppComponent},
  { path: 'registro', component: RegistroComponent},
  { path:'login', component: LoginComponent},
  { path: 'listapacientes', component: ListapacientesComponent},
  {path: 'detalles', component: DetallesComponent},
  {path: 'recipeNEW', component: RecipeNewComponent},
  {path: 'evpreoperatoria', component: EVPREOPERATORIAComponent},
  {path: 'notaoperatoria', component: NOTAOPERATORIAComponent},
 

  {path: 'calendario', component: CalendarioComponent},
  {path: 'consulta', component: ConsultaHOMEComponent},
  {path: 'datosfiliatorios', component: DatosFiliatoriosComponent},
  {path: 'infoyant', component: InfoyAntComponent},
  {path: 'datosconsulta', component: DatosDeConsultaComponent},
  {path: 'recipe', component: RecipeComponent},
  {path: 'printpdf', component: Pdf1PruebaComponent},
  {path: 'archivo', component: ArchivosComponent},
  {path: 'paraclinicos', component: ParaclinicosComponent},
  {path: 'perfil', component: PerfilComponent},
  { path: '**', component: HomepageComponent},
  { path: 'registro', component: RegistroComponent},
  { path: 'datosfiliatorios/:id', component: DatosFiliatoriosComponent },

  


 
  
  
  
]

const routerOptions: ExtraOptions = {
  onSameUrlNavigation: 'reload'  };


@NgModule({
  declarations: [
    AppComponent,
    
    InicioComponent,
    NuevoPacienteComponent,
    
  
   

    
    HeaderbeforeComponent,
    LoginComponent,
    HomepageComponent,
    NuevoPacienteComponent,
    RegistroComponent,
    ListapacientesComponent,
    DetallesComponent,
    
    
    CalendarioComponent,
    NewheaderComponent,
    ConsultaHOMEComponent,
    DatosFiliatoriosComponent,
    HeaderConsultaComponent,
    InfoyAntComponent,
    DatosDeConsultaComponent,
    RecipeComponent,
    Pdf1PruebaComponent,
    ArchivosComponent,
    ParaclinicosComponent,
    PerfilComponent,
    RecipeNewComponent,
    EVPREOPERATORIAComponent,
    NOTAOPERATORIAComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, RouterModule. forRoot(routes, routerOptions), AngularFireModule.initializeApp(environment.firebaseConfig), AngularFirestoreModule, FormsModule, ReactiveFormsModule, AngularFireAuthModule, provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()), BrowserAnimationsModule, FullCalendarModule, provideStorage(() => getStorage())
  ],
  exports: [RouterModule],
  providers: [PacientesService, AuthService, CalendarService, PacienteDataService, ConsultasService, OrderByPipe, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
