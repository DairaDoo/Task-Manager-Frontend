import { Component, OnInit } from '@angular/core';
import { ApiService, Task } from '../../services/api.service';
import { CommonModule } from '@angular/common';  // Ensure to import CommonModule for Angular's built-in directives like *ngIf

@Component({
  selector: 'app-task-list',
  standalone: true,  // Mark this as a standalone component
  imports: [CommonModule],  // Import CommonModule for directives like *ngIf
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  isLoading: boolean = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getTasks();
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
