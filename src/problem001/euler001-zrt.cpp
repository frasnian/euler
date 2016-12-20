// euler001-zrt.cpp:
// Euler Zero, Problem 1 - Zero-runtime version
// 
// Copyright (c) 2015,2016 David Starr
//
// Distributed under the Boost Software License, Version 1.0. 
// (See accompanying file LICENSE_1_0.txt or copy at 
// http://www.boost.org/LICENSE_1_0.txt)
//
const int term  = 2;     // counting backwards from limit-1 to 3, inclusive
const int limit = 1000;  // same reason as proof-of-correctness version

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
