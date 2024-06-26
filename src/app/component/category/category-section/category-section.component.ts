import { Component, Input, OnInit, inject } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { EventBusService } from '../../../shared/service/event-bus.service';
import { CommonModule } from '@angular/common';
import { SwitchButtonComponent } from '../../../shared/component/switch-button/switch-button.component';
import { Category } from '../category.model';
import { CategoriesListComponent } from '../category-list/category-list.component';
import { mergeDeep } from '../../../shared/utils/merge';

@Component({
  selector: 'category-section',
  standalone: true,
  imports: [
    CommonModule,
    SwitchButtonComponent,
    CategoriesListComponent,
  ],
  templateUrl: './category-section.component.html',
  styleUrl: './category-section.component.scss'
})
export class CategorySectionComponent implements OnInit{
  logger = inject(NGXLogger);
  eventBus = inject(EventBusService);
  @Input() items!: Category[];

  ngOnInit(): void {
    this.contentHidden = this._config.contentHidden;
  }

  // HIDDE CONTENT
  contentHidden!: boolean;

 // CONFIG
  @Input() set config(config: any) {
    this._config = mergeDeep(this._config, config);
  }
  _config: Config = {
    contentHidden: false,
    label:'Categories',
  }
}

class Config {
  contentHidden!: boolean;
  label!:string;
}