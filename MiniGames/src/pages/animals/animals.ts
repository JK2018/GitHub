
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';


/**
 * Generated class for the AnimalsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-animals',
  templateUrl: 'animals.html',
})
export class AnimalsPage {

  public animals = [
    {
      'title': 'Vache',
      'image': 'imgs/cow-icon.png',
      'desc': 'Meugle',
      'file': '/sounds/cow.mp3',
      'playing': false
    },
    {
      'title': 'Dauphin',
      'image': 'imgs/dolphin-icon.png',
      'desc': 'Siffle',
      'file': '/sounds/dolphin.mp3',
      'playing': false
    },
    {
      'title': 'Grenouille',
      'image': 'imgs/frog-icon.png',
      'desc': 'Coasse',
      'file': '/sounds/frog.mp3',
      'playing': false
    },
    {
      'title': 'Oiseau',
      'image': 'imgs/bird-icon.png',
      'desc': 'Chante',
      'file': '/sounds/bird.mp3',
      'playing': false
    },
    {
      'title': 'Cochon',
      'image': 'imgs/pig-icon.png',
      'desc': 'Grogne',
      'file': '/sounds/pig.mp3',
      'playing': false
    },
    {
      'title': 'Chien',
      'image': 'imgs/puppy-icon.png',
      'desc': 'Aboie',
      'file': '/sounds/dog.mp3',
      'playing': false
    },
    {
      'title': 'Cheval',
      'image': 'imgs/horse-icon.png',
      'desc': 'Hennit',
      'file': '/sounds/horse.wav',
      'playing': false
    },
    {
      'title': 'Ane',
      'image': 'imgs/donkey-icon.png',
      'desc': 'Brait',
      'file': '/sounds/donkey.wav',
      'playing': false
    }
  ];



  private media;
  private currentAnimalIndex;
  private rand: number;
  private tries = 0;
  private reorderOnOff = false;
  public reorderVar;


  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnimalsPage');
  }


  aRand() {
    this.rand = Math.floor(Math.random() * Math.floor(this.animals.length - 1));

    //pause sound
    if (this.media && (this.media.currentTime) != this.media.duration) {
      this.media.pause();
      this.media = null;

    } // stops sound before playing another one
    this.media = new Audio();
    this.media.src = "../../assets" + this.animals[this.rand].file;
    this.media.load();
    this.media.play();

    this.currentAnimalIndex = this.rand;
  }


  guess(position){
    if(this.currentAnimalIndex==position){

      this.tries=this.tries+1;

      let toast = this.toastCtrl.create({
        message:"gagné! essais:"+this.tries,
        duration:1500,
        position: "bottom"}).present()
        this.tries=0;
        

    } else {
      this.tries+=1;
      let toast = this.toastCtrl.create({
        message:"try again... essais:"+this.tries,
        duration:1500,
        position: "bottom"}).present()
        
    }
  }
 
   
reorderItems(event){ 
  let item = this.animals[event.from]; // from:starting pos /  to: final pos
  this.animals.splice(event.from,1);   
  this.animals.splice(event.to,0,item); 
}

reorderToggle(){ 
 this.reorderOnOff = ! this.reorderOnOff;
this.reorderVar = !this.reorderOnOff? "true" : ! "false";
}

deleteItem(pos){  
  this.animals.splice(pos,1);
}

}
