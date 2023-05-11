import React from 'react';

function Ans(props) {
  let login = JSON.parse(localStorage.getItem("login"));

  console.log(props);
  console.log(props.previousStep.value);

  let bot = props.previousStep.value;
  let answer = '';
  if(bot.includes('안녕')) {
    console.log('1번으로?');
    answer = '안녕하세요';
    //props.step.trigger = '4';
  }
  else if(bot.includes('너') || bot.includes('넌')) {
    answer = '저는 이곳을 안내하는 역할을 하고 있습니다.'
    props.step.trigger = '202';
  }
  else if(bot.includes('여기') || bot.includes('여긴')) {
    answer = '이곳은 같은 동네 사람들이 어울릴 수 있는 공간입니다.'
    props.step.trigger = '소개_101';
  }
  else if(bot.includes('가입') || bot.includes('회원')) {
    answer = '회원가입은 이곳에서 가능합니다.'
    props.step.trigger = '가입_1';
  }
  else if(bot.includes('게시') || bot.includes('게시판')) {
    if(bot.includes('자유')) {
      answer = '자유게시판은 주민님이 자유롭게 글을 작성할 수 있는 공간입니다.'
      props.step.trigger = '자유게시판_101';
    }
    else if(bot.includes('파티') || bot.includes('모집')) {
      answer = '파티게시판은 이웃 주민들과 같이 활동을 하고싶을 때 이용하실 수 있습니다.'
      if(login === null || login === undefined) {
        props.step.trigger = '로그인여부';
      }
      else {
        props.step.trigger = '파티게시판_101';
      }
    }
    else {
      answer = '게시판은 자유게시판과 파티게시판으로 나뉘어 있습니다.'
      props.step.trigger = '게시판_101';
    }
  }
  else if(bot.includes('문화') || bot.includes('정보') || bot.includes('추천')) {
    answer = '문화생활은 영화, 독서, 축제, 음악으로 나뉩니다.'
    props.step.trigger = '문화생활_101';
  }
  else if(bot.includes('영화')) {
    answer = '현재 상영되는 영화의 예매율, 개봉일자 등의 정보를 알 수 있습니다.'
    props.step.trigger = '영화_101';
  }
  else if(bot.includes('독서') || bot.includes('책')) {
    answer = '알라딘에서 판매되는 책의 정보를 알 수 있습니다.'
    props.step.trigger = '독서_101';
  }
  else if(bot.includes('축제') || bot.includes('지역')) {
    answer = '전국에서 진행되는 축제에 대한 정보를 확인할 수 있습니다.'
    props.step.trigger = '축제_101';
  }
  else if(bot.includes('음악')) {
    answer = '현재 멜론차트 상위 50위까지의 음악을 확인할 수 있습니다.'
    props.step.trigger = '음악_101';
  }
  else if(bot.includes('종료') || bot.includes('끝')) {
    answer = '필요하시면 언제든지 불러주세요.'
    props.step.trigger = '종료';
  }
  else if(bot.includes('변경') || bot.includes('바꾸기') || bot.includes('선택')) {
    answer = '선택지 제공방식으로 변경하겠습니다.'
    props.step.trigger = '4';
  }
  else {
    answer = '말씀을 이해하지 못 했습니다.'
    props.step.trigger = '설정밖';
  }

  return (
    <div>
        {answer}
    </div>
  );
}

export default Ans;