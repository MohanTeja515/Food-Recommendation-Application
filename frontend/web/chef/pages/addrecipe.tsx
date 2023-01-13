import * as React from 'react';
import Head from 'next/head';

import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';

import { toast } from 'react-toastify';

import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Dialog from '@mui/material/Dialog';

type Props = {}

enum FoodEnum {
    VEGETARIAN = 'Vegetarian',
    NON_VEGETARIAN = 'Non Vegetarian'
}

enum CuisineEnum {
    CHINESE = 'Chinese',
    INDIAN = 'Indian',
    MEXICAN = 'Mexican',
    OTHER = 'Other'
}

enum MealEnum {
    BREAKFAST = 'BREAKFAST',
    LUNCH = 'LUNCH',
    DINNER = 'DINNER',
    SNACK = 'SNACK',
    DRINK = 'DRINK'
}


type Inputs = {
    recipe_title: string
    recipe_slug: string
    food_type: FoodEnum
    cuisine_type: CuisineEnum
    is_published: boolean
    prep_time: number
    recipe_description: string
    meal_type: MealEnum
    // recipe_main_photo?: File
    recipe_photo1: string
    recipe_photo2: string
    recipe_photo3: string
    recipe_rating: number
    recipe_numReviews: number
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AddRecipe = (props: Props) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const access = localStorage.getItem('access')

    const [fileSelected, setFileSelected] = React.useState<File>() 
    const [fileSelected1, setFileSelected1] = React.useState<File>()
    const [fileSelected2, setFileSelected2] = React.useState<File>()
    const [fileSelected3, setFileSelected3] = React.useState<File>()

    const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
        const fileList = e.target.files;

        if (!fileList) return;

        setFileSelected(fileList[0]);
    };

    const handleImageChange1 = function (e: React.ChangeEvent<HTMLInputElement>) {
        const fileList = e.target.files;

        if (!fileList) return;

        setFileSelected1(fileList[0]);
    };

    const handleImageChange2 = function (e: React.ChangeEvent<HTMLInputElement>) {
        const fileList = e.target.files;

        if (!fileList) return;

        setFileSelected2(fileList[0]);
    };

    const handleImageChange3 = function (e: React.ChangeEvent<HTMLInputElement>) {
        const fileList = e.target.files;

        if (!fileList) return;

        setFileSelected3(fileList[0]);
    };

    const uploadFile = function (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        if (fileSelected) {
            const formData = new FormData();
            formData.append("recipe_main_photo", fileSelected, fileSelected.name);
        }
    };

    const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => {
        var slugify = require('slugify')
        const recipe_slug = slugify(data['recipe_title'])
        data['recipe_slug'] = recipe_slug.toLowerCase()
        data['recipe_rating'] = 0
        data['recipe_numReviews'] = 0
        const body = JSON.stringify(data)

        const formData = new FormData()
        formData.append('recipe_title', data.recipe_title)
        formData.append('recipe_slug', recipe_slug)
        formData.append("food_type", data.food_type)
        formData.append("cuisine_type", data.cuisine_type)
        formData.append("recipe_rating", JSON.stringify(data.recipe_rating))
        formData.append("is_published", JSON.stringify(data.is_published))
        formData.append("recipe_numReviews", JSON.stringify(data.recipe_numReviews))
        formData.append("prep_time", JSON.stringify(data.prep_time))
        formData.append("recipe_description", data.recipe_description)
        formData.append("meal_type", "SNACK")
        if (fileSelected) {
            formData.append("recipe_main_photo", fileSelected, fileSelected.name);
        }
        if (fileSelected1) {
            formData.append("recipe_photo1", fileSelected1, fileSelected1.name);
        }
        if (fileSelected2) {
            formData.append("recipe_photo2", fileSelected2, fileSelected2.name);
        }
        if (fileSelected3) {
            formData.append("recipe_photo3", fileSelected3, fileSelected3.name);
        }
        console.log(Array.from(formData.entries()))

        const tryAddingRecipe = async () => {
            try {
                const res = await fetch(`http://127.0.0.1:8000/recipe/manage-recipe/`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `JWT ${access}`,
                        // 'Content-Type': 'multipart/form-data'
                    },
                    body: formData
                });

                if (res.status === 201) {
                    toast.success('Your recipe is added successfully in Foodies website, now anyone can buy your recipe', {
                        position: toast.POSITION.TOP_CENTER
                    });
                    reset()
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

        tryAddingRecipe()
    }


    
    const descriptionElementRef = React.useRef<HTMLElement>(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <div>
            <Head>
                <title>Foodies | Add Recipe</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <button onClick={handleClickOpen}>
                <div className="px-2 py-1 text-[#0ea5e9] hover:text[#0ea5e9] font-semibold rounded-lg bg-[#f1f5f9] uppercase hover:bg-white hover:text-[#334155] transition flex space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <span className='hidden md:block'>Add Recipe</span>
                </div>
            </button>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <div className='relative bg-[#ccfbf1]'>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Add Recipe
                        </Typography>
                    </Toolbar>
                </div>

                <form className='flex flex-col space-y-3 justify-center color-text-black mt-5 items-center' onSubmit={handleSubmit(onSubmit)}>
                    <h2 className='uppercase flex justify-center text-lg font-extrabold text-[#061d32]'>Add Recipe</h2>
                    <input
                        type="text"
                        className="text-[#061d32] border border-black form-input px-4 py-3 rounded-full w-80 peer invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                        placeholder='Recipe Title...'
                        {...register("recipe_title", { required: 'Please enter title of the recipe' })}
                    />
                    <ErrorMessage
                        errors={errors}
                        name="recipe_title"
                        render={({ message }) => <p className="text-red-600 text-sm ml-4">{message}</p>}
                    />

                    <select
                        className="text-[#061d32] border border-black form-input px-5 py-3 rounded-full w-80 peer invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                        placeholder='Food Type...'
                        {...register("food_type", { required: 'Please Select food type.' })}
                    >
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Non Vegetarian">Non Vegetarian</option>
                    </select>
                    <ErrorMessage
                        errors={errors}
                        name="food_type"
                        render={({ message }) => <p className="text-red-600 text-sm ml-4">{message}</p>}
                    />

                    <select
                        className="text-[#061d32] border border-black form-input px-5 py-3 rounded-full w-80 peer invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                        placeholder='Cuisine Type...'
                        {...register("cuisine_type", { required: 'cuisine_type is required.' })}
                    >
                        <option value="Chinese">Chinese</option>
                        <option value="Indian">Indian</option>
                        <option value="Mexican">Mexican</option>
                        <option value="other">other</option>
                    </select>
                    <ErrorMessage
                        errors={errors}
                        name="cuisine_type"
                        render={({ message }) => <p className="text-red-600 text-sm ml-4">{message}</p>}
                    />

                    <select
                        className="text-[#061d32] border border-black form-input py-3 rounded-full w-80 peer invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 px-5"
                        placeholder='Meal Type...'
                        {...register("meal_type", { required: 'meal_type is required.' })}
                    >
                        <option value="BREAKFAST">BREAKFAST</option>
                        <option value="LUNCH">LUNCH</option>
                        <option value="DINNER">DINNER</option>
                        <option value="SNACK">SNACK</option>
                        <option value="DRINK">DRINK</option>
                    </select>
                    <ErrorMessage
                        errors={errors}
                        name="meal_type"
                        render={({ message }) => <p className="text-red-600 text-sm ml-4">{message}</p>}
                    />

                    <input
                        type="number"
                        className="text-[#061d32] border border-black form-input px-4 py-3 rounded-full w-80 peer invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                        placeholder='Prep Time...'
                        {...register("prep_time", { required: 'Please enter Preparation time of the recipe' })}
                    />
                    <ErrorMessage
                        errors={errors}
                        name="prep_time"
                        render={({ message }) => <p className="text-red-600 text-sm ml-4">{message}</p>}
                    />

                    <textarea
                        className="text-[#061d32] border border-black form-input px-4 py-3 rounded-full w-80 peer invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                        placeholder='Recipe Description...'
                        {...register("recipe_description", { required: 'Please enter description of the recipe' })}
                    />
                    <ErrorMessage
                        errors={errors}
                        name="recipe_description"
                        render={({ message }) => <p className="text-red-600 text-sm ml-4">{message}</p>}
                    />

                    <div className='flex flex-col'>
                        <label>Recipe Main Photo:</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="text-[#061d32] border border-black form-input px-4 py-3 rounded-full w-80 peer invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                            placeholder='Recipe Main Photo...'
                            name="fileSelected"
                            onChange={handleImageChange}
                        />
                    </div>


                    <div className='flex flex-col'>
                        <label>Recipe Photo 1:</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="text-[#061d32] border border-black form-input px-4 py-3 rounded-full w-80 peer invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                            placeholder='Recipe Photo 1...'
                            name="fileSelected1"
                            onChange={handleImageChange1}
                            // {...register("recipe_photo1", { required: 'Please enter photo 1 of the recipe' })}
                        />
                    </div>

                    <div className='flex flex-col'>
                        <label>Recipe Photo 2:</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="text-[#061d32] border border-black form-input px-4 py-3 rounded-full w-80 peer invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                            placeholder='Recipe Photo 2...'
                            name="fileSelected2"
                            onChange={handleImageChange2}
                            // {...register("recipe_photo2", { required: 'Please enter photo 2 of the recipe' })}
                        />
                    </div>

                    <div className='flex flex-col'>
                        <label>Recipe Photo 3:</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="text-[#061d32] border border-black form-input px-4 py-3 rounded-full w-80 peer invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                            placeholder='Recipe Photo 3...'
                            name="fileSelected3"
                            onChange={handleImageChange3}    
                            // {...register("recipe_photo3", { required: 'Please enter photo 3 of the recipe' })}
                        />
                    </div>

                    <div>
                        <input type="checkbox" className="
                                rounded text-green-500 shadow-sm
                                focus:border-green-300
                                focus:ring
                                focus:ring-offset-0
                                focus:ring-green-200
                                focus:ring-opacity-50 cursor-pointer"
                            {...register("is_published")}
                        />
                        <label htmlFor='remember' className='ml-2 text-green-700'>Do you like to publish</label>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-full uppercase text-lg cursor-pointer active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 w-80"
                    >
                        Add Recipe
                    </button>
                </form>
            </Dialog>
        </div>
    )
}

export default AddRecipe