import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  constructor(private userServ: UserService, private router: Router) {}
  ermsg: string = '';
  ngOnInit(): void {}

  onSignUp(formData: NgForm) {
    if (formData.invalid) {
      return;
    }
    this.userServ
      .signUp(
        formData.value.userName,
        formData.value.userEmail,
        formData.value.userPassword
      )
      .subscribe({
        next: (data) => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.ermsg = err.error.Errors.email;
        },
      });
  }
}
