import React from 'react'
import "./dash.css"
import { useNavigate } from 'react-router-dom';
import { Card } from 'flowbite-react';

function Dashconsumer(){

    let navigate=useNavigate()

    function openprofileconsumer(){
        navigate("/open_profile_consumer")
    }

    function openbuy(){
        navigate("/open_buy_items")
    }

    return(
        <>
        <div className='bg-blue-950 h-16 flex justify-end'>
        <button type="button" className="rounded-md bg-indigo-800 w-20 h-10 m-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Logout
                 </button>
        </div>
        

        <div className='flex justify-center  m-12 gap-12 '>

        <Card
            className="w-72 h-96 m-10"
            
            imgSrc="pics/profile consumer.png"
            >
                  <center className='mt-8'>               
                  <button type="button" onClick={openprofileconsumer}className="rounded-md bg-indigo-600 px-3 py-2 w-20 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Profile
                 </button>
                    </center>


        </Card>

        <Card
            className="max-w-sm w-72 h-96 m-10"
            
            imgSrc="pics/grocery-cart.png"
            >

                <center className='mt-8'>               
                  <button type="button" onClick={openbuy} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Buy Items
                  </button>
                </center>
            
        </Card>

       

        </div>
        </>
    )
}

export default Dashconsumer;