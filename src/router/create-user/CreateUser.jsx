import React, { useEffect, useState } from "react";
import "./CreateUser.css";
import axios from "axios";
import Model from "../../components/model/Model"
const URL = "https://674053eed0b59228b7ef9746.mockapi.io";
import Loading from "../../components/loading/Loading"

function CreateUser() {
  const [crud, setCrud] = useState(null);
  const [ModalOpen, setModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleButtonClick = (card) => {
    setSelectedCard(card);
    setModalOpen(true);
  };
  useEffect(() => {
    axios
      .get(`${URL}/lesson`)
      .then((res) => {
        setCrud(res.data);
      })
      .catch((err) => console.log(err))
      .finally();
  }, []);

  if (!crud) {
    return <div className="load">
      <Loading />
    </div>
  }

  const handleSave = (updatedCard) => {
    const updatedCrud = crud.map((card) =>
      card.id === updatedCard.id ? updatedCard : card
    );
    setCrud(updatedCrud);
    axios
      .put(`${URL}/lesson/${updatedCard.id}`, updatedCard)
      .then((res) => console.log("Card updated"))
      .catch((err) => console.log(err));

    setModalOpen(false);
  };
  const Crud_card = crud?.map((card) => (
    <div key={card.id} className="crud_card" >
      <div><img src={card.url} alt="img" /></div>
      <h2>{card.title}</h2>
      <strong>{card.price} $</strong>
      <p>{card.desc}</p>
      <button onClick={() => handleButtonClick(card)}>
        {card.button}
      </button>
      <button>Delete</button>
    </div>
  ));

  return (
    <div className="card_collection">
      {Crud_card}

      {ModalOpen && (
        <Model
          card={selectedCard}
          onClose={() => setModalOpen(false)}
          className="modal">
          <div className="modal-content">
            <h2>Edit Card</h2>
            <label>
              <input
                type="text"
                name="url"
                value={selectedCard.url}
                onChange={(e) =>
                  setSelectedCard({
                    ...selectedCard,
                    url: e.target.value,
                  })
                }
              />
            </label>
            <label>
              <input
                type="text"
                name="title"
                value={selectedCard.title}
                onChange={(e) =>
                  setSelectedCard({
                    ...selectedCard,
                    title: e.target.value,
                  })
                }
              />
            </label>
            <label>
              <input
                type="text"
                name="desc"
                value={selectedCard.desc}
                onChange={(e) =>
                  setSelectedCard({
                    ...selectedCard,
                    desc: e.target.value,
                  })
                }
              />
            </label>
            <label>
              <input
                type="number"
                name="price"
                value={selectedCard.price}
                onChange={(e) =>
                  setSelectedCard({
                    ...selectedCard,
                    price: e.target.value,
                  })
                }
              />
            </label>
            <div>
              <button onClick={() => handleSave(selectedCard)}>Save</button>
              <button onClick={() => setModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </Model>
      )}
    </div>
  );
}

export default CreateUser;
