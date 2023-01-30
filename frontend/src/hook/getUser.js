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
                const name = authState.idToken.claims.name;
                const firstName = name.split(' ').slice(0, -1).join(' ');
                const lastName = name.split(' ').slice(-1).join(' ');
                const phone = authState.idToken.claims.phone_number;
                const user = {email,firstName,lastName,phone};
                if(doesExist !== true){
                    const newUser = await UserService.createUser(user);       
                    const role = { roleId: 1 };
                    const userRole = { role: role, user: newUser.data };        
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