// import React from "react";
// import Navbar from "../Components/Navbar";
// import Footer from "../Components/Footer";

// const Translation = () => {
//   document.title = "TravelBuddy ● Translation";
//   return (
//     <>
//       <Navbar />

//       <div className="common-container">
//         <div className="common-header">
//           <div className="common-headline">
//             <h1>Communicate Easily!</h1>
//           </div>
//         </div>

//         <div className="language-translate">
//           <div className="language-wrapper">
//             <div className="language-top">
//               <textarea spellcheck="false" name="" id="" placeholder="Enter text"></textarea>
//               <div className="lang-line"></div>
//               <textarea spellcheck="false" name="" id="" placeholder="Translate"></textarea>
//             </div>

//             <div className="language-bottom">
//               <select>
//                 <option value="en">English</option>
//                 <option value="ne">Nepali</option>
//               </select>

//               <i class="fas fa-exchange-alt" />

//               <select>
//                 <option value="en">English</option>
//                 <option value="ne">Nepali</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default Translation;

import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const countries = {
  "am-ET": "Amharic",
  "ar-SA": "Arabic",
  "be-BY": "Bielarus",
  "bem-ZM": "Bemba",
  "bi-VU": "Bislama",
  "bjs-BB": "Bajan",
  "bn-IN": "Bengali",
  "bo-CN": "Tibetan",
  "br-FR": "Breton",
  "bs-BA": "Bosnian",
  "ca-ES": "Catalan",
  "cop-EG": "Coptic",
  "cs-CZ": "Czech",
  "cy-GB": "Welsh",
  "da-DK": "Danish",
  "dz-BT": "Dzongkha",
  "de-DE": "German",
  "dv-MV": "Maldivian",
  "el-GR": "Greek",
  "en-GB": "English",
  "es-ES": "Spanish",
  "et-EE": "Estonian",
  "eu-ES": "Basque",
  "fa-IR": "Persian",
  "fi-FI": "Finnish",
  "fn-FNG": "Fanagalo",
  "fo-FO": "Faroese",
  "fr-FR": "French",
  "gl-ES": "Galician",
  "gu-IN": "Gujarati",
  "ha-NE": "Hausa",
  "he-IL": "Hebrew",
  "hi-IN": "Hindi",
  "hr-HR": "Croatian",
  "hu-HU": "Hungarian",
  "id-ID": "Indonesian",
  "is-IS": "Icelandic",
  "it-IT": "Italian",
  "ja-JP": "Japanese",
  "kk-KZ": "Kazakh",
  "km-KM": "Khmer",
  "kn-IN": "Kannada",
  "ko-KR": "Korean",
  "ku-TR": "Kurdish",
  "ky-KG": "Kyrgyz",
  "la-VA": "Latin",
  "lo-LA": "Lao",
  "lv-LV": "Latvian",
  "men-SL": "Mende",
  "mg-MG": "Malagasy",
  "mi-NZ": "Maori",
  "ms-MY": "Malay",
  "mt-MT": "Maltese",
  "my-MM": "Burmese",
  "ne-NP": "Nepali",
  "niu-NU": "Niuean",
  "nl-NL": "Dutch",
  "no-NO": "Norwegian",
  "ny-MW": "Nyanja",
  "ur-PK": "Pakistani",
  "pau-PW": "Palauan",
  "pa-IN": "Panjabi",
  "ps-PK": "Pashto",
  "pis-SB": "Pijin",
  "pl-PL": "Polish",
  "pt-PT": "Portuguese",
  "rn-BI": "Kirundi",
  "ro-RO": "Romanian",
  "ru-RU": "Russian",
  "sg-CF": "Sango",
  "si-LK": "Sinhala",
  "sk-SK": "Slovak",
  "sm-WS": "Samoan",
  "sn-ZW": "Shona",
  "so-SO": "Somali",
  "sq-AL": "Albanian",
  "sr-RS": "Serbian",
  "sv-SE": "Swedish",
  "sw-SZ": "Swahili",
  "ta-LK": "Tamil",
  "te-IN": "Telugu",
  "tet-TL": "Tetum",
  "tg-TJ": "Tajik",
  "th-TH": "Thai",
  "ti-TI": "Tigrinya",
  "tk-TM": "Turkmen",
  "tl-PH": "Tagalog",
  "tn-BW": "Tswana",
  "to-TO": "Tongan",
  "tr-TR": "Turkish",
  "uk-UA": "Ukrainian",
  "uz-UZ": "Uzbek",
  "vi-VN": "Vietnamese",
  "wo-SN": "Wolof",
  "xh-ZA": "Xhosa",
  "yi-YD": "Yiddish",
  "zu-ZA": "Zulu"
}

const Translation = () => {
  document.title = "TravelBuddy ● Translation";

  // State variables
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [fromLanguage, setFromLanguage] = useState("en-GB");
  const [toLanguage, setToLanguage] = useState("ne-NP");

  // Function to switch languages
  const switchLanguages = () => {
    const tempInputText = inputText;
    setInputText(outputText);
    setOutputText(tempInputText);

    const tempFromLanguage = fromLanguage;
    setFromLanguage(toLanguage);
    setToLanguage(tempFromLanguage);
  };

  // Function to handle input text change
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  // Function to handle "From" language change
  const handleFromLanguageChange = (event) => {
    setFromLanguage(event.target.value);
  };

  // Function to handle "To" language change
  const handleToLanguageChange = (event) => {
    setToLanguage(event.target.value);
  };

  useEffect(() => {
    // Check if inputText is not empty
    if (!inputText) {
      setOutputText("");
      return;
    }

    // Translation API URL
    const apiUrl = `https://api.mymemory.translated.net/get?q=${inputText}&langpair=${fromLanguage}|${toLanguage}`;

    // Fetch translation
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        // Update output text
        setOutputText(data.responseData.translatedText);
      })
      .catch((error) => {
        console.error("Error fetching translation:", error);
      });
  }, [inputText, fromLanguage, toLanguage]);
  

  return (
    <>
      <Navbar />

      <div className="common-container">
        <div className="common-header">
          <div className="common-headline">
            <h1>Communicate Easily!</h1>
          </div>
        </div>

        <div className="language-translate">
          <div className="language-wrapper">
            <div className="language-top">
              <textarea
                spellCheck="false"
                value={inputText}
                onChange={handleInputChange}
                placeholder="Enter text"
              ></textarea>
              <div className="lang-line"></div>
              <textarea
                spellCheck="false"
                value={outputText}
                readOnly
                placeholder={outputText ? "Translating..." : "Translate"}
              ></textarea>
            </div>

            <div className="language-bottom">
              <select value={fromLanguage} onChange={handleFromLanguageChange}>
                {Object.entries(countries).map(([code, name]) => (
                  <option key={code} value={code}>{name}</option>
                ))}
              </select>

              <i className="fas fa-exchange-alt" onClick={switchLanguages} />

              <select value={toLanguage} onChange={handleToLanguageChange}>
                {Object.entries(countries).map(([code, name]) => (
                  <option key={code} value={code}>{name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Translation;