define('templates',[],function() {

var templates = {};

templates['jst'] = {};

templates['jst']['active_choice'] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<p><b>If the rooms have the following prices, which room would you choose?</b></p>\n<p><small>Choices will not necessarily be in order and the same roommate may be asked to choose multiple times in a row. Each roommate keeps choosing until a fair division is found.</small></p>\n\n<table class="nytint-choices-table" data-num-rooms="'+
((__t=( rooms.length ))==null?'':__t)+
'">\n  <tbody>\n    ';
 _(players).each(function(player) { 
__p+='\n      <tr data-player="'+
((__t=( player.label ))==null?'':__t)+
'"\n          ';
 if (player.active) { 
__p+='\n          class="active-player"\n          style="visibility:hidden;opacity:0;"\n          ';
 } 
__p+='\n          >\n        <td class="nytint-player"><div class="cell-spacer">'+
((__t=( player.name ))==null?'':__t)+
'</div></td>\n        ';
 if (player.latest_choice) { 
__p+='\n          ';
 _(player.latest_choice.prices).each(function(p,i) { 
__p+='\n            <td class="rent-calculator-choice-room\n                       '+
((__t=( rooms[i].label === player.latest_choice.choice ? 'selected' : '' ))==null?'':__t)+
'"\n                data-room-label="'+
((__t=( rooms[i].label ))==null?'':__t)+
'">\n              <div class="cell-spacer">\n                ';
 if (player.active) { 
__p+='\n                  <div class="nytint-active-choice">\n                  <div class="nytint-price">\n                    <div class="nytint-checkbox"><span class="nytint-checkmark">✔</span>&nbsp;</div>\n                    $'+
((__t=( p.toFixed(0) ))==null?'':__t)+
'\n                  </div>\n                  <div class="nytint-room">'+
((__t=( rooms[i].description ))==null?'':__t)+
'</div>\n                  </div>\n                ';
 } else { 
__p+='\n                  <div class="nytint-price">$'+
((__t=( p.toFixed(0) ))==null?'':__t)+
'</div>\n                  <div class="nytint-room">'+
((__t=( rooms[i].description ))==null?'':__t)+
'</div>\n                ';
 } 
__p+='\n              </div>\n            </td>\n          ';
 }); 
__p+='\n        ';
 } else { 
__p+='\n          <td class="inactive" colspan="'+
((__t=( rooms.length ))==null?'':__t)+
'"><div class="cell-spacer">No latest choice</div></td>\n        ';
 } 
__p+='\n      </tr>\n    ';
 }); 
__p+='\n  </tbody>\n</table>\n';
}
return __p;
},templates['jst']['player_name'] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<span class="nytint-player-name-input"><label>'+
((__t=( label ))==null?'':__t)+
'.</label><input data-label="'+
((__t=( label ))==null?'':__t)+
'" name="player-'+
((__t=( label ))==null?'':__t)+
'" type="text" value="'+
((__t=( name ))==null?'':__t)+
'" placeholder="Roommate '+
((__t=( label ))==null?'':__t)+
'" default="Roommate '+
((__t=( label ))==null?'':__t)+
'" /></span>\n';
}
return __p;
},templates['jst']['choices_table'] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<h4>Past Choices</h4>\n<ul class="nytint-players grid_2">\n  <li class="nytint-filter-player\n    ';
 if (!filter_active) { 
__p+='filter-active';
 } 
__p+='" data-player="all">All</li>\n  ';
 _(players).each(function(p) { 
__p+='\n    <li class="nytint-filter-player\n      ';
 if (filter_active === p.label) { 
__p+='filter-active';
 } 
__p+='" data-player="'+
((__t=( p.label ))==null?'':__t)+
'">\n      '+
((__t=( p.name ))==null?'':__t)+
'\n    </li>\n  ';
 }); 
__p+='\n</ul>\n<table class="nytint-choices-table" data-num-rooms="'+
((__t=( rooms.length ))==null?'':__t)+
'">\n  <thead>\n    <tr><th>&nbsp;</th>\n    ';
 _(rooms).each(function(r) { 
__p+='\n      <th data-room="'+
((__t=( r.label ))==null?'':__t)+
'">\n        <div class="cell-spacer">'+
((__t=( r.description ))==null?'':__t)+
'</div>\n      </th>\n    ';
 }); 
__p+='\n    </tr>\n  </thead>\n  <tbody>\n    ';
 _(choices).each(function(c) { 
__p+='\n      <tr data-player="'+
((__t=( c.player ))==null?'':__t)+
'">\n        <td class="nytint-player"><div class="cell-spacer">'+
((__t=( player_names[c.player] ))==null?'':__t)+
'</div></td>\n        ';
 _(c.prices).each(function(p,i) { 
__p+='\n        <td class="nytint-price \n              ';
 if ((i+1).toString() === c.choice) {
__p+='nytint-price-selected';
 } 
__p+='\n              "><div class="cell-spacer">\n              $'+
((__t=( p.toFixed(2) ))==null?'':__t)+
'\n        </div></td>\n        ';
 }); 
__p+='\n      </tr>\n    ';
 }); 
__p+='\n  </tbody>\n</table>\n';
}
return __p;
},templates['jst']['players'] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="nytint-player-names-form" class="clearfix grid_6">\n  <p>Your names are:</p>\n  ';
 _(players).each(function(p, i) { 
__p+='\n    <span class="nytint-player-name-input">\n      <label>'+
((__t=( p.label ))==null?'':__t)+
'.</label><input data-label="'+
((__t=( p.label ))==null?'':__t)+
'" name="player-'+
((__t=( p.label ))==null?'':__t)+
'" type="text" value="'+
((__t=( p.name ))==null?'':__t)+
'" placeholder="Roommate '+
((__t=( p.label ))==null?'':__t)+
'" default="Roommate '+
((__t=( p.label ))==null?'':__t)+
'" />\n    </span>\n  ';
 }) 
__p+='\n</div>\n\n<div id="nytint-room-descriptions-form" class="clearfix grid_6">\n  <p>And the rooms in your apartment are:</p>\n  ';
 _(rooms).each(function(r, i) { 
__p+='\n    <span class="nytint-room-description-input">\n      <label>'+
((__t=( r.label ))==null?'':__t)+
'.</label>\n      <input data-label="'+
((__t=( r.label ))==null?'':__t)+
'" name="room-'+
((__t=( r.label ))==null?'':__t)+
'" type="text" value="'+
((__t=( r.description ))==null?'':__t)+
'" placeholder="Room '+
((__t=( r.label ))==null?'':__t)+
' description" default="Room '+
((__t=( r.label ))==null?'':__t)+
'" />\n    </span>\n  ';
 }) 
