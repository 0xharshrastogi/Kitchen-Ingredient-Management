import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private stringify(value: any): string {
    return JSON.stringify(value);
  }

  private parse(jsonBody: string) {
    return JSON.parse(jsonBody);
  }

  get<T = unknown>(key: string): T | null {
    const jsonBody = localStorage.getItem(key);
    return jsonBody ? this.parse(jsonBody) : null;
  }

  set(key: string, value: any): void {
    localStorage.setItem(key, this.stringify(value));
  }

  remove<T = unknown>(key: string): T | null {
    const value = this.get<T>(key);

    if (!value) return null;

    localStorage.removeItem(key);

    return value;
  }
}
