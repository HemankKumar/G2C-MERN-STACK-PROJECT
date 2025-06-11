import React from 'react';
import './Dashboard.css'; // Import your CSS file for styling
import { useNavigate } from 'react-router-dom';



function Dashboard(){

  let navigate=useNavigate();

  function opensignup(){
    navigate("/opensignuppage")
  }
  function openlog(){
    navigate("/openloginpg")
  }

 
  return (
    <>

    <div className="navbar">
        <p className='text-4xl'>G2C</p>
      <div className="spacer"></div> {/* Add a spacer div to push buttons to the right */}
      <button className="btn" onClick={opensignup}>Signup</button>
      <button className="btn"onClick={openlog}>Login</button>
    </div>

    
    </>

    
  );
};

export default Dashboard;
