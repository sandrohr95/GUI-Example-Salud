import React from "react";
import {css} from "@emotion/react";
import fetch from "node-fetch";
import "bootstrap/dist/css/bootstrap.min.css";

export const Posts = ({posts, loading}) => {

    if (loading) {
        return <h2>Loading...</h2>;
    }

    const fetchDelete = (id) => {
    };

    function handleDeleteClick(id) {
        return fetch('http://localhost:8080/api/v2/patient/delete' + "/" + id, {
            method: "delete",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                alert("Patient deleted satisfactory");
                window.location.reload(false);
                //Router.push("/home");
            })
            .catch((err) => {
                console.log(err);
                console.log(`Error ${err.status}`);

                err.json().then(() => {
                    id.detail.map((item, index) => {
                        alert(item.msg);
                    });
                });
            });
    }

    return (
        <ul className="list-group mb-4">
            {posts.map(posts => {
                console.log(posts)
                return (
                    <>
                        <form>
                            <div
                                key={posts.id}
                                className="table-wrapper-scroll-y my-custom-scrollbar"
                            >
                                <table className="table table-condensed table-striped mb-0">
                                    <thead>
                                    <tr>
                                        <th
                                            align="center"
                                            css={css`
                          text-align: "center";
                          font-size: 14px;
                        `}
                                            colSpan="2"
                                        >
                                            <a css={css`
                          color: black;
                        `}>
                                                ID : {posts.id}
                                            </a>
                                        </th>

                                        <a
                                            className="glyphicon glyphicon-remove"
                                            css={css`
                          margin-top: 1rem;
                          color: black;
                          border: none;
                          position: relative;
                          left: 1rem;
                          margin-left: 1rem;
                        `}
                                            onClick={() => handleDeleteClick(posts.id)}
                                        >remove</a>
                                    </tr>
                                    </thead>
                                    <div>
                                        <table
                                            className="table table-condensed table-bordered "
                                            css={css`
                        width: 90%;
                        margin-top: 25px;
                        margin-bottom: 10px;
                      `}
                                            allign="center"
                                        >
                                            <tbody>
                                            {Object.keys(posts.clinical_information).map((item, i) => {
                                                return (
                                                    <tr>
                                                        <td
                                                            className="col-md-2"
                                                            css={css`
                                  text-align: center;
                                  background-color: rgba(235, 105, 9, 0.65);
                                  font-weight: bold;
                                `}
                                                        >
                                                            {item != "type" ? item : 0}:
                                                        </td>

                                                        <td
                                                            className="col-md-6"
                                                            css={css`
                                  text-align: left;
                                  background-color: #fff;
                                  font-weight: bold;
                                `}
                                                        >
                                                            {posts.clinical_information[item]["value"]}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                            </tbody>
                                        </table>
                                    </div>
                                </table>
                            </div>
                        </form>
                        <hr/>
                    </>
                );
            })}
        </ul>
    );
};