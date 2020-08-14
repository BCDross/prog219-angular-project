import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-archived-tasks',
  templateUrl: './archived-tasks.component.html',
  styleUrls: ['./archived-tasks.component.scss']
})
export class ArchivedTasksComponent implements OnInit {
  tasksByStatus: Map<string, Task[]> = new Map();

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      for (let task of tasks) {
        let statusList = this.tasksByStatus.get(task.Status);
        if (statusList === undefined) {
          statusList = [];
          this.tasksByStatus.set(task.Status, statusList);
        }
        statusList.push(task);
      }

      for (let status of this.tasksByStatus.keys()) {
        let statusList = this.tasksByStatus.get(status);
        statusList.sort((a, b) => a.TaskName.localeCompare(b.TaskName));
      }
    });
  }
}
