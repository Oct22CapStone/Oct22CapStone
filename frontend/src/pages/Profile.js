import useAuthUser from "../hook/getUser";
import styled from "styled-components";

const Profile = () => {
	const userInfo = useAuthUser();
	return (
		<Container>
			<h2>My Profile Details</h2>
			<section>
				<ul>
					<li>Username: {userInfo?.preferred_username}</li>
					<li>Email: {userInfo?.email}</li>
					<li>Full Name: {userInfo?.name}</li>
					<li>first Name: {userInfo?.first_name}</li>
					<li>first Name: {userInfo?.last_name}</li>
					<li>Email Verified: {userInfo?.email_verified ? "Yes" : "No"}</li>
					<li>Zone: {userInfo?.zoneinfo}</li>
				</ul>
			</section>
		</Container>
	);
};

const Container = styled.section`
	max-width: 90%;
	margin: 2rem auto;
	& h2 {
		font-size: 1.3rem;
		font-weight: 500;
		margin-bottom: 1rem;
	}
	& ul {
		width: 50%;
		list-style: none;
		display: flex;
		flex-direction: column;
		background: #f2f3f5;
   		padding: 1rem 2rem;
		& li {
			margin: 0.7rem 0;
			font-size: 1rem;
		}
	}
`;

export default Profile;