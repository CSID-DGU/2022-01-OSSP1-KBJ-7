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
import '../component/Link_line.css'
//import Link from '@mui/material/Link';
import {Link} from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// 서버와 연동
import axios from 'axios';
import {useState, useEffect} from 'react';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function MainPage(props) {
  const [foodList, setFoodList] = useState([]);

    // 페이지 렌더링 후 가장 처음 호출되는 함수
    // 음식 리스트 얻어오기
    useEffect(()=>{
      // 세션 유지로 데이터 저장하여 rendering 속도 향상 (localStorage)
      /*
             로그인 유지에도 사용
      */
      //sessionStorage.removeItem("foodList");
      // sessionStorage에 foodList 없으면 db에서 받아옴
      if(sessionStorage.getItem("foodList") == null) {
        axios.get('/api/foodList')
        .then(res => {
          setFoodList(res.data);
          sessionStorage.setItem("foodList", JSON.stringify(res.data));
        })
        .then(console.log(foodList)) // 받아온 음식리스트 출력해보기
      }
      // sessionStorage에 이미 foodList가 있다면 db로 요청보내지 않고 가지고 있는 foodList 그대로 사용
      else {
        setFoodList(JSON.parse(sessionStorage.getItem("foodList")));
      }
    }, [])

    // 장바구니에 추가하는 함수
    // kaka5 유저에 대해 구현한 것
    // 로그인 기능이 구현되면 변경 필요
    const addCart = (name, foodId) => {
      let foodName = name.replace(/(\s*)/g, '') + "_" + foodId
      console.log("add Cart: " + foodName);

      // 특수문자(%) 제거
      name = name.replace(/\%/g, '');
      name = name.replace(/(\s*)/g, '')

      // 이름/id로 get 요청
      axios.get(`/api/addCart/kaka5/${name}/${foodId}`)
      .then(res => console.log(res.data))
      .then(alert("장바구니에 추가하였습니다."))
    }

  return (
    <ThemeProvider>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Healthy Pleasure
          </Typography>
        </Toolbar>
        <Toolbar>
          {/* 링크 수정 */}
          <Link to='/Signin'><Button variant='contained'>로그인</Button></Link>
          <Link to='/Register'><Button variant='contained'>회원가입</Button></Link>       
          <Link to='/Cart/kaka5'><Button variant='contained'>장바구니</Button></Link> {/* kaka5 유저에 대해 테스트 */}
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Healthy Pleasure Food
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              건강관리, Healthy Pleasure Food로 해결하세요.
              먹는 것만큼은 스트레스 받지 말고 관리할 수 있습니다.
              본 사이트에서 제공하는 레시피를 통해 직접 요리할 수 있습니다. 
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {foodList.map((food, index) => (
              <Grid item key={food.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={food.image}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {/* 음식 이름 */}
                      {food.name}
                    </Typography>
                    <Typography>
                      {/* 레시피 간단한 설명 */}
                      <h5>재료:</h5> {food.ingredient}
                      {/* <br></br>
                      <br></br>
                      칼로리: {food.kcal}
                      영양 정보: 탄수화물 {food.carbohydrate}g, 단백질 {food.protein}g, 지방 {food.fat}g */}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link to={`/Recipe/${food.id}`}><Button variant="contained">레시피</Button></Link>
                    <Button variant="outlined" onClick={() =>addCart(food.name, food.id)}>장바구니 추가</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Healthy Pleasure
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          행복한 식사 시간을 즐기세요.
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
