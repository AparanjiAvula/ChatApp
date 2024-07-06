import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';

function Login() {
  const [user,setUser]=useState({
    email:'',
    password:''
  })
 
  const navigate=useNavigate();
  useEffect(()=>{
    fetch('http://127.0.0.5:4000/')
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
  },[])

  const submitHandler = async (e) =>{
    e.preventDefault();
    await fetch('http://127.0.0.5:4000/user/login', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if(data.message=='Login successfully');
         navigate('/home');
      })
      .catch(err => console.log(err));
    };


  return (
    <>
    <center>
           <div className="container log">
           <div className="container">
           <h1><i>Login Form</i></h1>
           </div>
           <div className="register login">
                <form onSubmit={submitHandler}>
                    <input type="email" name='email'
                     value={user.email}
                     onChange={(e)=>setUser({...user,email:e.target.value})}
                     placeholder='Enter Your Email'
                     className='form-control'/><br/>
                    <input type="password" name='password'
                    value={user.password}
                    onChange={(e)=>setUser({...user,password:e.target.value})}
                     placeholder='Enter  password'
                      className='form-control'/><br/>
                    <button className="btn btn-dark">LogIn</button><br/><br/>
                    <h3><i>If You don't have an account ?</i></h3>
                    <Link to='/register'>Register</Link>
                </form>
           </div>
           </div>
       </center>
    </>
  )
}

export default Login