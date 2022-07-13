import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Observable, interval, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VersionUpdateService {

  constructor( private updates: SwUpdate ) { 

    if (updates.isEnabled) {
      // interval( 60*60*1000 ).subscribe(() => updates.checkForUpdate()
      interval( 1000*60 ).subscribe(() => updates.checkForUpdate()
        .then(() => console.log('checking for updates')));
    }

  }

  public checkForUpdates(): void {
    this.updates.available.subscribe(event => this.promptUser());
  }

  private promptUser(): void {
    console.log('updating to new version');
    if (confirm("New version available. Load New Version?")) {
      this.updates.activateUpdate().then(() => document.location.reload()); 
    }
    else{
      console.log("No Updates Available");    
    }    
  }

  moveToDeliverSetting = new Subject <any>()

}
