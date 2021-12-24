import React, { Component } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import Header from "../Header/Header";
import SweetAlert from 'react-bootstrap-sweetalert'


import styles from "./schedules.module.css";
import { getDate } from "../../Blog/helper";

class Schedules extends Component {
  constructor(props) {
    super(props);

    this.updateIdeas = this.updateIdeas.bind(this);
    this.updateTraders = this.updateTraders.bind(this);

    this.state = {
        isIdeasDisable: false,
        isTradersDisable: false,
    };
  }

  async componentDidMount() {

  }

  componentWillUnmount() {}



  updateIdeas() {
    if(!this.state.isIdeasDisable) {
        this.props.scheduleIdea();
    }

    document.getElementsByClassName('schedule-button')[1].style = 'opacity: 0.7; cursor: not-allowed;';

    this.setState({
        isIdeasDisable: true,
    })
  }

  updateTraders() {
    if(!this.state.isTradersDisable) {
        this.props.scheduleTrader();
    }

    document.getElementsByClassName('schedule-button')[0].style = 'opacity: 0.7; cursor: not-allowed;';

    this.setState({
        isTradersDisable: true,
    })
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <Header />
        <div className = {styles.buttons}>
            <div onClick = {this.updateTraders} className = {'schedule-button'}>
                Update traders
            </div>
            <div onClick = {this.updateIdeas} className = {'schedule-button'}>
                Update ideas
            </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    schedulesState: state,
  };
}

export default connect(mapStateToProps, actions)(Schedules);
