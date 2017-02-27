var app = angular.module('myApp', []);


app.filter("to_trusted", ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);


app.directive('repeatFinish', function ($timeout) {
    return {
        link: function (scope, element, attr) {
            if (scope.$last == true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    }
})


app.controller('mainPageCtrl', function ($scope, $http, $rootScope) {
    $scope.ctrlScope = $scope;
    $scope.regionSelectVisible = false;
    $scope.regionSelect2Visible = false;
    $scope.regionSelect3Visible = false;
    $scope.searchFormVisible = false;
    $scope.searchContentFormVisible = false;
    $scope.qusetionContentFormVisible = false;
    $scope.index1Visible = true;
    $scope.culumns2Title = "法律法规";
    $scope.currentRegion = { id: "", value: "全国" };
    $scope.regionOption = { id: "", value: "全国" };
    $scope.searchType = { value: "小微企业库", id: "5" };
    $scope.searchKeyWords = "";
    $scope.hotWords = [];
    $scope.columnVisible = [false, false, false, false, false, false, false];
    $scope.columnDetailVisible = [false, false, false, false, false, false, false];
    $scope.column1ShowData = [];
    $scope.navigationBarVisible = [true, false, false, false];
    $scope.coulumn1List = {};
    $scope.coulumn2List = {};
    $scope.coulumn3List = {};
    $scope.coulumn2NextChannals = {};
    $scope.coulumn2NextChannalsContent = {};
    getNavigation();
    if (localStorage.getItem("historySearch")) {
        $scope.historySearch = JSON.parse(localStorage.getItem("historySearch")).item;
    }

    $scope.clear = function () {
        localStorage.removeItem('historySearch');
        $scope.historySearch = "";
    };

    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        $scope.mySwiper();
    });

    $scope.mySwiper=function () {
        mySwiper = new Swiper('#coulumn2NextChannals', {
            slidesPerView: 'auto',
            spaceBetween: 0,
            initialSlide: 1,
            observer: true,//修改swiper自己或子元素时，自动初始化swiper
            observeParents: true,//修改swiper的父元素时，自动初始化swiper
            onInit: function (swiper) {
                //Swiper初始化了
                swiper.slideTo(0, 0, false);
            },
        })
    }
    //$scope.coulumn2NavigationRenderFinish = function () {
    //    $scope.culumns2Title = $("#first").text();
    //}
    $scope.resetNavigation = function (item) {
        $scope.navigationBarVisible = [false, false, false, false];
        $scope.navigationBarVisible[item] = true;
    };
    $scope.regionSelect = function () {
        $scope.regionSelectVisible = !$scope.regionSelectVisible;
        $scope.index1Visible = !$scope.index1Visible;
    };
    $scope.regionSelect2 = function () {
        $scope.regionSelect2Visible = !$scope.regionSelect2Visible;
        $scope.columnVisible[3] = !$scope.columnVisible[3];
    };
    $scope.regionSelect3 = function () {
        $scope.regionSelect3Visible = !$scope.regionSelect3Visible;
        $scope.columnVisible[4] = !$scope.columnVisible[4];
    };
    $scope.showSearchForm = function () {
        $scope.searchFormVisible = !$scope.searchFormVisible;
        $scope.index1Visible = !$scope.index1Visible;
        if ($scope.searchFormVisible == true) {
            $scope.startSearch = true;
        }
        else {
            $scope.startSearch = false;
        }
    };
    $scope.columnShow = function (index) {
        window.scrollTo(0, 0);
        $scope.columnVisible[index] = !$scope.columnVisible[index];
        $scope.index1Visible = !$scope.index1Visible;
    };
    $scope.columnDetailBackClick = function (index) {
        $scope.columnDetailVisible[index] = false;
        if ($scope.startSearch == true)
        {
            $scope.searchContentFormVisible = true;
        }
        else
        {
            $scope.columnVisible[index] = true;
        }
    };
    $scope.changeColumnsContent = function (key, index) {
        $scope.culumns2Title = index;
        $scope.currentShowKey = key;
        $scope.getColumn2SecondChannel(key);
    };
    $scope.backQuestion = function () {
        $scope.columnVisible[6] = true;
        $scope.qusetionContentFormVisible = false;
    };
    $scope.showQuestion = function (key) {
        $scope.columnVisible[6] = false;
        $scope.qusetionContentFormVisible = true;
        Loading.show();
        $http({
            url: QuerySurveys,
            method: 'POST',
            data: {
                Id: key,
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            transformRequest: function (data) {
                return $.param(data);
            },
        }).success(function (data, header, config, status) {
            $scope.serveralList = data.result
            $scope.questionlist = {};
            var surveySwiper = new Swiper('#survey', {
                observer: true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents: true,//修改swiper的父元素时，自动初始化swiper
                slidesPerView: 1,
                onSlideChangeEnd: function (swiper) {
                    if (swiper.activeIndex == swiper.slides.length - 1) {
                        $('#survey .next').text("提交");
                        $('#survey .next').unbind();
                        $('#survey .next').click(function () {
                            console.log($scope.questionlist);
                            var anwserString = "";
                            var answerLength = 0
                            for(var o in $scope.questionlist)
                            {
                                var singleAnswer = "";
                                for(var i=0 ;i < $scope.questionlist[o].length;i++)
                                {
                                    if(i==0)
                                    {
                                        singleAnswer = singleAnswer + $scope.questionlist[o][i]
                                    }
                                    else{
                                        singleAnswer = singleAnswer +","+ $scope.questionlist[o][i]
                                    }
                                    answerLength++;
                                }
                                anwserString = anwserString + o + "," + singleAnswer + "|";
                            }
                            console.log(anwserString);
                            if (answerLength == $scope.serveralList.length) {
                                $("#backQuestion").click();
                                $http({
                                    url: SaveSurvey,
                                    method: 'POST',
                                    data: {
                                        SerId: key,
                                        Surlds: anwserString,
                                    },
                                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                    transformRequest: function (data) {
                                        return $.param(data);
                                    },
                                }).success(function (data, header, config, status) {
                                    //响应成功
                                    TipsAlert.new("提示", "调查表提交成功").show();
                                }).error(function (data, header, config, status) {
                                    //处理响应失败
                                    TipsAlert.new("提示", "请求数据失败").show();
                                });
                            }
                            else {
                                $(".tipsBackground").remove();
                                TipsAlert.new("提示", "未全部完成调查").show();
                            }
                        });
                    } //切换结束时，告诉我现在是第几个slide
                    else {
                        $('#survey .next').text("下一题");
                        $('#survey .next').unbind();
                        $('#survey .next').click(function () {
                            surveySwiper.slideNext();
                        });
                    }
                },
                onInit: function (swiper) {
                    //Swiper初始化了
                    //alert(swiper.activeIndex);提示Swiper的当前索引
                    swiper.slideTo(1, 0);
                    swiper.slideTo(0, 0);
                }

            });
            //surveySwiper.slideTo(1, 0);
            //surveySwiper.slideTo(1, 0);
            $('#survey .next').click(function () {
                surveySwiper.slideNext();
            })
            Loading.hide();
        }).error(function (data, header, config, status) {
            //处理响应失败
            $(".tipsBackground").remove();
            TipsAlert.new("提示", "请求数据失败").show();
        });
    };
    $scope.changeAwserList = function (questionId, answerId) {
        if ($("#" + answerId + "").is(':checked')) {
            if ($("#" + answerId + "").attr("type") == "checkbox") {
                if ($scope.questionlist[questionId]) {
                    $scope.questionlist[questionId].push(answerId);
                }
                else {
                    $scope.questionlist[questionId] = [];
                    $scope.questionlist[questionId].push(answerId);
                }
            }
            else {
                $scope.questionlist[questionId] = [];
                $scope.questionlist[questionId].push(answerId);
            }
        }
        else {
            $scope.questionlist[questionId].removeByValue(answerId);
        }
    };
    $scope.changeSearchContent = function (index, id) {
        $scope.searchType = { value: index, id: id };
        //switch (index) {
        //    case "法律法规":
        //        break;
        //    case "国务院文件":
        //        break;
        //    case "部门文件":
        //        break;
        //}
    };
    $scope.setRegion = function (key, value) {
        $scope.currentRegion.id = key;
        $scope.currentRegion.value = value;
        getNavigation();
        $scope.regionSelect();
    };
    $scope.setRegion2 = function (key, value) {
        $scope.regionOption.id = key;
        $scope.regionOption.value = value;
        $scope.regionSelect2();
    };
    $scope.setRegion3 = function (key, value) {
        $scope.regionOption.id = key;
        $scope.regionOption.value = value;
        $scope.regionSelect3();
    };
    $scope.setInputHotsWord = function (item) {
        $scope.searchKeyWords = item;
    };
    $scope.setColumn1Show = function (key) {
        $scope.currentkey = key;
    };
    $scope.setLocalStorage = function () {
        var historySearch = {};
        if (!localStorage.getItem("historySearch")) {
            var historySearchArray = [];
            historySearchArray.push($scope.searchKeyWords);
            historySearch.item = historySearchArray;
            localStorage.setItem("historySearch", JSON.stringify(historySearch));
        }
        else {
            historySearch = JSON.parse(localStorage.getItem("historySearch"));
            for (var i = 0; i < historySearch.item.length; i++) {
                if (historySearch.item[i] == $scope.searchKeyWords)
                {
                    return;
                }
            }
            historySearch.item.push($scope.searchKeyWords);
            localStorage.setItem("historySearch", JSON.stringify(historySearch));
        }
    };
    //点击搜索后，根据关键字和栏目类别显示搜索内容
    $scope.searchBtnClick = function (item) {
        if ($scope.searchKeyWords == "") {
            alert("请输入关键字");
            return;
        };
        $scope.setLocalStorage();
        $scope.historySearch = JSON.parse(localStorage.getItem("historySearch")).item;
        $scope.searchFormVisible = !$scope.searchFormVisible;
        $scope.searchContentFormVisible = !$scope.searchContentFormVisible;
        Loading.show();
        $http({
            url: QueryXwInfo,
            method: 'POST',
            data: {
                Q: $scope.searchKeyWords,
                Organ: $scope.currentRegion.id,
                Type: $scope.searchType.id
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            transformRequest: function (data) {
                return $.param(data);
            },
        }).success(function (data, header, config, status) {
            //响应成功
            $scope.searchFormList = data.result;
            Loading.hide()
        }).error(function (data, header, config, status) {
            //处理响应失败
            $(".tipsBackground").remove();
            TipsAlert.new("提示", "请求数据失败").show();
        });
    };
    $scope.searchBackBtnClick = function (item) {
        $scope.searchFormVisible = !$scope.searchFormVisible;
        $scope.searchContentFormVisible = !$scope.searchContentFormVisible;
    };


    //获取区域列表
    $http({
        url: QueryOrgan,
        method: 'POST'
    }).success(function (data, header, config, status) {
        //响应成功
        $scope.regionData = data.result;
    }).error(function (data, header, config, status) {
        //处理响应失败
        $(".tipsBackground").remove();
        TipsAlert.new("提示", "请求数据失败").show();
    });


    //获取热点关键字
    $http({
        url: QueryHotwords,
        method: 'POST',
        data: {
            Organ: $scope.currentRegion,
            HotNumb: 10
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        transformRequest: function (data) {
            return $.param(data);
        },
    }).success(function (data, header, config, status) {
        //响应成功
        $scope.hotWords = data.result;
    }).error(function (data, header, config, status) {
        //处理响应失败
        $(".tipsBackground").remove();
        TipsAlert.new("提示", "请求数据失败").show();
    });

    //显示并获取各栏目详情内容
    $scope.showColumnData = function (columnId, id) {
        if (columnId == -1)
        {
            columnId = $scope.searchType.id -1
        }
        $scope.columnDetailVisible[columnId] = true;
        $scope.columnVisible[columnId] = false;
        $scope.searchContentFormVisible = false;
        Loading.show();
        window.scrollTo(0, 0);
        $http({
            url: QueryXwDetail,
            method: 'POST',
            data: {
                Id: id,
                Type: columnId + 1
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            transformRequest: function (data) {
                return $.param(data);
            },
        }).success(function (data, header, config, status) {
            //响应成功
            $scope.coulummnDetails = data.result;
            Loading.hide()
        }).error(function (data, header, config, status) {
            //处理响应失败
            $(".tipsBackground").remove();
            TipsAlert.new("提示", "请求数据失败").show();
        });
    };

    //获取栏目二二级导航
    $scope.getColumn2SecondChannel = function (o) {
            $http({
                url: QueryChannals,
                method: 'POST',
                data: {
                    Organ: $scope.currentRegion.id,
                    Id: o
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (data) {
                    return $.param(data);
                },
            }).success(function (data, header, config, status) {
                $scope.coulumn2NextChannals = data.result;
            }).error(function (data, header, config, status) {
                //处理响应失败
                $(".tipsBackground").remove();
                TipsAlert.new("提示", "请求数据失败").show();
            });
    };

    //获取栏目二二级导航列表
    $scope.getColumn2SecondChannelList = function (o) {
            $http({
                url: QueryDoucemnts,
                method: 'POST',
                data: {
                    Organ: $scope.currentRegion.id,
                    Id: o,
                    PageSize: 50
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (data) {
                    return $.param(data);
                },
            }).success(function (data, header, config, status) {

                //响应成功
                $scope.coulumn2NextChannalsContent = data.result;
            }).error(function (data, header, config, status) {
                //处理响应失败
                $(".tipsBackground").remove();
                TipsAlert.new("提示", "请求数据失败").show();
            });
    };


    function getNavigation() {
        //显示并获取各栏目导航
        $http({
            url: QueryChannals,
            method: 'POST',
            data: {
                Organ: $scope.currentRegion.id,
                Id: "0"
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            transformRequest: function (data) {
                return $.param(data);
            },
        }).success(function (data, header, config, status) {

            //响应成功
            $scope.navigationId = data.result;
            $scope.navigationIdGroup = [];
            for (var id in $scope.navigationId) {
                $scope.navigationIdGroup.push(id)
            }
            getDataByRegion();
        }).error(function (data, header, config, status) {
            //处理响应失败
            $(".tipsBackground").remove();
            TipsAlert.new("提示", "请求数据失败").show();
        });
    }

    $scope.getInformationByKey = function (id) {
        $http({
            url: QueryXwInfo,
            method: 'POST',
            data: {
                Organ: $scope.regionOption.id,
                Type: id,
                Q: $(".searchInfo:visible").val()
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            transformRequest: function (data) {
                return $.param(data);
            },
        }).success(function (data, header, config, status) {
            if (status.data.Type == "4") {
                $scope.column4Data = divideReponseData(data);
                $scope.column4ShowData = $scope.column4Data[0];
                if (data.code == "200") {
                    if ($scope.column4ShowData == "") {
                        TipsAlert.new("提示", "请输入更为详细的查询条件").show();
                    }
                }
            }
            else {
                $scope.column5Data = divideReponseData(data);
                $scope.column5ShowData = $scope.column5Data[0];
                if (data.code == "200") {
                    if ($scope.column5ShowData == "") {
                        TipsAlert.new("提示", "请输入更为详细的查询条件").show();
                    }
                }
            }
        }).error(function (data, header, config, status) {
            //处理响应失败
            $(".tipsBackground").remove();
            TipsAlert.new("提示", "请求数据失败").show();
        });
    }


    //根据区域的变化改变各栏的信息
    function getDataByRegion() {


        //获取企业享受扶持信息列表
        $http({
            url: QueryXwInfo,
            method: 'POST',
            data: {
                Organ: $scope.currentRegion.id,
                Type: "4"
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            transformRequest: function (data) {
                return $.param(data);
            },
        }).success(function (data, header, config, status) {
            $scope.column4Data = divideReponseData(data);
            $scope.column4ShowData = $scope.column4Data[0];
        }).error(function (data, header, config, status) {
            //处理响应失败
            $(".tipsBackground").remove();
            TipsAlert.new("提示", "请求数据失败").show();
        });


        //获取小微企业库列表
        $http({
            url: QueryXwInfo,
            method: 'POST',
            data: {
                Organ: $scope.currentRegion.id,
                Type: "5"
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            transformRequest: function (data) {
                return $.param(data);
            },
        }).success(function (data, header, config, status) {
            $scope.column5Data = divideReponseData(data);
            $scope.column5ShowData = $scope.column5Data[0];
        }).error(function (data, header, config, status) {
            //处理响应失败
            $(".tipsBackground").remove();
            TipsAlert.new("提示", "请求数据失败").show();
        });

        //显示并获取图片新闻
        $http({
            url: QueryChannals,
            method: 'POST',
            data: {
                Organ: $scope.currentRegion.id,
                Id: $scope.navigationIdGroup[1]
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            transformRequest: function (data) {
                return $.param(data);
            },
        }).success(function (data, header, config, status) {

            //响应成功
            $scope.coulumn1ImageNavigation = data.result;
            new Swiper('#tabs-823288', {
                slidesPerView: 'auto',
                spaceBetween: 0,
                observer: true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents: true,//修改swiper的父元素时，自动初始化swiper
            });
            for (var o in $scope.coulumn1ImageNavigation) {
                $http({
                    url: QueryDoucemnts,
                    method: 'POST',
                    data: {
                        Organ: $scope.currentRegion.id,
                        Id: o,
                        PageSize: 50
                    },
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    transformRequest: function (data) {
                        return $.param(data);
                    },
                }).success(function (data, header, config, status) {

                    //响应成功
                    //coulumn1List.o=data.result;
                    $scope.coulumn1ListImage = data.result;
                    var imageSwiper = new Swiper('#imageSwiper', {
                        autoplay: 5000,//可选选项，自动滑动
                        observer: true,//修改swiper自己或子元素时，自动初始化swiper
                        observeParents: true,//修改swiper的父元素时，自动初始化swiper
                        pagination: '.swiper-pagination',
                        paginationType: 'progress',
                    })
                }).error(function (data, header, config, status) {
                    //处理响应失败
                    $(".tipsBackground").remove();
                    TipsAlert.new("提示", "请求数据失败").show();
                });

            }
        }).error(function (data, header, config, status) {
            //处理响应失败
        });

        //显示并获取栏目一导航
        $http({
            url: QueryChannals,
            method: 'POST',
            data: {
                Organ: $scope.currentRegion.id,
                Id: $scope.navigationIdGroup[0]
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            transformRequest: function (data) {
                return $.param(data);
            },
        }).success(function (data, header, config, status) {

            //响应成功
            $scope.coulumn1Navigation = data.result;
            new Swiper('#tabs-823288', {
                slidesPerView: 'auto',
                spaceBetween: 0,
                observer: true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents: true,//修改swiper的父元素时，自动初始化swiper
            });
            $scope.coulumn1List = {};
            for (var o in $scope.coulumn1Navigation) {
                $http({
                    url: QueryDoucemnts,
                    method: 'POST',
                    data: {
                        Organ: $scope.currentRegion.id,
                        Id: o,
                        PageSize: 50
                    },
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    transformRequest: function (data) {
                        return $.param(data);
                    },
                }).success(function (data, header, config, status) {

                    //响应成功
                    //coulumn1List.o=data.result;
                    $scope.coulumn1List[status.data.Id] = data.result;
                }).error(function (data, header, config, status) {
                    //处理响应失败
                    $(".tipsBackground").remove();
                    TipsAlert.new("提示", "请求数据失败").show();
                });

            }
        }).error(function (data, header, config, status) {
            //处理响应失败
            $(".tipsBackground").remove();
            TipsAlert.new("提示", "请求数据失败").show();
        });

        //显示并获取栏目2导航
        $http({
            url: QueryChannals,
            method: 'POST',
            data: {
                Organ: $scope.currentRegion.id,
                Id: $scope.navigationIdGroup[2]
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            transformRequest: function (data) {
                return $.param(data);
            },
        }).success(function (data, header, config, status) {

            //响应成功
            $scope.coulumn2Navigation = data.result;
            $scope.coulumn2List = {};
        }).error(function (data, header, config, status) {
            //处理响应失败
            $(".tipsBackground").remove();
            TipsAlert.new("提示", "请求数据失败").show();
        });

        //显示并获取栏目3导航
        $http({
            url: QueryChannals,
            method: 'POST',
            data: {
                Organ: $scope.currentRegion.id,
                Id: $scope.navigationIdGroup[3]
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            transformRequest: function (data) {
                return $.param(data);
            },
        }).success(function (data, header, config, status) {

            //响应成功
            $scope.coulumn3Navigation = data.result;
            column3Swiper = new Swiper('#tabs-823289', {
                slidesPerView: 'auto',
                spaceBetween: 0,
                observer: true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents: true,//修改swiper的父元素时，自动初始化swiper
            });
            $scope.coulumn3List = {}
            for (var o in $scope.coulumn3Navigation) {
                $http({
                    url: QueryDoucemnts,
                    method: 'POST',
                    data: {
                        Organ: $scope.currentRegion.id,
                        Id: o,
                        PageSize: 50
                    },
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    transformRequest: function (data) {
                        return $.param(data);
                    },
                }).success(function (data, header, config, status) {

                    //响应成功
                    //coulumn1List.o=data.result;
                    $scope.coulumn3List[status.data.Id] = data.result;
                }).error(function (data, header, config, status) {
                    //处理响应失败
                    $(".tipsBackground").remove();
                    TipsAlert.new("提示", "请求数据失败").show();
                });
            }
        }).error(function (data, header, config, status) {
            //处理响应失败
            $(".tipsBackground").remove();
            TipsAlert.new("提示", "请求数据失败").show();
        });

        //获取调查问卷
        $http({
            url: QueryServeral,
            method: 'POST',
            data: {
                Organ: $scope.currentRegion.id,
                PageNo: 1
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            transformRequest: function (data) {
                return $.param(data);
            },
        }).success(function (data, header, config, status) {

            //响应成功
            $scope.serveral = data.result;
        }).error(function (data, header, config, status) {
            //处理响应失败
            $(".tipsBackground").remove();
            TipsAlert.new("提示", "请求数据失败").show();
        });
    }
});