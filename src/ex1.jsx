requirejs.config({
    baseUrl: 'src',
    paths: {
        lodash: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.min',
        react: 'https://fb.me/react-0.14.7',
        reactDom: 'https://fb.me/react-dom-0.14.7'
    }
});

requirejs(['lodash', 'react', 'reactDom'], function (_, React, ReactDOM) {

    //Ex1
    var root = document.getElementById('ex1');
    var elem = React.createElement('ul', null,
        // Element content instead of string content:
        React.createElement('li', null, 'hello'),
        React.createElement('li', null, 'there'),
        React.createElement('li', null, 'world'));
    ReactDOM.render(elem, root);

});
