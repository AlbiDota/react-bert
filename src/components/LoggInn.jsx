import React, { useState } from 'react';

//med utgangspunkt i kode fra forelesninger, og hjjelp fra internett :)
//ville jeg lage en loginn-funksjon som bare tar et brukernavn og et passord fra bruker
//og sammenlikner med brukernavn og passord som er lagret et annet sted.
//lagret i tekstfil i dette tilfellet, men tenker database i fremtiden da.


const LoggInn = () => {
  const [LoginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const [message, setMessage] = useState(''); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prevState => ({
      ...prevState,
      [name]: value
    }));
    //console.log("Log in data:", LoginData);
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Bruker:', LoginData);

    fetch('http://localhost:3000/brukere.txt')
    .then(response => response.text())
    .then(fileText => {
      //const lines = fileText.trim('\n','\r');
      const lines = fileText.split('\n').map(line => line.trim()).filter(line => line !== '');
      //console.log(lines);

      // tihi testing
      const liste = [];
      // hehe
      for (let i = 0; i < lines.length; i += 2) {
        const username = lines[i];
        const password = lines[i + 1];
        liste.push({ username, password });
        /*console.log('Brukernavn:',username);
        console.log('password',password);*/
      }
      
      const brukerFunnet = liste.find(user => user.username === LoginData.username && user.password === LoginData.password);
      
      if (brukerFunnet) {
        setMessage('Logget inn');
      } else {
        setMessage('Feil passord eller brukernavn! >:(')
      }
      return liste;
    });
  };


 
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 space-y-6">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Brukernavn: </label>
        <input
          type="text"
          id="username"
          name="username"
          value={LoginData.username}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Passord: </label>
        <input
          type="password"
          id="password"
          name="password"
          value={LoginData.password}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"

        />
      </div>

      <button type="Log in" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Logg inn
      </button>
      <p>{message}</p>
    </form>
    
  );
};

export default LoggInn;