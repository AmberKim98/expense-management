import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ExpenseEntry } from 'src/app/interface/expense-entry';
import { ExpenseEntryService } from 'src/app/services/expense-entry.service';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.scss']
})
export class EditExpenseComponent implements OnInit {
  formData: FormGroup;
  selectedId: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private expenseEntryService: ExpenseEntryService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      this.selectedId = Number(data['id']);
    })

    if(this.selectedId != null) {
      this.expenseEntryService.getExpenseById(this.selectedId).subscribe(data => {
        if(data != null) {
          this.formData.controls['id'].setValue(data['id']);
          this.formData.controls['item'].setValue(data['item']);
          this.formData.controls['category'].setValue(data['category']);
          this.formData.controls['location'].setValue(data['location']);
          this.formData.controls['amount'].setValue(data['amount']);
          this.formData.controls['spentOn'].setValue(data['spentOn']);
        }
      })
    }

    this.formData = this.fb.group({
      id: [''],
      item: ['', Validators.maxLength(50)],
      category: ['', Validators.maxLength(50)],
      location: ['', Validators.maxLength(50)],
      amount: ['', Validators.min(1)],
      spentOn: ['', Validators.required]
    })
  }

  onSubmit(formData: any) {
    let expenseEntry: ExpenseEntry = {
      id: formData.id,
      item: formData.item,
      category: formData.category,
      location: formData.location,
      amount: formData.amount,
      spentOn: formData.spentOn,
      createdOn: new Date()
    };
    
    this.expenseEntryService.editExpenseEntry(expenseEntry).subscribe(data => {
      this.router.navigate(['expenses/detail/'+this.selectedId]);
    })
  }

}
