import React, { useEffect } from "react";
import MainScreen from "../../Components/Main Screen/MainScreen";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProfileAction,
  listProfiles,
} from "../../Actions/profileActions";
import Loading from "../../Components/Loading";
import ErrorMessage from "../../Components/ErrorMessage";

const Profiles = () => {
  const dispatch = useDispatch();
  const profileList = useSelector((state) => state.profileList);
  const { loading, profiles, error } = profileList;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProfileAction(id));
    }
  };

  const profileCreate = useSelector((state) => state.profileCreate);
  const { success: successCreate } = profileCreate;

  const profileUpdate = useSelector((state) => state.profileUpdate);
  const { success: successUpdate } = profileUpdate;

  const profileDelete = useSelector((state) => state.profileDelete);
  const { success: successDelete } = profileDelete;

  console.log(profiles);

  useEffect(() => {
    dispatch(listProfiles());
  }, [dispatch, successCreate, successUpdate, successDelete]);

  return (
    <MainScreen title={`Here's the list of profiles!`}>
      <Link to="createprofile">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Profile
        </Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {profiles?.reverse().map((profile) => (
        <Card style={{ margin: 10 }} key={profile._id}>
          <Card.Header style={{ display: "flex" }}>
            <span
              style={{
                color: "black",
                textDecoration: "none",
                flex: 1,
                cursor: "pointer",
                alignSelf: "center",
                fontSize: 18,
              }}
            >
              {profile.title}
            </span>
            <div>
              <Button href={`/profile/${profile._id}`}>Edit</Button>
              <Button
                variant="danger"
                className="mx-2"
                onClick={() => deleteHandler(profile._id)}
              >
                Delete
              </Button>
            </div>
          </Card.Header>

          <Card.Body>
            <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
            <blockquote className="blockquote mb-0">
              <p>{profile.content}</p>
              <footer className="blockquote-footer">Created On - date</footer>
            </blockquote>
          </Card.Body>
        </Card>
      ))}
    </MainScreen>
  );
};

export default Profiles;
