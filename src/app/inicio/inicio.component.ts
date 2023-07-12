import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';




@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['inicio.component.css']
})
export class InicioComponent { constructor(public sanitizer: DomSanitizer){this.cssUrl = '/assets/nicepage.css'}
  
  cssUrl!: string;

  title='dinamic-styles';

}
