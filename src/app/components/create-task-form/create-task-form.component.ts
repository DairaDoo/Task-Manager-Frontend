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


      const payload = {
        title: this.taskForm.value.title.trim(), // asegurar que no hay espacios
        description: this.taskForm.value.description?.trim() || '', // evitar nulos
        isCompleted: this.taskForm.value.isCompleted ?? false
      };

      console.log('Payload enviado: ', payload);



      this.apiService.createTask(payload).subscribe({
        next: (createTask) => {
          console.log('Task created: ', createTask);
          this.taskCreated.emit();
          this.taskForm.reset({isCompleted: false});

          // resetear form a su estado original.
          this.taskForm.reset();
          this.taskForm.markAsPristine();
          this.taskForm.markAsUntouched();
          this.taskForm.updateValueAndValidity();
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
