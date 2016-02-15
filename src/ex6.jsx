requirejs.config({
    baseUrl: 'src',
    paths: {
        lodash: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.min',
        react: 'https://fb.me/react-0.14.7',
        reactDom: 'https://fb.me/react-dom-0.14.7'
    }
});

requirejs(['lodash', 'react', 'reactDom'], function (_, React, ReactDOM) {

    //ex6
    var root = document.getElementById('ex6');
    var Clock = React.createClass({
        getInitialState: function () {
            setInterval(this.updateTime, 1000);
            return {
                time: this.getTime()
            };
        },
        updateTime: function () {
            this.setState({
                time: this.getTime()
            });
        },
        getTime: function () {
            var date = new Date();
            return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        },
        render: function () {
            return (
                <span>{'Time is: ' + this.state.time}</span>
            );
        }
    });
    ReactDOM.render(<Clock/>, root);

});
