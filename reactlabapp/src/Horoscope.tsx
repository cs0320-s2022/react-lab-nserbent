import React, {useState} from 'react';
import './App.css';
//@ts-ignore
import {AwesomeButton} from "react-awesome-button";
import axios from "axios";

interface AstroProps {
    sun: string;
    moon: string;
    rising: string;
}
const TextBox = ({label, change}: {label: string; change: Function;}) => {
    return (
        <div>
            <label>{label}</label>
            <input type={'text'} onChange={e => {
                change(e.target.value)
            }
            }/>
        </div>
    );
}
function Horoscope() {
    function getHoroscope({sun:sun, moon:moon, rising:rising} : AstroProps){
        let body = {
                //@ts-ignore
                sun: sun,
                    moon: moon,
                    rising: rising
            }
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        }
        axios.post("http://localhost:4567/horoscope", body, config)
            .then(response => {
                console.log(response.data);
                setHoroscope(response.data["horoscope"])
            })
            .catch(error => {console.log(error);})

    }
    const [sun, setSun] = useState("");
    const [moon, setMoon] = useState("");
    const [rising, setRising] = useState("");
    const [horoscope, setHoroscope] = useState(["",  "", "",  "",  ""]);
    return (
        <div>
            {<TextBox label={"sun"} change={setSun}/>}
            {<TextBox label={"moon"} change={setMoon}/>}
            {<TextBox label={"rising"} change={setRising}/>}
            {/*@ts-ignore*/}
            {<AwesomeButton type="primary" onPress={() => {
                getHoroscope({sun: sun, moon: moon, rising: rising})
            }}>Submit!</AwesomeButton>}
            {horoscope.map((element) => {
                return( <p key={element.toString()}>{element}</p> )
            })}
        </div>
    );
}



export default Horoscope;
