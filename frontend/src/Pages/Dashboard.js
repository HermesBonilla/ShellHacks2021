import { useEffect, useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { connect } from "react-redux";
import API from "../Utils/api";
import { addPetition } from "../Redux/actionTypes";
import { Link } from "react-router-dom";
import store from "../Redux/store";

const CreatePetitionForm = (props) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [taggedRep, setTaggedRep] = useState("nick");
  const [petitionId, setPetitionId] = useState(0);

  const [allReps, setAllReps] = useState([
    { first_name: "nick" },
    { first_name: "john" },
  ]);
  useEffect(() => {
    const f = async () => {
      await API.get("/reps/all").then(({ data, status }) => {
        if (status === 200) {
          setAllReps([...allReps, ...data]);
        }
      });
    };

    f();
  }, []);

  const handleNewPetition = async () => {
    const data = {
      text_title: title,
      text_body: body,
      creator: "Lazaro Hurtado",
      county: props.county,
      tagged_rep: taggedRep,
      petition_id: petitionId,
    };
    store.dispatch(addPetition(data));
    setPetitionId(petitionId + 1);
  };

  return (
    <Modal {...props}>
      <Form validated>
        <Form.Group className="mb-3">
          <Form.Group className="mb-3 w-1/2 m-auto p-3">
            <Form.Label>Petition Name</Form.Label>
            <Form.Control
              placeholder="Title"
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3 w-1/2 m-auto">
            <Form.Label>Petition Message</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Body"
              style={{ height: "100px" }}
              required
              onChange={(e) => setBody(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3 w-1/2 m-auto">
            <Form.Label>Representative</Form.Label>
            <Form.Select
              placeholder="Representative"
              required
              onChange={(e) => {
                setTaggedRep(e.target.value);
              }}
            >
              <option value=""></option>
              {allReps.map((rep, idx) => (
                <option value={rep.first_name} key={idx}>
                  {rep.first_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <div className="text-center">
            <Button
              className="ml-1"
              onClick={() => {
                handleNewPetition();
                props.onHide();
              }}
            >
              Create
            </Button>
          </div>
        </Form.Group>
      </Form>
    </Modal>
  );
};

const Dashboard = (props) => {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-row flex-wrap text-center">
      <CreatePetitionForm
        show={show}
        onHide={() => setShow(false)}
        {...props}
      />
      <Card
        className="bg-light text-black w-80 h-96 m-10"
        onClick={() => setShow(true)}
      >
        <Card.Title className="flex m-auto">
          <h1 className="text-center font-bold text-3xl">Create Petition +</h1>
        </Card.Title>
      </Card>
      {props.created_petitions.map((petition, idx) => (
        <Card className="bg-light text-black w-80 h-96 m-10" key={idx}>
          <Card.Title className="flex m-auto flex-col flex-wrap pt-5">
            <h1 className="text-center font-bold">{petition.text_title}</h1>
          </Card.Title>
          <Card.Body className="mb-4 mx-4 overflow-hidden overflow-ellipsis">
            <h3 className="text-center">{petition.text_body}</h3>
          </Card.Body>
          <Card.Footer>
            <div>
              <p className="m-0">For: {petition.tagged_rep}</p>
              <Link to={`/petition/${petition.petition_id}`}>Read more...</Link>
            </div>
          </Card.Footer>
        </Card>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { user } = state;

  return {
    user_name: user.user_name,
    created_petitions: user.created_petitions,
    county: user.county,
  };
};

export default connect(mapStateToProps)(Dashboard);
