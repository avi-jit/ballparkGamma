import React , {useState} from 'react'
import supabase from "./config/supabaseClient"
export default function JoinRoom(props) {
    // eslint-disable-next-line
    const {questions,setJoinedRoomQuestions} = props;
    const[code,setCode] = useState(null)
    const [nameArr,setNameArr] = useState([])
    const onHandleChange=(ele)=>{
        setCode(ele.target.value)
        console.log(ele.target.value)
    }
    async function joinRoom(){
        // eslint-disable-next-line
        const {data,error} = await supabase.from('gameRoom').select('*').eq("id",code);
        if(data.length===0 || error){
            window.alert("No such game found");
            return;
        }
        setJoinedRoomQuestions(data[0].ques,code);

    }
    async function playersInRoom(){
        const {data,error} = await supabase.from('gameRoom').select('*').eq("id",code);
        if(data.length===0 || error){
            window.alert("No such game found");
            return;
        }
        console.log(data[0].scores)
        var scoreDict = data[0].scores;
        var items = Object.keys(scoreDict).map(function(key){
            return key;
        });
        
        console.log(items);
        setNameArr(items);
    }
  return (
    <div style={{width:"70%", margin:"auto"}}>
        <div className="input-group mb-3">
        <input type="text" className="form-control" value={code} onChange={onHandleChange} placeholder="Game code" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
        <div className="input-group-append">
            
            <span className="input-group-text" style={{padding:"0px"}}><button style={{ paddingBottom:"0px", paddingTop:"0px"}} className='btn bt-secondary' onClick={joinRoom}>Join room</button></span>
        </div>

        </div>
        <div>
            {nameArr.length>0?(
                <>
                {
                    nameArr.map((key,index)=>(
                       <button className='btn btn-info rounded-pill mx-1 mb-3 '>{key}</button>
                    ))
                }
                </>
            ):(
                <></>
            )}
        </div>
        <div>
        <button className="btn btn-primary mb-3 rounded-pill"  onClick={playersInRoom}>Check taken usernames</button>
        </div>
    </div>
  )
}
