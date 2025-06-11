import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';


//import Find from './buy_products/products';

import Dashconsumer from './Dashboard_Consumer/dashs';


// import ItemManager from './item_manager/items';



//import Profile from './Profile_Form/profile';

//import Dashboard from './index/dashboard';
import { App } from './App';



// import AvailItems from './Avail_Products/AvailItems';

// import Profile from './Profile_Form/profile';

//import Login from './Login/Login';

//import Signup from './signup/signup';

// import Profileconsumer from './Profie_form-consumer/profile';

//import Dash from './Dashboard_Grower/dash';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <BrowserRouter>
    {/* <Signup></Signup> */}

    {/* <Login></Login> */}

    {/* <Profile></Profile> */}

    {/* <AvailItems></AvailItems> */}

    {/* <Dashboard></Dashboard> */}

    {/* <ItemManager></ItemManager> */}

    {/* <Profileconsumer></Profileconsumer> */}

    {/* <Dashboard></Dashboard> */}

    <App></App>

    <Dashconsumer></Dashconsumer>

    {/* <Find></Find> */}

    {/* <Profile></Profile> */}

    </BrowserRouter>

  
);