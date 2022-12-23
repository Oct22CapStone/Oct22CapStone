import useAuthUser from "../hook/getUser";
import { useOktaAuth } from "@okta/okta-react";
import styled from "styled-components";
import { Data } from "../data";

const Home = () => {
	const { authState } = useOktaAuth();
	const userInfo = useAuthUser();

	return (
		<Container>
			{authState?.isAuthenticated ? (
				<>
					<h2>Welcome back, {userInfo?.name}</h2>
				</>
			) : (
				<p style={{ textAlign: "center", marginTop: "6rem", fontSize: '2rem' }}>
					Please login to see products
				</p>
			)}
		</Container>
	);
};

const Container = styled.section`
	max-width: 90%;
	margin: 2rem auto;
	
	& h2 {
		font-weight: 500;
		margin-bottom: 2rem;
		font-size: 1.3rem;
	}
	& > article {
		width: 90%;
		margin: auto;
		display: flex;
		flex-wrap: wrap;
		.card {
			margin: 1rem;
		}
	}
`;

export default Home;