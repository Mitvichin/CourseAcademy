import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management/user-management.component';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { CourseManagementComponent } from './course-management/course-management.component';
import { AddEditCourseComponent } from './course-management/add-edit-course/add-edit-course.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [UserManagementComponent, CourseManagementComponent, AddEditCourseComponent],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    FormsModule,
  ]
})
export class AdminPanelModule { }
