import React from "react";
import axios from "axios";
import { Button, Card, InputGroup } from "react-bootstrap";

import EditForm from "../../components/edit-form/edit-from.component";

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
          const { id, userId, title, body } = post;
          return (
            <Card key={id} className="my-3">
              <Card.Header as="h5">{id + "   " + userId}</Card.Header>
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                {/* <Card.Img variant="top" src={postpic} height="100px" /> */}
                <Card.Text>{body}</Card.Text>

                <InputGroup className="mb-3">
                  <Button
                    variant="outline-secondary"
                    onClick={() => this.selectPost(post)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </Button>
                  <Button variant="outline-secondary">
                    <i className="bi bi-chat-right-text"></i>
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() => this.deletePost(post.id)}
                  >
                    <i class="bi bi-trash"></i>
                  </Button>
                </InputGroup>
              </Card.Body>
            </Card>
          );
        })}
      </>
    );
  }
}

export default PostApp;
