import React, { Component } from "react";
import SimpleTabs from "./components/Tabs";

export const DisplayOpenIssues = ({ data }) => (
  <div>
    <strong>Open Issues:</strong>
    <ul>
      {data.repository.issues.edges.map(issue => (
        <li key={issue.node.id}>
          <a href={issue.node.url}>{issue.node.title}</a>
        </li>
      ))}
    </ul>
  </div>
);

export const DisplayClosedIssues = ({ closed }) => (
  <div>
    <strong>Closed Issues:</strong>
    <ul>
      {closed.repository.issues.edges.map(issue => (
        <li key={issue.node.id}>
          <a href={issue.node.url}>{issue.node.title}</a>
        </li>
      ))}
    </ul>
  </div>
);

export const DisplayPullRequest = ({ pull_Request }) => (
    <div>
      <strong>Closed Issues:</strong>
      <strong>Pull Request:</strong>
    <ul>
      {pull_Request.repository.pullRequests.nodes.map(pRequest => (
        <li key={pRequest.oid}>
          <a href={pRequest.url}>{pRequest.title}</a>
        </li>
      ))}
    </ul>
    </div>
  );
  

export const DisplayRepInfo = ({ data}) => (
  <div>
    <p>
      <strong>Owner: </strong>
      <a href={data.repository.owner.url}>{data.repository.owner.login}</a>
    </p>
    <p>
      <strong>Repository: </strong>
      <a href={data.repository.url}>{data.repository.name}</a>
    </p>

    </div>
);
