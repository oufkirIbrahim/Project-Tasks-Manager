import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    MatDividerModule,
    MatTooltipModule,
    RouterModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  pageSize: number = 10;
  currentFilter: string = 'all';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  changeFilter(filter: string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: 0, size: this.pageSize, filter },
      queryParamsHandling: 'merge' // This ensures other query params (like page size) stay intact
    });
  }

}
