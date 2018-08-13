import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MemoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-memory',
  templateUrl: 'memory.html',
})
export class MemoryPage {

  public cardList: Array<{ img: string, name: string, revealed: boolean }> = [];
  public numberOfCards: number = 6; //amount of different cards in the game
  private questionMarkUrl = "/assets/imgs/question-mark.png"; //unflipped card
  private cardHidingTimeout = 1000;
  private previousCard;
  private isShowingCard = false;
  private previousPisition;
  public foundCards = 0;
  public numberOfMoves = 0;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.generateCards();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MemoryPage');
  }



  //deck generator
  private generateCards() {

    this.cardList = new Array<{ img: string, name: string, revealed: boolean }>();

    for (let i = 0; i < this.numberOfCards; i++) {
      let imgUrl = "/assets/imgs/cards/" + i + ".png";
      this.cardList.push({ img: this.questionMarkUrl, name: imgUrl, revealed: false });
      this.cardList.push({ img: this.questionMarkUrl, name: imgUrl, revealed: false });
    }
    this.shuffleCards();
  }



  // card shuffling
  shuffleCards(): any {
    this.cardList.forEach(
      (item, index, deck) => {
        let newPosition = Math.ceil(Math.random() * (this.cardList.length - 1));
        deck[index] = deck[newPosition];
        deck[newPosition] = item;
      }
    );
  }



  flipCard(card, pos) {
    if (!card.revealed && !this.isShowingCard) {
      //card flip
      card.img = card.name;
      card.revealed = true;
      this.isShowingCard = true;
      this.numberOfMoves++;

      this.checkCard(card, pos);

    }
  }



  private checkCard(card: any, pos) {

    if (this.previousCard && this.previousCard.name == card.name && pos != this.previousPisition) {
      this.previousCard.img = card.name;
      this.previousCard.revealed = true;
      this.isShowingCard = false;
      this.foundCards++;
    } else {
      setTimeout(() => {
        card.img = this.questionMarkUrl;
        card.revealed = false;
        this.previousCard = card;
        this.previousPisition = pos;
        this.isShowingCard = false;
      }, this.cardHidingTimeout);
    }
  }




  replay() {
    this.numberOfMoves = 0;
    this.foundCards = 0;
    this.previousCard = null;
    this.previousPisition = null;
    this.generateCards();
  }


}










