import {Pipe, PipeTransform} from "@angular/core";
import {storageKey} from "../../core/constants/storage-key";

@Pipe({
  name: 'authS3'
})
export class AuthMediaS3Pipe implements PipeTransform {

  transform(link: string): string {
    const result = link?.includes('data:image/')
      ? link
      : `${link}?token=${localStorage.getItem(storageKey.token)}`
    return result
  }
}