__p+='\n</div>\n';
}
return __p;
},templates['jst']['players_sidebar'] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<h4>'+
((__t=( players.length ))==null?'':__t)+
' Roommates</h4>\n<ul class="nytint-players-list">\n  ';
 _(players).each(function(p, i) { 
__p+='\n    ';
 if (p.room) { 
__p+='\n    <li class="nytint-player" data-player-label="'+
((__t=( p.label ))==null?'':__t)+
'" data-room-label="'+
((__t=( p.room ))==null?'':__t)+
'">\n      <p>\n        <span class="nytint-player-name">'+
((__t=( p.name ))==null?'':__t)+
'</span> gets <span class="nytint-player-room-assignment">'+
((__t=( p.room_description ))==null?'':__t)+
'</span>\n      </p>\n      <p class="nytint-player-room-price">\n        <span title="Rent lower bound" class="rent-low '+
((__t=( p.range_negative ? 'price-negative' : '' ))==null?'':__t)+
'">$'+
((__t=( p.rent_range[0].toFixed(2) ))==null?'':__t)+
'</span>\n        <span title="Rent" class="rent-actual '+
((__t=( unconfident ? 'rent-unconfident' : '' ))==null?'':__t)+
'">$'+
((__t=( p.rent.toFixed(2) ))==null?'':__t)+
'</span>\n        <span title="Rent upper bound" class="rent-high">$'+
((__t=( p.rent_range[1].toFixed(2) ))==null?'':__t)+
'</span>\n      </p>\n      <div class="nytint-price-chart\n        '+
((__t=( p.range_negative ? 'price-negative' : '' ))==null?'':__t)+
'\n        '+
((__t=( p.range_overtop ? 'price-overtop' : '' ))==null?'':__t)+
'\n        " style="left:'+
((__t=( p.bar_left ))==null?'':__t)+
'px;width:'+
((__t=( p.bar_width ))==null?'':__t)+
'px;"></div>\n      <div class="nytint-price-chart-middle-marker" style="left:'+
((__t=( p.bar_center ))==null?'':__t)+
'px;"></div>\n    </li>\n    ';
 } 
__p+='\n  ';
 }); 
__p+='\n</ul>\n';
}
return __p;
},templates['jst']['proposal'] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='';
 if (show_proposal) { 
__p+='\n<div class="nytint-proposal">\n  ';
 if (force_show) { 
__p+='\n    <h1>A Fair Division</h1>\n  ';
 } else { 
__p+='\n    <h1>Congratulations! You Found a Fair Division</h1>\n  ';
 } 
__p+='\n<p class="nytint-total-rent">Total Rent: <span>$'+
((__t=( rent ))==null?'':__t)+
'</span></p>\n<table id="nytint-proposal-table" class="" style="display:none;">\n  ';
 _(rooms).each(function(r, i) { 
__p+='\n  <tr data-player-label="'+
((__t=( r.player ))==null?'':__t)+
'" data-room-label="'+
((__t=( r.label ))==null?'':__t)+
'">\n    <td class="nytint-player"><div class="cell-spacer">\n      '+
((__t=( r.player_name ))==null?'':__t)+
'\n    </div></td>\n    <td class="nytint-room"><div class="cell-spacer">\n      '+
((__t=( r.description ))==null?'':__t)+
'\n    </div></td>\n    <td title="Rent" class="rent-actual"><div class="cell-spacer">\n      $'+
((__t=( r.rent.toFixed(2) ))==null?'':__t)+
'\n    </div></td>\n  </tr>\n  ';
 }) 
__p+='\n</table>\n';
 } 
__p+='\n\n<div id="nytint-confidence-view">\n  <div class="total-rent-bar"><div class="confidence-bar" style="width: '+
((__t=( confidence_bar_width ))==null?'':__t)+
'%;"></div></div>\n  <div>\n    ';
 if (show_proposal || prompt_visible) { 
__p+='\n      Results are within $'+
((__t=( precision.toFixed(2) ))==null?'':__t)+
' of fair. Continuing may lead to a more accurate result.\n    ';
 } 
__p+='\n    ';
 if (prompt_visible) { 
__p+='\n      <span class="nytint-prompt-proposal">\n        <span class="nytint-prompt-proposal-button g-button">Show a Proposed Division</span>\n        <!-- <div><small>More choices may lead to a more precise division.</small></div> -->\n      </span>\n    ';
 } 
__p+='\n  </div>\n  ';
 if (show_proposal) { 
__p+='\n    <div id="nytint-save-results" class="nytint-proposal nytint-proposal-continue">\n      <span class="nytint-save-link g-button g-button-small">Share Results</span>\n      <span class="nytint-continue-link g-button g-button-small" data-precision="'+
((__t=( precision ))==null?'':__t)+
'">Continue Division</span>\n      <span class="nytint-restart-link g-button g-button-small">Start Over</span>\n      <!-- <div><small>Continuing division may lead to a more precise result.</small></div> -->\n    </div>\n    <div class="nytint-shareToolsItemPermalink nytint-proposal " style="display:none;">\n      <label>Permalink</label><input type="text" readonly="readonly" value="'+
((__t=( window.location ))==null?'':__t)+
'?smid=pl-share">\n      <a class="nytint-print-link" href="#">Print</a>\n    </div>\n  ';
 } 
__p+='\n\n</div>\n';
}
return __p;
},templates['jst']['right_sidebar'] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<ul>\n  <li><a href="#restart" class="nytint-restart-link">Start Over</a></li>\n  <li><a href="#save" class="nytint-save-link">Save Results</a></li>\n</ul>\n';
}
return __p;
},templates['jst']['room_description'] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<span class="nytint-room-description-input"><label>'+
((__t=( label ))==null?'':__t)+
'.</label><input data-label="'+
((__t=( label ))==null?'':__t)+
'" name="room-'+
((__t=( label ))==null?'':__t)+
'" type="text" value="'+
((__t=( description ))==null?'':__t)+
'" placeholder="Room '+
((__t=( label ))==null?'':__t)+
' description" default="Room '+
((__t=( label ))==null?'':__t)+
'" /></span>\n';
}
return __p;
}

return templates;

});
/*global require: false*/

/*
Code is largely ported from Francis Su and Elisha Peterson's work here:
http://www.math.hmc.edu/~su/fairdivision/calc/

Translating the specific interactive sperner rent division case over to javascript.
*/

