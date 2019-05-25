import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserManagementComponent } from './user-management/user-management.component'
import { CourseManagementComponent } from './course-management/course-management.component';

const routes: Routes = [
  { path:'user-management', component: UserManagementComponent },
  { path:'course-management', component: CourseManagementComponent},
  { path: '', redirectTo:'  user-management', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }