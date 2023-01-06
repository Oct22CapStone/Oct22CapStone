import UserService from "../services/UserService";

const useSetUser= () => {
    useEffect(()=>{
        const oktaToken = JSON.parse(localStorage.getItem('okta-token-storage'));
        const email = oktaToken.oktaToken.claims.email;
        const firstname = oktaToken.oktaToken.claims.name;
        const lastname = oktaToken.oktaToken.claims.lastname;
        const username = oktaToken.oktaToken.claims.username;
        const phone = oktaToken.oktaToken.claims.phone;
        const user = {email,firstname,lastname,username,phone};
        UserService.createUser(user);
        
    });
};
export default useSetUser;