import React from 'react';
import seta from './seta.png';
import './App.css';

const CurrencySelector = () => {
  return (
    <select class="rounded-field bg-secondary text-white">
      <option>Dolar</option>
      <option>Real</option>
      <option>Libra</option>
    </select>
  );
}

const InputValue = (props) => {
  return (
    <input
      type="number"
      class="rounded-field"
      placeholder={props.placeholder} />
  )
}

function App() {
  
  return (
    <div className="App">
      <div class="main-container">

        <div class="flex-container" id="input-select">
          <CurrencySelector/>
          <img src={seta} width="35" onclick=" flipSelectedCurrency()" title="Inverter Moedas" />
          <CurrencySelector />
        </div>

        <div class="flex-container" id="export-select">
          <InputValue placeholder="Insira o valor a converter" />
          <InputValue placeholder="Valor Convertido" />
        </div>
      </div>
    </div>
    );
  }

  export default App;
