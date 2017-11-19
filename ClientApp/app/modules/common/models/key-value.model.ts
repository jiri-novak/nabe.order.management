export class KeyValueModel {
    key: string;
    value: string;

    constructor(key: string = null, value: string = null) {
        this.clear();
        this.key = key;
        this.value = value;
    }

    clear() {
        this.key = null;
        this.value = null;
    }
}