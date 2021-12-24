import React, { Component } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import Header from "../Header/Header";
import SweetAlert from 'react-bootstrap-sweetalert'


import styles from "./prices.module.css";

class Prices extends Component {
  constructor(props) {
    super(props);

    this.save = this.save.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);

    this.state = {
      prices: undefined
    };
  }

  async componentDidMount() {
    const prices = await this.props.getPrices();
    delete prices._id;

    this.setState({
      prices
    })
  }

  async save() {
    await this.props.updatePrice(this.state.prices);
  }

  onChangeInput(e, type, number) {
    const prices = JSON.parse(JSON.stringify(this.state.prices))

    prices[type][number] = e.target.value;

    this.setState({
      prices
    });
  }

  componentWillUnmount() {}

  render() {
    return (
      <div className={styles.wrapper}>
        <Header />
        {this.state.prices ?
        <div>
          <div>
            <span>Forex Signals:</span>
            <input type = {'number'} value = {this.state.prices['forexSignals']['1']} onChange = {(e) => this.onChangeInput(e, 'forexSignals', 1)}/>
            <input type = {'number'} value = {this.state.prices['forexSignals']['2']} onChange = {(e) => this.onChangeInput(e, 'forexSignals', 2)}/>
            <input type = {'number'} value = {this.state.prices['forexSignals']['3']} onChange = {(e) => this.onChangeInput(e, 'forexSignals', 3)}/>
            €
          </div>
          <div>
          <span>Index Signals:</span>
            <input type = {'number'} value = {this.state.prices['indexSignals']['1']} onChange = {(e) => this.onChangeInput(e, 'indexSignals', 1)}/>
            <input type = {'number'} value = {this.state.prices['indexSignals']['2']} onChange = {(e) => this.onChangeInput(e, 'indexSignals', 2)}/>
            <input type = {'number'} value = {this.state.prices['indexSignals']['3']} onChange = {(e) => this.onChangeInput(e, 'indexSignals', 3)}/>
            €
          </div>
          <div>
          <span>Forex Education:</span>
            <input type = {'number'} value = {this.state.prices['forexEducation']['1']} onChange = {(e) => this.onChangeInput(e, 'forexEducation', 1)}/>
            <input type = {'number'} value = {this.state.prices['forexEducation']['2']} onChange = {(e) => this.onChangeInput(e, 'forexEducation', 2)}/>
            <input type = {'number'} value = {this.state.prices['forexEducation']['3']} onChange = {(e) => this.onChangeInput(e, 'forexEducation', 3)}/>
            €
          </div>
          <button style = {{width: '100px'}} onClick = {this.save}>Save</button>
        </div> : null
        }
        
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    pricesState: state,
  };
}

export default connect(mapStateToProps, actions)(Prices);
