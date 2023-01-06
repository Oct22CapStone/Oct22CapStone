import UserService from "../services/UserService";

function SetUser() {
    const oktaToken = JSON.parse(localStorage.getItem('okta-token-storage'));
    useEffect(()=>{
        if(oktaToken != null){
            const email = oktaToken.oktaToken.claims.email;
            const firstname = oktaToken.oktaToken.claims.name;
            const lastname = oktaToken.oktaToken.claims.lastname;
            const username = oktaToken.oktaToken.claims.username;
            const phone = oktaToken.oktaToken.claims.phone;
            const user = {email,firstname,lastname,username,phone};
            UserService.createUser(user);
        }
        
        
    },[oktaToken]);
};
export default useSetUser;