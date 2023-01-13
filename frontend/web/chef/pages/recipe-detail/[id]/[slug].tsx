import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Header from '../../../components/Header'
import { RecipeType } from '../../../typings'
import SimpleImageSlider from "react-simple-image-slider";
import EditRecipe from '../../editrecipe';

type Props = {

}

const RecipeDetail = (props: Props) => {
  const router = useRouter()
  const { id, slug } = router.query

  const user_id = localStorage.getItem('id')

  let can_edit = false

  if (id === user_id) {
    can_edit = true
  }

  const [getRecipe, setgetRecipe] = useState([] as any)

  const tryRecipe = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/recipe/get-recipe/${slug}/`, {
        method: 'GET',
      });

      if (res.status === 200) {
        const data = await res.json()
        setgetRecipe(data)
      } else {
      }
    } catch (err) {
    }
  }

  useEffect(() => {
    tryRecipe()
    console.log(getRecipe)
  }, [id, user_id, slug])

  const images = [
    { url: `http://127.0.0.1:8000/${getRecipe.recipe_main_photo}` },
    { url: `http://127.0.0.1:8000/${getRecipe.recipe_photo1}` },
    { url: `http://127.0.0.1:8000/${getRecipe.recipe_photo2}` },
    { url: `http://127.0.0.1:8000/${getRecipe.recipe_photo3}` },
  ];

  return (
    <div>
      <Header />
      <div>
        <div className='flex flex-col py-7 bg-[#f0fdfa] mx-2 my-2 rounded-lg'>
          <h1 className='text-lg font-extrabold uppercase flex items-center justify-center'>{getRecipe.recipe_title}</h1>
          <div>
            <div className="flex items-center justify-end space-x-2 px-5">
              <div className='cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </div>
              <a href="#"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add
                to cart</a>

            </div>
          </div>
          <div className='flex justify-evenly items-center py-5'>
            <SimpleImageSlider
              width='40%'
              height={450}
              images={images}
              showBullets={true}
              showNavs={true}
              slideDuration={1}
              navSize={20}
              navMargin={0}
            />
            <div>


              <div className='space-x-2 flex flex-col'>
                <span className='font-bold text-lg'>
                  Cusine Type:
                </span>
                <span>
                  {getRecipe.cuisine_type}
                </span>
              </div>

              <div className='space-x-2 flex flex-col'>
                <span className='font-bold text-lg'>
                  Meal Type:
                </span>
                <span>
                  {getRecipe.meal_type}
                </span>
              </div>

              <div className='space-x-2 flex flex-col'>
                <span className='font-bold text-lg'>
                  Food Type:
                </span>
                <span>
                  {getRecipe.food_type}
                </span>
              </div>

              <div className='space-x-2 flex flex-col'>
                <span className='font-bold text-lg'>
                  Ingredients:
                </span>
                <span>
                  {getRecipe.ingredients}
                </span>
              </div>

              <div className='space-x-2 flex flex-col'>
                <span className='font-bold text-lg'>
                  Preperation Time:
                </span>
                <span>
                  {getRecipe.prep_time}
                </span>
              </div>

              <div className='space-x-2 flex flex-col'>
                <span className='font-bold text-lg'>
                  Recipe Rating:
                </span>
                <span>
                  {getRecipe.recipe_rating} <span className='text-sm'>({getRecipe.recipe_numReviews} reviews)</span>
                </span>
              </div>
            </div>
          </div>
          <div>
            <div className='space-x-2 flex flex-col'>
              <span className='font-bold text-lg'>
                Recipe Description:
              </span>
              <span>
                {getRecipe.recipe_description}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-end space-x-2 px-5">
          {
                            
                                <div className="p-0.5 rounded-lg bg-blue-400 hover:bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-400">
                                    {
                                        (can_edit) ? (
                                          <EditRecipe recipe={getRecipe} />
                                        ) : null
                                    }
                                </div>
                        }
          </div>
        </div>

      </div>

    </div>
  )
}

export default RecipeDetail

