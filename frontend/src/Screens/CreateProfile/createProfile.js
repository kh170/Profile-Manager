import React, { useState } from "react";
import MainScreen from "../../Components/Main Screen/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createProfileAction } from "../../Actions/profileActions";
import Loading from "../../Components/Loading";
import ErrorMessage from "../../Components/ErrorMessage";
import ReactMarkdown from "react-markdown";

function CreateProfile({ history }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const dispatch = useDispatch();

  const profileCreate = useSelector((state) => state.profileCreate);
  const { loading, error, profile } = profileCreate;

  console.log(profile);

  const resetHandler = () => {
    setTitle("");
    setContent("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!title || !content) return;
    dispatch(createProfileAction(title, content));

    resetHandler();
    history.push("/profiles");
  };

  return (
    <MainScreen title="Create a Profile">
      <Card>
        <Card.Header>Create a new Profile</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                placeholder="Enter the content"
                rows={4}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Biography Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{title}</ReactMarkdown>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              Create Profile
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Fields
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default CreateProfile;
