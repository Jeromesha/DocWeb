import { NgModule } from "@angular/core";
import { Location } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guard/auth.guard";
import { BaseComponent } from "./base/base.component";

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
        path: "exceltimesheetupload",
        loadChildren: () =>
          import("./../../views/pages/excelupload/excelupload.module").then(
            (m) => m.ExceluploadModule
          ),
      },
      // {
      //   path: "timesheet/:id/:actionInfo",
      //   loadChildren: () =>
      //     import("./../../views/pages/dashboard/timesheet/timesheet.module").then(
      //       (m) => m.TimesheetModule
      //     ),
      // },
      {
        path: "projectdetails",
        loadChildren: () =>
          // import("./../../views/pages/dashboard/timesheet/timesheet.module").then((m) => m.TimesheetModule
          // ),
          import("./../../views/pages/project-details/project-details.module").then((m) => m.ProjectDetailsModule)
      },
      {
        path: "weeklytimesheetaprove",
        loadChildren: () =>
          import("./../../views/pages/weeklytimesheetaproved/weeklytimesheetaproved.module").then((m) => m.WeeklytimesheetaprovedModule)
      },

      {
        path: "employeeleaverecords",
        loadChildren: () =>
          import("./../../views/pages/employeeleaverecords/employeeleaverecords.module").then((m) => m.employeeleaverecordsModule)
      },
      {
        path: "attendancereport",
        loadChildren: () =>
          import("./../../views/pages/monthlyrecords/monthlyrecords.module").then((m) => m.MonthlyrecordsModule)
      },
      {
        path: "reporttimesheet",
        loadChildren: () =>
          import("./../../views/pages/timesheetreport/timesheetreport.module").then((m) => m.TimesheetreportModule)
      },
      {
        path: "module",
        loadChildren: () =>
          import("./../../views/pages/projectmodule/projectmodule.module").then((m) => m.ProjectmoduleModule)
      },
      {
        path: "milestone",
        loadChildren: () =>
          import("./../../views/pages/projectmilestone/projectmilestone.module").then((m) => m.ProjectmilestoneModule)
      },
      {
        path: "task",
        loadChildren: () =>
          import("./../../views/pages/task/task.module").then((m) => m.TaskModule)
      },
      {
        path: "leavedata",
        loadChildren: () =>
          import("./../../views/pages/leavedata/leavedata.module").then((m) => m.LeavedataModule)
      },
      {
        path: "tctimesheet",
        loadChildren: () =>
          import("./../../views/pages/tc-timesheet/tc-timesheet.module").then((m) => m.TcTimesheetModule)
      },
      {
        path: "timechampport",
        loadChildren: () =>
          import("./../../views/pages/timechamp-report/timechamp-report.module").then((m) => m.TimechampReportModule)
      },
      {
        path: "monthlyworkinghoursreport",
        loadChildren: () =>
          import("./../../views/pages/monthly-working-hours-report/monthly-working-hours-report.module").then((m) => m.MonthlyWorkingHoursReportModule)
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule { }
