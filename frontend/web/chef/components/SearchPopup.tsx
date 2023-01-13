// import { useState } from 'react'

// import { Tab } from '@headlessui/react'
// import classNames from 'classnames'

// import { toast } from 'react-toastify';

// import { useForm } from "react-hook-form";
// import Row from './Row';

// type Props = {}

// const SearchPopup = (props: Props) => {
//     const { register, handleSubmit, formState: { errors } } = useForm();

//     const [searchedlistings, setsearchedlistings] = useState([])

//     const onSubmit = (data) => {

//         console.log(data)

//         const tryLoadData = async () => {
//             try {
//                 const res = await fetch(`http://127.0.0.1:8000/recipe/filter/?search=${data.search}&recipe_rating=${data.rating}&prep_time=${data.prep}&food_type=${data.food}&cuisine_type=${data.cuisine}&meal_type=${data.meal}`, {
//                     method: 'GET',
//                     headers: {
//                         'Accept': 'application/json',
//                         'Content-Type': 'application/json'
//                     },
//                 });

//                 console.log(res)

//                 if (res.status === 200) {
//                     const data = await res.json()
//                     setsearchedlistings(data.listings)
//                     toast.success('Loaded Data Successfully', {
//                         position: toast.POSITION.TOP_CENTER
//                     });
//                 } else {
//                     toast.error('Something went wrong, Please try again', {
//                         position: toast.POSITION.TOP_CENTER
//                     });
//                 }
//             } catch (err) {
//                 toast.error('Something went wrong, Please try again', {
//                     position: toast.POSITION.TOP_CENTER
//                 });
//             }
//         }
//         tryLoadData()
//     };

//     console.log(searchedlistings)

//     return (
//         <div className="w-full py-2 sm:px-0">
//             <Tab.Group>
//                 <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mr-10 ml-9">
//                     <Tab
//                         className={({ selected }) =>
//                             classNames(
//                                 'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
//                                 'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
//                                 selected
//                                     ? 'bg-white shadow'
//                                     : 'text-blue-500 hover:bg-white/[0.12] hover:text-white'
//                             )
//                         }
//                     >
//                         Search with a Recipe Name
//                     </Tab>
//                     <Tab
//                         className={({ selected }) =>
//                             classNames(
//                                 'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
//                                 'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
//                                 selected
//                                     ? 'bg-white shadow'
//                                     : 'text-blue-500 hover:bg-white/[0.12] hover:text-white'
//                             )
//                         }
//                     >
//                         Search with an Ingredient Name
//                     </Tab>
//                     <Tab
//                         className={({ selected }) =>
//                             classNames(
//                                 'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
//                                 'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
//                                 selected
//                                     ? 'bg-white shadow'
//                                     : 'text-blue-500 hover:bg-white/[0.12] hover:text-white'
//                             )
//                         }
//                     >
//                         Scan a Food Item
//                     </Tab>
//                 </Tab.List>
//                 <Tab.Panels className="mt-2">
//                     <Tab.Panel>
//                         <div className='flex justify-center items-center'>
//                             <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-2 justify-center items-start'>
//                                 <div className='flex justify-center items-center>'>
//                                     <label className='font-bold'>Enter a Recipe Name:</label>
//                                     <input
//                                         {...register("search")}
//                                         className="px-5 rounded-full border border-black py-2 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-black ml-2"
//                                     />
//                                 </div>

//                                 <div className='flex justify-between items-center>'>
//                                     <label className='font-bold pt-1'>Food Type:</label>
//                                     <select {...register("food")} className="px-5 rounded-full border border-black py-2 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-black ml-2" >
//                                         <option value="Vegetarian">Vegetarian</option>
//                                         <option value="Non Vegetarian">Non Vegetarian</option>
//                                     </select>
//                                     {/* {errors.exampleRequired && <span>This field is required</span>} */}
//                                 </div>

//                                 <div className='flex justify-center items-center>'>
//                                     <label className='font-bold py-1'>Cuisine Type:</label>
//                                     <select {...register("cuisine")} className="px-5 rounded-full border border-black py-2 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-black ml-2" >
//                                         <option value="Chinese">Chinese</option>
//                                         <option value="Indian">Indian</option>
//                                         <option value="Mexican">Mexican</option>
//                                         <option value="Other">Other</option>
//                                     </select>
//                                 </div>

//                                 <div className='flex justify-center items-center>'>
//                                     <label className='font-bold pt-1'>Meal Type:</label>
//                                     <select {...register("meal")} className="px-5 rounded-full border border-black py-2 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-black ml-2" >
//                                         <option value="BREAKFAST">Breakfast</option>
//                                         <option value="LUNCH">Lunch</option>
//                                         <option value="DINNER">Dinner</option>
//                                         <option value="SNACK">Snack</option>
//                                         <option value="DRINK">Drink</option>
//                                     </select>
//                                 </div>


//                                 <div className='flex justify-center items-center>'>
//                                     <label className='font-bold pt-1'>Maximum preperation time:</label>
//                                     <input
//                                         type='number'
//                                         defaultValue="5"
//                                         {...register("prep", { min: 1, max: 60 })}
//                                         className="px-5 rounded-full border border-black py-2 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-black ml-2"
//                                     />
//                                 </div>


//                                 <div className='flex justify-center items-center'>
//                                     <label className='font-bold pt-1'>Minimum Rating:</label>
//                                     <select {...register("rating")} className="px-5 rounded-full border border-black py-2 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-black ml-2" >
//                                         <option value="1.0">1</option>
//                                         <option value="2.0">2</option>
//                                         <option value="3.0">3</option>
//                                         <option value="4.0">4</option>
//                                         <option value="5.0">5</option>
//                                     </select>
//                                 </div>


//                                 <button
//                                     type="submit"
//                                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-full uppercase text-lg cursor-pointer active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 w-80 mt-5"
//                                 >
//                                     Search
//                                 </button>
//                                 {/* <input type="submit" /> */}
//                             </form>
//                         </div>
//                     </Tab.Panel>
//                     <Tab.Panel>Content 2</Tab.Panel>
//                     <Tab.Panel>Content 3</Tab.Panel>
//                 </Tab.Panels>
//             </Tab.Group>
//             <section className="md:space-y-24">
//                 {/* {
//                     (searchedlistings) ? (
//                         // <Row title="Result Recipes" allRecipes={searchedlistings} />
//                     ) : null
//                 } */}
//             </section>
//         </div>
//   )
// }

// export default SearchPopup

import React from 'react'

type Props = {}

const SearchPopup = (props: Props) => {
  return (
    <div>SearchPopup</div>
  )
}

export default SearchPopup