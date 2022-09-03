import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {

    const [data, setData] = useState([]);
    const initialState = {
            region:"",
            capital:"",
            population:""
    };

    const [buttonText, setButtonText] = useState("Submit");
    const [buttonColor, setButtonColor] = useState(false);
    const [state, setState] = useState(initialState);
    const [message, setMessage] = useState('');

    const { region, capital, population } = state;

    useEffect(() => {
      getData();
    }, []);

    const getData = async () => {
      const response = await axios.get(process.env.NEXT_PUBLIC_API_URL);
      if (response.status === 200) {
        setData(response.data);
      }
    };

    const changeInput = (e)=>{
        let {name, value} = e.target;
        setState({...state, [name]:value});
    };

    const addRegion = async()=>{
        setButtonText("Please wait");
        setButtonColor(true);
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/region`,{
            region:region, 
            capital:capital,
            population:population
        }).then((response)=>{
          const result=response.data.data;
          setData([...data, result]);
          setMessage(response.data.message); 
        }).catch((err)=>{
          console.log(err);
            setMessage(err.response.message);
        }).finally(()=>{
            setButtonText("Submit");
            setButtonColor(false);
        });
    };

    const submitData = (e)=>{
        e.preventDefault();
        if(!region || !capital || !population){
            setMessage("Please provide value for each input field!");
        }else{
            addRegion(state);
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
        <a href="" className="active">Home</a>
      </div>
      <div className="region_container">
          <div className="region_form_container">
            <div className="region_left">
              <form className="form_container" onSubmit={submitData}>
                  <div>{message}</div>
                  <input type="text" name="region" className="reg_input" placeholder="Enter Region Name" onChange={changeInput} value={region} />
                  <input type="text" name="capital" className="reg_input" placeholder="Enter Region Capital" onChange={changeInput} value={capital} />
                  <input type="number" name="population" className="reg_input" placeholder="Enter Population" onChange={changeInput} value={population} />
                  <button type="submit" className="btn_reg" onClick={()=>{buttonColor}} style={{backgroundColor:buttonColor==true?"gray":"green"}}> {buttonText} </button>
              </form>
            </div>
            <div className="region_right">
                <div style={{ marginTop: "15px" }}>
                  <table className="styled_table">
                    <thead>
                      <tr>
                        <th style={{ textAlign: "center" }}> No. </th>
                        <th style={{ textAlign: "center" }}> Region Name </th>
                        <th style={{ textAlign: "center" }}> Regional Capital </th>
                        <th style={{ textAlign: "center" }}> Population </th>
                        <th style={{ textAlign: "center" }}> Action(s) </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data &&
                        data.map((item, index) => {
                          return (
                            <tr key={index}>
                              <th scope="row"> {index + 1} </th> 
                              <td> {item.regionname} </td>
                              <td> {item.capital} </td>
                              <td> {item.population} </td> 
                              <td> <a href={`/district/${item.regionname}`} className="btn_view">View</a></td>
                            </tr>
                          );
                        })} 
                    </tbody> 
                  </table>
                  <div> {data.length === 0 && <p style={{textAlign:"center"}}> Data not found! </p>} </div> 
                </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Home;