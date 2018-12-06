const SHA256 = require('crypto-js/sha256');




class Block{
    constructor(timestamp_, lastHash_, hash_, data_){
        this.timestamp_ = timestamp_;
        this.lastHash_ = lastHash_;
        this.hash_ = hash_;
        this.data_ = data_;
    }
    
    toString(){
        return `Block - 
        Timestamp : ${this.timestamp_}
        Last Hash : ${this.lastHash_.substring(0,10)}
        Hash      : ${this.hash_.substring(0,10)}
        Data      : ${this.data_}`;
    }
    
    static genesis(){
        return new this('Genesis time','----','genesis-hash',[]);
    }
    
    static hash(timestamp_, lastHash_, data_){
        return SHA256(`${timestamp_}${lastHash_}${data_}`).toString();
    }
    
    static mineBlock(lastBlock_, data_){
        let hash;
        let timestamp;
        const lastHash = lastBlock_.hash_;
        return new this(timestamp, lastHash, hash, data_);
    }
}

module.exports = Block;