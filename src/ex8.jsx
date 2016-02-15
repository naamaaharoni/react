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

    //ex8
    var root = document.getElementById('main');
    var App = React.createClass({
        getInitialState: function () {
            return {
                text: '',
                fontWeight: 'normal',
                fontStyle: 'normal'
            }
        },
        updateText: function (newStr) {
            this.setState({
                text: newStr
            });
        },
        updateFontWeight: function () {
            this.setState({
                fontWeight: this.state.fontWeight === 'normal' ? 'bold' : 'normal'
            });
        },
        updateFontStyle: function () {
            this.setState({
                fontStyle: this.state.fontStyle === 'normal' ? 'italic' : 'normal'
            });
        },
        render: function () {
            return (
                <div>
                    <Input updateText={this.updateText}/>
                    <Checkbox title="bold" updateFont={this.updateFontWeight}/>
                    <Checkbox title="italic" updateFont={this.updateFontStyle}/>
                    <Output value={this.state.text}
                            style={{fontWeight:this.state.fontWeight , fontStyle:this.state.fontStyle}}/>
                </div>
            );
        }
    });

    var Input = React.createClass({
        onInputChange() {
            this.props.updateText(this.refs.input.value);
        },
        render() {
            return <input ref="input" type="text" onChange={this.onInputChange}/>;
        }
    });

    const Checkbox = props => <label><input type="checkbox" onChange={props.updateFont}/><span>{props.title}</span></label>;

    const Output = props => <div style={props.style}>{props.value}</div>;

    ReactDOM.render(<App />, root);

});
