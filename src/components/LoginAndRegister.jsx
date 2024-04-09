import React, { useState, useEffect } from 'react';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import '../cssfolder/LoginAndRegister.css'; // Assuming this is the correct path to your CSS file
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginAndRegister = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const wrapper = document.querySelector('.wrapper');
    const signUpLink = document.querySelector('.link .signup-link');
    const signInLink = document.querySelector('.link .signin-link');

    const handleSignUpClick = () => {
      wrapper.classList.add('animated-signin');
      wrapper.classList.remove('animated-signup');
    };

    const handleSignInClick = () => {
      wrapper.classList.add('animated-signup');
      wrapper.classList.remove('animated-signin');
    };

    signUpLink.addEventListener('click', handleSignUpClick);
    signInLink.addEventListener('click', handleSignInClick);

    return () => {
      signUpLink.removeEventListener('click', handleSignUpClick);
      signInLink.removeEventListener('click', handleSignInClick);
    };
  }, []);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const Register = (e) => {
    e.preventDefault();
    if (username === '' || password === '' || email === '' || confirmPassword === '') {
      alert('Please fill all the fields');
    } else if (password !== confirmPassword) {
      alert('Password does not match');
    } else {
      const data = { username, password, email, action: 'register' };
      axios.post('http://localhost/Event-Handling - Copy - Copy/src/Php_Folder/loginandregister.php', data)
        .then((response) => {
          alert(response.data.message);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const Login = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      alert('Please fill all the fields');
    } else {
      const data = { email, password, action: 'login' };
      axios.post('http://localhost/Event-Handling - Copy - Copy/src/Php_Folder/loginandregister.php', data)
        .then((response) => {
          if (response.status === 200 && response.data.message === 'Login Successful') {
            alert(response.data.message);
            navigate('/Home', { state: { value: { email: email, password: password } } });
          } else {
            alert(response.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
<div className='main_content'>
          <div className="wrapper">
        <div className="form-container sign-in">
          <div className="form">
            <h2 className='title'>LOGIN</h2>
            <div className="form-group">
              <input type="email" name="username" id="username" required placeholder='Username' onChange={handleEmailChange} />
              <i><FaUser /></i>
            </div>
            <div className="form-group">
              <input type="password" name="password" id="password" placeholder='Password' required onChange={handlePasswordChange} />
              <i><FaLock /></i>
            </div>
            <div className="forgot-pass">
              <a href="#">FORGOT PASSWORD</a>
            </div>
            <button type="submit" className='btn' onClick={Login}>login</button>
            <div className="link">
              <p>Don't have an account? <a href="#" className='signup-link'>signUp</a></p>
            </div>
          </div>
        </div>
        <div className="form-container sign-up">
          <div className="form">
            <h2>REGISTER</h2>
            <div className="form-group">
              <input type="text" name="username" id="register-username" required placeholder='Username' onChange={handleUsernameChange} />
              <i><FaUser /></i>
            </div>
            <div className="form-group">
              <input type="email" name="email" id="register-email" required placeholder='Email' onChange={handleEmailChange} />
              <i><FaEnvelope /></i>
            </div>
            <div className="form-group">
              <input type="password" name="password" id="register-password" placeholder='Password' required onChange={handlePasswordChange} />
              <i><FaLock /></i>
            </div>
            <div className="form-group">
              <input type="password" name="confirmPassword" id="register-confirmPassword" placeholder='Confirm Password' required onChange={handleConfirmPasswordChange} />
              <i><FaLock /></i>
            </div>
            <button type="submit" className='btn' onClick={Register}>REGISTER</button>
            <div className="link">
              <p>Already have an account? <a href="#" className='signin-link'>signIn</a></p>
            </div>
          </div>
        </div>  
      </div>
    </div>
  );
};

export default LoginAndRegister;
