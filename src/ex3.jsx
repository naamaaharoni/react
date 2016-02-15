requirejs.config({
    baseUrl: 'src',
    paths: {
        lodash: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.min',
        react: 'https://fb.me/react-0.14.7',
        reactDom: 'https://fb.me/react-dom-0.14.7'
    }
});

requirejs(['lodash', 'react', 'reactDom'], function (_, React, ReactDOM) {

    //Ex3
    var data = ['Hello', 'there', 'world!'];
    var root = document.getElementById('ex3');
    var elem = <ul>{
        data.map(function (elem, index) {
            return <li key={index}>{elem}</li>
        })
    }</ul>;
    ReactDOM.render(elem, root);

});
