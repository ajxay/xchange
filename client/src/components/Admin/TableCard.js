import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Image from "@material-tailwind/react/Image";
import Progress from "@material-tailwind/react/Progress";
import { Switch } from "@headlessui/react";
import { useState } from "react";
import team1 from "../../assets/img/team-1-800x800.jpg";
import { useDispatch } from "react-redux";
import { deactivateUser } from "../../actions/users";
export default function CardTable({ users }) {
  const dispatch = useDispatch();
  const [enabled, setEnabled] = useState(false);
  const handleDeactivate = (id) => {
    setEnabled(!enabled);
    dispatch(deactivateUser(id));
  };
  return (
    <Card>
      <CardHeader color="purple" contentPosition="left">
        <h2 className="text-white text-2xl">Card Table</h2>
      </CardHeader>
      <CardBody>
        <div className="overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  User Name
                </th>
                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  Location
                </th>
                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  Account Status
                </th>
                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  Disable
                </th>
                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  Exchanges
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <>
                    <tr>
                      <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                        <div className="flex">
                          <div className="w-10 h-10 rounded-full border-2 border-white">
                            <Image
                              src={user?.picture ? user.picture : team1}
                              rounded
                              alt="..."
                            />
                          </div>
                          <p className="my-2 mx-4">{user.username}</p>
                        </div>
                      </th>
                      <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                        Not Available
                      </th>
                      <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                        <i className="fas fa-circle fa-sm text-orange-500 mr-2"></i>{" "}
                        {user.isActive ? "Active" : "Disabled"}
                      </th>
                      <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                        <Switch
                          checked={user.isActive}
                          onChange={() => handleDeactivate(user._id)}
                          className={`${
                            user.isActive ? "bg-green-400" : "bg-red-200"
                          } relative inline-flex h-6 w-11 items-center rounded-full`}
                        >
                          <span
                            className={`${
                              user.isActive ? "translate-x-6" : "translate-x-1"
                            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                          />
                        </Switch>
                      </th>
                      <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                        <Progress color="red" value="60" />
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
