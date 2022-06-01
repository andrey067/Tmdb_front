import { Component, OnInit, TemplateRef } from '@angular/core';
import { Movie } from '../../models/Movie';
import { ResulModel } from '../../models/ResulModel';
import { MoviesService } from '../../services/movies.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Toast, ToastrModule, ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  modalRef?: BsModalRef;
  message?: string;
  public movies: Movie[] = [];
  public filteredmovies: Movie[] = []
  public widthimage = 150;
  public marginImage = 2;
  public showimage = true;
  private filterlist = '';
  constructor(private moviesservice: MoviesService,
              private modalService: BsModalService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService) { }

  public get filter(): string {
    return this.filterlist;
  }

  public set filter(value: string) {
    this.filterlist = value;
    this.filteredmovies = this.filterlist ? this.filtermovies(this.filterlist) : this.movies;
  }

  public filtermovies(filtrarby: string): Movie[] {
    filtrarby = filtrarby.toLocaleLowerCase();
    return this.movies.filter(
      movie => movie.title.toLocaleLowerCase().indexOf(filtrarby) !== -1 ||
        movie.id.toLocaleString().indexOf(filtrarby) !== -1
    );
  }

  public ngOnInit() {
    this.getMovies();
    this.spinner.show();
  }

  public changeImage(): void {
    this.showimage = !this.showimage;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.modalRef?.hide();
    this.toastr.success('Filme foi adicionado.', 'Adicionado!');
  }

  decline(): void {
    this.modalRef?.hide();
  }

  public getMovies(): void {
    const observer = {
      next: (_resultModel: ResulModel) => {
        this.movies = _resultModel.data.results;
        this.filteredmovies = this.movies;
      },
      error: (error: any) => {
        console.log(error);
        this.spinner.hide();
        this.toastr.error('Erro ao Carregar os Filmes', 'Erro!');
      },
      complete: () => this.spinner.hide(),
    };
    this.moviesservice.getMovies().subscribe(observer);
  }
}
