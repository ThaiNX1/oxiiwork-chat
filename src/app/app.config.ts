import { ApplicationConfig, importProvidersFrom, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, provideHttpClient } from "@angular/common/http";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { provideNamedApollo } from "apollo-angular";
import { HttpLink } from "apollo-angular/http";
import { InMemoryCache, split } from "@apollo/client/core";
import { environment } from "../environments/environment";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { ServiceInterceptor } from "./core/services/service-interceptor";
// import {AngularFireModule} from "@angular/fire/compat";
import { CompilerConfig } from "@angular/compiler";
import { CustomTranslateLoader } from "./core/services/custom-translate-loader";
import { NgxsModule } from '@ngxs/store';
import { ConversationState } from './pages/guest/guest-chat/state/conversation.state';

// export function HttpLoaderFactory(httpClient: HttpClient) {
//   return new TranslateHttpLoader(httpClient, './assets/languages/', '.json');
// }
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new CustomTranslateLoader(httpClient);
}

export const translateConfig = TranslateModule.forRoot({
  defaultLanguage: 'vi',
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient]
  }
});
export const _provideNamedApollo = provideNamedApollo(() => {
  const httpLink = inject(HttpLink);
  const http = httpLink.create({ uri: environment.apiGraphQL })
  const ws = new WebSocketLink({
    uri: environment.apiWS,
    options: {
      reconnect: true,
      lazy: true,
      connectionParams: async () => {
        return {
          headers: { Authorization: `Bearer ` },
        };
      },
    },
  });
  const link = split(({ query }) => {
    const operationDefinitionNode = getMainDefinition(query);
    return operationDefinitionNode.kind === 'OperationDefinition' && operationDefinitionNode.operation === 'subscription';
  }, ws, http)
  return {
    default: {
      link,
      cache: new InMemoryCache(),
    },
  }
})
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    _provideNamedApollo,
    importProvidersFrom([
      BrowserAnimationsModule,
      BrowserModule,
      HttpClientModule,
      translateConfig,
      // AngularFireModule.initializeApp(environment.firebaseConfig),
      NgxsModule.forRoot([ConversationState], {
        developmentMode: !environment.production,
        selectorOptions: {
          suppressErrors: false,
          injectContainerState: false
        },
      })
    ]),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServiceInterceptor,
      multi: true,
    },
  ],
};
