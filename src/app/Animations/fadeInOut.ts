import {
    animation, trigger, animateChild, group,
    transition, animate, style,state, query
  } from '@angular/animations';

  
  export const fadeInOutAnimation = trigger('fadeInOut',[
      state('void', style({
          opacity: 0
        })),
        transition('void <=> *', animate('0.4s 300ms'))
      ]);
