import { AppDispatch, RootState } from '@/redux/store';
import { setStatusModalShow, startLoading, stopLoading } from '@/redux/features/global';
import { ChangeEvent, useId, useRef, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { IFormProps } from '@/types/typescript';
import { imageUpload } from '@/lib/imageUpload';
import axios from 'axios';
import { getError } from '@/lib/getError';
import { getPosts, onEdit } from '@/redux/features/post';

interface StatusModalProps {

}

export default function StatusModal({ }: StatusModalProps) {
    type imgType = (File | { camera: string; } | { public_id: string; url: string; });
    const dispatch: AppDispatch = useDispatch();
    const { auth, post } = useSelector((state: RootState) => state);
    const [content, setContent] = useState<string>("");
    const [images, setImages] = useState<imgType[]>([]);
    const [stream, setStream] = useState<boolean>(false);
    const [tracks, setTracks] = useState<MediaStreamTrack>();
    const fileId = useId();
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const handleChangeImages = (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files!);
        let err = "";
        let newImages: File[] = [];

        files.forEach(file => {
            if (!file) return err = "File does not exist.";

            if (file.size > 1024 * 1024 * 5) {
                return err = "The image/video largest is 5mb.";
            }

            return newImages.push(file);
        });

        if (err) toast.error(err);
        setImages(prev => [...prev, ...newImages]);
    };
    const deleteImage = (index: number) => {
        const editedImages = [...images];
        editedImages.splice(index, 1);
        setImages(editedImages);
    };
    const handleStream = () => {
        setStream(true);
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then((mediaStream) => {

                    if (videoRef.current) videoRef.current.srcObject = mediaStream;
                    videoRef.current?.play();
                    const track = mediaStream.getTracks();
                    setTracks(track[0]);
                }).catch(err => toast.error(err));
        }
    };
    const handleCapture = () => {
        if (!videoRef.current || !canvasRef.current) return;
        const width = videoRef.current.clientWidth;
        const height = videoRef.current.clientHeight;
        canvasRef.current?.setAttribute("height", `${height}`);
        canvasRef.current?.setAttribute("width", `${width}`);
        const ctx = canvasRef.current.getContext(`2d`);
        if (!ctx) return;
        ctx.drawImage(videoRef.current, 0, 0, width, height);
        let URL = canvasRef.current.toDataURL();
        setImages(prev => [...prev, { camera: URL }]);
    };
    const submitHandler = async (e: IFormProps) => {
        e.preventDefault();
        if (images.length < 1) return toast.error("Please add your photo.");
        dispatch(startLoading());
        try {
            const media = await imageUpload(images as any);
            const { data } = await axios.post(`${process.env.API}/api/post`, { content, images: media }, { headers: { Authorization: auth.access_token } });
            toast.success(data.msg);
            dispatch(stopLoading());
            dispatch(setStatusModalShow(false));
            auth.access_token && dispatch(getPosts(auth.access_token));
        } catch (error) {
            dispatch(stopLoading());
            toast.error(getError(error));
        }
    };

    useEffect(() => {
        if (post.onEdit && post.postToEdit) {
            setContent(post.postToEdit?.content);
            setImages(post.postToEdit.images);
        }
    }, []);


    const updateHandler = async (e: IFormProps) => {
        e.preventDefault();
        try {
            const imagesNotToUpload = images.filter((img: any) => img.url);
            const imagesToUpload = images.filter((img: any) => !img.url);
            dispatch(startLoading());
            const media = await imageUpload(imagesToUpload as File[]);
            await axios.put(`${process.env.API}/api/post/${post.postToEdit?._id}`, { content, images: [...imagesNotToUpload, ...media as imgType[]] }, { headers: { Authorization: auth.access_token } });
            auth.access_token && dispatch(getPosts(auth.access_token));
            dispatch(onEdit({ post: null, onEdit: false }));
            dispatch(setStatusModalShow(false));
            dispatch(stopLoading());
        } catch (error) {

        }

    };

    return <div className='fixed top-0 left-0 bg-black/50 w-full h-screen overflow-auto z-[9]'>
        <form onSubmit={ post.onEdit && post.postToEdit ? updateHandler : submitHandler } className="max-w-md w-full bg-white dark:bg-main flex flex-col gap-y-2 mx-auto my-8 p-5 rounded-md">
            <div className="flex justify-between items-center border-b border-gray-200 mb-2 py-3">
                <h5 className='m-0'>Create Post</h5>
                <span className="cursor-pointer text-3xl font-black -translate-y-1" onClick={ () => dispatch(setStatusModalShow(false)) }>&times;</span>
            </div>


            <div className="">
                <textarea rows={ 5 } className='outline-none border-none resize-none' name="content" value={ content } onChange={ (e) => setContent(e.target.value) } placeholder={ `${auth.user?.username}, What are you thinking?` } />

                {
                    stream && (
                        <div className='relative'>
                            <video src="" autoPlay muted ref={ videoRef } className='w-full h-full' />

                            {/* ------ Start Close Btn -------- */ }
                            <div onClick={ () => setStream(false) } className="cursor-pointer absolute top-1 right-1 bg-main/30 rounded-full p-2 text-4xl w-10 h-10 font-bold flex justify-center items-center">
                                <i className='absolute -translate-y-[3.5px]'>&times;</i>
                            </div>
                            {/* ------ End Close Btn -------- */ }

                            <canvas className={ `hidden` } ref={ canvasRef } />
                        </div>
                    )
                }

                <div className={`max-h-64 w-full overflow-y-auto grid  gap-3 place-items-center grid-cols-3`}>
                    {
                        images.map((img, index) => (
                            <div className='w-full h-full relative' key={ index }>
                                <img src={ img instanceof File ? URL.createObjectURL(img) : (img as any).camera ? (img as any).camera : (img as any).url } alt="images" className='w-full h-full block object-contain border-gray-200 border p-1 rounded-md' />
                                <span onClick={ () => deleteImage(index) } className='cursor-pointer text-xl font-bold absolute top-1 right-1 bg-white border border-red-500 text-red-500 rounded-full px-2 py-0.5 transition-colors duration-150 hover:bg-red-500 hover:text-white hover:border-white pt-0 ease-out'>&times;</span>
                            </div>
                        ))
                    }
                </div>



                <div className="flex relative justify-center items-center">
                    {
                        stream
                            ? <svg onClick={ handleCapture } xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className="w-8 h-8 cursor-pointer">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                            </svg>
                            : <>
                                <svg onClick={ handleStream } xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className="w-8 h-8 cursor-pointer">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                                </svg>
                            </>
                    }

                    <div className="flex items-center overflow-hidden mx-2 relative">
                        <label htmlFor={ fileId }>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className="w-8 h-8 cursor-pointer text-black dark:text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                        </label>

                        <input className='hidden' type="file" name='file' id={ fileId } multiple accept='image/*' onChange={ handleChangeImages } />

                    </div>

                </div>
            </div>

            <button className="btn-dark text-center">{ post.onEdit && post.postToEdit ? "Update" : "Post" }</button>
        </form>
    </div>;
}