import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormPopupComponent } from '../popups-model/form-popup/form-popup.component';
import { Validators } from '@angular/forms';
import { StockService } from '../stock.service';
import * as moment from 'moment';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent {
  sampleColumn = ['Date', 'Current Price', 'Buy Price', 'Sell Price', 'Profit(%)', 'Loss(%)', 'Verdict'];
  sampleDetails: any = [];
  dataSource: any = {};
  currentdate = moment(new Date()).format('MMMM YYYY');
  selectedMonthYear: string | null = null;
  defaultDate = new Date();

  constructor(
    public dialog: MatDialog,
    private stockService: StockService
  ) {
    this.loadData(this.currentdate);
  }

  loadData(monthYearKey: string): void {
    this.stockService.getStocksByMonthYear(monthYearKey).subscribe(
      (data) => {
        this.updateDataSource(data)
      },
      (error) => {
        console.error('Error loading stock data:', error);
      }
    );
  }

  updateDataSource(data: any): void {
    let details: any = []
    data.map((res: any) => {
      let obj: any = {}
      obj['Date'] = moment(res.record_date).format('DD-MM-YYYY'),
      obj['Current Price'] = res.current_price,
      obj['Buy Price'] = res.buy_price,
      obj['Sell Price'] = res.sell_price,
      obj['Profit(%)'] = res.profit_percentage,
      obj['Loss(%)'] = res.loss_percentage,
      obj['Verdict'] = res.verdict,
      details.push(obj)
    })

    this.dataSource = {
      columnDetails: this.sampleColumn,
      details: details,
    };
  }

  calculateProfit(buyPrice: number, sellPrice: number): number {
    return sellPrice > buyPrice ? +(((sellPrice - buyPrice) / buyPrice) * 100).toFixed(2) : 0;
  }

  calculateLoss(buyPrice: number, sellPrice: number): number {
    return sellPrice < buyPrice ? +(((buyPrice - sellPrice) / buyPrice) * 100).toFixed(2) : 0;
  }

  getVerdict(buyPrice: number, sellPrice: number): string {
    const profitLossAmount = sellPrice - buyPrice;
    if (profitLossAmount > 0) {
      return `+ ${profitLossAmount.toFixed(2)}`;
    } else if (profitLossAmount < 0) {
      return `- ${Math.abs(profitLossAmount).toFixed(2)}`;
    } else {
      return 'S/W';
    }
  }

  openDataInputDialog(): void {
    this.dialog
      .open(FormPopupComponent, {
        panelClass: ['form-body', 'wd60'],
        data: {
          headerTitle: 'Add Record',
          doubleColumn: true,
          pText: 'Submit',
          fieldName: {
            Date: [moment(new Date()).format('DD/MM/YYYY'), Validators.required],
            'Current Price': ['', Validators.required],
            'Buy Price': ['', Validators.required],
            'Sell Price': ['', Validators.required],
          },
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          const newStock = {
            'month_year_key': this.currentdate,
            'record_date': res.Date,
            'current_price': parseFloat(res['Current Price']) ? parseFloat(res['Current Price']) : 0,
            'buy_price': parseFloat(res['Buy Price']) ? parseFloat(res['Buy Price']) : 0,
            'sell_price': parseFloat(res['Sell Price']) ? parseFloat(res['Sell Price']) : 0,
          };

          const profitPercentage = this.calculateProfit(newStock['buy_price'], newStock['sell_price']);
          const lossPercentage = this.calculateLoss(newStock['buy_price'], newStock['sell_price']);
          const verdict = this.getVerdict(newStock['buy_price'], newStock['sell_price']);

          this.stockService.addStock({ ...newStock, 'profit_percentage': profitPercentage, 'loss_percentage': lossPercentage, 'verdict': verdict })
            .subscribe(
              (addedStock) => {
                console.log('Stock data added:', addedStock);
                this.loadData(this.currentdate);
              },
              (error) => {
                console.error('Error adding stock:', error);
              }
            );
        }
      });
  }

  onMonthSelected(event: any, datepicker: any): void {
    const selectedDate = new Date(event);
    this.currentdate = moment(selectedDate).format('MMMM YYYY');
    this.loadData(this.currentdate);
    datepicker.close();
  }
}
