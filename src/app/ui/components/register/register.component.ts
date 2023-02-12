import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CreateUser } from 'src/app/contracts/users/create-user';
import { User } from 'src/app/entities/user';
import { UserService } from 'src/app/services/common/models/user.service';
import {
  CustomToastrService,
  ToastrMessagePosition,
  ToastrMessageType,
} from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: CustomToastrService
  ) {}

  frm: FormGroup;
  ngOnInit(): void {
    this.frm = this.formBuilder.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.minLength(3),
          ],
        ],
        surname: [
          '',
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.minLength(3),
          ],
        ],
        username: [
          '',
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.minLength(3),
          ],
        ],
        email: [
          '',
          [Validators.required, Validators.maxLength(150), Validators.email],
        ],
        password: ['', [Validators.required]],
        passwordConfirm: ['', [Validators.required]],
      },
      {
        validators: (group: AbstractControl): ValidationErrors | null => {
          let password = group.get('password').value;
          let passwordConfirm = group.get('passwordConfirm').value;
          return password === passwordConfirm ? null : { notSame: true };
        },
      }
    );
  }

  get component() {
    return this.frm.controls;
  }

  submitted: boolean = false;
  async onSubmit(user: User) {
    this.submitted = true;
    if (this.frm.invalid) return;

    const result: CreateUser = await this.userService.create(user);
    if (result.succeeded)
      this.toastrService.message(result.message, "Kullanıcı Kayıt Başarılı", {
        messagaPosition: ToastrMessagePosition.BottomFullWidth,
        messageType: ToastrMessageType.Success,
      });
    else
      this.toastrService.message(result.message, "Kullanıcı kaydı hatası", {
        messagaPosition: ToastrMessagePosition.BottomFullWidth,
        messageType: ToastrMessageType.Error,
      });
  }
}
