

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
