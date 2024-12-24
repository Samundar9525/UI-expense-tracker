import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// interface StockDetail {
//   Date: string;
//   'Current Price': number;
//   'Buy Price': number;
//   'Sell Price': number;
// }


@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = 'http://localhost:3000/api/records';

  constructor(private http: HttpClient) {}

  // Fetch all stock records
  getAllStocks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Add a new stock record
  addStock(stock: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, stock);
  }

  // Delete a stock record by ID
  deleteStock(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


  // Fetch all stock records for a specific month_year_key
  getStocksByMonthYear(monthYearKey: string): Observable<any[]> {
    const params = new HttpParams().set('month_year_key', monthYearKey);  // Add the query parameter
    return this.http.get<any[]>(this.apiUrl, { params });
  }

}
