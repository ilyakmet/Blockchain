const Block = require('./block');




class Blockchain{
    constructor(){
        this.chain_ = [Block.genesis()];
    }
  
    addBlock(data_){
        const block = Block.mineBlock(this.chain_[this.chain_.length-1], data_);
        this.chain_.push(block);
        return block;
    }
}

module.exports = Blockchain;