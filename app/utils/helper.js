/**
 * Created by william on 12/05/2017.
 */
export function runOnce(fn, context) { //控制让函数只触发一次
    return function () {
        try {
            if( fn ) {
                fn.apply(context || this, arguments);
            }

        }
        catch (e) {
            console.error(e);//一般可以注释掉这行
        }
        finally {
            fn = null;
        }
    }
}