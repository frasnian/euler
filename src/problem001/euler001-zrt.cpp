// euler001-zrt.cpp:
// Euler Zero, Problem 1 - Zero-runtime version
//
// <copyright>
// This is a part of Euler Zero - see https://github.com/frasnian/euler-zero
// Copyright (c) 2015,2016 David Starr
//
// Distributed under the Boost Software License, Version 1.0. 
// (See accompanying file LICENSE_1_0.txt or copy at 
// http://www.boost.org/LICENSE_1_0.txt)
// </copyright>
//
const int term  = 2;     // counting backwards from limit-1 to 3, inclusive
const int limit = 1000;  // same reason as proof-of-correctness version

// For the zero-runtime version, we use template meta-programming to count
// backwards from the maximum number (limit) to our terminating explicit 
// specialization ("<term">), at which point further recursion stops and
// we're done.
template<int i>
struct PrevMultiple {
    enum { sum = (((i % 3) == 0) ||  ((i % 5) == 0) ? i : 0) 
               + (PrevMultiple<i - 1>::sum)
         };
};

template<>
struct PrevMultiple<term> {
    enum { sum = 0 };
};

long lSum = PrevMultiple<limit-1>::sum;

#ifdef BUILD_ZRT_MAIN
#include "../misc/zrt_main.cpp"
ZRT_MAIN(lSum)
#endif
