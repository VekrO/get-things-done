import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable()
export class LoadingService {
  loading: WritableSignal<boolean> = signal(false);
}
