import * as React from 'react';
import  Sound from 'react-sound';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Switch from '@material-ui/core/Switch';

import TextField from '@mui/material/TextField'; 
import Rodal from 'rodal';
import { messaging, firestore} from './firebase';
import Button from '@mui/material/Button';
 
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import 'rodal/lib/rodal.css';
import ReactGA from 'react-ga4';
import Mixpanel from 'mixpanel-browser';
Mixpanel.init('2a40b97bb7489509f0ac425303cd49d7');

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });
 

function Header() {
  const timeAlter = (val)=>{
    var x = "";
    x+=val[0];
    x+=val[1];
    x+=":";
    x+=val[2];
    x+=val[3];
    return x;
  }
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [visible,setVisible] = React.useState(false);
  const [notRodal,setNotRodal] = React.useState(false);
  const [playRodal, setPlayRodal] = React.useState(false);
  const [isSoundOn,setIsSoundOn] = React.useState(true);
  const [isMusicOn,setIsMusicOn] = React.useState(false);
  const [isNotificationsOn, setIsNotificationsOn] = React.useState(false);
  const [token, setToken] = React.useState(false);
  const [timeVal, setTimeVal] = React.useState(localStorage.getItem("subscription")?timeAlter(localStorage.getItem("subscription")):"10:00");
  
  const handleChange = (newValue)=>   
{  
    setTimeVal(newValue.target.value);  
    console.log(newValue.target.value);
  };  
  
  
  React.useEffect(()=>{
    
    if('serviceWorker' in navigator){
      window.addEventListener('load',()=>{
        navigator.serviceWorker.register('./serviceworker.js')
        .then((reg)=>console.log('Success:', reg.scope))
        .catch((err)=>console.log(err));
      })

      
          
        
      
    }
    let deferredPrompt;
    var div = document.querySelector('.add-to');
    console.log(div);
    var button = document.querySelector('.add-to-btn');
    div.style.display = 'none';
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI notify the user they can install the PWA
      div.style.display = 'flex';
      // Optionally, send analytics event that PWA install promo was shown.
      console.log(`'beforeinstallprompt' event was fired.`);
      button.addEventListener('click', async () => {
        // Hide the app provided install promotion
        ReactGA.event({
          category: 'Button Clicks',
          action: "Install PWA",
        });
        
        Mixpanel.track("Install PWA", { button: "click" });
        div.style.display = 'none';
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        // Optionally, send analytics event with outcome of user choice
        console.log(`User response to the install prompt: ${outcome}`);
        // We've used the prompt, and can't use it again, throw it away
        deferredPrompt = null;
      });
    });
    var divIOS = document.querySelector('.add-ios');
      console.log(divIOS);
      console.log(window.navigator.userAgent.indexOf("Mac"));
      if(window.navigator.userAgent.indexOf("Mac")===-1){
        divIOS.style.display = 'none';
      }
      if(window.navigator.userAgent.indexOf("Mac")!==-1){
        div.style.display = 'none';
        if(navigator.standalone){
        divIOS.style.display = 'none';
      }
      }
      
      var iosButton = document.querySelector('.add-to-ios-btn');
      iosButton.addEventListener('click',()=>{
        window.alert("Click on Share, and then add to Home screen.");
      })
      const requestPermission = async () => {
        try {
          const permissionStatus = await Notification.requestPermission();
          if (permissionStatus === 'granted') {
            const currentToken = await messaging.getToken();
            const tokenRef = firestore.collection('tokens').doc(currentToken);

            // Update the document if it exists or create a new one if it doesn't
            tokenRef.set({
              // Add any additional data you want to store for each token
             userId: "harsh"
            }, { merge: true });
            
            setIsNotificationsOn(true);
            localStorage.setItem("isNotificationsOn",true);
            console.log(currentToken);
            setToken(currentToken);
            const RegTokens = []
            RegTokens.push(currentToken);
            //console.log(typeof currentToken)
            //subsFunc(currentToken, "noon");
            //window.alert("Notifications subscribed");
          }
        } catch (error) {
          console.error('Push notification permission error:', error);
        }
      };
      
      requestPermission();

  
    
    
    const SoundSwitch=()=>{
      if(localStorage.getItem("isSoundOn")===null){
        setIsSoundOn(true);
      }
      if(localStorage.getItem("isSoundOn")==="true"){
        setIsSoundOn(true);
      }
      if(localStorage.getItem("isSoundOn")==="false"){
        setIsSoundOn(false);
      }
    }
    const helpSwitch=()=>{
      if(localStorage.getItem("isHelpOn")===null){
        setPlayRodal(true);
      }
      if(localStorage.getItem("isHelpOn")==="true"){
        setPlayRodal(true);
      }
      if(localStorage.getItem("isHelpOn")==="false"){
        setPlayRodal(false);
      }
    }
    var permissionButton = document.querySelector('.notificationsToggle')
    permissionButton.addEventListener('click', ()=>{
      //window.alert("-Android and Mac users: Change these settings from browser itself \n-iOS users: Go to Settings> Safari> Turn off Block Pop-ups\nThen go to Advanced> Experimental Eeatures> configure push API");
      console.log("done")
    })
    
    SoundSwitch();
    helpSwitch();
    
    
  },[setIsSoundOn,setIsMusicOn, isNotificationsOn])
  
  const handleSoundToggle = ()=>{
    setIsSoundOn(!isSoundOn);
    localStorage.setItem("isSoundOn",!isSoundOn);
  };
  const handleMusicToggle = ()=>{
    setIsMusicOn(!isMusicOn);
    localStorage.setItem("isMusicOn",!isMusicOn);
  };
