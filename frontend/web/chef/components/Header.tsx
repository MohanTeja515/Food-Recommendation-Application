import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { styled, alpha } from '@mui/material/styles';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import ChatIcon from '@mui/icons-material/Chat';
import { HowToReg, Login } from '@mui/icons-material';
import Menu, { MenuProps } from '@mui/material/Menu';

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { useAppDispatch, useAppSelector } from '../redux/app/hooks'
import { getDetails, logout } from '../redux/slices/userSlice';

import { toast } from 'react-toastify';
import Search from './Search';
import AddRecipe from '../pages/addrecipe';


const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));



type Props = {}

const Header = (props: Props) => {

    const dispatch = useAppDispatch()
    const router = useRouter()

    const access = localStorage.getItem('access')

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const toLogin = () => {
        router.push('/login')
    }

    const toSignup = () => {
        router.push('/signup')
    }

    // const toAddRecipe = () => {
    //     router.push('/addrecipe1')
    // }

    const toChef = () => {
        router.push('/chefinitiate')
    }

    const tryLogout = () => {
        dispatch(logout())
        toast.success('Logged out Successfully', {
            position: toast.POSITION.TOP_CENTER
        });
    }



    const tryGetDetails = async () => {
        try {
            const res = await fetch(`http://127.0.0.1:8000/auth/users/me/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${access}`
                },

            });

            console.log(res)

            if (res.status === 200) {
                const data = await res.json()
                dispatch(getDetails(data))
            } else {

            }
        } catch (err) {

        }
    }

    const first_name = useAppSelector(state => state.user.first_name)
    const is_chef = useAppSelector(state => state.user.is_chef)
    const refresh = useAppSelector(state => state.user.refresh)
    const last_name = useAppSelector(state => state.user.last_name)
    const email = useAppSelector(state => state.user.email)
    const profile_photo = useAppSelector(state => state.user.profile_photo)


    React.useEffect(() => {
        tryGetDetails()
    }, [access, refresh, last_name, email, profile_photo, is_chef])


    return (
        <header className='shadow-sm'>
            <div className="inline-flex mt-1">
                <Link className="mt-1" href="/">
                    <>
                        <div className="hidden md:flex">
                            <Image
                                src='/favicon.ico'
                                alt='logo'
                                width={20}
                                height={10}
                                className='block'
                            />
                            <div className='hidden md:block uppercase text-blue-400 ml-0.5 tracking-wider font-extrabold border-b border-blue-400 hover:text-blue-600 hover:border-blue-400'>oodies</div>
                        </div>
                        <div className="block md:hidden">
                            <Image
                                src='/favicon.ico'
                                alt='logo'
                                width={30}
                                height={30}
                                className='block'
                            />
                        </div>
                    </>
                </Link>
            </div>
            <div className='sm:block hidden md:block'>
                <Search />
            </div>

            <div className="flex-initial">
                <div className="flex justify-end items-center relative">
                    <div className="flex mr-1 items-center">

                        {
                            (!access) ? (
                                <>
                                    <Link href='/login'>
                                        <div className="block text-[#0ea5e9] hover:text[#0ea5e9] px-3 py-1 font-semibold rounded-lg bg-[#f1f5f9] uppercase hover:bg-white hover:text-[#334155] transition">Login</div>
                                    </Link>
                                </>
                            ) : (
                                <div className="p-0.5 rounded-lg bg-blue-400 hover:bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-400">
                                    {
                                        (!is_chef) ? (
                                            <button className="rounded-lg bg-blue-400 hover:bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-400" onClick={toChef}>
                                                <div className="px-2 py-1 text-[#0ea5e9] hover:text[#0ea5e9] font-semibold rounded-lg bg-[#f1f5f9] uppercase hover:bg-white hover:text-[#334155] transition flex space-x-1">
                                                    Contribute As Chef
                                                </div>
                                            </button>
                                        ) : (
                                            // <button onClick={toAddRecipe}>
                                            //     <div className="px-2 py-1 text-[#0ea5e9] hover:text[#0ea5e9] font-semibold rounded-lg bg-[#f1f5f9] uppercase hover:bg-white hover:text-[#334155] transition flex space-x-1">
                                            //         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                            //             <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            //         </svg>
                                            //         <span className='hidden md:block'>Add Recipe</span>
                                            //     </div>
                                            // </button>
                                            <AddRecipe />
                                        )
                                    }
                                </div>


                            )
                        }

                        <>
                            {
                                (access) ? (
                                    <div className="block relative ml-1">
                                        <button type="button" className="inline-block py-2 px-2 hover:bg-gray-200 rounded-full relative ">
                                            <div className="flex items-center h-5">
                                                <div className="_xpkakx">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                ) : null
                            }
                        </>

                    </div>

                    <div className="block">
                        <button
                            id="demo-customized-button"
                            aria-controls={open ? 'demo-customized-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            className="inline-flex items-center px-2 border rounded-full hover:shadow-lg border-blue-300"
                        >
                            <div className="pl-1">
                                <svg
                                    viewBox="0 0 32 32"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                    role="presentation"
                                    focusable="false"
                                    className="h-6 w-6 text-black stroke-current overflow-visible block"
                                >
                                    <g fill="none" fillRule="nonzero">
                                        <path d="m2 16h28"></path>
                                        <path d="m2 24h28"></path>
                                        <path d="m2 8h28"></path>
                                    </g>
                                </svg>
                            </div>
                            <div className="block flex-grow-0 flex-shrink-0 h-10 w-12 pl-4">
                                <svg
                                    viewBox="0 0 32 32"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                    role="presentation"
                                    focusable="false"
                                    className="block fill-current mt-1"
                                >
                                    <path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path>
                                </svg>
                            </div>
                        </button>

                        <StyledMenu
                            id="demo-customized-menu"
                            MenuListProps={{
                                'aria-labelledby': 'demo-customized-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                        >

                            {
                                (access) ? (
                                    <MenuItem>
                                        <div className='flex flex-col'>
                                            <p className='font-semibold'>Logged in as</p>
                                            <Link href='/profile'>
                                                <p className='ml-1 hover:underline'>{first_name}</p>
                                            </Link>
                                        </div>
                                    </MenuItem>
                                ) : (
                                    <div>
                                        <MenuItem>
                                            <HowToReg />
                                            Signup
                                        </MenuItem>
                                        <MenuItem onClick={toLogin}>
                                            <Login />
                                            Login
                                        </MenuItem>
                                    </div>

                                )
                            }


                            <Divider sx={{ my: 0.5 }} />
                            <MenuItem>
                                <CenterFocusWeakIcon />
                                Scan
                            </MenuItem>
                            <MenuItem>
                                <ChatIcon />
                                Chat
                            </MenuItem>
                            <MenuItem>
                                <MoreHorizIcon />
                                More Help
                            </MenuItem>

                            {
                                (access) ? (
                                    <div>
                                        <Divider sx={{ my: 0.5 }} />
                                        <MenuItem onClick={() => tryLogout()}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                            </svg>

                                            <span className='ml-2'>Logout</span>
                                        </MenuItem>
                                    </div>
                                ) : null
                            }

                        </StyledMenu>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header