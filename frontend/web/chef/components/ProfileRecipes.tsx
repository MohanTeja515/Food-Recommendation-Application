import { useState, useEffect } from 'react'
import { Tab } from '@headlessui/react'
import classNames from 'classnames'
import Card from './Card'
import { RecipeType } from '../typings'
import AddRecipe from '../pages/addrecipe'
import { Divider } from '@mui/material'

type Props = {
  myRecipes: []
  likedRecipes: []
}



const ProfileRecipes = ({
  myRecipes,
  likedRecipes
}: Props) => {

  console.log(myRecipes)
  const is_chef = localStorage.getItem('is_chef')
  const access = localStorage.getItem('access')

  const myRecipesList = myRecipes
  const likedList = likedRecipes

  let [categories] = useState({
    'My Recipes': myRecipes,
    'Liked Recipes': likedList,
  })

  return (
    <div className="w-full px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-800 uppercase',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-black-100 hover:bg-white/[0.12] hover:text-blue'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels className="mt-2">

          <Tab.Panel>
            <div className='flex flex-col items-center pt-2'>
              <div className='border border-blue-500 rounded-lg'>
              <AddRecipe />
              </div>
              <Divider />
              <div
                className="flex flex-wrap justify-evenly items-center px-5 gap-x-6 gap-y-6 py-2"
              >
                {myRecipesList.map((recipe) => (
                  <div className='w-80' key={recipe['id']}>
                    <Card recipe={recipe} />
                  </div>
                ))}
              </div>
            </div>

          </Tab.Panel>
          <Tab.Panel>
            <div
              className="flex flex-wrap justify-evenly items-center px-5 gap-x-6 gap-y-6 py-2"
            >
              {likedList.map((recipe) => (
                <div className='w-80' key={recipe['id']}>
                  <Card recipe={recipe} />
                </div>
              ))}
            </div>
          </Tab.Panel>
        </Tab.Panels>

      </Tab.Group>
    </div>
  )
}

export default ProfileRecipes