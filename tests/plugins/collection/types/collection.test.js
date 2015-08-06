describe('CollectionType', function() {
    return;
    var DepBuilder = require.main.require('test-data/bootstrap/builder');
    var plugins = DepBuilder.loadPlugins(['collection', 'counter']);
    var data;

    beforeEach(function() {
        data = DepBuilder.byFileName(__filename, plugins);
    });

    it('Instantiates correctly', function() {
        var collection = data.valueManager.get('smallGrid');
    });

    describe('getAllCellIds', function() {
        it('reports 9 cells, 1-1 through 3-3 for smallGrid', function() {
            var expected = ['1-1', '1-2', '1-3', '2-1', '2-2', '2-3', '3-1', '3-2', '3-3'];
            var grid = data.valueManager.get('smallGrid');
            var cells = grid.getAllCellIds();
            cells.should.eql(expected);
            cells.length.should.equal(9);
            cells[0].should.equal('1-1');
            cells[8].should.equal('3-3');
        });

        it('reports 100 cells, 1-1 through 10-10 for largeGrid', function() {
            var grid = data.valueManager.get('largeGrid');
            grid.getAllCellIds().length.should.equal(100);
        });
    });

    describe('getAvailableCellIds', function() {
        it('reports 9 cells initially for smallGrid', function() {
            var grid = data.valueManager.get('smallGrid');
            grid.getAvailableCellIds().length.should.equal(9);
        });

        it('reports 8 once we have set a cell', function() {
            var grid = data.valueManager.get('smallGrid');
            grid.setCell(1, 1, 'hello');
            grid.getAvailableCellIds().length.should.equal(8);
        })
    });

    describe('getOccupiedCellIds', function() {
        it('reports 0 cells initially for smallGrid', function() {
            var grid = data.valueManager.get('smallGrid');
            grid.getOccupiedCellIds().length.should.equal(0);
        });

        it('reports 1 cell once set', function() {
            var grid = data.valueManager.get('smallGrid');

            grid.setCell(1, 1, 'hello');

            grid.getOccupiedCellIds().length.should.equal(1);
        });
    });

    describe('getCell', function() {
        var grid;

        beforeEach(function() {
            grid = data.valueManager.get('smallGrid');
        });

        it('returns null when not set', function() {
            (grid.getCell(1, 1) === null).should.equal(true);
        });

        it('returns the assigned value when set', function() {
            var data = {test: "payload"};
            grid.setCell(1, 1, data);

            grid.getCell(1, 1).should.eql(data);
        });
    });

    describe('setCell', function() {
        var grid;

        beforeEach(function() {
            grid = data.valueManager.get('smallGrid');
        });

        it('it returns null on first assignment', function() {
            var data = {test: "payload"};
            (grid.setCell(1, 1, data) === null).should.equal(true);
        });

        it('it returns the prior value on next assignment', function() {
            var data = {test: "payload"};

            grid.setCell(1, 1, data);
            grid.setCell(1, 1, true).should.eql(data);
        });
    })
});
