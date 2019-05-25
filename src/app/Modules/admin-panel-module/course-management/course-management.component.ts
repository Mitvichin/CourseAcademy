import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { CourseService } from '../../../Services/course.service';
import { Course } from '../../../Models/Course';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query
} from '@angular/animations';
import { PARAMETERS } from '@angular/core/src/util/decorators';



@Component({
  selector: 'app-course-management',
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.scss'],
  animations:[
    trigger('slideUpTbRow', [
      state('void', style({
        fontSize: '0',
        opacity: 1
      })),
      transition('* => void', animate('0.3s'))
    ]),
    trigger('fadeInOut',[
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate('0.4s 300ms'))
    ]),
   
  ]
})
export class CourseManagementComponent implements OnInit {

  @ViewChild('tbody') tbody : ElementRef;
  selectedCourse:Course = {} as Course;
  iconContainerIDPrefix = "#iconCont";
  removeHoverCssClass = "removeHover";
  courses: Course[];
  shouldFade = true;
  isOpen = true;
  currentID = "";

  constructor(private courseService: CourseService, private renderer: Renderer2) { }

  async ngOnInit() {
    await this.populateCourses(); 
  }

  async populateCourses(){
    this.courses = await this.courseService.getAllCourses();
  }

  async deleteCourse(e: MouseEvent,id: number){
    e.stopPropagation();
    this.tbody.nativeElement.querySelector(`${this.iconContainerIDPrefix}${id}`).className += ` ${this.removeHoverCssClass}`;

    await this.courseService.deleteCourse(id);

    let itemIndex = this.courses.findIndex((x) => x.id == id);
    if(itemIndex != -1){
      this.courses.splice(itemIndex, 1);
    }
  }
  selectCourse(course: Course){
  this.selectedCourse = course; 
  }
  editCourse(course: Course){
  
  }
}
