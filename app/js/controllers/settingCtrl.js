/**
 * Created by wht719582321 on 2016/10/1.
 */
angular.module('myApp',[])
    .controller("settingCtrl",['$scope','$stateParams','$location','gameService',function($scope,$stateParams,$location,gameService,upset){
        var vm = this;
        var gameVersionId=$stateParams.versionId;
        gameService.getVersonList().then(function(res){

            vm.versionList=res.data.data[gameVersionId];
        });

             vm.playerAllot=function(){
                 if((gameVersionId==11||gameVersionId==12||gameVersionId==13)&&(!vm.showSpiritWord||!vm.showWaterWord))
                    {
                     alert("请输入水民词组与幽灵词组");
                        return;
                    }
                 else if(vm.versionList.playerNumDefault<vm.versionList.numMin||vm.versionList.playerNumDefault>vm.versionList.numMax)
                     {
                         alert("请输入玩家数量。");
                         return;
                     }
                 else
                     {
                     var playerNum = vm.versionList.playerNum[vm.versionList.playerNumDefault];
                     var playerRole = vm.versionList.role;
                         /*playerArr 存储玩家角色*/
                     var playerArr=[] ;
                         playerArr=gameService.setPlayerArr(playerNum,playerRole);
                     var abc = function () {return Math.random() > .5 ? -1 : 1};
                         playerArr = playerArr.sort(abc);
                         /*setOrderPlayerArr 存储打乱后的的玩家角色数组*/
                     var nowOrderArr = [];
                     var roleWater=vm.showWaterWord;
                     var roleSpirit=vm.showSpiritWord;
                         nowOrderArr=gameService.setOrderPlayerArr(playerArr,roleWater,roleSpirit,gameVersionId);
                         /*将玩家信息数组压入本地ocal Storage*/
                         localStorage.playerList = JSON.stringify(nowOrderArr);
                         nowArr=null;
                     var nowOrderNum=[];
                         nowOrderNum=gameService.setplayerNum(playerNum,playerRole);
                         localStorage.playerNum = JSON.stringify(nowOrderNum);
                         nowOrderNum=null;
                         playerArr=null;
                     }
                 if(playerArr==null)
                     $location.path("viewCard");

             }
    }]);

