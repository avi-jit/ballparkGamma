import React, { useEffect, useState, useCallback } from 'react';

//import Avatar from '@mui/material/Avatar';

import {Card} from  'antd';
import imageList from '../lib/imageList';
import { createClient } from '@supabase/supabase-js';
import StudyBoard from './StudyBoard';
import createState from "../lib/create-state-beta";
import Grid from '@mui/material/Grid';
import studySuff from '../lib/studySuff';

const supabase = createClient('https://hpcqpvygdcpwrzoldghm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwY3FwdnlnZGNwd3J6b2xkZ2htIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjUwMzg0NTIsImV4cCI6MTk4MDYxNDQ1Mn0.-DVUVZlZGkiylcWqO7ROJ11Y86dyHcl7ex5985WDhr8');
const {Meta} = Card;
const UserData = (props) => {
    const {user} = props;
    const [keys,setkeys] = useState(null)
    const [userScores, setUserScores] = useState(null);
    const [userQids,setUserQids] = useState(null);
    const [userPlayed,setUserPlayed] = useState(null);
    const [ playing, setPlaying] = useState(false);
    const [questions, setQuestions] = useState(null);
    const [state, setState] = useState(null);
    const [menu, setMenu] = useState(false);
    const [highscore, setHighscore] = useState(
        Number(localStorage.getItem("highscore") ?? "0")
      );
    useEffect(()=>{
        const getUserScores =async()=>{
            const {data,error} = await supabase.from('userQuestions').select('*').eq("email",user);
        console.log(data);
        if(data.length!==0){
            console.log("isme chala");
            setUserScores(data[0])
            setUserQids(data[0]['nextList'])
        }
        if(error){
            console.log(error);
        }

        }
        getUserScores();
    },[user])
    const updateHighscore = useCallback((score) => {
        localStorage.setItem("highscore", String(score));
        setHighscore(score);
      }, []);
    const getQuestion = (key)=>{
        getQuestions(key)
        getQuestions(key)
    }
    const getQuestions = async(key)=>{
        setkeys(key);
        setMenu(true);
        const {data,error} = await supabase.from('ourWorld').select('*').eq("suffix",key);
        if(data){
            console.log(data);
            setQuestions(data);
            var x = []
            var y = []
            for(let i=0; i<data.length; i++){
                console.log(userQids[data[i]['id']])
                if(userQids[data[i]['id']]===0){
                    x.push(data[i])
                    //console.log(userQids[data[i]['id']])
                }
                if(userQids[data[i]['id']]===1){
                    y.push(data[i])
                }
            }
            setQuestions(x)
            setUserPlayed(y)
        }
        if(error){
            console.log(error)
        }
        
          
        createStateAsync();
        playSetter();
    }
    const createStateAsync = async() => {
       
          setState(await createState(questions,userPlayed));
          console.log("working")
        
    };
    const resetGame = useCallback(() => {
        const resetGameAsync = async () => {
          window.location.reload();
          
          
        };
    
        resetGameAsync();
        // eslint-disable-next-line
      }, [questions]);
    const playSetter = ()=>{
        setPlaying(!playing);
    }
    if(state && questions && menu){
        return (
            <>
            <StudyBoard
            highscore={highscore}
            state={state}
            setState={setState}
            resetGame={resetGame}
            updateHighscore={updateHighscore}
            keys = {keys}
            email = {user}
            />
            <button className="btn btn-secondary rounded-pill mt-2 mr-2"onClick={()=>{setMenu(false); setQuestions(null); setState(null)}}>Main menu</button>
            </>
        )
    }
  return (
    <>
        {userScores?(
            <div style={{justifyContent:'center',margin:"15px"}}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 2, md: 3 }}sx={{justifyContent:'center',margin:"3px"}}>
        {
            Object.keys(userScores['playedList']).map((key,index)=>(
                <>
                <Grid item xs={4} sm={2} md={1}  >
                {/*<Avatar   src={imageList[index]} sx={{ width: 56, height: 56, display: 'inline-block' }} onClick={()=>getQuestions(key)} />*/}
                <Card
                hoverable
                style={{ leftMargin:"2px"}}
                onClick={()=>getQuestion(key)}
                cover = {<img alt="example" src={imageList[index]} style={{height:100}}/>}
                >
                    
                    <Meta description={userScores['playedList'][key]['bestScore']/userScores['playedList'][key]['correct']<=0.4?(<><p style={{color:'red'}}>{studySuff[key]}</p></>)
                  :
                  (<>{userScores['playedList'][key]['bestScore']/userScores['playedList'][key]['correct']<=0.8?(<p style={{color:'orange'}}>{studySuff[key]}</p>):(
                    <p style={{color:'green'}}>{studySuff[key]}</p>
                  )}</>)
                  }  style={{color:'red'}}/>
                </Card>
                  
                  
                 
                  
                </Grid>
       
          
          
        
        
      
                </>
            ))
        } </Grid>
       
        </div>):(<></>)}
      
      
    </>
  );
}
export default UserData;