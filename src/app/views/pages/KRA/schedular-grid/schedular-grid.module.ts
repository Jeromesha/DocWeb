import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedularComponent } from './schedular/schedular.component';
import { RouterModule, Routes } from '@angular/router';
import { SchedularGridComponent } from './schedular-grid.component';

const routes: Routes = [
  {
    path: '',
    component: SchedularGridComponent
  },
  {
    path: ":id/:actionInfo",
    component: SchedularComponent
  },
];


@NgModule({
  declarations: [
    SchedularComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class SchedularGridModule { }
