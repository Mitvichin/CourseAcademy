import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'course-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']
})
export class RateComponent {
  @Output() voted = new EventEmitter<number>()
  
  constructor() { }

  rate(rateValue: number){
    this.voted.emit(rateValue);
  }
}
