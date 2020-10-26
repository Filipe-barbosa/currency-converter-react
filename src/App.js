import React from "react";
import seta from "./seta.png";
import "./App.css";
import { value2Gold } from "./mapCurrrencies";

const CurrencySelector = (props) => {
  const options = [];
  for (let [currencyIdentifier, currencyDetails] of Object.entries(
    value2Gold
  )) {
    const isSelected = currencyIdentifier === props.selectedCurrency;
    options.push(
      <option selected={isSelected} value={currencyIdentifier}>
        {" "}
        {currencyDetails["flagCode"]} {currencyDetails["displayName"]}{" "}
      </option>
    );
  }

  return (
    <select
      id={props.id}
      onChange={props.onChange}
      className="rounded-field bg-secondary text-white"
    >
      {options}
    </select>
  );
};

const InputValue = (props) => {
  return (
    <input
      id={props.id}
      type="number"
      className="rounded-field"
      placeholder={props.placeholder}
      onKeyUp={props.handler}
    />
  );
};

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
const converterCurrencysAndDisplayValue = (event) => {
  console.log(event.target.value)
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
      <div className="main-container">
        <div className="flex-container" id="input-select">
          <CurrencySelector
            id="gold-select"
            selectedCurrency="USD"
            onChange={converterCurrencysAndDisplayValue}
          />
          <img
            src={seta}
            width="35"
            onClick={flipSelectedCurrency}
            title="Inverter Moedas"
          />
          <CurrencySelector
            id="gold-converter"
            selectedCurrency="BRL"
            onChange={converterCurrencysAndDisplayValue}
          />
        </div>

        <div className="flex-container" id="export-select">
          <InputValue
            id="gold-value"
            handler={converterCurrencysAndDisplayValue}
            placeholder="Insira o valor a converter"
          />
          <InputValue id="gold-result" placeholder="Valor Convertido" />
        </div>
      </div>
    </div>
  );
}
export default App;
