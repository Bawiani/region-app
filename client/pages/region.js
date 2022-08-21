import { useState } from "react";
import axios from 'axios';
const Region = () => {
    const initialState = {
        region:"",
        district:""
    };

    const [state, setState] = useState(initialState);

    const { region, district } = state;

    const changeInput = (e)=>{
        let {name, value} = e.target;
        setState({...state, [name]:value});
    };

    const addRegion = async()=>{
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/region`,{
            region:region, district:district
        }).then((response)=>{
            console.log(response.data);
        }).catch((err)=>{
            console.log(err.response);
        });
    };

    const submitData = (e)=>{
        e.preventDefault();
        if(!region || !district){
            console.log("Please provide value for each input field!");
        }else{
            addRegion(state);
        }
    };
    return (
        <div>
            <div className="nav">
                <a href="/" className="active">Home</a>
                <a href="">News</a>
                <a href="">Contact</a>
                <a href="">About</a>
                <a href="/" className="logout">Logout</a>
            </div>
            <div className="region_container">
                <div className="region_form_container">
                    <form className="form_container" onSubmit={submitData}>
                        <input type="text" name="region" className="reg_input" placeholder="Enter Region Name" onChange={changeInput} value={region} />
                        <input type="text" name="district" className="reg_input" placeholder="Enter District Name" onChange={changeInput} value={district} />
                        <button type="submit" className="btn_reg"> Submit </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Region;