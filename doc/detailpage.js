// common.js:
// Euler Zero project, common javascript used by html doc files
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

// standard elements for ezp-detail-nnn.html pages
function standardDetailPageElements() {
    var oProblem = document.getElementById("ezero_problem");
    var sCurrent = oProblem.innerHTML;
    var sProblemFixUp = '<b>The problem:</b><br/><div class="problem_statement">' +sCurrent+ '</div><p></p>';
    
    var oSolution = document.getElementById("ezero_detail");
    sCurrent = oSolution.innerHTML;
    var sSolutionFixUp = '<b>Implementation Details:</b></br><div class="solution_statement">' +sCurrent+ '</div><p></p>';
    
    // this is our standard page template:
    var body = document.body.innerHTML = ""   
        + '<table width="100%" style="height:100%;" border="0" cellpadding="0" cellspacing="0">'
        + '<tr style="height:1%"><td id="doc_pageheader" align="left">'
        + '    <table style="margin-left:0px;" cellpadding="0" cellspacing="0">'
        + '        <tr><td nowrap align="left" id="doc_pageBodyTitle"></td>'
        + '            <td nowrap width="99%" align="right" style="padding-right:6px;"><div id="readme_topnav"></div></td>'
        + '        </tr>'
        + '    </table>'
        + '</td></tr>'
        + '<tr style="height:auto; vertical-align:top;"><td id="doc_pagebody">'
        + '        <div id="content">'
        + '            <div id="ezero_problem_actual"></div>'
        + '            <div id="ezero_solution_actual"></div>'
        + '        </div> <!-- content -->'
        + '</td></tr>'
        + '<tr style="height:1%"><td align="center"><div id="ezero_doc_index"></div></td></tr>'
        + '<tr style="height:1%"><td align="center" style="padding-bottom:0px;"><div id="attribution"></div></td></tr>'
        + '</table>'
        ;
    
    setTitle(problemNumber);

    var content = document.getElementById("content");
  
    document.getElementById("doc_pageBodyTitle").innerHTML = pageBodyTitleContent("readme");
    document.getElementById("readme_topnav").innerHTML = pageTopNavContent("detail");
    
    document.getElementById("ezero_doc_index").innerHTML = pageHomeLinkContent();
    document.getElementById("attribution").innerHTML = pageAttributionContent();
    
    // fixups for Problem & Solution sections:   
    document.getElementById("ezero_problem_actual").innerHTML = sProblemFixUp;
    document.getElementById("ezero_solution_actual").innerHTML = sSolutionFixUp;   
}
