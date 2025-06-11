import React, { useRef, useState } from 'react';
import axios from 'axios';
import { doPublishValidatetoken } from '../../../services/user-controller';

function ItemList(props)
{
  return (
            props.arry[props.index].map((item)=>
            {
              return (
                <option value={item}>{item}</option>
              )
            })
  )
}

export default function AvailProduct() {
    const [obj,setObj]=useState({
        email:"",
        item:[],
        city:"",
        category:""
    })

    const listItems= [
      ["paneer","curd","cheese","ice cream"],
      ["apple","watermelon","kiwi","dragon fruit"],
      ["potato","onion","tomato","spinach"],
    ]

    const [index,setIndex]=useState(-1);
    const [changeCategory,setChangeCategory]=useState(false);


    function doUpdate(event)
    {
        const {name,value}=event.target;
        console.log(name,value);  
        setObj({...obj,[name]:value});
        console.log(obj.item);
    }

    function addItem(event)
    {
        // alert(event.target.value)
        setObj({...obj,["item"]:[...obj.item,event.target.value]});
    }

    async function doPublish()
    {
        const serverMsg= doPublishValidatetoken(obj);
        console.log(obj);
        // console.log(formdata);
        console.log((await serverMsg).data.status);
        if((await serverMsg).data.status===true)
        {
        //   alert("item added");
        //   alert(serverMsg.data.city);   
          setObj({...obj,["city"]:(await serverMsg).data.city});
        }
        else {
          alert((await serverMsg).data.err+" "+(await serverMsg).data.message);
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-white">
            <div className="max-w-md rounded-lg shadow-md p-8 bg-gray-800 text-white">
                <div className="mb-6">
                    <label htmlFor="email" className="block font-semibold mb-2">Email:</label>
                    <input type="email" name="email" id="email" className="block w-full px-4 py-2 rounded-md border border-gray-700 bg-white text-gray-800 focus:outline-none focus:border-indigo-500" onChange={doUpdate} />
                </div>
                <div className="mb-6">
                    <div className="flex mb-2">
                        <div className="w-3/5 mr-2"> {/* Adjusted width */}
                            <label htmlFor="category" className="block font-semibold mb-2">Product Category:</label>
                            <select name="category" disabled={changeCategory} id="category" className="block w-full px-4 py-2 rounded-md border border-gray-700 bg-white text-gray-800 focus:outline-none focus:border-indigo-500" onChange={(event)=>{
                                setIndex(event.target.value);
                                doUpdate(event);
                                setChangeCategory(true);
                            }}>
                                <option value="select category">select category</option>
                                <option value={0}>Milk Product</option>
                                <option value={1}>Fruits</option>
                                <option value={2}>Vegetables</option>
                            </select>
                        </div>
                        <div className="w-2/5 ml-2"> {/* Adjusted width */}
                            <label htmlFor="itemList" className="block font-semibold mb-2">Select Items:</label>
                            <select name="itemList" id="itemList" onChange={addItem} className="block w-full px-4 py-2 rounded-md border border-gray-700 bg-white text-gray-800 focus:outline-none focus:border-indigo-500">
                                <option value="choose">choose</option>
                                {index!==-1&&<ItemList index={index} arry={listItems}/>}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="mb-6">
                    <label htmlFor="item" className="block font-semibold mb-2">Item:</label>
                    <input type="text" name="item" id="item" value={obj.item} className="block w-full px-4 py-2 rounded-md border border-gray-700 bg-white text-gray-800 focus:outline-none focus:border-indigo-500" onChange={doUpdate}/>
                </div>
                <div className="mb-6">
                    <label htmlFor="city" className="block font-semibold mb-2">City:</label>
                    <input type="text" name="city" id="city" value={obj.city} readOnly className="block w-full px-4 py-2 rounded-md border border-gray-700 bg-white text-gray-800 focus:outline-none focus:border-indigo-500" onChange={doUpdate}/>
                </div>
                <div>
                    <button type="button" className="w-32 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 rounded-md" onClick={()=>{
                        doPublish();
                        setChangeCategory(false);
                        obj.item=[];
                    }}>Publish</button>
                </div>
            </div>
        </div>
    );
    
  
}