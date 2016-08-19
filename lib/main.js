import React, { Component } from 'react';
import { IndexRoute, Route } from 'react-router';
import { ReactRouterSSR } from 'meteor/reactrouter:react-router-ssr';

class NotFound extends Component {
  render () {
    return <div>NOT FOUND</div>
  }
}

class App extends Component {
  render () {
    return <div>
    <p> App Component: </p>
    {this.props.children}
    </div>
  }
}

class HomePage extends Component {
  render() {
    return <div>Hi there!</div>;
  }
}

AppRoutes = (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="*" component={NotFound}/>
  </Route>
);

ReactRouterSSR.Run(AppRoutes, {
  rootElement : "root",
  rootElementType : "div"
}, {
  htmlHook : function (html) {
    console.log(html);
    return html
  }
});
