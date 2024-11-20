import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tarea {
    id: number;
    titulo: string;
    descripcion: string;
    completada: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class TareasService {
    private apiUrl = 'http://localhost:3000/tareas';

    constructor(private http: HttpClient) {}

    crearTarea(titulo: string, descripcion: string): Observable<Tarea> {
        return this.http.post<Tarea>(this.apiUrl, { titulo, descripcion });
    }

    obtenerTareas(): Observable<Tarea[]> {
        return this.http.get<Tarea[]>(this.apiUrl);
    }

    actualizarEstadoTarea(id: number, completada: boolean): Observable<Tarea> {
      return this.http.patch<Tarea>(`${this.apiUrl}/${id}`, { completada });
    }

    eliminarTarea(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    } 

    editarTarea(id: number, titulo: string, descripcion: string): Observable<Tarea> {
        return this.http.put<Tarea>(`${this.apiUrl}/${id}`, { titulo, descripcion });
    }
}