export default class Util {
    constructor() {}

    /**
     * 防抖 (debounce): 将多次高频操作优化为只在最后一次执行，通常使用的场景是：用户输入，只需在输入完成后做一次输入校验即可。
     * @param {*} fn 
     * @param {*} wait 
     * @param {*} immediate 
     */
    static debounce(fn, wait, immediate) { 
        let timer = null
        return function () {
            let args = arguments
            let context = this
            if (immediate && !timer) {
                fn.apply(context, args)
            }
            if (timer) clearTimeout(timer)
            timer = setTimeout(() => {
                fn.apply(context, args)
            }, wait)
        }
    }
    /**
     * 节流(throttle): 每隔一段时间后执行一次， 也就是降低频率， 将高频操作优化成低频操作， 通常使用场景: 滚动条事件 或者 resize 事件， 通常每隔 100~500 ms执行一次即可。
     * @param {*} fn 
     * @param {*} wait 
     * @param {*} immediate 
     */
    static throttle(fn, wait, immediate) {
        let timer = null
        let callNow = immediate
        return function () {
            let context = this,
                args = arguments
            if (callNow) {
                fn.apply(context, args)
                callNow = false
            }
            if (!timer) {
                timer = setTimeout(() => {
                    fn.apply(context, args)
                    timer = null
                }, wait)
            }
        }
    }

    //深复制
    static deepCopy(obj) {
        //基本类型和函数直接返回
        if (!(obj instanceof Object) || typeof obj === 'function') return obj;
        let newObj = {};
        if (obj instanceof Array) newObj = [];
        for (let p in obj) {
            //继续复制对象里面的对象
            newObj[p] = this.deepCopy(obj[p]);
        }
        return newObj;
    }
    
    // 获取数值每一位上的数字<span></span>
    static numberFor(num,bit,type) {
        num = num.toString(); //把数字转换成字符串
        let spanObj = '';
        if(typeof(type) == 'object'){
            let style = JSON.stringify(type).replace(/,/g, ';').replace(/"/g, '').replace(/{|}/g, '')
            // console.log('style',style);
            
            for (var i = 0; i < bit; i++) {
                if (num[i]) {
                    spanObj += `<span style="${style}">${num[i]}</span>`
                } else {
                    spanObj = `<span style="${style}"></span>` + spanObj
                }
            }
        }else{
            if (type === 'small') {
                for (var i = 0; i < bit; i++) {
                    if (num[i]) {
                        spanObj += '<span style="display: inline-block;margin-right: 5px;width: 20px;height: 24px;line-height: 24px;border-radius: 3px;background: #1d3d52;color: #75e7f0;text-align: center;font-size: 20px;">' + num[i] + '</span>'
                    } else {
                        spanObj = '<span style="display: inline-block;margin-right: 5px;width: 20px;height: 24px;line-height: 24px;border-radius: 3px;background: #1d3d52;color: #75e7f0;text-align: center;font-size: 20px;"></span>' + spanObj
                    }
                }
            } else {
                for (var i = 0; i < bit; i++) {
                    if (num[i]) {
                        spanObj += '<span style="display: inline-block;margin-right: 5px;width: 21px;height: 34px;line-height: 34px;border-radius: 3px;background: #1d3d52;color: #75e7f0;text-align: center;font-size: 24px;">' + num[i] + '</span>'
                    } else {
                        spanObj = '<span style="display: inline-block;margin-right: 5px;width: 21px;height: 34px;line-height: 34px;border-radius: 3px;background: #1d3d52;color: #75e7f0;text-align: center;font-size: 24px;"></span>' + spanObj
                    }
                }
            }
        }
        return spanObj;
    }
    static getLunar(){
        /*农历部分*/
        var CalendarData = new Array(100);
        var madd = new Array(12);
        var tgString = "甲乙丙丁戊己庚辛壬癸";
        var dzString = "子丑寅卯辰巳午未申酉戌亥";
        var numString = "一二三四五六七八九十";
        var monString = "正二三四五六七八九十冬腊";
        var weekString = "日一二三四五六";
        var sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
        var cYear, cMonth, cDay, TheDate;
        CalendarData = new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95);
        madd[0] = 0;
        madd[1] = 31;
        madd[2] = 59;
        madd[3] = 90;
        madd[4] = 120;
        madd[5] = 151;
        madd[6] = 181;
        madd[7] = 212;
        madd[8] = 243;
        madd[9] = 273;
        madd[10] = 304;
        madd[11] = 334;

        function GetBit(m, n) {
            return (m >> n) & 1;
        }

        function e2c() {
            TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
            var total, m, n, k;
            var isEnd = false;
            var tmp = TheDate.getYear();
            if (tmp < 1900) {
                tmp += 1900;
            }
            total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;

            if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {
                total++;
            }
            for (m = 0;; m++) {
                k = (CalendarData[m] < 0xfff) ? 11 : 12;
                for (n = k; n >= 0; n--) {
                    if (total <= 29 + GetBit(CalendarData[m], n)) {
                        isEnd = true;
                        break;
                    }
                    total = total - 29 - GetBit(CalendarData[m], n);
                }
                if (isEnd) break;
            }
            cYear = 1921 + m;
            cMonth = k - n + 1;
            cDay = total;
            if (k == 12) {
                if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {
                    cMonth = 1 - cMonth;
                }
                if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
                    cMonth--;
                }
            }
        }

