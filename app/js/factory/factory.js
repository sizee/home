/**
 * Created by wht719582321 on 2016/9/20.
 */
// 公共方法
angular.module('myApp').factory('publicFunction', function ($state) {
    return {
        // 查询当前玩家是否死亡
        // 第一个值为查询的查询的状态，第二个值为查询的玩家
        inquireStatus: function (status, player) {
            // for(var i=0,length=player.status.length;i<length;i++){
            if (player.status == status) {

                return true
            } else {
                return false
            }
            // }
        },
        // 小图标显示隐藏
        show: function (index, currentSelectPlayer) {
            if (index == currentSelectPlayer) {
                return true
            } else {
                return false
            }
        },
        // 设置log
        // 当前时间、dats列表，当前角色，操作对象，玩家列表
        addLog: function (time, days, guideHitCount, role, currentSelectPlayer, playerList) {
            days[days.length - 1].time[time][role] = {
                death: (currentSelectPlayer + 1),
                deathRole: playerList[currentSelectPlayer].role,
                deathType: role + 'Death',
                killer: role
            };
            localStorage.days = JSON.stringify(days);

        },
        // 添加引导栏点击次数信息
        addGuideHitCount: function (guideHitCount, role) {
            guideHitCount[guideHitCount.length - 1].guideHit[role].hitCount = guideHitCount[guideHitCount.length - 1].guideHit[role].hitCount + 1;
            localStorage.guideHitCount = JSON.stringify(guideHitCount);
        },
        // 存储初始天数
        addInitDay: function (version) {
            var days = [{
                day: 1,
                time: {
                    nighttime: {},
                    daytime: {}
                }
            }];
            var guideHitCount = [
                {
                    day: 1,
                    guideHit: version.daysGuideCanClick
                }
            ];
            localStorage.days = JSON.stringify(days);
            localStorage.guideHitCount = JSON.stringify(guideHitCount);
        },
        // 添加天数
        addNextDay: function (days, guideHitCount, version) {
            days[days.length] = {
                day: days.length + 1,
                time: {
                    nighttime: {},
                    daytime: {}
                }
            };
            guideHitCount[guideHitCount.length] = {
                day: guideHitCount.length + 1,
                guideHit: version.daysGuideCanClick
            };
            localStorage.days = JSON.stringify(days);
            localStorage.guideHitCount = JSON.stringify(guideHitCount);
        },
        // 判断当前引导页是否可以跳转
        canClickOfDaysGuide: function (version, guide, guideHitCount, day, playerNum) {
            // 判断当前引导栏是否点击过
            if (guideHitCount[day - 1].guideHit[guide].hitCount >= 1) {
                alert("请进行游戏下一项活动");
                return false;
                // 判断当前引导栏是否能点击
            } else if (playerNum[guide] == 0) {
                alert("当前角色已去全部死亡，请进行游戏下一项活动");
                guideHitCount[day - 1].guideHit[guide].hitCount = guideHitCount[guideHitCount.length - 1].guideHit[guide].hitCount + 1;
                localStorage.guideHitCount = JSON.stringify(guideHitCount);
                return false;
            } else if (version.daysGuideCanClick[guide].canClick) {
                guideHitCount[day - 1].guideHit[guide].hitCount = guideHitCount[guideHitCount.length - 1].guideHit[guide].hitCount + 1;
                localStorage.guideHitCount = JSON.stringify(guideHitCount);
                return true;
                // 当前引导栏不能换点击，弹出提示
            } else {
                alert("请" + version.CN.daysGuideAlert[guide]);
                guideHitCount[day - 1].guideHit[guide].hitCount = guideHitCount[guideHitCount.length - 1].guideHit[guide].hitCount + 1;
                localStorage.guideHitCount = JSON.stringify(guideHitCount);
                return false
            }
        }
    }
});


