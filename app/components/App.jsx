import { withRouter } from 'react-router';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import React from 'react';
import axios from 'axios';

const App = React.createClass({
  getInitialState() {
    return {
      editing: null,

      posts: []
    };
  },

  componentWillMount() {
    axios.get('/api/posts')
      .then((res) => {
        this.setState({ posts: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  handleTouchTap() {
    const nextEditing = {
      submitter: 'Matt',
      title: '',
      topic: '',
      url: '',
      votes: Infinity
    };
    const nextPosts = this.state.posts.concat(nextEditing);

    this.setState({ editing: nextEditing, posts: nextPosts });
  },

  handleTitleTouchTap() {
    this.props.router.push('/');
  },

  decrementVotes(post) {
    const nextPosts = this.state.posts.map((element) => {
      if (post !== element) {
        return element;
      }

      return Object.assign({}, post, { votes: post.votes - 1 });
    });

    this.setState({ posts: nextPosts });
  },

  incrementVotes(post) {
    const nextPosts = this.state.posts.map((element) => {
      if (post !== element) {
        return element;
      }

      return Object.assign({}, post, { votes: post.votes + 1 });
    });

    this.setState({ posts: nextPosts });
  },

  stopEditingPost(post) {
    const nextPosts = this.state.posts.filter((element) => {
      return post !== element;
    });

    this.setState({ editing: null, posts: nextPosts });
  },

  updatePost(post, nextPost) {
    axios.post('/api/posts', nextPost)
      .then((res) => {
        const nextPosts = this.state.posts.map((element) => {
          if (post !== element) {
            return element;
          }

          return res.data;
        });

        this.setState({ editing: null, posts: nextPosts });
      })
      .catch((err) => {
        console.error(err);
      });
  },

  render() {
    const styleFlatButton = {
      height: '64px',
      lineHeight: '64px'
    };

    const styleTitle = {
      cursor: 'pointer'
    };

    return <div>
      <AppBar
        onTitleTouchTap={this.handleTitleTouchTap}
        title="Galvanize Shares"
        titleStyle={styleTitle}
      >
        <FlatButton
          style={styleFlatButton}
          onTouchTap={this.handleTouchTap}
          label="New Post"
        />
      </AppBar>

      {React.cloneElement(this.props.children, {
        posts: this.state.posts,
        editing: this.state.editing,
        decrementVotes: this.decrementVotes,
        incrementVotes: this.incrementVotes,
        stopEditingPost: this.stopEditingPost,
        updatePost: this.updatePost
      })}
    </div>;
  }
});

export default withRouter(App);
