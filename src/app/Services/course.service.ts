import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Course } from '../Models/Course';
import { HttpClient } from '@angular/common/http';
import { Rating } from '../Models/Rating';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends BaseService {

  endpoint = `${this.baseEndPoint}courses`

  constructor(private http: HttpClient) {
    super()
  }

  getAllCourses(): Promise<Course[]> {
    return this.http.get<Course[]>(this.endpoint).toPromise();
  }

  getCourse(id: number): Promise<Course> {
    return this.http.get<Course>(`${this.endpoint}/${id}`).toPromise();
  }

  createCourse(course: Course): Promise<any> {
    return this.http.post(this.endpoint, course).toPromise();
  }

  deleteCourse(id: number): Promise<any> {
    return this.http.delete(`${this.endpoint}/${id}`).toPromise();
  }

  updateCourse(course: Course): Promise<any> {
    return this.http.put(`${this.endpoint}/${course.id}`, course).toPromise();
  }

  rateCourse(course: Course, rating: Rating): Promise<any>{
    course.rating = this.calculateRating(course.ratings, rating);

    return this.updateCourse(course);
  }

  joinCourse(course: Course, userID: number) : Promise<any>{
    course.userIDs.push(userID);

    return this.updateCourse(course);
  }

  private calculateRating(ratings: Rating[], newRate: Rating) : number{
    ratings.push(newRate);
    let ratingSum = 0;

    ratings.forEach(rating => {
      ratingSum += rating.rate;
    });
    
    return Math.round((ratingSum / ratings.length)*10) / 10;

  }
}
