import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/common/Header'
import './index.css'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import NotFound from './components/notfound/NotFound'
import List from './components/list/List'
import Detail from './components/detail/Detail'

const App = () => {
    const title = "React Coin"
    return (
        <BrowserRouter>
            <div>
                <Header/>
                {/* <div>
                    <h1>{title}</h1>
                    <p>Up to date crypto currencies data</p>
                </div> */}
                <Switch>
                    <Route path="/" component={List} exact/>
                    <Route path="/currency/:id" component={Detail} exact/>
                    <Route component={NotFound} exact/>
                </Switch>
            </div>
        </BrowserRouter>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById("root")
)