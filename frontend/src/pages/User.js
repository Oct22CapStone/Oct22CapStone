import useAuthUser from "../hook/getUser";


const data = [
    { user_id: 27367, username: "kdjflds", firstName: "Bob", lastName: "Smith", email: "bob@mail.com", password: "la8kjda", phone: "3424756273", acc_role: "customer" },
    { user_id: 23232, username: "ieuqo", firstName: "Pat", lastName: "Roberts", email: "pat@mail.com", password: "io3iuiyu", phone: "2546354899", acc_role: "admin" },
    { user_id: 123124, username: "nvsma", firstName: "Phil", lastName: "White", email: "phil@mail.com", password: "q8erwre", phone: "8973542314", acc_role: "customer" },
    { user_id: 5433, username: "apwej", firstName: "Cameron", lastName: "Johnson", email: "cam@mail.com", password: "c3vxvc", phone: "8374765344", acc_role: "admin" },
    { user_id: 96986, username: "nruhvue", firstName: "Jo", lastName: "Greene", email: "jo@mail.com", password: "ml7kjklj", phone: "9987676754", acc_role: "customer" }
  ]

const tableStyle = {
    border: '1px solid black',
    borderCollapse: 'collapse',
    textAlign: 'center',
    width: '100%'
}

const tdStyle = {
    border: '1px solid #85C1E9',
    background: 'white',
    padding: '5px'
};

const thStyle = {
    border: '1px solid #3498DB',
    background: '#3498DB',
    color: 'white',
    padding: '5px'
};
  
  function User() {
    const userInfo = useAuthUser();

    return (
      <div className="App">
        <h1>Users</h1>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Username</th>
              <th style={thStyle}>First</th>
              <th style={thStyle}>Last</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>Password</th>
              <th style={thStyle}>Role</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((value, key) => {
                return (
                  <tr key={key}>
                    <td style={tdStyle}>{value?.user_id}</td>
                    <td style={tdStyle}>{value?.username}</td>
                    <td style={tdStyle}>{value?.firstName}</td>
                    <td style={tdStyle}>{value?.lastName}</td>
                    <td style={tdStyle}>{value?.email}</td>
                    <td style={tdStyle}>{value?.phone}</td>
                    <td style={tdStyle}>{value?.password}</td>
                    <td style={tdStyle}>{value?.acc_role}</td>
                  </tr>
                )
              })
            }

            {/* <tr>
                <td style={tdStyle}>{userInfo?.user_id}</td>
                <td style={tdStyle}>{userInfo?.username}</td>
                <td style={tdStyle}>{userInfo?.firstName}</td>
                <td style={tdStyle}>{userInfo?.lastName}</td>
                <td style={tdStyle}>{userInfo?.email}</td>
                <td style={tdStyle}>{userInfo?.phone}</td>
                <td style={tdStyle}>{userInfo?.password}</td>
                <td style={tdStyle}>{userInfo?.acc_role}</td>
            </tr> */}
            
          </tbody>
        </table>
      </div>
    );
  }
  
  export default User;