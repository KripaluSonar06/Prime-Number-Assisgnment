export const questionsData = {
  1: {
    title: "Pattern Prime Numbers",
    description: "A prime number is 12345678910987654321. Here n is 10. Find the next number that follows this pattern. That number n lies between 1000 and 3000. This was discovered by an Indian.",
    inputs: [
      { label: "Min n value", name: "minN", type: "number", placeholder: "1000" },
      { label: "Max n value", name: "maxN", type: "number", placeholder: "3000" }
    ],
    hint: "This problem involves creating palindromic numbers by concatenating sequences: 1,2,3,...,n,...,3,2,1 and testing for primality.",
    algorithm: "Generate pattern numbers by concatenating ascending and descending sequences, then check primality using efficient algorithms. The answer to assignment question is 2446",
    code: `
import random
import sys
import gmpy2

def small_prime_check(num, p_set):
    x = int(num)
    for p in p_set:
        if x % p == 0 and x != p:
            return False
    return True

def MR_Primality_Check(num):
    x = int(num)
    k = 40
    isPrime = True
    for t in range(0, k):
        div_done = False
        a = random.SystemRandom().randrange(2, x)
        power = x - 1
        while power % 2 == 0:
            power //= 2
            if (pow(a, power, x) == x - 1):
                div_done = True
                break
        if div_done:
            continue
        elif pow(a, power, x) == x - 1 or pow(a, power, x) == 1:
            continue
        else:
            isPrime = False
            break
    return isPrime

small_prime_set = {2}
for i in range(3, 101):
    notPrime = False
    for p in small_prime_set:
        if (i % p == 0):
            notPrime = True
            break
    if not notPrime:
        small_prime_set.add(i)

sys.set_int_max_str_digits(100000)
n = int(input("Enter min n value: "))
m = int(input("Enter max n value: "))
prime_numbers_set = []
for i in range(n, m + 1):
    num = ""
    for x in range(1, i + 1):
        num += str(x)
    for x in range(1, i):
        num += str(i - x)
    print(f"token no. {i - n +1} / {m-n+1}")
    if small_prime_check(num, small_prime_set) == False:
        print(f"for n = {i}, number is not prime")
        continue
    if gmpy2.is_prime(int(num)) == True:
        prime_numbers_set.append(i)
        print(f"{num} is prime number where n = {i}")
    else:
        print(f"for n = {i}, number is not prime")

for p in prime_numbers_set:
    print(f"for n = {p}, there is a prime number")`
  },
  2: {
    title: "Repunit Primes",
    description: "11 is prime, 111 is not prime. We use the notation, 1(N) means N ones. For example, 1(7), we mean seven ones : 1111111. 1(N) is represented by (10^N-1)/9. If N is prime 1(N) might be prime. If N is not prime, 1(N) can not be prime. Thus we have to check only for N being prime. Determine the 5 primes between N=2 and N=1040.",
    inputs: [
      { label: "Min n value", name: "minN", type: "number", placeholder: "2"},
      { label: "Max n value", name: "maxN", type: "number", placeholder: "1040"},
      { label: "Exit after how many primes", name: "exitCount", type: "number", placeholder: "5"}
    ],
    hint: "Repunit numbers follow the pattern 1, 11, 111, 1111... and can be calculated using the formula (10^n-1)/9.",
    algorithm: "Using the mathematical formula (10^n - 1) / 9 to generate repunit numbers efficiently, then apply primality testing.",
    code: `
import random
import sys

small_prime_set = {2}
for i in range(3, 101):
    notPrime = False
    for p in small_prime_set:
        if(i % p == 0):
            notPrime = True
            break
    if not notPrime:
        small_prime_set.add(i)

def small_prime_check(num, p_set):
    x = int(num)
    for p in p_set:
        if x % p == 0 and x != p:
            return False
    return True
    
def MR_Primality_Check(num):
    x = int(num)
    if x < 101:
        if small_prime_check(num, small_prime_set):
            return True
        else:
            return False
    k = 40
    isPrime = True
    for t in range(0, k):
        div_done = False
        a = random.SystemRandom().randrange(2, x)
        power = x - 1
        while power % 2 == 0:
            power //= 2
            if(pow(a, power, x) == x - 1):
                div_done = True
                break
        if div_done:
            continue
        elif pow(a, power, x) == x - 1 or pow(a, power, x) == 1:
            continue
        else:
            isPrime = False
            break
    return isPrime

sys.set_int_max_str_digits(100000)
n = int(input("Enter min n value: "))
m = int(input("Enter max n value: "))
pm = int(input("After how many prime should the program exit (if found): "))
prime_count = 0
for i in range(n, m+1):
    if small_prime_check(i, small_prime_set) == False:
        continue
    if MR_Primality_Check(i) == False:
        continue
    if MR_Primality_Check(((10**i - 1) // 9)) == True:
        prime_count += 1
        print(f"1({i}) = {((10**i - 1) // 9)} is a prime number")
        print(f"Prime count so far = {prime_count}")
    if prime_count == pm:
        break
    `
  },
  3: {
    title: "Mersenne Primes",
    description: "We are interested in Mersenne primes. A Mersenne prime is a prime number that is one less than a power of two. The largest Mersenne prime discovered was on Oct 12, 2024 when 2^p-1 where p=136,279,841. This has 41,024,320 digits. Find the two primes where p lies between 2201 and 2299. These primes were discovered in 1952.",
    inputs: [
      { label: "Min p value", name: "minP", type: "number", placeholder: "2201"},
      { label: "Max p value", name: "maxP", type: "number", placeholder: "2299"}
    ],
    hint: "Mersenne primes have the form 2^p - 1 where p itself must be prime. These are among the largest known primes.",
    algorithm: "First verify that p is prime, then compute 2^p - 1 and test for primality using specialized algorithms.",
    code: `
import random

small_prime_set = {2}
for i in range(3, 101):
    notPrime = False
    for p in small_prime_set:
        if(i % p == 0):
            notPrime = True
            break
    if not notPrime:
        small_prime_set.add(i)

def small_prime_check(num, p_set):
    x = int(num)
    for p in p_set:
        if x % p == 0 and x != p:
            return False
    return True
    
def MR_Primality_Check(num):
    x = int(num)
    if x < 101:
        if small_prime_check(num, small_prime_set):
            return True
        else:
            return False
    k = 40
    isPrime = True
    for t in range(0, k):
        div_done = False
        a = random.SystemRandom().randrange(2, x)
        power = x - 1
        while power % 2 == 0:
            power //= 2
            if(pow(a, power, x) == x - 1):
                div_done = True
                break
        if div_done:
            continue
        elif pow(a, power, x) == x - 1 or pow(a, power, x) == 1:
            continue
        else:
            isPrime = False
            break
    return isPrime

n = int(input("Enter min p value: "))
m = int(input("Enter max p value: "))
prime_count = 0
for i in range(n, m+1):
    x = 2**i - 1
    if small_prime_check(x, small_prime_set) == False:
        continue
    if MR_Primality_Check(x) == True:
        prime_count += 1
        print(f"2^{i} - 1 = {x} is a prime number")
        print(f"Prime count so far = {prime_count}")
    `
  },
  4: {
    title: "Brocard's Conjecture",
    description: "Brocard's conjecture is the conjecture (open problem) that there are at least four prime numbers between (p(n))2 and (p(n+1))^2, where p(n) is the nth prime number, for every n ≥ 2. Use the two prime numbers you obtained in #3 and determine at least four prime numbers between the squares of those numbers.",
    inputs: [
      { label: "Min p value", name: "minP", type: "number", placeholder: "2201"},
      { label: "Max p value", name: "maxP", type: "number", placeholder: "2299"}
    ],
    hint: "This conjecture involves finding consecutive primes and checking the number of primes between their squares.",
    algorithm: "First run question 3 to get the Mersenne primes. Find consecutive primes for each prime found in #3, compute their squares, then count primes in the interval between consecutive prime squares.",
    code: `
import random
import gmpy2

small_prime_set = {2}
for i in range(3, 101):
    notPrime = False
    for p in small_prime_set:
        if(i % p == 0):
            notPrime = True
            break
    if not notPrime:
        small_prime_set.add(i)

def small_prime_check(num, p_set):
    x = int(num)
    for p in p_set:
        if x % p == 0 and x != p:
            return False
    return True
    
def MR_Primality_Check(num):
    x = int(num)
    if x < 101:
        if small_prime_check(num, small_prime_set):
            return True
        else:
            return False
    k = 40
    isPrime = True
    for t in range(0, k):
        div_done = False
        a = random.SystemRandom().randrange(2, x)
        power = x - 1
        while power % 2 == 0:
            power //= 2
            if(pow(a, power, x) == x - 1):
                div_done = True
                break
        if div_done:
            continue
        elif pow(a, power, x) == x - 1 or pow(a, power, x) == 1:
            continue
        else:
            isPrime = False
            break
    return isPrime

n = int(input("Enter min p value: "))
m = int(input("Enter max p value: "))
primes = []
for i in range(n, m+1):
    x = 2**i - 1
    if small_prime_check(x, small_prime_set) == False:
        continue
    if gmpy2.is_prime(x) == True:
        print(f"2^{i} - 1 = {x} is a prime number")
        primes.append(x)
for p in primes:
    q = p + 1
    while True:
        if small_prime_check(q, small_prime_set) == False:
            q += 1
            continue
        if gmpy2.is_prime(q) == False:
            q += 1
            continue
        else:
            break
    print(f"two consecutive primes are {p} and {q}")
    print(f"Their squares are {p**2} and {q**2} ... Have to find atleast 4 primes between them ...")
    prime_count = 0
    for x in range(p**2, q**2):
        if small_prime_check(x, small_prime_set) == False:
            continue
        if gmpy2.is_prime(x) == True:
            prime_count += 1
            print(f"{x} is a prime number ... {prime_count} prime number(s) found so far")
        if prime_count >= 4:
            print(f"{prime_count} prime numbers found ... PROVED!!!")
            break
    `
  },
  5: {
    title: "Palindromic Primes",
    description: "Palindromic prime numbers are prime numbers that are also palindromes. The simpler ones are 11 and 122333221. More interesting ones are 1223334444555554444333221 and 12233355555333221. The largest found so far is 10^1888529 − 10^944264 − 1 which has 1,888,529 digits. Find a palindromic prime that has at least 50 digits.",
    inputs: [
      { label: "Minimum digits", name: "minDigits", type: "number", placeholder: "50"},
      { label: "Maximum digits", name: "maxDigits", type: "number", placeholder: "51"},
      { label: "Exit after how many primes", name: "exitCount", type: "number", placeholder: "1"}
    ],
    hint: "Generate palindromic numbers systematically by constructing the first half and mirroring it.",
    algorithm: "Construct palindromes by generating the first half and creating the mirror image, then test for primality.",
    code: `
import random

def small_prime_check(num, p_set):
    x = int(num)
    for p in p_set:
        if x % p == 0 and x != p:
            return False
    return True
    
def MR_Primality_Check(num):
    x = int(num)
    k = 40
    isPrime = True
    for t in range(0, k):
        div_done = False
        a = random.SystemRandom().randrange(2, x)
        power = x - 1
        while power % 2 == 0:
            power //= 2
            if(pow(a, power, x) == x - 1):
                div_done = True
                break
        if div_done:
            continue
        elif pow(a, power, x) == x - 1 or pow(a, power, x) == 1:
            continue
        else:
            isPrime = False
            break
    return isPrime
        
def increment(half):
    x = int(half)
    x = x+1
    return str(x)

small_prime_set = {2}
for i in range(3, 101):
    notPrime = False
    for p in small_prime_set:
        if(i % p == 0):
            notPrime = True
            break
    if not notPrime:
        small_prime_set.add(i)
        
n = int(input("Enter minimum digits: "))
m = int(input("Enter maximum digits: "))
pm = int(input("After how many prime should the program exit (if found): "))
prime_count = 0
if(n % 2 == 0):
    n += 1
half = "1"
for i in range(1, n // 2):
    half += "0"
found = False
while True:
    for x in range(0, 10):
        palindrome = half + str(x) + half[::-1]
        if not small_prime_check(palindrome, small_prime_set):
            continue
        if MR_Primality_Check(palindrome):
            prime_count += 1
            print(f"{palindrome} is a prime number and it has {len(palindrome)} digits")
            print(f"Prime count so far = {prime_count}")
        if prime_count == pm:
            break
    if prime_count == pm:
        break
    half = increment(half)
    if 2 * len(half) + 1 > m:
        break
    `
  },
  6: {
    title: "Perfect Numbers",
    description: "A perfect number is a positive integer that is equal to the sum of its positive proper divisors, that is, divisors excluding the number itself. For instance, 6 has proper divisors 1, 2 and 3, and 1 + 2 + 3 = 6, so 6 is a perfect number. The next perfect number is 28, since 1 + 2 + 4 + 7 + 14 = 28. Euclid proved that if 2^p- 1 is prime, then 2^(p-1)*(2^p- 1) is a perfect number and then Euler proved that all even perfect numbers followed this form. The existence of odd perfect numbers is an open problem and it can be shown if such a number exists it should be > 10^1500.. Using the primes in #3, prove that the above expression yields a perfect number.",
    inputs: [
      { label: "Min p value", name: "minP", type: "number", placeholder: "2201"},
      { label: "Max p value", name: "maxP", type: "number", placeholder: "2299"}
    ],
    hint: "Perfect numbers are closely related to Mersenne primes. If 2^p - 1 is prime, then 2^(p-1) * (2^p - 1) is perfect.",
    algorithm: "Find Mersenne primes 2^p - 1, then compute the corresponding perfect number using Euclid's formula.",
    code: `
import random

small_prime_set = {2}
for i in range(3, 101):
    notPrime = False
    for p in small_prime_set:
        if(i % p == 0):
            notPrime = True
            break
    if not notPrime:
        small_prime_set.add(i)

def small_prime_check(num, p_set):
    x = int(num)
    for p in p_set:
        if x % p == 0 and x != p:
            return False
    return True
    
def MR_Primality_Check(num):
    x = int(num)
    if x < 101:
        if small_prime_check(num, small_prime_set):
            return True
        else:
            return False
    k = 40
    isPrime = True
    for t in range(0, k):
        div_done = False
        a = random.SystemRandom().randrange(2, x)
        power = x - 1
        while power % 2 == 0:
            power //= 2
            if(pow(a, power, x) == x - 1):
                div_done = True
                break
        if div_done:
            continue
        elif pow(a, power, x) == x - 1 or pow(a, power, x) == 1:
            continue
        else:
            isPrime = False
            break
    return isPrime

n = int(input("Enter min p value: "))
m = int(input("Enter max p value: "))
powers = []
for i in range(n, m+1):
    x = 2**i - 1
    if x < 2:
        continue
    if small_prime_check(x, small_prime_set) == False:
        continue
    if MR_Primality_Check(x) == True:
        print(f"2^{i} - 1 = {x} is a prime number")
        powers.append(i)
for p in powers:
    x = 2 ** (p - 1) * (2 ** p - 1)
    print(f"Checking p = {p} and number is (2^({p} - 1)) * (2^{p} - 1) = {2 ** (p - 1)} * {(2 ** p - 1)} = {x}")
    sum = 0
    curr = 1
    for t in range(0, p):
        print(f"{curr} is a divisor of {x} and {curr} < {x}")
        print(f"=> {sum} + {curr} = {sum + curr}")
        sum += curr;
        curr2 = curr * (2 ** p - 1)
        if curr2 != x:
            print(f"{curr2} is a divisor of {x} and {curr2} < {x}")
            print(f"=> {sum} + {curr2} = {sum + curr2}")
            sum += curr2;
        curr *= 2
    if (sum == x):
        print(f"[Proved]")
    else:
        print("[Disproved]")
    `
  },
  7: {
    title: "Prime Conjectures Collection",
    description: "These some interesting problem in prime numbers, which are all open problems. Some are as follows and prove them for a number that has greater than 50 digits. Conjecture statements are given in Hint tab's Sub Problem section",
    inputs: [
      {
        label: "Conjecture type (a-f)", name: "type", type: "select",
        options: [
          { value: "a", label: "Wieferich Primes" },
          { value: "b", label: "Goldbach Conjecture" },
          { value: "c", label: "Weak Goldbach Problem" },
          { value: "d", label: "Prime Differences" },
          { value: "e", label: "Legendre's Conjecture" },
          { value: "f", label: "Oppermann's Conjecture" }
        ]
      },
      { label: "Upper limit for checking", name: "limit", type: "number", placeholder: "n"}
    ],
    hint: "These are famous unsolved or recently solved problems in number theory, each exploring different patterns in prime distribution.",
    algorithm: "Each conjecture has its own specific algorithm for verification within given bounds.",
    code: `
# Go to our github repo for codes of these conjectures
    `,
    subProblems: {
      'a': {
         title: "Wieferich Primes", 
         description: "A Wieferich prime is a prime p such that p^2 is a divisor of 2^(p-1) - 1. We only know two Wieferich primes: 1093 and 3511. The crazy thing is that we conjecture that there are infinitely many Wieferich primes… but we only know two of them!" 
        },
      'b': { 
        title: "Goldbach Conjecture",
        description: "Every even n > 2 is the sum of two primes."
      },
      'c': { 
        title: "Weak Goldbach Problem", 
        description: "Every odd n > 5 is the sum of three primes." 
      },
      'd': { 
        title: "Prime Differences", 
        description: "Every even number is the difference of two primes." 
      },
      'e': { 
        title: "Legendre's Conjecture", 
        description: "Legendre's conjecture that there is a prime between consecutive integer squares directly implies that there are at least two primes between prime squares for p(n) ≥ 3 since p(n+1) − p(n) ≥ 2." 
      },
      'f': { 
        title: "Oppermann's Conjecture", 
        description: "Oppermann's conjecture is that for any integer n greater than 1, there is always a prime number between n(n- 1) and n^2, and another between n^2 and n(n + 1)." 
      }
    }
  }
};

export default questionsData;