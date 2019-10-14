/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.hajasgabor.frontend.rest;

import com.hajasgabor.frontend.data.model.User;
import com.hajasgabor.frontend.services.UserService;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@ApplicationScoped
@Path("/users")
public class UserResource {
    
    @Inject
    private UserService service;
    
    @GET
    @Produces("application/json")
    public User[] getAll(@HeaderParam("Authorization") String header){
        if(this.service.hasToken(header))
            return this.service.getAllUsers();
        return null;
    }
    
    @GET
    @Path("{userId}")
    @Produces("application/json")
    public User getUser(@PathParam("userId") long id, @HeaderParam("Authorization") String header){
        if(this.service.hasToken(header))
            return this.service.getUserById(id);
        return null;
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    //@Produces(MediaType.APPLICATION_JSON)
    public boolean addUser(User user, @HeaderParam("Authorization") String header){
        if(this.service.hasToken(header))
            return this.service.addUser(user);
        return false;
    }
    
    @PUT
    @Path("{userId}")
    @Consumes(MediaType.APPLICATION_JSON)
   // @Produces(MediaType.APPLICATION_JSON)
    public boolean modifyUser(@PathParam("userId")long id, User user, @HeaderParam("Authorization") String header){
        if(this.service.hasToken(header))
            return this.service.modifyUser(id, user);
        return false;
    }
    
    
    @DELETE
    @Path("{userId}")
    public boolean deleteUser(@PathParam("userId")long id, @HeaderParam("Authorization") String header){
        if(this.service.hasToken(header))
            return this.service.removeById(id);
        return false;
    }
    
}
