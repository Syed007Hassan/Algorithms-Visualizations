import React, { useState, useEffect, useRef } from "react";

export function getBucketSortAnimations(arr, setComp, setSpace) {

   const copy = [...arr];
   const animations = [];
   setSpace("Space Complexity: O(n)");
    // O(n) for space complexity since we are using an extra space to store animations approximately equal to the size of the array

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
      setComp("Time Complexity: O(n)");
       // O(n) for copy array
   })
   let bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
   let allBuckets = new Array(bucketCount);
   setSpace("Space Complexity: O(n+k)");
    // O(k) for allBuckets array and O(n) for animations array
   for (i = 0; i < allBuckets.length; i++) {
      allBuckets[i] = [];
      setComp("Time Complexity: O(k)");
       // O(k) for counts arrays
   }
   copy.forEach(function (currentVal) {
      setComp("Time Complexity: O(n+k)");
       // O(n+k) for copy and counts array
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
 

