import { AlerteService } from './../alerte.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({ selector: 'alerte', templateUrl: 'alertes.component.html' })
export class AlertesComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    message: any;

    constructor(private alerteService: AlerteService) { }

    ngOnInit() {
        this.subscription = this.alerteService.getAlert()
            .subscribe(message => {
                switch (message && message.type) {
                    case 'success':
                        message.cssClass = 'alert alert-success';
                        break;
                    case 'error':
                        message.cssClass = 'alert alert-danger';
                        break;
                }

                this.message = message;
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}