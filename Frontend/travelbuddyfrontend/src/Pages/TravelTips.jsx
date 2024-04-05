import React from "react";
import "../Assets/styles/Styles.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import TipsDisplay from "../Components/TipsDisplay";
import Temple from "../Assets/images/pashupatinath.jpeg";
import Hiking from "../Assets/images/hiking.jpg";
import Durbar from "../Assets/images/durbar.jpg";
import Thamel from "../Assets/images/thamel.png";
import Food1 from "../Assets/images/food1.png";
import Food2 from "../Assets/images/food2.jpg";
import Food3 from "../Assets/images/food3.jpg";
import Food4 from "../Assets/images/food4.jpg";
import Food5 from "../Assets/images/food5.jpg";
import Food6 from "../Assets/images/food6.jpg";
import Food7 from "../Assets/images/food7.jpg";
import Food8 from "../Assets/images/food8.jpg";
import Currency from "../Assets/images/currency.jpg";
import Language from "../Assets/images/language.png";
import Time from "../Assets/images/time.png";
import Country from "../Assets/images/country.png";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const TravelTips = () => {
  document.title = "TravelBuddy ● Travel Tips";

  return (
    <>
      <Navbar />

      <div className="static-header">
        <h1>Travel Tips!</h1>
      </div>

      <div className="tips-container">
        <div className="travel-tips">
          <h2>Top things to do in Kathmandu</h2>

          <p>
            Kathmandu, the capital of Nepal, is a city full of history and
            culture. Here are some of the top things to do in Kathmandu.
          </p>

          <div className="tips-collection">
            <TipsDisplay
              image={Temple}
              name="Attend Sandhya Aarati"
              description="
              The Pashupatinath Temple is one of the most sacred Hindu temples in the world and is dedicated to Lord Shiva. The Sandhya Aarati is a ritual that takes place every evening at the temple and is a must-see for visitors to Kathmandu. The aarati is a spiritual experience that will leave you feeling peaceful and uplifted."
            />

            <TipsDisplay
              image={Hiking}
              name="Hiking"
              description="Try hiking between the lush green hills of Kathmandu valley. A wanderer’s paradise Nepal has plenty of options for both professional and amateur hikers with a plethora of hiking trails to choose from. The Kathmandu Valley alone has over 50 hiking trails that range from easy to difficult and are accessible to all."
            />

            <TipsDisplay
              image={Durbar}
              name="Visit Durbar Square"
              description="Kathmandu Durbar Square is one of three Durbar Squares in the Kathmandu Valley. It is a UNESCO World Heritage Site and is home to many ancient temples, palaces, courtyards, and statues. The square is a great place to explore and learn about the history and culture of Nepal."
            />

            <TipsDisplay
              image={Thamel}
              name="Explore Thamel"
              description="Thamel is a popular tourist district in Kathmandu and is known for its vibrant nightlife, shopping, and dining scene. The area is home to many hotels, restaurants, bars, and shops selling everything from trekking gear to souvenirs. Thamel is a great place to explore and experience the hustle and bustle of Kathmandu."
            />
          </div>
        </div>

        <div className="travel-tips">
          <h2>Foods you shouldn't miss</h2>
          <p>
            Don't miss out on these delicious foods when you are in Kathmandu.
          </p>

          <div className="tips-collection">
            <TipsDisplay
              image={Food1}
              name="Thakali Khana Set"
              description="Thakali Khana Set is a traditional Nepali meal that consists of rice, lentil soup, vegetable curry, meat curry, and pickles. This tasty meal is served on a metal plate and is a must-try for anyone visiting Nepal."
            />
            <TipsDisplay
              image={Food2}
              name="Sekuwa"
              description="Sekuwa made out of chicken, mutton or buff, is a traditional grilled marinated meat skewer cooked by roasting in natural wood fire.  Sekuwa is among the most popular meat snacks in Nepal and enjoyed by many on a usual basis. "
            />
            <TipsDisplay
              image={Food3}
              name="Chukauni"
              description="Chukauni is a popular salad preparation from Western Nepal, in particular Palpa and the districts around. Made using yoghurt, onions, spices and potato the addition of yogurt in it makes it a wholesome recipe."
            />
            <TipsDisplay
              image={Food4}
              name="Phulaura"
              description="Phulaura is one of the delicacies in Nepali kitchen, cooked as a snack or appetizer. Made out of lentils, it is also known as deep fried lentil balls/fritters. It is usually prepared  as a snack during festivals or certain rituals. "
            />
            <TipsDisplay
              image={Food6}
              name="Yomari"
              description="Yomari, a festive sweet literally translates to tasty bread. A popular Newari delicacy Yomari is a steamed dumpling made using rice flour filled with chaku. This bread is also of religious significance to the Newars as it is considered to be a  major festival food by their community."
            />
            <TipsDisplay
              image={Food5}
              name="Chatamari"
              description="Chatamari or Newari Pizza is another traditional snack as well as a popular Nepali street food. Divided into two parts the crepe base is made using rice flour whereas the topping is a combination of marinated minced meat, eggs with onions and spices."
            />
            <TipsDisplay
              image={Food7}
              name="Momo"
              description="Momo is a type of dumpling native to Tibet, Nepal, Bhutan, and the Himalayan states of India. It is similar to Chinese baozi and jiaozi, Mongolian buuz, Japanese gyoza, and Korean mandu. Momo is a type of steamed bun with or without filling."
            />
            <TipsDisplay
              image={Food8}
              name="Sel Roti"
              description="Sel Roti is a sweet, round, thin traditional bread made using rice flour usually consumed during the festival of Tihar as a snack. Sel is also given as an offering to goddess Laxmi. Sel roti can be enjoyed by itself or with achaar, curry and even tea.  "
            />
          </div>
        </div>

        <div className="travel-tips">
          <h2>Kathmandu Essentials</h2>
          <p>
            Here are some essentials you should know before you visit Kathmandu.
          </p>
          <div className="tips-collection">
            <TipsDisplay
              image={Currency}
              name="Currency"
              description="The currency of Nepal is the Nepalese Rupee (NPR)."
            />
            <TipsDisplay
              image={Language}
              name="Language"
              description="The official language of Nepal is Nepali (नेपाली)."
            />
            <TipsDisplay
              image={Time}
              name="Time Zone"
              description="Nepal is 5 hours and 45 minutes ahead of GMT."
            />
            <TipsDisplay
              image={Country}
              name="Country Code"
              description="The country code for Nepal is +977. ISO 3166 code for Nepal is NP."
            />
          </div>
        </div>

        <div className="travel-tips">
          <h2>Some Useful Contact Details</h2>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: "#02cea4" }}>Service</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Contact</TableCell>
                  <TableCell style={{ color: "#02cea4" }}>Call</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow>
                  <TableCell>Police</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>
                    <a href="tel:100">
                      <i class="fa-solid fa-phone"></i>
                    </a>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Ambulance</TableCell>
                  <TableCell>102</TableCell>
                  <TableCell>
                    <a href="tel:102">
                      <i class="fa-solid fa-phone"></i>
                    </a>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Fire Brigade</TableCell>
                  <TableCell>101</TableCell>
                  <TableCell>
                    <a href="tel:101">
                      <i class="fa-solid fa-phone"></i>
                    </a>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tourist Police</TableCell>
                  <TableCell>01-4247041</TableCell>
                  <TableCell>
                    <a href="tel:01-4247041">
                      <i class="fa-solid fa-phone"></i>
                    </a>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Department of Immigration</TableCell>
                  <TableCell>01-4529659</TableCell>
                  <TableCell>
                    <a href="tel:01-4529659">
                      <i class="fa-solid fa-phone"></i>
                    </a>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>International Terminal Management Section (TIA)</TableCell>
                  <TableCell>01-4113163</TableCell>
                  <TableCell>
                    <a href="tel:01-4113163">
                      <i class="fa-solid fa-phone"></i>
                    </a>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Domestic Terminal Management Section (TIA)</TableCell>
                  <TableCell>01-4113299</TableCell>
                  <TableCell>
                    <a href="tel:01-4113299">
                      <i class="fa-solid fa-phone"></i>
                    </a>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TravelTips;
