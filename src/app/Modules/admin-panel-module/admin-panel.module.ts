import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management/user-management.component';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { CourseManagementComponent } from './course-management/course-management.component';

@NgModule({
  declarations: [UserManagementComponent, CourseManagementComponent],
  imports: [
    CommonModule,
    AdminPanelRoutingModule
  ]
})
export class AdminPanelModule { }
