import React from 'react';

function Ans(props) {
  console.log(props);
  console.log(props.previousStep.value);

  let bot = props.previousStep.value;
  let answer = '';
  if(bot === '안녕') {
    console.log('1번으로?');
    answer = '안녕';
  }else if(bot === '안녕하세요') {
    console.log('2번으로!');
    answer = '안녕하세요'
  }else {
    answer = '말씀을 이해하지 못 했습니다.'
  }

  return (
    <div>
        {answer}
    </div>
  );
}

export default Ans;