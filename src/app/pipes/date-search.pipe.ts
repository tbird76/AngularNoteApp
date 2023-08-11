import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateSearch'
})
export class DateSearchPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    
    if(!args[0] && !args[1] && !args[2]){
      return value;
    }

    let searchResult: Date[] = [];

    if(args[0] && !args[1] && !args[2]){
      //only year
      console.log("year");
      for(let i=0; i<value.length; i++){
        let valueDate = new Date(value[i].dateCreated);
        if(valueDate.getFullYear() == args[0]){
          searchResult.push(JSON.parse(JSON.stringify(value[i])));
        }
      }
    }else if(!args[0] && args[1] && !args[2]){
      //only month
      console.log("month");
      for(let i=0; i<value.length; i++){
        let valueDate = new Date(value[i].dateCreated);
        if((valueDate.getMonth()+1) == args[1]){
          searchResult.push(JSON.parse(JSON.stringify(value[i])));
        }
      }
    }else if(!args[0] && !args[1] && args[2]){
      //only day
      console.log("day");
      for(let i=0; i<value.length; i++){
        let valueDate = new Date(value[i].dateCreated);
        if(valueDate.getDate() == args[2]){
          searchResult.push(JSON.parse(JSON.stringify(value[i])));
        }
      }
    }else if(args[0] && args[1] && !args[2]){
      //year and month
      console.log("year and month");
      for(let i=0; i<value.length; i++){
        let valueDate = new Date(value[i].dateCreated);
        if(valueDate.getFullYear() == args[0] && (valueDate.getMonth()+1) == args[1]){
          searchResult.push(JSON.parse(JSON.stringify(value[i])));
        }
      }
    }else if(args[0] && !args[1] && args[2]){
      //year and day
      console.log("year and day");
      for(let i=0; i<value.length; i++){
        let valueDate = new Date(value[i].dateCreated);
        if(valueDate.getFullYear() == args[0] && valueDate.getDate() == args[2]){
          searchResult.push(JSON.parse(JSON.stringify(value[i])));
        }
      }
    }else if(!args[0] && args[1] && args[2]){
      //month and day
      console.log("month and day");
      for(let i=0; i<value.length; i++){
        let valueDate = new Date(value[i].dateCreated);
        if((valueDate.getMonth()+1) == args[1] && valueDate.getDate() == args[2]){
          searchResult.push(JSON.parse(JSON.stringify(value[i])));
        }
      }
    }else if(args[0] && args[1] && args[2]){
      //year, month, and day
      console.log("year, month, and day");
      for(let i=0; i<value.length; i++){
        let valueDate = new Date(value[i].dateCreated);
        if(valueDate.getFullYear() == args[0] && (valueDate.getMonth()+1) == args[1] && valueDate.getDate() == args[2]){
          searchResult.push(JSON.parse(JSON.stringify(value[i])));
        }
      }
    }


    return searchResult;
  }

}
