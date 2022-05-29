import React from 'react';

import axios from 'axios';
import { useState, useEffect, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';

function CartPage () {
  const [Cart, setCart] = useState([]);
  const [CartList, setCartList] = useState([]);
  const params = useParams();
  const id = (params.id);
  // user id는 kaka5, crete91, ... 등등 DB의 user_item table을 확인해 알 수 있다.
  // user id를 parameter로 얻어와 해당 id에 맞는 유저가 담은 음식 데이터를 가져옴

  useEffect(()=>{
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

  }, );

  return (
    <div>
      <h1>장바구니 페이지12</h1>
      <br></br>
      {/* {Cart.map((food, index) => (
        // 곤약 떡볶이를 담았는지를 출력해보기
        <div>
          <h2>곤약 떡볶이를 담았는가?</h2>
          <h2 key={index}>{food.곤약_떡볶이}</h2> 
        </div>
      ))} */}
      <br></br>
      <h2>DB의 user_item table을 조회한 모습(순서대로 출력, kaka5는 유저 이름), 출력시간이 좀 걸릴 수 있음</h2>
      {CartList.map((array, index) => (
        // 배열로 변환한 음식을 장바구니에 담았는지를 출력
        <div>
          <h2 key={index}>{array}</h2> 
        </div>
      ))}
    </div>
  );
};

export default CartPage;