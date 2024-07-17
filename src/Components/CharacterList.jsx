import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';

//Initializing use of useState
function CharacterList() {
  const [characters, setCharacters] = useState([]); 
  const [error, setError] = useState(null); 
  const [search, setSearch] = useState(''); 
  const [searched, setSearched] = useState(false); // State to track if search has been initiated

//Attaching useEffect to fetchCharacters
  useEffect(() => {
    const fetchCharacters = async () => {
      if (!searched) return; 
      if (search.trim() === '') {
        setCharacters([]); 
        return;
      }

//Fetching the API
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${search}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCharacters(data.results); 
      setError(null);
    } catch (error) {
      setError('An error occurred while fetching data. Please try again later.');
      setCharacters([]);
    }
  };

    fetchCharacters(); 
  }, [searched, search]);

  const searchSubmitted = (event) => {
    event.preventDefault();
    setSearched(true); 
  };

//Function for deleting a character by targeting the ID and using filter
  const handleDelete = (characterId) => {
    setCharacters(prevCharacters => prevCharacters.filter(character => character.id !== characterId));
  };

//What is to be returned
  return (
  <div className="flex flex-col items-center justify-center mt-6">
    <form className="flex items-center pr-10 ml-8 mt-4" onSubmit={searchSubmitted}>
      <input
      className="mr-5 border-2 rounded-md"
      type="text"
      value={search}
      onChange={(event) => setSearch(event.target.value)}
      placeholder="Enter a character's name"
    />
    <button className="flex items-center border-2 border-indigo-100 bg-indigo-200 hover:bg-indigo-600 rounded-md pl-5 pr-5" type="submit">Search
    </button>
   </form>

    {searched ? (
    <div className="grid gap-4 grid-cols-4 grid-rows-3 mt-10 mr-4 ml-8 border-1 rounded-md">
      {characters.map((character) => (
      <div key={character.id}>
      <Link to={`/character/${character.id}`}>
        <img
          className="w-30 h-30 border-2 border-indigo-200 rounded-lg"
          src={character.image}
          alt={character.name}
        />
        <h2 className="mt-2 text-lg font-bold">{character.name}</h2>
        <p className="text-sm">Gender: {character.gender}</p>
      </Link>

      <button
        className="bg-indigo-200 hover:bg-indigo-600 text-black py-1 px-1 rounded mt-2"
        onClick={() => handleDelete(character.id)}>
        Delete
      </button>
        </div>
      ))}
      </div>
    ) 
      : (
    <div className="text-center">
        <h1 className="text-4xl font-bold">Welcome to Rick and Morty</h1>
        <br />
        <p className="mt-4 text-lg">Search for your favorite character to know more about them!</p>
      </div>
    )}

    {error && <ErrorMessage message={error} />}
  </div>
  );
}

export default CharacterList;



