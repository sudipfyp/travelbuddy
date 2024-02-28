import React from "react";
import "../Assets/styles/Styles.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const terms = () => {
  document.title = "TravelBuddy ● T&C";

  return (
    <>
      <Navbar />
      <div className="static-header">
        <h1>Terms and Conditions</h1>
      </div>

      <p className="static-title">
        Welcome to Travel Buddy! By using our website, you agree to comply with
        and be bound by the following terms and conditions of use. Please read
        these terms carefully before using our website.
      </p>

      <div className="static-container">
        <div className="static-contain">
          <h2 className="static-heading">General Use</h2>
          <p className="static-p">
            The content of the pages of this website is for your general
            information and use only. It is subject to change without notice.
          </p>

          <h2 className="static-heading">Liability: </h2>
          <p className="static-p">
            Neither we nor any third parties provide any warranty or guarantee
            as to the accuracy, timeliness, performance, completeness, or
            suitability of the information and materials found or offered on
            this website for any particular purpose. You acknowledge that such
            information and materials may contain inaccuracies or errors, and we
            expressly exclude liability for any such inaccuracies or errors to
            the fullest extent permitted by law.
          </p>

          <h2 className="static-heading">Use at your own risk:</h2>
          <p className="static-p">
            Your use of any information or materials on this website is entirely
            at your own risk, for which we shall not be liable. It shall be your
            own responsibility to ensure that any products, services, or
            information available through this website meet your specific
            requirements.
          </p>

          <h2 className="static-heading">Material is copyrighted:</h2>
          <p className="static-p">
            This website contains material which is owned by or licensed to us.
            This material includes, but is not limited to, the design, layout,
            look, appearance, and graphics. Reproduction is prohibited other
            than in accordance with the copyright notice, which forms part of
            these terms and conditions.
          </p>

          <h2 className="static-heading">Trademarks acknowledged:</h2>
          <p className="static-p">
            All trademarks reproduced in this website, which are not the
            property of, or licensed to the operator, are acknowledged on the
            website.
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default terms;
