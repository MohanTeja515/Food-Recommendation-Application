import React from 'react'
import { RecipeType } from '../typings'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { useRef, useState } from 'react'
import Card from './Card'

type Props = {
    title: string,
    recipes: RecipeType[]
}

const Row = ({ title, recipes }: Props) => {
    const rowRef = useRef<HTMLDivElement>(null)
    const [isMoved, setIsMoved] = useState(false)
    const handleClick = (direction: string) => {
        setIsMoved(true)
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current

            const scrollTo =
                direction === 'left'
                    ? scrollLeft - clientWidth
                    : scrollLeft + clientWidth
            rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
        }
    }

    return (
        <div className="h-full px-4 my-3 bg-[#dcfce7] space-x-2 py-2 rounded-lg mx-1">
            <h2 className="cursor-pointer text-xl font-extrabold transition duration-200 md:text-2xl">
                {title}
            </h2>
            <div className="group relative md:-ml-2">
                <ChevronLeftIcon
                    className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${!isMoved && 'hidden'
                        }`}
                    onClick={() => handleClick('left')}
                />
                <div
                    className="flex items-center space-x-6 overflow-x-scroll scrollbar-hide md:p-2 flex-stretch flex-shrink flex-basis flex-grow-0"
                    ref={rowRef}
                >
                    {recipes.map((recipe) => (
                        <Card key={recipe.id} recipe={recipe} />
                    ))}
                </div>
                <ChevronRightIcon
                    className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 "
                    onClick={() => handleClick('right')}
                />
            </div>
        </div>
    )
}

export default Row