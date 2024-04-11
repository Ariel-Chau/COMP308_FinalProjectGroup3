import React, { useState, useEffect } from 'react';
import axios from 'axios'

function Home(){

    const [userType, setUserType] = useState(""); // State to hold user type
    const [error, setError] = useState(""); // State to hold error message

    axios.defaults.withCredentials=true;
    useEffect(() => {
        axios.get('http://localhost:3001/home')
            .then(result => {
                console.log(result);
                if (result.data === "Success") {
                    // You can fetch additional user data here if needed
                    setUserType(result.data.userType); // Set default user type if not received from backend
                } else {
                    setError("Authentication failed. Please login."); // Set error message if authentication failed
                }
            })
            .catch(err => {
                console.log(err);
                setError("An error occurred. Please try again."); // Set generic error message for any other errors
            });
    }, []);

    return (
        <div>
            {error ? (
                <h2 className="text-danger">{error}</h2>
            ) : (
                <div>
                    <h2>Home Component</h2>
                    {userType && <p>You are logged in as a {userType}</p>}
                </div>
            )}
        </div>
    );
}
export default Home;