import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-leavedata',
  templateUrl: './leavedata.component.html',
  styleUrls: ['./leavedata.component.scss']
})
export class LeavedataComponent implements OnInit {


  id = 0;
  actionInfo = 1;
  form: FormGroup;
  routeParams: any;
  pageTitle: string;
  data: any;
  fileevent: any;
  attachment: any[];


  constructor(
    private formBuilder: FormBuilder,
    route: ActivatedRoute,
    public dialog: MatDialog,
  ) {
    this.routeParams = route.snapshot.params;
  }

  ngOnInit(): void {
    this.initializeValidators();
  }

  initializeValidators() {
    this.form = this.formBuilder.group({
      files: this.formBuilder.array([], Validators.required),
    });
  }
  updateFileName(event: any): void {
    this.fileevent = event;
    const fileName = event.target.files[0]?.name;
    const label = document.querySelector('.custom-file-label');
    if (fileName && label) {
      label.textContent = fileName;
    }
  }
  onClear() {
    const fileInput = document.getElementById('customFile') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
    const label = document.querySelector('.custom-file-label');
    if (label) {
      label.textContent = 'Choose file';
    }
    this.form.reset();
  }
  onSubmit() {
    debugger;
    if (this.form.valid) {
      var file = this.fileevent.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        var base64Data: string = reader.result as string;
        console.log(base64Data);
        this.attachment = [];
        // var fileName: file.name;
        // var fileType: file.type;
  
        this.attachment.push({
          // fileName: fileName,
          base64Content: base64Data,
          // fileType:fileType,
          statusType: 1
        });
  
        // Now 'this.attachment' contains an object with file information including the base64 content
        console.log(this.attachment);
      };
    }
    else {
      debugger
      this.validateFormControl()
    }
  }



  validateFormControl() {
    debugger
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({
          onlySelf: true
        });
      }
    })
  }
}
