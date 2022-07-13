import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { VersionUpdateService } from '../app/utils/swUpdate/version-update.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor( private swUpdate: VersionUpdateService ) {
    this.swUpdate.checkForUpdates();
  }

  ngOnInit() {
  }
}
