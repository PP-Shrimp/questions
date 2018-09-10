Angela.cookie = { //# Cookie
    // 浏览器是够支持 cookie
    enable: !!navigator.cookieEnabled
        //读取COOKIE
        ,
    get: function(name) { //#读取 cookie
            var reg = new RegExp("(^| )" + name + "(?:=([^;]*))?(;|$)"),
                val = document.cookie.match(reg);
            return val ? (val[2] ? unescape(val[2]) : "") : '';
        }
        //写入COOKIES
        ,
    set: function(name, value, expires, path, domain, secure) { //# 写入 cookie
            var exp = new Date(),
                expires = arguments[2] || null,
                path = arguments[3] || "/",
                domain = arguments[4] || null,
                secure = arguments[5] || false;
            expires ? exp.setMinutes(exp.getMinutes() + parseInt(expires)) : "";
            document.cookie = name + '=' + escape(value) + (expires ? ';expires=' + exp.toGMTString() : '') + (path ? ';path=' + path : '') + (domain ? ';domain=' + domain : '') + (secure ? ';secure' : '');
        }
        //删除cookie
        ,
    del: function(name, path, domain, secure) { //#删除 cookie
        var value = $getCookie(name);
        if (value != null) {
            var exp = new Date();
            exp.setMinutes(exp.getMinutes() - 1000);
            path = path || "/";
            document.cookie = name + '=;expires=' + exp.toGMTString() + (path ? ';path=' + path : '') + (domain ? ';domain=' + domain : '') + (secure ? ';secure' : '');
        }
    }
};