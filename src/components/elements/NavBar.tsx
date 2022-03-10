/* eslint-disable @next/next/link-passhref */
import Info from '@mui/icons-material/Info';
import Logout from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import Settings from '@mui/icons-material/Settings';
import Star from '@mui/icons-material/Star';
import Dashboard from '@mui/icons-material/Dashboard';
import Person from '@mui/icons-material/Person';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  ListItemIcon,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import StyledMenu from './StyledMenu';

const pages = ['Rating', 'About'];

const Navbar = () => {
  const { user, signOut } = useAuth();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // console.log(user?.profilePic);

  let rightSide;

  if (user) {
    rightSide = (
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open dropdown">
          <IconButton
            onClick={handleOpenUserMenu}
            id="user-ison-button"
            aria-controls={Boolean(anchorElUser) ? 'user-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={Boolean(anchorElUser) ? 'true' : undefined}
          >
            <Avatar alt={user?.username!} src={user?.profilePic!} />
          </IconButton>
        </Tooltip>
        <StyledMenu
          id="user-menu"
          anchorEl={anchorElUser}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem disabled>
            <Typography
              variant="h6"
              component="div"
              color="primary"
              // className="w-full align-middle"
              sx={{ mx: 'auto' }}
            >
              {user.username}
            </Typography>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <Person fontSize="small" />
            </ListItemIcon>
            My Profile
          </MenuItem>
          <Link href="/dashboard">
            <MenuItem>
              <ListItemIcon>
                <Dashboard fontSize="small" />
              </ListItemIcon>
              My Dashboard
            </MenuItem>
          </Link>
          <Divider />
          <Link href="/settings">
            <MenuItem>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
          </Link>
          <button onClick={() => signOut()} className="w-full">
            <MenuItem>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </button>
        </StyledMenu>
      </Box>
    );
  } else {
    rightSide = (
      <Box sx={{ flexGrow: 0 }}>
        <Link href="/sign-in">
          <Button variant="contained" color="secondary">
            Sign In
          </Button>
        </Link>
      </Box>
    );
  }

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <Link href="/">PomoFriends</Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="nav-menu"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <StyledMenu
              id="nav-menu"
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              <MenuItem>
                <ListItemIcon>
                  <Star fontSize="small" />
                </ListItemIcon>
                Rating
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Info fontSize="small" />
                </ListItemIcon>
                About
              </MenuItem>
            </StyledMenu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {rightSide}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
