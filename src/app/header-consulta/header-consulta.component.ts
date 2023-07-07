import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-header-consulta',
  templateUrl: './header-consulta.component.html',
  styleUrls: ['./header-consulta.component.css']
})
export class HeaderConsultaComponent {
  cssUrl!: string;

  title='dinamic-styles';

  constructor(public sanitizer: DomSanitizer){

    this.cssUrl = '/assets/nicepage.css'
  }

}
