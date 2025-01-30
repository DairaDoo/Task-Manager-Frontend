import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { enviroment } from "../../enviorments/enviorments";

// Modelo de Task
export interface Task {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
    createdAt: string;
}

@Injectable({
    providedIn: 'root',
})

export class ApiService {
    private apiUrl = enviroment.apiUrl;

    constructor(private http: HttpClient) {}

    // Method to fetch all tasks
    getTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(`${this.apiUrl}/api/tasks`);
    }

    // Method to create a new task
    createTask(task: Omit<Task, 'id'>): Observable<Task> {
        return this.http.post<Task>(`${this.apiUrl}/api/tasks`, task);
    }
}