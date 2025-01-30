import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-task-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-task-form.component.html',
  styleUrl: './create-task-form.component.scss'
})

export class CreateTaskFormComponent {

  @Output() taskCreated = new EventEmitter<void>();
  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService)
  {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      isCompleted: [false]
    })
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.apiService.createTask(this.taskForm.value).subscribe({
        next: (createTask) => {
          console.log('Task created: ', createTask);
          this.taskCreated.emit();
          this.taskForm.reset({isCompleted: false});
        },
        error: (error) => {
          console.error('Error creating task: ', error);
        },
        complete: () => {
          console.log('Task creation process completed succesfully!');
        }
      });
    }
  }
  
}
