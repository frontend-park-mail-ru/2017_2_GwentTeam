function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function scoreboardTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {".\u002Fpublic\u002F\u002Fblocks\u002Fscoreboard\u002Fscoreboard.pug":"thead\n    tr\n        th Email\n        th Scores\n\ntbody\n    each user in users\n        tr\n            th #{user.email}\n            th #{user.score}"};
;var locals_for_with = (locals || {});(function (users) {;pug_debug_line = 1;pug_debug_filename = ".\u002Fpublic\u002F\u002Fblocks\u002Fscoreboard\u002Fscoreboard.pug";
pug_html = pug_html + "\u003Cthead\u003E";
;pug_debug_line = 2;pug_debug_filename = ".\u002Fpublic\u002F\u002Fblocks\u002Fscoreboard\u002Fscoreboard.pug";
pug_html = pug_html + "\u003Ctr\u003E";
;pug_debug_line = 3;pug_debug_filename = ".\u002Fpublic\u002F\u002Fblocks\u002Fscoreboard\u002Fscoreboard.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 3;pug_debug_filename = ".\u002Fpublic\u002F\u002Fblocks\u002Fscoreboard\u002Fscoreboard.pug";
pug_html = pug_html + "Email\u003C\u002Fth\u003E";
;pug_debug_line = 4;pug_debug_filename = ".\u002Fpublic\u002F\u002Fblocks\u002Fscoreboard\u002Fscoreboard.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 4;pug_debug_filename = ".\u002Fpublic\u002F\u002Fblocks\u002Fscoreboard\u002Fscoreboard.pug";
pug_html = pug_html + "Scores\u003C\u002Fth\u003E\u003C\u002Ftr\u003E\u003C\u002Fthead\u003E";
;pug_debug_line = 6;pug_debug_filename = ".\u002Fpublic\u002F\u002Fblocks\u002Fscoreboard\u002Fscoreboard.pug";
pug_html = pug_html + "\u003Ctbody\u003E";
;pug_debug_line = 7;pug_debug_filename = ".\u002Fpublic\u002F\u002Fblocks\u002Fscoreboard\u002Fscoreboard.pug";
// iterate users
;(function(){
  var $$obj = users;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var user = $$obj[pug_index0];
;pug_debug_line = 8;pug_debug_filename = ".\u002Fpublic\u002F\u002Fblocks\u002Fscoreboard\u002Fscoreboard.pug";
pug_html = pug_html + "\u003Ctr\u003E";
;pug_debug_line = 9;pug_debug_filename = ".\u002Fpublic\u002F\u002Fblocks\u002Fscoreboard\u002Fscoreboard.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 9;pug_debug_filename = ".\u002Fpublic\u002F\u002Fblocks\u002Fscoreboard\u002Fscoreboard.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = user.email) ? "" : pug_interp)) + "\u003C\u002Fth\u003E";
;pug_debug_line = 10;pug_debug_filename = ".\u002Fpublic\u002F\u002Fblocks\u002Fscoreboard\u002Fscoreboard.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 10;pug_debug_filename = ".\u002Fpublic\u002F\u002Fblocks\u002Fscoreboard\u002Fscoreboard.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = user.score) ? "" : pug_interp)) + "\u003C\u002Fth\u003E\u003C\u002Ftr\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var user = $$obj[pug_index0];
;pug_debug_line = 8;pug_debug_filename = ".\u002Fpublic\u002F\u002Fblocks\u002Fscoreboard\u002Fscoreboard.pug";
pug_html = pug_html + "\u003Ctr\u003E";
;pug_debug_line = 9;pug_debug_filename = ".\u002Fpublic\u002F\u002Fblocks\u002Fscoreboard\u002Fscoreboard.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 9;pug_debug_filename = ".\u002Fpublic\u002F\u002Fblocks\u002Fscoreboard\u002Fscoreboard.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = user.email) ? "" : pug_interp)) + "\u003C\u002Fth\u003E";
;pug_debug_line = 10;pug_debug_filename = ".\u002Fpublic\u002F\u002Fblocks\u002Fscoreboard\u002Fscoreboard.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 10;pug_debug_filename = ".\u002Fpublic\u002F\u002Fblocks\u002Fscoreboard\u002Fscoreboard.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = user.score) ? "" : pug_interp)) + "\u003C\u002Fth\u003E\u003C\u002Ftr\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ftbody\u003E";}.call(this,"users" in locals_for_with?locals_for_with.users:typeof users!=="undefined"?users:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}