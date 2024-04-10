require("dotenv").config();
const express = require("express");
const app = express();

const githubData = {
  login: "ShraddhaKesharwani631992",
  id: 143939784,
  node_id: "U_kgDOCJRYyA",
  avatar_url: "https://avatars.githubusercontent.com/u/143939784?v=4",
  gravatar_id: "",
  url: "https://api.github.com/users/ShraddhaKesharwani631992",
  html_url: "https://github.com/ShraddhaKesharwani631992",
  followers_url:
    "https://api.github.com/users/ShraddhaKesharwani631992/followers",
  following_url:
    "https://api.github.com/users/ShraddhaKesharwani631992/following{/other_user}",
  gists_url:
    "https://api.github.com/users/ShraddhaKesharwani631992/gists{/gist_id}",
  starred_url:
    "https://api.github.com/users/ShraddhaKesharwani631992/starred{/owner}{/repo}",
  subscriptions_url:
    "https://api.github.com/users/ShraddhaKesharwani631992/subscriptions",
  organizations_url:
    "https://api.github.com/users/ShraddhaKesharwani631992/orgs",
  repos_url: "https://api.github.com/users/ShraddhaKesharwani631992/repos",
  events_url:
    "https://api.github.com/users/ShraddhaKesharwani631992/events{/privacy}",
  received_events_url:
    "https://api.github.com/users/ShraddhaKesharwani631992/received_events",
  type: "User",
  site_admin: false,
  name: null,
  company: null,
  blog: "",
  location: null,
  email: null,
  bio: null,
  twitter_username: null,
  public_repos: 2,
  public_gists: 0,
  followers: 0,
  following: 0,
  created_at: "2023-09-03T11:32:35Z",
  updated_at: "2024-04-10T10:36:57Z",
};

app.get("/", (req, res) => {
  console.log(req, "--req");
  res.send("hello world");
});

app.get("/api/twitter", (req, res) => {
  res.send("Twitter app");
});

app.get("/api/login", (req, res) => {
  res.send(
    "<p>Please login at <a href='https://www.learninglive.tech/'>Learninglive.tech</a> </p>"
  );
});

app.get("/api/github", (req, res) => {
  res.json(githubData);
});

app.listen(process.env.PORT, () => {
  console.log("app listening on port", process.env.PORT);
});
