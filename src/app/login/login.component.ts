import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 baseURL : string = "http://daycarepanel.stage02.obdemo.com/api/v1/";
 api : string = "login";
  form: FormGroup;
  constructor(private http : HttpClient, private fb :FormBuilder) {
    this.form = this.fb.group({
    email : ['',[Validators.required]],
    password:['',[Validators.required,Validators.minLength(8),Validators.maxLength(12)]],
    })
   }

  ngOnInit(): void {
  }
  submit(){
    var formData = new FormData();
    return this.http.post<any>(
      this.baseURL + this.api,this.form.value).subscribe(
        (res)=>{console.log(res)}
      ),
catchError((err)=>{
  return err.error;

})
  }

}
