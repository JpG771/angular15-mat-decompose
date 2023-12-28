import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  currentPage$ = new Subject<string>();

  constructor() { }
}
