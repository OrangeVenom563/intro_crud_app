import React from 'react';
import axios from "axios";
        
import { Table, Button } from "react-bootstrap";


const API_URL = "https://jsonplaceholder.typicode.com/posts";

class PostsPage extends React.Component {
    state = {
        posts: [],
        id: "",
        userId: "",
        title: "",
        body: "",
      };
    
  
    componentDidMount = () => this.getPosts();
  
    getPosts = async () => {
      // API Call to server and get all posts
      try {
        const { data } = await axios.get(API_URL);
        this.setState({ posts: data });
      } catch (err) {
        console.error(err);
      }
    };
  
    createPost = async () => {
      // API Call to server and add new post
      try {
        const { userId, title, body } = this.state;
        const { data } = await axios.post(API_URL, {
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
        const { data } = await axios.put(`${API_URL}/${id}`, {
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
        await axios.delete(`${API_URL}/${postId}`);
  
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
          <p>Welcome to Guvi Post App!</p>
          <form onSubmit={this.handleSubmit}>
            <label> UserID : </label>
            <input
              type="number"
              name="userId"
              value={this.state.userId}
              onChange={this.handleChange}
            />
            <label> Title : </label>
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
            <label> Body : </label>
            <input
              type="text"
              name="body"
              value={this.state.body}
              onChange={this.handleChange}
            />
            <input type="Submit" />
          </form>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>UserId</th>
                <th>Title</th>
                <th>Body</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.posts.map((post) => {
                return (
                  <tr key={post.id}>
                    <td>{post.id}</td>
                    <td>{post.userId}</td>
                    <td>{post.title}</td>
                    <td>{post.body}</td>
                    <td>
                      <Button size="sm" onClick={() => this.selectPost(post)}>
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => this.deletePost(post.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      );
    }
  }

  export default PostsPage;