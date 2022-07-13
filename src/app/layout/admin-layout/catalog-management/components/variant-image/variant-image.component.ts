import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ImgUploadAwsComponent } from './../../../../../components/img-upload-aws/img-upload-aws.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-variant-image',
  templateUrl: './variant-image.component.html',
  styleUrls: ['./variant-image.component.css']
})
export class VariantImageComponent implements OnInit {
  @Input() productImagesArr: Array<[]>;
  @Input() disableImageSection: boolean;

  @Output() onproductImagesArrChange = new EventEmitter();
  @ViewChild('awsImgComponent') awsImgComponent: ImgUploadAwsComponent;
  imgConfig = 'h=100&w=100';
  currentproductImgIndex = null;
  count = 0;
  urlInput = '';
  loading = false;
  imgLink: FormControl = new FormControl();
  constructor() { }

  ngOnInit() {
    console.log("this.productImagesArr", this.productImagesArr)
    this.imgLink.reset()
  }
  onProductImageUploaded(event, productImgObject, productImgIndex) {
    this.loading = false;
    this.urlInput = '';
    this.imgLink.reset();
    console.log('GETTING VARIANT', productImgObject);
    const index = this.currentproductImgIndex ? this.currentproductImgIndex : productImgIndex;
    this.productImagesArr[index]['imageUrls'].push(event.Location);
    // this.productImagesArr[index]['imageUrls'].flat();
    this.emitProductImagesArr();
    console.log('Final Call', this.productImagesArr);
  }
  removeUploadedImage(index, productImgObject) {
    console.log('REMOVE////', index, productImgObject, this.productImagesArr)
    this.productImagesArr[productImgObject]['imageUrls'].splice(index, 1);
    // this.productImagesArr[index]['imageUrls'].flat();

    this.emitProductImagesArr();
  }
  imgPositionChange(event: CdkDragDrop<string[]>, productImgObject) {
    // if (this.disableImageSection) {
    console.log(this.disableImageSection);
    moveItemInArray(productImgObject.imageUrls, event.previousIndex, event.currentIndex);
    this.emitProductImagesArr();
    // }
  }
  async onLinkPaste(productImgIndex) {
    let linkValue = this.imgLink.value
    // console.log('LInk Paster', linkValue);
    if (linkValue.startsWith('https')) {
      console.log('first loop');

      if (linkValue.includes("drive.google.com")) {
        console.log('entered');
        if (linkValue.includes("open")) {
          let at = linkValue;
          at = at.substring(at.lastIndexOf("open?id=") + 8);
          linkValue = "https://drive.google.com/uc?export=download&id=" + at;
        }
        else {
          let at = linkValue;
          at = at.substring(at.lastIndexOf("file/d/") + 7, at.lastIndexOf("/view"));
          linkValue = "https://drive.google.com/uc?export=download&id=" + at;
        }

      }
      // else {

      this.currentproductImgIndex = productImgIndex;
      let self = this;
      let response = await fetch(linkValue);
      let data = await response.blob();
      let file = new File([data], 'product.jpg');
      const event = { target: { files: [file] } };
      console.log(file);
      self.awsImgComponent.onSelectFile(event);
      // }
      // let reader = new FileReader();
      // reader.readAsDataURL(data);
      // reader.onload = function (e) {
      //   console.log(self.awsImgComponent.nativeElement, e.target);

      // }

      // productImgObject.imageUrls.push(linkValue);
      // this.emitProductImagesArr();
    }

  }
  imgAddIconClick(productImgIndex) {
    this.currentproductImgIndex = productImgIndex;
    const element: HTMLElement = document.querySelector('#imgUploadDiv') as HTMLElement;
    element.click();
  }
  getFormattedImage(url) {

    // console.log('get formatted', url);
    if (url.includes('?')) {
      return (`${url}`);
    } else {
      return `${url}?${this.imgConfig}`;
    }
  }
  emitProductImagesArr() {
    this.onproductImagesArrChange.emit(this.productImagesArr);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.imgLink.reset();
  }
}
