import React, { Component } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import { connect } from "react-redux";
import * as actions from "../../../../actions";

import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import "@pathofdev/react-tag-input/build/index.css";
import Header from "../../Header/Header";

import styles from "./createBlog.module.css";

registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType, FilePondPluginFileEncode);

class CreateBlog extends Component {
  constructor(props) {
    super(props);

    this.setTags = this.setTags.bind(this);
    this.onProcessFile = this.onProcessFile.bind(this);
    this.submit = this.submit.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
    this.onChangeHeader = this.onChangeHeader.bind(this);

    this.state = {
      tags: [],
      file: "",
      text: "",
      checkbox: true,
      header: "",
      errorStatus: false,
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  setTags(newTags) {
    this.setState({
      tags: newTags,
      errorStatus: false,
    });
  }

  async submit() {
    if (!(this.state.file || this.state.header || this.state.text)) {
      this.setState({
        errorStatus: true,
      });
    } else {
      const data = {
        file: this.state.file,
        header: this.state.header,
        text: this.state.text,
        visible: this.state.checkbox,
        tags: this.state.tags,
      };
      try {
        await this.props.createBlog(data);

        //this.props.history.push("/");
      } catch (err) {
        this.setState({
          errorStatus: true,
        });
      }
    }
  }

  onProcessFile() {
    console.log(this.pond.getFile().file);
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

  onChangeCheckbox(e) {
    this.setState({
      checkbox: e.target.checked,
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
        <div className={styles.text}>Create Blog</div>
        <div className={styles.form}>
          <div className={styles.filepond}>
            <FilePond
              acceptedFileTypes={["image/*"]}
              name="blogImage"
              maxParallelUploads={1}
              ref={(ref) => (this.pond = ref)}
              onprocessfiles={this.onProcessFile}
              server="/api/upload"
              maxFiles={1}
              onremovefile={this.onRemoveFile}
              required={true}
              allowFileEncode={true}
            />
          </div>
          Header
          <textarea className={styles.header} onChange={this.onChangeHeader} />
          Content
          <textarea className={styles.textarea} onChange={this.onChangeText} />
          <div className={styles.tagInput}>
            <ReactTagInput
              id="tag-input"
              tags={this.state.tags}
              onChange={(newTags) => this.setTags(newTags)}
              placeholder="Add tags (enter)"
              required={false}
            />
          </div>
          <div className={styles.checkbox}>
            <label>
              <input
                type="checkbox"
                onChange={this.onChangeCheckbox}
                checked={this.state.checkbox}
              />{" "}
              visible
            </label>
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
    createBlogState: state,
  };
}

export default connect(mapStateToProps, actions)(CreateBlog);
