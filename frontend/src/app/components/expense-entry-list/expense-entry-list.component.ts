import { Component, OnInit } from '@angular/core';
import { ExpenseEntryService } from 'src/app/services/expense-entry.service';

@Component({
  selector: 'app-expense-entry-list',
  templateUrl: './expense-entry-list.component.html',
  styleUrls: ['./expense-entry-list.component.scss']
})
export class ExpenseEntryListComponent implements OnInit {
  title: string = '';
  expenses: any;
  constructor(
    private expenseService: ExpenseEntryService
  ) { }

  ngOnInit() {
    this.title = 'Expense Entry';
    this.getExpenseList();
  }

  getExpenseList() {
    this.expenseService.getExpenseList().subscribe(data => {
      this.expenses = data;
    })
  }
}
