import { useLoaderData } from "react-router-dom";
import { getAllPosts, getAllUsers } from "../../api/api";
import { DataPost, DataUser } from "../../data";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import Post from "../../components/Post";
import "./Root.css";
import LineDiviser from "../../components/LineDiviser";
import AngleRight from "../../components/Icons/AngleRight";
import AngleLeft from "../../components/Icons/AngleLeft";
import BackToTop from "../../components/ButtonBackToTop";
import NumberPost from "../../components/NumberPost";

export async function loader() {
  const allPosts = await getAllPosts();
  return allPosts;
}

export default function Root() {
  const datas = useLoaderData() as DataPost[];
  const [users, setUsers] = useState<DataUser[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

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
    const userFiltered = users.filter((user) => user.id === userId);
    return userFiltered[0];
  }

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = datas.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      <Navbar />
      <Header
        title="Alkabot Blog"
        description="Blog alkabot, with technical and enriching content for devs"
      />
      <main className="main">
        <div className="main__container">
          {currentPosts.map((dp, index) => {
            if (currentPosts.length - 1 > index) {
              return (
                <React.Fragment key={index}>
                  <NumberPost numberPost={firstPostIndex + index + 1} />
                  <div className="main__group">
                    <Post post={dp} key={index} user={filterUser(dp.userId)} />
                    <LineDiviser className="main__line-diviser--mg" />
                  </div>
                </React.Fragment>
              );
            }
            return (
              <React.Fragment key={index}>
                <NumberPost numberPost={firstPostIndex + index + 1} />
                <Post post={dp} key={index} user={filterUser(dp.userId)} />
              </React.Fragment>
            );
          })}
        </div>
        <div className="main__buttons-pagination">
          <button
            type="button"
            onPointerDown={() => {
              if (currentPage > 1) {
                setCurrentPage((prevCurrentPage) => prevCurrentPage - 1);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                if (currentPage > 1)
                  setCurrentPage((prevCurrentPage) => prevCurrentPage - 1);
              }
            }}
            disabled={currentPage === 1}
            title="Previous Posts"
            aria-label="Previous Posts"
            className="main__btn main__btn--previous"
          >
            <AngleLeft className="main__icon-btn" />
            <span className="main__btn-text">Previous</span>
          </button>
          <button
            type="button"
            onPointerDown={() => {
              if (currentPage < Math.ceil(datas.length / postsPerPage)) {
                setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                if (currentPage < Math.ceil(datas.length / postsPerPage))
                  setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
              }
            }}
            disabled={currentPage === Math.ceil(datas.length / postsPerPage)}
            title="Next Posts"
            aria-label="Next Posts"
            className="main__btn main__btn--next"
          >
            <span className="main__btn-text">Next</span>
            <AngleRight className="main__icon-btn" />
          </button>
        </div>
      </main>
      <BackToTop />
    </>
  );
}
