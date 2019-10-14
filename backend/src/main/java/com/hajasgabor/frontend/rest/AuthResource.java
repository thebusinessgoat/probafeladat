/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.hajasgabor.frontend.rest;

import com.google.gson.JsonObject;
import com.hajasgabor.frontend.data.model.User;
import com.hajasgabor.frontend.services.UserService;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author Hajas Gábor
 */
@ApplicationScoped
@Path("/login")
public class AuthResource {
    
    @Inject
    private UserService service;
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    public JsonObject login(String json){
        return this.service.login(json);     
    }
}
