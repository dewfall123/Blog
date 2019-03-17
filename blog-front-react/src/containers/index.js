import React, { Component } from 'react';
import { notification } from 'antd';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

class App extends Component {

    constructor(props) {
        super(props);
        this.openNotification = this.openNotification.bind(this);
    }

    openNotification(type, message) {
        let that = this;
        notification[type]({
            message: message,
            onClose: () => {
                that.props.clear_msg();
            }
        });
        that.props.clear_msg();
    }

    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path='/404' component={NotFound}/>
                        <Route path='/admin' component={Admin}/>
                        <Route component={Front}/>
                    </Switch>
                    {/* {isFetching && <Loading/>} */}
                    {this.props.notification && this.props.notification.content ?
                        (this.props.notification.type === 1 ?
                            this.openNotification('success', this.props.notification.content) :
                            this.openNotification('error', this.props.notification.content)) :
                        null}
                </div>
            </Router>
        );
    }
}

export default App;
