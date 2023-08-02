import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guard/auth.guard";
import { BaseComponent } from "./base/base.component";
import { TimesheetComponent } from "../pages/dashboard/timesheet/timesheet.component";

const routes: Routes = [
  {
    path: "",
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "dashboard",
        loadChildren: () =>
          import("./../../views/pages/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full",
      },
      {
        path: "profile/:id/:actionInfo",
        loadChildren: () =>
          import("./../../views/pages/profile/profile/profile.module").then(
            (m) => m.ProfileModule
          ),
      },
      {
        path: "projectdetails",
        loadChildren: () =>
          import("./../../views/pages/project-details/project-details.module").then((m)=>m.ProjectDetailsModule)
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule { }
