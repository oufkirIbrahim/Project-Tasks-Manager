import {Component, EventEmitter, Output} from '@angular/core';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatBadgeModule} from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatBadgeModule,
    MatTooltipModule,
    MatDivider
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() toggleMenu = new EventEmitter<void>();
}