// 角色点击事件
angular.module('myApp').factory('roleClick', function (publicFunction) {
    // return 0 输入有问题，需要重新选择杀人
    // return 1 杀死选中人
    // return 2 杀死杀人者
    return {
        // 版本选择
        // 捉鬼游戏简单版
        "11": function () {
            return {
                // 版本中角色
                vote: function (index, playerList, days, killerNUm, playerNum) {
                    // 判断当前玩家是否能点击
                    if (publicFunction.inquireStatus("death", playerList[index])) {
                        alert("当前玩家已死亡，请选择其他玩家");
                        return 0
                    } else {
                    }

                    playerList[index].status = "death";
                    playerList[index].maniPulate[playerList[index].maniPulate.length] = "vote";
                    // 改变角色存活数量
                    playerNum[playerList[index].role] = playerNum[playerList[index].role] - 1;
                    localStorage.playerNum = JSON.stringify(playerNum);
                    localStorage.playerList = JSON.stringify(playerList);
                    return 1
                }
            }
        }(),
        // 捉鬼游戏猜词版
        "12": function () {
            return {
                // 版本中角色
                vote: function (index, playerList, days, killerNUm, playerNum) {
                    if (publicFunction.inquireStatus("death", playerList[index])) {
                        alert("当前玩家已死亡，请选择其他玩家");
                        return 0
                    } else {
                    }
                    playerList[index].status = "death";
                    playerList[index].maniPulate[playerList[index].maniPulate.length] = "vote";
                    // 改变角色存活数量
                    playerNum[playerList[index].role] = playerNum[playerList[index].role] - 1;
                    localStorage.playerNum = JSON.stringify(playerNum);
                    localStorage.playerList = JSON.stringify(playerList);
                    return 1

                }
            }
        }(),
        // 捉鬼游戏杀人版
        "13": function () {
            return {
                // 该版本需判断被杀者是幽灵还是水民
                vote: function (index, playerList, days, killerNum, playerNum) {
                    // 被杀者为幽灵，被杀者死，被杀者为水民，杀人者死
                    if (publicFunction.inquireStatus("death", playerList[index])) {
                        alert("当前玩家已死亡，请选择其他玩家");
                        return 0
                    } else {
                    }
                    if (killerNum == undefined) {
                        alert("请输入杀人者序号");
                        return 0
                    } else if ((--killerNum) == index) {
                        alert("不能杀死自己，请选择其他玩家杀死或是检查输入杀人者序号是否正确");
                        return 0
                    }
                    if (playerList[index].role == "ghost") {
                        playerList[index].status = "death";
                        playerList[index].maniPulate[playerList[index].maniPulate.length] = "vote";
                        // 改变角色存活数量
                        playerNum[playerList[index].role] = playerNum[playerList[index].role] - 1;
                        localStorage.playerNum = JSON.stringify(playerNum);
                        localStorage.playerList = JSON.stringify(playerList);
                        return 1
                    } else if (playerList[index].role == "water") {
                        playerList[killerNum].status = "death";
                        playerList[killerNum].maniPulate[playerList[killerNum].maniPulate.length] = "vote";
                        playerNum[playerList[killerNum].role] = playerNum[playerList[killerNum].role] - 1;
                        localStorage.playerNum = JSON.stringify(playerNum);
                        localStorage.playerList = JSON.stringify(playerList);
                        return 2
                    }

                }
            }
        }(),
        // 杀人游戏
        // 杀人游戏简单版
        "21": function () {
            return {
                // 杀手
                killer: function (index, playerList, days, killerNum, playerNum) {
                    if (publicFunction.inquireStatus("death", playerList[index])) {
                        alert("当前玩家已死亡，请选择其他玩家");
                        return 0
                    } else {
                    }
                    if (playerList[index].role != "killer") {
                        playerList[index].status = "death";
                        playerList[index].maniPulate[playerList[index].maniPulate.length] = "killer";
                        // 改变角色存活数量
                        playerNum[playerList[index].role] = playerNum[playerList[index].role] - 1;
                        localStorage.playerNum = JSON.stringify(playerNum);
                        localStorage.playerList = JSON.stringify(playerList);
                        return 1
                    } else {
                        alert("你是杀手不能杀死本职业，请选择其他玩家杀死");
                        return 0
                    }

                },
                // 投票
                vote: function (index, playerList, days, killerNum, playerNum) {
                    if (publicFunction.inquireStatus("death", playerList[index])) {
                        alert("当前玩家已死亡，请选择其他玩家");
                        return 0
                    } else {
                    }

                    playerList[index].status = "death";
                    playerList[index].maniPulate[playerList[index].maniPulate.length] = "vote";
                    // 改变角色存活数量
                    playerNum[playerList[index].role] = playerNum[playerList[index].role] - 1;
                    localStorage.playerNum = JSON.stringify(playerNum);
                    localStorage.playerList = JSON.stringify(playerList);
                    return 1

                }
            }
        }(),
        // 杀人游戏警版
        "22": function () {
            return {
                // 杀手
                killer: function (index, playerList, days, killerNum, playerNum) {
                    if (publicFunction.inquireStatus("death", playerList[index])) {
                        alert("当前玩家已死亡，请选择其他玩家");
                        return 0
                    } else {
                    }

                    if (playerList[index].role != "killer") {
                        playerList[index].status = "death";
                        playerList[index].maniPulate[playerList[index].maniPulate.length] = "killer";
                        // 改变角色存活数量
                        playerNum[playerList[index].role] = playerNum[playerList[index].role] - 1;
                        localStorage.playerNum = JSON.stringify(playerNum);
                        localStorage.playerList = JSON.stringify(playerList);
                        return 1
                    } else {
                        alert("你是杀手不能杀死本职业，请选择其他玩家杀死");
                        return 0
                    }

                },
                // 警察
                police: function (index, playerList, days, killerNum, playerNum) {
                    if (publicFunction.inquireStatus("death", playerList[index])) {
                        alert("当前玩家已死亡，请选择其他玩家");
                        return 0
                    } else {
                    }

                    if (playerList[index].role != "police") {
                        playerList[index].maniPulate[playerList[index].maniPulate.length] = "police";
                        localStorage.playerList = JSON.stringify(playerList);
                        return 1
                    } else {
                        alert("该玩家是警察，请选择其他玩家查看身份");
                        return 0
                    }

                },
                // 投票
                vote: function (index, playerList, days, killerNum, playerNum) {
                    if (publicFunction.inquireStatus("death", playerList[index])) {
                        alert("当前玩家已死亡，请选择其他玩家");
                        return 0
                    } else {
                    }

                    playerList[index].status = "death";
                    playerList[index].maniPulate[playerList[index].maniPulate.length] = "vote";
                    // 改变角色存活数量
                    playerNum[playerList[index].role] = playerNum[playerList[index].role] - 1;
                    localStorage.playerNum = JSON.stringify(playerNum);
                    localStorage.playerList = JSON.stringify(playerList);
                    return 1
                }

            }
        }(),
        // 杀人游戏3.0
        "23": function () {
            return {
                // 杀手
                killer: function (index, playerList, days, killerNum, playerNum) {
                    if (publicFunction.inquireStatus("death", playerList[index])) {
                        alert("当前玩家已死亡，请选择其他玩家");
                        return 0
                    } else {
                    }

                    if (playerList[index].role != "killer") {
                        playerList[index].status = "death";
                        playerList[index].maniPulate[playerList[index].maniPulate.length] = "killer";
                        // 改变角色存活数量
                        playerNum[playerList[index].role] = playerNum[playerList[index].role] - 1;
                        localStorage.playerNum = JSON.stringify(playerNum);
                        localStorage.playerList = JSON.stringify(playerList);
                        return 1
                    } else {
                        alert("你是杀手不能杀死本职业，请选择其他玩家杀死");
                        return 0
                    }

                },
                // 警察
                police: function (index, playerList, days, killerNum, playerNum) {
                    if (publicFunction.inquireStatus("death", playerList[index])) {
                        alert("当前玩家已死亡，请选择其他玩家");
                        return 0
                    } else {
                    }

                    if (playerList[index].role != "police") {
                        playerList[index].maniPulate[playerList[index].maniPulate.length] = "police";
                        localStorage.playerList = JSON.stringify(playerList);
                        return 1
                    } else {
                        alert("该玩家时警察，请选择其他玩家查看身份");
                        return 0
                    }

                },
                // 狙击手
                sniper: function (index, playerList, days, killerNum, playerNum) {
                    if (publicFunction.inquireStatus("death", playerList[index])) {
                        alert("当前玩家已死亡，请选择其他玩家");
                        return 0
                    } else {
                    }

                    if (playerList[index].role != "sniper") {
                        playerList[index].status = "death";
                        playerList[index].maniPulate[playerList[index].maniPulate.length] = "sniper";
                        // 改变角色存活数量
                        playerNum[playerList[index].role] = playerNum[playerList[index].role] - 1;
                        localStorage.playerNum = JSON.stringify(playerNum);
                        localStorage.playerList = JSON.stringify(playerList);
                        return 1
                    } else {
                        alert("你是狙击手不能杀死本职业，请选择其他玩家杀死");
                        return 0
                    }

                },
                // 医生
                doctor: function (index, playerList, days, killerNum, playerNum) {
                    // 判断点击的玩家的生死状态
                    if (playerList[index].status == "death") {
                        // 如果是死亡，那么检查是否是今天杀手或狙击手杀死的，是的话复活他
                        for (var i in days[days.length-1].time.nighttime) {
                            if (days[days.length-1].time.nighttime[i].death == (index + 1)) {
                                playerList[index].status = "living";
                                playerList[index].maniPulate[playerList[index].maniPulate.length] = "doctor";
                                // 改变角色存活数量
                                playerNum[playerList[index].role] = playerNum[playerList[index].role] + 1;
                                localStorage.playerNum = JSON.stringify(playerNum);
                                localStorage.playerList = JSON.stringify(playerList);
                                return 1
                            }
                        }
                    } else if (playerList[index].status == "living") {
                        // 如果是存活，并且之前一天医生治疗过那么杀死
                        if (days[days.length - 1].time.nighttime.doctor.death == (index + 1)) {
                            playerList[index].status = "death";
                            playerList[index].maniPulate[playerList[index].maniPulate.length] = "doctor";
                            // 改变角色存活数量
                            playerNum[playerList[index].role] = playerNum[playerList[index].role] - 1;
                            localStorage.playerNum = JSON.stringify(playerNum);
                            localStorage.playerList = JSON.stringify(playerList);
                            return 1
                        } else {
                            // 没治疗过，加标记
                            playerList[index].maniPulate[playerList[index].maniPulate.length] = "doctor";
                            localStorage.playerList = JSON.stringify(playerList);
                            return 1
                        }
                    }
                },
                // 投票
                vote: function (index, playerList, days, killerNum, playerNum) {
                    if (publicFunction.inquireStatus("death", playerList[index])) {
                        alert("当前玩家已死亡，请选择其他玩家");
                        return 0
                    } else {
                    }

                    playerList[index].status = "death";
                    playerList[index].maniPulate[playerList[index].maniPulate.length] = "vote";
                    // 改变角色存活数量
                    playerNum[playerList[index].role] = playerNum[playerList[index].role] - 1;
                    localStorage.playerNum = JSON.stringify(playerNum);
                    localStorage.playerList = JSON.stringify(playerList);
                    return 1
                }

            }
        }()
    }
});
// 数组打乱

angular.module('myApp').factory('upset', function () {
    return function (playerName, playerNum) {
        var player = [];
        for (var x = 0; x < playerName.length; x++) {
            for (var i = 0; i < playerNum[playerName[x]]; i++) {
                player.push({name: playerName[x], condition: '存活'})
            }
        }
        player.sort(function () {
            return 0.5 - Math.random();
        });
        return player;
    }
});