import UserService from "../services/UserService";
import { useEffect, useState } from "react";

function SetUser() {
    
    const oktaToken = JSON.parse(localStorage.getItem('okta-token-storage'));
    useEffect(()=>{
        const fetchUserEmail = async() =>{
            
            if(oktaToken != null){
                const email = oktaToken.idToken.claims.email;
                const doesExist = await UserService.checkUser(email);
                const firstName = oktaToken.idToken.claims.name;
                const lastName = oktaToken.idToken.scopes[2];
                const username = oktaToken.idToken.scopes[1];
                const phone = oktaToken.idToken.claims.phone;
                const user = {email,firstName,lastName,username,phone};
                localStorage.setItem("boolean",doesExist);
                if(doesExist !== true){
                    UserService.createUser(user);
                }
                
                
            }
        };
        fetchUserEmail();
        
        
    }, [oktaToken]);

};
export default SetUser;