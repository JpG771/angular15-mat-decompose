import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss']
})
export class CodeComponent implements AfterViewInit {
  @Input() fileName: string | undefined;
  @Input() codeInput: string | undefined;

  @ViewChild('codeBlock', { static: false }) codeBlock: ElementRef | undefined;

  ngAfterViewInit() {
    if (this.codeBlock) {
      (globalThis as any).hljs.highlightElement(this.codeBlock.nativeElement);
    }
  }

}
