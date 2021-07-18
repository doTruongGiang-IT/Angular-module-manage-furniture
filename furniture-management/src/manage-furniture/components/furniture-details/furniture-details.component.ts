import { FurnitureService } from './../../services/furniture/furniture.service';
import { Component, OnInit } from '@angular/core';
import { Furniture } from 'src/manage-furniture/models/furniture.class';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-furniture-details',
  templateUrl: './furniture-details.component.html',
  styleUrls: ['./furniture-details.component.css']
})
export class FurnitureDetailsComponent implements OnInit {
  // private subs: Subscription[] = [];
  public furniture: Furniture = {
    id: 0,
    name: "",
    price: 0,
    image: "",
    description: "",
    inventory: 0,
    status: false
  };

  constructor(private furnitureService: FurnitureService, private router: Router, private activatedRoute: ActivatedRoute) { };

  ngOnInit(): void {
    this.loadDetailWithAsync();
  };

  // loadDetail(): void {
  //   let id = Number.parseInt(this.activatedRoute.snapshot.params['id']);
  //   this.subs.push(
  //      this.furnitureService.getFurnitureByID(id).subscribe(furniture => {
    //     this.furniture = furniture;
    //   }, error => {
    //     console.log(error.message);
    //   })
  //   );
  // };

  loadDetailWithAsync(): void {
    let id = Number.parseInt(this.activatedRoute.snapshot.params['id']);
    this.furnitureService.getFurnitureByIDV2(id)
      .then(res => {
        this.furniture = res;
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  navigateBack(): void {
    this.router.navigate(['list'],{
      relativeTo: this.activatedRoute.parent
    })   
  };

}
