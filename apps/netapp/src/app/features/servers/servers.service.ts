import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServersEntity } from './state/servers.models';

@Injectable({
  providedIn: 'root'
})
export class ServersService {
  constructor(private http: HttpClient) {
  }

  getServers(): Observable<ServersEntity[]> {
    return this.http.get<ServersEntity[]>('api/servers');
  }
}
