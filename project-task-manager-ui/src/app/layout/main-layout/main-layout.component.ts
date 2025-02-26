import { Component, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatIconModule,
    HeaderComponent,
    SidebarComponent,
    FooterComponent

  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  @ViewChild('sidenav') sidenav: any;
  isMobile = window.innerWidth < 768;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = window.innerWidth < 768;
    if (!this.isMobile && this.sidenav) {
      this.sidenav.open();
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (!this.isMobile) {
        this.sidenav.open();
      }
    });
  }
}
