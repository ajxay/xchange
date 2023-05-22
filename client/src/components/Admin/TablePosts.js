import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
// import Image from "@material-tailwind/react/Image";
// import Progress from "@material-tailwind/react/Progress";
import { Switch } from "@headlessui/react";
import { useState } from "react";
import team1 from "../../assets/img/team-1-800x800.jpg";
import { useDispatch } from "react-redux";
import { disablePost } from "../../actions/posts";
export default function TablePosts({ posts }) {
  const [enabled, setEnabled] = useState(false);

  const dispatch = useDispatch();
  const handleDeactivate = (id) => {
    console.log(id, "handle");
    setEnabled(!enabled);
    dispatch(disablePost(id));
  };
  return (
    <Card>
      <CardHeader color="yellow" contentPosition="left">
        <h2 className="text-slate-600 text-2xl">Users</h2>
      </CardHeader>
      <CardBody>
        <div className="overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  Book
                </th>
                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  Creator
                </th>
                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  Book Status
                </th>
                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  Spam Reports
                </th>
                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  Disable Post
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => {
                return (
                  <>
                    <tr>
                      <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                        <div className="flex">
                          <div className="w-10 h-10 rounded border-2 border-white">
                            <img
                              className="rounded-sm"
                              src={
                                post?.selectedFile ? post.selectedFile : team1
                              }
                              rounded
                              alt="..."
                            />
                          </div>
                          <p className="my-2 uppercase mx-4">{post.title}</p>
                        </div>
                      </th>
                      <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                        <div className="w-10 h-10 rounded border-2 border-white">
                          <img
                            className="rounded-sm"
                            src={post?.creatorImage ? post.creatorImage : team1}
                            rounded
                            alt="..."
                          />
                        </div>
                      </th>
                      <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                        <i className="fas fa-circle fa-sm text-orange-500 mr-2"></i>{" "}
                        {post.exchanged === true ? "Xchanged" : "Available"}
                      </th>
                      <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                        {post?.spamReports?.length}
                      </th>
                      <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                        <Switch
                          checked={post.removed}
                          onChange={() => handleDeactivate(post._id)}
                          className={`${
                            post.removed ? "bg-green-400" : "bg-red-200"
                          } relative inline-flex h-6 w-11 items-center rounded-full`}
                        >
                          <span
                            className={`${
                              post.removed ? "translate-x-6" : "translate-x-1"
                            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                          />
                        </Switch>
                      </th>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
}
