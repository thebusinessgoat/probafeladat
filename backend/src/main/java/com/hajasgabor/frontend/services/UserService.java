/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.hajasgabor.frontend.services;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.hajasgabor.frontend.data.model.User;
import com.hajasgabor.frontend.data.util.PersistenceHelper;
import java.math.BigInteger;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.HashSet;
import java.util.Map;
import java.util.Random;
import java.util.Set;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import redis.clients.jedis.Jedis;

@ApplicationScoped
@Transactional
public class UserService {
    
    @Inject
    private PersistenceHelper helper;
    
    Jedis jedis = new Jedis();
    
    
    public User[] getAllUsers(){
        return this.helper.getEntityManager().createNamedQuery("User.findAll", User.class)
        .getResultList().toArray(new User[0]);
    }
    
    public User getUserById(long id){
        return this.helper.getEntityManager().find(User.class, id);
    }
    
    public boolean removeById(long id){
        try{
            this.helper.getEntityManager().remove(this.helper.getEntityManager().find(User.class, id));
            return true;
        } catch (Exception e){
            e.printStackTrace();
            return false;
        }
        
    }
    
    public boolean addUser(User user){
        try {
            this.helper.getEntityManager().persist(user);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        
    }
    
    public JsonObject login(String json){
        Map jsonObject = new Gson().fromJson(json, Map.class);
        TypedQuery<User> query = this.helper.getEntityManager().createNamedQuery("User.findByNameAndPassword", User.class);
        query.setParameter("username", jsonObject.get("username"));
        query.setParameter("password", jsonObject.get("password"));
        
        Random random = new Random();
        String token = String.valueOf(100000+random.nextInt(100000));
        String encodedToken = Base64.getEncoder().encodeToString(token.getBytes());
        
        JsonObject tokenJson = new JsonObject();
        tokenJson.addProperty("token", encodedToken);
        try{ 
            User user = query.getSingleResult();
            jedis.set("token", encodedToken);     
            return tokenJson;
        } catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
    
    public boolean modifyUser(long id, User data){
        User user = this.helper.getEntityManager().find(User.class, id);
        try{
            user.setUsername(data.getUsername());
            user.setPassword(data.getPassword());
            user.setName(data.getName());
            this.helper.getEntityManager().merge(user);
            return true;
        } catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }
    
    public boolean hasToken(String header){
        String storedToken = jedis.get("token");
        String token = header.substring(7);
        if(storedToken.equals(token))
            return true;
        return false;
    }
    
    
}
