import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { UploadImageToAws } from 'src/app/actions/img-upload-aws.action';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-img-upload-aws',
  templateUrl: './img-upload-aws.component.html',
  styleUrls: ['./img-upload-aws.component.css']
})
export class ImgUploadAwsComponent implements OnInit {
  @Input() className: string;
  @Input() id: string = '';
  @Input() awsFolderName: string;
  @Input() accept: string;
  @Input() supportedExtension: any = null;
  @Output() imgUploaded = new EventEmitter();
  @Input() disable: boolean;
  @Input() multiple: boolean;
  @Input() acceptFileSize: boolean;
  @Input() fileSizeLimit: string;
  @Input() type: string = 'image';

  loading = false;
  imgData = null;
  onFileSubmit = false;
  acceptedFileType = ['.jpeg', '.jpg', '.png', '.webp', '.xls', '.xlsx', '.pdf', '.gif', '.csv'];
  constructor(public store: Store<any>, private matSnackBar: MatSnackBar) {

    if (!this.accept) {
      console.log("Else..................")
      this.accept = "text/plain, application/pdf, image/*";
    }
  }


  ngOnInit() {
    if (this.supportedExtension) {
      this.acceptedFileType = this.supportedExtension.split(',');
      // this.accept = this.supportedExtension.split(',');
    }
    console.log("Suuported:::::::::", this.acceptedFileType, this.accept, this.supportedExtension);


    this.store.pipe(select('components')).subscribe(res => {
      this.imgData = res.awsImgUpload;

      if (this.onFileSubmit) {
        if (this.imgData.Location) {
          this.matSnackBar.open(`File successfully uploaded`, '', { duration: 2500 })

          let url = this.imgData.Location;

          if (this.type != 'excel') {
            url = "https://ndh.imgix.net/" + url.split('/').slice(3).join('/');
            this.imgData.Location = url;
          }
          this.imgUploaded.emit(this.imgData);

          this.onFileSubmit = false;
          this.loading = false;
        } else {
          this.onFileSubmit = false;
          this.loading = false;
          this.matSnackBar.open(`Error in uploading file`, '', { duration: 2500 })

        }

      }

      // if (this.onFileSubmit && this.imgData.length > 0) {
      //   console.log(this.imgData);
      //   if (this.multiple) {
      //     console.log('MULTIPL DPF');
      //     this.imgUploaded.emit(this.imgData);
      //   } else {
      //     this.imgData.forEach(element => {
      //       this.imgUploaded.emit(element);
      //     });
      //   }


    });
  }
  public onSelectFile(event) {

    let file = event.target.files[0];

    const date = new Date();
    let extension = file.name.substring(file.name.lastIndexOf('.'));
    extension = extension.toLowerCase();
    let isError = false;
    if (this.acceptFileSize) {
      console.log('size', file.size, this.fileSizeLimit, file.size > parseInt(this.fileSizeLimit))
      if (file.size > parseInt(this.fileSizeLimit)) {
        isError = true;
        this.matSnackBar.open(`File size cannot be greater then 2MB`, '', { duration: 2500 })

      }
    }
    // if (file.size > 51200){
    //   this.matSnackBar.open(`File size is too long, max file size should be 500KB`, '', { duration: 2500 })
    //   file=null;
    // } else
    if (!isError) {
      if (this.acceptedFileType.indexOf(extension) == -1) {
        this.matSnackBar.open(`File type is not supported, type should be ${this.supportedExtension ? this.supportedExtension.replace(/\./g, '') : 'jpeg, jpg, png, webp, xls, xlsx, pdf'}`, '', { duration: 2500 })
        file = null;
      } else {
        this.loading = true;

        // let previousName = file.name.replace(/ /g, "_");
        // previousName = previousName.replace(extension, '');
        let name = `${date.getTime()}${extension}`;
        file = new File([file], name, { type: file.type });
        this.store.dispatch(new UploadImageToAws({ file, folderName: this.awsFolderName }));
        this.onFileSubmit = true;
        file = null;
      }
    }

  }

  // public onSelectFile(event) {
  //   const file = event.target.files;

  //   Array.prototype.forEach.call(file, element => {
  //     console.log(element);
  //     this.store.dispatch(new UploadImageToAws({ file: element, folderName: this.awsFolderName }));
  //     this.onFileSubmit = true;
  //   });


  // }
}
