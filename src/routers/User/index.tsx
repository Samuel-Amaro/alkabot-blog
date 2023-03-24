import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { getAllPosts, getUser } from "../../api/api";
import { DataPost, DataUser } from "../../data";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import LineDiviser from "../../components/LineDiviser";
import Post from "../../components/Post";
import React from "react";
import "./User.css";

export async function loader({ params }: LoaderFunctionArgs) {
  const data = await getUser(parseInt(params.idUser as string));

  if (!data) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found User",
    });
  }

  return data;
}

export default function User() {
  const user = useLoaderData() as DataUser;
  const [allPosts, setAllPosts] = useState<DataPost[]>([]);

  useEffect(() => {
    getAllPosts()
      .then((values) => setAllPosts(values))
      .catch((error) => {
        console.error(
          "Error ao buscar posts relacionados a um usuario especifico: " + error
        );
      });
  }, []);

  return (
    <>
      <Navbar />
      <Header
        title="Details User"
        description={`Details profile user @${user.username}`}
      />
      <main className="wrapper__main">
        <table className="wrapper__table-datas-user">
          <tbody className="wrapper__table-body">
            <tr className="wrapper__table-row">
              <th className="wrapper__table-header">Name</th>
              <td className="wrapper__table-data">{user.name}</td>
            </tr>
            <tr className="wrapper__table-row">
              <th className="wrapper__table-header">User Name</th>
              <td className="wrapper__table-data">@{user.username}</td>
            </tr>
            <tr className="wrapper__table-row">
              <th className="wrapper__table-header">E-mail</th>
              <td className="wrapper__table-data">{user.email}</td>
            </tr>
            <tr className="wrapper__table-row">
              <th className="wrapper__table-header">Phone</th>
              <td className="wrapper__table-data">{user.phone}</td>
            </tr>
            <tr className="wrapper__table-row">
              <th className="wrapper__table-header">Website</th>
              <td className="wrapper__table-data">
                <a
                  href={`${user.website}`}
                  target="_blank"
                  rel="noreferrer"
                  className="wrapper__table-link"
                  aria-label={`Visit website from user ${user.name}`}
                >
                  {user.website}
                </a>
              </td>
            </tr>
            <tr className="wrapper__table-row">
              <th className="wrapper__table-header">City</th>
              <td className="wrapper__table-data">{user.address.city}</td>
            </tr>
            <tr className="wrapper__table-row">
              <th className="wrapper__table-header">Company</th>
              <td className="wrapper__table-data">{user.company.name}</td>
            </tr>
            <tr className="wrapper__table-row">
              <th className="wrapper__table-header">Posts</th>
              <td className="wrapper__table-data">
                {allPosts.filter((post) => post.userId === user.id).length}
              </td>
            </tr>
          </tbody>
        </table>
        <section className="wrapper__posts-user">
          <h2 className="wrapper__subtitle">Blog List</h2>
          <div className="wrapper__list-posts-user">
            {allPosts
              .filter((p) => p.userId === user.id)
              .map((post, index) => {
                if (
                  allPosts.filter((p) => p.userId === user.id).length - 1 >
                  index
                ) {
                  return (
                    <React.Fragment key={index}>
                      <Post post={post} key={index} />
                      <LineDiviser />
                    </React.Fragment>
                  );
                }
                return <Post post={post} key={index} />;
              })}
          </div>
        </section>
      </main>
    </>
  );
}
