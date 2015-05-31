/*! unnameproject - v0.0.1 - 2015-04-29 */var unname = angular.module("unname", []);

(function(){"use strict";
	angular.module("unname").controller("stageCtrl", stageCtrl);

	function stageCtrl($scope, $http){



		function init(){
			$scope.useTemplates = {tableCells : [],
				characters : []};
			var tmplURL = './templates/';
			$scope.useTemplates.tableCells = {name: 'cellRows',
											url: tmplURL+'floord1.html'
										};
			$scope.blockCells= loadStage("first");
		}

		function loadStage(sategName, callback){
			$http.get("/accessStages/"+sategName).success(function(data, status, headers, config){
				return loadGrounds(data[0].rowArrays);
			}).
			error(function(data, status, headers, config) {
				console.log("Error by: ", data);
			});
		}

		function loadGrounds(rowToUse, callback){
			var tableStagev1 = [];
			var i, a;
			for(i = 0; i <12; i++){
				var rowCells = [];
				for(a = 0; a<14; a++){
					$http.get("/accessGrounds/"+rowToUse[(i*14)+a]).success(function(data, status, headers, config){
						rowCells[a] = data;
					}).
					error(function(data, status, headers, config) {
						console.log("Error by: ", data);
					});

				}
				tableStagev1[i] = {rowIndex: i, cells:rowCells};
			}
			return tableStagev1;
		}
		init();
	}
})();
