import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import UserData from './UserData';



const supabase = createClient('https://hpcqpvygdcpwrzoldghm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwY3FwdnlnZGNwd3J6b2xkZ2htIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjUwMzg0NTIsImV4cCI6MTk4MDYxNDQ1Mn0.-DVUVZlZGkiylcWqO7ROJ11Y86dyHcl7ex5985WDhr8');
const StudyMode = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const createUser = async ()=>{
        const {data,error}= await supabase.from('userQuestions').insert({'email':user,}).select()
        console.log(data);
        console.log(error);
      }
    const getUserData = async()=>{
        if(user){
            const {data,error} = await supabase.from('userQuestions').select('*').eq("email",user);
            console.log(data);
            if(data.length===0){
                console.log("ye chalrha")
                createUser();
            }
            if(data.length!==0){
                console.log("isme chala");
            }
            if(error){
                console.log(error);
            }
        }
      }
    checkUser();
    getUserData();
  }, [user]);
  
  
  const checkUser = async () => {
    const session = await supabase.auth.getSession();
    console.log(session.data.session.user.email)
    setUser(session.data.session.user.email?session.data.session.user.email:null);
  };

  const handleLogin = async (response) => {
    const { id_token } = response;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      idToken: id_token,
    });

    if (error) {
      console.error('Error signing in with Google:', error);
    } else {
      checkUser();
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    } else {
      setUser(null);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <p style={{color:"white"}}>Welcome, {user}</p>
          <UserData user={user}/>
          <button className="btn btn-secondary rounded-pill"onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h2 style={{color:"white"}}>Login/Signup</h2>
          <button className="btn btn-secondary rounded-pill" onClick={handleLogin}>Login</button>
        <br />
        </div>
      )}
    </div>
  );
};

export default StudyMode;
