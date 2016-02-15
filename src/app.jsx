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


    //Ex2
    root = document.getElementById('ex2');
    elem = <ul>
        <li>Hello</li>
        <li>there</li>
        <li>example</li>
    </ul>;
    ReactDOM.render(elem, root);


    //Ex3
    var data = ['Hello', 'there', 'world!'];
    root = document.getElementById('ex3');
    elem = <ul>{
        data.map(function (elem, index) {
            return <li key={index}>{elem}</li>
        })
    }</ul>;
    ReactDOM.render(elem, root);


    //ex4
    root = document.getElementById('ex4');
    var List = React.createClass({
        displayName: 'List',
        render: function () {
            return <ul>{
                _.map(this.props.items, function (item, index) {
                    return <ListItem item={item} key={index}></ListItem>
                })
            }</ul>;
        }
    });
    var ListItem = React.createClass({
        displayName: 'ListItem',
        render: function () {
            return <li>{this.props.item}</li>
        }
    });
    elem = <List items={data}/>;
    ReactDOM.render(elem, root);


    //ex5
    data = ['A', 'C', 'B'];
    root = document.getElementById('ex5');
    var SortBtn = React.createClass({
        render: function () {
            return <button onClick={this.props.sort}><i className={'fa fa-sort-' + this.props.sortClass}></i></button>;
        }
    });
    var SortedList = React.createClass({
        displayName: 'List',
        getInitialState: function () {
            return {
                order: 'desc',
            };
        },
        sort: function () {
            this.setState({
                order: this.state.order === 'asc' ? 'desc' : 'asc'
            });
        },
        renderItems: function () {
            return _.chain(this.props.items)
                .orderBy(_.identity,this.state.order)
                .map(function (item, index) {
                    return <ListItem item={item} key={index}></ListItem>
                })
                .value()
        },
        render: function () {
            return (
                <div>
                    <SortBtn sortClass={this.state.order} sort={this.sort}/>
                    <ul>{
                        this.renderItems()
                    }</ul>
                </div>
            );
        }
    });
    elem = <SortedList items={data}/>;
    ReactDOM.render(elem, root);

});
