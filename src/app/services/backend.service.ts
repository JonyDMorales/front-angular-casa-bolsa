import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private url = 'http://localhost:8081/';
  private token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJQaGlJbnZlc3RtZW50Q2FwaXRhbCIsImlhdCI6MTU4NDU4MzUzMywiZXhwIjoxNTg0NjYyNDAwLCJuYmYiOjE1ODQ1ODM1MzMsImp0aSI6IjVlNzJkMzZkN2ZhNTEiLCJzdWIiOjEsInVzciI6eyJpZF91c3VhcmlvcyI6MSwiaWRfem9uYXNfaG9yYXJpYXMiOjQ5LCJub21icmUiOiJNYW5saW8iLCJhcGVsbGlkbyI6IlRlcmFuIiwiY29ycmVvIjoibWFubGlvZWxudW0xQGhvdG1haWwuY29tIiwiY2FyZ28iOiJNYW5hZ2VyIiwidGVsZWZvbm9fZmlqbyI6IjU2NzEzMTc0NSIsImNlbHVsYXIiOiI1NTEwODAwMjkxIiwiY3JlYXRlZF9hdCI6IjIwMTktMTAtMTYgMjA6NDg6MzAiLCJ1cGRhdGVkX2F0IjoiMjAxOS0xMC0xMSAwODozODozOSIsImRuaV9udW0iOiIyMzQzMjQzMjQiLCJzZWd1cm9fc29jaWFsIjoiMzQ1NDM1NDM1IiwiZm90b19iYXNlNjQiOiIiLCJwYXNzIjoiOGU5NmJkMDJmYmNiMDU0Y2NhMTFjZjhkZWIwMzE1NjJiOWFhZWRkODNmODNmZjdhYmY3YzNmYTc4N2FkOWJiZCJ9LCJwZXJtaXNvcyI6WzFdfQ.rbxgifbqBAEziq4a8L8uog-X5q_hLz05aMDNO3yaCak';

  constructor(private http: HttpClient) { }

  public limites(tipo) {
    const uri = this.url + 'limiteslineas/lista/' + tipo;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.token
      })};

    return this.http.get(uri, httpOptions ).pipe(
      map(res => {
        console.log(res);
        return res;
      }));
  }

  public mesaDeDinero() {
    const uri = this.url + 'logaritmo/mesaDinero/';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.token
      })};

    return this.http.get(uri, httpOptions ).pipe(
      map(res => {
        return res;
      }));
  }

}
