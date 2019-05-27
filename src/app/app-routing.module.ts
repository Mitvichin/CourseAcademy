import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

   {path:'admin-panel',loadChildren: './Modules/admin-panel-module/admin-panel.module#AdminPanelModule'},
   {path: 'courses', loadChildren:'./Modules/course-module/course.module#CourseModule'},
   {path: 'home', loadChildren:'./Modules/home-module/home.module#HomeModule'},
   {path: '', redirectTo:'home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
