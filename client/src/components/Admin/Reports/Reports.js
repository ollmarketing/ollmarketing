import React, { Component } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import Header from "../Header/Header";
import SweetAlert from 'react-bootstrap-sweetalert'


import styles from "./reports.module.css";
import { getDate } from "../../Blog/helper";

class Reports extends Component {
  constructor(props) {
    super(props);

    this.onClickDelete = this.onClickDelete.bind(this);
    this.onConfirmDelete = this.onConfirmDelete.bind(this);
    this.onCancel = this.onCancel.bind(this);

    this.state = {
      blocks: [],
      reports: [],
      alert: null,
    };
  }

  async componentDidMount() {
    await this.props.getReports();
    const reports = this.props.reportsState.report.reports[0];

    const blocks = [];
    for(const key in reports) {
      blocks.push(
        <div className = {styles.report} key = {reports[key]._id}>
            <div className = {styles.name}>{getDate(reports[key].date)}</div>
            <div className = {styles.buttons}>
              <div><a href = {`/admin/update/report/${reports[key]._id}`} target = '_blank'>Edit</a></div>
              <div onClick = {() => this.onClickDelete(reports[key]._id)}>Delete</div>
            </div>
        </div>
      )
    }

    this.setState({
      blocks,
      reports
    })
  }

  componentWillUnmount() {}

  onClickDelete(id) {
    const alert = () => (<SweetAlert
      showCancel
      confirmBtnText="Yes, delete it!"
      confirmBtnBsStyle="danger"
      title={'Are you sure to delete?'}
      onConfirm={() => this.onConfirmDelete(id)}
      onCancel={this.onCancel}
      focusCancelBtn
    >
      You will not be able to recover this case!
    </SweetAlert>);

    this.setState({
        alert: alert()
    });
  }

  async onConfirmDelete(id) {
    const blocks = this.state.blocks.slice();

    await this.props.deleteReport(id);

    for(const key in blocks) {
      if(blocks[key].key === id) {
        blocks.splice(Number(key), 1);
      }
    }

    this.setState({
      alert: null,
      blocks
  });
  }

  onCancel() {
    this.setState({
        alert: null
    });
}


  render() {
    return (
      <div className={styles.wrapper}>
        <Header />
        <div className = {styles.reports}>
          {this.state.blocks}
          {this.state.alert}
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    reportsState: state,
  };
}

export default connect(mapStateToProps, actions)(Reports);
