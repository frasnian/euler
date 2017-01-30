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
function standardDocPageElements(isDocHome) {  
    var content = document.getElementById("content").innerHTML;

    // this is our standard page template:
    var body = document.body.innerHTML = ""   
        + '<div style="height:100%;">'
        + '<table width="100%" height="100%" xstyle="height:100%;" border="0" cellpadding="0" cellspacing="0">'
        + '<tr style="height:100%; vertical-align:top;"><td id="doc_pagebody">'
        + '        <div id="content_actual"></div>'
        + '</td></tr>'
        + '<tr style="height:1%"><td valign="bottom" align="center" style="padding-bottom:0px;"><div id="attribution"></div></td></tr>'
        + '</table>'
        + '</div>'
        ;
    
    var content_actual = document.getElementById("content_actual");
    content_actual.innerHTML = content;
     
    document.getElementById("attribution").innerHTML = (isDocHome ? "" : docHomeLinkContent()) + pageAttributionContent();
}

function standardDocAttribution(){
    document.getElementById("attribution").innerHTML = pageAttributionContent();
}
