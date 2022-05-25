import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function Nav() {
    return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar position="relative">
            <Toolbar>
              <CameraIcon sx={{ mr: 2 }} />
              <Typography variant="h6" color="inherit" noWrap>
                Healthy Pleasure
              </Typography>
            </Toolbar>
            <Toolbar>
              <Typography variant="h6" color="inherit" noWrap>
              <Link href='/Signin'><button>로그인</button></Link>
              </Typography>
              <Typography variant="h6" color="inherit" noWrap>
              <Link href='/Register'><button>회원가입</button></Link>
              </Typography>
              <Typography variant="h6" color="inherit" noWrap>
              <Link href='/Cart'><button>장바구니</button></Link> 
              </Typography>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
    );
}