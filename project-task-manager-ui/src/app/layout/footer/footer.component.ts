import { Component } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbar
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
