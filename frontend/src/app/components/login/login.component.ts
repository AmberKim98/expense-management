import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userName: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    })
  }

  onSubmit(formData: any) {
    this.userName = formData.username;
    this.password = formData.password;
    
    console.log('username: ', this.userName);
    console.log('password', this.password);

    this.authService.login(this.userName, this.password).subscribe(data => {
      console.log('Login successful: ', data);

      if(data == true) {
        localStorage.setItem('isUserLoggedIn', 'true');
        this.router.navigate(['expenses']);
      }
    })
  }
}
