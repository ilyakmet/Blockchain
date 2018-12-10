const WebSocket = require('ws');

//declare the peer to peer server port 
const P2P_PORT = process.env.P2P_PORT || 5001;

//list of address to connect to
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];


class P2pserver{
    constructor(blockchain_) {
        this.blockchain_ = blockchain_;
        this.sockets_ = [];
    }

    // create a new p2p server and connections

    listen(){
        // create the p2p server with port as argument
        const server = new WebSocket.Server({ port: P2P_PORT });

        // event listener and a callback function for any new connection
        // on any new connection the current instance will send the current chain
        // to the newly connected peer
        server.on('connection', socket_ => this.connectSocket(socket_));

        // to connect to the peers that we have specified
        this.connectToPeers();
        console.log(`Listening for peer to peer connection on port : ${P2P_PORT}`);
    }

    // after making connection to a socket
    connectSocket(socket_){

        // push the socket too the socket array
        this.sockets_.push(socket_);
        console.log("Socket connected");

        // register a message event listener to the socket
        this.messageHandler(socket_);

        // on new connection send the blockchain chain to the peer
        this.sendChain(socket_);
    }

    connectToPeers() {
    	console.log('connectToPeers start');

        //connect to each peer
        peers.forEach(peer => {

            // create a socket for each peer
            const socket = new WebSocket(peer);
            
            // open event listner is emitted when a connection is established
            // saving the socket in the array
            socket.on('open',() => this.connectSocket(socket));
        });
    }

    messageHandler(socket_) {
        //on recieving a message execute a callback function
        socket_.on('message', message_ => {
            const data = JSON.parse(message_);
            // console.log("data ", data);
            this.blockchain_.replaceChain(data);
        });
	}

	/**
     * helper function to send the chain instance
     */

    sendChain(socket_){
        socket_.send(JSON.stringify(this.blockchain_.chain_));
    }

    /**
     * utility function to sync the chain
     * whenever a new block is added to
     * the blockchain
     */

    syncChain(){
        this.sockets_.forEach(socket_ =>{
            this.sendChain(socket_);
        });
    }

}

module.exports = P2pserver;