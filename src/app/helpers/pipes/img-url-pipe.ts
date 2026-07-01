import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

@Pipe({
  name: 'imgUrl',
})
export class ImgUrlPipe implements PipeTransform {
  transform(value: string | null | undefined): string | null {
    if (!value) {
      return null;
    }
    return `${environment.apiBaseUrl}/${value}`;
  }
}
