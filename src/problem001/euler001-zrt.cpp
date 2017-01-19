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
const int limit = 1000;

// For the zero-runtime version, we use template meta-programming to count
// up to our terminating explicit specialization ("<limit">), at which point 
// further recursion stops and we're done.
template<int i>
struct NextMultiple {
    enum { sum = (((i % 3) == 0) ||  ((i % 5) == 0) ? i : 0) 
               + (NextMultiple<i + 1>::sum)
         };
};

template<>
struct NextMultiple<limit> {
    enum { sum = 0 };
};

long lSum = NextMultiple<3>::sum;

#ifdef BUILD_ZRT_MAIN
#include <iostream>
int main()
{
    std::cout << lSum << std::endl;
}
#endif
