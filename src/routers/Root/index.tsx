import { useLoaderData } from "react-router-dom";
import { getAllPosts } from "../../api/api";
import { DataPost } from "../../data";
import React, { useEffect } from "react";
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
  /*useEffect(() => {
    datas.forEach((dp) => {
      console.log(dp);
    });
  }, []);
  */
  return (
    <>
      <Navbar />
      <Header />
      <main className="main">
        <div className="main__container">
          {datas.map((dp, index) => {
            if(datas.length - 1 > index) {
                return (
                  <React.Fragment key={index}>
                    <Post post={dp} key={index} />
                    <LineDiviser />
                  </React.Fragment>
                );
            }
            return <Post post={dp} key={index} />;
          })}
        </div>
      </main>
    </>
  );
}
