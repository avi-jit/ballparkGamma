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

import Rodal from 'rodal';
import { messaging, firestore} from './firebase';
import Button from '@mui/material/Button';

import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import 'rodal/lib/rodal.css';


const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });
 

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [visible,setVisible] = React.useState(false);
  const [isSoundOn,setIsSoundOn] = React.useState(true);
  const [isMusicOn,setIsMusicOn] = React.useState(false);
  const [isNotificationsOn, setIsNotificationsOn] = React.useState(false);
  
  
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
    var permissionButton = document.querySelector('.notificationsToggle')
    permissionButton.addEventListener('click', ()=>{
      window.alert("-Android and Mac users: Change these settings from browser itself \n -iOS users: Go to settings> safari> advanced> experimental features> configure push API and turn off block pop-ups.");

    })
    
    SoundSwitch();
    
    
  },[setIsSoundOn,setIsMusicOn, isNotificationsOn])
  
  const handleSoundToggle = ()=>{
    setIsSoundOn(!isSoundOn);
    localStorage.setItem("isSoundOn",!isSoundOn);
  };
  const handleMusicToggle = ()=>{
    setIsMusicOn(!isMusicOn);
    localStorage.setItem("isMusicOn",!isMusicOn);
  };
  

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

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    
  };
  const handleCloseAboutMenu = () => {
    setAnchorElNav(null);
    show();
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
                <MenuItem key={5} onClick={handleSoundMenu}>
                  <Typography  className="notificationsToggle" textAlign="center" href="/">Notifications
                <Switch id='Notifications-toggle' checked={isNotificationsOn}  color='secondary'/> </Typography>
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
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Notifications  
                <Switch id='Notifications-toggle' checked={isNotificationsOn} color='secondary'/>
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
                <li>Instructions: Put the cards correctly on the number line in ascending order. You can play in single player mode, or multiplayer mode.</li>
                <li>Created by <a href="https://github.com/harsh1245-bit" target="_blank" rel="noopener noreferrer">Harsh</a> under the supervision of <a href="https://github.com/avi-jit" target="_blank" rel="noopener noreferrer">Avijit thawani</a>.</li>
                <li>Disclaimer: Data is ChatGPT generated but is almost always correct, though sometimes outdated.</li>
            </ul>

            </div>
            
        </div>
    </Rodal>
    </>
  );
}
export default Header;