import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  public cartItems: any[] = [];
  public cartList: any[] = [];
  public list: any[] = [];
  public total: number = 0;
  public cartItem = {
    id: 0,
    name: "",
    price: 0,
    image: "",
    description: "",
    inventory: 0,
    status: false,
    qty: 1
  };

  constructor() { };

  ngOnInit(): void {
    this.loadCart();
  };

  loadCart(): void {
    if(!localStorage.getItem("cartList") && localStorage.getItem("cartItem")) {
      let furniture: string | any = localStorage.getItem("cartItem");
      this.cartItems = JSON.parse(furniture);
      for(let i in this.cartItems) {
        this.list = [...this.list, ...this.cartItems[i]];
      };
      localStorage.removeItem("cartItem");
      localStorage.setItem("cartList", JSON.stringify(this.list));
      this.totalPrice(this.list, 0);
    }else if(localStorage.getItem("cartList") && !localStorage.getItem("cartItem")) {
      let list: string | any = localStorage.getItem("cartList");
      this.list = JSON.parse(list);
      localStorage.setItem("cartList", JSON.stringify(this.list));
      this.totalPrice(this.list, 0);
    }else if(localStorage.getItem("cartList") && localStorage.getItem("cartItem")) {
      let list: string | any = localStorage.getItem("cartList");
      let furniture: string | any = localStorage.getItem("cartItem");
      let middle = JSON.parse(list);
      this.cartItems = JSON.parse(furniture);
      localStorage.removeItem("cartItem");
      for(let i in this.cartItems) {
        middle = [...middle, ...this.cartItems[i]];
      };
      let joinList = this.createListItem(middle);
      for(let i in joinList) {
        this.list = [...this.list, ...joinList[i]];
      };

      // furniture = JSON.parse(furniture);
      // for(let i = 0; i < furniture.length; i++) {
      //   for(let j = i + 1; j < furniture.length - 1; j++) {
      //     if(furniture[i].id === furniture[j].id) {
      //       furniture[i].qty += furniture[j].qty;
      //       furniture[j].qty = 0;
      //       furniture.splice(j, 1);
      //     };
      //   };
      // };
      // console.log(furniture);
      // for(let i in furniture) {
      //   for(let j in this.cartItems) {
      //     if(furniture[i].id === this.cartItems[j].id) {
      //       this.cartItems[j].qty = this.cartItems[j].qty + furniture[i].qty;
      //       furniture[i].qty = 0;
      //     }else {
      //       this.cartItems.push(furniture[i]);
      //     };
      //   };
      // };
      // this.cartItems = [...this.cartItems, ...JSON.parse(furniture)];
      
      // this.cartItems.map(item => {
      //   if(this.cartList.length !== 0) {
      //     this.cartList.forEach(cartListItem => {
      //       if(item.id === cartListItem.id) {
      //         cartListItem.qty += item.qty;
      //         item.qty = 0;
      //       }else if(item.id !== cartListItem.id) {
      //         this.cartList.push(item);
      //       };
      //     });
      localStorage.setItem("cartList", JSON.stringify(this.list));
      this.totalPrice(this.list, 0);
    };
  };

  createListItem(arr: any[]) {
    return arr.reduce((acc, obj) => {
      let key = obj['id'];
      if(!acc[key]) {
        acc[key] = [];
      };
      acc[key].push(obj);
      if(acc[key].length > 1) {
        acc[key][1].qty += acc[key][0].qty;
        acc[key].splice(0, 1);
      };
      return acc;
    }, {});
  };

  totalPrice(arr: any[], acc: number): void {
    if(arr.length === 0) {
      this.total = 0;
    }else {
      arr.forEach(item => {
        acc += item.price * item.qty;
        this.total = acc;
      });
    };
  };

  upQty(id: number): void {
    this.list.forEach(item => {
      if(item.id === id) {
        item.qty++;
        if(item.qty > item.inventory) {
          alert("Mua gì lắm thế");
          item.qty = item.inventory;
        };
      };
    });
    localStorage.setItem("cartList", JSON.stringify(this.list));
    this.totalPrice(this.list, 0);
  };

  downQty(id: number): void {
    for(let i = 0; i < this.list.length; i++) {
      if(this.list[i].id === id) {
        this.list[i].qty--;
        if(this.list[i].qty < 1) {
          this.list.splice(i, 1);
        };
      };
    };
    localStorage.setItem("cartList", JSON.stringify(this.list));
    this.totalPrice(this.list, 0);
  };

  removeItem(index: number): void {
    this.list.splice(index, 1);
    localStorage.setItem("cartList", JSON.stringify(this.list));
    this.totalPrice(this.list, 0);
  };

  process(): void {
    alert("Có tiền không mà mua hàng :)))");
  };

}
