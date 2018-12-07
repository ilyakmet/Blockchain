const Blockchain = require('./blockchain');
const Block = require('./block');




describe("Blockchain", () => {
    let blockchain;

    beforeEach(() => {
        blockchain = new Blockchain();
        blockchain2 = new Blockchain();
    });

    it('starts with the genesis block', () => {
        expect(blockchain.chain_[0]).toEqual(Block.genesis());
    });

    it('adds a new block', () => {
        const data = "foo";
        blockchain.addBlock(data);
        expect(blockchain.chain_[blockchain.chain_.length-1].data_).toEqual(data);
    });

    it('validates a valid chain',() => {
        blockchain2.addBlock('foo');
        // conventional method for check true and false is toBe
        expect(blockchain.isValidChain(blockchain2.chain_)).toBe(true);
    });

    it('invalidates a chain with a corrupt the genesis block',() => {
        blockchain2.chain_[0].data = 'bad data';
        expect(blockchain.isValidChain(blockchain2.chain_)).toBe(false);
    });

    it('invalidates a corrput chain',() => {
        blockchain2.addBlock('foo');
        blockchain2.chain_[1].data_ = 'not foo';
        expect(blockchain.isValidChain(blockchain2.chain_)).toBe(false);
    });
    
    it('replaces the chain with a valid chain',() => {
        blockchain2.addBlock('goo');
        blockchain.replaceChain(blockchain2.chain_);
        expect(blockchain.chain_).toEqual(blockchain2.chain_);
    });

    it('does not replaces the chain with a one with less than or equal to chain',() => {
        blockchain.addBlock('foo');
        blockchain.replaceChain(blockchain2.chain_);
        expect(blockchain.chain_).not.toEqual(blockchain2.chain_);
    });
});