/**
 * Created by naamaa on 16/02/2016.
 */
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
            var task = {
                title: this.state.text,
                id: _.uniqueId()
            };
            var tasks = _.concat(task, this.state.tasks);
            this.setState({
                text: '',
                tasks: tasks
            });
        },
        removeTask(task){
            var arr = _.without(this.state.tasks, task);
            this.setState({
                tasks: arr
            });
        },
        updateText(text){
            this.setState({
                text: text
            });
        },
        render() {
            return (
                <div>
                    <Filter text={this.state.text} addTask={this.addTask} updateText={this.updateText}/>
                    <FilteredList tasks={this.state.tasks} filter={this.state.text} removeTask={this.removeTask}/>
                </div>
            );
        }
    });

    var Filter = React.createClass({
        onChange() {
            this.props.updateText(this.refs.input.value);
        },
        render() {
            return (
                <div>
                    <span>Filter:</span>
                    <input ref="input" type="text" value={this.props.text} onChange={this.onChange}/>
                    <button onClick={this.props.addTask}>Add</button>
                </div>);
        }
    });

    var FilteredList = React.createClass({
        render(){
            var filteredTasks = _.filter(this.props.tasks, (task) => task.title.indexOf(this.props.filter) === 0);
            return (
                <ul> {
                    _.map(filteredTasks, (task) => {
                        return <Task key={task.id} task={task} removeTask={this.props.removeTask}/>;
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
        onDeleteClick(){
            this.props.removeTask(this.props.task);
        },
        render(){
            var style = this.state.isChecked ? 'line-through' : '';
            return (
                <li onClick={this.onTaskClick} style={{textDecoration : style}}>
                    <div>{this.props.task.title}</div>
                    <button onClick={this.onDeleteClick}>Delete</button>
                </li>);
        }
    });

    ReactDOM.render(<App />, root);

});
