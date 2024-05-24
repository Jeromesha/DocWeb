import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { KraStatusComponent } from './kra-status.component';
import { KraStatusModifyComponent } from './kra-status-modify/kra-status-modify.component';

const routes: Routes = [
  {
    path: '',
    component: KraStatusComponent
  },
  {
    path: ":id/:actionInfo",
    component: KraStatusModifyComponent
  },
];

@NgModule({
  declarations: [
    KraStatusModifyComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class KraStatusModule { }
