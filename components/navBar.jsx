import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import {Box,Button }from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useRouter } from 'next/router'
import Link from 'next/link'
import BookIcon from '@mui/icons-material/Book';
import { useAppContext } from '../context/notes/state';
import Login_register from './login_register'
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));



export default function PrimarySearchAppBar() {
  const is_login=useAppContext();
  const router = useRouter()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const [text,setText]=React.useState('');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      router.push(`/search?text=${text}`)
      setText('')
    }
  }
 
  const handleTextUpdate=(event)=>{
    const s=event.target.value;
    setText(s);
  }
  
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>

      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

const handleLogout=()=>{
  is_login.setLogin(false)
  is_login.setLikes({})
  is_login.setUsername('')
}

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    ><Link href={'/likes'}>
      <MenuItem >
      
        <IconButton size="large" aria-label="show 2 new mails" color="inherit">
          <Badge badgeContent={2} color="error">
            <FavoriteIcon />
          </Badge>
        </IconButton>
        
        <p>Liked</p>
      </MenuItem>
      </Link>
      
      <MenuItem onClick={handleLogout}>

        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <LogoutIcon />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
      
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
        <Link href="/">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <BookIcon />
            
          </IconButton>
          </Link>
          
       
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
AI-Recommender

          </Typography>
          
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
            onKeyDown={handleKeyDown}
            value={text}
            onChange={handleTextUpdate}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            >
              
            </StyledInputBase>
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          
          </Box>
          {!is_login.login && <Login_register/>}
          {is_login.login &&
           ( <>
           
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Link href={'/likes'}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <FavoriteIcon />
               </IconButton>
               </Link>
            <Link href={'/'}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <HomeIcon />
              </Badge>
            </IconButton>
            </Link>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>

          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
            
          </Box>
          
        </>)
      }
      </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
    
  );
}
