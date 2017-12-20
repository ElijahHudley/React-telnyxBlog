/**
 * @overview Example spec file demonstrating a Jasmine test.
 *
 * @see {@link https://jasmine.github.io/2.8/introduction}
 */

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Blog from './Blog';
import Post from './Components/post';

describe('Blog', function() {
  beforeEach(function() {
    this.component = ReactTestUtils.renderIntoDocument(<Blog />);
    this.selectDOM = () => ReactDOM.findDOMNode(this.component);
    this.posts = () => this.selectDOM().children;

    this.component.setState({posts: [{
      "id": 1,
      "title": "Blog post #1",
      "author": "Melissa Manges",
      "publish_date": "2016-02-23",
      "slug": "blog-post-1",
      "description": "Utroque denique invenire et has.",
      "content": "<p>Utroque denique invenire et has. Cum case definitiones no, est dicit placerat verterem ne.</p> <p>In ius nonumy perfecto adipiscing, ad est cibo iisque aliquid, dicit civibus eum ei. Cum animal suscipit at, utamur utroque appareat sed ex.</p>"
    }]});
  });

  it("Posts are loaded on startup", function() {
    let data = ReactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'post');
    expect(data.length > 0).toBe(true);
  });


  it('renders a Blog', function() {
    let element = React.createElement(Blog,{});
    expect(function() {
      var component = ReactTestUtils.renderIntoDocument(element);
    }).not.toThrow();
  });
});
