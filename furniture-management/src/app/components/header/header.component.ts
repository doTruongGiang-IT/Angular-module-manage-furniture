import { Furniture } from './../../../manage-furniture/models/furniture.class';
import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {

  public admin = {
    username: "",
    password: ""
  };
  public searchKey: string = "";
  public result: Furniture[] = [];

  constructor(private router: Router) { };

  ngOnInit(): void {
  };

  ngDoCheck(): void {
    this.loadAdminAccount();
  };

  loadAdminAccount(): void {
    if(localStorage.getItem("admin")) {
      let data: string | any = localStorage.getItem("admin");
      this.admin = JSON.parse(data);
    };
  };

  logout(): void {
    localStorage.removeItem("admin");
    this.admin = {
      username: "",
      password: ""
    };
    this.router.navigate([""]);
  };

  searchItem(): void {
    let list: string | any = localStorage.getItem("furnitureList");
    let furnitureList: Furniture[] = JSON.parse(list);
    furnitureList.filter(furniture => {
      if(furniture.name.toLowerCase().includes(this.searchKey.toLowerCase())) {
        this.result.push(furniture);
        localStorage.setItem("searchResult", JSON.stringify(this.result));
      };
    });
    this.result = [];
  };

}
