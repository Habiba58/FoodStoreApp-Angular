import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordMatch:ValidatorFn=
(control: AbstractControl):ValidationErrors | null=>{
    let passwordControl = control.get('password');
    let confirmPasswordConrol = control.get('confirmPassword');
    if (!passwordControl?.value || !confirmPasswordConrol?.value) {
        return null;
    }
    let valError = { 'unMatchedPasswords': true };
    return (passwordControl.value == confirmPasswordConrol.value) ? null : valError;

};