import axios from "axios";
import { useEffect, useState } from "react";
import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button } from "react-bootstrap";


// class App extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       foodList: [],
//     }
//   }

//   // 시작 할때 실행되는 메소드
//   componentDidMount() {
//     this.getFoodList();
//   }

//   // path는 /api로 시작해야함 (proxy 때문)
//   // food list 가져옴
//   getFoodList = async() => {
//     const res = await axios.get('/api/foodList');
//     const { data } = res;
//     this.setState({foodList: data})
//     console.log(this.state.foodList);
//   }

//   render() {
//     const foodList = this.state.foodList.map((food, index) => (
//       <tr key={index}>
//         <td>{food.id}</td>
//         <td>{food.name}</td>
//         <td>그림 추가</td>
//         <td>
//           meat={food.meat}, milk={food.milk}
//         </td>
//         <td>
//           {food.make}
//         </td>
//       </tr>
//       ))
      
//     return(
//       <div className="App">
//         <h1>Main Page</h1>
//         <h2>Food List - database 연동 확인</h2>
//         <Button variant="info" onClick={this.clickTest}>장바구니 이동</Button>
//         <br></br>
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>id</th>
//               <th>음식이름</th>
//               <th>그림</th>
//               <th>성분(1이면 포함, 0이면 미포함)</th>
//               <th>만드는 법</th>
//             </tr>
//           </thead>
//           <tbody>
//             {foodList}
//           </tbody>
//         </Table>
//       </div>
//     )
//   }
// }

// export default App;

import Main from './component/Main'
class App extends React.Component{
  render(){
    return (
      <div>
        <Main/>
      </div>
    );
  }
}
export default App;


