import {Injectable} from '@angular/core';

@Injectable()
export class LocalStorageService {
  storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  set(key: string, value: string): void {
    this.storage[key] = value;
  }

  get(key: string): string {
    return this.storage[key] || false;
  }

  setObject(key: string, value = null): void {
    if (!value) {
      return;
    }
    this.storage[key] = JSON.stringify(value);
  }

  getObject(key: string): any {
    if (this.storage[key]) {
      return JSON.parse(this.storage[key]);
    } else {
      return null;
    }
  }

  getValue<T>(key: string): T | null {
    const obj = JSON.parse(this.storage[key] || null);
    return <T>obj || null;
  }

  remove(key: string): any {
    this.storage.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  }

  get length(): number {
    return this.storage.length;
  }

  get isStorageEmpty(): boolean {
    return this.length === 0;
  }
}
