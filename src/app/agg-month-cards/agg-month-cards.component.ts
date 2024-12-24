import { Component } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
} from 'ng-apexcharts';
export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: string[];
  responsive: ApexResponsive[];
  legend:any;
  markers:any;
  dataLabels:any
};

@Component({
  selector: 'app-agg-month-cards',
  templateUrl: './agg-month-cards.component.html',
  styleUrls: ['./agg-month-cards.component.scss']
})
export class AggMonthCardsComponent {
 months = [
    { name: 'January', totalExpense: 1000, profit: 120, profitPercentage: 12, loss: 50, lossPercentage: 5, totalTradeCount: 20 },
    { name: 'February', totalExpense: 900, profit: 100, profitPercentage: 11, loss: 40, lossPercentage: 4, totalTradeCount: 18 },
    { name: 'March', totalExpense: 1100, profit: 150, profitPercentage: 13.64, loss: 60, lossPercentage: 5.45, totalTradeCount: 25 },
    { name: 'April', totalExpense: 950, profit: 130, profitPercentage: 13.68, loss: 55, lossPercentage: 5.79, totalTradeCount: 22 },
    { name: 'May', totalExpense: 1150, profit: 180, profitPercentage: 15.65, loss: 70, lossPercentage: 6.09, totalTradeCount: 28 },
    { name: 'June', totalExpense: 1200, profit: 200, profitPercentage: 16.67, loss: 80, lossPercentage: 6.67, totalTradeCount: 30 },
    { name: 'July', totalExpense: 1300, profit: 220, profitPercentage: 16.92, loss: 90, lossPercentage: 6.92, totalTradeCount: 32 },
    { name: 'August', totalExpense: 1250, profit: 210, profitPercentage: 16.8, loss: 85, lossPercentage: 6.8, totalTradeCount: 31 },
    { name: 'September', totalExpense: 1400, profit: 240, profitPercentage: 17.14, loss: 100, lossPercentage: 7.14, totalTradeCount: 35 },
    { name: 'October', totalExpense: 1250, profit: 230, profitPercentage: 18.4, loss: 95, lossPercentage: 7.6, totalTradeCount: 33 },
    { name: 'November', totalExpense: 1300, profit: 250, profitPercentage: 19.23, loss: 110, lossPercentage: 8.46, totalTradeCount: 36 },
    { name: 'December', totalExpense: 1400, profit: 270, profitPercentage: 19.29, loss: 120, lossPercentage: 8.57, totalTradeCount: 40 }
  ];


  chartOptions: ChartOptions = {
    series: [],
    chart: {
      type: 'pie',
      height: 175,
      width: 250,
      // padding: 0  // Removes padding from the chart
    },
    labels: ['Profit', 'Loss', 'Other Expenses'],
    colors: ['#355F2E', '#F26B0F', '#424242'],
    markers: {
      width: 12, height: 12, strokeWidth: 0, strokeColor: 'black', fillColors: undefined, radius: 12, customHTML: undefined, onClick: undefined, offsetX: -5, offsetY: -5
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            width: 100,
          },
        },
      },
    ],
    legend: {
      show: true,
      fontWeight: 400,
      position: 'bottom',
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: undefined,
      textAnchor: 'right',
      distributed: false,
      style: {
          fontSize: '10px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 'normal',
          colors: undefined
      },
      background: {
        enabled: true,
        foreColor: '#fff',
        padding: 2,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#fff',
        opacity: 0.9,
        dropShadow: {
          enabled: false,
          top: 1,
          left: 1,
          blur: 1,
          color: '#000',
          opacity: 0.45
        }
      },
      dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 1,
          color: '#000',
          opacity: 0.45
      }
    }
  };

}
