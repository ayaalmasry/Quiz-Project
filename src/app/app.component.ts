import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Subscription, forkJoin, interval } from 'rxjs';


// import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title="Question Application"
showWarning: boolean=false;
  nextStepQuiz: boolean = false;
  questionList:any[]=[];
  qurentQuestionNo:number=0;
  remainingTimer:number = 10;
  subscribtion:Subscription[]=[]
constructor(private http:HttpClient){
  
} 
showPopup(){
  debugger
  this.showWarning = true

}
nextStep(){
  this.nextStepQuiz = true;
  
  // this.showWarning = false
}
timer = interval(1000);
nextStepQuizI(){
  this.showWarning = false;
  this.nextStepQuiz = true;
  this.subscribtion.push(
    this.timer.subscribe(res=>{
    
      if(this.remainingTimer != 0){
  
        this.remainingTimer --;
      }
      if(this.remainingTimer === 0){
        if (this.qurentQuestionNo < this.questionList.length) {
          this.nextQuetion();
        }
        this.remainingTimer = 10;
      }
      if (this.qurentQuestionNo === this.questionList.length) {
        this.subscribtion.forEach(element => {
          element.unsubscribe();
        });
      }
     
    })
  )
   

}
// selectOption
selectOption(option:any){
    option.isSelected = true
}
isOptionSelected(option:any){
  debugger
  const isSelectedQu = option.filter((res:any)=>
    res.isSelected == true
  ).length;
  if(isSelectedQu == 0){
    return false
  }else{
    return true
  }
}
ngOnInit(){
  this.loadQuesion()
}
// loadQuestions
loadQuesion(){
  const questionUrls=[
    "assets/question.json"
  ]
  const requests=questionUrls.map(url=>this.http.get(url));
  forkJoin(requests).subscribe((responses: any) => {
    this.questionList = responses[0];
    console.log(this.questionList);
  });
  // this.http.get("assets/question.json").subscribe((response:any)=>{
  //   this.questionList = response;
  //   console.log(this.questionList)

  // })
}
// nextQuetion
nextQuetion(){
  if(this.qurentQuestionNo < this.questionList.length){

    this.qurentQuestionNo ++;
    
  }
  // else{
  //  this.subscribtion.forEach(element=>{
  //   element.unsubscribe()
  //  })
  // }
}
  
}