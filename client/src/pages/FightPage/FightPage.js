import React, { Component } from "react";
import API from "../../utils/API";

class FightPage extends Component {
    state = {
        jsonObject: [],
        question: [],
        questionnumber: 0
    }

    constructor(props) {
        super(props);
        this.increase = this.increase.bind(this);
      }

    componentDidMount() {
        API.getQuestions()
            .then(result => this.setState({ jsonObject: result.data.results }, function () {
                this.setState({ jsonObject: result.data.results })
                this.storeQuestions("sjkfls")
            }))
    }

    storeQuestions(obj) {
        console.log(this.state.jsonObject)
    }

    increase(){
        const a = this.state.questionnumber + 1;
        this.setState({questionnumber: a})
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.jsonObject.length !== 0 ? (<div>{this.state.jsonObject[this.state.questionnumber].question}</div>) : (<p>    </p>)}
                </div>
                <button onClick={this.increase} >Increase</button>
            </div>
        )
    }

}

export default FightPage;