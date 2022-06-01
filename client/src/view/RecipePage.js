import React from 'react';
import '../component/RecipeLayout.css'
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import CssBaseline from '@mui/material/CssBaseline';

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
              <Link to='/'><button>메인으로</button></Link>
              <Link to='/Signin'><button>로그인</button></Link>
              <Link to='/Register'><button>회원가입</button></Link>       
              <Link to='/Cart/kaka5'><button>장바구니</button></Link> {/* kaka5 유저에 대해 테스트 */}
            </Toolbar>
          </AppBar>
        </ThemeProvider>
        <br></br><h2 align="center">{food.name}</h2>
        
        <div className="post-view-wrapper">
          {foodList[0] ? (
            <>
              <div className="post-view-row">
                <img className="foodimge" src={food.image} />
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
          <Link to='/'><Button variant="contained">메인으로</Button></Link><br></br><br></br>
          <Link to='/Cart/kaka5'><button>장바구니</button></Link>
        </div></>
      ))}
    </div>
  );
}