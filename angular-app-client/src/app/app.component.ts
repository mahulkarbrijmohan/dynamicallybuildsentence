import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PaginatorData } from './core/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
 
  title = 'sentence-build';
  paginatorData: PaginatorData | any;
  sentenceList:any[]=[];
  displaySentenceList:any[]=[];
  pageEvent: any;
  successFlag:boolean=false;

  sentenceBuildForm= new FormGroup({
    wordTypes: new FormControl(),
    wordValues: new FormControl()
  })

  wordTypesList=["Noun","Verb","Adjective","Adverb","Pronoun","Preposition","Conjunction","Determiner","Exclamation"]
  wordValuesList=[
    "Courier is received",
    "Shipment is done",
    "transaction processed successfully",
    "transaction is failed"
  ]

  ngOnInit(): void {
    
  }

  ngOnChanges() {
    // this.displaySentenceList = [...this.sentenceList];
    // this.paginatorData = new PaginatorData();
    // this.paginatorData.totalNumberOfRecords = this.sentenceList.length;
    // this.getPaginatorData(0);
    
  }



  // getPaginatorData(pageIndex: any) {
  //   var pageNumber = pageIndex;
  //   this.displaySentenceList = this.sentenceList.slice(
  //     pageNumber * this.paginatorData.recordsPerPage,
  //     (pageNumber + 1) * this.paginatorData.recordsPerPage
  //   );
  // }

  gotoHome(){
    this.successFlag=false;
  }

  submit(){
    this.successFlag=true;
  }

  clear(){
    this.sentenceBuildForm= new FormGroup({
      wordTypes: new FormControl(),
      wordValues: new FormControl()
    })
  }

  addSentence(){
    this.displaySentenceList.push(this.sentenceBuildForm.controls['wordValues'].value);
   // this.sentenceList=[...this.displaySentenceList];
  }

}
