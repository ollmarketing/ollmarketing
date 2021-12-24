import React, { Component } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import { connect } from "react-redux";
import * as actions from "../../../../actions";

import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import "@pathofdev/react-tag-input/build/index.css";
import Header from "../../Header/Header";

import styles from "./updateReport.module.css";

registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType);

class UpdateReport extends Component {
  constructor(props) {
    super(props);

    this.onProcessFile = this.onProcessFile.bind(this);
    this.submit = this.submit.bind(this);
    this.onChangePips = this.onChangePips.bind(this);
    this.onChangeWinRate = this.onChangeWinRate.bind(this);
    this.onChangeSignals = this.onChangeSignals.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onInitFilepond = this.onInitFilepond.bind(this);

    this.state = {
      file: "",
      pips: "",
      winRate: "",
      signals: "",
      date: '',
      errorStatus: false,
      nothingChanged: false,
      reportData: {},
    };

    this.pond = {
        ref: null
    }
  }

  async componentDidMount() {
      await this.props.getReport(this.props.match.params.id);
      const reportData = this.props.updateReportState.report.report;

      this.setState({
        reportData,
        file: reportData.file,
        pips: reportData.pips,
        signals: reportData.signals,
        winRate: reportData.winRate,
        date: reportData.date.split('T')[0],
        errorStatus: false,
      });
  }

  componentWillUnmount() {}

  async submit() {
    if (!(this.state.file || this.state.pips || this.state.winRate || this.state.signals || this.state.date)) {
      this.setState({
        errorStatus: true,
      });
    } else {
        const oldReport = JSON.parse(JSON.stringify(this.state.reportData));
        delete oldReport._id;
        const data = {
            file: this.state.file,
            pips: this.state.pips,
            winRate: this.state.winRate,
            signals: this.state.signals,
            date: new Date(this.state.date),
        };

        if(JSON.stringify(data) === JSON.stringify(oldReport)) {
            this.setState({
                nothingChanged: true,
            })
        } else {
            try {
                const res = await this.props.updateReport(this.state.reportData._id, data);
                if(res) {
                    this.props.history.push("/admin/report");
                } else {
                    this.setState({
                        errorStatus: true,
                    })
                }
            } catch (err) {
                console.log(err);
                this.setState({
                    errorStatus: true,
                });
            }
        }
    }
  }

  onProcessFile() {
    this.setState({
      file: this.pond.getFile().file.name,
      errorStatus: false,
      nothingChanged: false,
    });
  }


  onInitFilepond() {
      setTimeout(() => {
        const file = this.state.file;
        this.pond.addFile(file, {type: 'local'});
      }, 750)
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
      date: e.target.value,
    });
  }

  onChangeWinRate(e) {
    this.setState({
      winRate: e.target.value,
      errorStatus: false,
    });
  }


  render() {
    return (
        <div className={styles.wrapper}>
        <Header />
        <div className={styles.text}>Update Report</div>
        <div className={styles.form}>
          Win Rate
          <input
            className={styles.date}
            type="date"
            required
            onChange={this.onChangeDate}
            value = {this.state.date ? this.state.date : ''}
          />
          Count of Signals
          <textarea className={styles.header} onChange={this.onChangeSignals} value = {this.state.signals}/>
          Count of Pips
          <textarea className={styles.textarea} onChange={this.onChangePips} value = {this.state.pips}/>
          Win Rate
          <textarea className={styles.link} onChange={this.onChangeWinRate} value = {this.state.winRate}/>
          <div className={styles.filepond}>
            <FilePond
              name="reportFile"
              maxParallelUploads={1}
              oninit = {this.onInitFilepond}
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
          {this.state.nothingChanged ? (
            <span className={styles.error}>Nothing changed!</span>
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
    updateReportState: state,
  };
}

export default connect(mapStateToProps, actions)(UpdateReport);
