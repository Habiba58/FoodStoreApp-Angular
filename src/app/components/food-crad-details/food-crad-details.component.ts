import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartManagerService } from 'src/app/services/cart-manager.service';
import { FoodManagerService } from 'src/app/services/food-manager.service';
import { food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-food-crad-details',
  templateUrl: './food-crad-details.component.html',
  styleUrls: ['./food-crad-details.component.scss'],
})
export class FoodCradDetailsComponent implements OnInit {
  IDFromPath: number = 0;
  foodItem: food = {} as food;
  foodItemFound:boolean=true;
  constructor(
    private activedRoute: ActivatedRoute,
    private foodManager: FoodManagerService,
    private cartManager: CartManagerService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe((paramMap) => {
      this.IDFromPath = Number(paramMap.get('fID'));
      this.foodManager.getAllFood().subscribe((food:food[])=>{
        if(food.find((foodItem)=>foodItem.id==this.IDFromPath)){
          this.foodItemFound=true;
        }
        else{
          this.foodItemFound=false;
        }
      });
      this.foodManager.getFoodByID(this.IDFromPath).subscribe((food: food) => {
        this.foodItem = food;
      });
    });
  }
  addToCart() {
    this.cartManager.addToCart(this.foodItem);
    this.router.navigate(['/cartPage']);
  }
}
