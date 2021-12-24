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

import styles from "./createBroker.module.css";

registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType);

class CreateBroker extends Component {
  constructor(props) {
    super(props);

    this.onProcessFile = this.onProcessFile.bind(this);
    this.submit = this.submit.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onChangeLink = this.onChangeLink.bind(this);
    this.onChangeHeader = this.onChangeHeader.bind(this);

    this.state = {
      link: "",
      file: "",
      text: "",
      header: "",
      errorStatus: false,
    };
  }

  onChangeLink(e) {
    this.setState({
      link: e.target.value,
      errorStatus: false,
    });
  }

  async submit() {
    if (
      !(
        this.state.file ||
        this.state.header ||
        this.state.text ||
        this.state.link
      )
    ) {
      this.setState({
        errorStatus: true,
      });
    } else {
      const data = {
        file: this.state.file,
        header: this.state.header,
        text: this.state.text,
        link: this.state.link,
      };
      try {
        await this.props.createBroker(data);

        this.props.history.push("/");
      } catch (err) {
        this.setState({
          errorStatus: true,
        });
      }
    }
  }

  onProcessFile() {
    this.setState({
      file: this.pond.getFile().file.name,
      errorStatus: false,
    });
  }

  onChangeText(e) {
    this.setState({
      text: e.target.value,
      errorStatus: false,
    });
  }

  onChangeHeader(e) {
    this.setState({
      header: e.target.value,
      errorStatus: false,
    });
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <Header />
        <div className={styles.text}>Create Broker</div>
        <div className={styles.form}>
          <div className={styles.filepond}>
            <FilePond
              acceptedFileTypes={["image/*"]}
              name="brokerImage"
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
          <textarea className={styles.header} onChange={this.onChangeHeader} />
          Content
          <textarea className={styles.textarea} onChange={this.onChangeText} />
          Link
          <textarea className={styles.link} onChange={this.onChangeLink} />
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
    createBrokerState: state,
  };
}

export default connect(mapStateToProps, actions)(CreateBroker);
