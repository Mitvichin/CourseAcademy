import { NgModule } from '@angular/core';
import { CourseRoutingModule } from './course-routing.module';
import { CourseComponent } from './course-component/course.component';
import { SharedModule } from '../shared-module/shared.module'

@NgModule({
  declarations: [CourseComponent],
  imports: [
    SharedModule,
    CourseRoutingModule
  ]
})
export class CourseModule { }
