import { Dispatch } from "@reduxjs/toolkit";
import { IUser, InputChange } from "../../types/typescript";
import { SetStateAction, useId, useState } from "react";
import Input from "../Custom-Ui/Input";
import getThis from "@/lib/getThis";
import { checkImage } from "@/lib/imageUpload";
import { toast } from "react-hot-toast";




interface EditProfileProps {
    user: IUser;
    setOnEdit: (param: boolean) => void;
}

export default function EditProfile({ user, setOnEdit }: EditProfileProps) {
    const initState = { fullname: "", username: "", email: "", password: "", role: "", gender: "", mobile: "", address: "", story: "", website: "", followers: "", following: "", saved: "", };

    const [userData, setUserData] = useState(initState);
    const [avatar, setAvatar] = useState<any>();

    const handleInputChange = ({ target }: InputChange) => {
        setUserData((v: any) => ({ ...v, [target.name]: target.validity.valid ? target.value : v[target.name] }));
    };
    const avatarId = useId();
    const imgChange = (e: InputChange) => {
        
        const target = e.target as HTMLInputElement;
        console.log(target.files);
        const err = target.files && checkImage(target.files[0])
        if(err) return toast.error(err)
        target.files && setAvatar({ preview: URL.createObjectURL(target.files[0]) });
    };


    return <div className="w-full fixed top-0 left-0 h-screen bg-[#0008] overflow-auto">


        <button className="btn-red absolute top-5 right-5" onClick={ () => setOnEdit(false) }>Close</button>

        <div className="max-w-md w-full bg-white p-5 rounded-md mx-auto my-5">
            <form>
                <div className="w-36 h-36 overflow-hidden rounded-full relative mx-auto my-4 border border-gray-100 cursor-pointer group">
                    <img className="w-full h-full block object-cover" src={ avatar ? avatar.preview : user.avatar } alt="" />
                    <label htmlFor={ avatarId } className="absolute -bottom-full left-0 w-full h-1/2 text-center text-orange-400 transition-all duration-300 ease-in-out group group-hover:-bottom-[15%] bg-[#fff5]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className="inline w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                        </svg>
                        <p>Change</p>
                        <input className="hidden" type="file" name="file" id={ avatarId }
                            accept="image/*" onChange={ imgChange } />
                    </label>
                </div>

                <div className="">
                    <Input name="fullname" placeholder="Full Name" pattern="^.{0,25}$" /* matches 25 chars only */ value={ userData.fullname } onChange={ handleInputChange } footer={ `${userData.fullname.length}/25` } />
                    <Input name="mobile" placeholder="Mobile" value={ userData.mobile } onChange={ handleInputChange } />
                    <Input name="address" placeholder="Address" value={ userData.address } onChange={ handleInputChange } />
                    <Input name="website" placeholder="Website" value={ userData.website } onChange={ handleInputChange } />
                    <Input name="story" placeholder="Story" value={ userData.story } onChange={ handleInputChange } />

                    <div className="">
                        <label htmlFor={ "storyId" }>Story</label>
                        <textarea cols={ 30 } rows={ 4 } className="" name="story" id="storyId" value={ userData.story } onChange={ handleInputChange }></textarea>
                        <small className="text-red-500">{ userData.story.length }/25</small>
                    </div>

                    <div className='flex justify-between my-1'>


                        <Input value={ "male" } onChange={ handleInputChange } name='gender' placeholder='Male' type='radio' />
                        <Input value={ "female" } onChange={ handleInputChange } name='gender' placeholder='Female' type='radio' />

                    </div>

                    <button className="btn-primary w-full">Save</button>

                </div>

            </form>
        </div>



    </div>;
}
