import { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";

const useAuthUser = () => {
	const { oktaAuth, authState } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

	useEffect(() => {
		const getUser = async () => {
			try {
				const res = await oktaAuth.getUser();
				setUserInfo(res);
			} catch (error) {
				console.log(error);
			}
		};

		authState?.isAuthenticated && getUser();
	}, [authState, oktaAuth]);

	return userInfo;
};

export default useAuthUser;