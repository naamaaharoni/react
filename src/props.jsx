requirejs.config({
    baseUrl: 'src',
    paths: {
        lodash: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.min',
        react: 'https://fb.me/react-0.14.7',
        reactDom: 'https://fb.me/react-dom-0.14.7'
    }
});

requirejs(['lodash', 'react', 'reactDom'], function (_, React, ReactDOM) {

    var root = document.getElementById('ex1');
    var A = React.createClass({
        render: function() {
            return <B {...this.props} y={6}></B>
        }
    });
    var B = React.createClass({
        render: function() {
            return <div></div>;
        }
    });
    ReactDOM.render(<A x={1} y={2}/>, root);

});
