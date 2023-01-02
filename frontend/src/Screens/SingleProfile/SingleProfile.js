import React, { useEffect, useState } from "react";
import MainScreen from "../../Components/Main Screen/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProfileAction,
  updateProfileAction,
} from "../../Actions/profileActions";
import ErrorMessage from "../../Components/ErrorMessage";
import Loading from "../../Components/Loading";
import ReactMarkdown from "react-markdown";

function SingleProfile({ match, history }) {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [date, setDate] = useState("");

  const dispatch = useDispatch();

  const profileUpdate = useSelector((state) => state.profileUpdate);
  const { loading, error } = profileUpdate;

  const profileDelete = useSelector((state) => state.profileDelete);
  const { loading: loadingDelete, error: errorDelete } = profileDelete;

  

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/profile/${match.params.id}`);

      setTitle(data.title);
      setContent(data.content);
      setDate(data.updatedAt);
    };

    fetching();
  }, [match.params.id, date]);

  const resetHandler = () => {
    setTitle("");
    setContent("");
  };
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const updateHandler = (e) => {
    e.preventDefault();
    if (userInfo) {
      dispatch(updateProfileAction(match.params.id, title, content));
      if (!title || !content) return;
      resetHandler();
      history.push("/profiles");
    } else {
      window.alert("You can not edit unless you are logged in.");
      history.push("/login");
    }
  };

  return (
    <MainScreen title="Edit Profile">
      <Card>
        <Card.Header>Edit your Profile</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            <Form.Group controlId="title">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter the content"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Profile Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{title}</ReactMarkdown>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            {loading && <Loading size={50} />}
            <Button variant="primary" type="submit">
              Update Profile
            </Button>
            
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default SingleProfile;
