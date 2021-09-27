import { useState } from "react";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Explore = (props) => {
  const [allPetitions, setAllPetitions] = useState([
    ...props.created_petitions,
  ]);

  return allPetitions.map((petition, idx) => (
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
  ));
};

const mapStateToProps = (state) => {
  const { user } = state;

  return {
    user_name: user.user_name,
    created_petitions: user.created_petitions,
  };
};

export default connect(mapStateToProps)(Explore);
