describe('RepositoryType', function() {
    var DepBuilder = require.main.require('test-data/bootstrap/builder');
    var plugins = DepBuilder.loadPlugins(['entity', 'counter']);
    var data;

    beforeEach(function() {
        data = DepBuilder.byFileName(__filename, plugins);
    });

    describe('constructor', function() {
        it('Instantiates correctly', function() {
            var collection = data.valueManager.get('entity.thing');
        });

        it('sets the initial size to zero', function() {
            data.valueManager.get('entity.thing.size').getValue().should.equal(0);
        });

        it('sets the last id to zero', function() {
            data.valueManager.get('entity.thing.lastId').getValue().should.equal(0);
        });
    });

    describe('insert', function() {
        var repository, thing, ref;

        beforeEach(function() {
            repository = data.valueManager.get('entity.thing');
            thing = {a: 'b'};
            ref = repository.insert(thing);
        });

        it('returns a reference on insertion', function() {
            var expected = { value: 'entity.thing', id: 1 };
            ref.should.eql(expected);
        });

        it('increments the size by one', function() {
            data.valueManager.get('entity.thing.size').getValue().should.equal(1);
        });

        it('sets the lastId to 1', function() {
            data.valueManager.get('entity.thing.lastId').getValue().should.equal(1);
        });
    });

    describe('removeByReference', function() {
        var repository, thing, ref;

        beforeEach(function() {
            repository = data.valueManager.get('entity.thing');
            thing = {a: 'b'};
            ref = repository.insert(thing);
            repository.removeByReference(ref);
        });

        it('removes the entity from the repo', function() {
            var repoData = repository.getValue();

            (typeof repoData[ref.id]).should.equal("undefined");
        });

        it('reduces size back to zero', function() {
            data.valueManager.get('entity.thing.size').getValue().should.equal(0);
        });

        it('does not change lastId', function() {
            data.valueManager.get('entity.thing.lastId').getValue().should.equal(1);
        });
    });
});
