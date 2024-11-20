import { Component, OnInit } from '@angular/core';
import { TareasService, Tarea } from '../../servicios/tareas.service';

@Component({
    selector: 'app-tareas',
    templateUrl: './tareas.component.html',
    styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {
    titulo = '';
    descripcion = '';
    completada = false;
    modoEdicion: { [id: number]: boolean } = {};
    tareaEditada: { [id: number]: { titulo: string; descripcion: string } } = {};
    tareas: Tarea[] = [];

    constructor(private tareasService: TareasService) {}

    ngOnInit(): void {
        this.cargarTareas();
    }

    cargarTareas(): void {
        this.tareasService.obtenerTareas().subscribe({
            next: (tareas) => (this.tareas = tareas),
            error: (error) => console.error('Error al cargar tareas:', error),
        });
    }

    crearTarea(): void {
        if (!this.titulo.trim() || !this.descripcion.trim()) {
            alert('El título y la descripción son campos obligatorios antes de crear la tarea.');
            return; 
          }

        this.tareasService.crearTarea(this.titulo, this.descripcion).subscribe({
            next: (nuevaTarea) => {
                this.tareas.push(nuevaTarea);
                this.titulo = '';
                this.descripcion = '';
            },
            error: (error) => console.error('Error al crear tarea:', error),
        });
    }

    alternarEstado(tarea: Tarea): void {
      const nuevoEstado = !tarea.completada;
      this.tareasService.actualizarEstadoTarea(tarea.id, nuevoEstado).subscribe({
          next: (tareaActualizada) => {
              tarea.completada = tareaActualizada.completada;
          },
          error: (error) => console.error('Error al actualizar tarea:', error),
      });
  }

  eliminarTarea(id: number): void {
    this.tareasService.eliminarTarea(id).subscribe({
        next: () => {
            this.tareas = this.tareas.filter((tarea) => tarea.id !== id);
        },
        error: (error) => console.error('Error al eliminar tarea:', error),
    });
}

activarEdicion(tarea: Tarea): void {
    this.modoEdicion[tarea.id] = true;
    this.tareaEditada[tarea.id] = { titulo: tarea.titulo, descripcion: tarea.descripcion };
}

guardarEdicion(tarea: Tarea): void {
    const { titulo, descripcion } = this.tareaEditada[tarea.id];
    this.tareasService.editarTarea(tarea.id, titulo, descripcion).subscribe({
        next: (tareaActualizada) => {
            tarea.titulo = tareaActualizada.titulo;
            tarea.descripcion = tareaActualizada.descripcion;
            this.modoEdicion[tarea.id] = false;
        },
        error: (error) => console.error('Error al editar tarea:', error),
    });
}

cancelarEdicion(id: number): void {
    this.modoEdicion[id] = false;
}
}