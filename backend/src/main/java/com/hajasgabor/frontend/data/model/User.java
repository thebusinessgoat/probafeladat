package com.hajasgabor.frontend.data.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table(name = "Users")
@NamedQueries({@NamedQuery(name = "User.findAll", query = "SELECT u FROM User u"),
    @NamedQuery(name = "User.findByNameAndPassword", query = "SELECT u FROM User u WHERE username = :username AND password = :password")})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userId;
    
    @Column(unique = true)
    private String username;
    
    @Column
    private String name;
    
    @Column
    private String password;
    
    
    public void setId(long id){
        this.userId=id;
    }
    
    public long getId(){
        return userId;
    }
    
    public void setUsername(String userName){
        this.username = userName;
    }
    
    public String getUsername(){
        return username;
    }
    
    public void setName(String name){
        this.name = name;
    }
    
    public String getName(){
        return name;
    }
    
    public void setPassword(String password){
        this.password = password;
    }
    
    public String getPassword(){
        return password;
    }
    
}
