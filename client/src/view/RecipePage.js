import React from 'react';
import '../component/RecipeLayout.css'
import Nav from '../component/Nav'
import Button from '@mui/material/Button';

// 서버와 연동
import axios from 'axios';
import {useState, useEffect} from 'react';

export default function RecipePage () {
  const [foodList, setFoodList] = useState([]);

    // 페이지 렌더링 후 가장 처음 호출되는 함수
    // 음식 리스트 얻어오기
    useEffect(()=>{
      axios.get('/api/foodList')
      .then(res => setFoodList(res.data))
      .then(console.log(foodList)) // 받아온 음식리스트 출력해보기
    }, [])

    //const f1 = foodList.get();
  return (
    <>
      <Nav/>
      <br></br>
      <h2 align="center">레시피</h2>

      <div className="post-view-wrapper">
        {
          foodList[0] ? (
            <>
              <div className="post-view-row">
                <label>음식 번호</label>
                <label>{foodList[0].id}번</label>
              </div>
              <div className="post-view-row">
                <label>음식 이름</label>
                <label>{foodList[0].name}</label>
              </div>
              <div className="post-view-row">
                <label>칼로리</label>
                <label>{foodList[0].kcal}kcal</label>
              </div>
              <div className="post-view-row">
                <label>탄수화물</label>
                <label>{foodList[0].carbohydrate}</label>
              </div>
              <div className="post-view-row">
                <label>단백질</label>
                <label>{foodList[0].protein}</label>
              </div>
              <div className="post-view-row">
                <label>지방</label>
                <label>{foodList[0].fat}</label>
              </div>
              <div className="post-view-row">
                <label>레시피</label>
                <div>
                  {
                    foodList[0].make
                  }
                </div>
              </div>
            </>
          ) : '해당 게시글을 찾을 수 없습니다.'
        }
        <Button variant="contained">메인으로</Button><br></br><br></br>
        <Button variant="outlined">장바구니</Button>
      </div>
    </>
  );
}