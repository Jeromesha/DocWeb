import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { LeavedataComponent } from './leavedata.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ExcelService } from 'src/app/services/excel.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { NotifyService } from 'src/app/services/notifyService';

const routes: Routes = [
  {
    path: '',
    component:LeavedataComponent
  },
  // {
  //   path: ":id/:actionInfo",
  //   component: LeavedataComponent
  // },
];

@NgModule({
  declarations: [
    LeavedataComponent
  ],
  providers: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    TranslateModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    NgbProgressbarModule,
  ]
})
export class LeavedataModule { }
