import React, { Component } from 'react';
import { IndexRoute, Route } from 'react-router';
import { ReactRouterSSR } from 'meteor/reactrouter:react-router-ssr';
import ApolloClient from 'apollo-client';
import { Link } from 'react-router'

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { ApolloProvider } from 'react-apollo'
import { renderToStringWithData } from "react-apollo/server"

const client = new ApolloClient();

class NotFound extends Component {
  render () {
    return <div>NOT FOUND</div>
  }
}

class App extends Component {
  render () {
    return <div>
      <p> Lucky Generator: </p>
      <Link to="/">Lucky Number</Link>
      <br/>
      <Link to="/let">Lucky Letter</Link>
      <br/>
      {this.props.children}
    </div>
  }
}

class NumberGen extends Component {
  render() {
    console.log(this.props.data);
    return <div>Your lucky number is: {this.props.data.luckyNumber}.</div>;
  }
}

const WithNumber = graphql(gql`query { luckyNumber }`)
const NumberGenWithData = WithNumber(NumberGen)

class LetterGen extends Component {
  render() {
    return <div>Your lucky letter is: .</div>;
  }
}

const WithLet = graphql(gql`query { luckyLetter }`)
const LetterGenWithLetter = WithLet(LetterGen)

AppRoutes = (
  <Route path="/" component={App}>
    <IndexRoute component={NumberGenWithData} />
    <Route path="/let" component={LetterGenWithLetter}/>
    <Route path="*" component={NotFound}/>
  </Route>
);

ReactRouterSSR.Run(AppRoutes, {
    rootElement : "root",
    rootElementType : "div",
    wrapperHook : (app) => {
      return <ApolloProvider client={client}>{app}</ApolloProvider>
    }
  },
  {
    fetchDataHook(components) {
        // *** Guessing some Apollo requests to populate requested components go here ***
  }
})
