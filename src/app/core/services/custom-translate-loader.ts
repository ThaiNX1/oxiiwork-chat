import {TranslateLoader} from "@ngx-translate/core";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {inject, Injectable} from "@angular/core";
import {CommonService} from "./common.service";
import {environment} from "../../../environments/environment";

@Injectable()
export class CustomTranslateLoader implements TranslateLoader {
  commonService = inject(CommonService)

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  getTranslation(lang: string): Observable<any> {
    const contentHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    })
    this.commonService.setIncludeHttpHeader(false)
    return this.httpClient.get(
      `${environment.languageBucket}/i18n/${environment.languagePrefix}_${lang}.json`,
      {
        headers: contentHeaders
      }
    );
  }

}
