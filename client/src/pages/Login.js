   // src/Login.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { useAuth } from '../utils/AuthContext';
import '../styles/login.css';

   function Login() {
       const navigate = useNavigate();
       const { setIsAuthenticated } = useAuth();

       const responseFacebook = (response) => {
           console.log(response);
           if (response.accessToken) {
               // Successful login
               localStorage.setItem('userToken', response.accessToken);
               localStorage.setItem('userName', response.name);
               setIsAuthenticated(true);  // Update the authentication state
               navigate('/view-expenses');
           }
       };

       return (
           <div id="login-page">
               <h2>Login</h2>
               <FacebookLogin
                   appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                   onSuccess={responseFacebook}
                   onFail={(error) => console.log('Login Failed!', error)}
                   onProfileSuccess={(response) => console.log('Get Profile Success!', response)}
                   className="facebook-login-button"
                   scope="public_profile"
               />
           </div>
       );
   }

   export default Login;
