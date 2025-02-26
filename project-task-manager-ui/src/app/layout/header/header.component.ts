import {Component, EventEmitter, Output} from '@angular/core';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatBadgeModule} from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MatDivider} from '@angular/material/divider';
import {SearchService} from '../../core/services/search.service';
import {debounceTime, distinctUntilChanged} from 'rxjs';

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
    MatDivider,
    ReactiveFormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() toggleMenu = new EventEmitter<void>();

  searchControl = new FormControl('');

  constructor(private searchService: SearchService) {
    // Set up search with debounce to avoid too many API calls
    this.searchControl.valueChanges.pipe(
      debounceTime(300), // Wait 300ms after the last event before emitting
      distinctUntilChanged() // Only emit when the value has changed
    ).subscribe(value => {
      this.searchService.setSearchTerm(value || '');
    });
  }

  clearSearch(): void {
    this.searchControl.setValue('');
    this.searchService.clearSearch();
  }
}
