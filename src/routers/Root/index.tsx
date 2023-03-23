import { useLoaderData } from "react-router-dom";
import { getAllPosts, getAllUsers } from "../../api/api";
import { DataPost, DataUser } from "../../data";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import Post from "../../components/Post";
import "./Root.css";
import LineDiviser from "../../components/LineDiviser";

export async function loader() {
  const allPosts = await getAllPosts();
  return allPosts;
}

export default function Root() {
  const datas = useLoaderData() as DataPost[];
  const [users, setUsers] = useState<DataUser[]>([]);
  
  useEffect(() => {
    getAllUsers()
      .then((values) => {
        setUsers(values);
      })
      .catch((error) => {
        console.error("Error ao buscar usuarios bloggers: " + error);
      });
  }, []);

  function filterUser(userId: number) {
    const userFiltered = users.filter(user => user.id === userId);
    return userFiltered[0];
  }

  return (
    <>
      <Navbar />
      <Header
        title="Alkabot Blog"
        description="Blog alkabot, with technical and enriching content for devs"
      />
      <main className="main">
        <div className="main__container">
          {datas.map((dp, index) => {
            if (datas.length - 1 > index) {
              return (
                <React.Fragment key={index}>
                  <Post post={dp} key={index} user={filterUser(dp.userId)} />
                  <LineDiviser />
                </React.Fragment>
              );
            }
            return <Post post={dp} key={index} user={filterUser(dp.userId)} />;
          })}
        </div>
      </main>
    </>
  );
}
