/**
 * Created by william on 10/05/2017.
 */
/**
 *
 * @param min
 * @param max
 * @returns int(>=min && <max)|array
 */
export function random(min, max, num = 1) {
    if(num> max-min)
        return null;

    if(num == 1)
    {
        let r = Math.round(Math.random()*(max-min))+min;
        return r >= max ? max-1 : r;
    } else {
        let nn = 0;
        let map = {};
        let res = [];
        while (nn < num) {
            let rd = random(min,max);
            if(!map[rd]) {
                map[rd] = 1;
                res.push(rd);
                nn++;
            }
        }
        return num==1?res[0]:res;
    }
}

/**
 *
 * @param arr
 * @param num
 * @returns Object|Array
 */
export function randomPick(arr, num = 1) {
    //console.log(arr);
    if(arr.length <= num || arr.length == 0)
    {
        return arr;
    }

    idxs = random(0, arr.length, num);
    //console.log(idxs);

    if (num == 1) {
        return arr[idxs];
    } else {
        res = [];
        for(let i=idxs.length; i>=0; i--) {
            res.push(arr[idxs[i]]);
        }
        return res;
    }

}

/*
 ** randomWord 产生任意长度随机字母数字组合
 ** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
 ** xuanfeng 2014-08-28
 */

export function randomWord(randomFlag, min, max){
    let str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    // 随机产生
    if(randomFlag){
        range = Math.round(Math.random() * (max-min)) + min;
    }
    for(let i=0; i<range; i++){
        pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
    return str;
}

let icons = ['browsers','bulb','bug','cafe','cloud','cloudy-night','color-fill'];

export function randomIcon() {
    return randomPick(icons);
}

export function randomPwd(min, max) {
    return null;
}