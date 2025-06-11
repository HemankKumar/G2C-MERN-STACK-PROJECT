import "./profile.css"

import { useState } from "react";

import axios from "axios";

import { PhotoIcon } from '@heroicons/react/24/solid'

function Profile() {

  const [obj, setobj] = useState({
    email: "",
    firstname: "",
    lastname: "",
    dealing: "",
    address: "",
    city: "",
    state: "",
    postalcode: "",
    mobilenumber: "",
    aadhaarnumber: "",
    pic: null

  })

  const [imgPrev , setPrev] = useState("");

  function doUpdate(event) {
    var { name, value } = event.target;

    setobj({ ...obj, [name]: value, })
  }

  function changepic(e) {
    console.log(e.target.files);
    setobj({
      ...obj  , [e.target.name]:e.target.files[0]
    })
    setPrev(URL.createObjectURL(e.target.files[0]))

  }


  // profile data saving function
  async function doSaveWithAxiosPost() {
    const url = "http://localhost:2010/save/saveprofile";

    var formdata = new FormData()

    for (var prop in obj) {
      formdata.append(prop, obj[prop])
    }

    const serverMsg = await axios.post(url, formdata, { headers: { 'content-type': 'multipart/form-data' } })

    if (serverMsg.data.status === true) {
      alert("saved successfully")
    }
    else {
      alert(serverMsg.data.msg + " " + serverMsg.data.err)
    }


  }



  // profile data fetching/searching function

  async function fetchprofile()
  {
      
      const url = `http://localhost:2010/save/fetch-profile?email=${obj.email}`;
      const serverData= await axios.get(url);
      console.log(serverData.data)

      if(serverData.data.status==true)
      {
          if(serverData.data.obj!=null)
          {
              alert(JSON.stringify(serverData));
              console.log(serverData.data.obj.picpath)
              setobj(serverData.data.obj);
              setPrev(`http://localhost:2010/uploads/${serverData.data.obj.picpath}`);
          }
          else
              alert("Invalid Item or Check Case (upper/Lower)");
      }
  }


  // profile data updating function

  const updateprofile = async (e) => {
   
    console.log(obj);

    const formData = new FormData();
    for (let key in obj) {
        formData.append(key, obj[key]);
    }

    //sending the formData to the backend
    let url = "http://localhost:2010/save/update-profile"

    const response = await axios.post(url, formData, { headers: { 'Content-Type': "multipart/form-data" } });

    const data = await response.data;

    if (data.success === true) {
        alert("Profile Updated Successfully");
    }
    else {
        alert("Something went wrong ", data.error);
    }
}



  return (
    <form>

      <div className=" space-y-12 px-96 mt-8">
        <center><p className="text-5xl"> Create Your ProFile,Grower</p></center>

        <div className="border-b border-gray-900/10 pb-12 ">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={doUpdate}
                  className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 mt-8">
              <button type="button" onClick={fetchprofile} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Search Profile
              </button>
            </div>
          </div>


          <div className=" main mt-20 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="firstname"
                  id="first-name"
                  autoComplete="given-name"
                  onChange={doUpdate}
                  value={obj.firstname}
                  className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="lastname"
                  id="last-name"
                  onChange={doUpdate}
                  value={obj.lastname}
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>



            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Dealing In
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="dealing"
                  autoComplete="country-name"
                  value={obj.dealing}

                  onChange={doUpdate}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="" disabled selected hidden>Select</option>
                  <option>Vegetables</option>
                  <option>Fruits</option>
                  <option>Dairy Products</option>
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Address(Shop/Home)
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="address"
                  id="street-address"
                  autoComplete="street-address"
                  onChange={doUpdate}
                  value={obj.address}
                  className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  id="city"
                  autoComplete="address-level2"
                  onChange={doUpdate}
                  value={obj.city}
                  className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="state"
                  id="region"
                  autoComplete="address-level1"
                  onChange={doUpdate}
                  value={obj.state}
                  className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="postalcode"
                  id="postal-code"
                  autoComplete="postal-code"
                  onChange={doUpdate}
                  value={obj.postalcode}
                  className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Mobile Number
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="mobilenumber"
                  id="last-name"
                  autoComplete="family-name"
                  onChange={doUpdate}
                  value={obj.mobilenumber}
                  className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Aadhaar Card Number
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="aadhaarnumber"
                  id="last-name"
                  autoComplete="family-name"
                  onChange={doUpdate}
                  value={obj.aadhaarnumber}
                  className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-3">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Aadhaar Card Pic
              </label>

              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="pic" type="file" className="sr-only" onChange={changepic} />



                    </label>


                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>

              </div>
            </div>

            <div className="img col-span-3 mt-4">
              <img src={imgPrev} alt=""></img>
            </div>

          </div>
        </div>


      </div>

      <div className=" mb-4 flex items-center justify-start gap-x-8 px-96">
        <button type="button" onClick={doSaveWithAxiosPost} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Save Profile
        </button>
        <button
          type="button" onClick={updateprofile} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Update Profile
        </button>
      </div>

    </form>

  )
}

export default Profile;
