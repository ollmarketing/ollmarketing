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

import styles from "./updateBlog.module.css";

registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType);

class UpdateBlog extends Component {
  constructor(props) {
    super(props);

    this.setTags = this.setTags.bind(this);
    this.onProcessFile = this.onProcessFile.bind(this);
    this.submit = this.submit.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
    this.onChangeHeader = this.onChangeHeader.bind(this);
    this.onInitFilepond = this.onInitFilepond.bind(this);

    this.state = {
      tags: [],
      file: "",
      text: "",
      checkbox: true,
      header: "",
      errorStatus: false,
      nothingChanged: false,
      blogData: {},
    };

    this.pond = {
        ref: null
    }
  }

  async componentDidMount() {
      await this.props.getBlog(this.props.match.params.id);
      const blogData = this.props.updateBlogState.blog.blog;

      this.setState({
        blogData,
        tags: blogData.tags,
        file: blogData.file,
        text: blogData.text,
        checkbox: blogData.visible,
        header: blogData.header,
        errorStatus: false,
      });
  }

  componentWillUnmount() {}

  setTags(newTags) {
    this.setState({
      tags: newTags,
      errorStatus: false,
      nothingChanged: false,
    });
  }

  async submit() {
    if (!(this.state.file || this.state.header || this.state.text)) {
      this.setState({
        errorStatus: true,
      });
    } else {
        const oldBlog = JSON.parse(JSON.stringify(this.state.blogData));
        delete oldBlog._id;
        const data = {
            file: this.state.file,
            header: this.state.header,
            text: this.state.text,
            visible: this.state.checkbox,
            tags: this.state.tags,
        };

        if(JSON.stringify(data) === JSON.stringify(oldBlog)) {
            this.setState({
                nothingChanged: true,
            })
        } else {
            try {
                const res = await this.props.updateBlog(this.state.blogData._id, data);
                if(res) {
                    this.props.history.push("/admin");
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

  onChangeCheckbox(e) {
    this.setState({
      checkbox: e.target.checked,
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
        <div className={styles.text}>Upadate Blog</div>
        <div className={styles.form}>
          <div className={styles.filepond}>
            <FilePond
              acceptedFileTypes={["image/*"]}
              ref={ref => this.pond = ref} 
              name="blogImage"
              oninit = {this.onInitFilepond}
              maxParallelUploads={1}
              ref={(ref) => (this.pond = ref)}
              onprocessfiles={this.onProcessFile}
              server="/api/upload"
              maxFiles={1}
              onremovefile={this.onRemoveFile}
              required={true}
              file
            />
          </div>
          Header
          <textarea className={styles.header} onChange={this.onChangeHeader} value = {this.state.header}/>
          Content
          <textarea className={styles.textarea} onChange={this.onChangeText} value = {this.state.text}/>
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
    updateBlogState: state,
  };
}

export default connect(mapStateToProps, actions)(UpdateBlog);
