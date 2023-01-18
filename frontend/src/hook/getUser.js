import { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import UserService from "../services/UserService";
import UserRoleService from "../services/UserRoleService";
const useAuthUser = () => {

    const { oktaAuth, authState } = useOktaAuth();
    const [userInfo, setUserInfo] = useState(null);
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await oktaAuth.getUser();
                setUserInfo(res);
                const email = authState.idToken.claims.email;
                localStorage.setItem("userEmail",JSON.stringify(authState.idToken.claims.email));
                const doesExist = await UserService.checkUser(email);
                const firstName = authState.idToken.claims.given_name;
                const lastName = authState.idToken.claims.family_name;
                const username = authState.idToken.claims.preferred_username;
                const user = {email,firstName,lastName,username};
                if(doesExist !== true){
                    const role = {roleId: 2};
                    const userRole ={role: role, user: user};
                    UserService.createUser(user);                    
                    await UserRoleService.createUserRole(userRole);
                }
            } catch (error) {
                console.log(error);
            }
        };
        authState?.isAuthenticated && getUser();
    }, [authState, oktaAuth]);
    return userInfo;
};
export default useAuthUser;