const subsFunc = () => {
    // Use the FCM REST API directly in your React app to subscribe the user to a topic
    // This exposes the FCM Server Key in your client-side code, which is not recommended for production apps
    // This s// Check if token and topic are provided
    //setTimeVal("morning");

if (!token || !timeVal) {
console.error('Error: Invalid token or topic.');
return;
}
const topic = timeVal.replace(':','');
// Construct the FCM API endpoint URL
const fcmUrl = 'https://iid.googleapis.com/iid/v1:batchAdd';

// Construct the request body
const requestBody = {
to: `/topics/${topic}`,
registration_tokens: [token],
};

// Set the FCM Server Key
const fcmServerKey = 'AAAAnICAHLQ:APA91bF2U8GPqG6iMO7d5K_VkOA1_P12n0pFv75Lhw3XVC5Dp8OB_kScl9E4OuniLXF0IiQ2nvk3NdRm40MGftTXIV6JBycTZCHmWvJtMKNjXez9ugtorsfhnTyu7eAS4-muMaL77d4m'; // Replace with your actual FCM Server Key

// Make the fetch request to subscribe the user to the topic
fetch(fcmUrl, {
method: 'POST',
headers: {
  'Authorization': `key=${fcmServerKey}`,
  'Content-Type': 'application/json',
},
body: JSON.stringify(requestBody),
})
.then((response) => {
if (!response.ok) {
  throw new Error('Network response was not ok');
}
return response.json();
})
.then((data) => {
console.log('Subscription successful:', data);
})
.catch((error) => {
console.error('Error subscribing user:', error);
});
};
const unsubsFunc = (token, topic) => {
  // Check if token and topic are provided
  
  if (!token || !topic) {
    console.error('Error: Invalid token or topic.');
    return;
  }
  topic = topic.replace(':','');
  // Construct the FCM API endpoint URL
  const fcmUrl = 'https://iid.googleapis.com/iid/v1:batchRemove';

  // Construct the request body
  const requestBody = {
    to: `/topics/${topic}`,
    registration_tokens: [token],
  };

  // Set the FCM Server Key
  const fcmServerKey = 'AAAAnICAHLQ:APA91bF2U8GPqG6iMO7d5K_VkOA1_P12n0pFv75Lhw3XVC5Dp8OB_kScl9E4OuniLXF0IiQ2nvk3NdRm40MGftTXIV6JBycTZCHmWvJtMKNjXez9ugtorsfhnTyu7eAS4-muMaL77d4m'; // Replace with your actual FCM Server Key

  // Make the fetch request to unsubscribe the user from the topic
  fetch(fcmUrl, {
    method: 'POST',
    headers: {
      'Authorization': `key=${fcmServerKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    console.log('Unsubscription successful:', data);
  })
  .catch((error) => {
    console.error('Error unsubscribing user:', error);
  });
};

function nearestHour(timeString) {
  const [hours, minutes] = timeString.split(':').map(Number);
  let nearestHour;

  if (minutes >= 30) {
    nearestHour = (hours + 1) % 24;
  } else {
    nearestHour = hours;
  }

  return String(nearestHour).padStart(2, '0') + ':00';
}
  const subscribe = () =>{
    const unsubscribeTopic = localStorage.getItem("subscription");
    //console.log(token,unsubscribeTopic);
    //console.log(typeof unsubscribeTopic, typeof timeVal)
    unsubsFunc(token,unsubscribeTopic);
    console.log(nearestHour(timeVal));
    localStorage.setItem("subscription",nearestHour(timeVal).replace(":",""));
    setTimeVal(nearestHour(timeVal));
    subsFunc();
    window.alert("Subscribed to notifications, refresh to view changes.")

  }
  const handleSoundMenu = ()=>{
    //console.log(isSoundOn)
  }
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const show = ()=>{
    setVisible(true);
  }

  const hide = ()=>{
    setVisible(false);
  }
  const notRodalShow = ()=>{
    setNotRodal(true);
  }
  const notRodalHide = ()=>{
    setNotRodal(false);
  }
  const playRodalShow = ()=>{
    setPlayRodal(true);
  }
  const playRodalHide = ()=>{
    setPlayRodal(false);
    localStorage.setItem("isHelpOn",false);
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    
  };
  const handleCloseAboutMenu = () => {
    ReactGA.event({
      category: 'Button Clicks',
      action: "About",
    });
    
    Mixpanel.track("About", { button: "click" });
    setAnchorElNav(null);
    show();
  };
  const handleClosePlayMenu = () => {
    ReactGA.event({
      category: 'Button Clicks',
      action: "How to play?",
    });
    
    Mixpanel.track("How to play?", { button: "click" });
    setAnchorElNav(null);
    playRodalShow();
  };
  const handleCloseNotificationsMenu = () => {
    ReactGA.event({
      category: 'Button Clicks',
      action: "Notifications",
    });
    
    Mixpanel.track("Notifications", { button: "click" });
    setAnchorElNav(null);
    notRodalShow();
    //window.alert("-Android and Mac users: Change these settings from browser itself \n-iOS users: Go to Settings> Safari> Turn off Block Pop-ups\nThen go to Advanced> Experimental Eeatures> configure push API");
    
  };
  const handleHomeCloseNavMenu = () => {
    setAnchorElNav(null);
    window.location.reload();
  };
  
  
 

  return (
    <>
    
    <ThemeProvider theme={darkTheme}>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Ballpark
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              
                <MenuItem key={1} onClick={handleHomeCloseNavMenu}>
                  <Typography textAlign="center" href="/">Home</Typography>
                </MenuItem>
                <MenuItem key={2} onClick={handleCloseAboutMenu}>
                  <Typography textAlign="center" href="/">About</Typography>
                </MenuItem>
                
                
                <MenuItem key={3} onClick={handleSoundMenu}>
                  <Typography textAlign="center" href="/">Sound
                <Switch id='sound-toggle' checked={isSoundOn} onChange={handleSoundToggle} color='secondary'/> </Typography>
                </MenuItem>
                <MenuItem key={4} onClick={handleSoundMenu}>
                  <Typography textAlign="center" href="/">Music
                <Switch id='Music-toggle' checked={isMusicOn} onChange={handleMusicToggle} color='secondary'/> </Typography>
                <Sound url={'audio/Only the Braves - FiftySounds.mp3'} playStatus={isMusicOn ? Sound.status.PLAYING : Sound.status.STOPPED} loop={true}/>
                </MenuItem>
                <MenuItem key={5} onClick={handleCloseNotificationsMenu}>
                  <Typography textAlign="center" href="/">Notifications</Typography>
                </MenuItem>
                <MenuItem key={6} onClick={handleClosePlayMenu}>
                  <Typography textAlign="center" href="/">How to play?</Typography>
                </MenuItem>
              
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Ballpark
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            
              <Button
                key={1}
                onClick={handleHomeCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Home
              </Button>
              <Button
                key={2}
                onClick={handleCloseAboutMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                About
              </Button>
              <div className="add-to">
              <Button
                key={6}
                //onClick={handleCloseAboutMenu}
                className='add-to-btn'
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Install App
              </Button>

              </div>
              <div className="add-ios">
              <Button
                key={6}
                //onClick={handleCloseAboutMenu}
                className='add-to-ios-btn'
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Install on Mac/ios
              </Button>

              </div>
              
              <Button
                key={3}
                
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Sound
                <Switch id='sound-toggle' checked={isSoundOn} onChange={handleSoundToggle} color='secondary'/>
                 
              </Button>
              <Button
                key={4}
                
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Music
                <Switch id='Music-toggle' checked={isMusicOn} onChange={handleMusicToggle} color='secondary'/>
                <Sound url={'audio/Only the Braves - FiftySounds.mp3'} playStatus={isMusicOn?Sound.status.PLAYING:Sound.status.STOPPED} loop={true}/>
              </Button>
              <Button
                key={7}
                className="notificationsToggle"
                onClick={handleCloseNotificationsMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Notifications  
                <Switch id='Notifications-toggle' checked={isNotificationsOn} disabled color='secondary'/>
              </Button>
              <Button
                key={7}
                className="playToggle"
                onClick={handleClosePlayMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                How to play? 
                
              </Button>
            
          </Box>

          
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
    <Rodal visible={visible} width={350} height={300} onClose={hide}>
          <div>
            <h6>Ballpark - A Numeracy facts game</h6>
            <div style={{textAlign:'left', margin:"2px"}}>
            <ul>
                <li>Put the cards correctly on the number line in ascending order. You can play in single player mode, multiplayer mode or study mode.</li>
                <li>Created by <a href="https://github.com/harsh1245-bit" target="_blank" rel="noopener noreferrer">Harsh</a> under the supervision of <a href="https://github.com/avi-jit" target="_blank" rel="noopener noreferrer">Avijit thawani</a>.</li>
                <li>Disclaimer: Data is ChatGPT generated but is almost always correct, though sometimes outdated.</li>
            </ul>

            </div>
            
        </div>
    </Rodal>
    <Rodal visible={notRodal} width={350} height={430} onClose={notRodalHide}>
          <div>
            <h6>Notifications: Instructions</h6>
            <div style={{textAlign:'left', margin:"2px"}}>
            <ul>
                <li>Android or Mac users: Change these settings from browser itself.</li>
                <li>iOS users:
                  <ul>
                    <li>Go to Settings &gt; Safari &gt; Turn off Block Pop-ups</li>
                    <li>Then go to Advanced &gt; Experimental Eeatures &gt; configure push API</li>
                  </ul>
                </li>
                <li>
                  You can choose when to receive notifications, click below to select time.
                </li>
                {localStorage.getItem("subscription")?(<li>Currently, your notifications are set to be delivered at time shown below</li>):(<>You may have not allowed permission for notifications.</>)}
            </ul>
            <div style={{padding:"2px"}}>
            <TextField
        label="Choose Time"
        defaultValue={timeVal}
        type="time"
        onChange = {handleChange}
        InputLabelProps={{
          shrink: true,
        }}
        // 5 minutes
        step="3600000"
      />
      
      <button className="btn btn-secondary rounded-pill" style={{marginLeft:"25px", marginTop:"5px"}} onClick={subscribe}>Subscribe</button>

            </div>
             
            </div>
            
        </div>
    </Rodal>
    <Rodal visible={playRodal} width={350}  height={650} onClose={playRodalHide}>
          <div>
            <h6>How to play?</h6>
            <div style={{textAlign:'left', margin:"2px"}}>
            <ul>
                <li>In this game, you get a sample card with a fact and its numerical value on it. And other cards will appear, you will have
                  to drag and drop them in ascending order based on their answers.
                </li>
                
                <li>Steps to play "Single player & Multiplayer mode"
                  <ul>
                    <li>Select deck/decks you want to play.</li>
                    <li>Single player: Click on single player, arrange the cards in ascending order and you will get one point if you place it correctly 
                      and lose one life if placed wrong. You have only three lives.
                    </li>
                    <li>Multiplayer mode: Create or join a game, and play it like single player. A leader board will appear after your game gets over.</li>
                  </ul>
                </li>
                <li>Study mode: You can revise all the decks in this mode without worrying about lives.</li>
                
                
                
            </ul>

            </div>
            
        </div>
    </Rodal>
    </>
  );
}
export default Header;