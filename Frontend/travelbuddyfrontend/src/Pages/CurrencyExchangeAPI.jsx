//This page is optimized to use API avalable online. If API limit is reached, it will not work. So for backup use CurrencyExchange.jsx where data is used from local file.

import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function CurrencyExchangeAPI() {
  const [sourceCurrency, setSourceCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("NPR");
  const [sourceAmount, setSourceAmount] = useState(0);
  const [targetAmount, setTargetAmount] = useState(0);
  const [conversionRates, setConversionRates] = useState(null);

  useEffect(() => {
    fetch(
      "https://v6.exchangerate-api.com/v6/dae00175499cfddc7330dcec/latest/USD"
    )
      .then((response) => response.json())
      .then((data) => setConversionRates(data.conversion_rates))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleSourceAmountChange = (e) => {
    setSourceAmount(parseFloat(e.target.value));
    if (conversionRates) {
      const sourceRate = conversionRates[sourceCurrency];
      const targetRate = conversionRates[targetCurrency];
      const conversionRate = targetRate / sourceRate;
      setTargetAmount(parseFloat(e.target.value) * conversionRate);
    }
  };

  const handleTargetAmountChange = (e) => {
    setTargetAmount(parseFloat(e.target.value));
    if (conversionRates) {
      const sourceRate = conversionRates[sourceCurrency];
      const targetRate = conversionRates[targetCurrency];
      const conversionRate = sourceRate / targetRate;
      setSourceAmount(parseFloat(e.target.value) * conversionRate);
    }
  };

  const handleSourceCurrencyChange = (e) => {
    setSourceCurrency(e.target.value);
    if (conversionRates) {
      const sourceRate = conversionRates[e.target.value];
      const targetRate = conversionRates[targetCurrency];
      const conversionRate = targetRate / sourceRate;
      setTargetAmount(sourceAmount * conversionRate);
    }
  };

  const handleTargetCurrencyChange = (e) => {
    setTargetCurrency(e.target.value);
    if (conversionRates) {
      const sourceRate = conversionRates[sourceCurrency];
      const targetRate = conversionRates[e.target.value];
      const conversionRate = targetRate / sourceRate;
      setTargetAmount(sourceAmount * conversionRate);
    }
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
                {conversionRates &&
                  Object.keys(conversionRates).map((currency) => (
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
                {conversionRates &&
                  Object.keys(conversionRates).map((currency) => (
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
}

export default CurrencyExchangeAPI;