require(['underscore/1.5'], function(_) {
  /*
    transform for configuration to cutset space.
    i.e. from a point on the  triangle, to a proposed set of rents.
    takes elements from a "Vertex" along with a level


    it first takes all the points and tacks a 2^level on the end
    it then divides every point by 2^level
    it then (starting at the end) gets each point by subtracting the 
    previous point from itself.
  */
  function transform(elements, level) {
    var prices = _.clone(elements),
      dimension = elements.length,
      two_to_the_level = Math.pow(2,level);
    prices.push(two_to_the_level);
    prices = _.map(prices, function(p) { return p/two_to_the_level; });
    for (var i=dimension; i>0; i--) {
      prices[i] = (dimension*(prices[i-1] - prices[i]))+1;
    }
    prices[0] = 1-(dimension*prices[0]);
    return prices;
  }

  /*
    get which player owns the point by
    counting the odd elements
  */
  function getOwner(elements) {
    var dimension = elements.length;
    var player = "A".charCodeAt();
    player += _(elements).select(function(x) { return (x%2) !== 0; }).length;
    return String.fromCharCode(player);
  }

  function fixedSizeArray(n, val) {
    if (!val) val = 1;
    var a = [];
    for (var i=0; i<n; i++) {
      a[i] = val;
    }
    return a;
  }
  function addVertexes(v1, v2) {
    return {
      vector: v1.vector.add(v2.vector),
      label: undefined,
      level: undefined
    };
  }
  function subtractVertexes(v1, v2) {
    return {
      vector: v1.vector.subtract(v2.vector),
      label: undefined,
      level: undefined
    };
  }
  function multiplyVertex(v, k) {
    return {
      vector: v.vector.multiply(k),
      label: undefined,
      level: undefined
    };
  }
  function divideVertex(v, k) {
    return {
      vector: v.vector.multiply(1.0/k),
      label: undefined,
      level: undefined
    };
  }


  function Simplex(n) {
    this.players = n;
    this.dimension = n+1;
    this.level = 0;
    
    /* set up the initial points */
    this.points = [];
    for (var i=0; i < this.dimension; i++) {
      this.points.push({
        vector: $V(fixedSizeArray(this.players-1, 1)),
        label: (i+1).toString(),
        level: 0
      });
    }
    for (var col=0; col<this.dimension-1; col++) {
      for (var j=0; j<col; j++) {
        this.points[col].vector.elements[j] = 0;
      }
    }
    this.points[this.dimension-1] = {
      vector: this.points[0].vector.add(this.points[this.dimension-2].vector),
      level: 1
    };
    this.marker = this.dimension-2;
    this.newPoint = this.dimension-1;
  }
  Simplex.prototype = {
    getCurrentPlayer: function() {
      return getOwner(this.points[this.newPoint].vector.elements);
    },
    getCurrentPrices: function() {
      var point = this.points[this.newPoint];
      return transform(point.vector.elements, point.level);
    },
    // returns true/false if we've gone up a level or not
    currentPlayerChooses: function(label) {
      this.points[this.newPoint].label = label.toString();
      this.findPivot();
      return this.updateSimplex(); 
    },
    findPivot: function() {
      var target = -1;
      for (var i=0; i < this.dimension; i++) {
        if ((this.points[i].label === this.points[this.newPoint].label) && (i !== this.newPoint)) {
          target = i;
        }
      }
      this.pivot = target;
      return this.pivot;
    },
    /* shifts points in place */
    shift: function(start, end, where) {
      var i;
      if (where > 0) {
        for(i = end; i >= start; i--) {   //shift left
          this.points[i+where] = this.points[i];
        }
      } else if (where < 0) {
        for(i = start; i <= end; i++) {   //shift right
          this.points[i+where] = this.points[i];
        }
      }
    },
    /* equivalent to bigAl from Simplex.java
      
      returns true if it's gone up a level.
      if it's gone up a level that means we've found a fully labeled simplex
      and can suggest a division
    */
    updateSimplex: function() {
      var changed = this.level;
      var pivot = this.pivot,
        dimension = this.dimension;
      var temp;

      if (pivot === 0 && this.marker === 0) {
        this.shift(1,dimension-1,-1);
        // this.points[dimension-1] = this.points[0].plus(this.points[dimension-2]);
        this.points[dimension-1] = addVertexes(this.points[0], this.points[dimension-2]);
        this.newPoint = dimension-1;
        this.marker = dimension-2;
        this.level++;
        this.points[dimension-1].level = this.level+1;
      }
      
      //FIRST OR LAST BUT NOT ONLY VERTEX IN LOWER LIST
      else if ((this.marker !== 0) && (pivot === 0 || pivot === this.marker)) {
        this.shift(pivot+1,dimension-1,-1);
        this.marker--;
        //points[dimension-1] = points[0].plus(points[marker]);
        this.points[dimension-1] = addVertexes(this.points[0], this.points[this.marker]);
        this.newPoint = dimension-1;
        this.points[this.newPoint].level = this.points[dimension-2].level;
      }
      
      //INTERNAL TO EITHER LIST
      else if (pivot !== 0 && pivot !== this.marker && pivot !== this.marker+1 && pivot !== dimension-1) {
        // this.points[pivot] = this.points[pivot-1].plus(this.points[pivot+1]).minus(this.points[pivot]);
        this.points[pivot] = subtractVertexes(addVertexes(this.points[pivot-1], this.points[pivot+1]), this.points[pivot]);
        this.points[pivot].level = this.points[pivot-1].level;
        this.newPoint = pivot;
      }
      
      //FIRST BUT BUT NOT ONLY VERTEX IN UPPER LIST
      else if (pivot === this.marker+1 && pivot !== dimension-1) {
        // Vertex temp = this.points[pivot+1].times(2);
        // this.points[pivot] = temp.minus(this.points[pivot]);
        // this.points[pivot].level = level+1;
        // this.newPoint = pivot;
        temp = multiplyVertex(this.points[pivot+1], 2);
        this.points[pivot] = subtractVertexes(temp, this.points[pivot]);
        this.points[pivot].level = this.level+1;
        this.newPoint = pivot;
      }
      
      //ONLY VERTEX OF UPPER LIST
      else if (pivot === this.marker+1 && pivot === dimension-1) {
        this.shift(0,pivot-1,1);
        this.marker = 0;
        // this.points[0] = this.points[dimension-1].dividedBy(2);
        this.points[0] = divideVertex(this.points[dimension-1], 2);
        this.level--;
        this.points[0].level = this.level;
        this.newPoint = 0;
      }
      
      //LAST BUT NOT ONLY VERTEX OF UPPER LIST
      else if (pivot === dimension-1 && this.marker < dimension-2) {
          // Vertex temp = this.points[pivot].minus(this.points[pivot-1]);
          // int check = temp.dotProduct(this.points[0]);
          // if (check % 2 == 0) {
          //   this.shift(0,dimension-2,1);
          //   this.marker++;
          //   this.points[0] = this.points[dimension-1].minus(this.points[this.marker]);
          //   this.points[0].level=this.points[1].level;
          //   this.newPoint = 0;
          // } else {
          //   this.shift(this.marker+1,dimension-2,1);
          //   this.marker++;
          //   this.points[this.marker] = this.points[dimension-1].minus(this.points[0]);
          //   this.points[this.marker].level=level;
          //   this.newPoint = this.marker;
          // }
        temp = subtractVertexes(this.points[pivot], this.points[pivot-1]);
        var check = temp.vector.dot(this.points[0].vector);
        if (check % 2 === 0) {
          this.shift(0,dimension-2,1);
          this.marker++;
          this.points[0] = subtractVertexes(this.points[dimension-1], this.points[this.marker]);
          this.points[0].level = this.points[1].level;
          this.newPoint = 0;
        } else {
          this.shift(this.marker+1,dimension-2,1);
          this.marker++;
          this.points[this.marker] = subtractVertexes(this.points[dimension-1], this.points[0]);
          this.points[this.marker].level = this.level;
          this.newPoint = this.marker;
        }
      }

      return (changed !== this.level);
    },
    getSuggestedOwner: function(label) {
      var self = this;
      var point = _.find(this.points, function(p,i) {
        return (p.label === label) && (i !== self.newPoint);
      });
      return getOwner(point.vector.elements);
    },
    getSuggestedTransform: function() {
      var self = this;
      var sum = _.chain(this.points).select(function(p,i) { return i !== self.newPoint; })
        .reduce(function(memo, p) {
          var transformed = transform(p.vector.elements, p.level);
          return memo.add($V(transformed));
        }, Vector.Zero(self.players))
        .value();
      sum = sum.multiply(1.0/this.players);
      return sum.elements;
    },
    getSuggestedDivision: function() {
      var transformed = this.getSuggestedTransform();
      var division = {};
      for (var i=0; i<transformed.length; i++) {
        division[this.getSuggestedOwner((i+1).toString())] = {room: (i+1).toString(), rent: transformed[i]};
      }
      return division;
    },
    getPrecision: function() {
      return 2*(1.0/(Math.pow(2, this.level)));
    }
  };

  window.Simplex = Simplex;

  return Simplex;
});
define("fair_division", function(){});

