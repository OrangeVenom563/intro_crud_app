import React from "react";
import { Button, Card, InputGroup } from "react-bootstrap";

const PostCard = ({ post, selectPost, deletePost }) => {
  const { id, userId, title, body } = post;
  return (
    <Card key={id} className="my-3">
      <Card.Header as="h5">{id + "   " + userId}</Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        {/* <Card.Img variant="top" src={postpic} height="100px" /> */}
        <Card.Text>{body}</Card.Text>

        <InputGroup className="mb-3">
          <Button variant="outline-secondary" onClick={() => selectPost(post)}>
            <i className="bi bi-pencil-square"></i>
          </Button>
          <Button variant="outline-secondary">
            <i className="bi bi-chat-right-text"></i>
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => deletePost(post.id)}
          >
            <i className="bi bi-trash"></i>
          </Button>
        </InputGroup>
      </Card.Body>
    </Card>
  );
};

export default PostCard;
