import { useEffect, useState } from "react";
import { Card, Button, Modal, Form, CardGroup } from "react-bootstrap";
import { connect } from "react-redux";
import API from "../Utils/api";
import { addPetition } from "../Redux/actionTypes";
import { Link, useParams } from "react-router-dom";
import store from "../Redux/store";

const Petition = (props) => {
  const { petition_id } = useParams();
  const [currPetition, setCurrPetition] = useState(
    props.created_petitions[petition_id]
  );
  console.log(currPetition);
  return (
    <Card className="w-3/4 h-96 flex mt-10 mx-auto text-black text-center">
      <Card.Title>
        <h1>{currPetition.text_title}</h1>
        <h2>Created by: Lazaro Hurtado, For: {currPetition.tagged_rep}</h2>
      </Card.Title>
      <Card.Body>
        <h3>{currPetition.text_body}</h3>
      </Card.Body>
      <Card.Footer>
        <Button className="mr-3">I am for this</Button>
        <Button className="bg-danger">I am against this</Button>
      </Card.Footer>
    </Card>
  );
};

const mapStateToProps = (state) => {
  const { user } = state;

  return {
    user_name: user.user_name,
    created_petitions: user.created_petitions,
    county: user.county,
    signed_petitions: user.signed_petitions,
  };
};

export default connect(mapStateToProps)(Petition);
