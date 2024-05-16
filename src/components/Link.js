import React from 'react';
import { AUTH_TOKEN } from '../constants';
import { useMutation, gql } from '@apollo/client';

//CSS
import '../styles/Links.css';

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: Int!) {
    createVote(linkId: $linkId) {
      user {
        id
        username
        email
      }
      link {
        id
        name
        description
        image
       }  
    }
  }
`;

const Link = (props) => {
  const { link } = props;
  const authToken = localStorage.getItem(AUTH_TOKEN);

  const [vote] = useMutation(VOTE_MUTATION, {
    variables: {
      linkId: link.id
    }
  });

  return (
    <div className="link-container">
       {props.index === 0 && (
        <div className="link-title">Personajes</div>
      )}
      <div className="link-info-container">
        <div className="link-details">
          <h3>{link.name}</h3>
          <p className="link-description">{link.description}</p>
          <div className="link-meta">
            {link.votes.length} votes | by{' '}
            {link.postedBy ? link.postedBy.username : 'Unknown'}
          </div>
        </div>
        <div className="link-image-container">
          <img src={link.image} alt={link.name} className="link-image" />
        </div>
      </div>
      {authToken && (
        <div
          className="ml1 gray f11"
          style={{ cursor: 'pointer' }}
          onClick={vote}
        >
          Like 
        </div>
      )}
    </div>
  );
};

export default Link;
