import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  constructor(private http: HttpClient) { }
  public movies: any = [];
  showimage: boolean = false;

  ngOnInit() {
    this.getMovies();
  }

  public getMovies(): void {
    this.http.get('https://tmdbhandler.herokuapp.com/api/v1/movies/find-all-movies').subscribe(
      response => this.movies = response,
      // response => console.log(response)
      error => console.log(error),
    );
  }
}
