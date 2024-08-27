import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: any;
  position: any;
  weight: any;
  time: any;
  date: any;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, time: '05:21:30 PM', date: '12/1/2024'},
  {position: 2, name: 'Helium', weight: 4.0026,  time: '06:21:30 AM', date: '12/1/2024'},
  {position: 3, name: 'Lithium', weight: 6.941,  time: '05:21:30 AM', date: '12/1/2024'},
  {position: 4, name: 'Beryllium', weight: 9.0122,  time: '07:21:30 AM', date: '12/1/2024'},
  {position: 5, name: 'Boron', weight: 10.811, time: '08:21:30 PM', date: '12/1/2024'},
  {position: 6, name: 'Carbon', weight: 12.0107, time: '09:21:30 PM', date: '12/1/2024'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, time: '10:21:30 PM', date: '12/1/2024'},
  {position: 8, name: 'Oxygen', weight: 15.9994, time: '04:21:30 AM', date: '12/1/2024'},
  {position: 9, name: 'Fluorine', weight: 18.9984, time: '05:21:30 PM', date: '12/1/2024'},
  {position: 10, name: 'Neon', weight: 20.1797,  time: '05:21:30 PM', date: '12/1/2024'},
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  value: any[] = [];
  displayedColumns: any[] = 
  [
    'position', 
    'name', 
    'weight', 
    'time', 
    'date', 
    'action'
  ];
  timing = new Date();
  intervalId;
  dataSource = new MatTableDataSource(this.value);

  constructor() { }

  ngOnInit(): void {
    this.getTableData();

    this.intervalId = setInterval(() => {
      this.timing = new Date();
      console.log(this.timing, "time flow");
      
    },1000)
  }

  getTableData() {
    ELEMENT_DATA.map((res) => {
      this.value.push(res)
      this.value.sort((a, b) => { 
        let slotA = new Date(a).getTime();
        let slotB = new Date(b).getTime();
        return slotB - slotA;
      })
      console.log(this.value, "ll");
      this.dataSource = new MatTableDataSource(this.value);
    })
  }
 
} 
