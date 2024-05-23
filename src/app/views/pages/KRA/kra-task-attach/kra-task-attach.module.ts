import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { KraTaskAttachComponent } from './kra-task-attach.component';

const routes: Routes = [
  {
    path: '',
    component: KraTaskAttachComponent
  },
  // {
  //   path: ":id/:actionInfo",
  //   component: SchedularComponent
  // },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class KraTaskAttachModule { }
