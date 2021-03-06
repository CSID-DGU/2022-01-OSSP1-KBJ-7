import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      <Link color="inherit" href="https://mui.com/">
       Healthy Pleasure Site
      </Link>{' '}
    </Typography>
  );
}

const theme = createTheme();

export default function SigninPage() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const inputData = new FormData(event.currentTarget);
    // console.log({
    //   id: inputData.get('id'),
    //   password: inputData.get('password')
    // });

    axios.post('/api/signin', null, {
      params: {
        'userId': inputData.get('id'),
      }
    })
    .then(res => {
      if((res.data)[0].password == inputData.get('password')) {
        console.log("Login success");
        window.alert("로그인 성공");

        // session에 로그인 정보 저장
        sessionStorage.setItem('userId', inputData.get('id'));

        // main페이지로 이동
        document.location.replace('/');
      }
      else {
        console.log("Wrong input");
        window.alert("로그인 실패");
      }
    })
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
              로그인
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="id"
              label="아이디"
              id="id"
            />  
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="비밀번호"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="비밀번호 정보 저장"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              로그인
            </Button>
            <Grid container>
              <Grid item>
                <Link href='/Register' variant='body2'>    
                  {"회원가입이 안 되어 있으신가요?"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
