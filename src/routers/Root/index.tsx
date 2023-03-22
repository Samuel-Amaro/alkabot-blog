import { useLoaderData } from "react-router-dom";
import { getAllPosts } from "../../api/api";
import { DataPost } from "../../data";
import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import Post from "../../components/Post";
import "./Root.css";

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
                  <>
                    <Post post={dp} key={index} />
                    <hr className="main__line-diviser" />
                  </>
                );
            }
            return <Post post={dp} key={index} />;
          })}
        </div>
      </main>
    </>
  );
}
