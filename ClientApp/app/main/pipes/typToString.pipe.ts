import { Pipe, PipeTransform } from '@angular/core';
import { Typ } from '../models/enums';

@Pipe({ name: 'typToString' })
export class TypToStringPipe implements PipeTransform {
    transform(value: Typ): string {
        switch (value) {
            case Typ.Nabidka:
                return 'Nabídka';
            case Typ.Objednavka:
                return 'Objednvka';
            case Typ.Poptavka:
                return 'Poptávka';
        }
    }; 
}