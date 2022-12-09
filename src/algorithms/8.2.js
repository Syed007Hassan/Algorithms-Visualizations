// Assume that our integers are stored in array A[1 · · · n] and thus, length[A] = n. We need two additional
// arrays B[1 · · · k] and C[1 · · · k]. Our algorithm will first initialize all elements of array B to 0. This step
// requires O(k) time. Next, for each element of array A (i.e., A[i] for i = 1, 2, · · · , n), we will increment
// B[A[i]]. Observe that this step will require O(n) time and B[j] for j = 1, 2, · · · , k, now contains the number
// of elements of A having value j. Finally, make C[1] = B[1] and for each element l of array C where
// l = 2, 3, · · · , k, we will compute C[l] = B[l] + B[l − 1]. This step takes O(k) time.
// Now, to answer any query about how many of n integers fall into a range [a · · · b], we simply compute
// C[b] − C[a] + B[a]. Observe that this computation requires only O(1) time after the O(n + k) preprocessing
// time.


const findMaximum = copy => copy.reduce((acc, val) => val > acc ? val: acc, Number.MIN_VALUE)

export function getExample8(arr, setComp, setSpace, setRange) {
    console.log("getExample8");
    const copy =[...arr];
    var num=0;
    const animations = [];
    setSpace("Space Complexity: O(n)"); // O(n) for space complexity since we are using an extra space to store animations approximately equal to the size of the array
    const res = [];
    setSpace("Space Complexity: O(1)"); // O(1) since we are not using extra space of constant size
    const K = findMaximum(copy);
    var B, C;
    var start = 0, end = 50;
    B = new Array(K+1);
    setSpace("Space Complexity: O(n+k+1)"); // O(k) since we are creating an array B of size k where k is the maximum value in the array and n is the size of the animations array
    for (var i = 0; i < B.length; i++) {
        B[i] = 0;
    }
    copy.forEach(value => B[value]++);
    setComp("Time Complexity: O(n)"); // O(n) for copy array

    let resultIndex = 0;
    B.forEach((count, index) => {
        setComp("Time Complexity: O(k)"); // O(k) for B array
        for (let i = 0; i < count; i++) {
           res[resultIndex] = index;
            animations.push([[resultIndex],false]);
           animations.push([[resultIndex,res[resultIndex]],true]);
           resultIndex++;
           animations.push([[resultIndex],false]);
        };
         animations.push([[resultIndex,res[resultIndex]],true]);
    });

    setComp("Time Complexity: O(n+k)"); // Overall time complexity

    C = new Array(K+1);

    C[0] = B[0];

    for (var l = 1; l <= K; l++) {
        C[l] = B[l] + C[l - 1];
        
    }
    //console.log(C[98],C[start], C[end], B[48]);
    console.log(C[end] - C[start] + B[start]);
    setRange("Range: " + (C[end] - C[start] + B[start]));

    return animations;
}