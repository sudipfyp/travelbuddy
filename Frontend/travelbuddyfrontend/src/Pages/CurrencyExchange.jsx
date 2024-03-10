import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const CurrencyExchange = ({data}) => {
  document.title = "TravelBuddy ● Currency Exchange";

  const [sourceCurrency, setSourceCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("NPR");
  const [sourceAmount, setSourceAmount] = useState(0);
  const [targetAmount, setTargetAmount] = useState(0);

  const handleSourceAmountChange = (e) => {
    setSourceAmount(parseFloat(e.target.value));
    const sourceRate = data.data[sourceCurrency].value;
    const targetRate = data.data[targetCurrency].value;
    const conversionRate = targetRate / sourceRate;
    setTargetAmount(parseFloat(e.target.value) * conversionRate);
  };

  const handleTargetAmountChange = (e) => {
    setTargetAmount(parseFloat(e.target.value));
    const sourceRate = data.data[sourceCurrency].value;
    const targetRate = data.data[targetCurrency].value;
    const conversionRate = sourceRate / targetRate;
    setSourceAmount(parseFloat(e.target.value) * conversionRate);
  };

  const handleSourceCurrencyChange = (e) => {
    setSourceCurrency(e.target.value);
    const sourceRate = data.data[e.target.value].value;
    const targetRate = data.data[targetCurrency].value;
    const conversionRate = targetRate / sourceRate;
    setTargetAmount(sourceAmount * conversionRate);
  };

  const handleTargetCurrencyChange = (e) => {
    setTargetCurrency(e.target.value);
    const sourceRate = data.data[sourceCurrency].value;
    const targetRate = data.data[e.target.value].value;
    const conversionRate = targetRate / sourceRate;
    setTargetAmount(sourceAmount * conversionRate);
  };

  return (
    <>
      <Navbar />

      <div className="common-container">
        <div className="common-header">
          <div className="common-headline">
            <h1>Currency Exchange!</h1>
          </div>

          <div className="currency-search">
            <div className="currency-left">
              <select
                value={sourceCurrency}
                onChange={handleSourceCurrencyChange}
              >
                {Object.keys(data.data).map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>

              <input
                type="number"
                value={sourceAmount}
                onChange={handleSourceAmountChange}
              />
            </div>

            <div className="currency-middle">
              <i className="fa-solid fa-arrow-right-arrow-left"></i>
            </div>

            <div className="currency-right">
              <input
                type="number"
                value={targetAmount}
                onChange={handleTargetAmountChange}
              />

              <select
                value={targetCurrency}
                onChange={handleTargetCurrencyChange}
              >
                {Object.keys(data.data).map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="currency-result">
            <h2>
              {sourceAmount} {sourceCurrency} equals {targetAmount.toFixed(2)}{" "}
              {targetCurrency}
            </h2>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default CurrencyExchange;
