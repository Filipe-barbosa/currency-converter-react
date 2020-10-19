import React from 'react';
import seta from './seta.png';
import './App.css';

const value2Gold = {
  "USD": {
    displayName: "Dolar",
    flagCode: "\ud83c\uddfa\ud83c\uddf8",

  },
  "AUD": {
    displayName: "Dolar Autraliano",
    flagCode: "\ud83c\udde6\ud83c\uddfa",
    
  },
  "CAD": {
    displayName: "Dolar Canadense",
    flagCode: "\ud83c\udde8\ud83c\udde6",
  },
  "EUR": {
    displayName: "Euro",
    flagCode: "\uD83C\uDDEA\uD83C\uDDFA",
  },
  "SFR": {
    displayName: "Franco Suiço",
    flagCode: "\ud83c\uddeb\ud83c\uddf7",
  },
  "GBP": {
    displayName: "Libra Estrelina",
    flagCode: "\ud83c\udded\ud83c\uddf2",
  },
  "BRL": {
    displayName: "Real",
    flagCode: "\ud83c\udde7\ud83c\uddf7",
  },
  "ARS": {
    displayName: "Peso Argentino",
    flagCode: "\ud83c\udde6\ud83c\uddf7",
  },
};

const CurrencySelector = (props) => {
    const options = [];
   for (let [currencyIdentifier, currencyDetails] of Object.entries( value2Gold )){ 
      options.push(<option value={currencyIdentifier}> {currencyDetails["flagCode"]} {currencyDetails["displayName"]} </option>) 
   } 
return (
     <select id={props.id} onChange={props.onChange} class="rounded-field bg-secondary text-white">
     {options}
    </select>
  );
}

const InputValue = (props) => {
  return (
    <input
      id={props.id}
      type="number"
      class="rounded-field"
      placeholder={props.placeholder}
      onKeyUp={props.handler}/>    
  )
}

const flipSelectedCurrency = () => {
  const currencyInverterSelect = document.getElementById("gold-select");
  const currencyInverterConverter = document.getElementById("gold-converter");
  const currencyInveterOperationAux = currencyInverterSelect.value;
  currencyInverterSelect.value = currencyInverterConverter.value; 
  
  currencyInverterConverter.value = currencyInveterOperationAux;
  converterCurrencysAndDisplayValue();
};

const getCurrencyNameIntoToAbreviation = (selectorName) => {
   return document.getElementById(selectorName).value;
  
};
const converterCurrencysAndDisplayValue = () => {
  const sourceCurrency = getCurrencyNameIntoToAbreviation("gold-select");
  const destCurrency = getCurrencyNameIntoToAbreviation("gold-converter");
  getValueInApiAndCoverter();
};

const getValueInApiAndCoverter = () => {
  
  fetch(
    `https://api.exchangeratesapi.io/latest?base=${getCurrencyNameIntoToAbreviation(
      "gold-select"
    )}`
  )
    .then((response) => response.json())
    .then((data) => {
      const currencyValue =
        data["rates"][getCurrencyNameIntoToAbreviation("gold-converter")];
      console.log(currencyValue);
      const resultElement = document.getElementById("gold-result");
      const inputElement = document.getElementById("gold-value");
      resultElement.value = inputElement.value * currencyValue;
    });
};

function App() {
  return (
    <div className="App">
      <div class="main-container">

        <div class="flex-container" id="input-select">
          <CurrencySelector id="gold-select" onChange={converterCurrencysAndDisplayValue} />
          <img src={seta} width="35" onClick={flipSelectedCurrency} title="Inverter Moedas" />
          <CurrencySelector id="gold-converter" onChange={converterCurrencysAndDisplayValue}/>
        </div>

        <div class="flex-container" id="export-select">
          <InputValue id="gold-value" handler={converterCurrencysAndDisplayValue} placeholder="Insira o valor a converter" />
          <InputValue id="gold-result"placeholder="Valor Convertido" />
        </div>
      </div>
    </div>
    );
  }
  export default App;
