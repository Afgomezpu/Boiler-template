import { Component, OnInit,Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";


@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],

})
export class StepperComponent implements OnInit {
  closeResult = '';
  isLinear = true;
  oFormEmail: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder,private modalService: NgbModal,
    public dialogRef: MatDialogRef<StepperComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any
   ) { }

  ngOnInit(): void {
    this.oFormEmail = this._formBuilder.group({
      correo: ['', [Validators.required,Validators.email]]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', [Validators.required]]
    }); 
    console.log(this.data)
  }
  onNoClick(): void {
    
     this.dialogRef.close();
  }

}
