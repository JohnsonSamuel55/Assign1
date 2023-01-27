import React, { useEffect } from 'react';
import { useState } from 'react';

interface Quote{
  _id: string;
  author: string;
  content: string;
}

export function App () {
  const [searchTerm, setSearchTerm] = useState("");
  const [resultQuotes, setResultQuotes] = useState<Quote[]>([]);
  const [randomQuote, setRandomQuote] = useState<Quote | null>(null);

  function noRefresh(event){
    event.preventDefault();
    loadQuotes();
  }

  async function loadRandomQuote() {
    const fetchResult = await fetch("https://usu-quotes-mimic.vercel.app/api/random");
    const quote = await fetchResult.json();
    setRandomQuote(quote);
  }

  async function loadQuotes() {
    if (searchTerm === "") return;
    const fetchResult = await fetch(`https://usu-quotes-mimic.vercel.app/api/search?query=${searchTerm}`);
    const fullResults = await fetchResult.json();
    const quotes = await fullResults.results;
    if (quotes.count === 0) return;
    setResultQuotes(quotes);
  }

    useEffect(() => {
    loadRandomQuote()
  },[]);


return (
    <div>
      <div className='Search'>
        <h1>Quotes Search</h1> 
        <form onSubmit={noRefresh}>
          <input  
            type="text"
            className='SearchBar'
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} />
            <br/>
          <input className='Submit' type="submit" />
        </form>
      </div>
      <div className='RandomQoute'>
        <p>{randomQuote?.content}</p>
        <p>{randomQuote?.author}</p>
      </div>
      {
        resultQuotes.map((resultQuote)=> (
          <div className='Result' key={resultQuote._id}>
            <p>{resultQuote?.content}</p>
            <p>{resultQuote?.author}</p>
          </div>
        ))
      }
    </div>
  );
}

