import useAuthUser from "../hook/getUser";
import { useOktaAuth } from "@okta/okta-react";
import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import UserService from "../services/UserService";
import React from 'react';





const userDiv = document.querySelector("div.user") // Find the user div in our html
let tableHeaders = ["ID", "Username", "First", "Last", "Email", "Phone", "Password", "Role"]


const createUserTable = () => {
    while (userDiv.firstChild)
        userDiv.removeChild(userDiv.firstChild) // Remove all children from user div (if any)

    let userTable = document.createElement('table') // Create the table itself
    userTable.className = 'userTable'

    let userTableHead = document.createElement('thead') // Creates the table header group element
    userTableHead.className = 'userTableHead'

    let userTableHeaderRow = document.createElement('tr') // Creates the row that will contain the headers
    userTableHeaderRow.className = 'userTableHeaderRow'// Will iterate over all the strings in the tableHeader array and will append the header cells to the table header row
    
    tableHeaders.forEach(header => {
        let userHeader = document.createElement('th') // Creates the current header cell during a specific iteration
        userHeader.innerText = header
        userTableHeaderRow.append(userHeader) // Appends the current header cell to the header row
    })

    userTableHead.append(userTableHeaderRow) // Appends the header row to the table header group element

    userTable.append(userTableHead)

    let userTableBody = document.createElement('tbody') // Creates the table body group element
    userTableBody.className = "userTable-Body"

    userTable.append(userTableBody) // Appends the table body group element to the table

    userDiv.append(userTable) // Appends the table to the user div
};


const getUsers = () => {
    fetch('http://localhost:8181/userpage/show') // Fetch for all users. The response is an array of objects that is sorted in decreasing order
    .then(res => res.json())
    .then(users => {
        createUserTable() // Clears user div if it has any children nodes, creates & appends the table
        // Iterates through all the objects in the scores array and appends each one to the table body
        for (const user of users) {
            let userIndex = users.indexOf(user) + 1 // Index of score in score array for global ranking (these are already sorted in the back-end)
            //appendUsers(user, userIndex) // Creates and appends each row to the table body
        }
    }
    )
}

const User = () => {

    const { authState } = useOktaAuth();
    const userInfo = useAuthUser();
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState(null);

    useEffect(() =>{
		const fetchData  = async () => {
			setLoading(true);
			try {
				const response = await UserService.getUser();
				setUsers(response.data);
				console.log(users);
			} catch(error) {
				console.log(error);
			}
			setLoading(false);
		};
		fetchData();
	}, []);
    


    return (
        <Container>
            {authState?.isAuthenticated ? (
                <>
                    <h2>User Management</h2>
                    {!loading && (
                <article>
                    <p>how to call the create table function??</p>
                    {userInfo?.email}
                </article>)}
                </>
            ) : (
    <>
                {!loading  && (
                <article></article>	)}</>

            )}
        </Container>
    );

    
};

//THIS CODE TAKEN FROM A SCOREBOARD EXAMPLE, NOT YET IMPLEMENTED
// // // The function below will accept a single user and its index to create the global ranking
// // const appendUsers = (singleUser, singleUserIndex) => {
// //     const scoreboardTable = document.querySelector('.userTable') // Find the table we created
// //     let userTableBodyRow = document.createElement('tr') // Create the current table row
// //     scoreboardTableBodyRow.className = 'scoreboardTableBodyRow'
// //     // Lines 72-85 create the 5 column cells that will be appended to the current table row
// //     let scoreRanking = document.createElement('td')
// //     scoreRanking.innerText = singleScoreIndex
// //     let usernameData = document.createElement('td')
// //     usernameData.innerText = singleScore.user.username
// //     let scoreData = document.createElement('td')
// //     scoreData.innerText = singleScore.score
// //     let timeData = document.createElement('td')
// //     timeData.innerText = singleScore.time_alive
// //     let accuracyData = document.createElement('td')
// //     accuracyData.innerText = singleScore.accuracy
// //     scoreboardTableBodyRow.append(scoreRanking, usernameData, scoreData, timeData, accuracyData) // Append all 5 cells to the table row
// //     scoreboardTable.append(scoreboardTableBodyRow) // Append the current row to the scoreboard table body
// // }






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

export default User;