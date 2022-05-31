import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResulModel } from '../models/ResulModel';

@Injectable()
export class MoviesService {

  constructor(private http: HttpClient) { }
  private baseURl = 'https://tmdbhandler.herokuapp.com/api/v1';

  public getMovies(): Observable<ResulModel> {
    return this.http.get<ResulModel>(`${this.baseURl}/movies/find-all-movies`);
  }
}
