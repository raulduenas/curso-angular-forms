import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { emailPattern, nombreApellidoPattern } from 'src/app/shared/validator/validaciones';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  // TODO: Mover


  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.vs.nombreApellidoPattern) ] ],
    email: ['', [Validators.required, Validators.pattern(this.vs.emailPattern) ], [ this.emailValidator ] ],
    username: ['', [Validators.required, this.vs.noPuedeSerStrider ] ],
    password: ['', [Validators.required, Validators.minLength(6) ] ],
    password2: ['', [Validators.required ] ]
  }, {
    validators: [ this.vs.camposIguales('password' , 'password2' ) ]
  });

  get emailErrorMsg(): string {
    const errors = this.miFormulario.get('email')?.errors;

    if (errors?.required) {
      return 'Email es obligatorio';
    } else if (errors?.pattern ) {
      return 'El valor ingresado no tiene formato de correo';
    } else if (errors?.emailTomado ) {
      return 'El email ya fue tomado';
    }

    return '';
  }

  constructor( private fb: FormBuilder,
               private vs: ValidatorService,
               private emailValidator: EmailValidatorService) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Raul Duenas',
      email: 'test1@test.com',
      username: 'rduenas',
      password: '123456',
      password2: '123456'
    });
  }

  campoNoValido( campo: string ) {
    return this.miFormulario.get(campo)?.invalid
            && this.miFormulario.get(campo)?.touched;
  }
 
  // emailRequired() {
  //   return this.miFormulario.get('email')?.errors?.required
  //           && this.miFormulario.get('email')?.touched;
  // }

  // emailFormato() {
  //   return this.miFormulario.get('email')?.errors?.pattern
  //           && this.miFormulario.get('email')?.touched;
  // }

  // emailTomado() {
  //   return this.miFormulario.get('email')?.errors?.emailTomado
  //           && this.miFormulario.get('email')?.touched;
  // }

  submitFormulario() {
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
  }

}
