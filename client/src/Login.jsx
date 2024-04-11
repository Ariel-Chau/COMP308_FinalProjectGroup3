import React from 'react'
import { Link } from 'react-router-dom';
import {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Login(){

  
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const [error, setError] = useState(""); // State to hold error message

    axios.defaults.withCredentials=true;

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login', { email, password })
    .then(result => {
        console.log(result);
        if (result.data.message === "Success") {
            // Save user type to state if needed
            navigate('/home'); // Redirect to home page upon successful login
        } else {
            // Handle other cases like incorrect password or no record existed
            console.log(result.data); // Log the error message from the backend
        }
    })
    .catch(err => {
        console.error(err);
        // Handle other errors such as network issues or server errors
    });
    }




    return(
        <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input type="email" placeholder='Enter email' autoComplete='off' name='email' className='form-control rounded-0' onChange={(e) => setEmail(e.target.value)}/>

                    </div>

                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Password</strong>
                        </label>
                        <input type="password" placeholder="Enter Password" name="password" className="form-control rounded-0" onChange={(e) => setPassword(e.target.value)}/>


                    </div>

                    <button type='submit' className='btn btn-success w-100 rounded-0'>
                        Login
                    </button>


                
                
                </form>
                <p>Already have an account</p>
                <Link to="/register" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>
                Sign up
                </Link>

                

            </div>
        

        </div>
    )

}
export default Login;
