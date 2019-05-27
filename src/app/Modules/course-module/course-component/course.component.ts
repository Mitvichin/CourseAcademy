import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CourseService } from '../../../Services/course.service';
import { Course } from '../../../Models/Course';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  @ViewChild('pageWrapper') pageWrapper : ElementRef
  curentDropdown: HTMLElement;
  shouldShowCurrDropdown = false;
  dropdownIdPrefix = "dropdown";
  showDropdownCssClass = "show";
  courses: Course[] = [];

  constructor(private courseService: CourseService) { }

  async ngOnInit() {
   this.courses = await this.courseService.getAllCourses();
  }

  showDropdown(id:number){
    this.curentDropdown = this.pageWrapper.nativeElement.querySelector(`#${this.dropdownIdPrefix}${id}`);
    
    if(this.curentDropdown.classList.contains(this.showDropdownCssClass) == false){
      this.curentDropdown.className += ` ${this.showDropdownCssClass}`;
    }
  }

  hideDropdown(){
    let dropdownClassList=this.curentDropdown.classList;

    if(dropdownClassList.contains(this.showDropdownCssClass)){
      dropdownClassList.remove(this.showDropdownCssClass);
    }
  }

  async rateCourse(rate: number, course: Course){
    console.log("mina");
    course.ratings.push(rate);

    await this.courseService.rateCourse(course);
  }
}
