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

import styles from "./updateBroker.module.css";

registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType);

class UpdateBroker extends Component {
  constructor(props) {
    super(props);

    this.onChangeLink = this.onChangeLink.bind(this);
    this.onProcessFile = this.onProcessFile.bind(this);
    this.submit = this.submit.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onChangeHeader = this.onChangeHeader.bind(this);
    this.onInitFilepond = this.onInitFilepond.bind(this);

    this.state = {
      file: "",
      text: "",
      header: "",
      link: "",
      errorStatus: false,
      nothingChanged: false,
      brokerData: {},
    };

    this.pond = {
        ref: null
    }
  }

  async componentDidMount() {
      await this.props.getBroker(this.props.match.params.id);
      const brokerData = this.props.updateBrokerState.broker.broker;

      this.setState({
        brokerData,
        file: brokerData.file,
        text: brokerData.text,
        header: brokerData.header,
        link: brokerData.link,
        errorStatus: false,
      });
  }

  componentWillUnmount() {}

  async submit() {
    if (!(this.state.file || this.state.header || this.state.text || this.state.link)) {
      this.setState({
        errorStatus: true,
      });
    } else {
        const oldBroker = JSON.parse(JSON.stringify(this.state.brokerData));
        delete oldBroker._id;
        const data = {
            file: this.state.file,
            header: this.state.header,
            text: this.state.text,
            link: this.state.link
        };

        if(JSON.stringify(data) === JSON.stringify(oldBroker)) {
            this.setState({
                nothingChanged: true,
            })
        } else {
            try {
                const res = await this.props.updateBroker(this.state.brokerData._id, data);
                if(res) {
                    this.props.history.push("/admin/broker");
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

  onChangeText(e) {
    this.setState({
      text: e.target.value,
      errorStatus: false,
      nothingChanged: false,
    });
  }

  onChangeHeader(e) {
    this.setState({
      header: e.target.value,
      errorStatus: false,
      nothingChanged: false,
    });
  }

  onChangeLink(e) {
    this.setState({
      link: e.target.value,
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

  render() {
    return (
        <div className={styles.wrapper}>
        <Header />
        <div className={styles.text}>Update Broker</div>
        <div className={styles.form}>
          <div className={styles.filepond}>
            <FilePond
              acceptedFileTypes={["image/*"]}
              name="brokerImage"
              oninit = {this.onInitFilepond}
              maxParallelUploads={1}
              ref={(ref) => (this.pond = ref)}
              onprocessfiles={this.onProcessFile}
              server="/api/upload"
              maxFiles={1}
              onremovefile={this.onRemoveFile}
              required={true}
            />
          </div>
          Header
          <textarea className={styles.header} onChange={this.onChangeHeader} value = {this.state.header}/>
          Content
          <textarea className={styles.textarea} onChange={this.onChangeText} value = {this.state.text}/>
          Link
          <textarea className={styles.link} onChange={this.onChangeLink} value = {this.state.link}/>
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
    updateBrokerState: state,
  };
}

export default connect(mapStateToProps, actions)(UpdateBroker);
