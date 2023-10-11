import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  loggedIn!: boolean;
  constructor(
    private myUserServ: UserService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    // Get initial loggedIn status from AuthService
    this.loggedIn = this.authService.isLoggedIn();
  }
  logOut() {
    this.myUserServ.logOut().subscribe({
      next: (data) => {
        this.authService.setLoggedIn(false);
      },
      error: () => {
        console.log('Error');
      },
    });
  }
}
