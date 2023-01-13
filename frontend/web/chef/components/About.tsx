import * as React from 'react';
import Router from "next/router";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Avatar from '@mui/material/Avatar';

import { toast } from 'react-toastify';

import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';

import { useAppDispatch } from '../redux/app/hooks'
import { getDetails } from '../redux/slices/userSlice';
import { IconButton } from '@mui/material';


type Props = {}

type Inputs = {
  first_name: string
  last_name: string
  email: string
  profile_photo: string
  profile_description: string
}

const About = (props: Props) => {

  const dispatch = useAppDispatch()

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const first_name = localStorage.getItem('first_name')
  const last_name = localStorage.getItem('last_name')
  const profile_photo = localStorage.getItem('profile_photo')
  const profile_description = localStorage.getItem('profile_description')
  const email = localStorage.getItem('email')
  const is_chef = localStorage.getItem('is_chef')

  const [fileSelected, setFileSelected] = React.useState<File>()

  const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;

    if (!fileList) return;

    setFileSelected(fileList[0]);
  };

  const access = localStorage.getItem('access')

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = data => {
    const formData = new FormData()
    formData.append('first_name', data.first_name)
    formData.append('last_name', data.last_name)
    formData.append("email", data.email)
    formData.append("profile_description", data.profile_description)
    if (is_chef) {
      formData.append("is_chef", "true")
    } else {
      formData.append("is_chef", "false")
    }
    if (fileSelected) {
      formData.append("profile_photo", fileSelected, fileSelected.name);
    }

    console.log(formData)

    const tryGetDetails = async () => {
      try {
          const res = await fetch(`http://127.0.0.1:8000/auth/users/me/`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `JWT ${access}`
              },

          });

          if (res.status === 200) {
              const data = await res.json()
              dispatch(getDetails(data))
          } else {

          }
      } catch (err) {

      }
  }

    const tryUpdate = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/auth/users/me/`, {
          method: 'PUT',
          headers: {
            'Authorization': `JWT ${access}`,
          },
          body: formData
        });

        if (res.status === 200) {
          tryGetDetails()
          reset()
          setOpen(false)
        } else {
          toast.error('Something went wrong, make sure you inserted all fields properly', {
            position: toast.POSITION.TOP_CENTER
          });
          console.log(res)
        }
      } catch (err) {
        toast.error('Something went wrong, Please try again', {
          position: toast.POSITION.TOP_CENTER
        });
      }
    }
    tryUpdate()
  }


  return (
    <div className='flex mx-5 mt-5 px-5 py-5 space-x-10 items-center justify-evenly flex-col space-y-5 bg-white rounded-lg'>
      <div className='flex mx-5 mt-5 px-5 space-x-10 items-center justify-evenly flex-col md:flex-row space-y-5 md:space-y-1 bg-white rounded-lg'>
        <div>
          <Avatar
            sx={{ width: 94, height: 94 }}
            variant="square"
            alt={`${first_name}`}
            src={`${profile_photo}`}
          />

        </div>
        <div>
          <div className='space-x-2 flex flex-col'>
            <span className='font-bold text-lg'>
              Name:
            </span>
            <span>
              {first_name} {last_name}
            </span>
          </div>
          <div className='space-x-2 flex flex-col'>
            <span className='font-bold text-lg'>
              Email:
            </span>
            <span>
              {email}
            </span>
          </div>
          <div className='space-x-2 flex flex-col'>
            <span className='font-bold text-lg'>
              Profile Description:
            </span>
            <span>
              {profile_description}
            </span>
          </div>
        </div>
      </div>
      <div>
        <button onClick={handleClickOpen}>
          <div className="px-2 py-1 text-[#0891b2] hover:text[#0ea5e9] font-semibold rounded-lg bg-[#cbd5e1] uppercase hover:bg-[#94a3b8] hover:text-[#334155] transition flex space-x-1">
            <span className='block font-bold'>Edit Profile</span>
          </div>
        </button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit Profile</DialogTitle>



          <form className='flex flex-col space-y-3 justify-center color-text-black items-center pb-4 px-10' onSubmit={handleSubmit(onSubmit)}>

            <div className='flex flex-col space-y-1'>
              <label htmlFor='fileSelected' className='font-semibold'>Profile Photo:</label>
              <Avatar
                sx={{ width: 94, height: 94 }}
                alt={`${first_name}`}
                src={`${profile_photo}`}
              />
              <input
                type="file"
                accept="image/*"
                className="pt-1 cursor-pointer"
                name="fileSelected"
                onChange={handleImageChange}
              />
            </div>

            <div className='flex flex-col space-y-1'>
              <label htmlFor='email' className='font-semibold'>Email: <span className='text-xs'>(can't be changed)</span></label>
              <input
                type="email"
                className="text-[#061d32] border border-black form-input px-4 py-3 rounded-full w-80 peer invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                placeholder={`${email}`}
                value={`${email}`}
                {...register("email")}
              />
            </div>


            <div className='flex flex-col space-y-1'>
              <label htmlFor='first_name' className='font-semibold'>First Name:</label>
              <input
                type="text"
                className="text-[#061d32] border border-black form-input px-4 py-3 rounded-full w-80 peer invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                placeholder={`${first_name}`}
                {...register("first_name", { required: 'Please Enter your first name again.' })}
              />
            </div>
            <ErrorMessage
          errors={errors}
          name="first_name"
          render={({ message }) => <p className="text-red-600 text-sm ml-4">{message}</p>}
        />

            <div className='flex flex-col space-y-1'>
              <label htmlFor='last_name' className='font-semibold'>Last Name:</label>
              <input
                type="text"
                className="text-[#061d32] border border-black form-input px-4 py-3 rounded-full w-80 peer invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                placeholder={`${last_name}`}
                {...register("last_name", { required: 'Please Enter your last name again.' })}
              />
            </div>
            <ErrorMessage
          errors={errors}
          name="last_name"
          render={({ message }) => <p className="text-red-600 text-sm ml-4">{message}</p>}
        />

            <div className='flex flex-col space-y-1'>
              <label htmlFor='profile_description' className='font-semibold'>Profile Description:</label>
              <textarea
                className="text-[#061d32] border border-black form-input px-4 py-3 rounded-full w-80 peer invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 overflow-hidden"
                placeholder={`${profile_description}`}
                {...register("profile_description", { required: 'Please re-type your profile description again.' })}
              />
            </div>
            <ErrorMessage
          errors={errors}
          name="profile_description"
          render={({ message }) => <p className="text-red-600 text-sm ml-4">{message}</p>}
        />
                    



            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-full uppercase text-lg cursor-pointer active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 w-80 mt-2"
            >
              Update
            </button>


          </form>




        </Dialog>
      </div>
    </div>

  )
}

export default About