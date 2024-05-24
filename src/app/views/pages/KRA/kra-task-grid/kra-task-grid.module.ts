import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KraTaskComponent } from './kra-task/kra-task.component';
import { KraTaskGridComponent } from './kra-task-grid.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: KraTaskGridComponent
  },
  {
    path: ":id/:actionInfo",
    component: KraTaskComponent
  },
];


@NgModule({
  declarations: [
    KraTaskGridComponent,
    KraTaskComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class KraTaskGridModule { }
