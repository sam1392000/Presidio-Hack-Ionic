import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  selectTab: any;
  constructor() { }

  ngOnInit() {
  }

  setCurrentTab(event) {
    console.log(event);
   // this.selectTab = this.tabs.getSelected();
  }

}
