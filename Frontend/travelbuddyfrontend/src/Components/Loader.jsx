import React from "react";

const Spinner = () => {
  return (
    <div className="spinner-square">
      <div className="square square-1"></div>
      <div className="square square-2"></div>
      <div className="square square-3"></div>
    </div>
  );
};

const styles = `
  .spinner-square {
    display: flex;
    flex-direction: row;
    width: 90px;
    height: 120px;
    margin: auto auto;
    justify-content: space-between;
    align-items: center;
  }
  
  .spinner-square > .square {
    width: 17px;
    height: 80px;
    margin: auto auto;
    border-radius: 4px;
  }
  
  .square-1 {
    animation: square-anim 1200ms cubic-bezier(0.445, 0.05, 0.55, 0.95) 0s infinite;
  }
  
  .square-2 {
    animation: square-anim 1200ms cubic-bezier(0.445, 0.05, 0.55, 0.95) 200ms infinite;
  }
  
  .square-3 {
    animation: square-anim 1200ms cubic-bezier(0.445, 0.05, 0.55, 0.95) 400ms infinite;
  }
  
  @keyframes square-anim {
    0% {
      height: 80px;
      background-color: #02b994;
    }
    20% {
      height: 80px;
    }
    40% {
      height: 120px;
      background-color: #02cea4;
    }
    80% {
      height: 80px;
    }
    100% {
      height: 80px;
      background-color: #02b994;
    }
  }
`;

const Loader = () => (
  <>
    <style>{styles}</style>
    <Spinner />
  </>
);

export default Loader;
