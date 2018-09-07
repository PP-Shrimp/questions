Angela.date = { //# 日期时间
    //@s : 开始时间
    //@e : 结束时间
    //@n : 当前时间 , n 的格式为 毫秒数
    isInArea: function(s, e, n) { //# 判断时间区域
            var start = this.parse(s),
                end = this.parse(e),
                now = parseFloat(n) || new Date();
            start = Math.min(start, end);
            end = Math.max(start, end);
            return now >= start && now <= end ? true : false;
        }
        //把 字符窜转化为 毫秒
        //@date : 2013-03-02 1:2:2
        ,
    parse: function(date) { //# 格式化时间
            return Date.parse(date); //.replace(/-/g, '/')
        }
        //@time , 时间 , 如 new Date('2013/11/10 0:12:12')
        //@pre ， 星期的 前缀，如：周 ，星期
        //@ nums ，如：一二三四五六日
        ,
    getWeek: function(time, pre, nums) { //# 获取星期几
            time = typeof time == 'string' ? this.parse(time) : (time || new Date());
            pre = pre || '星期'; //周
            nums = '日一二三四五六';
            return pre + nums[time.getDay()];
        }
        //@formatType : YYYY, YY, MM
        //@ time : new Date('2013/11/12')
        //@weeks : 日一二三四五六
        ,
    format: function(formatType, time, weeks) { //格式化输出时间
            var pre = '0'

            ;
            formatType = formatType || 'YYYY-MM-DD'
            weeks = weeks || '日一二三四五六';
            time = time || new Date();

            //格式化时间
            return (formatType || '')
                .replace(/yyyy|YYYY/g, time.getFullYear())
                .replace(/yy|YY/g, Angela.string.addPre(pre, time.getFullYear() % 100), 2)
                .replace(/mm|MM/g, Angela.string.addPre(pre, time.getMonth() + 1, 2))
                .replace(/m|M/g, time.getMonth() + 1)
                .replace(/dd|DD/g, Angela.string.addPre(pre, time.getDate(), 2))
                .replace(/d|D/g, time.getDate())
                .replace(/hh|HH/g, Angela.string.addPre(pre, time.getHours(), 2))
                .replace(/h|H/g, time.getHours())
                .replace(/ii|II/g, Angela.string.addPre(pre, time.getMinutes(), 2))
                .replace(/i|I/g, time.getMinutes())
                .replace(/ss|SS/g, Angela.string.addPre(pre, time.getSeconds(), 2))
                .replace(/s|S/g, time.getSeconds())
                .replace(/w/g, time.getDay())
                .replace(/W/g, weeks[time.getDay()]);
        }
        //倒计时
        ,
    countDown: function(opt) { //# 倒计时
        var option = {
                nowTime: 0 //        当前时间, ，2013/02/01 18:30:30
                    ,
                endTime: 0 //截止时间 ，2013/02/01 18:30:30
                    ,
                interval: 1 //间隔回调时间，秒
                    ,
                called: function(day, hour, second, minute) {} //每次回调
                    ,
                finaled: function() {} //完成后回调
            },
            opts = {},
            timer = null;
        opts = Angela.extend(option, opt);

        //当前时间
        if (!opts.nowTime) {
            opts.nowTime = (new Date()).getTime();
        } else {
            opts.nowTime = this.parse(opts.nowTime);
        }
        //当前时间
        if (!opts.endTime) {
            opts.endTime = (new Date()).getTime();
        } else {
            opts.endTime = this.parse(opts.endTime);
        }

        timer = setInterval(loop, opts.interval * 1e3);
        // 循环
        function loop() {
            var ts = opts.endTime - opts.nowTime //计算剩余的毫秒数
                ,
                dd = parseInt(ts / 8.64e7) //计算剩余的天数
                ,
                hh = parseInt(ts / 3.6e7 % 24) //计算剩余的小时数
                ,
                mm = parseInt(ts / 6e4 % 60) //计算剩余的分钟数
                ,
                ss = parseInt(ts / 1e3 % 60) //计算剩余的秒数
            ;
            //当前时间递减
            opts.nowTime += opts.interval * 1e3;
            if (ts <= 0) {
                clearInterval(timer);
                opts.finaled();
            } else {
                opts.called(dd, hh, mm, ss);
            }
        }
    }
};