/**
 * @File Name          : EventNotifier.js
 * @Description        : Shows Notification when an event is published on the specified channel
 * @Group              : Playground
 * @Author             : Debarun Sengupta
 * @Last Modified By   : Debarun Sengupta
 * @Last Modified On   : 5/15/2020, 10:00:00 AM
 * @Modification Log   :
 * Ver       Date            Author      		    Modification
 * 1.0      5/15/2020        Initial Version
 **/

import { LightningElement } from 'lwc';

export default class EventNotifier extends LightningElement {
    constructor() {
        super();
        let scope = this;
        let source = new EventSource('/connect');
        source.onmessage = function (e) {
            console.log('Payload-->' + e.data);

            scope.template.querySelector('.retrievedPayload').textContent =
                e.data;
        };
    }
}
