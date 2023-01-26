import React, { useEffect } from 'react';
import { useState } from 'react';

interface Quote{
  _id: string;
  author: string;
  content: string;
}

export function App () {
  const [result, setResult] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [resultQuotes, setResultQuotes] = useState<Quote[]>([]);
  const [randomQuote, setRandomQuote] = useState<Quote | null>(null);

  function noRefresh(event){
    setResult(searchTerm);
    event.preventDefault();
  }

  async function loadRandomQuote() {
    const fetchResult = await fetch("https://usu-quotes-mimic.vercel.app/api/random");
    const quote = await fetchResult.json();
    console.log(quote)
    setRandomQuote(quote);
  }

  async function loadQuotes() {
    console.log(searchTerm);
    if (searchTerm === "") return;
    const fetchResult = await fetch(`https://usu-quotes-mimic.vercel.app/api/search?query=${searchTerm}`);
    const fullResults = await fetchResult.json();
    const quotes = await fullResults.results;
    console.log(quotes);
    if (quotes.count === 0) return;
    setResultQuotes(quotes);
  }
  {/* Uncomment this to use the API
    useEffect(() => {
      loadQuotes()
    }, [result]);

    useEffect(() => {
    loadRandomQuote()
  },[]);
*/}

return (
    <div>
      <div>
        <form onSubmit={noRefresh}>
          <label htmlFor="Search">Search: </label>
          <input  
            type="text" 
            name="Search" 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} />
          <input type="submit" value="Submit" />
        </form>
      </div>
      <div>
        <p>{randomQuote?.author}</p>
        <p>{randomQuote?.content}</p>
      </div>
      {
        resultQuotes.map((resultQuote)=> (
          <div class="Results" key={resultQuote._id}>
            <p>{resultQuote?.author}</p>
            <p>{resultQuote?.content}</p>
          </div>
        ))
      }
    </div>
  );
}

