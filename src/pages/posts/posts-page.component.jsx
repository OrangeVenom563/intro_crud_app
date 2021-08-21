import React from "react";
import axios from "axios";

import EditForm from "../../components/edit-form/edit-from.component";
import PostCard from "../../components/post-card/post-card.component";

const API_URL = "https://jsonplaceholder.typicode.com";
const API_POST = API_URL + "/posts";
const API_USERS = API_URL + "/users";
const API_COMMENTS = API_URL + "/comments";

class PostApp extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      id: "",
      userId: "",
      title: "",
      body: "",
    };
    this.userDetails = [];
    this.comments = [];
  }

  componentDidMount = () => {
    this.getUserDetails();
    this.getPosts();
  };

  getPosts = async () => {
    // API Call to server and get all posts
    try {
      const { data } = await axios.get(API_POST);
      this.setState({ posts: data });
    } catch (err) {
      console.error(err);
    }
  };

  getUserDetails = async () => {
    // API Call to server and get all user names
    try {
      const { data } = await axios.get(API_USERS);
      this.userDetails = data;
    } catch (err) {
      console.error(err);
    }
  };

  getComments = async () => {
    try {
      const { data } = await axios.get(API_COMMENTS);
      this.comments = data;
    } catch (err) {
      console.error(err);
    }
  };

  createPost = async () => {
    // API Call to server and add new post
    try {
      const { userId, title, body } = this.state;
      const { data } = await axios.post(API_POST, {
        userId,
        title,
        body,
      });
      const posts = [...this.state.posts];
      posts.push(data);
      this.setState({ posts, userId: "", title: "", body: "" });
    } catch (err) {
      console.error(err);
    }
  };

  updatePost = async () => {
    // API Call to server and update an existing post
    try {
      const { id, userId, title, body, posts } = this.state;
      const { data } = await axios.put(`${API_POST}/${id}`, {
        userId,
        title,
        body,
      });
      const index = posts.findIndex((post) => post.id === id);
      posts[index] = data;

      this.setState({ posts, id: "", userId: "", title: "", body: "" });
    } catch (err) {
      console.log(err);
    }
  };

  deletePost = async (postId) => {
    // API Call to server and delete post
    try {
      await axios.delete(`${API_POST}/${postId}`);

      let posts = [...this.state.posts];
      posts = posts.filter(({ id }) => id !== postId);

      this.setState({ posts });
    } catch (err) {
      console.error(err);
    }
  };

  selectPost = (post) => this.setState({ ...post });

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted...");
    if (this.state.id) {
      this.updatePost();
    } else {
      this.createPost();
    }
  };

  render() {
    return (
      <>
        <EditForm
          submition={this.handleSubmit}
          changes={this.handleChange}
          userNames={this.userDetails}
          {...this.state}
        />

        {this.state.posts.map((post) => {
          return (
            <PostCard key={post.id} post={post} selectPost={this.selectPost} deletePost={this.deletePost}/>
          );
        })}
      </>
    );
  }
}

export default PostApp;
