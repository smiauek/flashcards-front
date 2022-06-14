import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import CardForm from "./CardForm";

function AddCard() {
  const [deck, setDeck] = useState([]);

  const deckId = useParams().deckId;

  let getDeck = async () => {
    let response = await fetch(`http://localhost:8080/decks/${deckId}`);
    let result = await response.json();

    setDeck(result);
  };

  useEffect(() => {
    getDeck();
  }, [deckId]);

  const navigate = useNavigate();

  const initialFormState = {
    front: "",
    back: "",
    deckId: Number(deckId)
  };

  const [formData, setFormData] = useState({ ...initialFormState });

  console.log(formData);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSave = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:8080/cards/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    console.log(JSON.stringify(formData))

    setFormData({ ...initialFormState });
    navigate(`/decks/${deckId}/cards/new`);
  };

  return (
    <>
      <h2>{deck.name}: Add Card</h2>
      <CardForm formData={formData} handleChange={handleChange} />
      <Link to={`/browse/deck/${deckId}`}>
        <button className="btn btn-secondary mr-2">Done</button>
      </Link>
      <button
        form="cardForm"
        type="submit"
        className="btn btn-primary"
        onClick={handleSave}
      >
        Save
      </button>
    </>
  );
}

export default AddCard;