import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClipartService {
  url: string = "https://openclipart.org/search/json/?query=";
  data: IOpenClipArt;
  constructor( private _http: HttpClient ) { 
}

getImageList(imageStr: string) : Observable<IOpenClipArt>{
  return this._http.get<IOpenClipArt>(this.url+imageStr);
}
}

