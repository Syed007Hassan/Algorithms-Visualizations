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
    bucketSize = 5;
    copy.forEach(function (currentVal) {
       if (currentVal < minValue) {
          minValue = currentVal;
       } else if (currentVal > maxValue) {
          maxValue = currentVal;
       }
    })
    let bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
    let allBuckets = new Array(bucketCount);
    for (i = 0; i < allBuckets.length; i++) {
       allBuckets[i] = [];
    }
   //  copy.forEach(function (currentVal) {
   //     allBuckets[Math.floor((currentVal - minValue) / bucketSize)].push(currentVal);
   //  });

    for(let j=0;j<copy.length;j++){
      animations.push([[j, allBuckets[Math.floor((copy[j] - minValue) / bucketSize)].push(copy[j])], true]);
    }
    copy.length = 0;
    allBuckets.forEach(function(bucket) {
      console.log(bucket);
      getInsertionSortAnimations(bucket);
      //  bucket.forEach(function (element) {
      //     copy.push(element)
      //  });
       for(let k=0;k<bucket.length;k++){
         animations.push([[k,copy[k]], true]);
       }
    });
    return animations;
 }
