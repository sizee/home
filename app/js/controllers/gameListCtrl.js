/**
 * Created by wht719582321 on 2016/9/30.
 */
angular.module('myApp').controller('gameListCtrl',['$scope','$state','gameService',function ($scope,$state,gameService) {
    var vm = this;
    var lastGame=$state.params.versionId;
    gameService.getGameList().then(function (res) {
        vm.gameList=res.data;
    });
    gameService.getVersonList().then(function(res){
        if(lastGame==undefined)
        {
            vm.gameService="请点击按钮开始游戏";
            vm.judeg=false;
        }else{
            vm.gameService="上次游戏:"+(res.data.data[lastGame].title);
            vm.judeg=true;
        }
    });

    $scope.active=[true,false,false,false];
    $scope.aaa=0;
    $scope.side=false;
    $scope.changeAdd=function(){
        $scope.aaa++;
        if($scope.aaa==$scope.active.length)
        {
            $scope.aaa=0;
        }
        for(var i=0,length=$scope.active.length;i<length;i++) {
            if(i==$scope.aaa){
                $scope.active[i]=true;
            }else{
                $scope.active[i]=false;
            }
        }
    }
    $scope.changeDel=function(){
        $scope.aaa--;
        if($scope.aaa==-1)
        {
            $scope.aaa=3;
        }
        for(var i=0,length=$scope.active.length;i<length;i++) {
            if(i==$scope.aaa){
                $scope.active[i]=true;
            }else{
                $scope.active[i]=false;
            }
        }
    }
}]);