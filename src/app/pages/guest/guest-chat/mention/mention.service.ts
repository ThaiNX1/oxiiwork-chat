import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { MentionUser } from './mention.types';

@Injectable({ providedIn: 'root' })
export class MentionService {
  private searchFn: (q: string) => Observable<MentionUser[]> = () => of([]);
  private query$ = new Subject<string>();
  private results$ = new BehaviorSubject<MentionUser[]>([]);
  private loading$ = new BehaviorSubject<boolean>(false);

  init(searchFn: (q: string) => Observable<MentionUser[]>, debounceMs = 120) {
    this.searchFn = searchFn;
    this.query$
      .pipe(
        debounceTime(debounceMs),
        distinctUntilChanged(),
        tap(() => this.loading$.next(true)),
        switchMap((q) => this.searchFn(q)),
        tap(() => this.loading$.next(false))
      )
      .subscribe(this.results$);
  }

  search(q: string) { this.query$.next(q); }
  results(): Observable<MentionUser[]> { return this.results$.asObservable(); }
  loading(): Observable<boolean> { return this.loading$.asObservable(); }
}
