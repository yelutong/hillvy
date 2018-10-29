import React from 'react';
import question from './question';//question All

import iconA from './images/userA.png';
import iconB from './images/userB.png';

class QuestionDetails extends React.Component {
  state = {thisQuestion:{},title:'',languga:'Indonesian'};

  componentWillMount() {
    if(this.props.params.title && this.props.params.name){
      //设置页面title
      const title = this.props.params.title.split(':')[1];
      const name = this.props.params.name.split(':')[1];
      //var languga = this.props.location.query.languga || 'Indonesian';
      var languga = 'Indonesian';
      document.title = name;
      this.setState({languga:languga},() => {
        console.log(question);
        //筛选出当前问题
        if(this.state.languga == 'Indonesian'){
          var questionArry = question.filter((item) => item.IndonesianName == name);
          var IndonesianQuestion = questionArry[0].IndonesianQuestion;
          var thisQuestion = IndonesianQuestion.filter((item) => item.title == title);
          this.setState({thisQuestion:thisQuestion[0],title:title+'?'},() => {
            this.changeHtml();
            this.addLink();
          })
        }else{
          var questionArry = question.filter((item) => item.EnglishName == name);
          var EnglishQuestion = questionArry[0].EnglishQuestion;
          var thisQuestion = EnglishQuestion.filter((item) => item.title == title);
          this.setState({thisQuestion:thisQuestion[0],title:title+'?'},() => {
            this.changeHtml();
            this.addLink();
          })
        }
      })
    }
  }

  componentDidMount() {
    /*设置背景颜色*/
    $('body').css('background-color','#f6f6f6');
  }

  /*生命周期即将结束*/
  componentWillUnmount() {
    /*设置背景颜色*/
    $('body').css('background-color','#ffffff');
  }

  /*
  *有些需要添加图片的，则需要另外渲染
  */
  changeHtml = () => {
    if(this.state.title == 'Bagaimana cara keluar (logout) dari akun?'){
      console.log($('.descriptionText p').html());
      $('.descriptionText p').html(
        'Silahkan mengikuti langkah berikut untuk keluar dari akun Anda</br>'+
        '1.Klik <img src="'+iconA+'"/></br>'+
        '2.Kemudian klik <img src="'+iconB+'"/></br>'+
        '3.Pilih "Keluar" untuk keluar dari akun Anda</br>'
      )
    }
  }

  /*
  *有地址的，需添加url
  */
  addLink = () => {
    var len = $('.descriptionText p').length;
    for(var i = 0; i<len; i++){
      console.log(len);
      console.log($('.descriptionText p').eq(i).html());
      if($('.descriptionText p').eq(i).html().indexOf('www.kreditplusteknologi.id')>=0){
        $('.descriptionText p').eq(i).html($('.descriptionText p').eq(i).html().replace('www.kreditplusteknologi.id','<a href="https://www.kreditplusteknologi.id">www.kreditplusteknologi.id</a>'));
      }
    }
  }

  render() {
    return (
      <div className="FAQ padding20 questionDetail marginTop1">
        <div className="questionDetailT">{this.state.title}</div>
        <div className="descriptionText">
          {
            this.state.thisQuestion.description?
              this.state.thisQuestion.description.split('|||').map((item,index) => {
                if(this.state.title == 'Bagaimana menyelesaikan permohonan pinjaman?'){
                  if(item.indexOf('Langkah')>=0){
                    return (
                      <b style={{'display':'block','marginTop':'0.3em'}} key={index}>{item}</b>
                    )
                  }else{
                    return (
                      <p key={index}>{item}</p>
                    )
                  }
                }else{
                   return (
                      <p key={index}>{item}</p>
                    )
                }
              }):<div className="align-center">no data</div>
          }
        </div>
      </div>
    );
  }
}

QuestionDetails.defaultProps = {
};

export default QuestionDetails;
