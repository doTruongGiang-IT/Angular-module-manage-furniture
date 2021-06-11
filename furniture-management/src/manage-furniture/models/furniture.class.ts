export class Furniture {
    public id: number = 0;
    public name: string;
    public price: number;
    public image: string;
    public description: string;
    public inventory: number;
    public status: boolean;

    constructor(name: string, price: number, image: string, description: string, inventory: number, status: boolean) {
        this.name = name;
        this.price = price;
        this.image = image;
        this.description = description;
        this.inventory = inventory;
        this.status = status;
    };
}