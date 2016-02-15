requirejs.config({
    baseUrl: 'src',
    paths: {
        lodash: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.min',
        react: 'https://fb.me/react-0.14.7',
        reactDom: 'https://fb.me/react-dom-0.14.7'
    }
});

requirejs(['lodash', 'react', 'reactDom'], function (_, React, ReactDOM) {

    //ex6 - without state
    var root = document.getElementById('ex6');
    var Clock = React.createClass({
        getTime: function () {
            var date = this.props.time;
            return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        },
        render: function () {
            return (
                <span>{'Time is: ' + this.getTime()}</span>
            );
        }
    });

    setInterval(function () {
        var date = new Date();
        ReactDOM.render(<Clock time={date}/>, root);
    }, 1000);
});
