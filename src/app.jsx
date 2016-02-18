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
    var LinkedStateMixin = React.addons.LinkedStateMixin;

    var App = React.createClass({
        getInitialState(){
            return {
                tagNodes: [],
            }
        },
        onTagInsert(newTag){
            var tagNodes = _.concat(this.state.tagNodes, {
                text: newTag,
                status: 'active'
            });
            this.setState({
                tagNodes: tagNodes
            });
        },
        deleteLastTag(){
            var tag = this.state.tagNodes[this.state.tagNodes.length - 1];
            if (tag.status === 'active') {
                tag.status = 'redayToDelete';
                this.setState({
                    tagNodes: this.state.tagNodes
                });
            }
            else {
                tag.status = 'active';
                var tagNodes = _.slice(this.state.tagNodes, 0, -1);
                this.setState({
                    tagNodes: tagNodes
                });
            }
        },
        render() {
            return (
                <div ref="tagsContainer">
                    {_.map(this.state.tagNodes, function (tag, index) {
                        return <Tag value={tag.text} status={tag.status} key={index}/>
                    })}
                    <TagInput onTagInsert={this.onTagInsert} deleteLastTag={this.deleteLastTag}/>
                </div>
            )

        }
    });

    var TagInput = React.createClass({
        mixins: [LinkedStateMixin],
        getInitialState(){
            return {
                tagText: ''
            }
        },
        onKeyDown(event){
            var tagText = this.state.tagText;
            if (event.keyCode === 13 || event.keyCode === 188) {
                if(!_.isEmpty(tagText)) {
                    this.props.onTagInsert(tagText);
                    this.setState({
                        tagText: ''
                    });
                }
                event.preventDefault();
            }
            else if (event.keyCode === 8) {
                if (_.isEmpty(tagText)) {
                    this.props.deleteLastTag();
                }
            }
        },
        render(){
            return (
                <input type="text" onKeyDown={this.onKeyDown} valueLink={this.linkState('tagText')}/>
            );
        }
    });

    var Tag = React.createClass({
        render(){
            var className = 'tag';
            if (this.props.status === 'redayToDelete'){
                className+= ' reday-to-delete';
            }
            return (
                <span
                    className={className}>{this.props.value}</span>
            )
        }
    });

    ReactDOM.render(<App />, root);
});
