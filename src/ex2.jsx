
requirejs.config({
    baseUrl: 'src',
    paths: {
        lodash: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.min',
        react: 'https://fb.me/react-0.14.7',
        reactDom: 'https://fb.me/react-dom-0.14.7'
    }
});

requirejs(['lodash', 'react', 'reactDom'], function (_, React, ReactDOM) {

    //Ex2
    var root = document.getElementById('ex2');
    var elem = <ul>
        <li>Hello</li>
        <li>there</li>
        <li>example</li>
    </ul>;
    ReactDOM.render(elem, root);

});
