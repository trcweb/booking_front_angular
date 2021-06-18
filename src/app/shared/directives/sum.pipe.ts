import { Chambre } from '../../models/Chambre';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sum',
  pure: false
})
export class SumPipe implements PipeTransform {

  transform(chs: Chambre[]): unknown {
    return chs.map(ch => ch.adult + ch.enfant).reduce((sum, ch) => sum  + ch, 0);
  }

}
