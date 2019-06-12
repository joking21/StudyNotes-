function sort(arr, bucketSize) {
    if (arr.length === 0) {
        return arr;
    }

    var i;
    var minValue = arr[0];
    var maxValue = arr[0];
    for (i = 1; i < arr.length; i++) {
        if (arr[i] < minValue) {
            minValue = arr[i];                // 输入数据的最小值
        } else if (arr[i] > maxValue) {
            maxValue = arr[i];                // 输入数据的最大值
        }
    }

    //桶的初始化
    var DEFAULT_BUCKET_SIZE = 5;            // 设置桶的默认数量为5
    bucketSize = bucketSize || DEFAULT_BUCKET_SIZE;
    var bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
    var buckets = new Array(bucketSize);
    for (i = 0; i < buckets.length; i++) {
        buckets[i] = [];
    }

    //利用映射函数将数据分配到各个桶中
    for (i = 0; i < arr.length; i++) {
        buckets[Math.floor((arr[i] - minValue) / bucketSize)].push(arr[i]);
    }

    arr.length = 0;
    for (i = 0; i < buckets.length; i++) {
        insertionSort(buckets[i]);                      // 对每个桶进行排序，这里使用了插入排序
        for (var j = 0; j < buckets[i].length; j++) {
            arr.push(buckets[i][j]);
        }
    }

    return arr;
}

sort([1, 8, 9, 5, 7, 2, 9, 8])

function sort1(arr, bucketSize = 5) {
    console.log(1);
    let zArr = [];
    let maxValue = arr[0];
    let minValue = arr[0];
    // 计算最大值与最小值
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < minValue) {
            minValue = arr[i];
        } else if (arr[i] > maxValue) {
            maxValue = arr[i];
        }
    }

    // 计算每个桶的分配个数
    const region = Math.floor((maxValue - minValue) / bucketSize) + 1;
    // const buckets = new Array(bucketSize).fill(JSON.parse(JSON.stringify([])));
    const buckets = new Array(region);
    for(let i = 0; i<buckets;i++){
        buckets[i] = [];
    }
    // 分配桶
    console.log(buckets);
    for (let i = 0; i < arr.length; i++) {
        console.log(Math.floor((arr[i] - minValue) / region));
        buckets[Math.floor((arr[i] - minValue) / region)].push(arr[i]);
    }
    // 桶内插入排序
    for (let i = 0; i < buckets.length; i++) {
        inSort(buckets[i]);
        for (let j = 0; j < buckets[i].length; j++) {
            zArr.push(buckets[i][j]);
        }
    }
    return arr;
}
function inSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let temp = arr[i];
        let j = i;
        while (j > 0 && arr[j - 1] > temp) {
            arr[j] = arr[j - 1];
            j--;
        }
        arr[j] = temp;
    }
    return arr;
}
