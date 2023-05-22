import TableCard from "../../Admin/TableCard";
import { useSelector } from "react-redux";
// import { getUsers } from "../../../actions/users";
const Users = () => {
  const users = useSelector((state) => state.users);
  const requests = useSelector((state) => state.requests);

  return (
    <>
      {/* <div className="bg-light-blue-500 pt-14 pb-28 px-3 md:px-8 h-auto">
        <div className="container mx-auto max-w-full">
          <div className="grid ss:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
            <StatusCard
              color="pink"
              icon="trending_up"
              title="Traffic"
              amount="350,897"
              percentage="3.48"
              percentageIcon="arrow_upward"
              percentageColor="green"
              date="Since last month"
            />
            <StatusCard
              color="orange"
              icon="groups"
              title="New Users"
              amount="2,356"
              percentage="3.48"
              percentageIcon="arrow_downward"
              percentageColor="red"
              date="Since last week"
            />
            <StatusCard
              color="purple"
              icon="paid"
              title="Sales"
              amount="924"
              percentage="1.10"
              percentageIcon="arrow_downward"
              percentageColor="orange"
              date="Since yesterday"
            />
            <StatusCard
              color="blue"
              icon="poll"
              title="Performance"
              amount="49,65%"
              percentage="12"
              percentageIcon="arrow_upward"
              percentageColor="green"
              date="Since last month"
            />
          </div>
        </div>
      </div> */}

      <div className="px-3 bg-slate-700 h-screen md:px-8 py-11 ">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 px-4 mb-16">
            <TableCard requests={requests} users={users} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
