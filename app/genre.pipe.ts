import {Pipe, PipeTransform} from 'angular2/core';
import {CD} from './cd.model';

@Pipe({
  name: "genreSelect",
  pure: false
})
export class GenrePipe implements PipeTransform {
  transform(input: CD[], args) {
    var desiredGenre = args[0];
    if (desiredGenre === "all") {
      return input;
    } else {
      return input.filter(function(cd) {
        return cd.genre === desiredGenre;
      });
    }
  }
}
