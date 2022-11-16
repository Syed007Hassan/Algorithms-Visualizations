import {utility} from './utility.js';    

const findMaximum = arr => arr.reduce((acc, val) => val > acc ? val: acc, Number.MIN_VALUE)
export function countingSort(arr){
    const copy = [...arr];
    const animations = [];
//    const max = findMaximum(arr);
   const max = findMaximum(copy)
   const counts = new Array(max + 1);
   counts.fill(0);
   copy.forEach(value => counts[value]++);
   const res = [];
   let resultIndex = 0;
   counts.forEach((count, index) => {
      for (let i = 0; i < count; i++) {
         res[resultIndex] = index;
         animations.push([[resultIndex,res[resultIndex+1]],true]);
         resultIndex++;
         animations.push([[resultIndex,res[resultIndex]],true]);
      };
   });
   return animations;
};