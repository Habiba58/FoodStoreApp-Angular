import { Component, OnInit } from '@angular/core';
import { LoadingManagerService } from 'src/app/services/loading-manager.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  isLoading: boolean = true;
  constructor(private loadingManager: LoadingManagerService) {}
  ngOnInit(): void {
    this.loadingManager.isLoading.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
  }
}
