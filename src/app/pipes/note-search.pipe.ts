import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../models/note';

@Pipe({
  name: 'noteSearch'
})
export class NoteSearchPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {

    if(args[0] == ''){
      return value;
    }

    let searchResult: Note[] = [];

    for(let i=0; i<value.length; i++){
      if(value[i].title.toLowerCase().includes(args[0]) || value[i].body.toLowerCase().includes(args[0])){
        searchResult.push(JSON.parse(JSON.stringify(value[i])));
      }
    }

    return searchResult;
  }

}