        function GetcDateString() {
            var tmp = "";
            // tmp += tgString.charAt((cYear - 4) % 10);
            // tmp += dzString.charAt((cYear - 4) % 12);
            // tmp += "(";
            // tmp += sx.charAt((cYear - 4) % 12);
            // tmp += ")年 ";
            if (cMonth < 1) {
                tmp += "(闰)";
                tmp += monString.charAt(-cMonth - 1);
            } else {
                tmp += monString.charAt(cMonth - 1); 
            }
            tmp += "月";
            tmp += (cDay < 11) ? "初" : ((cDay < 20) ? "十" : ((cDay < 30) ? "廿" : "三十"));
            if (cDay % 10 != 0 || cDay == 10) {
                tmp += numString.charAt((cDay - 1) % 10);
            }
            return tmp;
        }

        function GetLunarDay(solarYear, solarMonth, solarDay) {
            //solarYear = solarYear<1900?(1900+solarYear):solarYear;
            if (solarYear < 1921 || solarYear > 2020) {
                return "";
            } else {
                solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
                e2c(solarYear, solarMonth, solarDay);
                return GetcDateString();
            }
        }

        var D = new Date();
        var yy = D.getFullYear();
        var mm = D.getMonth() + 1;
        var dd = D.getDate();
        var ww = D.getDay();
        var ss = parseInt(D.getTime() / 1000);
        if (yy < 100) yy = "19" + yy;

        return GetLunarDay(yy, mm, dd);
       
    }

}
Date.prototype.Format = function (fmt) {
    let o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
            );
    return fmt;
};
//获取URl参数
//Object.fromEntries(new URLSearchParams('a=1&b=2'))
//q={};location.search.replace(/([^?&=]+)=([^&]+)/g,(_,k,v)=>q[k]=v);q;

//快速创建值为键值名的数组，不用遍历循环[...Array(100).keys()]

//输出电脑键盘图形(惊为天人)
//(_=>[..."`1234567890-=~~QWERTYUIOP[]\\~ASDFGHJKL;'~~ZXCVBNM,./~"].map(x=>(o+=`/${b='_'.repeat(w=x<y?2:' 667699'[x=["BS","TAB","CAPS","ENTER"][p++]||'SHIFT',p])}\\|`,m+=y+(x+'    ').slice(0,w)+y+y,n+=y+b+y+y,l+=' __'+b)[73]&&(k.push(l,m,n,o),l='',m=n=o=y),m=n=o=y='|',p=l=k=[])&&k.join`
//`)()

//获取当前时间new Date().toLocaleTimeString()  || new Date().toLocaleString().slice(10,19)

//随机ID Math.random().toString(36).substring(2);

//数组去重 
// ES6Array.from(new Set(arr))// ES5arr.filter(function(ele, index, array){ return index===array.indexOf(ele)}) 

//克隆数组
//arr.slice(0) 

//数组最大值
//function maxArr(arr) { return Math.max.apply(null, arr) }
//数组最小值
//function minArr(arr) { return Math.min.apply(null, arr) }
//随机获取数组的一个成员
//function randomOne(arr) { return arr[Math.floor(Math.random() * arr.length)] }
//产生随机颜色
//function getRandomColor() { return `#${Math.random().toString(16).substr(2, 6)}` } 

//console.log(([][[]] + [])[+!![]] + ([] + {})[!+[] + !![]])
//nb
//console.log((!(~+[]) + {})[--[~+''][+[]] * [~+[]] + ~~!+[]] + ({} + [])[[~!+[]] * ~+[]])
//sb