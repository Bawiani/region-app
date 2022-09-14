import {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import styles from "../styles/Modal.module.css";

const RegionModal = ({show, onClose, children})=>{
    const [isBrowser, setIsBrowser]=useState(false);

    useEffect(()=>{
        setIsBrowser(true);
    }, []);
    
    const handleClose = (e) => {
        e.preventDefault();
        onClose();
    };

    const modalContent = show ? (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <button className="btn_delete" onClick={handleClose} >Close</button>   
                </div>
                <div className={styles.body}>{children}</div>
            </div>
        </div>
    ):null;

    if(isBrowser){
        return ReactDOM.createPortal(
            modalContent,
            document.getElementById("modal-root")
        );
    }else{
        return null;
    }
};

export default RegionModal;