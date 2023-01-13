import React from 'react'
import { useRouter } from 'next/router'

import { toast } from 'react-toastify';

type Props = {
    uid?: string
}

const Token = (props: Props) => {

    const router = useRouter()
    const { uid, token } = router.query

    const tryActivateAccount = async () => {
        const body1 = {
            "uid": uid,
            "token": token
        }
        const body = JSON.stringify(body1)

        try {
            const res = await fetch(`http://127.0.0.1:8000/auth/users/activation/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body
            });

            if (res.status === 204) {
                router.push('/login')
                toast.success('Your account activated successfully, now you can login', {
                    position: toast.POSITION.TOP_CENTER
                });
            } else {
                toast.error('Something went wrong, activation link expired or invalid', {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        } catch (err) {
            toast.error('Something went wrong, Please try again', {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }


    return (
        <div className='flex flex-col justify-center items-center pt-20 h-full mt-40'>
            <button className="p-0.5 rounded-lg bg-blue-400 hover:bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300" onClick={tryActivateAccount}>
                <span className="block text-[#0ea5e9] hover:text[#0ea5e9] px-3 py-1 font-semibold rounded-lg bg-[#f1f5f9] uppercase hover:bg-white hover:text-[#334155] transition">Activate Account</span>
            </button>
        </div>
    )
}

export default Token