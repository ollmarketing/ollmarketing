import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import MobileHeader from "../Header/Mobile/MobileHeader";
import Footer from "../Footer/Footer";
import * as actions from "../../actions";
import { getDate } from "./helper";

import styles from "./blog.module.css";

class Blog extends Component {
  constructor(props) {
    super(props);

    this.updateDimensions = this.updateDimensions.bind(this);

    this.state = {
      blog: {},
      recomendedBlocks: [],
      date: "",
      isMobile:
        document.body.clientWidth < 831 || window.innerHeight < 730
          ? true
          : false,
    };
  }

  async componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);

    window.scrollTo(0, 0);

    document
      .getElementsByClassName(styles.content)[0]
      .classList.add(styles.contentActive);

    const recomendedBlocks = [];
    await this.props.getBlog(this.props.match.params.id);

    const blog = this.props.blogState.blog.blog;

    await this.props.getBlogsByTags({
      tags: blog.tags,
      currentBlogId: blog._id,
    });

    const date = getDate(blog.createdAt);

    const recomendedBlogs = this.props.blogState.blog.blogs[0];
    recomendedBlogs.sort(() => Math.random() - 0.5).splice(2);

    for (const key in recomendedBlogs) {
      recomendedBlocks.push(
        <div className={styles.recomendedBlogContainer}>
          <div className={styles.recomendedBlog}>
            <div
              className={styles.recomendedBlogImage}
              style={{
                backgroundImage: `url('/${recomendedBlogs[key].file}')`,
              }}
            />
            <div className={styles.recomendedBlogTitle}>
              {recomendedBlogs[key].header}
            </div>
            <div className={styles.recomendedBlogDate}>
              {getDate(recomendedBlogs[key].createdAt)}
            </div>
            <div className={styles.recomendedBlogText}>
              {recomendedBlogs[key].text}
            </div>
            <div className={styles.showMore}>
              <Link to={`/blog/${recomendedBlogs[key]._id}`}>Show more</Link>
            </div>
          </div>
        </div>
      );
    }

    this.setState({
      blog,
      date,
      recomendedBlocks,
      isMobile:
        document.body.clientWidth < 831 || window.innerHeight < 730
          ? true
          : false,
    });
  }

  async componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      await this.componentDidMount();
    }
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
    const { blog } = this.state;
    return (
      <div>
        <div className={styles.bg} />
        {this.state.isMobile ? <MobileHeader /> : <Header />}
        <div className={styles.wrapper}>
          <div className={styles.content}>
            {/* {!this.state.isMobile ? <Header /> : false} */}
            <div className={styles.container}>
              <div className={styles.blog}>
                <div className={styles.backToAllBlogs}>
                  <Link to="/blog">
                    <div className={styles.backIcon} />
                    Back to all courses
                  </Link>
                </div>
                <div
                  className={styles.blogImage}
                  style={{ backgroundImage: `url('/${blog.file}')` }}
                />
                <div className={styles.title}>{blog.header}</div>
                <div className={styles.date}>{this.state.date}</div>
                <div className={styles.text}>{blog.text}</div>
              </div>
              <div className={styles.recomended}>
                <div className={styles.recomendedTitle}>Recomended:</div>
                <div className={styles.recomendedBlogs}>
                  {this.state.recomendedBlocks}
                </div>
              </div>
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
    blogState: state,
  };
}

export default connect(mapStateToProps, actions)(Blog);
