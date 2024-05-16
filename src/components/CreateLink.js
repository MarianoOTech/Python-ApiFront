import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateLinks.css'; // Importa el archivo CSS

const CREATE_LINK_MUTATION = gql`
  mutation CreateLinkMutation(
    $name: String!
    $description: String!
    $image: String!
  ) {
    createLink(
      name: $name
      description: $description
      image: $image
    ) {
      id
      name
      description
      image
      postedBy {
        id
        username
        email
      }
    }
  }
`;

const CreateLink = () => {
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    name: '',
    description: '',
    image: ''
  });

  const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
      name: formState.name,
      description: formState.description,
      image: formState.image
    },
    onCompleted: () => navigate('/')
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Verifica si alguno de los campos está vacío antes de enviar el formulario
    if (formState.name.trim() !== '' && formState.description.trim() !== '' && formState.image.trim() !== '') {
      createLink();
    } else {
      alert('Por favor completa todos los campos.');
    }
  };

  return (
    <div className="create-link-container">
      <form
        className="create-link-form"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-column mt3">
          <input
            className="create-link-input mb2"
            value={formState.name}
            onChange={(e) =>
              setFormState({
                ...formState,
                name: e.target.value
              })
            }
            type="text"
            placeholder="Name for the Character"
          />
          <textarea
            className="create-link-textarea mb2"
            value={formState.description}
            onChange={(e) =>
              setFormState({
                ...formState,
                description: e.target.value
              })
            }
            placeholder="A Description for the Character"
          />
          <input
            className="create-link-input mb2"
            value={formState.image}
            onChange={(e) =>
              setFormState({
                ...formState,
                image: e.target.value
              })
            }
            type="text"
            placeholder="Image for the Character"
          />
        </div>
        <button type="submit" className="create-link-submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateLink;
