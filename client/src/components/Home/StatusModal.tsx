import { setStatusModalShow } from '@/features/global/global';
import { AppDispatch, RootState } from '@/features/store';
import { useId, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface StatusModalProps {

}

export default function StatusModal({ }: StatusModalProps) {
    const dispatch: AppDispatch = useDispatch();
    const { auth } = useSelector((state: RootState) => state);
    const [content, setContent] = useState<string>("");
    const fileId = useId()

    return <div className='fixed top-0 left-0 bg-black/50 w-full h-screen overflow-auto'>
        <form className="max-w-md w-full bg-white flex flex-col gap-y-2 mx-auto my-8 p-5 rounded-md">
            <div className="flex justify-between items-center border-b border-gray-200 mb-2 py-3">
                <h5 className='m-0'>Create Post</h5>
                <span className="cursor-pointer text-3xl font-black -translate-y-1" onClick={ () => dispatch(setStatusModalShow(false)) }>&times;</span>
            </div>


            <div className="">
                <textarea rows={ 5 } className='outline-none border-none resize-none' name="content" value={ content } onChange={ (e) => setContent(e.target.value) } placeholder={ `${auth.user?.username}, What are you thinking?` } />
                <div className="flex relative justify-center items-center">

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className="w-8 h-8 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                    </svg>

                    <div className="flex items-center overflow-hidden mx-2 relative">
                        <label htmlFor={fileId}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className="w-8 h-8 cursor-pointer">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                        </label>


                        <input className='hidden' type="file" name='file' id={fileId} multiple accept='image/*' />


                    </div>
                </div>
            </div>

            <div className="">
                <div className="btn-dark text-center">Post</div>
            </div>
        </form>
    </div>;
}