import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;

  constructor(
      private authService: AuthService,
      private router: Router,
  ) {
    this.form = new FormGroup({
      email: new FormControl('eve.holt@reqres.in', [Validators.required, Validators.email]),
      password: new FormControl('cityslicka', [Validators.required, Validators.minLength(4)])
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.form.valid) {
      this.form.disable();
      this.authService.login(this.form.value).subscribe(
          response => {
            this.form.reset();
            this.form.enable();
            this.router.navigate(['/home']);
          },
          error => {
            console.log(error);
            this.form.enable();
          }
      );
    }
  }

}
