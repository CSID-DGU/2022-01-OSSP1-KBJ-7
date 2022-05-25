import React from 'react';
import '../component/RecipeLayout.css'
import Nav from '../component/Nav'
import Button from '@mui/material/Button';

// 서버와 연동
import axios from 'axios';
import {useState, useEffect, useLayoutEffect} from 'react';
import { useParams } from 'react-router-dom';

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

  return (
    <div>
      {foodList.filter(food => food.id === id).map(food => (
        <><Nav /><br></br><h2 align="center">{food.name}</h2>
        
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
          <Button variant="contained">메인으로</Button><br></br><br></br>
          <Button variant="outlined">장바구니</Button>
        </div></>
      ))}
    </div>
  );
}