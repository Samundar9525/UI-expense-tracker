import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-popup',
  templateUrl: './form-popup.component.html',
  styleUrls: ['./form-popup.component.scss']
})
export class FormPopupComponent {
  public formData!: FormGroup ;

  constructor(public dialog: MatDialogRef<FormPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, private _fb: FormBuilder){
      this.formData = this._fb.group(this.data?.fieldName)
  }

  dialogSubmit(){
    this.dialog.close(this.formData.value)
  }

  keepOrder = (a:any, b:any) => {
    return a;
}
optionSelected(ev:any,option:any){
  this.formData.get(ev)?.setValue(option)
}

}
