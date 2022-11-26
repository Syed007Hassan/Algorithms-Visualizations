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
   copy.forEach(function (currentVal, index) {
      if (currentVal < minValue) {
         minValue = currentVal;
         animations.push([[index,minValue], false]);
      } else if (currentVal > maxValue) {
         maxValue = currentVal;
         animations.push([[index,maxValue], false]);
      }
   })
   let bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
   let allBuckets = new Array(bucketCount);
   for (i = 0; i < allBuckets.length; i++) {
      allBuckets[i] = [];
   }
   copy.forEach(function (currentVal) {
      allBuckets[Math.floor((currentVal - minValue) / bucketSize)].push(currentVal);
      animations.push([[Math.floor((currentVal - minValue) / bucketSize),currentVal], true]);
   });
   copy.length = 0;
   allBuckets.forEach(function(bucket) {
       insertion(bucket, animations);
      // getInsertionSortAnimations(bucket);
      bucket.forEach(function (element) {
         copy.push(element)
      });
   });
   return animations;
}
function insertion(arr, animations) {
   let length = arr.length;
   let i, j;
   for(i = 1; i < length; i++) {
      let temp = arr[i];
      for(j = i - 1; j >= 0 && arr[j] > temp; j--) {
         arr[j+1] = arr[j];
         animations.push([[j+1,arr[j]], true]);
      }
      arr[j+1] = temp;
      animations.push([[j+1,temp], true]);
   }
   return arr;
};
 

