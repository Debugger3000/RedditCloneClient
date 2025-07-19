import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GeneralService } from '../../services/general.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private router: Router) {}

  registerService = inject(RegisterService);
  generalService = inject(GeneralService);

  // flags to raise when user needs to meet requirements...
  authFlags: {
    emailFlag: boolean;
    usernameFlag: boolean;
    passwordFlag: boolean;
    // server side flags
    usernameUniqueFlag: boolean;
    emailUniqueFlag: boolean;
  } = {
    emailFlag: true,
    usernameFlag: true,
    passwordFlag: true,
    // server side flags
    usernameUniqueFlag: true,
    emailUniqueFlag: true,
  };
  // emailFlag: boolean = true;
  // usernameFlag: boolean = true;
  // passwordFlag: boolean = true;
  // // server side flags
  // usernameUniqueFlag = false;
  // emailUniqueFlag = false;

  readonly FlagMessages = {
    usernameMessage: 'Username needs to be at least 4 characters long',
    usernameUniqueMessage:
      'That username is already taken. Please choose another one',
    emailMessage:
      'Please provide a valid email address. Email needs a name of at least 4 characters. Example; fakeemail@gmail.com',
    emailUniqueMessage:
      'That email is already in our system. Please choose another one',
    passwordMessage:
      'Password needs to be at least 6 characters long, including atleast; 1 uppercase letter, 1 number, and 1 special character',
  };

  // create form items
  userRegisterForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmitRegister() {
    if (
      this.userRegisterForm.get('username') &&
      this.userRegisterForm.get('email') &&
      this.userRegisterForm.get('password')
    ) {
      console.log('no fieldss empty doing additional checks !');
      const totalFlag = this.checkSecurity();

      // if flags are safe to submit to backend
      if (totalFlag) {
        this.registerService
          .registerUser(this.userRegisterForm.value)
          .subscribe({
            next: (data) => {
              console.log('Data received back from Register: ', data);
              this.generalService.showHeader = true;
              this.generalService.setUserData(data);
              this.router.navigate(['/home']);
            },
            error: (error) => {
              // look at server status sent back
              if (error.error.email === 0 && error.error.username === 0) {
                this.authFlags.emailUniqueFlag = false;
              } else {
                this.authFlags.emailUniqueFlag = true;
              }

              if (error.error.username === 0 && error.error.email === 1) {
                this.authFlags.usernameUniqueFlag = false;
              } else {
                this.authFlags.usernameUniqueFlag = true;
              }
              console.log('failed to register: ', error);

              console.log('Error on login: ', error);
            },
          });
      }
    }
  }

  // check register details security level
  checkSecurity() {
    // make sure username is atleast 4 characters long
    if (this.userRegisterForm.get('username')!.value!.length < 4) {
      this.authFlags.usernameFlag = false;
    } else {
      this.authFlags.usernameFlag = true;
    }

    enum AtSymbol {
      At = '@',
      Google = 'gmail.com',
      Microsoft = 'outlook.com',
    }

    // email conforms to style
    const email = this.userRegisterForm.get('email')?.value;

    // check at least 4 characters before @
    let preAt = '';
    let atIndex = 0;
    for (let i = 0; i < email!.length; i++) {
      if (email![i] === '@') {
        atIndex = i;
        preAt = email!.slice(0, i);
        break;
      }
    }

    if (preAt.length < 4) {
      this.authFlags.emailFlag = false;
    } else {
      this.authFlags.emailFlag = true;
    }

    // after @ look for 'gmail.com' or 'outlook.com'
    const emailProvider = email?.slice(atIndex + 1);
    if (
      emailProvider !== AtSymbol.Google &&
      emailProvider !== AtSymbol.Microsoft
    ) {
      this.authFlags.emailFlag = false;
    }

    const alphabet = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ];

    const specialCharacters = [
      '!',
      '@',
      '#',
      '$',
      '%',
      '^',
      '&',
      '*',
      '(',
      ')',
      '-',
      '_',
      '=',
      '+',
      '[',
      ']',
      '{',
      '}',
      '\\',
      '|',
      ';',
      ':',
      "'",
      '"',
      ',',
      '.',
      '/',
      '<',
      '>',
      '?',
      '`',
      '~',
    ];

    const digitStrings = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    // password is at least 6 characters (atleast; one uppercase letter, one number, one symbol)
    const password = this.userRegisterForm.get('password')?.value;
    if (password!.length < 6) {
      this.authFlags.passwordFlag = false;
    } else {
      this.authFlags.passwordFlag = true;
    }

    if (this.authFlags.passwordFlag) {
      // check for security of (1:1:1)
      let passwordCheckList = {
        upperCaseCheck: 0,
        numberCheck: 0,
        symbolCheck: 0,
      };

      for (let i = 0; i < password!.length; i++) {
        const val = password![i];
        // check for a number
        if (passwordCheckList.numberCheck === 0) {
          if (digitStrings.includes(val)) {
            passwordCheckList.numberCheck = 1;
          }
        }
        // check for an uppercase
        if (passwordCheckList.upperCaseCheck === 0) {
          if (alphabet.includes(val)) {
            passwordCheckList.upperCaseCheck = 1;
          }
        }
        // check for symbols
        if (passwordCheckList.symbolCheck === 0) {
          if (specialCharacters.includes(val)) {
            passwordCheckList.symbolCheck = 1;
          }
        }
      }

      // check object and see if all are passed
      if (
        passwordCheckList.upperCaseCheck === 1 &&
        passwordCheckList.symbolCheck === 1 &&
        passwordCheckList.numberCheck === 1
      ) {
        this.authFlags.passwordFlag = true;
      } else {
        console.log('password failed: ', password);
        console.log('passowr dstructure: ', passwordCheckList);
        this.authFlags.passwordFlag = false;
      }
    }

    // return total flag
    if (
      this.authFlags.passwordFlag &&
      this.authFlags.usernameFlag &&
      this.authFlags.emailFlag
    ) {
      return true;
    } else {
      console.log('password failed flag', this.authFlags.passwordFlag);
      console.log('email failed flag', this.authFlags.emailFlag);
      console.log('username failed flag', this.authFlags.usernameFlag);
      return false;
    }
  }

  // go home
  goHome(route: string) {
    this.generalService.LinkToPage(route);
    this.generalService.showHeader = true;
  }
}
