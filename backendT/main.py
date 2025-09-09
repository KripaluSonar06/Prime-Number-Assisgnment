from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import random
import gmpy2
import time
import sys

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # your React app
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Utility functions
def small_prime_check(num, p_set):
    x = int(num)
    for p in p_set:
        if x % p == 0 and x != p:
            return False
    return True

def MR_Primality_Check(num):
    x = int(num)
    if x == 2:
        return True
    elif x < 2:
        return False
    k = 25
    isPrime = True
    for _ in range(k):
        div_done = False
        a = random.SystemRandom().randrange(2, x)
        power = x - 1
        while power % 2 == 0:
            power //= 2
            if pow(a, power, x) == x - 1:
                div_done = True
                break
        if div_done:
            continue
        elif pow(a, power, x) not in [1, x - 1]:
            isPrime = False
            break
    return isPrime

def increment(half):
    x = int(half)
    x = x+1
    return str(x)

small_prime_set = {2}
for i in range(3, 101):
    if all(i % p != 0 for p in small_prime_set):
        small_prime_set.add(i)

sys.set_int_max_str_digits(100000)

# Q1 Streaming
@app.get("/question1_stream")
def question1_stream(n: int, m: int):
    def generate():
        prime_numbers_set = []
        for i in range(n, m + 1):
            num = ""
            for x in range(1, i + 1):
                num += str(x)
            for x in range(1, i):
                num += str(i - x)
            yield f"token no. {i - n + 1} / {m - n + 1} => "
            if not small_prime_check(num, small_prime_set):
                yield f"for n = {i}, number is not prime\n"
                continue
            if gmpy2.is_prime(int(num)):
                prime_numbers_set.append(i)
                yield f"{num} is prime number where n = {i}\n"
            else:
                yield f"for n = {i}, number is not prime\n"
            time.sleep(0.2)
            
        for p in prime_numbers_set:
            yield f"for n = {p}, there is a prime number\n"
        yield "Done!\n"
    return StreamingResponse(generate(), media_type="text/plain")

# Q2 Streaming
@app.get("/question2_stream")
def question2_stream(n: int, m: int, pm: int):
    def generate():
        prime_count = 0
        for i in range(n, m+1):
            if not small_prime_check(i, small_prime_set):
                continue
            if not MR_Primality_Check(i):
                continue
            x = (10**i - 1) // 9
            if MR_Primality_Check(x):
                prime_count += 1
                yield f"1({i}) = {x} is a prime number\n"
                yield f"Prime count so far = {prime_count}\n"
                time.sleep(0.5)
            if prime_count == pm:
                break
        yield "Done!\n"
    return StreamingResponse(generate(), media_type="text/plain")

# Q3 Streaming
@app.get("/question3_stream")
def question3_stream(n: int, m: int):
    def generate():
        prime_count = 0
        for i in range(n, m+1):
            x = 2**i - 1
            if not small_prime_check(x, small_prime_set):
                continue
            if MR_Primality_Check(x):
                prime_count += 1
                yield f"2^{i} - 1 = {x} is a prime number\n"
                yield f"Prime count so far = {prime_count}\n"
                time.sleep(0.3)
        yield "Done!\n"
    return StreamingResponse(generate(), media_type="text/plain")

# --- Q4 Streaming ---
@app.get("/question4_stream")
def question4_stream(n: int, m: int):
    def generate():
        primes = []
        for i in range(n, m+1):
            x = 2**i - 1
            if small_prime_check(x, small_prime_set) == False:
                continue
            if gmpy2.is_prime(x) == True:
                yield f"2^{i} - 1 = {x} is a prime number\n"
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
            yield f"two consecutive primes are {p} and {q}\n"
            yield f"Their squares are {p**2} and {q**2} ... Have to find atleast 4 primes between them ...\n"
            prime_count = 0
            for x in range(p**2, q**2):
                if small_prime_check(x, small_prime_set) == False:
                    continue
                if gmpy2.is_prime(x) == True:
                    prime_count += 1
                    yield f"{x} is a prime number ... {prime_count} prime number(s) found so far\n"
                if prime_count >= 4:
                    yield f"{prime_count} prime numbers found ... PROVED!!!\n"
                    break
            time.sleep(0.1)
        yield "Done!\n"
    return StreamingResponse(generate(), media_type="text/plain")

