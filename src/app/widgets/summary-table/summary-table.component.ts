import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-summary-table',
  templateUrl: './summary-table.component.html',
  styleUrls: ['./summary-table.component.scss'],
})
export class SummaryTableComponent implements OnChanges {
  @Input() data: any;
  details: any = [];
  totalInvested = 0;
  totalProfit = 0;
  totalLoss = 0;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _liveAnnouncer: LiveAnnouncer) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'].currentValue) {
      this.data = changes['data'].currentValue;
      this.calculateTotals();
    }
  }

  ngAfterViewInit(): void {
    this.data.details.paginator = this.paginator;
    this.data.details.sort = this.sort;
  }




  calculateTotals() {
    this.totalInvested = this.data.details.reduce((sum: any, item: { [x: string]: any; }) => sum + parseFloat(item['Buy Price']), 0);
    this.totalProfit = this.data.details
      .filter((item: { [x: string]: any; }) => {
        const profitLossAmount = item['Sell Price'] - item['Buy Price'];
        return profitLossAmount > 0; // Profit
      })
      .reduce((sum: number, item: { [x: string]: number; }) => sum + (item['Sell Price'] - item['Buy Price']), 0);

    this.totalLoss = this.data.details
      .filter((item: { [x: string]: any; }) => {
        const profitLossAmount = item['Sell Price'] - item['Buy Price'];
        return profitLossAmount < 0; // Loss
      })
      .reduce((sum: number, item: { [x: string]: number; }) => sum + (item['Buy Price'] - item['Sell Price']), 0);
  }


  // calculateTotals() {
  //   this.totalInvested = this.data.details.reduce((sum: any, item: { [x: string]: any; }) => sum + parseFloat(item['Buy Price']), 0);
  //   this.totalProfit = this.data.details
  //     .filter((item: { [x: string]: string; }) => item['Verdict'] === 'Profit')
  //     .reduce((sum: number, item: { [x: string]: number; }) => sum + (item['Sell Price'] - item['Buy Price']), 0);
  //   this.totalLoss = this.data.details
  //     .filter((item: { [x: string]: string; }) => item['Verdict'] === 'Loss')
  //     .reduce((sum: number, item: { [x: string]: number; }) => sum + (item['Buy Price'] - item['Sell Price']), 0);
  // }
}
