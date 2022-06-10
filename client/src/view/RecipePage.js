import React from 'react';
import '../component/RecipeLayout.css'
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import CssBaseline from '@mui/material/CssBaseline';
import '../component/Link_line.css'

import { createTheme, ThemeProvider } from '@mui/material/styles';


// 서버와 연동
import axios from 'axios';
import {useState, useEffect, useLayoutEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function RecipePage () {
  const [foodList, setFoodList] = useState([]);
  const params = useParams();
  const id = parseInt(params.id);

    // 페이지 렌더링 후 가장 처음 호출되는 함수
    // 음식 리스트 얻어오기
    useEffect(()=>{
      axios.get('/api/foodList')
      .then(res => setFoodList(res.data)) 
      .then(console.log(foodList)) // 받아온 음식리스트 출력해보기
    }, [])

    const addCart = (name, id) => {
      let foodName = name.replace(/(\s*)/g, '') + "_" + id
      console.log("add Cart: " + foodName);

      // 특수문자(%) 제거
      name = name.replace(/\%/g, '');
      name = name.replace(/(\s*)/g, '')

      // 이름/id로 get 요청
      axios.get(`/api/addCart/${name}/${id}`)
      .then(res => console.log(res.data))
      .then(alert("장바구니에 추가하였습니다."))
    }

    const theme = createTheme();
  return (
    <div>
      {foodList.filter(food => food.id === id).map(food => (
        <>
        
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
              {/* 링크 수정 */}
              <Link to='/'><Button variant='contained'>메인으로</Button></Link>
              <Link to='/Signin'><Button variant='contained'>로그인</Button></Link>
              <Link to='/Register'><Button variant='contained'>회원가입</Button></Link>       
              <Link to='/Cart/kaka5'><Button variant='contained'>장바구니</Button></Link> {/* kaka5 유저에 대해 테스트 */}
            </Toolbar>
          </AppBar>
        </ThemeProvider>
        <br></br><h2 align="center">{food.name}</h2>
        
        <div className="post-view-wrapper">
          {foodList[0] ? (
            <>
              <div className="post-view-row">
                <img className="foodimg" src={food.image} />
              </div>
              <div className="post-view-row">
                <label>칼로리</label>
                <label>{food.kcal}kcal</label>
              </div>
              <div className="post-view-row">
                <label>탄수화물</label>
                <label>{food.carbohydrate}g</label>
              </div>
              <div className="post-view-row">
                <label>단백질</label>
                <label>{food.protein}g</label>
              </div>
              <div className="post-view-row">
                <label>지방</label>
                <label>{food.fat}g</label>
              </div>
              <div className="post-view-row">
                <label>레시피</label>
                <div>
                  {food.make}
                </div>
              </div>
            </>
          ) : '해당 게시글을 찾을 수 없습니다.'}
          <Link to='/'><Button variant="contained">메인으로</Button></Link>
          <Button variant='outlined' onClick={() =>addCart(food.name, food.id)}>장바구니 추가</Button>
        </div></>
      ))}
    </div>
  );
}