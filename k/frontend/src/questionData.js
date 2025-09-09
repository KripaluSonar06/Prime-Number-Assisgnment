export const questionsData = {
  1: {
    title: "Pattern Prime Numbers",
    description: "A prime number is 12345678910987654321. Here n is 10. Find the next number that follows this pattern. That number n lies between 1000 and 3000.",
    inputs: [
      { label: "Min n value", name: "minN", type: "number", placeholder: "1000", min: 1000, max: 3000 },
      { label: "Max n value", name: "maxN", type: "number", placeholder: "3000", min: 1000, max: 3000 }
    ],
    hint: "This problem involves creating palindromic numbers by concatenating sequences: 1,2,3,...,n,...,3,2,1 and testing for primality.",
    algorithm: "Generate pattern numbers by concatenating ascending and descending sequences, then check primality using efficient algorithms."
  },
  2: {
    title: "Repunit Primes",
    description: "11 is prime, 111 is not prime. We use the notation, 1n means N ones. For example, 15 means seven ones = 1111111. 1n is represented as (10^n-1)/9. Find 1n is prime.",
    inputs: [
      { label: "Min n value", name: "minN", type: "number", placeholder: "2", min: 1 },
      { label: "Max n value", name: "maxN", type: "number", placeholder: "100", min: 1 },
      { label: "Exit after how many primes", name: "exitCount", type: "number", placeholder: "5", min: 1 }
    ],
    hint: "Repunit numbers follow the pattern 1, 11, 111, 1111... and can be calculated using the formula (10^n-1)/9.",
    algorithm: "Use the mathematical formula to generate repunit numbers efficiently, then apply primality testing."
  },
  3: {
    title: "Mersenne Primes",
    description: "We are interested in Mersenne primes. A Mersenne prime is a prime number that is one less than a power of two. Find Mersenne primes of the form 2^p - 1 where p is prime.",
    inputs: [
      { label: "Min p value", name: "minP", type: "number", placeholder: "2", min: 2 },
      { label: "Max p value", name: "maxP", type: "number", placeholder: "100", min: 2 }
    ],
    hint: "Mersenne primes have the form 2^p - 1 where p itself must be prime. These are among the largest known primes.",
    algorithm: "First verify that p is prime, then compute 2^p - 1 and test for primality using specialized algorithms."
  },
  4: {
    title: "Brocard's Conjecture",
    description: "Brocard's conjecture states that there are at least four primes between the squares of consecutive primes greater than 2.",
    inputs: [
      { label: "Min p value", name: "minP", type: "number", placeholder: "3", min: 3 },
      { label: "Max p value", name: "maxP", type: "number", placeholder: "20", min: 3 }
    ],
    hint: "This conjecture involves finding consecutive primes and checking the number of primes between their squares.",
    algorithm: "Find consecutive primes, compute their squares, then count primes in the interval between consecutive prime squares."
  },
  5: {
    title: "Palindromic Primes",
    description: "Find palindromic prime numbers within specified digit ranges. These are primes that read the same forwards and backwards.",
    inputs: [
      { label: "Minimum digits", name: "minDigits", type: "number", placeholder: "3", min: 1 },
      { label: "Maximum digits", name: "maxDigits", type: "number", placeholder: "7", min: 1 },
      { label: "Exit after how many primes", name: "exitCount", type: "number", placeholder: "5", min: 1 }
    ],
    hint: "Generate palindromic numbers systematically by constructing the first half and mirroring it.",
    algorithm: "Construct palindromes by generating the first half and creating the mirror image, then test for primality."
  },
  6: {
    title: "Perfect Numbers",
    description: "A perfect number is a positive integer equal to the sum of its positive proper divisors. Find perfect numbers using the formula 2^(p-1) * (2^p - 1) where 2^p - 1 is prime.",
    inputs: [
      { label: "Min p value", name: "minP", type: "number", placeholder: "2", min: 2 },
      { label: "Max p value", name: "maxP", type: "number", placeholder: "20", min: 2 }
    ],
    hint: "Perfect numbers are closely related to Mersenne primes. If 2^p - 1 is prime, then 2^(p-1) * (2^p - 1) is perfect.",
    algorithm: "Find Mersenne primes 2^p - 1, then compute the corresponding perfect number using Euclid's formula."
  },
  7: {
    title: "Prime Conjectures Collection",
    description: "Explore various famous prime number conjectures including Wieferich primes, Goldbach conjecture, and others.",
    inputs: [
      { label: "Conjecture type (a-f)", name: "type", type: "select", 
        options: [
          { value: "a", label: "Wieferich Primes" },
          { value: "b", label: "Goldbach Conjecture" },
          { value: "c", label: "Weak Goldbach Problem" },
          { value: "d", label: "Prime Differences" },
          { value: "e", label: "Legendre's Conjecture" },
          { value: "f", label: "Oppermann's Conjecture" }
        ]
      },
      { label: "Upper limit", name: "limit", type: "number", placeholder: "1000", min: 1 }
    ],
    hint: "These are famous unsolved or recently solved problems in number theory, each exploring different patterns in prime distribution.",
    algorithm: "Each conjecture has its own specific algorithm for verification within given bounds.",
    subProblems: {
      'a': { title: "Wieferich Primes", description: "Find primes p where 2^(p-1) ≡ 1 (mod p^2)" },
      'b': { title: "Goldbach Conjecture", description: "Every even integer > 2 = sum of two primes" },
      'c': { title: "Weak Goldbach Problem", description: "Every odd number > 5 = sum of three primes" },
      'd': { title: "Prime Differences", description: "Every even positive integer = difference of two primes" },
      'e': { title: "Legendre's Conjecture", description: "Prime between n^2 and (n+1)^2" },
      'f': { title: "Oppermann's Conjecture", description: "Prime between n(n-1) and n^2, and between n^2 and n(n+1)" }
    }
  }
};

export default questionsData;