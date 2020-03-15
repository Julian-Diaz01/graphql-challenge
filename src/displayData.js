import React, { Component } from "react";
import { UncontrolledCollapse } from "reactstrap";
import { Collapse, CardBody, Card } from "reactstrap";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

export const DisplayOpenIssues = ({ data }) => (
  <div>
    <strong>Open Issues:</strong>
    <Table>
      {data.repository.issues.edges.map(issue => (
        <tbody key={issue.node.id}>
          <tr>
            <td>
              <a href={issue.node.url}>{issue.node.title}</a>
            </td>
            <td>
              <div className="container">
                <Button
                  color="primary"
                  id={"toggle"}
                  style={{ marginBottom: "1rem" }}
                >
                  Comments
                </Button>
                <UncontrolledCollapse toggler="#toggle">
                  <Card>
                    <CardBody>
                      <Table>
                        <thead>
                          <tr>
                            <th>User</th>
                            <th>Comment</th>
                          </tr>
                        </thead>
                        <tbody>
                          {issue.node.comments.edges.map(comment => (
                            <tr>
                              <td>
                                {" "}
                                <a href={comment.node.author.url}>
                                  {comment.node.author.login}
                                </a>
                              </td>
                              <td>{comment.node.body}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>
                </UncontrolledCollapse>
              </div>
            </td>
          </tr>
        </tbody>
      ))}
    </Table>
  </div>
);

export const DisplayClosedIssues = ({ closed }) => (
  <div>
    <strong>Closed Issues:</strong>
    <Table>
      {closed.repository.issues.edges.map(issue => (
        <tbody key={issue.node.id}>
          <tr>
            <td>
              <a href={issue.node.url}>{issue.node.title}</a>
            </td>
            <td>
              <div className="container">
                <Button
                  color="primary"
                  id="toggle"
                  style={{ marginBottom: "1rem" }}
                >
                  Comments
                </Button>
                <UncontrolledCollapse toggler="#toggle">
                  <Card>
                    <CardBody>
                      <Table>
                        <thead>
                          <tr>
                            <th>User</th>
                            <th>Comment</th>
                          </tr>
                        </thead>
                        <tbody>
                          {issue.node.comments.edges.map(comment => (
                            <tr>
                              <td>
                                {" "}
                                <a href={comment.node.author.url}>
                                  {comment.node.author.login}
                                </a>
                              </td>
                              <td>{comment.node.body}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>
                </UncontrolledCollapse>
              </div>
            </td>
          </tr>
        </tbody>
      ))}
    </Table>
  </div>
);

export const DisplayPullRequest = ({ pull_Request }) => (
  <div>
    <strong>Pull Request:</strong>
    <Table>
      {pull_Request.repository.pullRequests.nodes.map(pRequest => (
        <tbody key={pRequest.id}>
          <tr>
            <td>
              <a href={pRequest.url}>{pRequest.title}</a>
            </td>
            <td>
              <div className="container">
                <Button
                  color="primary"
                  id={pRequest.id}
                  style={{ marginBottom: "1rem" }}
                >
                  Comments
                </Button>
                <UncontrolledCollapse toggler={pRequest.id}>
                  <Card>
                    <CardBody>
                      <Table>
                        <thead>
                          <tr>
                            <th>User</th>
                            <th>Comment</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pRequest.comments.edges.map(comment => (
                            <tr>
                              <td>
                                {" "}
                                <a href={comment.node.author.url}>
                                  {comment.node.author.login}
                                </a>
                              </td>
                              <td>{comment.node.body}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>
                </UncontrolledCollapse>
              </div>
            </td>
          </tr>
        </tbody>
      ))}
    </Table>
  </div>
);

export const DisplayRepInfo = ({ data }) => (
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
