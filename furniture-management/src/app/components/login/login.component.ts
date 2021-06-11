import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public usernameAdmin: string = "admin";
  public passwordAdmin: string = "admin";

  constructor(private router: Router) { };

  ngOnInit(): void {
  };

  login(username: string, password: string): void {
    if(username === this.usernameAdmin && password === this.passwordAdmin) {
      let admin = {
        username,
        password
      };
      localStorage.setItem("admin", JSON.stringify(admin));
      this.router.navigateByUrl("/furniture/store-management");
    }else {
      alert("Please try again :)))");
    };
  };

}
