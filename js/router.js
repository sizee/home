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
                 templateUrl:'views/main.html',
                 controller:"mainCtrl",
                 resolve:{
                     load:_lazyLoad([
                         'style/main.css',
                         'style/public.css',
                         'js/controller/main.js'
                     ])
                 },
                 redirectTo: 'person.home'
             })
        //主页home
            .state('person.home',{
                url:'/home',
                views:{
                    "":{
                        templateUrl:'views/home.html',
                        controller:"homeCtrl as vm"
                    }
                },
                resolve:{
                    load:_lazyLoad([
                        'style/main.css',
                        'js/controller/homeCtrl.js'
                    ])
                }
            })
        //个人笔记
        .state('person.note',{
            url:'/note',
            views: {
                "": {
                    templateUrl: 'views/note.html',
                    controller: 'noteCtrl as vm'
                }
            },
            resolve:{
                load:_lazyLoad([
                    'style/node.css',
                    'js/controller/noteCtrl.js'
                ])
            }
        })
        //个人推荐
        .state('person.recommend',{
            url:'/recommend',
            views: {
                "": {
                    templateUrl: 'views/recommend.html',
                    controller: 'recommendCtrl as vm'
                }
            },
            templateUrl:'views/recommend.html',
            controller:'recommendCtrl as vm',
            resolve:{
                load:_lazyLoad([
                    'style/recommend.css',
                    'js/controller/recommendCtrl.js'
                ])
            }
        })
        //讨论分享
        .state('person.shall',{
            url:'/shall',
            views:{
                "":{
                    templateUrl:'views/shall.html',
                    controller:'shallCtrl as vm'
                }
            },
            resolve:{
                load:_lazyLoad([
                    'style/shall.css',
                    'js/controller/shallCtrl.js'
                ])
            }

        })
        $locationProvider.html5Mode(true);
    }])