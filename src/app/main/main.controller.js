(function() {
  'use strict';

  angular
    .module('connect4')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope) {
    $scope.MIN_TO_WIN = 4;
    $scope.numRows = 7;
    $scope.numCols = 6;
    $scope.activePlayerColor = 'black';
    $scope.playerColorToggle = {
      'black': 'red',
      'red': 'black'
    };

    $scope.onColumnHit = function(col) {
      if ($scope.winningColor != null) {
        $scope.newGame();
        return;
      }
      for (var i = $scope.boardItems.length - 1; i >= 0; i--) {
        if ($scope.boardItems[i][col] == 'clear') {
          $scope.boardItems[i][col] = $scope.activePlayerColor;
          $scope.activePlayerColor = $scope.playerColorToggle[$scope.activePlayerColor];
          $scope.updateGameStatus();
          return;
        }
      }
    };

    $scope.newGame = function() {
      if ($scope.numRows == 0) {
        $scope.numRows = $scope.MIN_TO_WIN;
      }
      if ($scope.numCols == 0) {
        $scope.numCols = $scope.MIN_TO_WIN;
      }
      $scope.numRows = Math.floor($scope.numRows);
      $scope.numCols = Math.floor($scope.numCols);
      $scope.boardItems = new Array($scope.numRows);
      $scope.winningColor = null;
      $scope.activePlayerColor = 'black';

      for (var i = 0; i < $scope.numRows; i++) {
        $scope.boardItems[i] = new Array($scope.numCols);
        for (var j = 0; j < $scope.numCols; j++) {
          $scope.boardItems[i][j] = 'clear';
        }
      }
    };
    $scope.newGameIfInactive = function() {
      if ($scope.winningColor != null) {
        $scope.newGame();
      }
    };

    var winDirections = [
      [0, 1], // up
      [0, -1], // down
      [-1, 0], // left
      [1, 0], // right
      [-1, 1], // up-left
      [1, 1], // up-right
      [-1, -1], // down-left
      [1, -1] // down-right
    ];
    $scope.updateGameStatus = function() {
      var boardItems = $scope.boardItems;
      for (var row = 0; row < boardItems.length; row++) {
        for (var col = 0; col < boardItems[row].length; col++) {
          var color = boardItems[row][col];
          if (color === 'clear') continue;
          $scope.winningColor = $scope.findWinningColor(row, col, color);
          if ($scope.winningColor) return;
        }
      }
    };
    $scope.findWinningColor = function(row, col, color) {
      var boardItems = $scope.boardItems;
      for (var i = 0; i < winDirections.length; i++) {
        var rowDelta = winDirections[i][1];
        var colDelta = winDirections[i][0];
        var newRow = row;
        var newCol = col;
        var numFilled = 1;

        for (var j = 0; j < $scope.MIN_TO_WIN; j++) {
          newRow += rowDelta;
          newCol += colDelta;
          if (newRow >= boardItems.length || newRow < 0 || newCol >= boardItems[newRow].length || newCol < 0) {
            continue;
          }
          if (boardItems[newRow][newCol] == color) {
            numFilled++;
          } else {
            break;
          }
        }

        if (numFilled === $scope.MIN_TO_WIN) {
          return color;
        }
      }
      return null;
    };

    $scope.newGame();
  }
})();
