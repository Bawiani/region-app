import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
const District = () =>{
    const initialState = {
        name:'', capital:'', location:'', population:'', dce_name:'', region_id:''
    };
    const [state, setState] = useState(initialState);
    const { name, capital, location, population, dce_name, region_id } = state;
    
    const [buttonColor, setButtonColor] = useState(false);
    const [buttonText, setButtonText] = useState("Update");
    const [message, setMessage] = useState('');

    const router = useRouter();
    const id = router.query.districts;

    useEffect(()=>{
        if(id){
            getData(id);
        }
    }, [id]);
    
    const getData = async() => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/districts/${id}`)
        .then((response) =>{
            const data = response.data;
            setState(data);
        }).catch((err)=>{
            console.log(err.response.message);
        });
    };

    const handleInput = (e)=>{
        let {name, value} = e.target;
        setState({...state, [name]:value});
    }

    const updateDistrict = async() =>{
        setButtonText("Please wait");
        setButtonColor(true);
        await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/districts/${id}`,{
            name:name, capital:capital, location:location, population:population, dce_name:dce_name
        }).then((response)=>{
            setMessage(response.data.message);
        }).catch((err)=>{
            console.log(err.response.message);
        }).finally((response)=>{
            setButtonText("Update");
            setButtonColor(false);
            router.push(`/regions/${region_id}/districts`);
        });
    };

    const submitData = (e)=>{
        e.preventDefault();
        if(!name || !capital || !location || !population || !dce_name){
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
                            <input type="text" name="name" className="reg_input" placeholder="Enter District Name" onChange={handleInput} value={name}  />
                            <input type="text" name="capital" className="reg_input" placeholder="Enter District Capital" onChange={handleInput} value={capital} />
                            <input type="text" name="location" className="reg_input" placeholder="Enter District Location" onChange={handleInput} value={location} />
                            <input type="number" name="population" className="reg_input" placeholder="Enter District Population" onChange={handleInput} value={population} />
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