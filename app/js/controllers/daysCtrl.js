/**
 * Created by wht719582321 on 2016/10/1.
 */
angular.module('myApp').controller('daysCtrl', ["$state", "$scope", "gameService","publicFunction",
    function ($state, $scope, gameService,publicFunction) {
        var vm = this;

        // 后方页面所需数据处理
        vm.playerNum=JSON.parse(localStorage.playerNum);
        vm.playerNum.vote=1;
        localStorage.playerNum=JSON.stringify(vm.playerNum);
        // END

        // 获取版本ID
        vm.versionId=$state.params.versionId;
        // 获取存活人数信息
        vm.playerNum = JSON.parse(localStorage.playerNum);
        // 获取天数信息
        vm.days = JSON.parse(localStorage.days);
        // 获取获取引导栏点击次数信息
        vm.guideHitCount = JSON.parse(localStorage.guideHitCount);
        // 获取版本信息
        vm.version = gameService.getVersonList().then(function (res) {
            vm.version = res.data.data[vm.versionId];
        });
        // vm.nextTime=publicFunction.addNextDay;

        // 点击引导框
        vm.canJumpPage=function (guide,num,index,day) {
            // 判断当前引导框是否需要跳转
            if(publicFunction.canClickOfDaysGuide(vm.version,guide,vm.guideHitCount,day,vm.playerNum)){
                // 添加当前导引栏点击次数
                $state.go("gameTime",({versionId:vm.versionId,gameTime:vm.version.time[num],role:guide}));
            }else{
                // publicFunction.addGuideHitCount(vm.guideHitCount,guide);
                // alert("请"+vm.version.CN.daysGuideAlert[vm.version.daysGuide[0][index]])
            }
        }
    }]);