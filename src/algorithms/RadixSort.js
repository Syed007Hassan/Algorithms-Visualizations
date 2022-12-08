import { swap } from "./Utility";

import React, { useState, useEffect, useRef } from "react";

export function getRadixSortAnimations(arr , setComp, setSpace) {
    // Find the max number and multiply it by 10 to get a number, with no. of digits of max + 1
    var copy = [...arr];
    const len = copy.length;
    const animations = [];
    setSpace("Space Complexity: O(n)"); // O(n) for space complexity since we are using an extra space to store animations approximately equal to the size of the array
    const maxNum = Math.max(...copy) * 10;
    let divisor = 10;
    setComp("Time Complexity: O(n)"); // O(n) for finding max number
    while (divisor < maxNum) {
      setComp("Time Complexity: O(nk)"); // O(nk) for best, average and worst case
       // Create bucket arrays for each of 0-9
       let buckets = [...Array(10)].map(() => []);
       setSpace("Space Complexity: O(n+k)"); // O(k) for space complexity of buckets array and O(n) for space complexity of animations array

       for(let i = 0; i < len; i++) {
      //   buckets[Math.floor((copy[i] % divisor) / (divisor / 10))].push(copy[i]);
        animations.push([[i, buckets[Math.floor((copy[i] % divisor) / (divisor / 10))].push(copy[i])], true]);
           
       }
       // Reconstruct the array by concatinating all sub arrays
       copy = [].concat.apply([], buckets);
      
       for(let j=0;j<copy.length;j++){
         animations.push([[j,copy[j]], true]);
         animations.push([[j+1,copy[j]], false]);

       }
       // Move to the next significant digit
       divisor *= 10;
    }
    return animations;
 }