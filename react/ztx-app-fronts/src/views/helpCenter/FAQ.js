import React from 'react';
import {Link } from 'react-router';
import question from '../secondHelpCenter/question';//question All

class FAQ extends React.Component {
  state = {questionObject:{},questionArry:[],languga:this.props.languga};

  componentWillMount() {
    //筛选 当前问题
    this.setState({
      questionObject:question.filter((item) => item.EnglishName == 'FAQ')
    },() => {
      console.log('questionObject',this.state.questionObject[0]);
      console.log('questionObject1',this.state.questionObject[0].IndonesianQuestion);
      if(this.state.languga == 'Indonesian'){
        this.setState({
          questionArry:this.state.questionObject[0].IndonesianQuestion
        })
      }else{
        this.setState({
          questionArry:this.state.questionObject[0].EnglishQuestion
        })
      }
    });
  }

  render() {
    return (
      <div className="FAQ padding20">
        <div className="title">FAQ</div>
        <ul>
          {
            this.state.questionArry.map((item) => {
              return (
                <Link className="link" key={item.title} to={'/questionDetails/:'+item.title+'/:'+this.state.questionObject[0].EnglishName+'?languga='+this.state.languga}>
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

FAQ.defaultProps = {
};

export default FAQ;
