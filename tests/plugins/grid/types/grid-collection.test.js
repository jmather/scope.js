describe('GridType', function() {
    var DepBuilder = require.main.require('test-data/bootstrap/builder');
    var plugins = DepBuilder.loadPlugins(['grid']);
    var data;

    beforeEach(function() {
        data = DepBuilder.byFileName(__filename, plugins);
    });

    it('Instantiates correctly', function() {
        var grid = data.valueManager.get('collection');
    });

    describe('getAllCellIds', function() {
        it('reports 9 cells, 1-1 through 3-3 for collection', function() {
            var expected = ['1-1', '1-2', '1-3', '2-1', '2-2', '2-3', '3-1', '3-2', '3-3'];
            var grid = data.valueManager.get('collection');
            var cells = grid.getAllCellIds();
            cells.should.eql(expected);
            cells.length.should.equal(9);
            cells[0].should.equal('1-1');
            cells[8].should.equal('3-3');
        });
    });

    describe('getAvailableCellIds', function() {
        it('reports 9 cells initially for collection', function() {
            var grid = data.valueManager.get('collection');
            grid.getAvailableCellIds().length.should.equal(9);
        });

        it('reports 8 once we have set a cell in grid1', function() {
            var grid = data.valueManager.get('collection');
            var grid1 = data.valueManager.get('grid1');
            grid1.setCell(1, 1, 'hello');
            grid.getAvailableCellIds().length.should.equal(8);
        });

        it('reports 7 once we have set a cell in grid1 and grid2', function() {
            var grid = data.valueManager.get('collection');

            var grid1 = data.valueManager.get('grid1');
            grid1.setCell(1, 1, 'hello');

            var grid2 = data.valueManager.get('grid2');
            grid2.setCell(1, 2, 'hello');

            grid.getAvailableCellIds().length.should.equal(7);
        });
    });

    describe('getOccupiedCellIds', function() {
        it('reports 0 cells initially for collection', function() {
            var grid = data.valueManager.get('collection');
            grid.getOccupiedCellIds().length.should.equal(0);
        });

        it('reports 1 cell once a value is set in grid1', function() {
            var grid = data.valueManager.get('collection');

            var grid1 = data.valueManager.get('grid1');
            grid1.setCell(1, 1, 'hello');

            grid.getOccupiedCellIds().length.should.equal(1);
        });

        it('reports 2 cells once a value is set in grid1 and grid2', function() {
            var grid = data.valueManager.get('collection');

            var grid1 = data.valueManager.get('grid1');
            grid1.setCell(1, 1, 'hello');

            var grid2 = data.valueManager.get('grid2');
            grid2.setCell(1, 2, 'hello');

            grid.getOccupiedCellIds().length.should.equal(2);
        });
    });

    describe('getValue', function() {
        it('returns no values when no values are set', function() {
            var grid = data.valueManager.get('collection');
            grid.getValue().should.eql({});
        });

        it('returns the values set in grid1', function() {
            var grid = data.valueManager.get('collection');

            var grid1 = data.valueManager.get('grid1');
            grid1.setCell(1, 1, 'hello');

            grid.getValue().should.eql({'1-1': 'hello'});
        });

        it('returns the values set in grid1 and grid2', function() {
            var grid = data.valueManager.get('collection');

            var grid1 = data.valueManager.get('grid1');
            grid1.setCell(1, 1, 'hello');

            var grid2 = data.valueManager.get('grid2');
            grid2.setCell(1, 2, 'hello');

            grid.getValue().should.eql({'1-1': 'hello', '1-2': 'hello'});
        });

        it('overwrites values from grid1 with values from grid2 when they overlap', function() {
            var grid = data.valueManager.get('collection');

            var grid1 = data.valueManager.get('grid1');
            grid1.setCell(1, 1, 'hello');

            var grid2 = data.valueManager.get('grid2');
            grid2.setCell(1, 1, 'goodbye');

            grid.getValue().should.eql({'1-1': 'goodbye'});
        });
    });
});
