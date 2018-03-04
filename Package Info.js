$app.strings = {
    "en": {
        "MAIN_TITLE": "Package Info"
    },
    "zh-Hans": {
        "MAIN_TITLE": "快递查询"
    }
}

$ui.render({
    props: {
        title: $l10n("MAIN_TITLE")
    },
    views: [{
        type: "label",
        props: {
            id: "info",
            align: $align.natural,
            text: "请复制快递单号再使用此工具",
            lines: 0,
            autoFontSize: 0,
            font: $font("Futura-CondensedMedium", 13)
        },
        layout: function(make, view) {
            make.top.equalTo(0)
            make.center.equalTo(view.super)
            make.width.equalTo(300)
        }
    }]
})

$http.get({
    url: "https://www.kuaidi100.com/autonumber/autoComNum?text=" + $clipboard.text,
    handler: function(resp0) {
        var comCode = resp0.data.auto[0].comCode
        $http.get({
            url: "http://m.kuaidi100.com/query?type=" + comCode + "&postid=" + $clipboard.text,
            handler: function(resp1) {
                infoParse(resp1.data.data)
            }
        })
    }
})

function infoParse(result) {
    var resultParsed = ""
    for(let i = 0; i < result.length; i++ ) {
        resultParsed = resultParsed + result[i].time.slice(0, 16) + "：" + result[i].context + "\n"
    }
    $("info").text = resultParsed
}