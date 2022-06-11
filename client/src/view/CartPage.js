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
import Button from '@mui/material/Button';
import '../component/Link_line.css'

import {Link} from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';


import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import recommend from 'collaborative-filter';

const theme = createTheme();
// const Button = styled.button`
//   background-color: black;
//   color: white;
//   font-size: 20px;
//   padding: 8px 20px;
//   border-radius: 5px;
//   margin: 5px 0px;
//   cursor: pointer;
// `;
const HorizonLine = ({ text }) => {
  return (
    <div
      style={{
        width: "100%",
        textAlign: "center",
        borderBottom: "1px solid #aaa",
        lineHeight: "0.1em",
        margin: "10px 0 20px",
      }}
    >
      <span style={{ background: "#fff", padding: "0 10px" }}>{text}</span>
    </div>
  );
};

function CartPage() {
    const [Cart, setCart] = useState([]);
    const [CartList, setCartList] = useState([]);
    const [foodList, setFoodList] = useState([]);
    const [user, setUser] = useState([]);
    const [userList, setUserList] = useState([]);
    const [recommendList, setRecommendList] = useState([]); // 추천된 아이템(음식)을 모은 배열
    const params = useParams();
    const id = (params.id);
    const [start, setStart] = useState(1); // 시작할때만 정보 얻어오도록 한다. (속도 향상) 나중에 commit
    // user id는 kaka5, crete91, ... 등등 DB의 user_item table을 확인해 알 수 있다.
    // user id를 parameter로 얻어와 해당 id에 맞는 유저가 담은 음식 데이터를 가져옴


    // 음식 array의 대응하는 음식 출력
    // ex) kaka5의 경우 1, 3번 음식이 1이니까 1, 3번 음식 나타내기
    // 음식 name, ingredient, kcal, 영양
    useEffect(() => {
      if(start) {
        axios.get(`/api/userCart/${id}`)
        .then(res => {
            setCart(res.data);
            //console.log(Cart[0]);
            if (Cart.length !== 0) // Cart배열이 구성되어야 작동해야함
                setCartList(Object.values(Cart[0]));
            //console.log(CartList);
            // 추천 시스템을 적용하기 위한 배열 출력
            // ex) ['kaka5', 1, 0, 0, 0, 0, ...]
        })
        axios.get('/api/foodList')
        .then(res => setFoodList(res.data))
          //.then(console.log(foodList))
        axios.get('/api/userList')
        .then(res => {
          setUser(res.data);

          if(user.length !== 0 && userList.length === 0) {
            // 사용자/아이템 배열 구축
            // userList = ['username', 1, 0, ...]
            user.map((user, id) => userList.push(Object.values(user)))

            // 추천 대상이 되는 유저 index구함
            let userIndex = 0;
            for(let i = 0; i < userList.length; i++) {
              if(id == userList[i][0]) userIndex = i;
            }
            
            // 사용자 이름을 제외한 배열 생성(0, 1만 존재)
            for(let i = 0; i < userList.length; i++) {
              userList[i] = userList[i].slice(1);
            }
            
            // 5개의 음식 추천(5번 반복문 반복)
            for(let i = 0; i < 5; i++) {
              let item = recommend.cFilter(userList, userIndex)[0];
              if(item != -1) {
                recommendList.push(item);
                userList[userIndex][item] = 1;
              }                
            }
            console.log(recommendList);
            setStart(0);
          }
        })
        //.then(console.log('repeat'));
      }    
    });

    // 장바구니에서 제거
    const deleteCart = (name, foodId) => {
      let foodName = name.replace(/(\s*)/g, '') + "_" + foodId
      console.log("delete Cart: " + foodName);

      // 특수문자(%) 제거
      name = name.replace(/\%/g, '');
      name = name.replace(/(\s*)/g, '')

      // 이름/id로 get 요청
      // 삭제 후 페이지 reload
      axios.get(`/api/deleteCart/${id}/${name}/${foodId}`)
      .then(res => console.log(res.data))
      .then(alert("장바구니에서 삭제했습니다."))
      .then(document.location.reload())
    }

    const FoodId = foodList.map((food, id) => food.id); //카드 배열 위해 id 추가
    const FoodImage = foodList.map((food, id) => food.image);
    const FoodName = foodList.map((food, id) => food.name);
    const FoodIngredient = foodList.map((food, id) => food.ingredient);
    const FoodKcal = foodList.map((food, id) => food.kcal);
    const FoodCar = foodList.map((food, id) => food.carbohydrate);
    const FoodPro = foodList.map((food, id) => food.protein);
    const FoodFat = foodList.map((food, id) => food.fat);

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
          <Link to='/'><Button variant='contained'>메인으로</Button></Link>
          <Link to='/Signin'><Button variant='contained'>로그인</Button></Link>
          <Link to='/Register'><Button variant='contained'>회원가입</Button></Link>       
          <Link to='/Cart/kaka5'><Button variant='contained'>장바구니</Button></Link> {/* kaka5 유저에 대해 테스트 */}
        </Toolbar>
      </AppBar>
        <div>
        <br></br><br></br> 
        <h2><HorizonLine text="담은 목록" /></h2>
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
                      <h5>재료:</h5> { FoodIngredient[index - 1]}
                      {/* <br></br>
                      <br></br>
                      칼로리: {FoodKcal[index - 1]}kcal<br></br>
                      탄수화물 {FoodCar[index - 1] }g<br></br>
                      단백질 {FoodPro[index - 1] }g<br></br>
                      지방 {FoodFat[index - 1] }g */}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button variant='outlined' onClick={() => deleteCart(FoodName[index - 1], FoodId[index - 1])}>삭제</Button>
                  </CardActions>
                </Card>
              </Grid>
             :null ))}
          </Grid>
          <br></br><br></br>
        </Container>
        <h2><HorizonLine text="추천 목록" /></h2>
        {/* 추천된 음식 출력 */}
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
        {recommendList.map((food, id) => (
             <Grid item key={id} xs={12} sm={6} md={4}>
               <Card
                 sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
               >
                 <CardMedia
                   component="img"
                   sx={{
                     // 16:9
                     pt: '56.25%',
                   }}
                   image={foodList[food].image}
                 />
                 <CardContent sx={{ flexGrow: 1 }}>
                   <Typography gutterBottom variant="h5" component="h2">
                     {/* 음식 이름 */}
                     {foodList[food].name}
                   </Typography>
                   <Typography>
                     {/* 레시피 간단한 설명 */}
                     재료: {foodList[food].ingredient}
                     {/* <br></br>
                     <br></br>
                     칼로리: {foodList[food].kcal}
                     영양 정보: 탄수화물 {foodList[food].carbohydrate}g, 
                     단백질 {foodList[food].protein}g, 
                     지방 {foodList[food].fat}g */}
                   </Typography>
                 </CardContent>
                 <CardActions>
                   <Button variant='outlined'>삭제</Button>
                 </CardActions>
               </Card>
             </Grid>
            ))}
         </Grid>
       </Container>
        </div>
     </ThemeProvider>   
    );
};

export default CartPage;
