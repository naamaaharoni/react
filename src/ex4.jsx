requirejs.config({
    baseUrl: 'src',
    paths: {
        lodash: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.min',
        react: 'https://fb.me/react-0.14.7',
        reactDom: 'https://fb.me/react-dom-0.14.7'
    }
});

requirejs(['lodash', 'react', 'reactDom'], function (_, React, ReactDOM) {

    //ex4
    var root = document.getElementById('ex4');
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
    var elem = <List items={data}/>;
    ReactDOM.render(elem, root);

});
