import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';

import Rodal from 'rodal';

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
                <MenuItem key={2} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" href="/">About</Typography>
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
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                About
              </Button>
            
          </Box>

          
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
    <Rodal visible={visible} onClose={hide}>
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