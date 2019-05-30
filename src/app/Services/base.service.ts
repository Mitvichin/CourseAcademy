import { Injectable } from '@angular/core';
import { variables } from '../Global/Variables';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  baseEndPoint = variables.endPoint;

  constructor( ) { }
}
