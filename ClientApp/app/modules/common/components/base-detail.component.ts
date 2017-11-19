import { IViewModel } from './../models/viewmodel';
import { HttpModel } from './../models/http.model';
import { ClassConstructor } from './../models/class.constructor';
import { IModel } from './../models/model';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { isTruthy } from "../common.functions";

export abstract class BaseDetailComponent<T extends IViewModel> implements OnInit {
    private cls: ClassConstructor<T>;

    private readonly id$ = new BehaviorSubject<any>(null)
    @Input()
    public set id(value: string) { this.id$.next(value) }
    public get id() { return this.id$.value }

    lastid: string;
    subscription: Subscription;
    viewModel: T;

    constructor(cls: ClassConstructor<T>) {
        this.cls = cls;
    }

    ngOnInit(): void {
        this.viewModel = new this.cls();

        this.id$
            .distinctUntilChanged()
            .filter(isTruthy)
            .subscribe(value => {
                this.lastid = this.id;
                this.refreshData(this.id);
            })
    }

    ngOnDestroy(): void {
        this.id$.complete();
        if (this.subscription)
            this.subscription.unsubscribe();
    }

    refreshData(id: string) {
        if (this.subscription)
            this.subscription.unsubscribe();

        let observation = this.loadingObservation;
        if (observation) {
            this.subscription = observation.delay(500).subscribe(
                viewModel => {
                    this.viewModel = viewModel;
                    this.onDataReady();
                }
            )
        }
    }

    abstract get loadingObservation(): Observable<T>;

    abstract onDataReady(): void;
}