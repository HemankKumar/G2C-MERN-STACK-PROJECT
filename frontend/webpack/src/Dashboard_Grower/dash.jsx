import React from 'react'
import "./dash.css"
import { useNavigate } from 'react-router-dom';
import { Card } from 'flowbite-react';




function Dash(){
    let navigate=useNavigate();

    function openprofile(){
        navigate("/open_grower_profile")
    }

    function openavailitem(){
        navigate("/open_avail_item")
    }

    function openitemmang(){
        navigate("/open_item_manager")
    }
   

    return(
        <>
        <div className='bg-indigo-600 h-16 flex justify-end'>
        <button type="button" className="rounded-md bg-indigo-800 w-20 h-10 m-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Logout
                 </button>
        </div>
        <p>Grower</p>

        <div className='flex justify-center  m-12 gap-12'>

        <Card
            className="w-72 h-96 m-10"
            
            imgSrc="pics/profile-grower.png"
            >
                  <center className='mt-8'>               
                  <button type="button" onClick={openprofile} className="rounded-md bg-indigo-600 px-3 py-2 w-20 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Profile
                 </button>
                    </center>


        </Card>

        <Card
            className="max-w-sm w-72 h-96 m-10"
            
            imgSrc="pics/avail-items.png"
            >

                <center className='mt-8'>               
                  <button type="button" onClick={openavailitem} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Avail Item
                  </button>
                </center>
            
        </Card>

        <Card
            className="max-w-sm w-72 h-96 m-10"
           
            imgSrc="pics/item-manager.gif"
            >

                <center className='mt-8'>               
                  <button type="button" onClick={openitemmang} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Item Manager
                  </button>
                </center>
          
        </Card>

        </div>

       
        </>
    )
}

export default Dash;