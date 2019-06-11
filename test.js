function sort(arr) {
    //先找出最大值
    let maxValue = 0;
    for (let i = 0; i < arr.length; i++) {
        maxValue < arr[i] ? maxValue = arr[i] : null;
    }
    //建造一个下标为0-maxValue的顺序数组；此数组的长度是maxValue+1
    let maxLength = maxValue + 1;
    let temp = [];
    let zArr = [];
    // 创建一个长度为maxLength的数组，元素为0
    for (let i = 0; i < maxLength; i++) {
        temp[i] = 0;
    }
    // temp数组填充
    for (let i = 0; i < arr.length; i++) {
        temp[arr[i]]++;
    }
    // 取值
    for(let i = 0; i < maxLength; i++){
        while(temp[i]!=0){
            zArr.push(i);
            temp[i]--;
        }
    }
    return zArr;
}
sort([1,8,9,5,7,2,9,8])