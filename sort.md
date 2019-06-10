# 冒泡排序

## 原理

比较任何两个相邻的项，如果第一个比第二个大，则交换它们。元素项向上移动至正确的顺序，就好像气泡升至表面一样，冒泡排序因此得名。

## 图解

以数组[8,9,2,5,7]为例

- 第一次循环：此次循环的多次比较交换，使最大的数字9冒在最下面
<div align=center>
  <img src="img/sort/maopao/m1.png" />
</div>

- 第二次循环：此次循环中的多次比较和交换，使8往下冒，最终排到倒数第二个位置。

<div align=center>
  <img src="img/sort/maopao/m2.png" />
</div>

可以看到这个这次循环比第一次少一层循环
这是因为第一次循环时已经把最大的9排到最下面的位置了，这次排序肯定不会去占用最上面的位置的，所以此时比较次数可以比前面少一次。

- 第三次循环：同理，此时7会往下冒。比较次数同理又会比前面少一次。
<div align=center>
  <img src="img/sort/maopao/m3.png" />
</div>

- 第四次循环： 5已经排在2的下面了，比较后不交换。
<div align=center>
  <img src="img/sort/maopao/m4.png" />
</div>

## 代码实现

以上总共实现了两次循环，以数组的长度为leng

第一层循环 ```javascript for(let i = 0; i < leng-1; i++) ```

第二层循环 ```javascript for(let j = 0; j < leng-i-1; j++)```

```javascript
    function sort(arr) {
      const leng = arr.length;
      for (let i = 0; i < leng - 1; i++) {  
        for (let j = 0; j < leng - i - 1; j++) { 
          if (arr[j] > arr[j + 1]) {
              const swap = arr[j];
              arr[j] = arr[j + 1];
              arr[j + 1] = swap;
            }
        }
      }
      return arr;
    }
```

# 选择排序

## 原理

选择排序算法是一种原址比较排序算法。选择排序大致的思路是找到数据结构中的最小值并将其放置在第一位，接着找到第二小的值并将其放在第二位，以此类推。

## 图解

* 假定未排序数组中，第一个数为最小

<div align=center>
  <img src="img/sort/ks.png" />
</div>

## 代码实现

```javascript
    function sort(arr) {
        const leng = arr.length;
        for (let i = 0; i < leng - 1; i++) {
            let min = arr[i];
            let pos = i;
            for (let j = i + 1; j < leng; j++) {
                if (arr[j] < min) {
                    min = arr[j];
                    pos = j;
                }
            }
            if(pos!==i){
                arr[pos] = arr[i];
                arr[i] = min;
            }
        }
        return arr;
    }
```

# 插入排序

## 原理

插入排序每次排一个数组项，以此方式构建最后的排序数组。假定第一项已经排序了，接着，它和第二项进行比较，第二项是应该待在原位还是插到第一项之前呢？这样，头两项就已正确排序，接着和第三项比较（它是该插入到第一、第二还是第三的位置呢？），以此类推。

将一个元素插入到其它已经有序的牌中的适当位置，因此其他所有元素在插入之前都向右移动一位，为新元素腾出空间

## 图解

- 第一次循环 第一个数已经是自然的有序数，前面无任何数了，所以不需要比较，我们拿第二个数开始比较，9与在它前面的是进行比较，8<9。在8前面已经没有数据了，第一次比较完毕，9的位置还是赋值9；

<div align=center>
  <img src="img/sort/charu/c1.png" />
</div>

- 第二次循环 

经过第一次循环，[8,9]已经是有序数列了，从第3个数开始，与其前面的数进行对比；2<9,9往后移动一位，2<8,8往后移动一位，此时前面已无元素，2插入到第一位

<div align=center>
  <img src="img/sort/charu/c2.png" />
</div>

- 第三次循环

经过第二次循环，[2,8,9]一级是有序数列了，从第四个数开始；7<9,9往后移动一位，7<8,8往后移动一位，7>2,不移动，7插入在8的位置；

<div align=center>
  <img src="img/sort/charu/c3.png" />
</div>

- 第四次循环

<div align=center>
  <img src="img/sort/charu/c4.png" />
