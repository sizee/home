/**
 * Created by Fly-mydream on 16.10.24.
 */
'use strict';
var app=angular.module('myApp',['oc.lazyLoad','ui.router','ngAnimate']);
    app.config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider','$locationProvider',function($stateProvider,$urlRouterProvider,$ocLazyLoadProvider,$locationProvider){

        var _lazyLoad=function(loaded){
            return function($ocLazyLoad){
                return $ocLazyLoad.load(loaded);
            }
        };

    $ocLazyLoadProvider.config({
        debug:false,
        events:true
    });
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('person',{
                 url:"",
                 templateUrl:'homePage/views/main.html',
                 controller:"mainCtrl",
                 resolve:{
                     load:_lazyLoad([
                         'homePage/style/main.css',
                         'homePage/style/public.css',
                         'homePage/js/controller/main.js'
                     ])
                 },
                 redirectTo: 'person.homePage'
             })

            .state('person.homePage',{
                url:'/home',
                views:{
                    "":{
                        templateUrl:'homePage/views/homePage.html',
                        controller:"homePageCtrl as vm"
                    }
                },
                resolve:{
                    load:_lazyLoad([
                        'homePage/style/main.css',
                        'homePage/js/controller/homePageCtrl.js'
                    ])
                }
            })
        //个人笔记
        .state('person.note',{
            url:'/note',
            views: {
                "": {
                    templateUrl: 'homePage/views/note.html',
                    controller: 'noteCtrl as vm'
                }
            },
            resolve:{
                load:_lazyLoad([
                    'homePage/style/node.css',
                    'homePage/js/controller/noteCtrl.js'
                ])
            }
        })
        //个人推荐
        .state('person.recommend',{
            url:'/recommend',
            views: {
                "": {
                    templateUrl: 'homePage/views/recommend.html',
                    controller: 'recommendCtrl as vm'
                }
            },
            templateUrl:'homePage/views/recommend.html',
            controller:'recommendCtrl as vm',
            resolve:{
                load:_lazyLoad([
                    'homePage/style/recommend.css',
                    'homePage/js/controller/recommendCtrl.js'
                ])
            }
        })
        //讨论分享
        .state('person.shall',{
            url:'/shall',
            views:{
                "":{
                    templateUrl:'homePage/views/shall.html',
                    controller:'shallCtrl as vm'
                }
            },
            resolve:{
                load:_lazyLoad([
                    'homePage/style/shall.css',
                    'homePage/js/controller/shallCtrl.js'
                ])
            }

        })
        $locationProvider.html5Mode(true);
    }])