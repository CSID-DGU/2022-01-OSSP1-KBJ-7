import React from 'react';
import AppBar from '@mui/material/AppBar';
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
//import Link from '@mui/material/Link';
import {Link} from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';


import axios from 'axios';
import { useState, useEffect, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';

const theme = createTheme();
const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 8px 20px;
  border-radius: 5px;
  margin: 5px 0px;
  cursor: pointer;
`;

function CartPage() {
    const [Cart, setCart] = useState([]);
    const [CartList, setCartList] = useState([]);
    const [foodList, setFoodList] = useState([]);
    const params = useParams();
    const id = (params.id);
    // user id는 kaka5, crete91, ... 등등 DB의 user_item table을 확인해 알 수 있다.
    // user id를 parameter로 얻어와 해당 id에 맞는 유저가 담은 음식 데이터를 가져옴


    // 음식 array의 대응하는 음식 출력
    // ex) kaka5의 경우 1, 3번 음식이 1이니까 1, 3번 음식 나타내기
    // 음식 name, ingredient, kcal, 영양
    useEffect(() => {
        axios.get(`/api/userCart/${id}`)
            .then(res => {
                setCart(res.data);
                console.log(Cart[0]);
                if (Cart.length !== 0) // Cart배열이 구성되어야 작동해야함
                    setCartList(Object.values(Cart[0]));
                console.log(CartList);
                // 추천 시스템을 적용하기 위한 배열 출력
                // ex) ['kaka5', 1, 0, 0, 0, 0, ...]
            })
        axios.get('/api/foodList')
            .then(res => setFoodList(res.data))
            .then(console.log(foodList))

    });
    const FoodId = foodList.map((food, id) => food.id); //카드 배열 위해 id 추가
    const FoodImage = foodList.map((food, id) => food.image);
    const FoodName = foodList.map((food, id) => food.name);
    const FoodIngredient = foodList.map((food, id) => food.ingredient);
    const FoodKcal = foodList.map((food, id) => food.kcal);
    const FoodCar = foodList.map((food, id) => food.carbohydrate);
    const FoodPro = foodList.map((food, id) => food.protein);
    const FoodFat = foodList.map((food, id) => food.fat);

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
          <Link to='/'><button>메인으로</button></Link>
          <Link to='/Signin'><button>로그인</button></Link>
          <Link to='/Register'><button>회원가입</button></Link>       
          <Link to='/Cart/kaka5'><button>장바구니</button></Link> {/* kaka5 유저에 대해 테스트 */}
        </Toolbar>
      </AppBar>
        <div>
            <br></br>
            {/* {Cart.map((food, index) => (
        // 곤약 떡볶이를 담았는지를 출력해보기
        <div>
          <h2>곤약 떡볶이를 담았는가?</h2>
          <h2 key={index}>{food.곤약_떡볶이}</h2> 
        </div>
      ))} */}

        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {CartList.map((array, index) => (
             array==1?
              <Grid item key={FoodId[index - 1]} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={FoodImage[index - 1]}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {/* 음식 이름 */}
                      {FoodName[index - 1]}
                    </Typography>
                    <Typography>
                      {/* 레시피 간단한 설명 */}
                      재료: { FoodIngredient[index - 1]}
                      <br></br>
                      <br></br>
                      칼로리: {FoodKcal[index - 1]}
                      영양 정보: 탄수화물 {FoodCar[index - 1] }g, 
                      단백질 {FoodPro[index - 1] }g, 
                      지방 {FoodFat[index - 1] }g
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">삭제</Button>
                  </CardActions>
                </Card>
              </Grid>
             :null ))}
          </Grid>
        </Container>
        
        </div>
     </ThemeProvider>   
    );
};

export default CartPage;
