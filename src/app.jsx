'use strict';

requirejs.config({
    baseUrl: 'src',
    paths: {
        lodash: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.min',
        react: 'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.7/react-with-addons',
        reactDom: 'https://fb.me/react-dom-0.14.7',
        reactRoute: 'https://cdnjs.cloudflare.com/ajax/libs/react-router/2.0.0/ReactRouter'
    }
});

requirejs(['lodash', 'react', 'reactDom', 'reactRoute'], function (_, React, ReactDOM, ReactRouter) {

    var Router = ReactRouter.Router;
    var Route = ReactRouter.Route;
    var History = ReactRouter.History;
    var LinkedStateMixin = React.addons.LinkedStateMixin;

    var root = document.getElementById('main');

    var Login = React.createClass({
        mixins: [LinkedStateMixin, History],
        getInitialState(){
            return {
                email: '',
                password: '',
                message: ''
            }
        },
        verifyUser(){
            var data = JSON.parse(localStorage.getItem('markbook'));
            if (data != null) {
                var password = data[this.state.email];
                if (password && password === this.state.password) {
                    this.history.push('/home');
                }
            }
            this.setState({
                message: 'Email or password are incorrect'
            });
        },
        goToSignup(){
            this.history.push('/signup');
        },
        render () {
            return (
                <div>
                    <Header />
                    <form onSubmit={this.verifyUser}>
                        <input type="email" placeholder="Email" valueLink={this.linkState('email')} className="input"
                               required/>
                        <input type="password" placeholder="Password" valueLink={this.linkState('password')}
                               className="input" required/>
                        <Error message={this.state.message}/>
                        <input type="submit" value="Login" className="input"/>
                    </form>
                    <div>Don't have an account? <a onClick={this.goToSignup}>Sign up</a></div>
                </div>
            );
        }
    });

    var Signup = React.createClass({
        mixins: [LinkedStateMixin, History],
        getInitialState(){
            return {
                email: '',
                password: '',
                rePassword: '',
                message: ''
            }
        },
        checkIsNewUser(user){
            var data = JSON.parse(localStorage.getItem('markbook'));
            if (data != null) {
                var password = data[this.state.email];
                return _.isUndefined(password);
            }
            return true;
        },
        checkIsValidUser(){
            var email = this.state.email;
            var password = this.state.password;
            var rePassword = this.state.rePassword;
            var message = '';
            if (!this.checkIsNewUser(email)) {
                message = 'User already exists'
            }
            else if (password.length < 6) {
                message = 'Password should be at least 6 characters long'
            }
            else if (password !== rePassword) {
                message = 'Passwords do not match';
            }
            return message;
        },
        saveUserToLocalStorage(){
            var data = JSON.parse(localStorage.getItem('markbook'));
            data = data || {};
            data[this.state.email] = this.state.password;
            localStorage.setItem('markbook', JSON.stringify(data));
        },
        signUser(){
            var message = this.checkIsValidUser();
            if (message) {
                this.setState({
                    message: message
                });
            }
            else {
                this.saveUserToLocalStorage();
                this.history.push('/home');
            }
        },
        goToLogin(){
            this.history.push('/');
        },
        render () {
            return (
                <div>
                    <Header />
                    <form onSubmit={this.signUser}>
                        <input type="email" placeholder="Enter your email" valueLink={this.linkState('email')}
                               className="input"
                               required/>
                        <input type="password" placeholder="Choose password" valueLink={this.linkState('password')}
                               className="input"
                               required/>
                        <input type="password" placeholder="Repeat password" valueLink={this.linkState('rePassword')}
                               className="input"
                               required/>
                        <Error message={this.state.message}/>
                        <input type="submit" className="input" value="Create Account"/>
                    </form>
                    <div>Have an account? <a onClick={this.goToLogin}>Log in</a></div>
                </div>

            );
        }
    });

    var Header = React.createClass({
        render () {
            return (
                <div>
                    <img src='./images/site_logo.png'/>
                    <h1>MarkBook</h1>
                </div>
            );
        }
    });

    var Error = React.createClass({
        render(){
            return <div className="error">{this.props.message}</div>
        }
    })

    var Home = React.createClass({
        mixins: [History],
        goToLogin() {
            this.history.push('/');
        },
        render(){
            return (
                <button onClick={this.goToLogin}>Log out</button>
            );
        }
    });

    var routes = (
        <Router>
            <Route path="/" component={Login}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/home" component={Home}/>
        </Router>
    )


    ReactDOM.render(routes, root);
});
