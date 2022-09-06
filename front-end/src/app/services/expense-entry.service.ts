import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, retry } from 'rxjs/operators';
import { ExpenseEntry } from '../interface/expense-entry';

@Injectable({
  providedIn: 'root'
})
export class ExpenseEntryService {
  private expenseRestUrl = "http://localhost:8000/api/expense";
  private httpOptions = {
    headers: new HttpHeaders({'Content-type' : 'application/json'}) 
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * get expenses list
   * 
   * @returns 
   */
  getExpenseList(): Observable<any> {
    return this.httpClient.get(this.expenseRestUrl, this.httpOptions)
    .pipe(
      retry(3),
      catchError(this.httpErrorHandler)
    )
  }

  /**
   * get expense by id
   * 
   * @param id 
   * @returns 
   */
  getExpenseById(id: Number): Observable<any> {
    return this.httpClient.get(this.expenseRestUrl + '/' + id, this.httpOptions)
    .pipe(
      retry(3),
      catchError(this.httpErrorHandler)
    )
  }
  
  addExpenseEntry(expense: ExpenseEntry): Observable<ExpenseEntry> {
    return this.httpClient.post<ExpenseEntry>(this.expenseRestUrl, expense, this.httpOptions)
    .pipe(
      delay(1000),
      retry(3),
      catchError(this.httpErrorHandler)
    )
  }

  editExpenseEntry(expense: ExpenseEntry): Observable<ExpenseEntry> {
    console.log('expense service data: ', expense);
    return this.httpClient.put<ExpenseEntry>(this.expenseRestUrl + '/' + expense.id, expense, this.httpOptions)
    .pipe(
      retry(3),
      catchError(this.httpErrorHandler)
    )
  }

  deleteExpenseEntry(id: number): Observable<ExpenseEntry> {
    console.log('deleting...', typeof(id));
    return this.httpClient.delete<ExpenseEntry>(this.expenseRestUrl + '/' + id, this.httpOptions)
    .pipe(
      delay(1000),
      retry(3),
      catchError(this.httpErrorHandler)
    )
  }

  /**
   * handle http errors
   * 
   * @param error 
   * @returns 
   */
  private httpErrorHandler(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      console.error("A client side error occurs. The error message is " + error.message);
    } else {
      console.error("An error happened in server. The HTTP status code is "  + error.status + " and the error returned is " + error.message);
    }
    return throwError("Error occurred. Pleas try again");
  }
}
