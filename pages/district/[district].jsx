import Head from "next/head";
import Image from "next/image";
import DistrictModal from "../../components/districtmodal";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import axios from "axios";

const District = () => {
    const initialState = {
        district_name:'', district_capital:'', district_location:'', district_population:'', dce_name:''
    };

    const [state, setState] = useState(initialState)
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState([]);
    const [message, setMessage] = useState('');
    const [buttonColor, setButtonColor] = useState(false);
    const [buttonText, setButtonText] = useState("Submit");

    const {district_name, district_capital, district_location, district_population, dce_name} = state;

    const handleInput = (e)=>{
        let {name, value} = e.target;
        setState({...state,[name]:value});
    };

    const router = useRouter();

    const id  = router.query.district
    
    useEffect(()=>{
        if(id){
            getData(id);
        }
    }, [id]);
    
    const getData = async() => {
        
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/district/${id}`).then((response) => {
            if(response.status === 200){
            setData(response.data);
        }
        }); 
    };

    
    
    const addDistrict = async() =>{

        setButtonText("Please wait");
        setButtonColor(true);
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/district/${id}`, {
            district_name:district_name, district_capital:district_capital, district_location:district_location, district_population:district_population, dce_name:dce_name
        }).then((response)=>{
            const result = response.data.data;
            setData([...data, result]);
            setMessage(response.data.message);
            setState(initialState);
        }).catch((err)=>{
            console.log(err.response.message);
        }).finally(()=>{
            setButtonText("Submit");
            setButtonColor(false);
            setMessage("");
            setShowModal(false);
        });
    };

    const submitData = (e)=>{
        e.preventDefault();
        if(!district_name || !district_capital || !district_location || !district_population || !dce_name){
            console.log('Please provide value for each input field!');
        }else{
            addDistrict(state);
        }
    };

    const resetFields = ()=>{
        setState(initialState);
    };

    const onDelete = async (_id) => {
        if(window.confirm("Are you sure you want to delete this district!")){
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/district/${_id}`);
            if(response.status === 200){
                getData();
                window.alert("Record deleted successfully!");
            }
        }
    };
    return(
        <div>
            <div className="nav">
                <a href="/" className="active">Home</a>
            </div>
            <div className="showmodal">
                <button type="button" className="btn_showmodal" onClick={()=>setShowModal(true)}>Add District</button>
            </div>
            <DistrictModal show={showModal} onClose={()=>{setShowModal(false)}} >
                <div className="panel">
                    <div className="panel-body">
                        <form className="form_container" onSubmit={submitData}>
                            <div>{message}</div>
                            <input type="text" name="district_name" className="reg_input" placeholder="Enter District Name" onChange={handleInput} value={district_name}  />
                            <input type="text" name="district_capital" className="reg_input" placeholder="Enter District Capital" onChange={handleInput} value={district_capital} />
                            <input type="text" name="district_location" className="reg_input" placeholder="Enter District Location" onChange={handleInput} value={district_location} />
                            <input type="number" name="district_population" className="reg_input" placeholder="Enter District Population" onChange={handleInput} value={district_population} />
                            <input type="text" name="dce_name" className="reg_input" placeholder="Enter Name of DCE/MCE" onChange={handleInput} value={dce_name} />
                            <div>
                                <button type="submit" className="btn_reg" onClick={()=>{buttonColor}} style={{backgroundColor:buttonColor==true?"gray":"green"}} > {buttonText} </button>&nbsp;
                                <button type="reset" className="btn_reset" onClick={resetFields}> Reset </button>
                            </div>
                        </form>
                    </div>
                </div>
            </DistrictModal>
            
            <div className="panel">
                <div className="panel-body">
                    <div className="panel-table">
                        <table className="styled_table">
                            <thead>
                                <tr>
                                    <th style={{textAlign: "center"}}>No.</th>
                                    <th style={{textAlign: "center"}}>District Name</th>
                                    <th style={{textAlign: "center"}}>District Capital</th>
                                    <th style={{textAlign: "center"}}>Location</th>
                                    <th style={{textAlign: "center"}}>Population</th>
                                    <th style={{textAlign: "center"}}>Name of DCE/MEC</th>
                                    <th style={{textAlign: "center"}}>Action(s)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data &&
                                    data.map((item, index) =>{
                                        return(
                                            <tr key={index}>
                                                <th scope="row"> {index + 1} </th>
                                                <td> {item.district_name} </td>
                                                <td> {item.district_capital} </td>
                                                <td> {item.district_location} </td>
                                                <td> {item.district_population} </td>
                                                <td> {item.dce_name} </td>
                                                <td>
                                                    <a href={`/district/district/${item._id}`} className="btn_edit">Edit</a>&nbsp;
                                                    <a className="btn_delete" onClick={()=> onDelete(`${item._id}`)}>Delete</a>
                                                </td>
                                            </tr>
                                        );
                                })
                            }
                            </tbody>
                        </table>
                        <div>{data.length === 0 && <p style={{textAlign: "center"}}> Data not found!</p>}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default District;