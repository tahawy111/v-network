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
                <span className="" onClick={ () => dispatch(setStatusModalShow(false)) }>&times;</span>
            </div>


            <div className="">
                <textarea name="content" value={ content } onChange={ (e) => setContent(e.target.value) } placeholder={ `${auth.user?.username}, What are you thinking?` } />
            </div>
        </form>
    </div>;
}