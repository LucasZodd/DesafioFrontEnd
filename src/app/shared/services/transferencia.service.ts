import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Transferencia } from "../models/transferencia";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})

export class TransferenciaService {

  constructor(private http: HttpClient){}

  httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  public getTransferencias(): Observable<Transferencia[]> {
    return this.http.get<Transferencia[]>(`${environment.apiUrl}tranferencia`);
  }
}

