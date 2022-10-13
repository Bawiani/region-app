import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import axios from "axios";

const Region = () => {
    const initialState ={
      name:'', capital:'', population:''
    }

    const [state, setState] = useState(initialState);
    const [buttonText, setButtonText] = useState("Update");
    const [buttonColor, setButtonColor] = useState(false);
    const [message, setMessage] = useState('');
    const {name, capital, population} = state;

    const router = useRouter();

    const id  = router.query.regions;

    useEffect(() => {
        if(id) {
            getData(id);
        }
    }, [id]);

    const getData = async() => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/regions/${id}`)
      .then((response)=>{
            if(response.status === 200){
              const data = response.data;
              setState(data);
            }
        }).catch((err)=>{
            console.log(err.response);
        });
    };

    const handleInput = (e)=>{
      let {name, value} = e.target;
      setState({...state, [name]:value});
    };

    const updateRegion = async() => {
        setButtonText("Please wait");
        setButtonColor(true);
        await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/regions/${id}`, {
            name:name, capital:capital, population:population
        }).then((response) => {
            setMessage(response.data.message); 
        }).catch((err) => {
          setMessage(err.response.message);
        }).finally(()=>{
          setButtonText("Update");
          setButtonColor(false);
          router.push('/regions');
        });
    };
    const submitData = (e)=>{
        e.preventDefault();
        if(!name || !capital || !population){
            setMessage("Please provide value for each input field!");
        }else{
          updateRegion(state);
        }
    };
  return (
    <div>
      <Head>
        <title> Create Next App </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="nav">
        <a href="/" className="active">Home</a>
      </div>
      <div className="region_form_container">
          <div className="panel">
            <div className="panel-body">
              <form className="form_container" onSubmit={submitData}>
                <div>{message}</div>
                <input type="text" name="name" className="reg_input" placeholder="Enter Region Name" onChange={handleInput} value={name} />
                <input type="text" name="capital" className="reg_input" placeholder="Enter Region Capital" onChange={handleInput} value={capital} />
                <input type="number" name="population" className="reg_input" placeholder="Enter Population" onChange={handleInput} value={population} />
                <button type="submit" className="btn_reg" onClick={()=>{buttonColor}} style={{backgroundColor:buttonColor==true?"gray":"green"}}> {buttonText} </button>
              </form>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Region;