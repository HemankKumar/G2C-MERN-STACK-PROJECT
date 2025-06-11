import React, { useState } from "react";
import axios from "axios";
import "./items.css";

function ItemManager() {
  // const [obj, setobj] = useState({
  //   email: "",
  // });

  const [email, setEmail] = useState();

  const [ary, setAry] = useState([]);

  function doUpdate(event) {
    setEmail(event.target.value)
  }

  async function fetchdata() {
    const url = `http://localhost:2010/save/fetch-items?email=${email}`;
    const serverData = await axios.get(url);

    console.log(serverData.data);
    setAry(serverData.data.res);
    console.log(ary);

    if (serverData.data.status == 1) {
      if (serverData.data.res != null) {
        setAry(serverData.data.res);
      }
       else alert("Invalid Item or Check Case (upper/Lower)");
    }
    if (serverData.data.res == "") {
      alert("No data found");
    }
  }

  async function doDlt(object) {
    

    const url = "http://localhost:2010/save/delete-fetch-products";

    const serverMsg= await axios.post(url,object)

    alert(JSON.stringify(serverMsg.data));

    if(serverMsg.data.status === true){
      alert("deleted successfully !! ");
      fetchdata()
    }
    else{
      alert(serverMsg.data.msg + "  " + serverMsg.data.err)
    }
  }

  return (
    <div class="h-screen">
      <form class="mb-8 ">
        <h1 className="pt-[50px] font-semibold leading-7 text-sky-900 text-4xl flex justify-center ">
          Item Manager
        </h1>
        <div className="space-y-12 mt-[70px]">
          <div className="border-b-2 border-gray-600 pb-6">
            <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
              <div className="sm:col-span-4 ml-[180px]">
                <label
                  htmlFor="email"
                  className="ml-7 block  text-2xl font-medium leading-6 text-black"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={doUpdate}
                    autoComplete="email"
                    className="block ml-5 pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="mt-8 ml-9 flex items-center gap-x-3">
                <button
                  type="button"
                  onClick={fetchdata}
                  className="rounded-md  px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset bg-gray-100 hover:bg-sky-500 hover:text-white"
                >
                  Items Published
                </button>
              </div>
            </div>
          </div>
        </div>

        <table className=" min-w-full h-max mt-4 ">
          <thead>
            <tr className="text-center">
              <th scope="col" className="py-2 pl-14  font-medium text-black">
                Image
              </th>
              <th scope="col" className="py-2  font-medium text-black">
                Category
              </th>
              <th scope="col" className="py-2  font-medium text-black">
                Items
              </th>
              
              <th scope="col" className="py-2  font-medium text-black">
                City
              </th>
              
              <th
                scope="col"
                className="py-2  font-medium text-black pr-[60px]"
              >
                Buttons
              </th>
            </tr>
          </thead>
          <tbody>
            {ary.map((obj) => {
              return (
                <tr className="text-center">
                  <td className="py-2 whitespace-nowrap">
                    <div className="flex float-right h-[200px] w-[300px]">
                      <img
                        src={`http://localhost:2010/uploads/${obj.picpath}`}
                        alt=""
                      ></img>
                    </div>
                  </td>

                  <td className="py-2 whitespace-nowrap">
                    <div className="text-lg text-blue-950">{obj.category}</div>
                  </td>
                  <td className="py-2 whitespace-nowrap">
                    <div className="text-lg  text-blue-950">{obj.items}</div>
                  </td>
                  
                  <td className="py-2 whitespace-nowrap">
                    <div className="text-lg text-blue-950">{obj.city}</div>
                  </td>
                  
                  <td className="py-2 whitespace-nowrap pr-[60px]">
                    
                    <button
                    type="submit"
                      onClick={(e)=>{
                        e.preventDefault();
                        doDlt(obj)}}
                      className="text-red-600 border border-blue-950 px-3 py-1 bg-cyan-50 rounded-lg hover:bg-sky-500 hover:text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </form>
    </div>
  );
}


export default ItemManager;
