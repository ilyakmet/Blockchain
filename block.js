const SHA256 = require('crypto-js/sha256');




class Block {
    constructor(timestamp_, lastHash_, hash_, data_){
        this.timestamp_ = timestamp_;
        this.lastHash_ = lastHash_;
        this.hash_ = hash_;
        this.data_ = data_;
    }
    
    toString(){
        return `[Timestamp : ${this.timestamp_}`
        + `\nLast Hash : ${this.lastHash_.substring(0,10)}`
        + `\nHash      : ${this.hash_.substring(0,10)}`
        + `\nData      : ${this.data_}]`;
    }
    
    static genesis() {
        return new this('Genesis time','----','genesis-hash',[]);
    }
    
    static hash(timestamp_, lastHash_, data_) {
        return SHA256(`${timestamp_}${lastHash_}${data_}`).toString();
    }
    
    static mineBlock(lastBlock_, data_) {
        let hash;
        let timestamp = Date.now();
        const lastHash = lastBlock_.hash_;
        hash = Block.hash(timestamp, lastHash, data_);
        return new this(timestamp, lastHash, hash, data_);
    }

    static blockHash(block_) {

        //destructuring
        const { timestamp_, lastHash_, data_ } = block_;
        return Block.hash(timestamp_, lastHash_, data_);
    }
}

module.exports = Block;