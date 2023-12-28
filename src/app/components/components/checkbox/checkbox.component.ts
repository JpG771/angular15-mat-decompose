import { Component, OnInit } from '@angular/core';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit{
  constructor(private pageService: PageService) {}
  
  ngOnInit() {
    setTimeout(() => this.pageService.currentPage$.next('checkbox'));
  }

}
