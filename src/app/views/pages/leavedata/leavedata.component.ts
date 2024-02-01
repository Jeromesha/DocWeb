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
  errorMessage: string;
  errorMessagetype: boolean = false;


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
      files: [[], Validators.required],
    });
  }
  updateFileName(event: any): void {
    this.fileevent = event;
    const files: FileList = event.target.files;
    const label = document.querySelector('.custom-file-label');

    if (files && files.length > 0 && label) {
      const fileNames = Array.from(files).map(file => file.name).join(', ');
      label.textContent = fileNames;
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
      //   const files :File[]=this.fileevent.target.files[0]
      //   //const files: File[] = this.form.get('files').value;
      //   for (let i = 0; i < files.length; i++) {
      //   // var file = this.fileevent.target.files[0];
      //   const file = files[i];
      //   var reader = new FileReader();
      //   reader.readAsDataURL(file);
      //   reader.onload = () => {
      //     var base64Data: string = reader.result as string;
      //     console.log(base64Data);
      //     this.attachment = [];
      //     // var fileName: file.name;
      //     // var fileType: file.type;

      //     this.attachment.push({
      //       // fileName: fileName,
      //       base64Content: base64Data,
      //       // fileType:fileType,
      //       statusType: 1
      //     });
      //     console.log(this.attachment);

      //   };
      // }
      const files: FileList = this.fileevent.target.files;
      this.attachment = []; 
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        var fileName =file.name;
        var fileType=file.type;

        reader.onload = () => {
          const base64Data: string = reader.result as string;
          console.log(base64Data);

          this.attachment.push({
            base64Content: base64Data,
            statusType: 1,
            fileName:fileName,
            fileType:fileType
          });

          console.log(this.attachment);
        };

        reader.readAsDataURL(file);
      }
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
