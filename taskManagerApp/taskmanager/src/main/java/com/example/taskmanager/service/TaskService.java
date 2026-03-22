package com.example.taskmanager.service;

import com.example.taskmanager.entity.Task;
import com.example.taskmanager.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    private final TaskRepository taskRepository;
    public TaskService(TaskRepository taskRepository){
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTasks(){
        return taskRepository.findAll();
    }
    public Task createTask(Task task){
        if(task.getTitle() == null || task.getTitle().trim().isEmpty()){
            throw new RuntimeException("Title cannot be empty");
        }
        return taskRepository.save(task);
    }

    public void deleteTask(Long id){
        taskRepository.deleteById(id);
    }

    public Task updateTask(Long id, Task updatedTask){
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        task.setCompleted(updatedTask.isCompleted());
        return taskRepository.save(task);
    }
}
