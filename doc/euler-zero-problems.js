// euler-zero-problems.js
// Euler Zero project - index & descriptions for included solutions
//
// <copyright>
// This is a part of Euler Zero - see https://github.com/frasnian/euler-zero
// Copyright (c) 2015,2016 David Starr
//
// Distributed under the Boost Software License, Version 1.0. 
// (See accompanying file LICENSE_1_0.txt or copy at 
// http://www.boost.org/LICENSE_1_0.txt)
// </copyright>

function EulerZeroProblem(sProblemNumber, sName)
{
    this.problemNumber = sProblemNumber;
    this.name = sName;
  return this;
}


var EulerZeroProblems = [
    new EulerZeroProblem("001", "Multiples of 3 and 5"),
    new EulerZeroProblem("002", "Even Fibonacci numbers")
];
