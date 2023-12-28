import { Component, OnInit } from '@angular/core';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss']
})
export class ChipsComponent implements OnInit{
  constructor(private pageService: PageService) {}
  
  ngOnInit() {
    setTimeout(() => this.pageService.currentPage$.next('chips'));
  }

}
