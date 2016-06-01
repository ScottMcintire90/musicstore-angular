import {Pipe, PipeTransform} from 'angular2/core';
import {CD} from './cd.model';

@Pipe({
  name: "artistSelect",
  pure: false
})
export class ArtistPipe implements PipeTransform {
  transform(input: CD[], args) {
    var desiredArtist = args[0];
    if (desiredArtist === "all") {
      return input;
    } else {
      return input.filter(function(cd) {
        return cd.artist === desiredArtist;
      });
    }
  }
}
