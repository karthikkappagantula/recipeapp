import React, { useState, useEffect } from 'react';
import Recipe from './Recipe';
import './App.css';




const App = () => {

  const APP_ID = "b34e7ad1";
  const APP_KEY = "29d258a2092fd5b68b325fbdde8e99c5";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('chicken');

  // const exampleReq =  `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`;


  useEffect(() => {
    getRecipes();
  },[query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }

  const updateSearch = (e) => {
    setSearch(e.target.value);
  }

  const getSearch = (e) => {
    // Prevents page refresh for each state change we type in search prompt
    e.preventDefault();   
    setQuery(search);
    setSearch('')
  }
  return (
    <div className="App">
      <form 
        onSubmit={getSearch} 
        className="search-form">
        <input 
          className="search-bar" 
          type="text" 
          value={search} 
          onChange={updateSearch} />
        <button
          className="search-button" 
          type="submit">
          Search
        </button>
      </form>
      <div>
        {recipes.map(recipe => (
          <Recipe 
            key={recipe.recipe.label}
            title={recipe.recipe.label} 
            calories={recipe.recipe.calories} 
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
            />
        ))}
      </div>
    </div>
  );
}

export default App;
