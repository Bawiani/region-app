import Link from 'next/link';
import {useState} from 'react';
import axios from 'axios';
const Login = () => {

    const [state, setState] = useState ({
        email:"", 
        password:"",
    });
    const { email, password } = state;

    const changeInput = (e)=>{
        let {name, value} = e.target;
        setState({...state, [name]:value});
    };

    const logIn = async()=>{
        await axios.post("http://localhost:3000/auth",{
            email:email, password:password,
        }).then((response) =>{
            localStorage.setItem("token", response.data);
            window.location.assign("/region");
        }).catch((err)=>{
            console.log(err.response);
        });
    };

    const submitData = (e) =>{
        e.preventDefault();
        if(!email || !password){
            console.log("Please provide value for each input field!");
        }else{
            logIn(state);
        }
    };


    return (
        <div>
            <div className="account_container">
                <div className="account_form_container">
                    <div className="login_left">
                        <form className="form_container" onSubmit={submitData}>
                            <h1>Login to Your Account</h1>
                            <input type="email" className='account_input' name="email" placeholder="Enter Email" onChange={changeInput} value={email} />
                            <input type="password" className='account_input' name="password" placeholder="Enter Password" onChange={changeInput} value={password} />
                            <button type="submit" className="green_btn">Sign In</button>
                        </form>
                    </div>
                    <div className="login_right">
                        <h1>New Here?</h1>
                        <Link href={"/signup"}>
                            <button type='button' className="white_btn">Sign up</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;