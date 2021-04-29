import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { catchError , map } from 'rxjs/operators';


export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
 form : FormGroup ;
 baseURL : string = "http://daycarepanel.stage02.obdemo.com/api/v1/"
 api : string = "signup";

  constructor(private fb:FormBuilder, private http:HttpClient) {
    this.form = this.fb.group({
      name:['',[Validators.required,Validators.minLength(10)]],
      email:['',[Validators.required]],
      password:['',[Validators.required,Validators.minLength(8),Validators.maxLength(12)]],
      phone_number:['',[Validators.minLength(10)]],
      postcode:[''],
      role_id :[''],
      confirm_password:['',[Validators.required]],
      daycare_id:[''],
      avatar:[null]
    },
    {
      validator: MustMatch('password', 'confirm_password')
    }
    )
   }

  ngOnInit(): void {
  }
uploadFile(event:any){
  const file : File =event.target.files[0];
  this.form.patchValue({
    avatar:file
  });
  this.form.get('avatar')?.updateValueAndValidity()
}
submitForm(){
  var formData = new FormData();
  return this.http.post<any>(
  this.baseURL+this.api,this.form.value).subscribe(
    (res)=>{
      console.log(res);
    }
  ),
  catchError((err)=>{
    return err.error;
  })
}

}


