import { NgModule } from "@angular/core";
import { Location } from "@angular/common";
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
        path: "mappingdetails",
        loadChildren: () => import("./../../views/pages/mappingdetails/mappingdetails.module").then((m) => m.MappingDeailsModule)
      },
      {
        path: "employeedetails",
        loadChildren: () =>
          import("./../../views/pages/employeedetails/employeedetails.module").then(
            (m) => m.EmployeedetailsModule
          ),
      },
      {
        path: "timesheet",
        loadChildren: () =>
          import("./../../views/pages/dashboard/timesheet/timesheet.module").then(
            (m) => m.TimesheetModule
          ),
      },
      {
        path: "timesheet/:id/:actionInfo",
        loadChildren: () =>
          import("./../../views/pages/dashboard/timesheet/timesheet.module").then(
            (m) => m.TimesheetModule
          ),
      },
      {
        path: "projectdetails",
        loadChildren: () =>
          import("./../../views/pages/project-details/project-details.module").then((m) => m.ProjectDetailsModule)
      },
      {
        path: "weeklytimesheetaprove",
        loadChildren: () =>
          import("./../../views/pages/weeklytimesheetaproved/weeklytimesheetaproved.module").then((m) => m.WeeklytimesheetaprovedModule)
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule { }
