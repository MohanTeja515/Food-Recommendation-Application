import Head from 'next/head'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Nav from '../components/Nav'
import Row from '../components/Row'

interface Props {
  // likedRecipes: RecipeType[]
  // allRecipes: RecipeType[]
  // IndianRecipes: RecipeType[]
  // MexicanRecipes: RecipeType[]
  // ChineseRecipes: RecipeType[]
  // LunchRecipes: RecipeType[]
  // BreakfastRecipes: RecipeType[]
  // DinnerRecipes: RecipeType[]
  // SnackRecipes: RecipeType[]
  // VegetarianRecipes: RecipeType[]
  // NonVegetarianRecipes: RecipeType[]
  // fiveMinRecipes: RecipeType[]
}

export default function Home({
  // likedRecipes,
  // allRecipes,
  // IndianRecipes,
  // MexicanRecipes,
  // ChineseRecipes,
  // LunchRecipes,
  // BreakfastRecipes,
  // DinnerRecipes,
  // SnackRecipes,
  // VegetarianRecipes,
  // NonVegetarianRecipes,
  // fiveMinRecipes,
}: Props) {

  const access = localStorage.getItem('access')
  
  const [IndianRecipes, setIndianRecipes] = useState([] as any)
  const [likedRecipes, setlikedRecipes] = useState([] as any)
  const [MexicanRecipes, setMexicanRecipes] = useState([] as any)
  const [ChineseRecipes, setChineseRecipes] = useState([] as any)
  const [LunchRecipes, setLunchRecipes] = useState([] as any)
  const [BreakFastRecipes, setBreakFastRecipes] = useState([] as any)
  const [DinnerRecipes, setDinnerRecipes] = useState([] as any)
  const [SnackRecipes, setSnackRecipes] = useState([] as any)
  const [VegetarianRecipes, setVegetarianRecipes] = useState([] as any)
  const [NonVegetarianRecipes, setNonVegetarianRecipes] = useState([] as any)
  const [fiveMinRecipes, setfiveMinRecipes] = useState([] as any)
  
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

  const tryIndianRecipes = async () => {
    try {
      const in_res = await fetch(`http://127.0.0.1:8000/recipe/get-indian-recipes/`, {
        method: 'GET',
      });

      if (in_res.status === 200) {
        const ind_res = await in_res.json()
        setIndianRecipes(ind_res)
      } else {
        console.log(in_res)
      }
    } catch (err) {

    }
  }

  const tryMexicanRecipes = async () => {
    try {
      const in_res = await fetch(`http://127.0.0.1:8000/recipe/get-mexican-recipes/`, {
        method: 'GET',
      });

      if (in_res.status === 200) {
        const ind_res = await in_res.json()
        setMexicanRecipes(ind_res)
      } else {
        console.log(in_res)
      }
    } catch (err) {

    }
  }

  const trySnackRecipes = async () => {
    try {
      const in_res = await fetch(`http://127.0.0.1:8000/recipe/get-snack-recipes/`, {
        method: 'GET',
      });

      if (in_res.status === 200) {
        const ind_res = await in_res.json()
        setSnackRecipes(ind_res)
      } else {
        console.log(in_res)
      }
    } catch (err) {

    }
  }

  const tryChineseRecipes = async () => {
    try {
      const in_res = await fetch(`http://127.0.0.1:8000/recipe/get-chinese-recipes/`, {
        method: 'GET',
      });

      if (in_res.status === 200) {
        const ind_res = await in_res.json()
        setChineseRecipes(ind_res)
      } else {
        console.log(in_res)
      }
    } catch (err) {

    }
  }

  const tryLunchRecipes = async () => {
    try {
      const in_res = await fetch(`http://127.0.0.1:8000/recipe/get-lunch-recipes/`, {
        method: 'GET',
      });

      if (in_res.status === 200) {
        const ind_res = await in_res.json()
        setLunchRecipes(ind_res)
      } else {
        console.log(in_res)
      }
    } catch (err) {

    }
  }

  const tryDinnerRecipes = async () => {
    try {
      const in_res = await fetch(`http://127.0.0.1:8000/recipe/get-dinner-recipes/`, {
        method: 'GET',
      });

      if (in_res.status === 200) {
        const ind_res = await in_res.json()
        setDinnerRecipes(ind_res)
      } else {
        console.log(in_res)
      }
    } catch (err) {

    }
  }

  const tryBreakFastRecipes = async () => {
    try {
      const in_res = await fetch(`http://127.0.0.1:8000/recipe/get-breakfast-recipes/`, {
        method: 'GET',
      });

      if (in_res.status === 200) {
        const ind_res = await in_res.json()
        setBreakFastRecipes(ind_res)
      } else {
        console.log(in_res)
      }
    } catch (err) {

    }
  }

  const tryVegetarianRecipes = async () => {
    try {
      const in_res = await fetch(`http://127.0.0.1:8000/recipe/get-vegetarian-recipes/`, {
        method: 'GET',
      });

      if (in_res.status === 200) {
        const ind_res = await in_res.json()
        setVegetarianRecipes(ind_res)
      } else {
        console.log(in_res)
      }
    } catch (err) {

    }
  }

  const tryNonVegetarianRecipes = async () => {
    try {
      const in_res = await fetch(`http://127.0.0.1:8000/recipe/get-non-vegetarian-recipes/`, {
        method: 'GET',
      });

      if (in_res.status === 200) {
        const ind_res = await in_res.json()
        setNonVegetarianRecipes(ind_res)
      } else {
        console.log(in_res)
      }
    } catch (err) {

    }
  }

  const tryFiveMinRecipes = async () => {
    try {
      const in_res = await fetch(`http://127.0.0.1:8000/recipe/get-five-min-recipes/`, {
        method: 'GET',
      });

      if (in_res.status === 200) {
        const ind_res = await in_res.json()
        setfiveMinRecipes(ind_res)
      } else {
        console.log(in_res)
      }
    } catch (err) {

    }
  }

  // console.log(IndianRecipes)

  useEffect(() => {
    tryIndianRecipes()
    tryMexicanRecipes()
    tryChineseRecipes()
    tryBreakFastRecipes()
    tryFiveMinRecipes()
    tryLikedRecipes()
    tryDinnerRecipes()
    tryLunchRecipes()
    tryNonVegetarianRecipes()
    tryVegetarianRecipes()
    trySnackRecipes()
  }, [])

  return (
    <>
      <Head>
        <title>Foodies | Taste Heavenly Recipes</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header />
      <Nav />
      <main className="relative pb-24 lg:space-y-4">
        <section className="md:space-y-8">
          <Row title="Liked Recipes" recipes={likedRecipes} />
          <Row title="Prepared in 5 min" recipes={fiveMinRecipes} />
          <Row title="Tasty Indian Food" recipes={IndianRecipes} />
          <Row title="Spicy Mexican" recipes={MexicanRecipes} />
          <Row title="Havve a Snack" recipes={SnackRecipes} />
          <Row title="Lovely Chinese Food" recipes={ChineseRecipes} />
          <Row title="Buy or Make Lunch" recipes={LunchRecipes} />
          <Row title="Have a Breakfast" recipes={BreakFastRecipes} />
          <Row title="Prepare Dinner" recipes={DinnerRecipes} />
          <Row title="Have a Snack" recipes={SnackRecipes} />
          <Row title="Try Vegetarian" recipes={VegetarianRecipes} />
          <Row title="Non Vegetarian" recipes={NonVegetarianRecipes} />
          <Row title="Prepare in less than 5 min" recipes={fiveMinRecipes} />
        </section>
      </main>
    </>
  )
}


export const getServerSideProps = async () => {
  const [
    // likedRecipes,
    // allRecipes,
    // IndianRecipes,
    // MexicanRecipes,
    // ChineseRecipes,
    // LunchRecipes,
    // BreakfastRecipes,
    // DinnerRecipes,
    // SnackRecipes,
    // VegetarianRecipes,
    // NonVegetarianRecipes,
    // fiveMinRecipes,
  ] = await Promise.all([
    // fetch(requests.likedRecipes).then((res) => res.json()),
    // fetch(requests.allRecipes).then((res) => res.json()),
    // fetch('http://127.0.0.1:8000/recipe/get-indian-recipes/'),
    // fetch(requests.MexicanRecipes).then((res) => res.json()),
    // fetch(requests.ChineseRecipes).then((res) => res.json()),
    // fetch(requests.LunchRecipes).then((res) => res.json()),
    // fetch(requests.BreakfastRecipes).then((res) => res.json()),
    // fetch(requests.DinnerRecipes).then((res) => res.json()),
    // fetch(requests.SnackRecipes).then((res) => res.json()),
    // fetch(requests.VegetarianRecipes).then((res) => res.json()),
    // fetch(requests.NonVegetarianRecipes).then((res) => res.json()),
    // fetch(requests.fiveMinRecipes).then((res) => res.json()),
  ])

  return {
    props: {
      // likedRecipes: likedRecipes.results,
      // allRecipes: allRecipes.results,
      // IndianRecipes: IndianRecipes.json(),
      // MexicanRecipes: MexicanRecipes.results,
      // ChineseRecipes: ChineseRecipes.results,
      // LunchRecipes: LunchRecipes.results,
      // BreakfastRecipes: BreakfastRecipes.results,
      // DinnerRecipes: DinnerRecipes.results,
      // SnackRecipes: SnackRecipes.results,
      // VegetarianRecipes: VegetarianRecipes.results,
      // NonVegetarianRecipes: NonVegetarianRecipes.results,
      // fiveMinRecipes: fiveMinRecipes.results,
    },
  }
}

// export async function getServerSideProps() {

//   const res = await fetch(`http://127.0.0.1:8000/recipe/get-indian-recipes/`)
//   const data = await res.json()
//   console.log(data)

//   // Pass data to the page via props
//   return { props: { 
//     // IndianRecipes: IndianRecipes.results
//    } }
// }