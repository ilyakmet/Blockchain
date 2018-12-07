const Block = require('./block');




class Blockchain {
    constructor() {
        this.chain_ = [Block.genesis()];
    }
  
    addBlock(data_) {
        const block = Block.mineBlock(this.chain_[this.chain_.length-1], data_);
        this.chain_.push(block);
        return block;
    }

    isValidChain(chain_) {
        if(JSON.stringify(chain_[0]) !== JSON.stringify(Block.genesis()))
            return false;
        for(let i = 1 ; i < chain_.length; i++) {
            const block = chain_[i];
            const lastBlock = chain_[i-1];
            if((block.lastHash_ !== lastBlock.hash_) || (block.hash_ !== Block.blockHash(block)))
            	return false;
        }
        return true;
    }

    replaceChain(newChain_) {
        if(newChain_.length <= this.chain_.length) {
            console.log("Recieved chain is not longer than the current chain");
            return;
        } else if(!this.isValidChain(newChain_)) {
            console.log("Recieved chain is invalid");
            return;
        }
        console.log("Replacing the current chain with new chain");
        this.chain_ = newChain_; 
    }
}

module.exports = Blockchain;