import React, { Component } from "react";
import axios from "axios";
import { Tabs } from "@yazanaabed/react-tabs";
import {
  resolveQueryOpen,
  resolveQueryClosed,
  resolveQueryPullRequest,
  getOpenIssues,
  getClosedIssues,
  getPullRequest
} from "./FetchData";
import {
  DisplayOpenIssues,
  DisplayClosedIssues,
  DisplayPullRequest,
  DisplayRepInfo
} from "./displayData";

const TITLE =
  "A single page React app communicating with GraphQL API v4  of GitHub";

  class App extends Component {
  state = {
    auth: "auth token",
    path: "facebook/react-native",
    data: null,
    closed: null,
    pull_Request: null,
    errors: null
  };

  componentDidMount() {
    this.onFetchOpenIssuesFromGitHub(this.state.path);
    this.onFetchClosedIssuesFromGitHub(this.state.path);
    this.onFetchPullRequestFromGitHub(this.state.path);
  }

  onChange = event => {
    this.setState({ auth: event.target.value });
    this.setState({ path: event.target.value });
  };

  onSubmit = event => {
    this.onFetchOpenIssuesFromGitHub(this.state.path);
    this.onFetchClosedIssuesFromGitHub(this.state.path);
    this.onFetchPullRequestFromGitHub(this.state.path);

    event.preventDefault();
  };

  onFetchOpenIssuesFromGitHub = path => {
    getOpenIssues(path).then(queryResult =>
      this.setState(resolveQueryOpen(queryResult))
    );
  };

  onFetchClosedIssuesFromGitHub = path => {
    getClosedIssues(path).then(queryResult =>
      this.setState(resolveQueryClosed(queryResult))
    );
  };
  onFetchPullRequestFromGitHub = path => {
    getPullRequest(path).then(queryResult =>
      this.setState(resolveQueryPullRequest(queryResult))
    );
  };

  render() {
    const { path, data, errors, closed, pull_Request, auth } = this.state;

    return (
      <div>
        <h1>{TITLE}</h1>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="auth">Authorization Token</label>
          <input
            id="auth"
            type="text"
            value={auth}
            onChange={this.onChange}
            style={{ width: "300px" }}
          />
          <button type="submit">Search</button>
        </form>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="url">Issues for https://github.com/</label>
          <input
            id="url"
            type="text"
            value={path}
            onChange={this.onChange}
            style={{ width: "300px" }}
          />
          <button type="submit">Search</button>
        </form>

        <hr />

        {data && closed && pull_Request ? (
          <div>
            <div style={styles}>
              <DisplayRepInfo data={data} />
              <Tabs
                activeTab={{
                  id: "tab1"
                }}
              >
                <Tabs.Tab id="tab1" title="Open Issues">
                  <div style={{ padding: 10 }}>
                    <DisplayOpenIssues data={data} />
                  </div>
                </Tabs.Tab>
                <Tabs.Tab id="tab2" title="Closed Issues">
                  <div style={{ padding: 10 }}>
                    <DisplayClosedIssues closed={closed} />
                  </div>
                </Tabs.Tab>
                <Tabs.Tab id="tab3" title="Pull Request">
                  <div style={{ padding: 10 }}>
                    <DisplayPullRequest pull_Request={pull_Request} />
                  </div>
                </Tabs.Tab>
              </Tabs>
            </div>
          </div>
        ) : (
          <p>No info</p>
        )}
      </div>
    );
  }
}
const styles = {
  fontFamily: "sans-serif",
  textAlign: "left"
};
export default App;
