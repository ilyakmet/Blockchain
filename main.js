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
    this.activation_ = false;
    this.chainArray_ = [];
    this.chainDict_ = {};
    this.newGenesisBlock();
  }

  addBlock (data_) {
    var prevBlock = this.chainArray_[this.chainArray_.length - 1];
    var newBlock = new Block(this.chainArray_.length, data_, prevBlock.hash_);
    this.chainArray_.push(newBlock);
    this.chainDict_[newBlock.hash_.toString()] = this.chainArray_.length;
    
  }

  newGenesisBlock () {
    if (!this.activation_) {
      var newBlock = new Block(0, 'Genesis Block', NaN);
      this.chainArray_.push(newBlock);
      this.chainDict_[newBlock.hash_] = 0;
      this.activation_ = true;
    }
  }
}

module.exports.Blockchain = Blockchain;