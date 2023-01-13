import React, { useEffect, useState } from 'react'
import About from '../components/About'
import Header from '../components/Header'
import ProfileRecipes from '../components/ProfileRecipes'

interface Props {

}

const profile = (props: Props) => {

  const frist_name = localStorage.getItem('first_name')
  const last_name = localStorage.getItem('last_name')
  const is_chef = localStorage.getItem('is_chef')
  const profile_photo = localStorage.getItem('profile_photo')
  const email = localStorage.getItem('email')
  const profile_description = localStorage.getItem('profile_description')

  const [myRecipes, setmyRecipes] = useState([] as any)
  const [likedRecipes, setlikedRecipes] = useState([] as any)

  const access = localStorage.getItem('access')

  const tryMyRecipes = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/recipe/manage-recipe/`, {
        method: 'GET',
        headers: {
          'Authorization': `JWT ${access}`,
          'Content-Type': 'application/json'
        },
      });

      if (res.status === 200) {
        const data = await res.json()
        setmyRecipes(data.listing)
        // console.log(data)
      } else {
        console.log(res)
      }
    } catch (err) {

    }
  }

  const tryLikedRecipes = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/recipe/like/`, {
        method: 'GET',
        headers: {
          'Authorization': `JWT ${access}`,
        },
      });

      if (res.status === 200) {
        const data = await res.json()
        setlikedRecipes(data.listing)
      } else {
        console.log(res)
      }
    } catch (err) {

    }
  }

  useEffect(() => {

    if (is_chef) {
      tryMyRecipes()
      tryLikedRecipes()
    }

  }, [is_chef, access])

  return (
    <div className='flex flex-col'>
      <Header />
      <About />
      <ProfileRecipes myRecipes={myRecipes} likedRecipes={likedRecipes} />
    </div>
  )
}

export default profile

