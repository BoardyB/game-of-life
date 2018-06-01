import {Observable} from "rxjs/index";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class PatternLoader {

  private httpClient: HttpClient;

  constructor(http: HttpClient) {
    this.httpClient = http;
  }

  getAllPatterns(): Observable<any> {
    return this.httpClient.get('/api/pattern/upload/patterns');
  }

}
