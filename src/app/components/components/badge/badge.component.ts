import { Component, OnInit } from '@angular/core';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent implements OnInit{
  constructor(private pageService: PageService) {}
  
  ngOnInit() {
    setTimeout(() => this.pageService.currentPage$.next('badge'));
  }

}
