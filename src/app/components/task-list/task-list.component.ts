import { Component, OnInit } from '@angular/core';
import { ApiService, Task } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { CreateTaskFormComponent } from "../create-task-form/create-task-form.component";  // Ensure to import CommonModule for Angular's built-in directives like *ngIf

@Component({
  selector: 'app-task-list',
  standalone: true,  // Mark this as a standalone component
  imports: [CommonModule, CreateTaskFormComponent],  // Import CommonModule for directives like *ngIf
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  isLoading: boolean = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.refreshTasks();
  }

  refreshTasks() {
    this.isLoading = true;

    this.apiService.getTasks().subscribe({
      next: (data) => {
        this.tasks = [...data];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error refreshing tasks: ', error);
        this.isLoading = false;
      }
    })

  }

  getTasks(): void {
    this.apiService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.isLoading = false;
        console.log(this.tasks)
      },
      error: (error) => {
        console.error('Error fetching tasks: ', error);
        this.isLoading = false;
        console.log(this.tasks)
      },
      complete: () => {
        console.log('Tasks fetch completed.');
        console.log(this.tasks)
      }
    });
  }

  updateTask(task: Task): void {
    const updatedTask: Omit<Task, 'createdAt'> = {
      id: task.id,
      title: task.title,
      description: task.description,
      isCompleted: !task.isCompleted
    }

    this.apiService.updateTask(updatedTask.id, updatedTask).subscribe({
      next: (response) => {
        console.log(`Task with ID ${task.id} updated successfully.`, response);
        this.refreshTasks(); // actualizar todos los tasks
      },
      error: (error) => {
        console.error(`Error updating task with ID ${task.id}`,)
      }
    })
  }

  deleteTask(id: number) {
    if (confirm('Are you sure you want to delete this task?: ')) {
      this.apiService.deleteTask(id).subscribe({
        next: () => {
          console.log(`Task with ID ${id} deleted successfully.`);
          this.refreshTasks();
        },
        error: (error) => {
          console.error('Error deleting task: ', error);
        }
      })
    }
  }

}
