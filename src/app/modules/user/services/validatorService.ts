import { FormControl } from '@angular/forms';
import { AbstractControl, ValidatorFn } from '@angular/forms';

export function emailValidatorByFormControl(control: FormControl): { [s: string]: boolean } {
        if (!control.value.match(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/)) {
                return { invalidEmail: true };
        }
}


export function nicknameValidator(control: FormControl): { [s: string]: boolean } {
        if (!control.value.match(/^[(\u4e00-\u9fa5)0-9a-zA-Z\_\s@]+$/)) {
                return { invalidNickname: true };
        }
}

export function confirmPasswordValidator(password: string, reverse): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
        const pass =  control.root.get(password);
        if ( pass != null  && control.value !== pass.value && !reverse) {
                return { invalidConfirmPassword: true };
        }
        if ( pass != null  && control.value === pass.value && reverse) {
                const invalidConfirmPassword = 'invalidConfirmPassword';
                delete pass.errors[ invalidConfirmPassword ];
                if (!Object.keys(pass.errors).length) {
                        pass.setErrors(null);
                }
        }

        if( pass != null  && control.value !== pass.value && reverse) {
               pass.setErrors({invalidConfirmPassword: true});
        }
  };
}

