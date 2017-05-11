/**
 * Created by william on 10/05/2017.
 */
const Mock = require('mockjs');
const Random = Mock.Random;
let data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'data|10-15': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1,
        'name': () => Random.ctitle(2,4),
        'username': () => Random.email(),
        'password': () => Random.string('lower/upper/number/symbol',10,20)
    }]
})
export default data.data;
