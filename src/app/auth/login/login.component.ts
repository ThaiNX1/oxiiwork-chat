import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MaterialModule} from "../../core/material.module";
import {LoginType} from "../../core/constants/enum";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {CommonService} from "../../core/services/common.service";
import {storageKey} from "../../core/constants/storage-key";
import {DirectiveModule} from "../../shared/directive.module";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MaterialModule,
    DirectiveModule,
    TranslateModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  $unSubscribe: any
  loginFrom!: FormGroup;
  receivedOtpFrom!: FormGroup;
  emailFrom!: FormGroup;
  otpFrom!: FormGroup;
  forgotPasswordFrom!: FormGroup;
  LoginRoleTypeEnum = LoginRoleType
  LoginTypeEnum = LoginType;

  isSubmitted = false;
  isWrongUserPassword = false;
  isShowForgotPass = false;
  isUpdatePass = false;

  loginType = LoginType.LOGIN;
  countDown = 120000;
  countDownInterval: any = null;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly commonService: CommonService,
    // private readonly homeService: HomeService,
  ) {
  }

  ngOnInit(): void {
    this.loginFrom = new FormGroup({
      loginType: new FormControl(LoginRoleType.GUEST),
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      showPassword: new FormControl(false),
      remember: new FormControl(false),
      newPassword: new FormControl(),
      showNewPassword: new FormControl(false),
      reTypeNewPassword: new FormControl(),
      showReTypeNewPassword: new FormControl(false),
    });
    this.loginFrom.valueChanges.pipe().subscribe(() => {
      this.isSubmitted = false;
      this.isWrongUserPassword = false;
    });
    this.receivedOtpFrom = new FormGroup({
      phone: new FormControl(null, [Validators.required]),
    });
    this.emailFrom = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      session: new FormControl(null),
    });
    this.otpFrom = new FormGroup({
      number1: new FormControl(null, [Validators.required, Validators.max(9), Validators.min(0)]),
      number2: new FormControl(null, [Validators.required, Validators.max(9), Validators.min(0)]),
      number3: new FormControl(null, [Validators.required, Validators.max(9), Validators.min(0)]),
      number4: new FormControl(null, [Validators.required, Validators.max(9), Validators.min(0)]),
      number5: new FormControl(null, [Validators.required, Validators.max(9), Validators.min(0)]),
      number6: new FormControl(null, [Validators.required, Validators.max(9), Validators.min(0)]),
    });
    this.forgotPasswordFrom = new FormGroup({
      newPassword: new FormControl(null, [Validators.required]),
      showNewPassword: new FormControl(false),
      reNewPassword: new FormControl(null, [Validators.required]),
      showReNewPassword: new FormControl(false),
      accessToken: new FormControl(null),
    });
    this.checkIsAuthen()
    // this.loginFrom = new FormGroup({
    //   organizationId: new FormControl(null, [Validators.required]),
    //   email: new FormControl(null, [Validators.required]),
    //   password: new FormControl(null, [Validators.required]),
    //   isKeepSignedIn: new FormControl(true),
    // })
  }

  async onFirstButtonClick() {
    this.loginFrom.markAllAsTouched()
    if (this.loginFrom.invalid) {
      this.commonService.openSnackBarError('MESSAGE.REQUIRED_FIELD')
      return
    }
    switch (this.loginType) {
      case LoginType.LOGIN:
        await this.handleLogin()
        break;
      case LoginType.FORGOT_PASSWORD:
        await this.onSendOtp();
        break;
      case LoginType.OTP:
        await this.onVerifyOtp();
        break;
      // case LoginType.FORGOT_PASSWORD:
      //     await this.onSetPassword();
      //     break;
      case LoginType.UPDATE_PASSWORD:
        await this.onSetPassword();
        break;
    }
  }

  async onSecondButtonClick() {
    this.loginFrom.reset()
    this.emailFrom.reset()
    this.receivedOtpFrom.reset()
    this.forgotPasswordFrom.reset()
    this.loginFrom.patchValue({
      loginType: LoginRoleType.GUEST
    })
    this.loginType = LoginType.LOGIN
  }

  async onSendOtp() {
    this.receivedOtpFrom.markAllAsTouched();
    if (this.receivedOtpFrom.invalid) {
      return;
    }
    clearInterval(this.countDownInterval);
    const response = await this.authService.identityGuestGetOtp(this.receivedOtpFrom.value.phone);
    if (response) {
      this.emailFrom.patchValue({
        session: response?.session
      });
      this.countDown = 120000;
      this.countDownInterval = setInterval(() => {
        this.countDown -= 1000;
      }, 1000);
      this.loginType = LoginType.OTP
    }
  }

  async onVerifyOtp() {
    this.otpFrom.markAllAsTouched();
    if (this.otpFrom.invalid) {
      return;
    }
    if (this.emailFrom.value.session?.length) {
      const otp = Object.keys(this.otpFrom.value)?.reduce((_otp, key) => {
        _otp = _otp + this.otpFrom.value[key]?.toString()?.trim() + '';
        return _otp;
      }, '');
      const response = await this.authService.identityGuestVerifyOtp(Number(otp), this.emailFrom.value.session);
      if (response) {
        this.forgotPasswordFrom.reset();
        this.forgotPasswordFrom.patchValue({
          accessToken: response.accessToken
        });
        this.loginType = LoginType.UPDATE_PASSWORD
      } else {
        this.loginType = LoginType.OTP
        this.otpFrom.reset()
      }
    }
  }

  async onSetPassword() {
    this.forgotPasswordFrom.markAllAsTouched();
    if (this.forgotPasswordFrom.invalid) {
      return;
    }
    if (this.forgotPasswordFrom.value.newPassword?.trim() !== this.forgotPasswordFrom.value.reNewPassword?.trim()) {
      this.commonService.openSnackBarError('MESSAGE.PASSWORD_NOT_MATCH');
      return;
    }
    const response = await this.authService.identityGuestSetPassword(
      this.forgotPasswordFrom.value.newPassword?.trim(),
      this.forgotPasswordFrom.value.accessToken
    );
    if (response) {
      this.commonService.openSnackBar('MESSAGE.PASSWORD_UPDATED');
      this.loginFrom.reset();
      this.loginFrom.patchValue({
        loginType: LoginRoleType.GUEST,
        email: '',
        password: ''
      });
      localStorage.clear()
      this.loginType = LoginType.LOGIN
    }
  }

  /**
   * Handle logic login
   */
  async handleLogin() {
    this.loginFrom.markAllAsTouched()
    let response = null
    switch (this.loginFrom.value.loginType) {
      case LoginRoleType.ADMIN:
        response = await this.authService.login(this.loginFrom.value.email, this.loginFrom.value.password)
        break
      case LoginRoleType.GUEST:
        response = await this.authService.loginWithPhoneNumber(this.loginFrom.value.email, this.loginFrom.value.password)
        break
    }
    if (response) {
      localStorage.setItem(storageKey.token, response?.accessToken ?? '');
      localStorage.setItem(storageKey.refresh_token, response?.refreshToken ?? '');
      localStorage.setItem(storageKey.user, JSON.stringify({
        user: response.user,
        role: response.avaiableBusinessRoles,
        isGuest: this.loginFrom.value.loginType === LoginRoleType.GUEST
      }));
      // this.homeService.userLogin.next({
      //   ser: response.user,
      //   role: response.avaiableBusinessRoles,
      //   isGuest: this.loginFrom.value.loginType === LoginRoleType.GUEST
      // })
      if (this.loginFrom.value.loginType === LoginRoleType.ADMIN)
        this.router.navigate(["cms"]).then();
      else
        this.router.navigate(["guest/chat"]).then();
    }
  }

  /**
   * Handle logic show dialog forgot pass
   */
  onForgotPassword(): void {
    if (this.loginFrom.value.loginType === LoginRoleType.ADMIN)
      return
    this.isShowForgotPass = true;
    this.emailFrom.reset()
    this.receivedOtpFrom.reset()
    this.forgotPasswordFrom.reset()
    this.loginFrom.controls['password'].clearValidators()
    this.loginFrom.controls['password'].updateValueAndValidity()
    clearInterval(this.countDownInterval)
    clearTimeout(this.countDownInterval)
    switch (this.loginFrom.value.loginType) {
      case LoginRoleType.GUEST:
        this.loginType = LoginType.FORGOT_PASSWORD
        break
      default:
        this.loginType = LoginType.LOGIN
        break
    }
  }

  onRegisterOrLogin(): void {
    if (this.isShowForgotPass) {
      this.loginFrom.controls['password'].setValidators(Validators.required)
      this.loginFrom.controls['password'].updateValueAndValidity()
      this.isShowForgotPass = false
    } else {

    }
  }

  /**
   * handle logic check user is authenication
   */
  checkIsAuthen(): void {
    if (localStorage.getItem(storageKey.token)?.length) {
      this.router.navigate(['home']);
    }
  }

  ngOnDestroy(): void {
    this.$unSubscribe?.next(null);
  }

  // showHidePass(event: any): void {
  //   this.hidePass.set(!this.hidePass());
  // }
  //
  // showDialogForgotPass() {
  // }
  //
  // handleLogin() {
  // }
}

export enum LoginRoleType {
  ADMIN = 'ADMIN',
  GUEST = 'GUEST'
}
