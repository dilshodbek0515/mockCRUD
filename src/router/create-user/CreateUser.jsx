import React, { useEffect, useState } from 'react'
import './CreateUser.css'
import axios from 'axios'
import Model from '../../components/model/Model'
const URL = 'https://674053eed0b59228b7ef9746.mockapi.io'
import Loading from '../../components/loading/Loading'

function CreateUser () {
  const [crud, setCrud] = useState(null)
  const [ModalOpen, setModalOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [newCard, setNewCard] = useState({
    url: '',
    title: '',
    price: '',
    description: ''
  })

  const handleButtonClick = card => {
    setSelectedCard(card)
    setModalOpen(true)
  }

  useEffect(() => {
    axios
      .get(`${URL}/lesson`)
      .then(res => {
        setCrud(res.data)
      })
      .catch(err => console.log(err))
      .finally()
  }, [])

  if (!crud) {
    return (
      <div className='load'>
        <Loading />
      </div>
    )
  }

  // Create
  const handleCreate = e => {
    e.preventDefault()

    axios
      .post(`${URL}/lesson`, newCard)
      .then(res => {
        setCrud([...crud, res.data])
        setNewCard({ url: '', title: '', price: '', desc: '' })
      })
      .catch(err => console.log(err))
  }
  //Edit
  const handleSave = updatedCard => {
    const updatedCrud = crud.map(card =>
      card.id === updatedCard.id ? updatedCard : card
    )
    setCrud(updatedCrud)
    axios
      .put(`${URL}/lesson/${updatedCard.id}`, updatedCard)
      .then(res => console.log('Card updated'))
      .catch(err => console.log(err))

    setModalOpen(false)
  }
  // Delete
  const handleDelete = id => {
    axios
      .delete(`${URL}/lesson/${id}`)
      .then(res => {
        setCrud(crud.filter(card => card.id !== id))
      })
      .catch(err => console.log(err))
  }
  //Mapping
  const Crud_card = crud?.map(card => (
    <div key={card.id} className='crud_card'>
      <div>
        <img src={card.url} alt='img' />
      </div>
      <h2>{card.title}</h2>
      <strong>{card.price} $</strong>
      <p>{card.desc}</p>
      <button onClick={() => handleButtonClick(card)}>Edit</button>
      <button onClick={() => handleDelete(card.id)}>Delete</button>
    </div>
  ))

  return (
    <div className='flex items-center justify-center flex-col'>
      <form action='' className='create_form' onSubmit={handleCreate}>
        <input
          type='text'
          onChange={e => setNewCard({ ...newCard, url: e.target.value })}
          value={newCard.url}
          className='create_card_input'
          placeholder='url'
          required
        />

        <input
          type='text'
          value={newCard.title}
          onChange={e => setNewCard({ ...newCard, title: e.target.value })}
          className='create_card_input'
          placeholder='title'
          required
        />

        <input
          type='text'
          value={newCard.price}
          onChange={e => setNewCard({ ...newCard, price: e.target.value })}
          className='create_card_input'
          placeholder='price'
          required
        />

        <input
          type='text'
          value={newCard.desc}
          onChange={e => setNewCard({ ...newCard, desc: e.target.value })}
          className='create_card_input'
          placeholder='description'
          required
        />
        <button className='create_btn'>Create</button>
      </form>

      <div className='card_collection'>
        {Crud_card}
        {ModalOpen && (
          <Model
            card={selectedCard}
            onClose={() => setModalOpen(false)}
            className='modal'
          >
            <div className='modal-content'>
              <h2>Edit Card</h2>
              <label>
                <input
                  type='text'
                  name='url'
                  placeholder='url'
                  value={selectedCard.url}
                  onChange={e =>
                    setSelectedCard({
                      ...selectedCard,
                      url: e.target.value
                    })
                  }
                />
              </label>
              <label>
                <input
                  type='text'
                  name='title'
                  placeholder='title'
                  value={selectedCard.title}
                  onChange={e =>
                    setSelectedCard({
                      ...selectedCard,
                      title: e.target.value
                    })
                  }
                />
              </label>
              <label>
                <input
                  type='text'
                  name='desc'
                  placeholder='description'
                  value={selectedCard.desc}
                  onChange={e =>
                    setSelectedCard({
                      ...selectedCard,
                      desc: e.target.value
                    })
                  }
                />
              </label>
              <label>
                <input
                  type='number'
                  name='price'
                  placeholder='price'
                  value={selectedCard.price}
                  onChange={e =>
                    setSelectedCard({
                      ...selectedCard,
                      price: e.target.value
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
    </div>
  )
}

export default CreateUser
