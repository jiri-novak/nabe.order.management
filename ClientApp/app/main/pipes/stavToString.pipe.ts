import { Pipe, PipeTransform } from '@angular/core';
import { Stav } from '../models/enums';

@Pipe({ name: 'stavToString' })
export class StavToStringPipe implements PipeTransform {
    transform(value: Stav): string {
        switch (value) {
            case Stav.Prijato:
                return 'Přijato';
            case Stav.ZpracovavaSe:
                return 'Zpracovává se';
            case Stav.Zruseno:
                return 'Zrušeno';
        }
    };
}