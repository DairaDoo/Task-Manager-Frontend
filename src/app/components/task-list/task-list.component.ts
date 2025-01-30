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
        this.tasks = data;
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
      },
      error: (error) => {
        console.error('Error fetching tasks: ', error);
        this.isLoading = false;
      },
      complete: () => {
        console.log('Tasks fetch completed.');
      }
    });

  }
}
