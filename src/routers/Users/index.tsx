import { useLoaderData } from "react-router-dom";
import { getAllUsers } from "../../api/api";
import { DataUser } from "../../data";
import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import CardProfile from "../../components/CardProfile";
import "./Users.css";

export async function loader() {
  const allUsers = await getAllUsers();
  return allUsers;
}

export default function Users() {
  const datas = useLoaderData() as DataUser[];
  return (
    <>
      <Navbar />
      <Header
        title="All Bloggers"
        description="Users Bloggers from our community"
      />
      <main className="wrapper__users">
        <div className="wrapper__list-users">
          {datas.map((user, index) => {
            return <CardProfile user={user} key={index} />;
          })}
        </div>
      </main>
    </>
  );
}
