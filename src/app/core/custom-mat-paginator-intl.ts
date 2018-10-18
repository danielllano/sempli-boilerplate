import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { MatPaginatorIntl } from '@angular/material';


@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl implements OnDestroy {

  unsubscribe: Subject<void> = new Subject<void>();
  OF_LABEL = 'of';

  constructor(private translateService: TranslateService) {
    super();

    this.translateService.onLangChange.subscribe((e: LangChangeEvent) => {
      this.getAndInitTranslations();
    });

    this.getAndInitTranslations();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getAndInitTranslations() {
    this.translateService.get([
      'PAGINATOR.ITEMS_PER_PAGE',
      'PAGINATOR.NEXT_PAGE',
      'PAGINATOR.PREVIOUS_PAGE',
      'PAGINATOR.FIRST_PAGE',
      'PAGINATOR.LAST_PAGE',
      'PAGINATOR.OF_LABEL'
    ]).subscribe(translation => {
      this.itemsPerPageLabel = translation['PAGINATOR.ITEMS_PER_PAGE'];
      this.nextPageLabel = translation['PAGINATOR.NEXT_PAGE'];
      this.previousPageLabel = translation['PAGINATOR.PREVIOUS_PAGE'];
      this.firstPageLabel = translation['PAGINATOR.FIRST_PAGE'];
      this.lastPageLabel = translation['PAGINATOR.LAST_PAGE'];
      this.OF_LABEL = translation['PAGINATOR.OF_LABEL'];
      this.changes.next();
    });
  }

 getRangeLabel = (page: number, pageSize: number, length: number) =>  {
    if (length === 0 || pageSize === 0) {
      return `0 / ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} ${this.OF_LABEL} ${length}`;
  }
}
