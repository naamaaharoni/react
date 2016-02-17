'use strict';

requirejs.config({
    baseUrl: 'src',
    paths: {
        lodash: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.min',
        react: 'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.7/react-with-addons',
        reactDom: 'https://fb.me/react-dom-0.14.7',
        reactRoute: 'https://cdnjs.cloudflare.com/ajax/libs/react-router/2.0.0/ReactRouter',
        jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min'
    },
    shim: {
        jquery: {exports: '$'}
    }
});

requirejs(['lodash', 'react', 'reactDom', 'reactRoute', 'jquery'], function (_, React, ReactDOM, ReactRouter, $) {

    var root = document.getElementById('main');

    var App = React.createClass({
        term: '',
        getInitialState(){
            return {
                results: []
            }
        },
        updateResults(data){
            var results = _.zipObject(data[1], data[3]);
            this.setState({
                results: results
            });
        },
        getResults(term){
            if (term !== this.term) {
                this.term = term;
                this.getResultsThrottled(term);
            }
        },
        getResultsThrottled: _.throttle(function (term) {
            term = encodeURIComponent(term);
            var url = 'http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + term + '&callback=?';
            $.getJSON(url, this.updateResults);
        }, 1000),
        render(){
            return (
                <div>
                    <Search getResults={this.getResults}/>
                    <List items={this.state.results}/>
                </div>
            )
        }
    });

    var Search = React.createClass({
        onChange(event){
            this.props.getResults(event.target.value);
        },
        render(){
            return <input type="text" onChange={this.onChange}/>
        }
    });

    var List = React.createClass({
        render: function () {
            return <ul>{
                _.map(this.props.items, function (value, key) {
                    return <Result key={_.uniqueId()} link={value} term={key}/>
                })
            }</ul>;
        }
    });
    var Result = React.createClass({
        render: function () {
            return <li><a target="_blank" href={this.props.link}>{this.props.term}</a></li>
        }
    });

    ReactDOM.render(<App />, root);
});
