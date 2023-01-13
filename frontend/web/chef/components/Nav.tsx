import React from 'react'

type Props = {}

const Nav = (props: Props) => {

    const titles = [
        { id: 1, type: 'Indian' },
        { id: 2, type: 'dinner' },
        { id: 3, type: 'Mexican' },
        // { id: 4, type: '5-min recipes' },
        // { id: 5, type: 'lunch' },
        // { id: 6, type: 'chinese' },
        // { id: 7, type: 'snack' },
        // { id: 8, type: 'breakfast' },
        // { id: 9, type: 'Indian' },
        // { id: 10, type: 'dinner' },
        // { id: 11, type: 'Mexican' },
        // { id: 12, type: '5-min recipes' },
        // { id: 13, type: 'lunch' },
        // { id: 14, type: 'chinese' },
        // { id: 15, type: 'snack' },
        // { id: 16, type: 'breakfast' }
    ]

    return (
        <div className='flex px-5 space-x-3 text-lg mt-2'>
            {titles.map(title => {
                return (
                    <div key={title.id} className='font-semibold border rounded-full px-3'>
                        <h2 className='w-full'>{title.type}</h2>
                    </div>
                );
            })}
        </div>

    )
}

export default Nav