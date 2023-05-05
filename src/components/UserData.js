import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { createClient } from '@supabase/supabase-js';
const supabase = createClient('https://hpcqpvygdcpwrzoldghm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwY3FwdnlnZGNwd3J6b2xkZ2htIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjUwMzg0NTIsImV4cCI6MTk4MDYxNDQ1Mn0.-DVUVZlZGkiylcWqO7ROJ11Y86dyHcl7ex5985WDhr8');
const UserData = (props) => {
    const {user} = props;

    const [userScores, setUserScores] = useState(null);

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

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {userScores?(<>{
            Object.keys(userScores['playedList']).map((key,index)=>(
                <>
                <ListItem alignItems="flex-start">
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