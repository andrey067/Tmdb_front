import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegistreteUser } from 'src/app/models/Identity/registreteUser';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registreteUser = {} as RegistreteUser;
  form!: FormGroup;


  constructor(public fb: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    private toaster: ToastrService) { }

  get f(): any {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.validation();
  }

  private validation(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      birthday: ['', [Validators.required, Validators.nullValidator]],
    });
  }

  register(): void {
    console.log(this.form.value);
    this.registreteUser = { ...this.form.value };
    this.accountService.register(this.registreteUser).subscribe(
      () => { this.router.navigateByUrl('users/login'); this.toaster.success("Usuario cadastrado com sucesso!") },
      (error: any) => this.toaster.error(error.error)
    )
  }
}
