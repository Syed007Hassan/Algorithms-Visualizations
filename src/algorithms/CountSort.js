
const findMaximum = copy => copy.reduce((acc, val) => val > acc ? val: acc, Number.MIN_VALUE)
export function getCountSortAnimations(arr, setComp, setSpace){
    const copy = [...arr];
    const animations = [];
      setSpace("Space Complexity: O(n)"); // O(n) for space complexity since we are using an extra space to store animations approximately equal to the size of the array
//    const max = findMaximum(arr);
   const max = findMaximum(copy)
   const counts = new Array(max + 1);
   setSpace("Space Complexity: O(n+k)"); // O(k) since we are creating an array of size k where k is the maximum value in the array and n is the size of the animations array
   counts.fill(0);
   copy.forEach(value => counts[value]++);
   setComp("Time Complexity: O(n)"); // O(n) for copy array
   const res = [];
   let resultIndex = 0;
   counts.forEach((count, index) => {
      setComp("Time Complexity: O(n+k)"); // O(n+k) for counts array
      for (let i = 0; i < count; i++) {
         res[resultIndex] = index;
          animations.push([[resultIndex],false]);
         animations.push([[resultIndex,res[resultIndex]],true]);
         resultIndex++;
         animations.push([[resultIndex],false]);
      };
       animations.push([[resultIndex,res[resultIndex]],true]);
   });
   return animations;
};