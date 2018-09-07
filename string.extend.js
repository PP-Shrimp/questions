Angela.string = { //# 字符串
    codeHtml: function(content) { //# 转义 HTML 字符
            return this.replace(content, {
                '&': "&amp;",
                '"': "&quot;",
                "'": '&#39;',
                '<': "&lt;",
                '>': "&gt;",
                ' ': "&nbsp;",
                '\t': "&#09;",
                '(': "&#40;",
                ')': "&#41;",
                '*': "&#42;",
                '+': "&#43;",
                ',': "&#44;",
                '-': "&#45;",
                '.': "&#46;",
                '/': "&#47;",
                '?': "&#63;",
                '\\': "&#92;",
                '\n': "<br>"
            });
        }
        //重复字符串
        ,
    repeat: function(word, length, end) { //# 重复字符串
            end = end || ''; //加在末位
            length = ~~length;
            return new Array(length * 1 + 1).join(word) + '' + end;
        }
        //增加前缀
        ,
    addPre: function(pre, word, size) { //# 补齐。如给数字前 加 0
            pre = pre || '0';
            size = parseInt(size) || 0;
            word = String(word || '');
            var length = Math.max(0, size - word.length);
            return this.repeat(pre, length, word);
        }
        //去除两边空格
        ,
    trim: function(text) { //# 去除两边空格
            return (text || '').replace(/^\s+|\s$/, '');
        }
        //字符串替换
        ,
    replace: function(str, re) { //# 字符串替换
        str = str || '';
        for (var key in re) {
            replace(key, re[key]);
        };

        function replace(a, b) {
            var arr = str.split(a);
            str = arr.join(b);
        };
        return str;
    },
    xss: function(str, type) { //# XSS 转义
            //空过滤
            if (!str) {
                return str === 0 ? "0" : "";
            }
            switch (type) {
                case "html": //过滤html字符串中的XSS
                    return str.replace(/[&'"<>\/\\\-\x00-\x09\x0b-\x0c\x1f\x80-\xff]/g, function(r) {
                        return "&#" + r.charCodeAt(0) + ";"
                    }).replace(/ /g, "&nbsp;").replace(/\r\n/g, "<br />").replace(/\n/g, "<br />").replace(/\r/g, "<br />");
                    break;
                case "htmlEp": //过滤DOM节点属性中的XSS
                    return str.replace(/[&'"<>\/\\\-\x00-\x1f\x80-\xff]/g, function(r) {
                        return "&#" + r.charCodeAt(0) + ";"
                    });
                    break;
                case "url": //过滤url
                    return escape(str).replace(/\+/g, "%2B");
                    break;
                case "miniUrl":
                    return str.replace(/%/g, "%25");
                    break;
                case "script":
                    return str.replace(/[\\"']/g, function(r) {
                        return "\\" + r;
                    }).replace(/%/g, "\\x25").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\x01/g, "\\x01");
                    break;
                case "reg":
                    return str.replace(/[\\\^\$\*\+\?\{\}\.\(\)\[\]]/g, function(a) {
                        return "\\" + a;
                    });
                    break;
                default:
                    return escape(str).replace(/[&'"<>\/\\\-\x00-\x09\x0b-\x0c\x1f\x80-\xff]/g, function(r) {
                        return "&#" + r.charCodeAt(0) + ";"
                    }).replace(/ /g, "&nbsp;").replace(/\r\n/g, "<br />").replace(/\n/g, "<br />").replace(/\r/g, "<br />");
                    break;
            }
        }
        // badword , 过滤敏感词
        //@text : 要过滤的文本 , 类型 ：字符串
        //@words : 敏感词 ，类型，数组, 如 ： ['你妹', '我丢' ,'我靠']
        // 如果 用 正则匹配， text 长度 100万，words 100万，需要 4秒！
        ,
    badWord: function(text, words) { //# 敏感词过滤
        text = String(text || '');
        words = words || [];
        var reg = new RegExp(words.join('|'), 'g'),
            _self = this;
        return text.replace(reg, function($0) {
            var length = String($0 || '').length;
            return _self.repeat('*', length);
        });
    }

};