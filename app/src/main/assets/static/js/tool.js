//各接口具体地址

// var baseUrl = "/xtests/ws/data/"
var baseUrl = "http://xwqy.gsxt.gov.cn/ws/data/";


//获取各栏目信息
var QueryXwInfo = baseUrl + "QueryXwInfo";
//获取各栏目详细信息
var QueryXwDetail = baseUrl + "QueryXwDetail";
//获取热词关键字
var QueryHotwords = baseUrl + "QueryHotwords";
//获取区域列表
var QueryOrgan = baseUrl + "QueryOrgan";
//全局搜索接口
var QueryXwInfo = baseUrl + "QueryXwInfo";

var QueryChannals = baseUrl + "QueryChannals";

var QueryDoucemnts = baseUrl + "QueryDoucemnts";

//获取调查问卷
var QueryServeral = baseUrl + "QueryServeral"

//保存调查问卷
var SaveSurvey = baseUrl + "SaveSurvey"

//获取调查问卷内容列表
var QuerySurveys = baseUrl + "QuerySurveys"

//获取调查问卷内容列表
var QuerySurveys = baseUrl + "QuerySurveys"

//根据邮箱获取关键字列表
var QueryCustomWord = baseUrl + "QueryCustomWord"

//根据邮箱获取定制内容列表
var QueryCustomWord = baseUrl + "QueryCustomDocment"

//处理返回的数据

var mySwiper;
var column3Swiper;
function divideReponseData(data) {
    var column1Data = [];
    var column2Data = [];
    var column3Data = [];
    var column4Data = [];
    var column5Data = [];
    if (data.result == undefined) {
        return ["", "", "", "", ""];
    }
    for (var i = 0; i < data.result.length; i++) {
        if (i <= 9) {
            column1Data.push(data.result[i]);
        }
        if (i <= 19 && i > 9) {
            column2Data.push(data.result[i]);
        }
        if (i <= 29 && i > 19) {
            column3Data.push(data.result[i]);
        }
        if (i <= 39 && i > 29) {
            column4Data.push(data.result[i]);
        }
        if (i <= 49 && i > 39) {
            column5Data.push(data.result[i]);
        }

    }
    return [column1Data, column2Data, column3Data, column4Data, column5Data];
}

Array.prototype.removeByValue = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) {
            this.splice(i, 1);
            break;
        }
    }
}

var TipsAlert = {
    "new": function (title, info) {
        var alert = {};
        alert.init = function () {
            alert.bg = document.createElement('div');
            alert.body = document.createElement('div');
            alert.title = document.createElement("div");
            alert.info = document.createElement("div");
            alert.bottom = document.createElement("div");
            alert.button = document.createElement('button');
            if (!alert.bg.classList) {
                Element.prototype.classList = {

                };
            }
            //alert.bg.classList = "tipsBackground";
            //alert.body.classList = "tipsBody";
            //alert.info.classList = "tipsContent";
            //alert.title.classList = "tipsTitle";
            //alert.bottom.classList = "tipsBottom";
            //alert.button.classList = "tipsButton";
            $(alert.bg).addClass("tipsBackground");
            $(alert.body).addClass("tipsBody");
            $(alert.info).addClass("tipsContent");
            $(alert.title).addClass("tipsTitle");
            $(alert.bottom).addClass("tipsBottom");
            $(alert.button).addClass("tipsButton");
            alert.button.innerHTML = "我知道了";


            alert.bg.appendChild(alert.body);
            alert.body.appendChild(alert.title);
            alert.body.appendChild(alert.info);
            alert.body.appendChild(alert.bottom);
            alert.bottom.appendChild(alert.button);

            alert.title.innerHTML = title;
            alert.info.innerHTML = info;
            alert.button.onclick = alert.hide;
        };
        alert.show = function () {
            this.init();
            document.body.appendChild(this.bg);
        };

        alert.hide = function () {
            document.body.removeChild(alert.bg);
            alert = undefined;
        };
        return alert;
    }
};

var Loading = {
    show: function () {
        var alert = {};
        alert.bg = document.createElement('div');
        alert.img = document.createElement('img');
        //alert.img.setAttribute("src", "static/img/loading.svg");
        //alert.img.setAttribute("width", "60px");
        //alert.img.setAttribute("height", "60px");
        $(alert.img).attr("src", "static/img/loading.svg");
        $(alert.img).attr("width", "60px");
        $(alert.img).attr("height", "60px");


        alert.bg.appendChild(alert.img);
        ////alert.bg.classList = "tipsBackground";
        ////alert.img.classList = "loadingImg";
        $(alert.bg).addClass("tipsBackground");
        $(alert.img).addClass("loadingImg");

        document.body.appendChild(alert.bg);

        alert.hide = function () {
            document.body.removeChild(alert.bg);
            alert = undefined;
        };
        return alert;
    },
    hide: function () {
        $("img[src='static/img/loading.svg']").remove();
        $(".tipsBackground").remove();
    }
};
