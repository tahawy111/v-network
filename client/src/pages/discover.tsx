import CardBody from "@/components/Home/CardBody";
import CardFooter from "@/components/Home/CardFooter";
import CardHeader from "@/components/Home/CardHeader";
import StatusModal from "@/components/Home/StatusModal";
import Layout from "@/components/Layout/Layout";
import { getDiscoverPosts, increasePage } from "@/redux/features/post";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

interface discoverProps {

}

export default function Discover({ }: discoverProps) {
  const { post, global, auth } = useSelector((state: RootState) => state);
  const dispatch: AppDispatch = useDispatch();
  const [btnHide, setBtnHide] = useState<boolean>(false);
  useEffect(() => {


    dispatch(getDiscoverPosts({ access_token: auth.access_token as string, page: 1 }));


  }, []);
  const loadMoreHandler = () => {
    if (post.postsLength === post.posts.length) {
      setBtnHide(true);
      console.log("btn Hide: ", btnHide);

    }
    dispatch(getDiscoverPosts({ access_token: auth.access_token as string, page: post.page + 1 }));
    dispatch(increasePage(1));
  };
  return <Layout>
    <div className="flex flex-col items-center">

      { post.discoverPosts && post.discoverPosts.map((post, index) => (
        <div className="w-full shadow-sm rounded-sm border border-gray-300 dark:border-gray-300/30 my-3" key={ index }>
          <CardHeader inDiscover post={ post } />
          <CardBody post={ post } />
          <CardFooter post={ post } />
        </div>
      )) }
      { global.status.statusModalShow && <StatusModal isInHomePage={ false } isInProfilePage /> }



      { <button onClick={ loadMoreHandler } className={ `btn btn-red my-3 w-fit ${btnHide && "hidden"}` }>{ post.isLoading ? <ClipLoader size={ 15 } color='white' /> : "Load More..." }</button> }

    </div>
  </Layout>;
}
