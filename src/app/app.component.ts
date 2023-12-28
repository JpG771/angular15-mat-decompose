import { Component } from '@angular/core';
import { PageService } from './services/page.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-mat-decompose';
  currentPage: string = '';

  constructor(private pageService: PageService) {
    this.pageService.currentPage$.subscribe(value => this.currentPage = value);
  }
}
