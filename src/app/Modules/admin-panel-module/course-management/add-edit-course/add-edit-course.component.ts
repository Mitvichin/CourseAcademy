import { Component, OnInit, Input } from '@angular/core';
import { CourseService } from '../../../../Services/course.service';
import { Course } from '../../../../Models/Course';

@Component({
  selector: 'app-add-edit-course',
  templateUrl: './add-edit-course.component.html',
  styleUrls: ['./add-edit-course.component.scss']
})
export class AddEditCourseComponent implements OnInit {
  @Input('course') course: Course = {} as Course;

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    
  }

  async submitCourse(form){
    let course = form.getRawValue() as Course;
    course.userIDs = [];

    if(course.id){
      await this.courseService.updateCourse(course);
    }
    else{
      await this.courseService.createCourse(course);
    }
  }
}
