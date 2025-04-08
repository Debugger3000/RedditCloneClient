import { Component, Input, OnInit } from '@angular/core';
import { SidePanelBlockComponent } from '../micro/side-panel-block/side-panel-block.component';
import { GeneralService } from '../../services/general.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group-threads',
  imports: [SidePanelBlockComponent],
  templateUrl: './group-threads.component.html',
  styleUrl: './group-threads.component.scss'
})
export class GroupThreadsComponent{

  constructor(private generalService : GeneralService, private activatedRoute: ActivatedRoute) {}

  // userId: string | null = '';

  // ngOnInit(): void {
    
  //   this.activatedRoute.paramMap.subscribe(params => {
  //     this.userId = params.get('userId');
  //     console.log('Item ID:', this.userId);
  //   });
  // }

}
