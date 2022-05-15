// Material ui 설치 후 테스트용 js파일
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
class Main extends Component {
  render() {
    return (
      <Button variant="contained" color="primary">
        Hello Main.js
      </Button>
    );
  } 
}
export default Main;