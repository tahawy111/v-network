import { setStatusModalShow } from '@/features/global/global';
import { AppDispatch, RootState } from '@/features/store';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface StatusModalProps {

}

export default function StatusModal({ }: StatusModalProps) {
    const dispatch: AppDispatch = useDispatch();
    const { auth } = useSelector((state: RootState) => state);
    const [content, setContent] = useState<string>("");

    return <div className=''>
        <form className="">
            <div className="">
                <h5 className='m-0'>Create Post</h5>
                <span className="cursor-pointer" onClick={ () => dispatch(setStatusModalShow(false)) }>&times;</span>
            </div>


            <div className="">
                <textarea name="content" value={ content } onChange={ (e) => setContent(e.target.value) } placeholder={ `${auth.user?.username}, What are you thinking?` } />

                <div className="">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                    </svg>


                    <div className="">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>


                        <input type="file" name='file' id='file' multiple accept='image/*' />


                    </div>
                </div>
            </div>
        </form>
    </div>;
}