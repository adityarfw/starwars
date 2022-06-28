import './App.css';
import React, { useState, useEffect } from 'react';
import { Container, Navbar, Spinner } from 'react-bootstrap';

function App() {
  const [allcharacters, setAllCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [films, setFilms] = useState([]);

  // List of films in which the character was seen
  const Charfilms = [];

  // Store film names to display after fetching
  const CharFilmNames = [];

  console.log('Selected Character: ', selectedCharacter);

  useEffect(() => {
    // Fetch Characters
    const fetchCharacters = async () => {
      setSpinner(true);
      const res = await fetch('https://swapi.dev/api/people');
      const data = await res.json();
      setAllCharacters(data.results);
      setSpinner(false);
    };
    fetchCharacters().catch(console.error);
  }, []);

  const getFilmInfo = (filmURL) => {
    const fetchFilms = async () => {
      const res = await fetch(filmURL);
      const data = await res.json();
      console.log(`Fetched: ${filmURL} ${data.title}`);
      CharFilmNames.push(data.title);
    };
    fetchFilms().catch(console.error);
    return;
  };

  return (
    <div className='App'>
      <Navbar className='navbar'>
        <Container>
          <Navbar.Brand>StarWars</Navbar.Brand>
        </Container>
      </Navbar>

      <div className='main--content'>
        <h2 className='section'>Character</h2>
        <select
          className='dropdown--select'
          value={selectedCharacter}
          onChange={(e) => {
            setSpinner(true);
            setSelectedCharacter(e.target.value);
            setSpinner(false);
          }}
        >
          <option>--Select a Character--</option>
          {allcharacters.map((char) => {
            if (selectedCharacter === char.name) {
              Charfilms.push(char.films);
            }
            return <option key={char.url}>{char.name}</option>;
          })}
        </select>

        <h2 className='section'>List of Movies</h2>
        {Charfilms.map((item) => {
          item.map((url) => {
            getFilmInfo(url);
          });
        })}

        {!spinner ? (
          //console.log('Movie Namesss', CharFilmNames)
          CharFilmNames.map((film, idx) => {
            return <p key={idx}>{film}</p>;
          })
        ) : (
          <Spinner animation='border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        )}

        <h2 className='section'>Name / Year last Movie</h2>
        <p className='movie--year'>Revenge of the Sith - 2005</p>
      </div>
    </div>
  );
}
export default App;
