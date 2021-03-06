import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CourseService } from '../../../../Services/course.service';
import { Course } from '../../../../Models/Course';
import { fadeInOutAnimation } from '../../../../Animations/fadeInOut';
@Component({
  selector: 'app-add-edit-course',
  templateUrl: './add-edit-course.component.html',
  styleUrls: ['./add-edit-course.component.scss'],
  animations: [
    fadeInOutAnimation
  ]
  
})
export class AddEditCourseComponent implements OnInit {
  @Input('course') course: Course = {} as Course;
  @Output() onSubmited = new EventEmitter<number>()
  constructor(private courseService: CourseService) { }

  ngOnInit() {
    
  }

  async submitCourse(form){
    let course = form.getRawValue() as Course;
    course.userIDs = [];
    course.rating = 0;
    course.ratings = []

    if(course.id){
      await this.courseService.updateCourse(course);
    }
    else{
      await this.courseService.createCourse(course);
      this.onSubmited.emit();
    }

    form.reset();
  }
}
