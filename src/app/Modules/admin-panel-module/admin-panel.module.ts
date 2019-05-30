import { NgModule} from '@angular/core';
import { UserManagementComponent } from './user-management/user-management.component';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { CourseManagementComponent } from './course-management/course-management.component';
import { AddEditCourseComponent } from './course-management/add-edit-course/add-edit-course.component';
import { SharedModule } from '../shared-module/shared.module'


@NgModule({
  declarations: [UserManagementComponent, CourseManagementComponent, AddEditCourseComponent],
  imports: [
    AdminPanelRoutingModule,
    SharedModule
  ]
})
export class AdminPanelModule { }
