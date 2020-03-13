import React, { Component } from "react";
import axios from "axios";

const TITLE = "A single page React app communicating with GraphQL API v4  of GitHub";

const axiosGitHubGraphQL = axios.create({
  baseURL: "https://api.github.com/graphql",
  headers: {
    Authorization: `bearer 9b9e37936d6f99d7d0930cedd99d515f25a68c90`,
  },
});
const GET_OPEN_ISSUES = `
 query ($owner: String!, $repository: String!) 
  {
    repository(name: $repository, owner: $owner) {
       owner {
        login
      }
      pullRequest(number: 3) {
        commits(first: 10) {
          edges {
            node {
              commit {
                oid
                message
              }
            }
          }
        }
        reviews(first: 10) {
          edges {
            node {
              state
            }
          }
        }
        comments(last: 3) {
          edges {
            node {
              author {
                login
              }
              bodyHTML
            }
          }
        }
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

const getIssuesOfRepository = path => {
  const [owner, repository] = path.split('/');

  return axiosGitHubGraphQL.post('', {
    query: GET_OPEN_ISSUES,
    variables: { owner, repository },
  });
};

const resolveIssuesQuery = owner => () => ({
  organization: owner.data.data.owner,
  errors: owner.data.errors,
});

class App extends Component {
  state = {
    path: 'octocat/Hello-World',
    organization: null,
    errors: null,
  };

  componentDidMount() {
    this.onFetchFromGitHub(this.state.path);
  }

  onChange = event => {
    this.setState({ path: event.target.value });
  };

  onSubmit = event => {
    this.onFetchFromGitHub(this.state.path);

    event.preventDefault();
  };

  onFetchFromGitHub = path => {
    getIssuesOfRepository(path).then(owner =>
      this.setState(resolveIssuesQuery(owner)),
    );
  };
  

  render() {
    const { path, owner, errors } = this.state;

    return (
      <div>
        <h1>{TITLE}</h1>

        <form onSubmit={this.onSubmit}>
          <label htmlFor="url">
            https://github.com/
          </label>
          <input
            id="url"
            type="text"
            value={path}
            onChange={this.onChange}
            style={{ width: '300px' }}
          />
          <button type="submit">Search</button>
        </form>

        <hr />

        {owner ? (
          <Organization organization={owner} errors={errors} />
        ) : (
          <p>404</p>
        )}
      </div>
    );
  }
}

const Organization = ({ owner, errors }) => {
  if (errors) {
    return (
      <p>
        <strong>Something went wrong:</strong>
        {errors.map(error => error.message).join(' ')}
      </p>
    );
  }

  return (
    <div>
      <p>
        <strong>Issues of:</strong>
        <a href={owner.url}>{owner.name}</a>
      </p>
      <Repository repository={owner.repository} />
    </div>
  );
};

const Repository = ({ repository }) => (
  <div>
    <p>
      <strong>In Repository:</strong>
      <a href={repository.url}>{repository.name}</a>
    </p>

    <ul>
      {repository.issues.edges.map(issue => (
        <li key={issue.node.id}>
          <a href={issue.node.url}>{issue.node.title}</a>
        </li>
      ))}
    </ul>
  </div>
);

export default App;