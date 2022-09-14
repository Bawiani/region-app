import Link from 'next/link';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Signup = ()=> {
    
  const initialState = {
  firstname:"", lastname:"", email:"", password:"",
};
const [state, setState] = useState(initialState);
const {firstname, lastname, email, password} = state;
const [error, setError] = useState("");

  const changeInput = (e) => {
    let {name,value} = e.target;
    setState({...state, [name]:value});
  };

  const addUser = async()=>{
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
      firstname:firstname, lastname:lastname, email:email, password:password,
    }).then((response)=>{
      //{"/login"};
      console.log(response.data);
    }).catch((error)=>{
      if(error.response && error.response.status >= 400 && error.response.status <= 500){
              setError(error.response.data.message);
            }
    });
  };

  const submitData = (e) => {
    e.preventDefault();
    if(!firstname || !lastname || !email || !password){
      console.log("Please provide value for each input feild!");
    }else{
      addUser(state);      
    }
  };

    return (
        <div>
            <div className="account_container">
                <div className="account_form_container">
                    <div className="left">
                        <h1>Welcome Back</h1>
                        <Link href={"/login"}>
                            <button type='button' className="white_btn">Sign in</button>
                        </Link>
                    </div>
                    <div className="right">
                        <form className="form_container" onSubmit={submitData}>
                            <h1>Create Account</h1>
                            <input type="text" className='account_input' name="firstname" placeholder="Enter First Name" onChange={changeInput} value={firstname} />
                            <input type="text" className='account_input' name="lastname" placeholder="Enter Last Name" onChange={changeInput} value={lastname} />
                            <input type="email" className='account_input' name="email" placeholder="Enter Email" onChange={changeInput} value={email} />
                            <input type="password" className='account_input' name="password" placeholder="Enter Password" onChange={changeInput} value={password} />
                            <button type="submit" className="green_btn">Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Signup;