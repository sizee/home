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
                 templateUrl:'/home/views/main.html',
                 controller:"mainCtrl",
                 resolve:{
                     load:_lazyLoad([
                         'home/style/main.css',
                         'home/style/public.css',
                         'home/js/controller/main.js'
                     ])
                 },
                 redirectTo: 'person.home'
             })
        //主页home
            .state('person.home',{
                url:'/home',
                views:{
                    "":{
                        templateUrl:'/home/views/home.html',
                        controller:"homeCtrl as vm"
                    }
                },
                resolve:{
                    load:_lazyLoad([
                        '/home/style/main.css',
                        '/home/js/controller/homeCtrl.js'
                    ])
                }
            })
        //个人笔记
        .state('person.note',{
            url:'/note',
            views: {
                "": {
                    templateUrl: 'home/views/note.html',
                    controller: 'noteCtrl as vm'
                }
            },
            resolve:{
                load:_lazyLoad([
                    'home/style/node.css',
                    'home/js/controller/noteCtrl.js'
                ])
            }
        })
        //个人推荐
        .state('person.recommend',{
            url:'/recommend',
            views: {
                "": {
                    templateUrl: 'home/views/recommend.html',
                    controller: 'recommendCtrl as vm'
                }
            },
            templateUrl:'home/views/recommend.html',
            controller:'recommendCtrl as vm',
            resolve:{
                load:_lazyLoad([
                    'home/style/recommend.css',
                    'home/js/controller/recommendCtrl.js'
                ])
            }
        })
        //讨论分享
        .state('person.shall',{
            url:'/shall',
            views:{
                "":{
                    templateUrl:'home/views/shall.html',
                    controller:'shallCtrl as vm'
                }
            },
            resolve:{
                load:_lazyLoad([
                    'home/style/shall.css',
                    'home/js/controller/shallCtrl.js'
                ])
            }

        })
        $locationProvider.html5Mode(true);
    }])