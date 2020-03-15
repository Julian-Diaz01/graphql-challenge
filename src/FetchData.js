import React, { Component } from "react";
import axios from "axios";

const axiosGitHubGraphQL = axios.create({
    baseURL: "https://api.github.com/graphql",
    headers: {
      Authorization: `bearer xxxxxxxx `
    }
  });
 const GET_OPEN_ISSUES = `
   query ($owner: String!, $repository: String!) 
    {
      repository(name: $repository, owner: $owner) {
         name
         url
         owner {
          login
          url
        }
        issues(filterBy: {states: OPEN}, first: 5, orderBy: {field: CREATED_AT, direction: DESC}) {
          edges {
            node {
              id
              title
              url
              state
            }
          }
        }
      }
    }
  
    
  `;
 const GET_CLOSED_ISSUES = `
   query ($owner: String!, $repository: String!) 
    {
      repository(name: $repository, owner: $owner) {
         name
         url
         owner {
          login
          url
        }
        issues(filterBy: {states: CLOSED}, first: 5, orderBy: {field: CREATED_AT, direction: DESC}) {
          edges {
            node {
              id
              title
              url
              state
            }
          }
        }
      }
    }
  
    
  `;
 const GET_PULL_REQUEST = `
   query ($owner: String!, $repository: String!) 
    {
      repository(name: $repository, owner: $owner) {
         name
         url
         owner {
          login
          url
        }
        pullRequests(orderBy: {field: CREATED_AT, direction: DESC}, states: OPEN, first: 5) {
          nodes {
            id
            url
            title
          }
        }
      }
    }
    
  `;

  export const getOpenIssues = path => {
    const [owner, repository] = path.split("/");
  
    return axiosGitHubGraphQL.post("", {
      query: GET_OPEN_ISSUES,
      variables: { owner, repository }
    });
  };
  
  export const getClosedIssues = path => {
    const [owner, repository] = path.split("/");
  
    return axiosGitHubGraphQL.post("", {
      query: GET_CLOSED_ISSUES,
      variables: { owner, repository }
    });
  };
  export  const getPullRequest = path => {
    const [owner, repository] = path.split("/");
  
    return axiosGitHubGraphQL.post("", {
      query: GET_PULL_REQUEST,
      variables: { owner, repository }
    });
  };
  
  export const resolveQueryOpen = queryResult => () => ({
    data: queryResult.data.data,
    errors: queryResult.data.errors,
  });
  export const resolveQueryClosed = queryResult => () => ({
    closed: queryResult.data.data,
    errors: queryResult.data.errors,
  });

  export const resolveQueryPullRequest = queryResult => () => ({
    pull_Request: queryResult.data.data,
    errors: queryResult.data.errors,
  });
  
  


  