import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

function Register() {
  const user = {
    username: '',
    fName: '',
    Last_Name: '',
    email: '',
    gender: '',
    age: '',
    country: '',
    state: '',
    city: '',
    password: ''
  };

  const [inputs, setInputs] = useState(user);
  const [gender, setGender] = useState('');
  const [possibleVisibility, setPossibleVisibility] = useState(false);
  const Navigate=useNavigate();
  
  const submitHandler = async (e) => {
    e.preventDefault();
    inputs.gender = gender;
    console.log(inputs);
    await fetch('http://127.0.0.5:4000/user/signup', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputs)
    })
      .then(res => res.json())
      .then(data => {
         console.log(data);
          if(data.msg=='Registered Successfully')
            Navigate('/')
        resetForm();
      })
      .catch(err => console.log(err));
      
  };

  const passwordHandler = () => {
    setPossibleVisibility(!possibleVisibility);
  };

  const resetForm = () => {
    setInputs(user);
    setGender('');
  };
  return (
    <>
      <center>
        <div className="container">
          <div className="container">
            <h1><i>Registration Form</i></h1>
          </div>
          <div className="register">
            <form onSubmit={submitHandler}>
              <input
                type="text"
                name="username"
                value={inputs.username}
                onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                placeholder="Enter Your Username"
                className="form-control"
              /><br />
              <input
                type="text"
                name="fName"
                value={inputs.fName}
                onChange={(e) => setInputs({ ...inputs, fName: e.target.value })}
                placeholder="Enter Your First Name"
                className="form-control"
              /><br />
              <input
                type="text"
                name="Last_Name"
                value={inputs.Last_Name}
                onChange={(e) => setInputs({ ...inputs, Last_Name: e.target.value })}
                placeholder="Enter Your Last Name"
                className="form-control"
              /><br />
              <input
                type="email"
                name="email"
                value={inputs.email}
                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                placeholder="Enter Your Email"
                className="form-control"
              /><br />
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={(e) => setGender(e.target.value)}
              />Male&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={(e) => setGender(e.target.value)}
              />Female<br /><br />
              <input
                type="number"
                name="age"
                value={inputs.age}
                onChange={(e) => setInputs({ ...inputs, age: e.target.value })}
                placeholder="Enter Your Age"
                className="form-control"
              /><br />
              <input
                type="text"
                name="country"
                value={inputs.country}
                onChange={(e) => setInputs({ ...inputs, country: e.target.value })}
                placeholder="Enter Country"
                className="form-control"
              /><br />
              <input
                type="text"
                name="state"
                value={inputs.state}
                onChange={(e) => setInputs({ ...inputs, state: e.target.value })}
                placeholder="Enter State"
                className="form-control"
              /><br />
              <input
                type="text"
                name="city"
                value={inputs.city}
                onChange={(e) => setInputs({ ...inputs, city: e.target.value })}
                placeholder="Enter City"
                className="form-control"
              /><br />
              <input
                type={possibleVisibility ? 'text' : 'password'}
                name="password"
                value={inputs.password}
                onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                placeholder="Enter Password"
                className="form-control"
              />
              {
                possibleVisibility ?
                  <span onClick={passwordHandler}>Hide</span> :
                  <span onClick={passwordHandler}>Show</span>
              }
              <br />
              <button className="btn btn-info">Register</button><br/><br/>
                    <h3><i>If You don't have an account ?</i></h3><br/>
                    <Link to='/register'>LogIn</Link>
            </form>
          </div>
        </div>
      </center>
    </>
  );
}

export default Register;
