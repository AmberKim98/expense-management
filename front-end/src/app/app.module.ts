import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExpenseEntryComponent } from './components/expense-entry/expense-entry.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ExpenseEntryListComponent } from './components/expense-entry-list/expense-entry-list.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AddNewExpenseComponent } from './components/add-new-expense/add-new-expense.component';
import { EditExpenseComponent } from './components/edit-expense/edit-expense.component';

@NgModule({
  declarations: [
    AppComponent,
    ExpenseEntryComponent,
    LoginComponent,
    NavbarComponent,
    ExpenseEntryListComponent,
    LogoutComponent,
    AddNewExpenseComponent,
    EditExpenseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
