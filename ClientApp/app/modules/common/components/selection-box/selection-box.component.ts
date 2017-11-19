import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import { KeyValueModel } from './../../models/key-value.model';
import { Component, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { isTruthy } from "../../common.functions";

@Component({
    selector: 'selection-box',
    templateUrl: './selection-box.component.html'
})
export class SelectionBoxComponent {


    @Input()
    public set selected(value: string) { this.selected$.next(value) }
    public get selected() { return this.selected$.value }
    private readonly selected$ = new BehaviorSubject<string>(null)


    @Input()
    public set options(value: Array<KeyValueModel>) { this.options$.next(value) }
    public get options() { return this.options$.value }
    private readonly options$ = new BehaviorSubject<Array<KeyValueModel>>(new Array<KeyValueModel>())

    @Output()
    public selectedOption$: Observable<KeyValueModel>;

    @Input()
    class: string = 'btn-primary';

    @Output()
    onChange: EventEmitter<string> = new EventEmitter<string>();

    constructor() {
        this.selectedOption$ = Observable.combineLatest(
            this.selected$, this.options$,
            (selected, options) => {
                let found = options.find(o => o.key === selected);
                return found ? found : new KeyValueModel();
            }
        )
    }

    select(option: KeyValueModel) {
        this.selected$.next(option.value);
        this.onChange.emit(option.value);
    }
}
