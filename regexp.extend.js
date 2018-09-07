Angela.regExp = { //# 字符串匹配
    //是否为 数字！整数，浮点数
    isNum: function(num) { //# 是否为数组
        return !isNaN(num);
    },
    isEmail: function(mail) { //# 是否为 邮箱
        return /^([a-z0-9]+[_\-\.]?)*[a-z0-9]+@([a-z0-9]+[_\-\.]?)*[a-z0-9]+\.[a-z]{2,5}$/i.test(mail);
    },
    isIdCard: function(card) { //# 是否为 身份证
        return /^(\d{14}|\d{17})(\d|[xX])$/.test(card);
    },
    isMobile: function(mobile) { //# 是否为 手机
        return /^0*1\d{10}$/.test(mobile);
    },
    isQQ: function(qq) { //# 是否为 QQ
        return /^[1-9]\d{4,10}$/.test(qq);
    },
    isTel: function(tel) { //# 是否为 电话
        return /^\d{3,4}-\d{7,8}(-\d{1,6})?$/.text(tel);
    },
    isUrl: function(url) { //# 是否为 URL
        return /https?:\/\/[a-z0-9\.\-]{1,255}\.[0-9a-z\-]{1,255}/i.test(url);
    },
    isColor: function(color) { //# 是否为 16进制颜色
            return /#([\da-f]{3}){1,2}$/i.test(color);
        }
        //@id ： 身份证 ，
        // @now : 当前时间 如：new Date('2013/12/12') , '2013/12/12'
        // @age ： 允许的年龄
        ,
    isAdult: function(id, allowAge, now) { //# 是否年龄是否成年
            var age = 0 // 用户 年月日
                ,
                nowDate = 0 //当前年月日
            ;
            allowAge = parseFloat(allowAge) || 18;
            now = typeof now == 'string' ? new Date(now) : (now || new Date());


            if (!this.isIdCard(id)) {
                return false;
            }
            //15位身份证
            if (15 == id.length) {
                age = '19' + id.slice(6, 6);
            } else {
                age = id.slice(6, 14);
            }
            // 类型转换 整型
            age = ~~age;
            nowDate = ~~(Angela.date.format('YYYYMMDD', now));
            //比较年龄
            if (nowDate - age < allowAge * 1e4) {
                return false;
            }
            return true;
        }
        //浮点数
        ,
    isFloat: function(num) { //# 是否为 浮点数
            return /^(([1-9]\d*)|(\d+\.\d+)|0)$/.test(num);
        }
        //正整数
        ,
    isInt: function(num) { //# 是否为 正整数
            return /^[1-9]\d*$/.test(num);
        }
        //是否全为汉字
        ,
    isChinese: function(str) { //# 是否全为 汉字
        return /^([\u4E00-\u9FA5]|[\uFE30-\uFFA0])+$/gi.test(str);
    }

};