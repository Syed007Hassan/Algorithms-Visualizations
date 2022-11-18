import { swap } from "./Utility";

export function getRadixSortAnimations(arr) {
    // Find the max number and multiply it by 10 to get a number, with no. of digits of max + 1
    var copy = [...arr];
    const len = copy.length;
    const animations = [];
    const maxNum = Math.max(...copy) * 10;
    let divisor = 10;
    while (divisor < maxNum) {
       // Create bucket arrays for each of 0-9
       let buckets = [...Array(10)].map(() => []);

       for(let i = 0; i < len; i++) {
      //   buckets[Math.floor((copy[i] % divisor) / (divisor / 10))].push(copy[i]);
        animations.push([[i, buckets[Math.floor((copy[i] % divisor) / (divisor / 10))].push(copy[i])], true]);
           
       }
       // Reconstruct the array by concatinating all sub arrays
       copy = [].concat.apply([], buckets);
      
       for(let j=0;j<copy.length;j++){
         animations.push([[j,copy[j]], true]);

       }
       // Move to the next significant digit
       divisor *= 10;
    }
    return animations;
 }