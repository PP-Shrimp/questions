Angela.array = { //# 数组方法
    // index, 返回位置！ 不存在则返回 -1；
    index: function(t, arr) { //# 返回当前值所在数组的位置
            if (arr.indexOf) {
                return arr.indexOf(t);
            }
            for (var i = arr.length; i--;) {
                if (arr[i] === t) {
                    return i * 1;
                }
            };
            return -1;
        }
        //返回对象 的 键值！  返回值 类型为数组。
        ,
    getKey: function(data) { //# 返回对象所有的键值
            var arr = [],
                k;
            for (k in data) {
                arr.push(k);
            };
            return arr;
        }
        //从数组中 随机取出 一个值
        ,
    random: function(arrays) { //# 从数组中 随机取出 一个值
            arrays = arrays || [];
            var len = arrays.length,
                index = Angela.math.randInt(0, len - 1);
            return arrays[index] || '';
        }
        // 一维 数组去重
        ,
    unique: function(array) { //#一维数组去重
            array = array || [];
            for (var i = 0, len = array.length; i < len; i++) {
                for (var j = i + 1; j < array.length; j++) {
                    if (array[i] === array[j]) {
                        array.splice(j, 1);
                        j--;
                    }
                }
            }
            return array;
        }
        // max , 数组中最大的项
        ,
    max: function(array) { //#求数组中最大的项
            return Math.max.apply(null, array);
        }
        // min , 数组中最小的项
        ,
    min: function(array) { //#求数组中最小的项
            return Math.min.apply(null, array);
        }
        // remove ， 移除
        ,
    remove: function(array, value) { //#移除数组中某值
            var length = array.length;
            while (length--) {
                if (value === array[length]) {
                    array.splice(length, 1);
                }
            }
            return array;
        }
        //清空数组
        ,
    empty: function(array) { //# 清空数组
            (array || []).length = 0;
            return array;
        }
        //  removeAt ，删除指定位置的 值
        //@index , 索引. 不传递 index ，会删除第一个
        ,
    removeAt: function(array, index) { //#删除数组中 指定位置的值
            array.splice(index, 1);
            return array;
        }
        //打乱数组排序
        ,
    shuffle: function(arr) { //#打乱数组排序
        var array = (arr || []).concat(),
            length = array.length,
            i = length //遍历
            ,
            tmp = null // 临时
            ,
            rand = Angela.math.randInt //位置
            ,
            pos = 0;
        while (i--) {
            pos = rand(0, length);
            //交换随机位置
            tmp = array[pos];
            array[pos] = array[i];
            array[i] = tmp;
        }
        return array;
    }
};