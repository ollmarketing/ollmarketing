import React, { Component } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import Header from "../Header/Header";
import SweetAlert from 'react-bootstrap-sweetalert'


import styles from "./blogs.module.css";

class Blogs extends Component {
  constructor(props) {
    super(props);

    this.onClickDelete = this.onClickDelete.bind(this);
    this.onConfirmDelete = this.onConfirmDelete.bind(this);
    this.onCancel = this.onCancel.bind(this);

    this.state = {
      blocks: [],
      blogs: [],
      alert: null,
    };
  }

  async componentDidMount() {
    await this.props.getBlogs();
    const blogs = this.props.blogsState.blog.blogs[0];

    const blocks = [];
    for(const key in blogs) {
      blocks.push(
        <div className = {styles.blog} key = {blogs[key]._id}>
            <div className = {styles.image} style = {{backgroundImage: `url(/${blogs[key].file})`}}/>
            <div className = {styles.name}>{blogs[key].header}</div>
            <div className = {styles.buttons}>
              <div><a href = {`/admin/update/blog/${blogs[key]._id}`} target = '_blank'>Edit</a></div>
              <div onClick = {() => this.onClickDelete(blogs[key]._id)}>Delete</div>
            </div>
        </div>
      )
    }

    this.setState({
      blocks,
      blogs
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

    await this.props.deleteBlog(id);

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
        <div className = {styles.blogs}>
          {this.state.blocks}
          {this.state.alert}
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    blogsState: state,
  };
}

export default connect(mapStateToProps, actions)(Blogs);
