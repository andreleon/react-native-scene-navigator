export default class Dispatcher {
    constructor(props) {
    }

    _listeners = [];
    _destroyed = false;

    subscribe(callback) {
        if (this._destroyed) return;
        this._listeners.push(callback);
    }

    unsubscribe(callback) {
        const index = this._listeners.indexOf(callback);
        this._listeners.splice(index, 1);
    }

    dispatch(event) {
        if (this._destroyed) return;
        this._listeners.forEach((cb) => cb(event));
    }

    destroy() {
        this._listeners = [];
        this._destroyed = true;
    }
}
