package com.example.taskmanager.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private boolean completed;

    public Task(){}
    public Task(String title, boolean completed){
        this.title = title;
        this.completed = completed;
    }
    public Long getId(){
        return id;
    }
    public String getTitle(){
        return title;
    }
    public boolean isCompleted(){
        return completed;
    }
    public void setTitle(String title){
        this.title = title;
    }
    public void setCompleted(boolean completed){
        this.completed = completed;
    }
}
