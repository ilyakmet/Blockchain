const Blockchain = require('./blockchain');
const Block = require('./block');




describe("Blockchain", () => {
    let blockchain;

    beforeEach(() => {
        blockchain = new Blockchain();
    });

    it('starts with the genesis block', () => {
        expect(blockchain.chain_[0]).toEqual(Block.genesis());
    });

    it('adds a new block', () => {
        const data = "foo";
        blockchain.addBlock(data);
        expect(blockchain.chain_[blockchain.chain_.length-1].data_).toEqual(data);
    });  
});