import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CourseService } from '../../../Services/course.service';
import { Course } from '../../../Models/Course';
import { AuthService } from '../../../Services/auth.service';
import { Rating } from '../../../Models/Rating';

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

  constructor(private courseService: CourseService, private authService: AuthService) { }

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

  async rateCourse(rateValue: number, course: Course){
    let userID:number = this.authService.getUserID();

    let rating: Rating = {userID: userID, rate:rateValue};

    await this.courseService.rateCourse(course,rating);
  }
}
