import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ExpenseEntryService } from 'src/app/services/expense-entry.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-expense',
  templateUrl: './add-new-expense.component.html',
  styleUrls: ['./add-new-expense.component.scss']
})
export class AddNewExpenseComponent implements OnInit {
  formData: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseEntryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formData = this.fb.group({
      item: ['', Validators.required],
      category: ['', Validators.required],
      location: ['', Validators.required],
      amount: ['', Validators.required],
      spentOn: ['', Validators.required]
    })
  }

  onSubmit(data: any) {
    this.isSubmitted = true;

    this.expenseService.addExpenseEntry(data).subscribe(data => {
      this.router.navigate(['expenses']);
    })
  }
}
