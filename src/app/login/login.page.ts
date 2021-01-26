import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';
import {AlertService} from '../shared/services/alert.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('inputEmail') inputEmail: ElementRef;

  form: FormGroup;

  constructor(
      private authService: AuthService,
      private router: Router,
      private alertService: AlertService,
  ) {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(4)])
    });
    if (!environment.production) {
      this.form.patchValue({
        username: 'postosia',
        password: 'j-3IVQ02GY',
      });
    }
  }

  ngOnInit() {
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.form.disable();
      this.authService.login(this.form.value).subscribe(
          response => {
            this.form.enable();
            this.form.reset();
            this.router.navigate(['/home']);
          },
          error => {
            console.log(error);
            this.form.enable();
            if (environment.production) {
              this.form.get('password').reset();
            }
            console.log();
            // this.inputEmail.el.firstChild.focus();
            // this.alertService.showAlertMessage({header: 'Ops', subHeader: '', message: 'Não foi possível efetuar login, verifique seu usuário/senha'});
          }
      );
    }
  }
}
