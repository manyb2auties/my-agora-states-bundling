import React from "react";
import { Form, Discussions } from "./components";
import { useEffect, useState } from "react";
import "./index.css";

function App() {
  const domain = "http://localhost:3001";
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    getDiscussion();
  }, []); //렌더링 될 때 딱 한 번 getDiscussion 함수가 실행됨

  const getDiscussion = () => {
    // http://localhost:3001/discussions 에서 데이터를 받아옴
    return fetch(domain + `/discussions`)
      .then((res) => res.json())
      .then((data) => {
        setDiscussions(data);
      });
  };

  const addDiscussion = ({ title, author, bodyText }) => {
    const newDiscussion = {
      id: "unique id",
      createdAt: new Date().toISOString(),
      title: title,
      url: "https://github.com/codestates-seb/agora-states-fe/discussions",
      author: author,
      answer: null,
      bodyHTML: bodyText,
      avatarUrl:
        "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4",
    };
    fetch(domain + `/discussions/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDiscussion),
    }).then((res) => {
      if (res.status === 201) {
        getDiscussion(); // create 요청을 성공하면 Discussions가 업데이트 된다.(요청한 body가 포함됨)
      }
    });
  };

  const deleteDiscussion = (id) => {
    fetch(domain + `/discussions/`, {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 202 || 204) {
        getDiscussion();
      }
    });
  };

  return (
    <>
      <h1>My Agora States</h1>
      <Discussions
        discussions={discussions}
        deleteDiscussion={deleteDiscussion}
      />
      <Form addDiscussion={addDiscussion} />
    </>
  );
}

export default App;
