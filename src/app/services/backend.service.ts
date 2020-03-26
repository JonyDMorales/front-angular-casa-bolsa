import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private url = 'http://localhost:8081/';
  private token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJQaGlJbnZlc3RtZW50Q2FwaXRhbCIsImlhdCI6MTU4NTI0NjA2MywiZXhwIjoxNTg1MjY3MjAwLCJuYmYiOjE1ODUyNDYwNjMsImp0aSI6IjVlN2NlZjZmMGM5ZDUiLCJzdWIiOjEsInVzciI6eyJpZF91c3VhcmlvcyI6MSwiaWRfem9uYXNfaG9yYXJpYXMiOjQ5LCJub21icmUiOiJNYW5saW8iLCJhcGVsbGlkbyI6IlRlcmFuIiwiY29ycmVvIjoibWFubGlvZWxudW0xQGhvdG1haWwuY29tIiwiY2FyZ28iOiJNYW5hZ2VyIiwidGVsZWZvbm9fZmlqbyI6IjU2NzEzMTc0NSIsImNlbHVsYXIiOiI1NTEwODAwMjkxIiwiY3JlYXRlZF9hdCI6IjIwMTktMTAtMTYgMjA6NDg6MzAiLCJ1cGRhdGVkX2F0IjoiMjAxOS0xMC0xMSAwODozODozOSIsImRuaV9udW0iOiIyMzQzMjQzMjQiLCJzZWd1cm9fc29jaWFsIjoiMzQ1NDM1NDM1IiwiZm90b19iYXNlNjQiOiIiLCJwYXNzIjoiOGU5NmJkMDJmYmNiMDU0Y2NhMTFjZjhkZWIwMzE1NjJiOWFhZWRkODNmODNmZjdhYmY3YzNmYTc4N2FkOWJiZCJ9LCJwZXJtaXNvcyI6WzFdfQ.4Jj9k6WF5VTmH_ZH3HCk4yq_Slcp3wHc0VAAQvcK7i4';

  constructor(private http: HttpClient) {
  }

/// Limites lineas

  public limites(tipo) {
    const uri = this.url + 'limiteslineas/lista/' + tipo;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.token
      })
    };

    return this.http.get(uri, httpOptions).pipe(
      map(res => {
        console.log(res);
        return res;
      }));
  }


  public deleteq(id) {
    const uri = this.url + 'limiteslineas/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.token
      })
    };

    return this.http.delete(uri, httpOptions).pipe(
      map(res => {
        console.log(res);
        return res;
      }));
  }


  public divisas(tipoDivisas) {
    const uri = this.url + 'divisas/listadv/' + tipoDivisas;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.token
      })
    };

    return this.http.get(uri, httpOptions).pipe(
      map(res => {
        console.log(res);
        return res;
      }));
  }

  public insert(data) {
    const uri = this.url + 'limiteslineas/';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.token
      })
    };

    return this.http.post(uri, data, httpOptions).pipe(
      map(res => {
        console.log(res);
        return res;
      }));
  }


  public update(data, id) {
    const uri = this.url + 'limiteslineas/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.token
      })
    };

    return this.http.put(uri, data, httpOptions).pipe(
      map(res => {
        console.log(res);
        return res;
      }));

  }

  // fin limites

  public mesaDeDinero() {
    const uri = this.url + 'logaritmo/mesaDinero/';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.token
      })
    };

    return this.http.get(uri, httpOptions).pipe(
      map(res => {
        return res;
      }));
  }


  public semaforosAlertas(tipoEnvio) {
    const uri = this.url + 'semaforosalertas/lista/' + tipoEnvio;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.token
      })
    };

    return this.http.get(uri, httpOptions).pipe(
      map(res => {
        return res;
      }));
  }

  public listaSemaforosOperaciones() {
    const uri = this.url + 'semaforosalertas/listaSegundaTabla';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.token
      })
    };

    return this.http.get(uri, httpOptions).pipe(
      map(res => {
        return res;
      }));
  }

  public logaritmo(datos) {
    const uri = this.url + 'logaritmo/log';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.token
      })
    };

    return this.http.post(uri, datos, httpOptions).pipe(
      map(res => {
        return res;
      }));
  }

}
