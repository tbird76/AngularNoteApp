import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noteSearch'
})
export class NoteSearchPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
