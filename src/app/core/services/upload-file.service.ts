import {Injectable} from '@angular/core';
import {environment} from './../../../environments/environment';
import {constant} from '../constants/constant';
import {Apollo} from 'apollo-angular';
import {GQL_QUERIES} from '../constants/service-gql';
import {map} from "rxjs/operators";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CommonService} from "./common.service";
import {lastValueFrom, Observable} from "rxjs";
import {
  DocumentFile,
  FileResponse,
  GeneratePresignedUrlsResponse,
  Mutation,
  ObjectGenLinkWriteResponse
} from "../../commons/types";

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  FILE_SIZE_MAX = 5; // Megabyte
  IMAGE_REQUIRE_WIDTH = 1920;
  IMAGE_REQUIRE_HEIGHT = 650;
  urlService = environment.apiGraphQL;
  sizeFile = 1024;

  constructor(
    private apollo: Apollo,
    private httpClient: HttpClient,
    private commonService: CommonService,
  ) {
  }

  /**
   * Check for XLSX file errors
   * @param file XLSX file to validate
   * @returns error code
   */
  checkXLSXUpload(file: any = null): number | null {
    if (!file) {
      return null;
    }
    if (!['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'].includes(file.type)) {
      return constant.fileError.type;
    }
    if (file.size / this.sizeFile / this.sizeFile <= 0) {
      return constant.fileError.min;
    }
    return null
  }

  async uploadFile(file = null): Promise<any> {
    try {
      const result = lastValueFrom(this.apollo.mutate<Mutation>({
        mutation: GQL_QUERIES.storage.uploadFile,
        variables: {file},
        context: {useMultipart: true}
      })
        .pipe(map(response => response?.data?.storageUploadFile)))
      return result
    } catch (err) {
      return null
    }
  }

  async genLinkUploadS3(filename: string, folderId: string, mimetype: string, override = false): Promise<ObjectGenLinkWriteResponse | null | undefined> {
    try {
      const result = lastValueFrom(this.apollo.mutate<Mutation>({
        mutation: GQL_QUERIES.storage.documentGenLinkUpload,
        variables: {filename, folderId, mimetype, override}
      })
        .pipe(map(response => response?.data?.documentGenLinkUpload)))
      return result
    } catch (err) {
      return null
    }
  }

  async storageGeneratePresignedUrls(file: any): Promise<GeneratePresignedUrlsResponse | null | undefined> {
    try {
      const result = lastValueFrom(this.apollo.mutate<Mutation>({
        mutation: GQL_QUERIES.storage.storageGeneratePresignedUrls,
        variables: {arguments: file}
      })
        .pipe(map(response => response?.data?.storageGeneratePresignedUrls)))
      return result
    } catch (err) {
      return null
    }
  }

  async storageActiveUsingFiles(ids: string[]): Promise<FileResponse | null | undefined> {
    try {
      const result = lastValueFrom(this.apollo.mutate<Mutation>({
        mutation: GQL_QUERIES.storage.storageActiveUsingFiles,
        variables: {ids}
      })
        .pipe(map(response => response?.data?.storageActiveUsingFiles)))
      return result
    } catch (err) {
      return null
    }
  }

  async uploadFileS3(file: any, mimetype: string, url: string): Promise<any> {
    const headers = new HttpHeaders({
      "Content-Type": mimetype
    })
    try {
      const result = lastValueFrom(this.httpClient.put(url, file, {headers}))
      return result
    } catch (err) {
      return null
    }
  }

  uploadFileS3Observable(file: any, mimetype: string, url: string, fileId = null): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": mimetype
    })
    try {
      const result = this.httpClient.put(url, file, {headers}).pipe(map(response => {
        return {
          fileId,
          response
        }
      }))
      return result
    } catch (err) {
      const _error: any = {
        error: err,
        fileId
      }
      return _error
    }
  }

  uploadFileObservable(file: any, url: string): Observable<any> | any {
    this.commonService.setIncludeHttpHeader(false)
    try {
      const result = this.httpClient.put(url, file).pipe(map(response => {
        return {
          response
        }
      }))
      return result
    } catch (err) {
      return err
    }
  }

  uploadMessageFileS3Observable(file: any, url: string, localMessageId: string = ''): Observable<any> | any {
    this.commonService.setIncludeHttpHeader(false)
    try {
      const result = this.httpClient.put(url, file).pipe(map(response => {
        return {
          ...response,
          localMessageId
        }
      }))
      return result
    } catch (err: any) {
      return {
        ...err,
        localMessageId
      }
    }
  }

  async uploadFileSuccessS3(encoding: string, filename: string, folderId: string, mimetype: string, path: string): Promise<DocumentFile | null | undefined> {
    try {
      const result = lastValueFrom(this.apollo.mutate<Mutation>({
        mutation: GQL_QUERIES.storage.documentUploadFileSuccess,
        variables: {encoding, filename, folderId, mimetype, path}
      })
        .pipe(map(response => response?.data?.documentUploadFileSuccess)))
      return result
    } catch (err) {
      return null
    }
  }

  uploadFileSuccessS3Observable(encoding: string, filename: string, folderId: string, mimetype: string, path: string): Observable<any> | null {
    try {
      const result = this.apollo.mutate<Mutation>({
        mutation: GQL_QUERIES.storage.documentUploadFileSuccess,
        variables: {encoding, filename, folderId, mimetype, path}
      })
        .pipe(map(response => response?.data?.documentUploadFileSuccess))
      return result
    } catch (err) {
      return null
    }
  }
}
