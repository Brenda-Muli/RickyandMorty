import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';

// Retrieving the character ID from the URL parameters using the useParams hook
const CharacterDetails = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState(null);

// useEffect hook to fetch character data when the component mounts or when the id parameter changes
  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data); 
        setCharacter(data); 
        setError(null);
      } catch (error) {
        setError('An error occurred while fetching data. Please try again later.');
      }
    };

    fetchCharacter();
  }, [id]);

  if (error) {
    return <ErrorMessage message={error} />;
  }
  
// An If statement for when the character data is not yet loaded to display loading 
  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-6">
      <div>
        <img className="w-30 h-30 border-2 border-indigo-200 rounded-lg" src={character.image} alt={character.name} />
        <p>Status: {character.status}</p>
        <p>Species: {character.species}</p>
      </div>
    </div>
  );
};

export default CharacterDetails;