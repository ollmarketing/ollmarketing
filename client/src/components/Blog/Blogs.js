import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import MobileHeader from "../Header/Mobile/MobileHeader";
import Footer from "../Footer/Footer";
import * as actions from "../../actions";

import styles from "./blogs.module.css";
import { getDate } from "./helper";

class Blogs extends Component {
  constructor(props) {
    super(props);

    this.updateDimensions = this.updateDimensions.bind(this);

    this.state = {
      blogs: [],
      blogBlocks: [],
      isMobile:
        document.body.clientWidth < 831 || window.innerHeight < 730
          ? true
          : false,
    };
  }

  async componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);

    window.scrollTo(0, 0);

    await this.props.getBlogs();

    const blogs = this.props.blogsState.blog.blogs[0];

    const blogBlocks = [];
    for (const key in blogs) {
      let margin = "32px";
      if ((Number(key) + 1) % 3 === 0) {
        margin = "0";
      }
      if (blogs[key].visible) {
        blogBlocks.push(
          <div className={styles.blog} style={{ marginRight: margin }}>
            <div
              className={styles.blogImage}
              style={{ backgroundImage: `url('/${blogs[key].file}')` }}
            />
            <div className={styles.blogTitle}>{blogs[key].header}</div>
            <div className={styles.blogDate}>
              {getDate(blogs[key].createdAt)}
            </div>
            <div className={styles.blogText}>{blogs[key].text}</div>
            <div className={styles.showMore}>
              <Link to={`/blog/${blogs[key]._id}`}>Explore</Link>
            </div>
          </div>
        );
      }
    }

    this.setState({
      blogs,
      blogBlocks,
      isMobile:
        document.body.clientWidth < 831 || window.innerHeight < 730
          ? true
          : false,
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions() {
    this.setState({
      isMobile:
        document.body.clientWidth < 831 || window.innerHeight < 730
          ? true
          : false,
    });
  }

  render() {
    return (
      <div>
        <div className={styles.bg} />
        {this.state.isMobile ? <MobileHeader /> : <Header />}
        <div className={styles.wrapper}>
          <div className={styles.content}>
            {/* {!this.state.isMobile ? <Header /> : false} */}
            <div className={styles.block}>
              <div className={styles.title}>Offers</div>
              <div className={styles.blogs}>{this.state.blogBlocks}</div>
            </div>
            <Footer />
          </div>
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
