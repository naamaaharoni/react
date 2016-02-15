'use strict';

requirejs.config({
    baseUrl: 'src',
    paths: {
        lodash: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.min',
        react: 'https://fb.me/react-0.14.7',
        reactDom: 'https://fb.me/react-dom-0.14.7'
    }
});

requirejs(['lodash', 'react', 'reactDom'], function (_, React, ReactDOM) {

    var root = document.getElementById('main');
    var App = React.createClass({
        getInitialState() {
            return {
                text: '',
                tasks: []
            }
        },
        addTask() {
            var tasks = this.state.tasks.concat({
                title: this.state.text
            });
            this.setState({
                text: '',
                tasks: tasks
            });
        },
        updateText(text){
            this.setState({
                text: text
            });
        },
        updateTask(){
            this.setState({
                text: '',
                tasks: tasks
            });
        },
        render() {
            return (
                <div>
                    <Input text={this.state.text} addTask={this.addTask} updateText={this.updateText}/>
                    <List tasks={this.state.tasks}/>
                </div>
            );
        }
    });

    var Input = React.createClass({
        onChange() {
            this.props.updateText(this.refs.input.value);
        },
        render() {
            return (
                <div>
                    <span>Task:</span>
                    <input type="text" value={this.props.text} onChange={this.onChange}/>
                    <button onClick={this.props.addTask}>Add</button>
                </div>);
        }
    });

    var List = React.createClass({
        render(){
            return (
                <ul> {
                    _.map(this.props.tasks, function (task, index) {
                        return <Task key={index} task={task}/>;
                    })
                }
                </ul>
            );
        }
    });

    var Task = React.createClass({
        getInitialState() {
            return {
                isChecked: false
            }
        },
        onTaskClick(){
            this.setState({
                isChecked: !this.state.isChecked
            });
        },
        render(){
            var style = this.state.isChecked ? 'line-through' : '';
            return (
                <li onClick={this.onTaskClick} style={{textDecoration : style}}>
                    {this.props.task.title}
                </li>);
        }
    });

    ReactDOM.render(<App />, root);

});
