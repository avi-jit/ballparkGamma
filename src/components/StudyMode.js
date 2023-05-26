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
        <div >
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",backgroundColor:"white", color:"black", margin:"15px", borderRadius:"10px"}}>
            <br />
          <div style={{textAlign:"left", flex:1, wordBreak:"break-all"}}>
          <h4 style={{margin:"15px"}} >Welcome, {user}</h4>
          <p style={{margin:"15px"}}>Double click on a deck to start practising.</p>
          </div>
          <img src="/images/studyMode.webp" alt="h" style={{textAlign:"right", height:"300px" ,'@media (max-width:480px)':{height:"60px"}}} />
          <br />
          </div>
          
          <UserData user={user}/>
          <button className="btn btn-secondary rounded-pill mt-2"onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h2 style={{color:"white"}}>Login/Signup</h2>
          <button className="btn btn-secondary rounded-pill mt-2" onClick={handleLogin}>Login with Google</button>
        <br />
        </div>
      )}
    </div>
  );
};

export default StudyMode;
