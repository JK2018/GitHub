import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AnimalsPage } from './../animals/animals';
import { MemoryPage } from './../memory/memory';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goMemory(){
    this.navCtrl.push(MemoryPage);
  }
  goAnimals(){
    this.navCtrl.push(AnimalsPage);
  }

}
