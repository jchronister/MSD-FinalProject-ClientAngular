import { Component, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { AccountState } from "../account-state"
import { IServerObject } from "../app.types";
import { MainServiceService } from "./main-service.service"


@Component({

  selector: "create-post",
  template: `

    <div style="margin: 40px;">
    <h2>Image Upload</h2>

    <form [formGroup]="requestForm" (ngSubmit)="createRequest()">

      <div>
        <mat-form-field appearance="fill">
          
        <ngx-mat-file-input [formControl]="fileControl" [multiple]="false" accept=".png, .jpg, .jpeg">
          </ngx-mat-file-input>
        </mat-form-field>

      </div>

      <div>
        <mat-form-field appearance="fill" style="width: 500px;">
          <mat-label>Image Description</mat-label>
          <textarea 
            cdkTextareaAutosize
            cdkAutosizeMinRows="5"
            matInput [formControl]="description"></textarea>
        </mat-form-field>
      </div>

      <div class="spinner" *ngIf="processing">
        <mat-spinner diameter="60"></mat-spinner>
      </div>
 
      <div class="error" *ngIf="error">
        {{error}}
      </div>

      <button 
        [disabled]="!requestForm.valid"
        mat-raised-button color="primary">
        Upload Image</button>
      
    </form>

      <div class="thumbnail" *ngIf="url">
        <img src="{{url}}" class="image">
        <div><a href="{{url}}" target="_blank" rel="noopener noreferrer">{{url}}</a></div>
        
      </div>

    </div>
  `
,styles:[".txt {width: 300px}",
         ".spinner {margin: 20px; margin-left: 30px;}",
         ".thumbnail {margin-top: 20px}",
         ".error {color: red; margin-bottom: 20px};",
         ".image {margin: 20px;}",
]

})
export class CreatePost implements OnDestroy{

  requestForm: FormGroup
  fileControl: FormControl
  description: FormControl
  error = ""
  subscription: Subscription | undefined
  processing = false
  url = ""

  constructor (private state: AccountState, private http: MainServiceService) {

    // Setup Form
    this.fileControl = new FormControl("", Validators.required)
    this.description = new FormControl("", Validators.required)
    
    this.requestForm = new FormGroup({

      description: this.description,
      type: this.fileControl,
      

    })

    this.subscription = this.requestForm.valueChanges.subscribe ( () => this.error = "")

  }


  createRequest () {

      this.error = ""
      this.processing = true
      this.url = ""

      const formData = new FormData()
      formData.append('description', this.requestForm.value.description)
      formData.append('user', this.state.getCurrentUserInfo().username)
      formData.append('image', this.requestForm.value.type)
      

      this.http.postRequest(formData).subscribe( (n: IServerObject) => {

        this.processing = false

        if (n.status === "Success") {
          this.url = n.data.thumbnailURL
          this.requestForm.reset()     
        } else {
          this.error = "Error Adding Request: " + n.error
        }
      }, 
      
        // Handle HTTP Error
        (error) => {
          this.processing = false
          this.error = (error.statusText || "Unknown Error") + " - Timeout: Please Verify Network Connections"
      })
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe()
  }

}





// Preview
// imgInp.onchange = evt => {
//   const [file] = imgInp.files
//   if (file) {
//     blah.src = URL.createObjectURL(file)
//   }
// }
// <form runat="server">
//   <input accept="image/*" type='file' id="imgInp" />
//   <img id="blah" src="#" alt="your image" />
// </form>


// File Size