/**
 * 工具方法，可单独引用
*/

// 价格由元转分，转整数
export const priceToFen = (price) => {
    return parseInt(price * 100);
}
// 价格由分转元
export const priceToYuan = (price) => {
    return (parseFloat(price) / 100).toFixed(2);
}

//返回格式化后的时间
export const getFormatDate = (date) => {
    let d = date || new Date();
    var Y = d.getFullYear();
    var M = (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1);
    var D = (d.getDate() < 10 ? '0' + d.getDate() : d.getDate());
    var h = (d.getHours() + 1 < 10 ? '0' + d.getHours() : d.getHours());
    var m = (d.getMinutes() + 1 < 10 ? '0' + d.getMinutes() : d.getMinutes());
    var s = (d.getSeconds() + 1 < 10 ? '0' + d.getSeconds() : d.getSeconds());

    // var D = d.getDate();
    // var h = d.getHours();
    // var m = d.getMinutes();
    // var s = d.getSeconds();
    return {
        date: d,
        Y: Y,
        M: M,
        D: D,
        h: h,
        m: m,
        s: s,
        timestamp: Date.parse(d) / 1000
    }
}

// 时间戳转换时间
export const timestampToTime = (timestamp, params) => {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let d = getFormatDate(date);
    let show = `${d.h}:${d.m}:${d.s}`;

    if (params && params.format == 'Y') {
        show = `${d.Y}-${d.M}-${d.D} ${d.h}:${d.m}:${d.s}`;
    }
    return show;
}

// 时间转换时间戳 new Date对象
export const timeToStamp = (date) => {
    return Date.parse(date) / 1000;
}

// 返回剩余时间
export const timeCoutDown = (timestamp) => {
    let nowStamp = timeToStamp(new Date());
    let lastSecond = timestamp - nowStamp;

    let d = Math.floor(lastSecond / 3600 / 24),
        h = Math.floor(lastSecond / 3600 % 24),
        m = Math.floor(lastSecond / 60 % 60),
        s = Math.floor(lastSecond % 60);

    if (d < 10) {
        d = '0' + d;
    }
    if (h < 10) {
        h = '0' + h;
    }
    if (m < 10) {
        m = '0' + m;
    }
    if (s < 10) {
        s = '0' + s;
    }

    // console.log(`${d}天${h}时${m}分${s}秒`)
    let show = '';

    //优化显示
    if (d >= 1) {
        show = `${d}天${h}小时`;
    } else if (d < 1 && h >= 1) {
        show = `${h}小时${m}分`;
    } else if (d < 1 && h < 1 && m >= 1) {
        show = `${m}分${s}秒`;
    } else {
        show = `${d}天${h}时${m}分${s}秒`;
    }


    return {
        d: d,
        h: h,
        m: m,
        s: s,
        show: show,
        end: lastSecond > 0 ? false : true
    }

}
// timeCoutDown(1544083200);//2018-12-6 16:0
// setInterval(() => {
//     console.log(timeCoutDown(1544083200))
// }, 1000)
