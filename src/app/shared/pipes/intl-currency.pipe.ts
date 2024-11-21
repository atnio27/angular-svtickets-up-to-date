import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'intlCurrency',
  standalone: true,
})
export class IntlCurrencyPipe implements PipeTransform {
  transform(): unknown {
    return null;
  }
}
