const crypto = require('crypto');


class Block {
  constructor (index_, data_, prevBlockHash_) {
    this.index_ = index_;
    this.timestamp_ = Date.now();
    this.data_ = data_;
    this.prevBlockHash_ = prevBlockHash_;
    this.hash_ = this.setHash();
  }

  setHash() {
    var headers = this.timestamp_ + this.data_ + this.prevBlockHash_;
    return crypto.createHmac('sha256', headers)
                        .digest('hex');

  }
}

module.exports.Block = Block;

class Blockchain {
  constructor () {
    this.activation = false;
    this.chainArray = [];
    this.chainDict = {};
    this.newGenesisBlock();
  }

  addBlock (data_) {
    var prevBlock = this.chainArray[this.chainArray.length - 1];
    var newBlock = new Block(this.chainArray.lenght, data_, prevBlock.hash_);
    this.chainArray.push(newBlock);
    this.chainDict[newBlock.hash_.toString()] = this.chainArray.length;
    
  }

  newGenesisBlock () {
    if (!this.activation) {
      var newBlock = new Block(0, 'Genesis Block', NaN);
      this.chainArray.push(newBlock);
      this.chainDict[newBlock.hash_] = 0;
      this.activation = true;
    }
  }
}

module.exports.Blockchain = Blockchain;