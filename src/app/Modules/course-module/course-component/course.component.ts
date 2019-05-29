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
  userID:number;
  dropdownIdPrefix = "dropdown";
  showDropdownCssClass = "show";
  courses: Course[] = [];

  constructor(private courseService: CourseService, private authService: AuthService) { }

  async ngOnInit() {
   this.userID = this.authService.getUserID();
   this.courses = await this.courseService.getAllCourses();
  }

  async rateCourse(rateValue: number, course: Course){
    let tempCourse = course.ratings.find((x) => x.userID == this.userID)

    if(tempCourse){
      alert('You have already voted!');
      return;
    }

    let rating: Rating = {userID: this.userID, rate:rateValue};

    await this.courseService.rateCourse(course,rating);
  }

  async joinCourse(course: Course){
    if(course.userIDs.includes(this.userID)){
      alert('You have already joined!');
      return;
    }

    await this.courseService.joinCourse(course, this.userID);
  }

  isJoined(course: Course): string{

    if(course.userIDs.includes(this.userID)){
      return 'joinedCourse'
    }

    return '';
  }

  isRated(course:Course): string{
    let tempCourse = course.ratings.find((x) => x.userID == this.userID)

    if(tempCourse){
      return 'ratedCourse';
    }

    return '';
  }
}
