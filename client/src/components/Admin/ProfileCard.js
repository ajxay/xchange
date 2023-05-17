import Card from "@material-tailwind/react/Card";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import Image from "@material-tailwind/react/Image";
import H5 from "@material-tailwind/react/Heading5";
import LeadText from "@material-tailwind/react/LeadText";
import Button from "@material-tailwind/react/Button";
import { useState, useEffect } from "react";
import Collection from "../Collections/Collections";
import { AiOutlineEdit } from "react-icons/ai";
import EditProfile from "./EditProfile";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../api";
// import { updateUser } from "../../actions/users";

export default function ProfileCard() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showVerify, setShowVerify] = useState(false);

  const [userData, setUserData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
    location: {
      type: "Point",
      coordinates: [],
    },
    summary: "",
  });

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("profile")).result
  );
  useEffect(() => {
    if (user) setUserData(user);
  }, [user]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // dispatch(updateUser(user._id, userData));

    console.log(userData, "userData");
    const { data } = await updateUser(user._id, userData);
    console.log(data, "updatedData");
    if (data) {
      setUser(data);
    }
    setShowModal(false);
  };

  return (
    <Card>
      <div className="flex xs:flex-col sm:flex-row divide-x h-screen">
        <div className="lg:w-1/4 sm:w-full">
          <div className="flex flex-wrap justify-center ">
            <div className="w-48 px-4 mt-10">
              <Image src={user?.picture} rounded raised />
            </div>
            <div className="w-full flex justify-center ">
              <div className=" text-center relative left-36 -top-40">
                <button onClick={() => setShowModal(true)}>
                  <span className="text-2xl text-blue-500 font-medium block uppercase tracking-wide ">
                    <AiOutlineEdit />
                  </span>
                </button>
                {showModal ? (
                  <>
                    <form
                      className="md:w-3/5"
                      autoComplete="off"
                      noValidate
                      onSubmit={handleSubmit}
                    >
                      <div
                        className={`
                             backdrop-filter backdrop-blur-lg transition duration-500 ease-out justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none`}
                      >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                          {/*content*/}
                          <div className="border-0 py-5 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between px-5 border-b border-solid border-slate-200 rounded-t">
                              <p className=" text-slate-900 text-3xl  font-semibold py-2">
                                Edit Profile
                              </p>
                              <button
                                type="button"
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setShowModal(false)}
                              >
                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                  ×
                                </span>
                              </button>
                            </div>
                            {/*body*/}

                            <div className="relative px-6 flex-auto">
                              <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                <section className="text-gray-600 body-font">
                                  <div className="container relative bg-slate-900 rounded px-5 py-5 mx-auto">
                                    <div className="mb-6">
                                      <input
                                        name="title"
                                        variant="outlined"
                                        label="Title"
                                        value={userData.name}
                                        onChange={(e) =>
                                          setUserData({
                                            ...userData,
                                            name: e.target.value,
                                          })
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Title"
                                        required
                                      />
                                    </div>
                                    <div className="mb-6">
                                      <input
                                        name="tags"
                                        variant="outlined"
                                        label="Tags"
                                        value={userData.email}
                                        onChange={(e) =>
                                          setUserData({
                                            ...userData,
                                            email: e.target.value,
                                          })
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Tags"
                                        required
                                      />
                                    </div>

                                    <div className="mb-1">
                                      <textarea
                                        rows="4"
                                        name="message"
                                        variant="outlined"
                                        label="Message"
                                        value={userData.bio}
                                        onChange={(e) =>
                                          setUserData({
                                            ...userData,
                                            bio: e.target.value,
                                          })
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Summary"
                                        required
                                      />
                                    </div>

                                    <FileBase
                                      type="file"
                                      multiple={false}
                                      onDone={({ base64 }) =>
                                        setUserData({
                                          ...userData,
                                          picture: base64,
                                        })
                                      }
                                    />
                                  </div>
                                </section>
                              </p>
                            </div>

                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                              <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowModal(false)}
                              >
                                Close
                              </button>
                              <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="submit"
                              >
                                Save Changes
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>

                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
          <div className="text-center">
            <H5 color="gray">{user.name}</H5>
            <div className="mt-0 mb-2 text-gray-700 flex items-center justify-center gap-2">
              {/* <Icon name="place" size="xl" /> */}
              {user.username}
            </div>
            <div className="mb-2 text-gray-700 mt-10 flex items-center justify-center gap-2">
              {/* <Icon name="work" size="xl" /> */}
              {user.email}
            </div>
            {/* <div className="mb-2 text-gray-700 flex items-center justify-center gap-2"> */}
            {/* <Icon name="account_balance" size="xl" /> */}

            {/* University of Computer Science */}
            {/* </div> */}
          </div>
          <CardBody>
            <div className="border-t border-lightBlue-200 text-center px-2 ">
              <LeadText color="blueGray">{user.bio}</LeadText>
            </div>
          </CardBody>
          <CardFooter>
            <div className="w-full flex justify-center -mt-8">
              <a
                href="#pablo"
                className="mt-5"
                onClick={(e) => e.preventDefault()}
              >
                <Button
                  onClick={() => setShowVerify(true)}
                  color="purple"
                  buttonType="link"
                  ripple="dark"
                >
                  Verify account
                </Button>
                {showVerify ? (
                  <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                      <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                          {/*header*/}
                          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                              Modal Title
                            </h3>
                            <button
                              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                              onClick={() => setShowVerify(false)}
                            >
                              <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                ×
                              </span>
                            </button>
                          </div>
                          {/*body*/}
                          <div className="relative p-6 flex-auto">
                            <p className="my-4 text-slate-500 text-lg leading-relaxed">
                              I always felt like I could do anything. That’s the
                              main thing people are controlled by! Thoughts-
                              their perception of themselves! They're slowed
                              down by their perception of themselves. If you're
                              taught you can’t do anything, you won’t do
                              anything. I was taught I could do everything.
                            </p>
                          </div>
                          {/*footer*/}
                          <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => setShowVerify(false)}
                            >
                              Close
                            </button>
                            <button
                              className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => setShowVerify(false)}
                            >
                              Save Changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                  </>
                ) : null}
              </a>
            </div>
          </CardFooter>
        </div>
        <div className="lg:w-3/4 sm:w-full">
          <div className="mt-1 mb-2 border-b p-2 border-b-gray-400 text-gray-700 flex text-2xl font-medium items-start justify-start gap-2 ml-2">
            My Collections
          </div>
          <Collection type={"myPosts"} user={user} />
          <div className="mt-6 p-2 my-2 border-b border-b-gray-400 m-4 text-gray-700 flex text-2xl font-medium items-start justify-start gap-2 ml-2">
            Favourites
          </div>
          <Collection type={"favourites"} user={user} />
        </div>
      </div>
    </Card>
  );
}
