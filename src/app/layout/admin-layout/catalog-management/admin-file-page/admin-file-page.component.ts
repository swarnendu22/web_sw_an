import { Component, OnInit, Injectable } from '@angular/core';
import { AdminFileDownloadComponent } from '../admin-file-download/admin-file-download.component';
import { AdminFileUploadComponent } from '../admin-file-upload/admin-file-upload.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';

@Component({
  selector: 'app-admin-file-page',
  templateUrl: './admin-file-page.component.html',
  styleUrls: ['./admin-file-page.component.css']
})
@Injectable()
export class AdminFilePageComponent implements OnInit {
  public productName = '';
  DialogRef: MatDialogRef<AdminFileUploadComponent>;

  constructor(private router: Router,
    public dialog: MatDialog, private apiMessageService: ApiMessageService) { }

  ngOnInit() {
  }

  downloadModalOpen() {
    this.dialog.open(AdminFileDownloadComponent, {
      width: '800px',
      maxHeight: '600px',
      height: '480px',
      disableClose: true,
      panelClass: 'custom-AdminFileDownload'
    });
  }

  uploadContentSheet() {
    this.dialog.open(AdminFileUploadComponent, {
      width: '800px',
      maxHeight: '600px',
      height: '480px',
      disableClose: true,
      panelClass: 'custom-AdminFileDownload'
    });
  }

}
