'use strict';

requirejs.config({
    baseUrl: 'src',
    paths: {
        lodash: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.min',
        react: 'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.7/react-with-addons',
        reactDom: 'https://fb.me/react-dom-0.14.7',

    }
});

requirejs(['lodash', 'react', 'reactDom'], function (_, React, ReactDOM) {

    var root = document.getElementById('main');

    var App = React.createClass({
        mixins: [React.addons.LinkedStateMixin],
        getInitialState: function () {
            return {
                text: ''
            }
        },
        render: function () {
            return (
                <div>
                    <Input linkState={this.linkState}/>
                    <Output value={this.state.text}/>
                </div>
            );
        }
    });

    var Input = React.createClass({
        render() {
            return <input type="text" valueLink={this.props.linkState('text')}/>;
        }
    });


    var Output = React.createClass({
        render(){
            var value = isNaN(this.props.value) ? '' : Number(this.props.value) * 2;
            return <div>{value}</div>
        }
    });

    ReactDOM.render(<App />, root);
});
