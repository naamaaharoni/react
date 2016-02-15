requirejs.config({
    baseUrl: 'src',
    paths: {
        lodash: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.min',
        react: 'https://fb.me/react-0.14.7',
        reactDom: 'https://fb.me/react-dom-0.14.7'
    }
});

requirejs(['lodash', 'react', 'reactDom'], function (_, React, ReactDOM) {

    //ex5
    var data = ['A', 'C', 'B'];
    var root = document.getElementById('ex5');
    var SortedList = React.createClass({
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
                .orderBy(_.identity, this.state.order)
                .map(function (item, index) {
                    return <ListItem item={item} key={index}></ListItem>;
                })
                .value();
        },
        render: function () {
            return (
                <div>
                    <SortBtn sortClass={this.state.order} sort={this.sort}/>
                    <ul>{this.renderItems()}</ul>
                </div>
            );
        }
    });
    var ListItem = React.createClass({
        displayName: 'ListItem',
        render: function () {
            return <li>{this.props.item}</li>
        }
    });
    var SortBtn = React.createClass({
        render: function () {
            return <button onClick={this.props.sort}><i className={'fa fa-sort-' + this.props.sortClass}></i></button>;
        }
    });
    ReactDOM.render(<SortedList items={data}/>, root);

});