/*global _: false, Simplex: false, Showdown: false, paper: false, $V: false*/
require([
  'jquery/1.9',
  'underscore/1.5',
  'backbone/nyt',
  'foundation/views/page-manager',
  "templates",
  "fair_division"
  // 'd3/3',
  // 'queue/1'
  ], function($, _, Backbone, PageManager, templates) {

  var RentCalculator = window.RentCalculator = {
  };

  // begin code for your graphic here:
  window._ = _;
  window.$ = $;
  RentCalculator._ = _;
  RentCalculator.$ = $;
  RentCalculator.Backbone = Backbone;
  console.log($.fn.jquery,_.VERSION,Backbone.VERSION);
  

  // shim layer with setTimeout fallback
  // window.requestAnimFrame = (function(){
  //   return  window.requestAnimationFrame       ||
  //           window.webkitRequestAnimationFrame ||
  //           window.mozRequestAnimationFrame    ||
  //           function( callback ){
  //             window.setTimeout(callback, 1000 / 60);
  //           };
  // })();

  // Add ECMA262-5 string trim if not supported natively
  //
  if (!('trim' in String.prototype)) {
      String.prototype.trim= function() {
          return this.replace(/^\s+/, '').replace(/\s+$/, '');
      };
  }

  // Add ECMA262-5 Array methods if not supported natively
  //
  if (!('indexOf' in Array.prototype)) {
      Array.prototype.indexOf= function(find, i /*opt*/) {
          if (i===undefined) i= 0;
          if (i<0) i+= this.length;
          if (i<0) i= 0;
          for (var n= this.length; i<n; i++)
              if (i in this && this[i]===find)
                  return i;
          return -1;
      };
  }




  // set up calculator model with default values
  RentCalculator.settings = new Backbone.Model({
    prompt_visible: false
  });

  RentCalculator.players = new Backbone.Collection();
  RentCalculator.rooms = new Backbone.Collection();

  // stores a log of player choices at different price sets
  RentCalculator.choices = new Backbone.Collection();
  // stores a log of proposed divisions
  RentCalculator.proposals = new Backbone.Collection();
  RentCalculator.raw_choices = [];

  function getShortUrl() {
    return $.ajax({
      url: "http://www.nytimes.com/svc/bitly/shorten.jsonp?url="+encodeURIComponent(window.location)+"&callback=?",
      dataType: "jsonp",
      cache: true,
      jsonp: true
    }).done(function(d) {
      // console.log(d);
      $(".nytint-shareToolsItemPermalink input").val(d.payload.short_url);
      $(".story-short-url a").attr("href", d.payload.short_url);
      $(".story-short-url a").text(d.payload.short_url);
    });
  }
  

  /*
    VIEWS
  */

  RentCalculator.players_view = (function() {
    var View = Backbone.View.extend({
      el: $("#nytint-division-players"),
      template: templates.jst.players,
      initialize: function() {
        _.bindAll(this, "render");
        this.startListening();
      },
      startListening: function() {
        this.listenTo(RentCalculator.settings, "change:started", this.render);
        this.listenTo(RentCalculator.proposals, "add", this.render);
        this.listenTo(RentCalculator.players, "reset change", this.render);
        this.listenTo(RentCalculator.rooms, "reset change", this.render);
      },
      render: function(collection, opts) {
        if (opts && opts.form === true) return;
        // console.log("render players");
        var data = RentCalculator.settings.toJSON();
        data.rooms = RentCalculator.rooms.toJSON();
        data.players = RentCalculator.players.toJSON();

        // console.log("players view", data);
        this.$el.html(this.template(data));
      }
    });
    return new View();
  }());

  RentCalculator.active_choice_view = (function() {
    var View = Backbone.View.extend({
      el: $("#nytint-active-choice"),
      template: templates.jst.active_choice,
      initialize: function() {
        _.bindAll(this, "render", "post_render", "select_room");
        this.startListening();
      },
      startListening: function() {
        this.listenTo(RentCalculator.players, "reset change", this.render);
        this.listenTo(RentCalculator.rooms, "reset change", this.render);
      },
      events: {
        "click .active-player .rent-calculator-choice-room": "select_room"
      },
      set_model: function(m) {
        this.model = m;
        this.render();
      },
      render: function() {
        if (!this.model) return;
        var self = this;

        var data = {};
        var current_choice = this.model.toJSON();
        data.player_name = RentCalculator.getPlayerName(current_choice.player);
        data.proposal = current_choice.proposal;

        data.rooms = RentCalculator.rooms.toJSON();
        data.players = RentCalculator.players.map(function(player) {
          player = player.toJSON();
          if (player.label === current_choice.player) {
            player.latest_choice = current_choice;
            player.active = true;
          } else {
            player.latest_choice = RentCalculator.choices.findWhere({"auto": false, "player": player.label});
            if (player.latest_choice) player.latest_choice = player.latest_choice.toJSON();
          }
          return player;
        });

        if (RentCalculator.choices.where({"auto":false}).length > 1) {
          RentCalculator.choices_table_view.filtered_player = current_choice.player;
          RentCalculator.choices_table_view.render();
        }

        console.log("render active_choice_view", data);
        // this.$el.html(this.template(data)); //.show();
        // _(this.post_render).defer();

//$("#nytint-active-choice").fadeOut(300, function(){ console.log('done fading'); $("#nytint-active-choice").fadeIn(300); })
        if (this.$(".active-player").length > 0) {
          this.$(".active-player").fadeOut({
            duration: 300,
            // done: function() {
            //   console.log("done");
            // },
            // complete: function() {
            //   console.log("complete");
            // },
            always: function() {
              // console.log("always");
              // requestAnimationFrame(function() {
                self.$el.html(self.template(data));
                self.$(".active-player").css({"visibility":"visible"});
                self.$(".active-player").animate({"opacity":1}, 300);
              // });
            }
          });
        } else {
          self.$el.html(self.template(data));
          self.$(".active-player").css({"opacity":1,"visibility":"visible"});
        }
        
      },
      post_render: function() {
        // this.$(".active-player").addClass("active-player-highlight");
        this.$el.fadeIn(300);
      },
      select_room: function(e) {
        var selected_room = this.$(e.currentTarget).data("room-label").toString();
        console.log("selected", selected_room);
        this.model.set({"choice": selected_room, "auto": false});
        // RentCalculator.settings.set({started: true});

        console.log("click choose", selected_room);
        RentCalculator.currentPlayerChooses(selected_room);
      }
    });
    return new View();
  }());

  RentCalculator.choices_table_view = (function() {
    var View = Backbone.View.extend({
      el: $("#nytint-choices-table-container"),
      template: templates.jst.choices_table,
      initialize: function() {
        _.bindAll(this, "render", "filter_player");
        this.startListening();
      },
      startListening: function() {
        // this.listenTo(RentCalculator.players, "reset change", this.render);
        // this.listenTo(RentCalculator.rooms, "reset change", this.render);
      },
      events: {
        "click .nytint-filter-player": "filter_player"
      },
      render: function() {
        var self = this;
        var data = RentCalculator.settings.toJSON();
        data.players = RentCalculator.players.toJSON();
        data.rooms = RentCalculator.rooms.toJSON();
        
        if (self.filtered_player) {
          data.choices = _(RentCalculator.choices.toJSON()).filter(function(c) {
            return ((c.choice !== undefined) && (c.auto === false) && (c.player === self.filtered_player));
          });
        } else {
          data.choices = _(RentCalculator.choices.toJSON()).filter(function(c) {
            return ((c.choice !== undefined) && c.auto === false);
          });
          // data.choices = RentCalculator.choices.toJSON().slice(1);
        }
        
        
        data.player_names = _.reduce(data.players, function(memo, p) {
          memo[p.label] = p.name;
          return memo;
        }, {});
        // data.player_name = RentCalculator.getPlayerName(data.player);
        // data.rooms = RentCalculator.rooms.toJSON();

        data.filter_active = this.filtered_player;

        // console.log("render choices_table", data);
        if (data.filter_active || (data.choices.length > 0)) {
          this.$el.html(this.template(data));  
        } else {
          this.$el.html("");
        }
        
        // if (data.filter_active || (data.choices.length > 0)) {
        //   this.$el.html(this.template(data)).show();
        // } else {
        //   this.$el.hide();
        // }
      },
      filter_player: function(e) {
        var $target = $(e.target),
            player = $target.data("player");
        this.$(".nytint-filter-player").removeClass("filter-active");
        $target.addClass("filter-active");
        if (player === "all") {
          this.filtered_player = null;
        } else {
          this.filtered_player = player;
        }
        this.render();
      }
    });
    return new View();
  }());

  RentCalculator.proposal_view = (function() {
    var View = Backbone.View.extend({
      el: $("#nytint-division-proposal"),
      template: templates.jst.proposal,
      initialize: function() {
        _.bindAll(this, "render", "post_render", "save", "restart", "force_show_proposal", "continue_division");
        this.startListening();
      },
      startListening: function() {
        // this.listenTo(RentCalculator.settings, "change:started", this.render);
        // this.listenTo(RentCalculator.proposals, "add", this.render);
        this.listenTo(RentCalculator.settings, "change:prompt_visible", this.render);
      },
      events: {
        "click .nytint-restart-link": "restart",
        "click .nytint-save-link": "save",
        "click .nytint-prompt-proposal-button": "force_show_proposal",
        "click .nytint-continue-link": "continue_division",
        "click .nytint-print-link": "print"
      },
      render: function(force_show) {
        if (!force_show) force_show = false;

        // console.log("render proposal view");
        var data = RentCalculator.settings.toJSON();
        data.rooms = RentCalculator.rooms.toJSON();
        data.players = RentCalculator.players.toJSON();
        
        data.show_proposal = false;
        data.overlap = false;

        // if (!data.least_precision) data.least_precision = Infinity;

        data.proposal = RentCalculator.proposals.at(0).toJSON();
        data.precision = data.proposal.precision;
        data.confident = data.precision < (data.rent/(data.rooms.length*4));
        data.confidence_bar_width = 100*(data.rooms.length*data.precision/data.rent);
        if (data.confidence_bar_width > 100) data.confidence_bar_width = 100;

        var rents = _(data.proposal.division).chain().values().pluck("rent").value();
        for (var i=0; i<rents.length; i++) {
          for (var j=0; j<rents.length; j++) {
            if ((i !== j) && (rents[i] !== rents[j]) && (Math.abs(rents[i]-rents[j]) < data.precision)) {
              data.overlap = true;
            }
          }
        }
        // console.log(rents, data.precision);
        if (!data.confident) {
          data.prompt_visible = false;
        }
        if (data.proposal && data.confident && !data.overlap && (data.precision < data.least_precision)) {
          data.show_proposal = true;
          data.prompt_visible = false;
          data.force_show = false;
        } else if (force_show === true) {
          data.show_proposal = true;
          data.prompt_visible = false;
          data.force_show = true;
        }
        if (data.show_proposal) {
          RentCalculator.settings.set({"finished":true});
          location.hash = RentCalculator.serialize();
          
          
          var room_assignments = _.reduce(data.proposal.division, function(memo,v,k) {
            memo[v.room] = {player:k, rent: v.rent};
            return memo;
          }, {});
          // console.log(room_assignments);
          data.rooms = _.map(data.rooms, function(r) {
            var assignment = room_assignments[r.label];
            r.player = assignment.player;
            r.player_name = RentCalculator.getPlayerName(r.player);
            r.rent = assignment.rent;
            r.rent_range = [r.rent - data.precision, r.rent + data.precision];
            return r;
          });
          data.rooms = _.sortBy(data.rooms, "player");

          data.players = _.map(data.players, function(p) {
            p.room = data.proposal.division[p.label].room;
            p.room_description = RentCalculator.getRoomDescription(p.room);
            p.rent = data.proposal.division[p.label].rent;
            return p;
          });
        } else {
          // RentCalculator.active_choice_view.$el.show();
          // RentCalculator.settings.set({"finished": false});
        }

        console.log("render proposal_view", data);
        this.$el.html(this.template(data));
        if (data.show_proposal) {
          _(this.post_render).defer();
        }
        // if (data.proposal) {
        //   this.$el.html(this.template(data)).show();
        // } else {
        //   this.$el.html(this.template(data)).hide();
        // }
      },
      post_render: function() {
        this.$("#nytint-proposal-table").slideDown();
      },
      force_show_proposal: function() {
        this.render(true);
      },
      // show_prompt: function() {
      //   RentCalculator.settings.set({prompt_visible: true})
      //   this.render();
      // },
      // hide_prompt: function() {
      //   RentCalculator.settings.set({prompt_visible: false})
      //   this.render();
      // },
      continue_division: function(e) {
        e.preventDefault();
        // RentCalculator.active_choice_view.$el.show();
        // this.$(".nytint-proposal").hide();
        var precision = $(e.target).data("precision");

        RentCalculator.settings.set({"finished": false, "started":true, "least_precision": precision});
        RentCalculator.redraw();
      },
      restart: function(e) {
        e.preventDefault();

        // TODO: warn first
        // window.location = window.location.toString();
        window.location.hash = "";
        window.location.reload();
      },
      save: function(e) {
        e.preventDefault();
        var self = this;
        // should save out the results of the division in a format that people can preserve
        // or email to everyone for posterity
        location.hash = RentCalculator.serialize();

        self.$(".nytint-shareToolsItemPermalink input").val(window.location);

        getShortUrl().done(function(d) {
          // console.log(d);
          self.$(".nytint-shareToolsItemPermalink input").val(d.payload.short_url);
        });
        this.$(".nytint-shareToolsItemPermalink").slideDown();
      },
      print: function(e) {
        e.preventDefault();
        window.print();
      }
    });
    return new View();
  }());

  RentCalculator.startDivision = function() {
    RentCalculator.parseStartForm();
    RentCalculator.settings.set({
      started: true,
      finished: false
    });
    RentCalculator.active_choice_view.startListening();
    RentCalculator.resetDivvy();
    RentCalculator.generateFirstCut();

    return this;
  };

  RentCalculator.generateFirstCut = function() {
    try {
      RentCalculator.proposeDivision();
    } catch(e) {
      // console.log(e);
    }
    // RentCalculator.settings.set({"started": true});
    RentCalculator.choices.unshift(RentCalculator.generateCuts());
  };

  RentCalculator.redraw = function() {
    console.log("redraw", RentCalculator.choices.length);
    var active_choice = RentCalculator.choices.at(0);
    RentCalculator.active_choice_view.set_model(active_choice);
    if (active_choice.get("proposal")) {
      RentCalculator.proposal_view.render();
      RentCalculator.settings.set({prompt_visible:true});
    } else {
      RentCalculator.settings.set({prompt_visible:false});
    }
    RentCalculator.choices_table_view.render();
    RentCalculator.players_view.render();
  };

  RentCalculator.settings.on("change:started", function(m) {
    console.log("change:started", RentCalculator.settings.get("started"));
    RentCalculator.track();
    if (m.get("started")) {
      RentCalculator.bindAddChoices();
      $("#nytint-division-players").slideUp();
      $("#nytint-total-rent-form .nytint-total-rent-input").attr("disabled", true);
      $("#nytint-intro-step-4").slideUp();
      $("#nytint-division-details").slideDown();
      $("#nytint-division-footer .nytint-show-footer-details").fadeOut();
      RentCalculator.active_choice_view.$el.show(); //.stop().slideDown();
      RentCalculator.choices_table_view.$el.show(); //.stop().slideDown();
      RentCalculator.proposal_view.$el.show();
    } else {
      $("#nytint-division-players").slideDown();
      $("#nytint-total-rent-form .nytint-total-rent-input").attr("disabled", false);
      $("#nytint-intro-step-4").slideDown();
      RentCalculator.active_choice_view.$el.hide(); //.stop().slideUp();
      RentCalculator.choices_table_view.$el.hide(); //.stop().slideUp();
      RentCalculator.proposal_view.$el.hide(); //.stop().slideUp();
    }
  });
  RentCalculator.settings.on("change:finished", function(m) {
    console.log("change:finished", RentCalculator.settings.get("finished"));
    RentCalculator.track();
    if (m.get("finished")) {
      $("#nytint-intro-step-4").slideUp();
      $("#nytint-intro-step-1").slideUp();
      $("#nytint-division-footer .nytint-show-footer-details").fadeOut();
      $("#nytint-division-details").slideDown();
      RentCalculator.proposal_view.$el.show();
      $("#nytint-division-proposal .nytint-proposal").slideDown();
      RentCalculator.active_choice_view.$el.hide(); //.stop().slideUp();
      $(".ink-content-items").removeClass(".ink-content-items-enabled");
      RentCalculator.choices_table_view.filtered_player = null;
      RentCalculator.choices_table_view.render();
      RentCalculator.choices_table_view.$el.show(); //.stop().slideDown();
      RentCalculator.players_view.$el.hide();
    } else {
      $("#nytint-intro-step-1").slideDown();
      $("#nytint-division-proposal .nytint-proposal").slideUp();
      RentCalculator.active_choice_view.$el.show(); //.stop().slideDown();
    }
  });

  /* BIND EVENTS */
  RentCalculator.bindChangeRooms = _.once(function() {
    RentCalculator.settings.on("change:rooms", function() {
      console.log("rooms", this.get("rooms"));
      RentCalculator.active_choice_view.stopListening();
      RentCalculator.players_view.stopListening();
      RentCalculator.settings.set({"started": false});

      var num_rooms = this.get("rooms"),
          rooms = RentCalculator.rooms.toJSON(),
          players = RentCalculator.players.toJSON(),
          name;

      if (players.length > num_rooms) players.splice(num_rooms);
      while (players.length < num_rooms) {
        name = String.fromCharCode("A".charCodeAt()+players.length);
        players.push({
          name: "Roommate "+name,
          label: name
        });
      }
      if (rooms.length > num_rooms) rooms.splice(num_rooms);
      while (rooms.length < num_rooms) {
        name = (rooms.length+1).toString();
        rooms.push({
          description: "Room "+name,
          label: name
        });
      }

      RentCalculator.rooms.reset(rooms);
      RentCalculator.players.reset(players);
      RentCalculator.players_view.startListening();
      RentCalculator.players_view.render();
    });
  });
  RentCalculator.bindAddChoices = _.once(function() {
    RentCalculator.choices.on("add", function(model, collection, evt) {
      // if (RentCalculator.settings.get("started") === false) return;
      console.log("choice add", model);
      var raw_model = model.toJSON(),
          cv, selected_room, level_up;
      
      // if there's a negative or 0 price, the current player chooses it.
      // otherwise, present a new choice
      var negative = _.find(raw_model.prices, function(p) { return p <= 0; });

      // has the current player already seen that choice?
      var existing_choice = RentCalculator.choices.detect(function(m) {
        if (m.get("choice") === undefined) return false;
        if (m.get("player") !== raw_model.player) return false;
        if (_.isEqual(m.get("prices"), raw_model.prices)) return true;
        return false;
      });

      // auto-choose
      if (!_.isUndefined(negative)) {
        // there's a negative or zero price. pick that one
        selected_room = RentCalculator.rooms.at(raw_model.prices.indexOf(negative)).get("label");
        console.log(raw_model.player + " auto choosing", selected_room);
        model.set({"choice": selected_room, "auto":true});
      } else if (!_.isUndefined(existing_choice)) {
        // current player has already seen this choice
        // so they'll make the same choice as before
        selected_room = existing_choice.get("choice");
        console.log(raw_model.player + " already chose", selected_room);
        model.set({"choice": selected_room, "auto":true});
      }
      
      // not auto-choosing
      if (selected_room === undefined) {
        RentCalculator.redraw();
        return;
      }

      // if auto-choosing
      console.log("autochoose", selected_room);
      RentCalculator.currentPlayerChooses(selected_room);
    });
  });

  /* HELPER FUNCTIONS */

  RentCalculator.parseStartForm = function() {
    var rent = Number($("input.nytint-total-rent-input").val().replace(",",""));
    if (rent === 0) rent = 1000;

    var players = $("#nytint-player-names-form .nytint-player-name-input input").map(function(i,el) {
      var $el = $(el),
        name = $el.val();
      if (name === "") name = $el.attr("default");
      return {label: $el.data("label").toString(), name: name};
    }).toArray();
    RentCalculator.players.reset(players, {form:true});
    var rooms = $("#nytint-room-descriptions-form .nytint-room-description-input input").map(function(i,el) {
      var $el = $(el),
        description = $el.val();
      if (description === "") description = $el.attr("default");
      return {label: $el.data("label").toString(), description: description};
    }).toArray();
    RentCalculator.rooms.reset(rooms, {form:true});

    RentCalculator.settings.set({rent: rent});
  };
  RentCalculator.resetDivvy = function() {
    // reset all state
    RentCalculator.active_choice_view.set_model(null);
    RentCalculator.choices.reset();
    RentCalculator.proposals.reset();
    RentCalculator.raw_choices = [];
    $("#nytint-choices-container").html("");
    this.divvy = new Simplex(this.settings.get("rooms"));
  };


  // go from a label, to a player's name.
  RentCalculator.getPlayerName = function(label) {
    var player = RentCalculator.players.findWhere({label: label.toString()}).toJSON();
    return player.name;
  };
  RentCalculator.getRoomDescription = function(label) {
    var room = RentCalculator.rooms.findWhere({label: label.toString()}).toJSON();
    return room.description;
  };

  RentCalculator.translatePrices = function(prices) {
    var total = this.settings.get("rent");
    return _.map(prices, function(p){ return p*total; });
  };

  RentCalculator.getPrecision = function() {
    if (!this.divvy) return false;
    return this.settings.get("rent") * this.divvy.getPrecision();
  };

  /*
    generate a set of prices to ask a player to choose at
  */
  RentCalculator.generateCuts = function() {
    if (!RentCalculator.divvy) return false;
    var choice = {
      player: RentCalculator.divvy.getCurrentPlayer(),
      prices: RentCalculator.translatePrices(RentCalculator.divvy.getCurrentPrices()),
      choice: undefined
    };
    return choice;
  };

  /*
   player chooses a room
  */
  RentCalculator.currentPlayerChooses = function(selected_room) {
    // RentCalculator.raw_choices.push(selected_room);
    // return RentCalculator.divvy.currentPlayerChooses(selected_room);
    RentCalculator.raw_choices.push(selected_room);
    var level_up = RentCalculator.divvy.currentPlayerChooses(selected_room);
    if (level_up) {
      console.log("level_up?:", level_up);
      RentCalculator.proposeDivision();
    }
    var new_choice = RentCalculator.generateCuts();
    if (level_up) new_choice.proposal = true;
    RentCalculator.choices.unshift(new_choice);
  };

  /*
    generate a proposed 'fair' division at the current state
  */
  RentCalculator.proposeDivision = function() {
    var precision = this.getPrecision();
    var division = RentCalculator.divvy.getSuggestedDivision();
    var total_rent = this.settings.get("rent");
    _(division).each(function(v,k) { v.rent = v.rent * total_rent; });
    
    // console.log(precision, division);

    RentCalculator.proposals.unshift({
      division: division,
      precision: precision
    });
    // var pv = new RentCalculator.ProposalView({model: RentCalculator.proposals.at(0)});
  };


  // encode3 = function(ids){
  //   var val = 0;
  //   for (var i=0;i<ids.length;i++) {
  //     val + ids[i]
  //   }
  // }
  // decode3 = function(code){

  // }

  // packIntoCode = function(word_ids){
  //   var length = word_ids.length,
  //       output = [];
  //   for(i = 0; i < length; i++){
  //       output.push(String.fromCharCode(word_ids[i]))
  //   }
  //   output = btoa(output.join(""))
  //   return output;
  // }

  // unpackFromCode = function(code){
  //   var raw = atob(code),
  //       length = raw.length,
  //       output = [];
  //   for(i = 0; i < length; i++){
  //       output.push(raw.charCodeAt(i))
  //   }
  //   return output;
  // }
  // a = packIntoCode([7,29,40,190,23,191,219,130,231,192])
  // console.log('a',a)
  // b = unpackFromCode(a)
  // console.log('b',b)


  /*
    convert
    RentCalculator.settings
    RentCalculator.players
    RentCalculator.rooms
    RentCalculator.choices
    RentCalculator.proposals
    into an encoded string suitable for jamming into the URL hash
  */
  RentCalculator.serialize = function() {
    var to_be_serialized = [];
    var num_rooms = RentCalculator.settings.get("rooms");
    to_be_serialized.push(num_rooms);
    to_be_serialized.push(RentCalculator.settings.get("rent").toString());

    var i;
    for (i=0; i<num_rooms; i++) {
      to_be_serialized.push(encodeURIComponent(RentCalculator.players.at(i).get("label")));
      to_be_serialized.push(encodeURIComponent(RentCalculator.players.at(i).get("name")));
    }
    for (i=0; i<num_rooms; i++) {
      to_be_serialized.push(encodeURIComponent(RentCalculator.rooms.at(i).get("label")));
      to_be_serialized.push(encodeURIComponent(RentCalculator.rooms.at(i).get("description")));
    } 
    // to_be_serialized = to_be_serialized.concat(RentCalculator.raw_choices);
    // return to_be_serialized.join("|");
    return to_be_serialized.join("|") + "|" + RentCalculator.raw_choices.join("");
  };


  
  // TODO: if deserialization fails,
  // reset back to beginning and
  // do the rest of this stuff in the else block
  RentCalculator.deserialize = function(serialized) {
    console.log('deserialize');
    if (!serialized) serialized = location.hash.slice(1);
    var vals = serialized.split("|");
    var num_rooms = Number(vals.shift()); // vals[0]
    RentCalculator.settings.set({
      rooms: num_rooms,
      rent: Number(vals.shift()), //vals[1],
      started: false
    });
    $("input.nytint-total-rent-input").val(RentCalculator.settings.get("rent"));

    var rooms = [], players = [];
    var i;
    // RentCalculator.players = [];
    for (i=0; i<num_rooms; i++) {
      players.push({
        label: vals.shift(),
        name: decodeURIComponent(vals.shift())
      });
    }
    // RentCalculator.rooms = [];
    for (i=0; i<num_rooms; i++) {
      rooms.push({
        label: vals.shift(),
        description: decodeURIComponent(vals.shift())
      });
    }

    RentCalculator.rooms.reset(rooms);
    RentCalculator.players.reset(players);
    // reset status to beginning of division
    RentCalculator.resetDivvy();
   
    // play back through all choices
    // console.log(vals);
    vals = vals[0].split("");
    RentCalculator.generateFirstCut();
    for (i=0; i<vals.length; i++) {
      // console.log("deserialize choose", vals[i]);
      RentCalculator.currentPlayerChooses(vals[i]);
      RentCalculator.choices.at(1).set({choice: vals[i], auto: false}, {silent:true});
    }
    RentCalculator.settings.set({finished:true});
    RentCalculator.proposal_view.render(true);
    RentCalculator.choices_table_view.render();
    getShortUrl();
  };

  RentCalculator.getTimeOnPage = (function() {
    var start;
    return function() {
      var now = (new Date()).getTime();
      if (!start) start = now;
      return now - start;
    };
  }());

  RentCalculator.track = (function() {
    var url = document.location.toString();
    // set up the default session_data that will be passed everytime
    // and be extended as it changes
    var session_data = _.extend({}, {
      subject: "rent-division-calculator",
      referrer: document.referrer,
      trueUrl: url,
      commonUrl: url.replace(window.location.search, '').replace(window.location.hash, '')
    });

    return _.throttle(function(data) {
      _.extend(session_data, RentCalculator.settings.toJSON(), {
        totalTime: RentCalculator.getTimeOnPage(),
        windowHeight: $(window).height(),
        windowWidth: $(window).width(),
        rent_choices: RentCalculator.choices.length,
        rent_proposals: RentCalculator.proposals.length
      });
      if (data) $.extend(true, session_data, data); // deep extend
      var clone = _.clone(session_data);
      
      if (RentCalculator.event_tracker) {
        RentCalculator.event_tracker.track(clone, {buffer: clone.buffer});
      } else if (window.NYTD && window.NYTD.EventTracker) {
        RentCalculator.event_tracker = new window.NYTD.EventTracker();
        RentCalculator.event_tracker.track(clone, {buffer: clone.buffer});
      } else {
        setTimeout(function() { RentCalculator.track(); }, 1000);
      }
    }, 500, {trailing: false});
  }());

  $(document).ready(function() {

    RentCalculator.settings.on("change:rooms", function() {
      var num_rooms = this.get("rooms");
      $("#nytint-player-number-selection .ink-content-item").removeClass("ink-content-item-active");
      $("#nytint-player-number-selection .ink-content-item[data-num-players="+num_rooms+"]").addClass("ink-content-item-active");
    });

    if (window.location.hash.length > 1) {
      RentCalculator.deserialize();
    } else {
      RentCalculator.bindChangeRooms();
      RentCalculator.settings.set({"rooms": 2, "least_precision": Infinity});
      
      // select how many players there are
      $(document).on("click", "#nytint-player-number-selection .ink-content-items-enabled .ink-content-item", function(e) {
        // $("#nytint-player-number-selection .ink-content-item").removeClass("ink-content-item-active");
        var $target = $(e.target),
          num = $target.data("num-players");
        // $target.addClass("ink-content-item-active");
        RentCalculator.settings.set({"rooms": num, "least_precision": Infinity});
      });

      $(document).on("change keyup", ".nytint-total-rent-input", function(e) {
        RentCalculator.parseStartForm();
      });
      $(document).on("change keyup", "#nytint-division-players input", function(e) {
        RentCalculator.parseStartForm();
      });

      $("#nytint-start-division-button").on("click", function(e) {
        RentCalculator.startDivision();
      });
    }

    $(document).on("click", ".nytint-shareToolsItemPermalink input", function(e) {
      $(this).select();
    });
    $(document).on("click", "#nytint-division-footer .nytint-show-footer-details a", function(e) {
      e.preventDefault();
      $("#nytint-division-footer .nytint-show-footer-details").fadeOut();
      $("#nytint-division-details").slideDown();
    });

    RentCalculator.track();
  });

}); // end require
;
define("script", function(){});

