import { useLoaderData } from "react-router-dom";
import { getAllPosts } from "../../api/api";
import { DataPost } from "../../data";
import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import Post from "../../components/Post";

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
      <hr className="line-diviser" />
      <Header />
      <main className="main">
        <div className="main__container">
          {datas.map((dp, index) => {
            return <Post post={dp} key={index} />;
          })}
        </div>
      </main>
    </>
  );
}
