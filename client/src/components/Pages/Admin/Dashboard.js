import StatusCard from "../../Admin/StatusCard";
import ChartLine from "../../Admin/ChartLine";
// import ChartBar from "../../Admin/ChartBar";
// import PageVisitsCard from "../../Admin/PageVisitsCard";
// import TrafficCard from "../../Admin/TrafficCard";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { AiOutlinePullRequest } from "react-icons/ai";
import { AiOutlineSwap } from "react-icons/ai";
import { RiUserSharedLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { getUsers } from "../../../actions/users";
import { getPosts } from "../../../actions/posts";
import { getAllSwapRequests } from "../../../actions/swap";

export default function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSwapRequests());
    dispatch(getUsers());
    dispatch(getPosts());
  }, [dispatch]);

  const users = useSelector((state) => state.users);
  const posts = useSelector((state) => state.posts);
  const allRequests = useSelector((state) => state.allRequests);
  console.log(allRequests, "allreq");

  const exchanged = [];
  if (posts) {
    posts.map((post) => {
      if (post.exchanged === true) {
        exchanged.push(post);
      }
    });
  }

  return (
    <>
      {/* <div className="bg-light-blue-500 px-3 md:px-8 h-40" /> */}

      <div className="px-3 py-8 bg-slate-700 md:px-8">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 ">
            <StatusCard
              color="pink"
              MainIcon={AiOutlineUsergroupAdd}
              title=" Users"
              amount={users?.length}
              percentage="3.48"
              percentageIcon="arrow_upward"
              percentageColor="green"
              date="Since last month"
            />
            <StatusCard
              MainIcon={RiUserSharedLine}
              color="orange"
              title="Ads"
              amount={posts?.length}
              percentage="3.48"
              percentageIcon="arrow_downward"
              percentageColor="red"
              date="Since last week"
            />
            <StatusCard
              MainIcon={AiOutlinePullRequest}
              color="purple"
              title="Requests"
              amount={allRequests?.length}
              percentage="1.10"
              percentageIcon="arrow_downward"
              percentageColor="orange"
              date="Since yesterday"
            />
            <StatusCard
              MainIcon={AiOutlineSwap}
              color="blue"
              title="Exchanged"
              amount={exchanged?.length}
              percentage="12"
              percentageIcon="arrow_upward"
              percentageColor="green"
              date="Since last month"
            />
          </div>
        </div>
      </div>

      <div className="px-3 md:px-8 bg-slate-700 ">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 xl:grid-cols-5">
            <div className="xl:col-start-1 xl:col-end-4 px-4 ">
              <ChartLine />
            </div>
            {/* <div className="xl:col-start-4 xl:col-end-6 px-4 mb-14">
              <ChartBar />
            </div> */}
          </div>
        </div>
      </div>

      {/* <div className="px-3 md:px-8 h-auto">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 xl:grid-cols-5">
            <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14">
              <PageVisitsCard />
            </div>
            <div className="xl:col-start-4 xl:col-end-6 px-4 mb-14">
              <TrafficCard />
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
