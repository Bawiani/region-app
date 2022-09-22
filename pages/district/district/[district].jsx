import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
const District = () =>{
    const initialState = {
        district_name:'', district_capital:'', district_location:'', district_population:'', dce_name:'', region_id:''
    };
    const [state, setState] = useState(initialState);
    const { district_name, district_capital, district_location, district_population, dce_name, region_id } = state;
    
    const [buttonColor, setButtonColor] = useState(false);
    const [buttonText, setButtonText] = useState("Update");
    const [message, setMessage] = useState('');

    const router = useRouter();
    const id = router.query.district;

    useEffect(()=>{
        if(id){
            getData(id);
        }
    }, [id]);
    
    const getData = async() => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/district/district/${id}`)
        .then((response) =>{
            const data = response.data;
            setState(data);
        }).catch((err)=>{
            console.log(err.response);
        });
    };

    const handleInput = (e)=>{
        let {name, value} = e.target;
        setState({...state, [name]:value});
    }

    const updateDistrict = async() =>{
        setButtonText("Please wait");
        setButtonColor(true);
        await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/district/district/${id}`,{
            district_name:district_name, district_capital:district_capital, district_location:district_location, district_population:district_population, dce_name:dce_name
        }).then((response)=>{
            setMessage(response.data.message);
        }).catch((err)=>{
            console.log(err.rosponse.message);
        }).finally(()=>{
            setButtonText("Update");
            setButtonColor(false);
            router.push(`/district/${region_id}`);
        });
    };

    const submitData = (e)=>{
        e.preventDefault();
        if(!district_name || !district_capital || !district_location || !district_population || !dce_name){
            setMessage("Please provide value for each input field!");
        }else{
            updateDistrict(state);
        }
    };

    return (
        <div>
            <div className="nav">
                <a href="/" className="active">Home</a>
            </div>
            <div className="region_form_container">
                <div className="panel">
                    <div className="panel-body">
                        <form className="form_container" onSubmit={submitData}>
                            <div>{message}</div>
                            <input type="text" name="district_name" className="reg_input" placeholder="Enter District Name" onChange={handleInput} value={district_name}  />
                            <input type="text" name="district_capital" className="reg_input" placeholder="Enter District Capital" onChange={handleInput} value={district_capital} />
                            <input type="text" name="district_location" className="reg_input" placeholder="Enter District Location" onChange={handleInput} value={district_location} />
                            <input type="number" name="district_population" className="reg_input" placeholder="Enter District Population" onChange={handleInput} value={district_population} />
                            <input type="text" name="dce_name" className="reg_input" placeholder="Enter Name of DCE/MCE" onChange={handleInput} value={dce_name} />
                            <button type="submit" className="btn_reg" onClick={()=>{buttonColor}} style={{backgroundColor:buttonColor==true?"gray":"green"}} >{buttonText}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}; 
export default District;