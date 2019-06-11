let len;
function buildHeap(arr) {
    len = arr.length;
    for (let i = Math.floor(len / 2) - 1; i >= 0; i--) { // 建堆  叶的左节点为2i+1,右节点为2i+2
        adjustment(arr, i)
    }
}
function adjustment(arr, i) {
    let largeIndex = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    if (left < len && arr[left] > arr[largeIndex]) {
        largeIndex = left;
    }
    if (right < len && arr[right] > arr[largeIndex]) {
        largeIndex = left;
    }
    if (largeIndex !== i) {  // 即有一个叶子节点大于叶节点
        swap(largeIndex, i , arr);
        adjustment(arr, largeIndex);
    }
}
function swap (i, j, arr){
    let temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
}
function sort(arr){
    buildHeap(arr);
    for(let i = arr.length - 1; i > 0; i--){
        swap(0, i, arr);
        len --;
        adjustment(arr, 0);
    }
    return arr;
}
sort([8,5,9,1,4]);