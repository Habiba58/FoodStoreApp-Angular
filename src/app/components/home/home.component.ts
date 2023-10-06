import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodManagerService } from 'src/app/services/food-manager.service';
import { food } from 'src/app/shared/models/food';
import { tags } from 'src/app/shared/models/tags';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  foodList: food[] = [];
  tagsList: tags[] = [];
  searchTerm: string = '';
  tagFromPath: string = '';
  searchFound:boolean=true;
  constructor(
    private foodManager: FoodManagerService,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.foodManager.getAllTags().subscribe((tags: tags[]) => {
      this.tagsList = tags;
    });
    this.activedRoute.params.subscribe((params) => {
      this.searchTerm = params['searchTerm'];
      this.tagFromPath = params['tag'];
      console.log(this.tagFromPath);
      if (params['tag']) {
        console.log('inside tag');
        if (this.tagFromPath == 'All') {
          this.foodManager.getAllFood().subscribe((food: food[]) => {
            this.foodList = food;
          });
        } else {
          this.foodManager.getAllFood().subscribe((food: food[]) => {
            this.foodList = food.filter((food) =>
              food.tags.includes(this.tagFromPath)
            );
          });
        }
      } else if (params['searchTerm']) {
        this.foodManager.getAllFood().subscribe((food: food[]) => {
          if(food.find((foodItem)=>foodItem.foodCategory==this.searchTerm.toLowerCase())){
            this.searchFound=true;
          }
          else{
            this.searchFound=false;
          }
        });
        this.foodManager
          .getFoodByFoodCategory(this.searchTerm)
          .subscribe((food: food[]) => {
            this.foodList = food;
          });
      } else {
        this.foodManager.getAllFood().subscribe((food: food[]) => {
          this.foodList = food;
        });
      }
    });
  }
  search(searchTerm: string) {
    this.router.navigate(['/Search', searchTerm]);
  }
  foodDetails(foodID: number) {
    this.router.navigate(['/foodDetails', foodID]);
  }
  tagRoute(tagName: string) {
    this.router.navigate(['/tag', tagName]);
  }
}
