import React, { Component } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import { connect } from "react-redux";
import * as actions from "../../../../actions";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import "@pathofdev/react-tag-input/build/index.css";
import Header from "../../Header/Header";

import styles from "./createReport.module.css";

registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType);

class CreateReport extends Component {
  constructor(props) {
    super(props);

    this.onProcessFile = this.onProcessFile.bind(this);
    this.submit = this.submit.bind(this);
    this.onChangePips = this.onChangePips.bind(this);
    this.onChangeWinRate = this.onChangeWinRate.bind(this);
    this.onChangeSignals = this.onChangeSignals.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);

    this.state = {
      pips: "",
      file: "",
      winRate: "",
      signals: "",
      date: false,
      errorStatus: false,
    };
  }

  onChangeWinRate(e) {
    this.setState({
      winRate: e.target.value,
      errorStatus: false,
    });
  }

  async submit() {
    if (
      this.state.file &&
      this.state.pips &&
      this.state.winRate &&
      this.state.signals &&
      this.state.date
    ) {
      const data = {
        file: this.state.file,
        pips: this.state.pips,
        winRate: this.state.winRate,
        signals: this.state.signals,
        date: this.state.date,
      };
      try {
        await this.props.createReport(data);

        this.props.history.push("/");
      } catch (err) {
        this.setState({
          errorStatus: true,
        });
      }
    } else {
      this.setState({
        errorStatus: true,
      });
    }
  }

  onProcessFile() {
    this.setState({
      file: this.pond.getFile().file.name,
      errorStatus: false,
    });
  }

  onChangePips(e) {
    this.setState({
      pips: e.target.value,
      errorStatus: false,
    });
  }

  onChangeSignals(e) {
    this.setState({
      signals: e.target.value,
      errorStatus: false,
    });
  }

  onChangeDate(e) {
    this.setState({
      date: new Date(e.target.value),
    });
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <Header />
        <div className={styles.text}>Create Report</div>
        <div className={styles.form}>
          Win Rate
          <input
            className={styles.date}
            type="date"
            required
            onChange={this.onChangeDate}
          />
          Count of Signals
          <textarea className={styles.header} onChange={this.onChangeSignals} />
          Count of Pips
          <textarea className={styles.textarea} onChange={this.onChangePips} />
          Win Rate
          <textarea className={styles.link} onChange={this.onChangeWinRate} />
          <div className={styles.filepond}>
            <FilePond
              name="reportFile"
              maxParallelUploads={1}
              ref={(ref) => (this.pond = ref)}
              onprocessfiles={this.onProcessFile}
              server="/api/upload"
              maxFiles={1}
              onremovefile={this.onRemoveFile}
              required={true}
            />
          </div>
          {this.state.errorStatus ? (
            <span className={styles.error}>Something went wrong</span>
          ) : null}
          <div className={styles.saveButton} onClick={this.submit}>
            Save
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    createReportState: state,
  };
}

export default connect(mapStateToProps, actions)(CreateReport);
