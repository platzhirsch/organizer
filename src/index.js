import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import './index.css';
import user from './data/person.svg';
import logout from './data/logout.svg';
import Login from './Login';
import Home from './home';
import Kurse from './kurse';
import Dozenten from './dozenten';
import ChangePwModal from './Modal';
import * as serviceWorker from './serviceWorker';

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}


class NavItemsHome extends React.Component{
    render() {
        return(
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <Link to={'/'} className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to={'/kurse'} className="nav-link">Kurse</Link>
                </li>
                <li className="nav-item">
                    <Link to={'/dozenten'} className="nav-link">Dozenten</Link>
                </li>
            </ul>
        )
    }
}

class NavItemsKurse extends React.Component{
    render() {
        return(
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to={'/'} className="nav-link">Home</Link>
                </li>
                <li className="nav-item active">
                    <Link to={'/kurse'} className="nav-link">Kurse</Link>
                </li>
                <li className="nav-item">
                    <Link to={'/dozenten'} className="nav-link">Dozenten</Link>
                </li>
            </ul>
        )
    }
}

class NavItemsDozenten extends React.Component{
    render() {
        return(
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to={'/'} className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to={'/kurse'} className="nav-link">Kurse</Link>
                </li>
                <li className="nav-item active">
                    <Link to={'/dozenten'} className="nav-link">Dozenten</Link>
                </li>
            </ul>
        )
    }
}


class Template extends React.Component{
    //Template which we will import in other views to display content.
    //this component needs an anchor to add components in the inside.
    constructor() {
        super();
        this.logoutUser = this.logoutUser;
      }

    logoutUser(){
        document.cookie = "token=; path=/;";
        window.location.reload();
    }
    render() {
        return(
            <div>
                <Router>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">

                        <a className="navbar-brand">
                            <img src="./logo.png" width="30" height="30" className="d-inline-block align-top" id="logo" alt="DHBW" />
                            DHBW <span id="stuggi">Stuttgart</span>
                        </a>




                            <div className="collapse navbar-collapse" id="navbarNav">
                                <Switch>
                                    <Route exact path='/' component={NavItemsHome} />
                                    <Route exact path='/kurse' component={NavItemsKurse} />
                                    <Route exact path='/dozenten' component={NavItemsDozenten} />
                                </Switch>
                            </div>

                            <div id="user">
                                <button id="userbutton" data-toggle="modal" data-target="#ChangePwModal">
                                    <img src={user} id="usericon" alt="" />
                                </button>
                            
                                {getCookie("user")}
                                <img src={logout} id="logout" alt="logout" onClick={this.logoutUser} />
                            </div>

                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                    </nav>

                    <div id="anchor">
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/kurse' component={Kurse} />
                        <Route path='/dozenten' component={Dozenten} />
                    </Switch>
                    </div>
                    <ChangePwModal />
                </Router>

            </div>


        );

      }

}



class Index extends React.Component{
    //Template which we will import in other views to display content.
    //this component needs an anchor to add components in the inside.
    constructor() {
        super();
        this.isAuth = this.isAuth;
        this.isAdmin = this.isAdmin;
    }

    isAuth(){
        if(getCookie("token").length<5){
            return false;

        } else {
            return true;

        }
    }
    isAdmin(){
        if(getCookie("user") == "Arnold@Schwarzenegger.com"){
            return true;
        } else{
            return false;
        }
    }

    render() {
        if(this.isAuth()){
            //Authentiziert
            if(this.isAdmin()){
                //Admin-Ansicht
                return(
                    <div>
                        <Router>
                            <Switch>
                                <Route exact path='/login' component={Login} />
                                <Route exact path='/' component={Template} />
                                <Route exact path='/kurse' component={Template} />
                                <Route exact path='/dozenten' component={Template} />
                            </Switch>
                        </Router>
                    </div>
                );
            } else {
                //Dozentenansicht

                //Modal von Felix zum Pw ändern nicht vergessen bei Dozententemplate

            }
        } else {
            return(
                <div>
                    <Router>
                        <Switch>
                            <Route exact path='/login' component={Login} />
                            <Redirect from="*" to="/login" />
                        </Switch>
                    </Router>
                </div>
            );
        }
    }
}


ReactDOM.render( <Index />, document.getElementById('root'));
// ReactDOM.render(<Login />, document.getElementById('root'));







// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

