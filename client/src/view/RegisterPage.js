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
import { useState, useEffect, useLayoutEffect } from 'react';

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

export default function RegisterPage() {
    const [user, setUser] = useState([]);
    const [userList, setUserList] = useState([]);
    const [start, setStart] = useState(1);

    let reg_id;
    let reg_pw;
    let i = 0;

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        reg_id = data.get('id');
        reg_pw = data.get('password');

        console.log({
            id: data.get('id'),
            password: data.get('password'),
        });

        let temp = 0;

        for (i = 0; i < userList.length; i++) {
            if (userList[i] == reg_id) {
                temp = 1;
            }
        }

        
        if (temp == 1) {
            //이미 존재하는 아이디일경우
            console.log(alert("이미 존재하는 아이디입니다."))

        } else if (reg_id == "") {
            //아이디 입력란에 입력하지 않았을 경우
            console.log(alert("아이디가 입력되지 않았습니다."))

        } else if (reg_pw == "") {
            //비밀번호 입력란에 입력하지 않았을 경우
            console.log(alert("비밀번호가 입력되지 않았습니다."))

        } else {
            axios.get(`/api/register/${reg_id}/${reg_pw}`)
                .then(res => console.log(res.data))
                .then(alert("회원가입이 완료되었습니다."))

            axios.get(`/api/registeritem/${reg_id}`)
                .then(res => console.log(res.data))
                .then(console.log("회원가입이 완료되었습니다."))

        }
        
        console.log(temp);
        temp = 0;
    };

    useEffect(() => {
        if (start) {
            axios.get('/api/userId')
                .then(res => {
                    setUser(res.data);

                    if (user.length !== 0 && userList.length === 0) {
                        // 사용자 배열 구축
                        // userList = ['kaka5', 'test', 'test1', ...]
                        user.map((user, id) => userList.push(Object.values(user)))

                        console.log(userList);

                        setStart(0);
                    }
                })
            //.then(console.log('repeat'));
        }
    });

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
            회원가입
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                      <Grid container spacing={2}>
                          <Grid item xs={12}>
                              <TextField required fullWidth id="id" label="아이디" name="id"/>
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth name="password" label="Password" type="password" id="password"
                 autoComplete="new-password"/>
              </Grid>
            </Grid>
                      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
              회원가입
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="./Signin" variant="body2">
                  이미 회원가입이 되어있다면 로그인하세요.
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
