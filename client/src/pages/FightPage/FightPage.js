import React, { Component } from "react";
import API from "../../utils/API";
import "./FightPage.css"

const randomIntFromInterval = (min,max) => {
    return Math.floor(Math.random()*(max-min+1)+min);
}

class FightPage extends Component {
    state = {
        jsonObject: [],
        question: [],
        questionnumber: 1,
        questionstandby: false,
        answerbuttonstate: true,
        playerHP:100,
        computerHP:100
    }

    constructor(props) {
        super(props);
        this.increase = this.increase.bind(this);
        this.answerquestion = this.answerquestion.bind(this);
    }

    componentDidMount() {
        API.getQuestions(randomIntFromInterval(9,32))
            .then(result => this.setState({ jsonObject: result.data.results }, function () {
                this.setState({ jsonObject: result.data.results })
                this.storeQuestions("sjkfls")
            }))
    }

    storeQuestions(obj) {
        console.log(this.state.jsonObject)
    }

    increase() {
        const a = this.props.questionnumber;
        this.setState({ questionnumber: a, questionstandby: true, answerbuttonstate: false })
        this.props.changeQuestion(a)
    }

    answerquestion(answer) {
        this.setState({ questionstandby: false, answerbuttonstate: true });
        if (answer === this.state.jsonObject[this.state.questionnumber].correct_answer){
            const a = this.state.computerHP;
            this.setState({computerHP: a - randomIntFromInterval(1,15)}, function(){
                console.log(this.state.computerHP)
            })
        } else {
            const a = this.state.playerHP;
            this.setState({playerHP: a - randomIntFromInterval(1,15)}, function(){
                console.log(this.state.playerHP)
            })
        }


    }

    render() {
        return (
            <div className="container">
                <div style={{ display: "flex" }}>
                    <div className="col-md-6">
                        <div className="progress flipH">
                            <div className="progress-bar" role="progressbar" style={{ width: this.state.playerHP + "%" }} aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="progress">
                            <div className="progress-bar" role="progressbar" style={{ width: this.state.computerHP+ "%" }} aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <div>Question #<strong>{this.props.questionnumber}</strong></div>
                        <div className="questionbox">
                            {this.state.jsonObject.length !== 0 ? (<div>{this.state.jsonObject[this.state.questionnumber].question}</div>) : (<p>    </p>)}
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <button onClick={() => this.answerquestion("True")} disabled={this.state.answerbuttonstate} className="btn btn-success btn-block">True</button>
                            </div>
                            <div className="col-md-6">
                                <button onClick={() => this.answerquestion("False")} disabled={this.state.answerbuttonstate} className="btn btn-danger btn-block">False</button>
                            </div>
                        </div>

                        <button onClick={this.increase} disabled={this.state.questionstandby} className="btn btn-info">
                            {this.props.questionnumber === 0 ? ("Start Game") : ("Next Question")}
                        </button>
                    </div>
                </div>
            </div>

        )
    }

}

export default FightPage;