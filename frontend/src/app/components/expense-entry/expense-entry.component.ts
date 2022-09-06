import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ExpenseEntry } from 'src/app/interface/expense-entry';
import { ExpenseEntryService } from 'src/app/services/expense-entry.service';

@Component({
  selector: 'app-expense-entry',
  templateUrl: './expense-entry.component.html',
  styleUrls: ['./expense-entry.component.scss']
})
export class ExpenseEntryComponent implements OnInit {
  title: string = '';
  expenseEntry$: Observable<ExpenseEntry>;
  expenseEntry: any;
  selectedId: number;
  formEdit: boolean = false;

  constructor(
    private expenseService: ExpenseEntryService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.activatedRoute.params.subscribe(data => {
      this.selectedId = Number(data['id']);
    })
  }

  ngOnInit() {
    this.expenseService.getExpenseById(this.selectedId).subscribe(data => {
      this.expenseEntry = data;
    })
  }

  deleteExpense(expenseEntryId: number) {
    this.expenseService.deleteExpenseEntry(expenseEntryId).subscribe(data => {
      this.router.navigate(['expenses']);
    })
  }
}
