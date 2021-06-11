import { FurnitureService } from './../../services/furniture/furniture.service';
import { Component, OnInit, DoCheck } from '@angular/core';
import { Furniture } from 'src/manage-furniture/models/furniture.class';

@Component({
  selector: 'app-furniture-list',
  templateUrl: './furniture-list.component.html',
  styleUrls: ['./furniture-list.component.css']
})
export class FurnitureListComponent implements OnInit, DoCheck {

  public furnitureList: Furniture[] = [];
  public cartList: any[] = [];
  public countID: any = [];
  public cartItem = {
    id: 0,
    name: "",
    price: 0,
    image: "",
    description: "",
    inventory: 0,
    status: false,
    qty: 0
  };

  constructor(private furnitureService: FurnitureService) { };

  ngOnInit(): void {
    this.loadFurnitureWithAsync();
  };

  ngDoCheck(): void {
    this.loadSearchResult();
  };

  // loadFurniture(): void {
  //   this.furnitureService.getAllFurniture().subscribe(furnitureList => {
  //     this.furnitureList = furnitureList;
  //     localStorage.setItem("furnitureList", JSON.stringify(this.furnitureList));
  //   }, error => {
  //     console.log(error.message);
  //   });
  // };

  loadFurnitureWithAsync(): void {
    this.furnitureService.getAllFurnitureV2()
      .then(res => {
        this.furnitureList = res;
        localStorage.setItem("furnitureList", JSON.stringify(this.furnitureList));
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  loadSearchResult(): void {
    if(localStorage.getItem("searchResult")) {
      let result: string | any = localStorage.getItem("searchResult");
      this.furnitureList = JSON.parse(result);
      localStorage.removeItem("searchResult");
    };
  };

  // addToCart(id: number): void {
  //   this.furnitureService.getFurnitureByID(id).subscribe(cartItem => {
  //     this.cartList.push(cartItem);
  //     localStorage.setItem("cartItem", JSON.stringify(this.cartList));
  //   }, error => {
  //     console.log(error.message);
  //   });
  // };

  countQuantity(arr: any[], property: string) {
    return arr.reduce(function (acc, obj) {
      let key = obj[property];
      if(!acc[key]) {
        acc[key] = 0
      };
      acc[key]++;
      return acc;
    }, {});
  };

  createListItem(arr: any[]) {
    return arr.reduce((acc, obj) => {
      let key = obj['id'];
      if(!acc[key]) {
        acc[key] = [];
      };
      acc[key].push(obj);
      if(acc[key].length > 1) {
        acc[key].splice(0, 1);
      };
      return acc;
    }, {});
  };

  addToCartWithAsync(id: number): void {
    this.furnitureService.getFurnitureByIDV2(id)
      .then(res => {
        this.cartItem = {
          id: res.id,
          name: res.name,
          price: res.price,
          image: res.image,
          description: res.description,
          inventory: res.inventory,
          status: res.status,
          qty: 0
        };
        this.cartList.push(this.cartItem);
        let groupItem = this.countQuantity(this.cartList, "id");
        for(let i in groupItem) {
          if(Number.parseInt(i) === this.cartItem.id) {
            this.cartItem.qty = groupItem[i];
          };
        };
        let list = this.createListItem(this.cartList);

        // if(this.cartList.length > 0) {
        //   this.cartList.forEach(item => {
        //     if(item.id === id) {
        //       item.qty++;
        //     }else {
        //       this.cartItem = {
        //         id: res.id,
        //         name: res.name,
        //         price: res.price,
        //         image: res.image,
        //         description: res.description,
        //         inventory: res.inventory,
        //         status: res.status,
        //         qty: 1
        //       };
        //       this.cartList.push(this.cartItem);
        //     };
        //   });
        // }else {
        //   this.cartItem = {
        //     id: res.id,
        //     name: res.name,
        //     price: res.price,
        //     image: res.image,
        //     description: res.description,
        //     inventory: res.inventory,
        //     status: res.status,
        //     qty: 1
        //   };
        //   this.cartList.push(this.cartItem);
        // };
        localStorage.setItem("cartItem", JSON.stringify(list));
      })
      .catch(error => {
        console.log(error.message);
      });
  };

}
