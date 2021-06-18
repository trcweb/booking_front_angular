import { Commission } from './../../models/Commission';
import { Dictionarie } from './../../models/Dictionarie';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'euro'
})
export class EuroPipe implements PipeTransform {

  transform(value: number, curr: string | null, d: Dictionarie, c?: Commission): string {
    if (curr === 'EUR') {
      if (c === undefined) {
        return Math.round(value).toFixed(0);
      }
      return Math.round(value + (value * c.pourcentage! / 100)).toFixed(0);
    }
    if (c !== undefined) {
      return Math.round((value + (value  * c.pourcentage! / 100)) * d.rate!).toFixed(0);
    }
    return Math.round(value * d.rate!).toFixed(0);
  }

}
