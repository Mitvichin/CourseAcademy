import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CourseService } from '../../../Services/course.service';
import { Course } from '../../../Models/Course';
import { fadeInOutAnimation } from '../../../Animations/fadeInOut';
@Component({
  selector: 'app-course-management',
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.scss'],
  animations: [
    fadeInOutAnimation
  ]
})
export class CourseManagementComponent implements OnInit {

  @ViewChild('tbody') tbody: ElementRef;
  selectedCourse: Course = {} as Course;
  iconContainerIDPrefix = "#iconCont";
  removeHoverCssClass = "removeHover";
  courses: Course[];
  shouldFade = true;
  isOpen = true;
  currentID = "";
  shoudShow = false;
  showHideFormText = "Add";
  refreshTable = false;

  constructor(private courseService: CourseService) { }

  async ngOnInit() {
    await this.populateCourses();
  }

  async populateCourses() {
    this.courses = await this.courseService.getAllCourses();
    console.log(this.courses);
  }

  async deleteCourse(e: MouseEvent, id: number) {
    e.stopPropagation();
    this.tbody.nativeElement.querySelector(`${this.iconContainerIDPrefix}${id}`).className += ` ${this.removeHoverCssClass}`;

    await this.courseService.deleteCourse(id);

    let itemIndex = this.courses.findIndex((x) => x.id == id);
    if (itemIndex != -1) {
      this.courses.splice(itemIndex, 1);
    }
  }

  editCourse(course: Course) {
    this.selectedCourse = course;
    if (this.showHideFormText == "Add") {
      this.showHideFormText = "Hide";
      this.shoudShow = true;
    }
  }

  showHideForm(course: Course) {
    this.shoudShow = !this.shoudShow;
    if (this.showHideFormText == "Add") {
      this.showHideFormText = "Hide";
      this.selectedCourse = {} as Course;
    }
    else {
      this.showHideFormText = "Add"
    }


  }
}
