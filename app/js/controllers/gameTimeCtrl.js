/**
 * Created by wht719582321 on 2016/10/3.
 */
angular.module('myApp').controller('gameTimeCtrl',
    ["$state", "$scope", "gameService","roleClick","publicFunction",
    function ($state, $scope, gameService,roleClick,publicFunction) {
        var vm = this;

        // 获取玩家列表
        vm.playerList=JSON.parse(localStorage.playerList);
        // 获取天数信息
        vm.days=JSON.parse(localStorage.days);
        // 获取导引栏点击次数信息
        vm.guideHitCount=JSON.parse(localStorage.guideHitCount);
        // 获取存活人数信息
        vm.playerNum = JSON.parse(localStorage.playerNum);
        // 获取版本ID
        vm.versionId = $state.params.versionId;
        // 获取游戏配置
        vm.version = gameService.getVersonList().then(function (res) {
            vm.version = res.data.data[vm.versionId];
        });
        vm.time = $state.params.gameTime;
        vm.role = $state.params.role;
        // 获取角色点击事件
        vm.click=roleClick[vm.versionId][vm.role];
        // 杀人序号
        vm.killerNum;
        // 获取查询存活状态方法
        vm.inquireStatus=publicFunction.inquireStatus;

        // 改变当前点击选择的玩家
        vm.selectPlayer=function (index) {
            vm.currentSelectPlayer=index;
        };

        // 判断是否为最后一项，是的话添加下一天
        var isLastGuide=function (res) {
            if(vm.role==vm.version.lastGuide){
                publicFunction.addNextDay(vm.days,vm.guideHitCount,vm.version);
            }else{
            }
        };
        // 新添加功能待模块化
        // 判断最后一引导栏是否死亡，是的话判断当前框是否为倒数
        var canChangePlayerNum=function (res) {

              for (var x=(vm.version.daysGuideObject[vm.time].length);x>=0;x--){
                  console.log(x);
                  console.log(vm.playerNum[vm.version.daysGuideObject[vm.time][x-1]] == 0);
                  console.log(vm.version.daysGuideObject[vm.time][x-1] != vm.role);
                  if(vm.playerNum[vm.version.daysGuideObject[vm.time][x-1]]!=0&&vm.version.daysGuideObject[vm.time][x-1]!=vm.role){
                      break
                  }else if(vm.playerNum[vm.version.daysGuideObject[vm.time][x-1]]==0&&vm.version.daysGuideObject[vm.time][x-1]!=vm.role){
                      continue
                  }else if(vm.playerNum[vm.version.daysGuideObject[vm.time][x-1]]!=0&&vm.version.daysGuideObject[vm.time][x-1]==vm.role){
                      for(var i in vm.days[vm.days.length-1].time[vm.time]){
                          console.log(i);
                          vm.playerNum[vm.days[vm.days.length-1].time[vm.time][i].deathRole]=vm.playerNum[vm.days[vm.days.length-1].time[vm.time][i].deathRole]+vm.days[vm.days.length-1].time[vm.time][i].selectPlayerChange;
                          localStorage.playerNum=JSON.stringify(vm.playerNum)
                      }
                      break
                  }
              }
        };
        // 小图标显示隐藏
        vm.show=publicFunction.show;

        // vm.confirm=publicFunction.confirm;
        vm.confirm=function () {
            // 调用角色函数
            var res=roleClick[vm.versionId][vm.role](vm.currentSelectPlayer,vm.playerList,vm.days,vm.killerNum,vm.role,vm.playerNum);
            if (res.canJumpNext){
                // 捉鬼游戏被杀者死亡时OR正常游戏版本时返回值

                publicFunction.updatePlayerList(vm.playerList,res);
                // 添加游戏Log
                publicFunction.addLog(vm.time,vm.days,vm.guideHitCount,res,vm.playerList);
                // 判断是否为最后一个
                canChangePlayerNum(res);
                // 判断是否为最后一项，是的话添加下一天
                isLastGuide(res);
                // 跳转页面
                $state.go("days",{versionId:vm.versionId})
            }else if(res.canJumpNext){}
        };

    }]);