</div>


## 代码实现

```javascript
    function sort(arr) {
        const leng = arr.length;
        for (let i = 1; i < leng; i++) {
            let temp = arr[i];
            let j = i;
            while (j > 0 && arr[j - 1]> temp) {
                arr[j] = arr[j - 1];
                j--;
            }
            arr[j] = temp;
        }
        return arr;
    }
```
# 希尔排序

## 原理

希尔排序是按一定的间隔对数列进行分组，然后在每一个分组中做插入排序；随后逐次缩小间隔，在每一个分组中做插入排序...直到间隔等于1，做一次插入排序后结束。通常我们去取初始间隔为数列长度的一半：gap = length/2，以 gap = gap/2 的方式缩小;

## 图解

* (1) 首先取间隔为 gap = length/2 = 4，将数组分为如下的4组，对每一组实施插入排序：
<div align=center>
  <img src="img/sort/xier/x1.png" />
</div>

* (2) 接着继续分组，gap = gap/2 = 2，对每一组实施插入排序：
<div align=center>
  <img src="img/sort/xier/x2.png" />
</div>

* (3) 继续对数组分组，gap = gap/2 = 1，即所有元素组成一组，做插入排序完成算法：
<div align=center>
  <img src="img/sort/xier/x3.png" />
</div>

## 代码实现

```javascript
function sort(arr) {
    for (let gap = Math.floor(arr.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
        // 内层循环与插入排序的写法基本上一直，每次移动的步长变成了gap
        for (let i = gap; i < arr.length; i++) {
            let temp = arr[i];
            let j = i;
            while (j > 0 && arr[j - gap]> temp) {
                arr[j] = arr[j - gap];
                j = j - gap;
            }
            arr[j] = temp;
        }
    }
    return arr;
}
```

# 归并排序

## 原理

其思想是将原始数组切分成较小的数组，直到每个小数组只有一个位置，接着将小数组归并成较大的数组，直到最后只有一个排序完毕的大数组。(分治)

## 图解

<div align=center>
  <img src="img/sort/gb.png" />
</div>

## 代码实现

```javascript
      const merge = function (left, right) {
        const result = [];
        let il = 0;
        let ir = 0;
        while (il < left.length && ir < right.length) {
          if (left[il] < right[ir]) {
            result.push(left[il]);
            il++;
          } else {
            result.push(right[ir]);
            ir++;
          }
        }
        while (il < left.length) {
          result.push(left[il]);
          il++;
        }
        while (ir < right.length) {
          result.push(right[ir]);
          ir++;
        }
        return result;
      };
      const merageSort = function (arr) {
        const length = arr.length;
        if (length === 1) return arr;
        const mid = Math.floor(length / 2); // Math.floor向下取整
        const left = arr.slice(0, mid);
        const right = arr.slice(mid, length);
        return merge(merageSort(left), merageSort(right));
      };
```

# 快速排序

## 原理
* （1）在数据集之中，选择一个元素作为"基准"（pivot）。

* （2）所有小于"基准"的元素，都移到"基准"的左边；所有大于"基准"的元素，都移到"基准"的右边。

* （3）对"基准"左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。

## 图解

* (1) 以35为基数，按照顺序，将每个元素与"基准"进行比较，形成两个子集；大于的在右边，小于的在左边

<div align=center>
  <img src="img/sort/kuaisu/k1.png" />
</div>

* (2) 左边的以14为基数，右边的以96为基数，重复步骤1

<div align=center>
  <img src="img/sort/kuaisu/k2.png" />
</div>

* (3) 重复步骤1，直到所有子集只剩下一个元素为止

<div align=center>
  <img src="img/sort/kuaisu/k3.png" />
</div>

## 代码实现

```javascript
    function sort(arr) {
      if (arr.length <= 1) return arr;
      const pivotIndex = Math.floor(arr.length / 2);
      const pivot = arr.splice(pivotIndex, 1)[0];
      const left = [];
      const right = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
          left.push(arr[i]);
        } else {
          right.push(arr[i]);
        }
      }
      return sort(left).concat([pivot], sort(right));
    }
```

