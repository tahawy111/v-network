import { IPost } from '@/types/typescript';
import moment from 'moment';
import Link from 'next/link';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { onEdit } from '@/redux/features/post';
import { setStatusModalShow } from '@/redux/features/global';

interface CardHeaderProps {
    post: IPost;
}

export default function CardHeader({ post }: CardHeaderProps) {
    const { auth } = useSelector((state: RootState) => state);
    const dispatch: AppDispatch = useDispatch();
    const handleEditPost = () => {
        console.log(post);
        dispatch(onEdit({ post, onEdit: true }));
        dispatch(setStatusModalShow(true));
    };
    return <div className='flex justify-between items-center cursor-pointer py-4 px-6'>
        <div className="flex items-center gap-2">
            <img src={ post.user.avatar.url } alt="" className="w-16 h-16 rounded-full" />
            <div className="">
                <h6 className='text-xl m-0'>
                    <Link href={ `/profile/${post.user._id}` }>{ post.user.username }</Link>
                </h6>
                <small className='text-muted'>{ moment(post.createdAt).fromNow() }</small>
            </div>
        </div>

        <div className="">
            <DropdownMenu.Root>
                <DropdownMenu.Trigger className="group" asChild>
                    <div className="flex items-center md:ml-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>

                    </div>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                    <DropdownMenu.Content
                        className="border border-gray-300 dark:text-black bg-white rounded-sm p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                        sideOffset={ -5 }
                    >
                        {
                            auth.user?._id === post.user._id &&
                            (
                                <>
                                    <DropdownMenu.Item onClick={ handleEditPost } className="my-1 group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center px-[5px] relative select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 hover:bg-neutral-600 hover:text-white">
                                        <div className="flex gap-x-2 items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                            <span>Edit Post</span>
                                        </div>
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item className="my-1 group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center px-[5px] relative select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 hover:bg-neutral-600 hover:text-white">
                                        <div className="flex gap-x-2 items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>

                                            <span>Remove Post</span>
                                        </div>
                                    </DropdownMenu.Item>
                                </>
                            )
                        }
                        <DropdownMenu.Item className="my-1 group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center px-[5px] relative select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 hover:bg-neutral-600 hover:text-white">
                            <div className="flex gap-x-2 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
                                </svg>

                                <span>Copy Link</span>
                            </div>
                        </DropdownMenu.Item>

                        <DropdownMenu.Arrow className="fill-white" />
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        </div>
    </div>;
}
