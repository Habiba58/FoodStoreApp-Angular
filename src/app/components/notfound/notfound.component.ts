import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss'],
})
export class NotfoundComponent implements OnInit {
  @Input() visible: boolean = false;
  @Input() Message: string = 'Nothing Found!';
  @Input() resetLinkText: string = 'Reset';
  @Input() resetLinkRoute: string = '/Home';
  ngOnInit(): void {
    
  }
}
