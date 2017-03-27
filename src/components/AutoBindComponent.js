import { Component } from 'react';
import { bindAll } from 'lodash';

export default class AutoBindComponent extends Component {
    constructor() {
        super();
        bindAll(this, Object.getOwnPropertyNames(this.__proto__));
    }
};
