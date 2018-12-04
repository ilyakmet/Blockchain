# Blockchain
Blockchain Prototype on NodeJS

## Getting started

### Import
```
const blockchain = require('./main');
```

### Create new blockchain
```
const newBlockchain = new blockchain.Blockchain();
```

### Add blocks
```
newBlockchain.addBlock('some data');
```

### Explore blocks
```
newBlockchain.chainArray_
```

### Get blockNumber by blockHash
```
newBlockchain.chainDict_['blockHash'];
```
