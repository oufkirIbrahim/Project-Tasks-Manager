import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchTermSubject = new BehaviorSubject<string>('');

  constructor() {}

  // Method for the header component to set the search term
  setSearchTerm(term: string): void {
    this.searchTermSubject.next(term);
  }

  // Method for other components to subscribe to search term changes
  getSearchTerm(): Observable<string> {
    return this.searchTermSubject.asObservable();
  }

  // Clear the search term
  clearSearch(): void {
    this.searchTermSubject.next('');
  }
}
