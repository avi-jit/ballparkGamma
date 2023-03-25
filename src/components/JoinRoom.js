import React , {useState} from 'react'
import supabase from "./config/supabaseClient"
export default function JoinRoom(props) {
    // eslint-disable-next-line
    const {questions,setJoinedRoomQuestions} = props;
    const[code,setCode] = useState(null)
    const onHandleChange=(ele)=>{
        setCode(ele.target.value)
        console.log(ele.target.value)
    }
    async function joinRoom(){
        // eslint-disable-next-line
        const {data,error} = await supabase.from('gameRoom').select('*').eq("id",code);
        setJoinedRoomQuestions(data[0].ques,code);

    }
  return (
    <div style={{width:"30%", margin:"auto"}}>
        <div className="input-group mb-3">
        <input type="text" className="form-control" value={code} onChange={onHandleChange} placeholder="Game code" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
        <div className="input-group-append">
            
            <span className="input-group-text" style={{padding:"0px"}}><button style={{ paddingBottom:"0px", paddingTop:"0px"}} className='btn tbn-secondary' onClick={joinRoom}>Join room</button></span>
        </div>
        </div>
    </div>
  )
}
