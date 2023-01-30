import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UserOrdersService from "../services/UserOrdersService";
import axios from "axios";
const Help = () => {
    const { id } = useParams();
    const [order, setOrder] = useState("");
    const [message, setMessage] = useState("");
    const [userInput, setUserInput] = useState("");
    const handleSubmit = async (event) => {
        event.preventDefault();
        const mailTemplate = {
            recipient: "Admin@VehicleVault.com",
            msgBody: `
                New help request for Order ID: ${order.orderId} made by user: ${order.userId.email}.
                Their message: ${userInput}.
                Please take further actions, thank you.
              `,
            subject: "Help Request for Order."
          }
          const sendEmail = async (event) => {
            axios({
              method: "POST",
              url: "https://backendecommerce.azurewebsites.net/email/send",
              data: mailTemplate
            })}
            sendEmail();
            setMessage("Your request has been sent.")
    };
    const handleChange = (event) => {
        setUserInput(event.target.value);
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await UserOrdersService.getById(id);
                setOrder(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        if (id && id !== "")
            fetchData();
    }, [id]);
    return (
        <>            <Link to="/userorders" className="btn btn-secondary btn-sm">Back</Link>            <div key={order.orderId} className="container mt-5 mbclassName-5">                <p style={{color: "blue"}}>{message}</p>                <form>                    <div className="mb-3 form-group">                        <label>Order Id:</label>                        <input disabled defaultValue={order.orderId} name="street" onChange={handleChange} className="form-control" />                    </div>                    <div className="mb-3 form-group">        <label>What do you need help with?</label>                        <textarea name="userInput" onChange={handleChange} className="form-control" ></textarea>                    </div>                    <button className="btn btn-primary btn-sm" type="submit" onClick={(e) => handleSubmit(e)}>Submit</button>                    </form>            </div>        </>)
};
export default Help;