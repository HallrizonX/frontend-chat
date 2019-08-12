import React, {Component} from 'react';


class App extends Component {


    sendToSocket = function () {
        let message = document.body.getElementsByTagName('input')[0].value;

        window.userSocket.send(JSON.stringify({
            'message': message,
            'room': window.room,
        }));

    };

    getFromSocket = function () {
        window.userSocket.onmessage = function (data) {

            let msg = JSON.parse(data.data).message;
            let room = JSON.parse(data.data).room;

            let message_block = window.$("body #message").append(
                '<p>'+room +': ' +msg+'</p>'
            )
        };
    };

    startSocketConnection = function () {
        let DOMAIN = '127.0.0.1:8000';
        let custom_token = '64e637515d58bd20c4e433e1aa44355b5c99b826';

        window.room = 'ubisoft';
        window.userSocket = new WebSocket('ws://' + DOMAIN + '/ws/chat/?token=' + custom_token);

        window.userSocket.onclose = function (e) {
            console.error('Chat socket closed unexpectedly');
        };
    };


    constructor(props) {
        super(props);
        this.startSocketConnection();
        this.getFromSocket();
    }


    render() {

        return (
            <div>
                <div className="row">
                    <div className="col s9">
                        <input id={'message'}/>
                        <button onClick={this.sendToSocket}>Send</button>
                        <div id={'message'}>

                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default App;
