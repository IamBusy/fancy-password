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
    console.log(arr);
    if(arr.length <= num || arr.length == 0)
    {
        return arr;
    }

    idxs = random(0, arr.length, num);
    console.log(idxs);

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

let icons = ['browsers','bulb','bug','cafe','cloud','cloudy-night','color-fill'];

export function randomIcon() {
    return randomPick(icons);
}

export function randomPwd(min, max) {
    return null;
}