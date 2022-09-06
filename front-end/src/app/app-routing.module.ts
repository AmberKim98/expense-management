import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewExpenseComponent } from './components/add-new-expense/add-new-expense.component';
import { EditExpenseComponent } from './components/edit-expense/edit-expense.component';
import { ExpenseEntryListComponent } from './components/expense-entry-list/expense-entry-list.component';
import { ExpenseEntryComponent } from './components/expense-entry/expense-entry.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ExpenseGuard } from './guard/expense.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'expenses',
    component: ExpenseEntryListComponent,
    canActivate: [ExpenseGuard]
  },
  {
    path: 'expenses/detail/:id',
    component: ExpenseEntryComponent,
    canActivate: [ExpenseGuard]
  },
  {
    path: 'add-new-expense',
    component: AddNewExpenseComponent,
    canActivate: [ExpenseGuard]
  },
  {
    path: 'expenses/detail/edit/:id',
    component: EditExpenseComponent,
    canActivate: [ExpenseGuard]
  },
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
