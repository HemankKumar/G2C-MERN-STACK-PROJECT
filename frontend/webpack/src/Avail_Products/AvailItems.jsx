import React, { useState } from 'react'
import axios from "axios";
import { PhotoIcon } from '@heroicons/react/24/solid'

export default function AvailItems() {
  const [obj, setobj] = useState({
    email: "",
    category: "",
    items: [],
    city:"",
    pic: null
  })

  const [imgPrev , setPrev] = useState("");

  const [category,setcategory]=useState([]);

  const [selprod,setSelProd]=useState("");

  function changepic(e) {
    console.log(e.target.files);
    setobj({
      ...obj  , [e.target.name]:e.target.files[0]
    })
    setPrev(URL.createObjectURL(e.target.files[0]))
  }


  function doUpdate(event) {
    var { name, value } = event.target;

    setobj({ ...obj, [name]: value, })

     //----Filling product Combo-box---

     var milkProduct=["milk","butter","panner","buttermilk","curd"]
     var vegProduct=["Carrots","Okra","Beans","Cabbage","Peas"];
     var fruitProduct=["Apple","Mango","Banana","Orange","Grapes"];
     var nutProduct=["Almond","Cashew","Walnut","Peanut","Pistachio"];
     var oilProduct=["Mustard","Sesame","Olive","Sunflower","Soyabean"];

     if(value==="Dairy Products"){
      setcategory(milkProduct)
      }
     else if(value==="Veggies"){
      setcategory(vegProduct)
     }
     else if(value==="Fruits"){
      setcategory(fruitProduct)
     }
     else if(value==="Nuts"){
      setcategory(nutProduct)
     }
     else{
      setcategory(oilProduct)
     }

    
  }


  function doUpdate2(event){

    // alert(JSON.stringify());

    var options = [...event.target.selectedOptions];
    var values = options.map(opt => {
      
      if(!obj.items.includes(opt.value))
      {
        obj.items.push(opt.value)
      }

    });

    // alert(values);

    // setobj({...obj,"items":values})

        
    // setSelProd(event.target.value)

    // obj.items.push(event.target.value);

    // alert(obj.items)

    // setobj({...obj,"items":event.target.value})

   }

  


  // product data saving function
  async function doSaveWithAxios() {
    

    const url = "http://localhost:2010/save/save-avail-product";

    var formdata = new FormData()


    for (var prop in obj) {
      formdata.append(prop, obj[prop])
    }

    const serverMsg = await axios.post(url, formdata, { headers: { 'content-type': 'multipart/form-data' } })

    if (serverMsg.data.status === true) {
      alert("Product saved successfully")
    }
    else {
      alert(serverMsg.data.msg + " " + serverMsg.data.err)
    }


  }
  return (
        <div class="flex justify-center items-center  bg-gradient-to-r from-sky-200 via-gray-100 to-green-200 ">
            <div className='flex flex-col items-center mr-[100px] '>
          <img
              className=" h-[300px] w-[350px] "
              src="pics/giphy.gif"
              alt=""
            />
          <img
              className=" h-[300px] w-[350px] mt-7"
              src="pics/giph.gif"
              alt=""
            />
          <img
              className=" h-[300px] w-[350px] mt-7"
              src="pics/gip.gif"
              alt=""
            />
            </div>
        <form class="mb-8">
          <div className="space-y-12">
            <div className="border-b border-gray-300 pb-6">
              <h1 className=" font-semibold leading-7 text-sky-900 text-4xl mt-8 ml-[100px]">Enlist Your Items Here</h1>
              <h2 className="text-2xl font-semibold leading-7 text-gray-900 mt-12 ">Add Items you deal with</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent Address and Phone No. where you can be reached.</p>
    
              <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      onChange={doUpdate}
                      autoComplete="email"
                      className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
    
            <div className="border-b border-gray-600 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                  <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                    Product Category
                  </label>
                    <div className="mt-2">
                      <select
                        id="category"
                        name="category"
                        onChange={doUpdate}
                        autoComplete="country-name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-100 block w-full p-2.5 dark:bg-white dark:border-gray-100 dark:text-black dark:focus:ring-blue-300 dark:focus:border-blue-500">
                        <option defaultValue={"Choose..."}>Choose..</option>            {/*Here onChange={doUpdate} val of category will be updated in obj state and relative products will be updated in prod combo*/}
                          <option value="Dairy Products">Dairy Products</option>
                          <option value="Veggies">Veggies</option>
                          <option value="Fruits">Fruits</option>
                          <option value="Nuts">Nuts</option>
                          <option value="Edible Oil">Edible Oil</option>
                      </select>
                    </div>
                </div>
              
                <div className="sm:col-span-3 ">

                  <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Item Of Selected Category

                    <label htmlFor="first-name" className="block text-xs font-medium leading-6 text-gray-900">
                    (Press and Hold ctrl to Select Muliple Items)
                  </label>

                  </label>

                  <div className='mt-2'>
                    <select multiple name="product" id="product" onChange={(e) => doUpdate2(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-100 block w-full p-2.5 dark:bg-white dark:border-gray-100 dark:text-black dark:focus:ring-blue-300 dark:focus:border-blue-500" placeholder="" required>    
                              <option defaultValue={"Choose"}>Choose..</option>           {/*Here onChange={doUpdate2} value of selprod will be updated in obj state as well as selprod state invoking useEffect and filling corresponding city combo*/}
                              {category.map((str,index)=>{
                                  return <option key={index}  value={str}>{str}</option>
                              })}
                    </select>
                  </div>


                </div>
             
    
              </div>

              <div class="grid  md:grid-cols-2">
               <div className="mt-7">
                  <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                    City
                  </label>
                  <div className="mt-2 mr-6">
                    <input
                      type="text"
                      name="city"
                      onChange={doUpdate}
                      id="city"
                      className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

            
               
              </div>

              <div className="col-span-3">
                  <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 mt-4 text-gray-900">
                   Pic Upload of the Product
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white font-semibold text-sky-500 focus-within:outline-none focus-within:ring-2  focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>

                          <input id="file-upload" name="pic" type="file"  onChange={changepic} className="sr-only" />

                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center ml-[90px] mt-3 mb-[-40px] h-[180px] w-[300px]">
              <img src={imgPrev} alt="Not Yet Uploaded"></img>
            </div>
            </div>
          </div>
    
          <div className="mt-6 flex items-center justify-center gap-x-2">
         
            <button
              type="button"
              onClick={doSaveWithAxios}
              className="rounded-md  px-4 py-3  bg-whites text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset bg-gray-100 hover:bg-sky-500 hover:text-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-900"
            >
              Publish
            </button>
          </div>
        </form>
        </div>
      )
    }
    

function doUpdate3(e)
{
  alert(e.target.value)
}