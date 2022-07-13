
import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import { environment } from 'src/environments/environment';
import { AwsRequestModel } from './aws-service.model';
import { StoreImgUploadToAws } from './../../actions/img-upload-aws.action';
import { Store } from '@ngrx/store';
import { replaceUrlImgix } from '../imgLib';
import { ApiMessageService } from '../api/api-message.service';

/// <reference types="aws-sdk" />
@Injectable({
  providedIn: 'root'
})

export class AwsService {

  extensionArr = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
  ]
  bucket = null;
  constructor(private store: Store<any>, private apiMessageService: ApiMessageService) {
    const { accessKeyId, secretAccessKey, region } = environment.s3bucket_config;
    this.bucket = new S3({ accessKeyId, secretAccessKey, region });
  }
  async uploadFile(payload: AwsRequestModel) {
    // const params = {
    //   Bucket: environment.s3bucket_config.bucketName,
    //   Key: `${payload.folderName}/${payload.file.name}`,
    //   Body: payload.file,
    //   ACL: 'public-read',
    //   ContentType: payload.file.type,
    // };
    // let uploadRes;
    // let uploaded = false;
    // this.bucket.upload(params, (err, d) => {
    //   if (err) {
    //     console.error('Error----', err);
    //     const payload = { Location: null };
    //     this.store.dispatch(new StoreImgUploadToAws(d));
    //   } else {

    //     console.log(d)
    //     if (this.extensionArr.findIndex(e => e == payload.file.type) > -1) {
    //       d.Location = this.replaceUrlImgix(d.Location)
    //     }
    //     this.store.dispatch(new StoreImgUploadToAws(d));
    //     return true
    //   }
    // })


    // var r = new FileReader();

    // let url = null
    // r.onload = async () => {
    //   url = await r.result

    //   const params = {
    //     key: `${payload.folderName}/${payload.file.name}`,
    //     fileObj: url
    //   };
    //   this.apiMessageService.uploadFile(params)

    // };
    // r.readAsBinaryString(payload.file);

    console.log(payload)
    let extension = payload.file.name.substring(payload.file.name.lastIndexOf('.'));
    let pathName = `${new Date().getTime()}${extension}`;
    console.log(payload.isName);
    if(payload.isName) {
      pathName = payload.file.name;
    }
    const params = {
      key: `${payload.folderName}/${pathName}`,
      fileObj: payload.file
    };

    const response = await this.apiMessageService.uploadFile(params)
    console.log(response)
    if (!response) {
      console.error('Error----');
      const respayload = { Location: null };
      this.store.dispatch(new StoreImgUploadToAws(respayload));
    } else {
      const respayload = { Location: response.url };
      console.log(respayload)
      if (this.extensionArr.findIndex(e => e == payload.file.type) > -1) {
        console.log('type image')
        respayload.Location = this.replaceUrlImgix(respayload.Location)
      }
      this.store.dispatch(new StoreImgUploadToAws(respayload));
      return true
    }

  }

  replaceUrlImgix(storeLogoUrl) {
    if (storeLogoUrl && storeLogoUrl.indexOf('https') == 0) {
      let img = "";
      let x = storeLogoUrl.split('/');
      if (x.length >= 3) {
        if (x[2].includes('ndhbucket'))
          x[2] = 'ndh.imgix.net';
        img = x.join('/');
        return img;
      }
    }
  }
}