# --- Q5 Streaming ---
@app.get("/question5_stream")
def question5_stream(n: int, m: int, pm: int):
    def generate():
        prime_count = 0
        n1 = n
        if(n1 % 2 == 0):
            n1 += 1
        half = "1"
        for i in range(1, n1 // 2):
            half += "0"
        while True:
            for x in range(0, 10):
                palindrome = half + str(x) + half[::-1]
                if not small_prime_check(int(palindrome), small_prime_set):
                    continue
                if MR_Primality_Check(int(palindrome)):
                    prime_count += 1
                    yield f"{palindrome} is a prime number and it has {len(palindrome)} digits\n"
                    yield f"Prime count so far = {prime_count}\n"
                if prime_count == pm:
                    break
            if prime_count == pm:
                break
            half = increment(half)
            if 2 * len(half) + 1 > m:
                break
            time.sleep(0.1)
        yield "Done!\n"
    return StreamingResponse(generate(), media_type="text/plain")

# --- Q6 Streaming ---
@app.get("/question6_stream")
def question6_stream(n: int, m: int):
    def generate():
        powers = []
        for i in range(n, m+1):
            x = 2**i - 1
            if x < 2:
                continue
            if small_prime_check(x, small_prime_set) == False:
                continue
            if MR_Primality_Check(x) == True:
                yield f"2^{i} - 1 = {x} is a prime number\n"
                powers.append(i)
        for p in powers:
            x = 2 ** (p - 1) * (2 ** p - 1)
            yield f"Checking p = {p} and number is (2^({p} - 1)) * (2^{p} - 1) = {2 ** (p - 1)} * {(2 ** p - 1)} = {x}\n"
            sum = 0
            curr = 1
            for t in range(0, p):
                yield f"{curr} is a divisor of {x} and {curr} < {x}\n"
                yield f"=> {sum} + {curr} = {sum + curr}\n"
                sum += curr;
                curr2 = curr * (2 ** p - 1)
                if curr2 != x:
                    yield f"{curr2} is a divisor of {x} and {curr2} < {x}\n"
                    yield f"=> {sum} + {curr2} = {sum + curr2}\n"
                    sum += curr2;
                curr *= 2
            if (sum == x):
                yield f"\n[Proved]\n"
            else:
                yield "\n[Disproved]\n"
            time.sleep(0.1)
        yield "Done!\n"
    return StreamingResponse(generate(), media_type="text/plain")

# --- Q7a Streaming ---
@app.get("/question7a_stream")
def question7a_stream(n: int):
    def generate():
        WP = []
        for i in range(2, n + 1):
            yield f"Checking {i} ...\n"
            if not small_prime_check(i, small_prime_set):
                yield f"Not even a Prime!\n"
                continue
            if gmpy2.is_prime(i):
                yield f"It is a Prime and ... "
                if pow(2, i-1, i*i) == 1:
                    WP.append(i)
                    yield f"{i} is a Wieferich Prime!\n"
                else:
                    yield f"{i} is not a Wieferich Prime\n"
            else:
                yield f"Not even a Prime!\n"
        time.sleep(0.05)
        for w in WP:
            yield f"Found that, {w} is a Wieferich Prime!\n"
        yield "Done!\n"
    return StreamingResponse(generate(), media_type="text/plain")

# --- Q7b Streaming ---
@app.get("/question7b_stream")
def question7b_stream(n: int):
    def generate():
        count = 0
        for i in range(4, n + 1, 2):
            for j in range (2, i//2 + 1):
                if not small_prime_check(j, small_prime_set):
                    continue
                if gmpy2.is_prime(j):
                    k = i - j
                    if not small_prime_check(k, small_prime_set):
                        continue
                    if gmpy2.is_prime(k):
                        count += 1
                        yield f"{j:5d} + {k:5d} = {i:5d} ... [Proved] : {count} / {(n - 4) // 2 + 1}\n"
                        break
        yield "Randomly generating a 50 digit even number\n"
        m = random.randrange(10**49, 10**50)
        if m % 2 == 1:
            m += 1
        yield f"Random number = {m}\n"
        for j in range (2, m//2 + 1):
            if not small_prime_check(j, small_prime_set):
                continue
            if gmpy2.is_prime(j):
                k = m - j
                if not small_prime_check(k, small_prime_set):
                    continue
                if gmpy2.is_prime(k):
                    yield f"{j} + {k} = {m} ... [Proved]\n"
                    break
        yield "Done!\n"
    return StreamingResponse(generate(), media_type="text/plain")

# --- Q7c Streaming ---
@app.get("/question7c_stream")
def question7c_stream(n: int):
    def generate():
        count = 0
        for t in range(7, n + 1, 2):
            i = t - 3
            for j in range (2, i//2 + 1):
                if not small_prime_check(j, small_prime_set):
                    continue
                if gmpy2.is_prime(j):
                    k = i - j
                    if not small_prime_check(k, small_prime_set):
                        continue
                    if gmpy2.is_prime(k):
                        count += 1
                        yield f"3 + {j:5d} + {k:5d} = {t:5d} ... proved : {count} / {(n - 7) // 2 + 1}\n"
                        break  
        yield "Randomly generating a 50 digit even number\n"
        m = random.randrange(10**49, 10**50)
        if m % 2 == 0:
            m += 1
        yield f"Random number = {m}\n"
        i = m - 3
        for j in range (2, i//2 + 1):
            if not small_prime_check(j, small_prime_set):
                continue
            if gmpy2.is_prime(j):
                k = i - j
                if not small_prime_check(k, small_prime_set):
                    continue
                if gmpy2.is_prime(k):
                    yield f"3 + {j} + {k} = {m} [Proved]\n"
                    break
        yield "Done!\n"
    return StreamingResponse(generate(), media_type="text/plain")

# --- Q7d Streaming ---
@app.get("/question7d_stream")
def question7d_stream(n: int):
    def generate():
        count = 0
        for i in range(2, n + 1, 2):
            j = 2
            while True:
                if not small_prime_check(j, small_prime_set):
                    j += 1
                    continue
                if gmpy2.is_prime(j):
                    k = i + j
                    if not small_prime_check(k, small_prime_set):
                        j += 1
                        continue
                    if gmpy2.is_prime(k):
                        count += 1
                        yield f"{k} - {j} = {i} ... [Proved] : {count} / {(n - 2) // 2 + 1}\n"
                        break
                j += 1

        yield "Randomly generating a 50 digit even number\n"
        m = random.randrange(10**49, 10**50)
        if m % 2 == 1:
            m += 1
        yield f"Random number = {m}\n"

        j = 2
        while True:
            if not small_prime_check(j, small_prime_set):
                j += 1
                continue
            if gmpy2.is_prime(j):
                k = m + j
                if not small_prime_check(k, small_prime_set):
                    j += 1
                    continue
                if gmpy2.is_prime(k):
                    yield f"{k} - {j} = {m} ... [Proved]\n"
                    break
            j += 1

        yield "Done!\n"
    return StreamingResponse(generate(), media_type="text/plain")

# --- Q7e Streaming ---
@app.get("/question7e_stream")
def question7e_stream(n: int):
    def generate():
        count = 0
        # Part 1: primes between i^2 and (i+1)^2
        for i in range(1, n + 1):
            found = False
            p = i * i
            q = (i + 1) * (i + 1)
            yield f"Checking for primes between {i}^2 = {p} and {i+1}^2 = {q}\n"
            for k in range(p, q + 1):
                if not small_prime_check(k, small_prime_set):
                    continue
                if gmpy2.is_prime(k):
                    found = True
                    yield f"Prime Found => {k}\n"
                    break
            if found:
                count += 1
            yield f"Assumption proved for {count}/{n}\n"
            time.sleep(0.01)

        # Part 2: primes between squares of consecutive primes
        yield "Now this implies there are at least two primes between prime squares for p(n) ≥ 3 since p(n+1) - p(n) ≥ 2.\n"
        yield "Now checking between squares of consecutive primes (upto n)\n"
        q = 3
        total_count = 0
        for t in range(2, n + 1):
            p = q
            q = p + 1
            while not gmpy2.is_prime(q):
                q += 1
            i = p * p
            j = q * q
            curr_count = 0
            yield f"Primes between p({t})^2 = {i} and p({t+1})^2 = {j}: \n"
            for k in range(i, j + 1):
                if not small_prime_check(k, small_prime_set):
                    continue
                if gmpy2.is_prime(k):
                    curr_count += 1
                    yield f"Prime Found => {k}\n"
                    if curr_count == 2:
                        break
            if curr_count >= 2:
                total_count += 1
            yield f"Proved for {total_count}/{n - 1}\n"
            time.sleep(0.01)

        # Random 50-digit part (heavy)
        m = random.randrange(10**49, 10**50)
        yield f"A randomly generated 50 digit number is {m}\n"
        p = m * m
        q = (m + 1) * (m + 1)
        found = False
        yield f"Searching for any prime between {p} and {q}\n"
        for k in range(p, q + 1):
            if not small_prime_check(k, small_prime_set):
                continue
            if gmpy2.is_prime(k):
                found = True
                yield f"Prime Found => {k}\n"
                break
        if found:
            yield "Assumption is True\n"
            l = k + 1
            while not gmpy2.is_prime(l):
                l += 1
            yield f"Lets prove there are 2 primes between k^2 = {k}^2 and l^2 = {l}^2 where k, l are consecutive primes\n"
            count = 0
            for r in range(k * k, l * l):
                if gmpy2.is_prime(r):
                    count += 1
                    yield f"Prime Found => {r}\n"
                if count == 2:
                    break
            if count >= 2:
                yield "Legendre's conjecture Proved\n"
            else:
                yield "Could not Prove Legendre's conjecture\n"
        else:
            yield "No prime found in that huge interval or search aborted due to heaviness.\n"

        yield "Done!\n"
    return StreamingResponse(generate(), media_type="text/plain")

# --- Q7f Streaming ---
@app.get("/question7f_stream")
def question7f_stream(n: int):
    def generate():
        count = 0
        for i in range(2, n + 1):
            x = i * (i - 1)
            y = i * i
            z = i * (i + 1)
            found1 = False
            found2 = False
            yield f"For n = {i}, searching between {x} and {y}\n"
            for j in range(x, y):
                if gmpy2.is_prime(j):
                    found1 = True
                    yield f"=> {j}\n"
                    break
            yield f"For n = {i}, searching between {y} and {z}\n"
            for k in range(y, z + 1):
                if gmpy2.is_prime(k):
                    found2 = True
                    yield f"=> {k}\n"
                    break
            if found1 and found2:
                count += 1
            yield f"Proved for {count} / {n - 1}\n"
            time.sleep(0.01)

        # random 50-digit sample (heavy)
        m = random.randrange(10**49, 10**50)
        yield f"A randomly generated 50 digit number is {m}\n"
        found1 = False
        found2 = False
        yield f"Searching between {m*(m-1)} and {m*m}\n"
        for j in range(m * (m - 1), m * m):
            if gmpy2.is_prime(j):
                found1 = True
                yield f"=> {j}\n"
                break
        yield f"Searching between {m*m} and {m*(m+1)}\n"
        for j in range(m * m, m * (m + 1)):
            if gmpy2.is_prime(j):
                found2 = True
                yield f"=> {j}\n"
                break
        if found1 and found2:
            yield f"Oppermann's conjecture proved for m = {m}\n"
        else:
            yield "Could not verify in random sample\n"

        yield "Done!\n"
    return StreamingResponse(generate(), media_type="text/plain")