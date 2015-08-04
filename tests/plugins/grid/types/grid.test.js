describe('GridType', function() {
    var DepBuilder = require.main.require('test-data/bootstrap/builder');
    var plugins = DepBuilder.loadPlugins(['grid']);
    var data;

    beforeEach(function() {
        data = DepBuilder.byFileName(__filename, plugins);
    });

    it('Instantiates correctly', function() {
        var grid = data.valueManager.get('smallGrid');
    });

    describe('getAllCellIds', function() {
        var grid;

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

});
