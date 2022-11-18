import { getInsertionSortAnimations } from "./InsertionSort";

export function getBucketSortAnimations(arr) {
   const copy = [...arr];
   const animations = [];
    if (copy.length === 0) {
       return copy;
    }
    let i,
    minValue = copy[0],
    maxValue = copy[0],
    bucketSize = 3;
    copy.forEach(function (currentVal) {
       if (currentVal < minValue) {
          minValue = currentVal;
          animations.push([[minValue], false]);
       } else if (currentVal > maxValue) {
          maxValue = currentVal;
          animations.push([[maxValue], false]); 
       }
    })
    let bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
    let allBuckets = new Array(bucketCount);
    for (i = 0; i < allBuckets.length; i++) {
       allBuckets[i] = [];
    }
    copy.forEach(function (currentVal) {
       allBuckets[Math.floor((currentVal - minValue) / bucketSize)].push(currentVal);
    });

   //  for(let j=0;j<copy.length;j++){
   //    animations.push([[j, allBuckets[Math.floor((copy[i] - minValue) / bucketSize)].push(copy[i])], true]);
   //  }

    copy.length = 0;
    allBuckets.forEach(function(bucket) {
      // console.log(bucket);
      getInsertionSortAnimations(bucket);
       bucket.forEach(function (element,index) {
          copy.push(element)
          animations.push([[index,copy[index]], true]);
       });
      //  for(let k=0;k<bucket.length;k++){
      //    animations.push([[k,copy.push(bucket[k])], true]);
      //  }
    });
    return animations;
 }
 

