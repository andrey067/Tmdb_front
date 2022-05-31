import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isCollapsed = true;
  private _filterlist: string = '';

  public get filterlist() {
    return this._filterlist;
  }

  public set filterlist(value: string) {
    this._filterlist = value;
  }

  constructor(private router: Router) { }

  ngOnInit() {
  }

  showMenu(): boolean {
    return this.router.url !== '/users/login';
  }
}
