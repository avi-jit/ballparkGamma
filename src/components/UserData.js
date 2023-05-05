import React, { useEffect, useState, useCallback } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { createClient } from '@supabase/supabase-js';
import StudyBoard from './StudyBoard';
import createState from "../lib/create-state";
const supabase = createClient('https://hpcqpvygdcpwrzoldghm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwY3FwdnlnZGNwd3J6b2xkZ2htIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjUwMzg0NTIsImV4cCI6MTk4MDYxNDQ1Mn0.-DVUVZlZGkiylcWqO7ROJ11Y86dyHcl7ex5985WDhr8');
const UserData = (props) => {
    const {user} = props;
    const [keys,setkeys] = useState(null)
    const [userScores, setUserScores] = useState(null);
    const [ playing, setPlaying] = useState(false);
    const [questions, setQuestions] = useState(null);
    const [state, setState] = useState(null);
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
    const getQuestions = async(key)=>{
        setkeys(key);
        const {data,error} = await supabase.from('ourWorld').select('*').eq("suffix",key);
        if(data){
            console.log(data);
            setQuestions(data);
        }
        if(error){
            console.log(error)
        }
        
          
        createStateAsync();
        playSetter();
    }
    const createStateAsync = async() => {
       
          setState(await createState(questions));
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
    if(state && questions){
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

            </>
        )
    }
  return (
    <List sx={{ width: '100%', maxWidth: 3600, bgcolor: 'background.paper' }}>
        {userScores?(
        <>
        {
            Object.keys(userScores['playedList']).map((key,index)=>(
                <>
                <ListItem alignItems="flex-start" onClick={()=>getQuestions(key)}>
        <ListItemAvatar>
          <Avatar alt={key} src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={key}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Best Score : {userScores['playedList'][key]['bestScore']}
              </Typography>
              
               / Correctness : {userScores['playedList'][key]['correct']}
               
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
                </>
            ))
        }</>):(<></>)}
      
      
    </List>
  );
}
export default UserData;