function sort(arr) {
    console.log(1);
    debugger
    // 创建10个桶，每个桶为一个数组，下标0-9
    let bucket = new Array(10);
    // for (let i = 0; i < bucket.length; i++) {
    //     bucket[i] = [];
    // }
    // 查找数组的最大值，获取最大值的位数，以便于知道需要遍历几次
    let maxValue = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > maxValue) {
            maxValue = arr[i];
        }
    }
    // 求数的位数
    let size = maxValue.toString().length;

    let mod = 10;
    let dev = 1;
    // let pos = 0;
    for (let i = 0; i <size; i++ , dev *= 10, mod *= 10) {
        for (let j = 0; j < arr.length; j++) {
            // bucket[parseInt((arr[j] % mod) / dev)].push(arr[j]);
            let index = parseInt((arr[j] % mod) / dev);
            if(bucket[index]===null) {
                bucket[index] = [];
            }
            bucket[index].push(arr[j]);
        }
        let pos = 0;
        for (let j = 0; j < bucket.length; j++) {
            for (let k = 0; k < bucket[j].length; k++) {
                arr[pos++] = bucket[j][k];
            }
        }
    }
    return arr;
}

sort([1, 8, 9, 5, 7, 2, 9, 8])
