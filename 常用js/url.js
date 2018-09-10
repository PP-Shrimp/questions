Angela.url = { //#URL
    //参数：变量名，url为空则表从当前页面的url中取
    getQuery: function(name, url) {
        var u = arguments[1] || window.location.search,
            reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            r = u.substr(u.indexOf("?") + 1).match(reg);
        return r != null ? r[2] : "";
    },
    getHash: function(name, url) { //# 获取 hash值
        var u = arguments[1] || location.hash;
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = u.substr(u.indexOf("#") + 1).match(reg);
        if (r != null) {
            return r[2];
        }
        return "";
    },
    parse: function(url) { //# 解析URL
        var a = document.createElement('a');
        url = url || document.location.href;
        a.href = url;
        return {
            source: url,
            protocol: a.protocol.replace(':', ''),
            host: a.hostname,
            port: a.port,
            query: a.search,
            file: (a.pathname.match(/([^\/?#]+)$/i) || [, ''])[1],
            hash: a.hash.replace('#', ''),
            path: a.pathname.replace(/^([^\/])/, '/$1'),
            relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
            segments: a.pathname.replace(/^\//, '').split('/')
        };
    },
    autoFullUrl: function(url) { //#自动补全http
        url = url || document.location.href;
        url = url.substr(0, 7).toLowerCase() == 'http://' ? url : 'http://' + url;
        return url;
    }
};