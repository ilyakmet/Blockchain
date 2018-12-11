# Blockchain
Blockchain Prototype on NodeJS

## Install dependencies
```
npm install
```
```
npm install nodemon --save-dev
```
## Nodes

### Start first node
```
$ HTTP_PORT=3001 P2P_PORT=5001 npm run dev
```

### Start second node
```
$ HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev
```

### Start another node
```
$ HTTP_PORT={HTTP_PORT} P2P_PORT={P2P_PORT} PEERS=ws://localhost:5001, ws://localhost:5002 npm run dev
```

## API commands

### Get blocks
```
$ curl -X GET \
  	http://localhost:3001/blocks
```

### Add blocks
```
$ curl -X POST \
	  http://localhost:3001/mine \
	  -H 'Content-Type: application/json' \
	  -d '{
		"data":"foo"
	}'
```
