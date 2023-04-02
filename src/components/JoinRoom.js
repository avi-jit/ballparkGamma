import React , {useState} from 'react'
import supabase from "./config/supabaseClient"
export default function JoinRoom(props) {
    // eslint-disable-next-line
    const {questions,setJoinedRoomQuestions, name} = props;
    const[code,setCode] = useState(null)
    
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
        var items = data[0].names;
        //playersInRoom();
        
        for(let i=0; i<items.length;i++){
            if(name===items[i]){
                window.alert("Username already exists in game, please choose another one.")
                return;
            }
        }
        addPlayer(name);
        setJoinedRoomQuestions(data[0].ques,code);

    }
    async function updatePlayer(x){
        const {data,error} = await supabase.from('gameRoom').update({"names":x}).eq("id",code).select();
        console.log(data,error);
    }
    async function addPlayer(name){
        const {data,error} = await supabase.from('gameRoom').select('*').eq("id",code);
        if(data.length===0 || error){
            window.alert("No such game found");
            return;
        }
        var x = data[0].names;
        x.push(name);
        updatePlayer(x);
    }

  return (
    <>
    <div style={{width:"70%", margin:"auto"}}>
        <div className="input-group mb-3">
        <input type="text" className="form-control" value={code} onChange={onHandleChange} placeholder="Game code" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
        <div className="input-group-append">
            
            <span className="input-group-text" style={{padding:"0px"}}><button style={{ paddingBottom:"0px", paddingTop:"0px"}} className='btn bt-secondary' onClick={joinRoom}>Join room</button></span>
        </div>

        </div>
        
          
    </div>
    <div>
        <button className="btn btn-info" style={{width:"34%", marginRight:"2%"}} onClick={joinRoom}>Join Game</button>
        <button className="btn btn-info " style={{width:"34%"}} onClick={{}}>Leave Game</button>
      </div> 
    </>
    
  )
}
