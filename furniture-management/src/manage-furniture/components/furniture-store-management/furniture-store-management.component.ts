import { FurnitureService } from './../../services/furniture/furniture.service';
import { Component, OnInit } from '@angular/core';
import { Furniture } from 'src/manage-furniture/models/furniture.class';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-furniture-store-management',
  templateUrl: './furniture-store-management.component.html',
  styleUrls: ['./furniture-store-management.component.css']
})
export class FurnitureStoreManagementComponent implements OnInit {

  public name: string = "";
  public price: number = 0;
  public image: string = "";
  public description: string = "";
  public inventory: number = 0;
  public status: boolean = false;

  public furnitureList: Furniture[] = [];
  public furniture: Furniture = {
    id: 0,
    name: "",
    price: 0,
    image: "",
    description: "",
    inventory: 0,
    status: false
  };

  constructor(private furnitureService: FurnitureService, private activatedRout: ActivatedRoute) { };

  ngOnInit(): void {
    this.loadFurnitureList();
    this.editFurnitureWithAsync();
  };

  loadFurnitureList(): void {
    if(localStorage.getItem("furnitureList")) {
      let list: string | any = localStorage.getItem("furnitureList");
      this.furnitureList = JSON.parse(list);
    }else {
      this.furnitureService.getAllFurnitureV2()
        .then(res => {
          this.furnitureList = res;
        })
        .catch(error => {
          console.log(error.message);
        });
    };
  };

  // addFurniture(): void {
  //   let newFurniture = new Furniture(this.name, this.price, this.image, this.description, this.inventory, this.status);
  //   this.furnitureService.createFurniture(newFurniture).subscribe(newFurniture => {
  //     this.furnitureList.push(newFurniture);
  //     this.name = "";
  //     this.price = 0;
  //     this.image = "";
  //     this.description = "";
  //     this.inventory = 0;
  //     this.status = false;
  //   }, error => {
  //     console.log(error.message);
  //   });
  // };

  addFurnitureWithAsync(): void {
    let newFurniture = new Furniture(this.name, this.price, this.image, this.description, this.inventory, this.status);
    this.furnitureService.createFurnitureV2(newFurniture)
      .then(res => {
        this.furnitureList.push(res);
        localStorage.setItem("furnitureList", JSON.stringify(this.furnitureList));
        this.name = "";
        this.price = 0;
        this.image = "";
        this.description = "";
        this.inventory = 0;
        this.status = false;
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  // editFurniture(): void {
  //   let id = Number.parseInt(this.activatedRout.snapshot.params['id']);
  //   if(id) {
  //     this.furnitureService.getFurnitureByID(id).subscribe(editFurniture => {
  //       this.furniture = editFurniture;
  //     }, error => {
  //       console.log(error.message);
  //     });
  //   };
  // };

  editFurnitureWithAsync(): void {
    let id = Number.parseInt(this.activatedRout.snapshot.params['id']);
    if(id) {
      this.furnitureService.getFurnitureByIDV2(id)
        .then(res => {
          this.furniture = res;
        })
        .catch(error => {
          console.log(error.message);
        });
    };
  };

  // updateFurniture(): void {
  //   let updateFurniture = new Furniture(this.furniture.name, this.furniture.price, this.furniture.image, this.furniture.description, this.furniture.inventory, this.furniture.status);
  //   this.furnitureService.updateFurniture(this.furniture.id, updateFurniture).subscribe(updatedFurniture => {
  //     let index: number = this.getIndex(updatedFurniture.id);
  //     this.furnitureList[index] = updatedFurniture;
  //     this.furniture = {
  //       id: 0,
  //       name: "",
  //       price: 0,
  //       image: "",
  //       description: "",
  //       inventory: 0,
  //       status: false
  //     };
  //   }, error => {
  //     console.log(error.message);
  //   });
  // };

  updateFurnitureWithAsync(): void {
    let updateFurniture = new Furniture(this.furniture.name, this.furniture.price, this.furniture.image, this.furniture.description, this.furniture.inventory, this.furniture.status);
    this.furnitureService.updateFurnitureV2(this.furniture.id, updateFurniture)
      .then(res => {
        let index: number = this.getIndex(res.id);
        this.furnitureList[index] = res;
        this.furniture = {
          id: 0,
          name: "",
          price: 0,
          image: "",
          description: "",
          inventory: 0,
          status: false
        };
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  // deleteFurniture(id: number): void {
  //   this.furnitureService.deleteFurniture(id).subscribe(deletedFurniture => {
  //     this.furnitureService.getAllFurniture().subscribe(furnitureList => {
  //       this.furnitureList = furnitureList;
  //     }, error => {
  //       console.log(error.message);
  //     });
  //   }, error => {
  //     console.log(error.message);
  //   });
  // };

  deleteFurnitureWithAsync(id: number): void {
    this.furnitureService.deleteFurnitureV2(id)
      .then(res => {
        this.furnitureService.getAllFurnitureV2()
          .then(res => {
            this.furnitureList = res;
          })
          .catch(error => {
            console.log(error.message);
          });
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  getIndex(id: number): number {
    let result: number = -1;
    this.furnitureList.forEach((furniture, index) => {
      if(furniture.id === id) {
        result = index;
      };
    });
    return result;
  };

}
