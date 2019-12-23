import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { emailValidatorByFormControl } from '../../services/validatorService';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';
import {NavController} from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  loginError = '';
  loginUser  = '';
  loginTip  =  '';

  formErrors = {
    email: '',
    password: ''
  };

  validationMessages = {
    email: {
      required: 'Email is required.',
      invalidEmail: 'Email is Illegal！'
    },
    password: {
      required: 'Password is required.'
    }
  };


  constructor(
    private router: Router,
    private ativatedRoute: ActivatedRoute,
    private nav: NavController,
    private formBuilder: FormBuilder,
    public userService: UserService) {
    // this.loginUser =  this.navParams.get('email') || '';
    userService.getLoginUser().then((user) => {
      if (user) {
        const u = JSON.parse(user);
        this.loginUser = this.loginUser || u.email;
        this.buildForm();
      }
    });
    this.buildForm();
    // this.loginForm = this.formBuilder.group({
    //   'email': ['', [Validators.required, Validators.minLength(4), emailValidatorByFormControl]],
    //   'password': ['', [Validators.required, Validators.minLength(4)]]
    // });
  }
  ngOnInit() {}
  login() {
    const user = this.loginForm.value;
    // this.nav.navigateForward('home');
    this.router.navigate(['/home']);
    // this.userService.login(user).then(reUser => {
    //   if (reUser === null) {
    //     this.loginTip = '用户名或密码错误';
    //   }
    // });

  }



  buildForm(): void {
    this.loginForm = this.formBuilder.group({
      email: [this.loginUser, [Validators.required, emailValidatorByFormControl]],
      password: ['', Validators.required]
    });

    this.loginForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }
  onValueChanged(data?: any) {
    if (!this.loginForm) { return; }
    const form = this.loginForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        this.loginTip = '';
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (this.formErrors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
}
