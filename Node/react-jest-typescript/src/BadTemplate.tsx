import React from "react";


function BadTemplate() {

  return (
    <div id="appContainer">
    <p aria-fake="true" className="detail">
      This has some accessibility issues. 
      <img src="https://www.deque.com/wp-content/uploads/2018/03/deque-logo-facebook.png"></img>
    </p>
    <div id="appContainer" className="forms">     
  <h2>Example Form</h2>
      First name:<br/>
  <input type="text" name="firstname" value="Mickey"/>
  <br/>
  Last name:<br/>
  <input type="text" name="lastname" value="Mouse"/>
  <br/><br/>
  <div id="buttonCont">
  <button className="submit"></button>
  </div>
  </div>
  
  </div>
  );
}

export default BadTemplate;
