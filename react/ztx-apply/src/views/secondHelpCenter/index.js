import React from 'react';
import {Link } from 'react-router';
import question from './question';//question All

class SecondHelpCenter extends React.Component {
  state = {questionObject:{},languga:'Indonesian',questionArry:[],title:''};

  componentWillMount() {
     //设置页面title
    var title = this.props.params.name.split(':')[1];
    var languga = this.props.location.query.languga || 'Indonesian';
    document.title = title;
    this.setState({title:title,languga:languga},() => {
      //筛选 当前问题
      if(this.state.languga == 'Indonesian'){
        this.setState({
          questionObject:question.filter((item) => item.IndonesianName == title)
        },() => {
          this.setState({
            questionArry:this.state.questionObject[0].IndonesianQuestion
          })
        });
      }else{
        this.setState({
          questionObject:question.filter((item) => item.EnglishName == title)
        },() => {
          this.setState({
            questionArry:this.state.questionObject[0].EnglishQuestion
          })
        });
      }
    })
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

  render() {
    return (
      <div className="FAQ padding20 marginTop1">
        <ul>
          {
            this.state.questionArry.map((item) => {
              return (
                <Link className="link" key={item.title} to={'/questionDetails/:'+item.title+'/:'+this.state.title+'?languga='+this.state.languga}>
                  <li className="quesTitle">
                    <span>{item.title+'?'}</span>
                  </li>
                </Link>
              )
            })
          }
        </ul>
      </div>
    );
  }
}

SecondHelpCenter.defaultProps = {
};

export default SecondHelpCenter;
