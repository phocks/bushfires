// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/d3-selection/src/namespaces.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.xhtml = void 0;
var xhtml = "http://www.w3.org/1999/xhtml";
exports.xhtml = xhtml;
var _default = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
exports.default = _default;
},{}],"../node_modules/d3-selection/src/namespace.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _namespaces = _interopRequireDefault(require("./namespaces"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(name) {
  var prefix = name += "",
      i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  return _namespaces.default.hasOwnProperty(prefix) ? {
    space: _namespaces.default[prefix],
    local: name
  } : name;
}
},{"./namespaces":"../node_modules/d3-selection/src/namespaces.js"}],"../node_modules/d3-selection/src/creator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _namespace = _interopRequireDefault(require("./namespace"));

var _namespaces = require("./namespaces");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function creatorInherit(name) {
  return function () {
    var document = this.ownerDocument,
        uri = this.namespaceURI;
    return uri === _namespaces.xhtml && document.documentElement.namespaceURI === _namespaces.xhtml ? document.createElement(name) : document.createElementNS(uri, name);
  };
}

function creatorFixed(fullname) {
  return function () {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}

function _default(name) {
  var fullname = (0, _namespace.default)(name);
  return (fullname.local ? creatorFixed : creatorInherit)(fullname);
}
},{"./namespace":"../node_modules/d3-selection/src/namespace.js","./namespaces":"../node_modules/d3-selection/src/namespaces.js"}],"../node_modules/d3-selection/src/selector.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function none() {}

function _default(selector) {
  return selector == null ? none : function () {
    return this.querySelector(selector);
  };
}
},{}],"../node_modules/d3-selection/src/selection/select.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _index = require("./index");

var _selector = _interopRequireDefault(require("../selector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(select) {
  if (typeof select !== "function") select = (0, _selector.default)(select);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }

  return new _index.Selection(subgroups, this._parents);
}
},{"./index":"../node_modules/d3-selection/src/selection/index.js","../selector":"../node_modules/d3-selection/src/selector.js"}],"../node_modules/d3-selection/src/selectorAll.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function empty() {
  return [];
}

function _default(selector) {
  return selector == null ? empty : function () {
    return this.querySelectorAll(selector);
  };
}
},{}],"../node_modules/d3-selection/src/selection/selectAll.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _index = require("./index");

var _selectorAll = _interopRequireDefault(require("../selectorAll"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(select) {
  if (typeof select !== "function") select = (0, _selectorAll.default)(select);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }

  return new _index.Selection(subgroups, parents);
}
},{"./index":"../node_modules/d3-selection/src/selection/index.js","../selectorAll":"../node_modules/d3-selection/src/selectorAll.js"}],"../node_modules/d3-selection/src/matcher.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(selector) {
  return function () {
    return this.matches(selector);
  };
}
},{}],"../node_modules/d3-selection/src/selection/filter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _index = require("./index");

var _matcher = _interopRequireDefault(require("../matcher"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(match) {
  if (typeof match !== "function") match = (0, _matcher.default)(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new _index.Selection(subgroups, this._parents);
}
},{"./index":"../node_modules/d3-selection/src/selection/index.js","../matcher":"../node_modules/d3-selection/src/matcher.js"}],"../node_modules/d3-selection/src/selection/sparse.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(update) {
  return new Array(update.length);
}
},{}],"../node_modules/d3-selection/src/selection/enter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.EnterNode = EnterNode;

var _sparse = _interopRequireDefault(require("./sparse"));

var _index = require("./index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  return new _index.Selection(this._enter || this._groups.map(_sparse.default), this._parents);
}

function EnterNode(parent, datum) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum;
}

EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function (child) {
    return this._parent.insertBefore(child, this._next);
  },
  insertBefore: function (child, next) {
    return this._parent.insertBefore(child, next);
  },
  querySelector: function (selector) {
    return this._parent.querySelector(selector);
  },
  querySelectorAll: function (selector) {
    return this._parent.querySelectorAll(selector);
  }
};
},{"./sparse":"../node_modules/d3-selection/src/selection/sparse.js","./index":"../node_modules/d3-selection/src/selection/index.js"}],"../node_modules/d3-selection/src/constant.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(x) {
  return function () {
    return x;
  };
}
},{}],"../node_modules/d3-selection/src/selection/data.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _index = require("./index");

var _enter = require("./enter");

var _constant = _interopRequireDefault(require("../constant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var keyPrefix = "$"; // Protect against keys like “__proto__”.

function bindIndex(parent, group, enter, update, exit, data) {
  var i = 0,
      node,
      groupLength = group.length,
      dataLength = data.length; // Put any non-null nodes that fit into update.
  // Put any null nodes into enter.
  // Put any remaining data into enter.

  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new _enter.EnterNode(parent, data[i]);
    }
  } // Put any non-null nodes that don’t fit into exit.


  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}

function bindKey(parent, group, enter, update, exit, data, key) {
  var i,
      node,
      nodeByKeyValue = {},
      groupLength = group.length,
      dataLength = data.length,
      keyValues = new Array(groupLength),
      keyValue; // Compute the key for each node.
  // If multiple nodes have the same key, the duplicates are added to exit.

  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = keyPrefix + key.call(node, node.__data__, i, group);

      if (keyValue in nodeByKeyValue) {
        exit[i] = node;
      } else {
        nodeByKeyValue[keyValue] = node;
      }
    }
  } // Compute the key for each datum.
  // If there a node associated with this key, join and add it to update.
  // If there is not (or the key is a duplicate), add it to enter.


  for (i = 0; i < dataLength; ++i) {
    keyValue = keyPrefix + key.call(parent, data[i], i, data);

    if (node = nodeByKeyValue[keyValue]) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue[keyValue] = null;
    } else {
      enter[i] = new _enter.EnterNode(parent, data[i]);
    }
  } // Add any remaining nodes that were not bound to data to exit.


  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && nodeByKeyValue[keyValues[i]] === node) {
      exit[i] = node;
    }
  }
}

function _default(value, key) {
  if (!value) {
    data = new Array(this.size()), j = -1;
    this.each(function (d) {
      data[++j] = d;
    });
    return data;
  }

  var bind = key ? bindKey : bindIndex,
      parents = this._parents,
      groups = this._groups;
  if (typeof value !== "function") value = (0, _constant.default)(value);

  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j],
        group = groups[j],
        groupLength = group.length,
        data = value.call(parent, parent && parent.__data__, j, parents),
        dataLength = data.length,
        enterGroup = enter[j] = new Array(dataLength),
        updateGroup = update[j] = new Array(dataLength),
        exitGroup = exit[j] = new Array(groupLength);
    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key); // Now connect the enter nodes to their following update node, such that
    // appendChild can insert the materialized enter node before this node,
    // rather than at the end of the parent node.

    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1) i1 = i0 + 1;

        while (!(next = updateGroup[i1]) && ++i1 < dataLength);

        previous._next = next || null;
      }
    }
  }

  update = new _index.Selection(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}
},{"./index":"../node_modules/d3-selection/src/selection/index.js","./enter":"../node_modules/d3-selection/src/selection/enter.js","../constant":"../node_modules/d3-selection/src/constant.js"}],"../node_modules/d3-selection/src/selection/exit.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _sparse = _interopRequireDefault(require("./sparse"));

var _index = require("./index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  return new _index.Selection(this._exit || this._groups.map(_sparse.default), this._parents);
}
},{"./sparse":"../node_modules/d3-selection/src/selection/sparse.js","./index":"../node_modules/d3-selection/src/selection/index.js"}],"../node_modules/d3-selection/src/selection/join.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(onenter, onupdate, onexit) {
  var enter = this.enter(),
      update = this,
      exit = this.exit();
  enter = typeof onenter === "function" ? onenter(enter) : enter.append(onenter + "");
  if (onupdate != null) update = onupdate(update);
  if (onexit == null) exit.remove();else onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}
},{}],"../node_modules/d3-selection/src/selection/merge.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _index = require("./index");

function _default(selection) {
  for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }

  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }

  return new _index.Selection(merges, this._parents);
}
},{"./index":"../node_modules/d3-selection/src/selection/index.js"}],"../node_modules/d3-selection/src/selection/order.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default() {
  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
      if (node = group[i]) {
        if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }

  return this;
}
},{}],"../node_modules/d3-selection/src/selection/sort.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _index = require("./index");

function _default(compare) {
  if (!compare) compare = ascending;

  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }

  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        sortgroup[i] = node;
      }
    }

    sortgroup.sort(compareNode);
  }

  return new _index.Selection(sortgroups, this._parents).order();
}

function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}
},{"./index":"../node_modules/d3-selection/src/selection/index.js"}],"../node_modules/d3-selection/src/selection/call.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}
},{}],"../node_modules/d3-selection/src/selection/nodes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default() {
  var nodes = new Array(this.size()),
      i = -1;
  this.each(function () {
    nodes[++i] = this;
  });
  return nodes;
}
},{}],"../node_modules/d3-selection/src/selection/node.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }

  return null;
}
},{}],"../node_modules/d3-selection/src/selection/size.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default() {
  var size = 0;
  this.each(function () {
    ++size;
  });
  return size;
}
},{}],"../node_modules/d3-selection/src/selection/empty.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default() {
  return !this.node();
}
},{}],"../node_modules/d3-selection/src/selection/each.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(callback) {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }

  return this;
}
},{}],"../node_modules/d3-selection/src/selection/attr.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _namespace = _interopRequireDefault(require("../namespace"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function attrRemove(name) {
  return function () {
    this.removeAttribute(name);
  };
}

function attrRemoveNS(fullname) {
  return function () {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attrConstant(name, value) {
  return function () {
    this.setAttribute(name, value);
  };
}

function attrConstantNS(fullname, value) {
  return function () {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}

function attrFunction(name, value) {
  return function () {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name);else this.setAttribute(name, v);
  };
}

function attrFunctionNS(fullname, value) {
  return function () {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);else this.setAttributeNS(fullname.space, fullname.local, v);
  };
}

function _default(name, value) {
  var fullname = (0, _namespace.default)(name);

  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
  }

  return this.each((value == null ? fullname.local ? attrRemoveNS : attrRemove : typeof value === "function" ? fullname.local ? attrFunctionNS : attrFunction : fullname.local ? attrConstantNS : attrConstant)(fullname, value));
}
},{"../namespace":"../node_modules/d3-selection/src/namespace.js"}],"../node_modules/d3-selection/src/window.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(node) {
  return node.ownerDocument && node.ownerDocument.defaultView || // node is a Node
  node.document && node // node is a Window
  || node.defaultView; // node is a Document
}
},{}],"../node_modules/d3-selection/src/selection/style.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.styleValue = styleValue;

var _window = _interopRequireDefault(require("../window"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function styleRemove(name) {
  return function () {
    this.style.removeProperty(name);
  };
}

function styleConstant(name, value, priority) {
  return function () {
    this.style.setProperty(name, value, priority);
  };
}

function styleFunction(name, value, priority) {
  return function () {
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name);else this.style.setProperty(name, v, priority);
  };
}

function _default(name, value, priority) {
  return arguments.length > 1 ? this.each((value == null ? styleRemove : typeof value === "function" ? styleFunction : styleConstant)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
}

function styleValue(node, name) {
  return node.style.getPropertyValue(name) || (0, _window.default)(node).getComputedStyle(node, null).getPropertyValue(name);
}
},{"../window":"../node_modules/d3-selection/src/window.js"}],"../node_modules/d3-selection/src/selection/property.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function propertyRemove(name) {
  return function () {
    delete this[name];
  };
}

function propertyConstant(name, value) {
  return function () {
    this[name] = value;
  };
}

function propertyFunction(name, value) {
  return function () {
    var v = value.apply(this, arguments);
    if (v == null) delete this[name];else this[name] = v;
  };
}

function _default(name, value) {
  return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
}
},{}],"../node_modules/d3-selection/src/selection/classed.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function classArray(string) {
  return string.trim().split(/^|\s+/);
}

function classList(node) {
  return node.classList || new ClassList(node);
}

function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}

ClassList.prototype = {
  add: function (name) {
    var i = this._names.indexOf(name);

    if (i < 0) {
      this._names.push(name);

      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function (name) {
    var i = this._names.indexOf(name);

    if (i >= 0) {
      this._names.splice(i, 1);

      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function (name) {
    return this._names.indexOf(name) >= 0;
  }
};

function classedAdd(node, names) {
  var list = classList(node),
      i = -1,
      n = names.length;

  while (++i < n) list.add(names[i]);
}

function classedRemove(node, names) {
  var list = classList(node),
      i = -1,
      n = names.length;

  while (++i < n) list.remove(names[i]);
}

function classedTrue(names) {
  return function () {
    classedAdd(this, names);
  };
}

function classedFalse(names) {
  return function () {
    classedRemove(this, names);
  };
}

function classedFunction(names, value) {
  return function () {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}

function _default(name, value) {
  var names = classArray(name + "");

  if (arguments.length < 2) {
    var list = classList(this.node()),
        i = -1,
        n = names.length;

    while (++i < n) if (!list.contains(names[i])) return false;

    return true;
  }

  return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
}
},{}],"../node_modules/d3-selection/src/selection/text.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function textRemove() {
  this.textContent = "";
}

function textConstant(value) {
  return function () {
    this.textContent = value;
  };
}

function textFunction(value) {
  return function () {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}

function _default(value) {
  return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction : textConstant)(value)) : this.node().textContent;
}
},{}],"../node_modules/d3-selection/src/selection/html.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function htmlRemove() {
  this.innerHTML = "";
}

function htmlConstant(value) {
  return function () {
    this.innerHTML = value;
  };
}

function htmlFunction(value) {
  return function () {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}

function _default(value) {
  return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
}
},{}],"../node_modules/d3-selection/src/selection/raise.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function raise() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}

function _default() {
  return this.each(raise);
}
},{}],"../node_modules/d3-selection/src/selection/lower.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function lower() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}

function _default() {
  return this.each(lower);
}
},{}],"../node_modules/d3-selection/src/selection/append.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _creator = _interopRequireDefault(require("../creator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(name) {
  var create = typeof name === "function" ? name : (0, _creator.default)(name);
  return this.select(function () {
    return this.appendChild(create.apply(this, arguments));
  });
}
},{"../creator":"../node_modules/d3-selection/src/creator.js"}],"../node_modules/d3-selection/src/selection/insert.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _creator = _interopRequireDefault(require("../creator"));

var _selector = _interopRequireDefault(require("../selector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function constantNull() {
  return null;
}

function _default(name, before) {
  var create = typeof name === "function" ? name : (0, _creator.default)(name),
      select = before == null ? constantNull : typeof before === "function" ? before : (0, _selector.default)(before);
  return this.select(function () {
    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
  });
}
},{"../creator":"../node_modules/d3-selection/src/creator.js","../selector":"../node_modules/d3-selection/src/selector.js"}],"../node_modules/d3-selection/src/selection/remove.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function remove() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}

function _default() {
  return this.each(remove);
}
},{}],"../node_modules/d3-selection/src/selection/clone.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function selection_cloneShallow() {
  var clone = this.cloneNode(false),
      parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}

function selection_cloneDeep() {
  var clone = this.cloneNode(true),
      parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}

function _default(deep) {
  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}
},{}],"../node_modules/d3-selection/src/selection/datum.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(value) {
  return arguments.length ? this.property("__data__", value) : this.node().__data__;
}
},{}],"../node_modules/d3-selection/src/selection/on.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.customEvent = customEvent;
exports.event = void 0;
var filterEvents = {};
var event = null;
exports.event = event;

if (typeof document !== "undefined") {
  var element = document.documentElement;

  if (!("onmouseenter" in element)) {
    filterEvents = {
      mouseenter: "mouseover",
      mouseleave: "mouseout"
    };
  }
}

function filterContextListener(listener, index, group) {
  listener = contextListener(listener, index, group);
  return function (event) {
    var related = event.relatedTarget;

    if (!related || related !== this && !(related.compareDocumentPosition(this) & 8)) {
      listener.call(this, event);
    }
  };
}

function contextListener(listener, index, group) {
  return function (event1) {
    var event0 = event; // Events can be reentrant (e.g., focus).

    exports.event = event = event1;

    try {
      listener.call(this, this.__data__, index, group);
    } finally {
      exports.event = event = event0;
    }
  };
}

function parseTypenames(typenames) {
  return typenames.trim().split(/^|\s+/).map(function (t) {
    var name = "",
        i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    return {
      type: t,
      name: name
    };
  });
}

function onRemove(typename) {
  return function () {
    var on = this.__on;
    if (!on) return;

    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.capture);
      } else {
        on[++i] = o;
      }
    }

    if (++i) on.length = i;else delete this.__on;
  };
}

function onAdd(typename, value, capture) {
  var wrap = filterEvents.hasOwnProperty(typename.type) ? filterContextListener : contextListener;
  return function (d, i, group) {
    var on = this.__on,
        o,
        listener = wrap(value, i, group);
    if (on) for (var j = 0, m = on.length; j < m; ++j) {
      if ((o = on[j]).type === typename.type && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.capture);
        this.addEventListener(o.type, o.listener = listener, o.capture = capture);
        o.value = value;
        return;
      }
    }
    this.addEventListener(typename.type, listener, capture);
    o = {
      type: typename.type,
      name: typename.name,
      value: value,
      listener: listener,
      capture: capture
    };
    if (!on) this.__on = [o];else on.push(o);
  };
}

function _default(typename, value, capture) {
  var typenames = parseTypenames(typename + ""),
      i,
      n = typenames.length,
      t;

  if (arguments.length < 2) {
    var on = this.node().__on;

    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
      for (i = 0, o = on[j]; i < n; ++i) {
        if ((t = typenames[i]).type === o.type && t.name === o.name) {
          return o.value;
        }
      }
    }
    return;
  }

  on = value ? onAdd : onRemove;
  if (capture == null) capture = false;

  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, capture));

  return this;
}

function customEvent(event1, listener, that, args) {
  var event0 = event;
  event1.sourceEvent = event;
  exports.event = event = event1;

  try {
    return listener.apply(that, args);
  } finally {
    exports.event = event = event0;
  }
}
},{}],"../node_modules/d3-selection/src/selection/dispatch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _window = _interopRequireDefault(require("../window"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function dispatchEvent(node, type, params) {
  var window = (0, _window.default)(node),
      event = window.CustomEvent;

  if (typeof event === "function") {
    event = new event(type, params);
  } else {
    event = window.document.createEvent("Event");
    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;else event.initEvent(type, false, false);
  }

  node.dispatchEvent(event);
}

function dispatchConstant(type, params) {
  return function () {
    return dispatchEvent(this, type, params);
  };
}

function dispatchFunction(type, params) {
  return function () {
    return dispatchEvent(this, type, params.apply(this, arguments));
  };
}

function _default(type, params) {
  return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type, params));
}
},{"../window":"../node_modules/d3-selection/src/window.js"}],"../node_modules/d3-selection/src/selection/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Selection = Selection;
exports.default = exports.root = void 0;

var _select = _interopRequireDefault(require("./select"));

var _selectAll = _interopRequireDefault(require("./selectAll"));

var _filter = _interopRequireDefault(require("./filter"));

var _data = _interopRequireDefault(require("./data"));

var _enter = _interopRequireDefault(require("./enter"));

var _exit = _interopRequireDefault(require("./exit"));

var _join = _interopRequireDefault(require("./join"));

var _merge = _interopRequireDefault(require("./merge"));

var _order = _interopRequireDefault(require("./order"));

var _sort = _interopRequireDefault(require("./sort"));

var _call = _interopRequireDefault(require("./call"));

var _nodes = _interopRequireDefault(require("./nodes"));

var _node = _interopRequireDefault(require("./node"));

var _size = _interopRequireDefault(require("./size"));

var _empty = _interopRequireDefault(require("./empty"));

var _each = _interopRequireDefault(require("./each"));

var _attr = _interopRequireDefault(require("./attr"));

var _style = _interopRequireDefault(require("./style"));

var _property = _interopRequireDefault(require("./property"));

var _classed = _interopRequireDefault(require("./classed"));

var _text = _interopRequireDefault(require("./text"));

var _html = _interopRequireDefault(require("./html"));

var _raise = _interopRequireDefault(require("./raise"));

var _lower = _interopRequireDefault(require("./lower"));

var _append = _interopRequireDefault(require("./append"));

var _insert = _interopRequireDefault(require("./insert"));

var _remove = _interopRequireDefault(require("./remove"));

var _clone = _interopRequireDefault(require("./clone"));

var _datum = _interopRequireDefault(require("./datum"));

var _on = _interopRequireDefault(require("./on"));

var _dispatch = _interopRequireDefault(require("./dispatch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var root = [null];
exports.root = root;

function Selection(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}

function selection() {
  return new Selection([[document.documentElement]], root);
}

Selection.prototype = selection.prototype = {
  constructor: Selection,
  select: _select.default,
  selectAll: _selectAll.default,
  filter: _filter.default,
  data: _data.default,
  enter: _enter.default,
  exit: _exit.default,
  join: _join.default,
  merge: _merge.default,
  order: _order.default,
  sort: _sort.default,
  call: _call.default,
  nodes: _nodes.default,
  node: _node.default,
  size: _size.default,
  empty: _empty.default,
  each: _each.default,
  attr: _attr.default,
  style: _style.default,
  property: _property.default,
  classed: _classed.default,
  text: _text.default,
  html: _html.default,
  raise: _raise.default,
  lower: _lower.default,
  append: _append.default,
  insert: _insert.default,
  remove: _remove.default,
  clone: _clone.default,
  datum: _datum.default,
  on: _on.default,
  dispatch: _dispatch.default
};
var _default = selection;
exports.default = _default;
},{"./select":"../node_modules/d3-selection/src/selection/select.js","./selectAll":"../node_modules/d3-selection/src/selection/selectAll.js","./filter":"../node_modules/d3-selection/src/selection/filter.js","./data":"../node_modules/d3-selection/src/selection/data.js","./enter":"../node_modules/d3-selection/src/selection/enter.js","./exit":"../node_modules/d3-selection/src/selection/exit.js","./join":"../node_modules/d3-selection/src/selection/join.js","./merge":"../node_modules/d3-selection/src/selection/merge.js","./order":"../node_modules/d3-selection/src/selection/order.js","./sort":"../node_modules/d3-selection/src/selection/sort.js","./call":"../node_modules/d3-selection/src/selection/call.js","./nodes":"../node_modules/d3-selection/src/selection/nodes.js","./node":"../node_modules/d3-selection/src/selection/node.js","./size":"../node_modules/d3-selection/src/selection/size.js","./empty":"../node_modules/d3-selection/src/selection/empty.js","./each":"../node_modules/d3-selection/src/selection/each.js","./attr":"../node_modules/d3-selection/src/selection/attr.js","./style":"../node_modules/d3-selection/src/selection/style.js","./property":"../node_modules/d3-selection/src/selection/property.js","./classed":"../node_modules/d3-selection/src/selection/classed.js","./text":"../node_modules/d3-selection/src/selection/text.js","./html":"../node_modules/d3-selection/src/selection/html.js","./raise":"../node_modules/d3-selection/src/selection/raise.js","./lower":"../node_modules/d3-selection/src/selection/lower.js","./append":"../node_modules/d3-selection/src/selection/append.js","./insert":"../node_modules/d3-selection/src/selection/insert.js","./remove":"../node_modules/d3-selection/src/selection/remove.js","./clone":"../node_modules/d3-selection/src/selection/clone.js","./datum":"../node_modules/d3-selection/src/selection/datum.js","./on":"../node_modules/d3-selection/src/selection/on.js","./dispatch":"../node_modules/d3-selection/src/selection/dispatch.js"}],"../node_modules/d3-selection/src/select.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _index = require("./selection/index");

function _default(selector) {
  return typeof selector === "string" ? new _index.Selection([[document.querySelector(selector)]], [document.documentElement]) : new _index.Selection([[selector]], _index.root);
}
},{"./selection/index":"../node_modules/d3-selection/src/selection/index.js"}],"../node_modules/d3-selection/src/create.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _creator = _interopRequireDefault(require("./creator"));

var _select = _interopRequireDefault(require("./select"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(name) {
  return (0, _select.default)((0, _creator.default)(name).call(document.documentElement));
}
},{"./creator":"../node_modules/d3-selection/src/creator.js","./select":"../node_modules/d3-selection/src/select.js"}],"../node_modules/d3-selection/src/local.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = local;
var nextId = 0;

function local() {
  return new Local();
}

function Local() {
  this._ = "@" + (++nextId).toString(36);
}

Local.prototype = local.prototype = {
  constructor: Local,
  get: function (node) {
    var id = this._;

    while (!(id in node)) if (!(node = node.parentNode)) return;

    return node[id];
  },
  set: function (node, value) {
    return node[this._] = value;
  },
  remove: function (node) {
    return this._ in node && delete node[this._];
  },
  toString: function () {
    return this._;
  }
};
},{}],"../node_modules/d3-selection/src/sourceEvent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _on = require("./selection/on");

function _default() {
  var current = _on.event,
      source;

  while (source = current.sourceEvent) current = source;

  return current;
}
},{"./selection/on":"../node_modules/d3-selection/src/selection/on.js"}],"../node_modules/d3-selection/src/point.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(node, event) {
  var svg = node.ownerSVGElement || node;

  if (svg.createSVGPoint) {
    var point = svg.createSVGPoint();
    point.x = event.clientX, point.y = event.clientY;
    point = point.matrixTransform(node.getScreenCTM().inverse());
    return [point.x, point.y];
  }

  var rect = node.getBoundingClientRect();
  return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
}
},{}],"../node_modules/d3-selection/src/mouse.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _sourceEvent = _interopRequireDefault(require("./sourceEvent"));

var _point = _interopRequireDefault(require("./point"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(node) {
  var event = (0, _sourceEvent.default)();
  if (event.changedTouches) event = event.changedTouches[0];
  return (0, _point.default)(node, event);
}
},{"./sourceEvent":"../node_modules/d3-selection/src/sourceEvent.js","./point":"../node_modules/d3-selection/src/point.js"}],"../node_modules/d3-selection/src/selectAll.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _index = require("./selection/index");

function _default(selector) {
  return typeof selector === "string" ? new _index.Selection([document.querySelectorAll(selector)], [document.documentElement]) : new _index.Selection([selector == null ? [] : selector], _index.root);
}
},{"./selection/index":"../node_modules/d3-selection/src/selection/index.js"}],"../node_modules/d3-selection/src/touch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _sourceEvent = _interopRequireDefault(require("./sourceEvent"));

var _point = _interopRequireDefault(require("./point"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(node, touches, identifier) {
  if (arguments.length < 3) identifier = touches, touches = (0, _sourceEvent.default)().changedTouches;

  for (var i = 0, n = touches ? touches.length : 0, touch; i < n; ++i) {
    if ((touch = touches[i]).identifier === identifier) {
      return (0, _point.default)(node, touch);
    }
  }

  return null;
}
},{"./sourceEvent":"../node_modules/d3-selection/src/sourceEvent.js","./point":"../node_modules/d3-selection/src/point.js"}],"../node_modules/d3-selection/src/touches.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _sourceEvent = _interopRequireDefault(require("./sourceEvent"));

var _point = _interopRequireDefault(require("./point"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(node, touches) {
  if (touches == null) touches = (0, _sourceEvent.default)().touches;

  for (var i = 0, n = touches ? touches.length : 0, points = new Array(n); i < n; ++i) {
    points[i] = (0, _point.default)(node, touches[i]);
  }

  return points;
}
},{"./sourceEvent":"../node_modules/d3-selection/src/sourceEvent.js","./point":"../node_modules/d3-selection/src/point.js"}],"../node_modules/d3-selection/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "create", {
  enumerable: true,
  get: function () {
    return _create.default;
  }
});
Object.defineProperty(exports, "creator", {
  enumerable: true,
  get: function () {
    return _creator.default;
  }
});
Object.defineProperty(exports, "local", {
  enumerable: true,
  get: function () {
    return _local.default;
  }
});
Object.defineProperty(exports, "matcher", {
  enumerable: true,
  get: function () {
    return _matcher.default;
  }
});
Object.defineProperty(exports, "mouse", {
  enumerable: true,
  get: function () {
    return _mouse.default;
  }
});
Object.defineProperty(exports, "namespace", {
  enumerable: true,
  get: function () {
    return _namespace.default;
  }
});
Object.defineProperty(exports, "namespaces", {
  enumerable: true,
  get: function () {
    return _namespaces.default;
  }
});
Object.defineProperty(exports, "clientPoint", {
  enumerable: true,
  get: function () {
    return _point.default;
  }
});
Object.defineProperty(exports, "select", {
  enumerable: true,
  get: function () {
    return _select.default;
  }
});
Object.defineProperty(exports, "selectAll", {
  enumerable: true,
  get: function () {
    return _selectAll.default;
  }
});
Object.defineProperty(exports, "selection", {
  enumerable: true,
  get: function () {
    return _index.default;
  }
});
Object.defineProperty(exports, "selector", {
  enumerable: true,
  get: function () {
    return _selector.default;
  }
});
Object.defineProperty(exports, "selectorAll", {
  enumerable: true,
  get: function () {
    return _selectorAll.default;
  }
});
Object.defineProperty(exports, "style", {
  enumerable: true,
  get: function () {
    return _style.styleValue;
  }
});
Object.defineProperty(exports, "touch", {
  enumerable: true,
  get: function () {
    return _touch.default;
  }
});
Object.defineProperty(exports, "touches", {
  enumerable: true,
  get: function () {
    return _touches.default;
  }
});
Object.defineProperty(exports, "window", {
  enumerable: true,
  get: function () {
    return _window.default;
  }
});
Object.defineProperty(exports, "event", {
  enumerable: true,
  get: function () {
    return _on.event;
  }
});
Object.defineProperty(exports, "customEvent", {
  enumerable: true,
  get: function () {
    return _on.customEvent;
  }
});

var _create = _interopRequireDefault(require("./create"));

var _creator = _interopRequireDefault(require("./creator"));

var _local = _interopRequireDefault(require("./local"));

var _matcher = _interopRequireDefault(require("./matcher"));

var _mouse = _interopRequireDefault(require("./mouse"));

var _namespace = _interopRequireDefault(require("./namespace"));

var _namespaces = _interopRequireDefault(require("./namespaces"));

var _point = _interopRequireDefault(require("./point"));

var _select = _interopRequireDefault(require("./select"));

var _selectAll = _interopRequireDefault(require("./selectAll"));

var _index = _interopRequireDefault(require("./selection/index"));

var _selector = _interopRequireDefault(require("./selector"));

var _selectorAll = _interopRequireDefault(require("./selectorAll"));

var _style = require("./selection/style");

var _touch = _interopRequireDefault(require("./touch"));

var _touches = _interopRequireDefault(require("./touches"));

var _window = _interopRequireDefault(require("./window"));

var _on = require("./selection/on");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./create":"../node_modules/d3-selection/src/create.js","./creator":"../node_modules/d3-selection/src/creator.js","./local":"../node_modules/d3-selection/src/local.js","./matcher":"../node_modules/d3-selection/src/matcher.js","./mouse":"../node_modules/d3-selection/src/mouse.js","./namespace":"../node_modules/d3-selection/src/namespace.js","./namespaces":"../node_modules/d3-selection/src/namespaces.js","./point":"../node_modules/d3-selection/src/point.js","./select":"../node_modules/d3-selection/src/select.js","./selectAll":"../node_modules/d3-selection/src/selectAll.js","./selection/index":"../node_modules/d3-selection/src/selection/index.js","./selector":"../node_modules/d3-selection/src/selector.js","./selectorAll":"../node_modules/d3-selection/src/selectorAll.js","./selection/style":"../node_modules/d3-selection/src/selection/style.js","./touch":"../node_modules/d3-selection/src/touch.js","./touches":"../node_modules/d3-selection/src/touches.js","./window":"../node_modules/d3-selection/src/window.js","./selection/on":"../node_modules/d3-selection/src/selection/on.js"}],"../node_modules/d3-geo/src/adder.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

// Adds floating point numbers with twice the normal precision.
// Reference: J. R. Shewchuk, Adaptive Precision Floating-Point Arithmetic and
// Fast Robust Geometric Predicates, Discrete & Computational Geometry 18(3)
// 305–363 (1997).
// Code adapted from GeographicLib by Charles F. F. Karney,
// http://geographiclib.sourceforge.net/
function _default() {
  return new Adder();
}

function Adder() {
  this.reset();
}

Adder.prototype = {
  constructor: Adder,
  reset: function () {
    this.s = // rounded value
    this.t = 0; // exact error
  },
  add: function (y) {
    add(temp, y, this.t);
    add(this, temp.s, this.s);
    if (this.s) this.t += temp.t;else this.s = temp.t;
  },
  valueOf: function () {
    return this.s;
  }
};
var temp = new Adder();

function add(adder, a, b) {
  var x = adder.s = a + b,
      bv = x - a,
      av = x - bv;
  adder.t = a - av + (b - bv);
}
},{}],"../node_modules/d3-geo/src/math.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.acos = acos;
exports.asin = asin;
exports.haversin = haversin;
exports.tan = exports.sqrt = exports.sign = exports.sin = exports.pow = exports.log = exports.floor = exports.exp = exports.ceil = exports.cos = exports.atan2 = exports.atan = exports.abs = exports.radians = exports.degrees = exports.tau = exports.quarterPi = exports.halfPi = exports.pi = exports.epsilon2 = exports.epsilon = void 0;
var epsilon = 1e-6;
exports.epsilon = epsilon;
var epsilon2 = 1e-12;
exports.epsilon2 = epsilon2;
var pi = Math.PI;
exports.pi = pi;
var halfPi = pi / 2;
exports.halfPi = halfPi;
var quarterPi = pi / 4;
exports.quarterPi = quarterPi;
var tau = pi * 2;
exports.tau = tau;
var degrees = 180 / pi;
exports.degrees = degrees;
var radians = pi / 180;
exports.radians = radians;
var abs = Math.abs;
exports.abs = abs;
var atan = Math.atan;
exports.atan = atan;
var atan2 = Math.atan2;
exports.atan2 = atan2;
var cos = Math.cos;
exports.cos = cos;
var ceil = Math.ceil;
exports.ceil = ceil;
var exp = Math.exp;
exports.exp = exp;
var floor = Math.floor;
exports.floor = floor;
var log = Math.log;
exports.log = log;
var pow = Math.pow;
exports.pow = pow;
var sin = Math.sin;
exports.sin = sin;

var sign = Math.sign || function (x) {
  return x > 0 ? 1 : x < 0 ? -1 : 0;
};

exports.sign = sign;
var sqrt = Math.sqrt;
exports.sqrt = sqrt;
var tan = Math.tan;
exports.tan = tan;

function acos(x) {
  return x > 1 ? 0 : x < -1 ? pi : Math.acos(x);
}

function asin(x) {
  return x > 1 ? halfPi : x < -1 ? -halfPi : Math.asin(x);
}

function haversin(x) {
  return (x = sin(x / 2)) * x;
}
},{}],"../node_modules/d3-geo/src/noop.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = noop;

function noop() {}
},{}],"../node_modules/d3-geo/src/stream.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function streamGeometry(geometry, stream) {
  if (geometry && streamGeometryType.hasOwnProperty(geometry.type)) {
    streamGeometryType[geometry.type](geometry, stream);
  }
}

var streamObjectType = {
  Feature: function (object, stream) {
    streamGeometry(object.geometry, stream);
  },
  FeatureCollection: function (object, stream) {
    var features = object.features,
        i = -1,
        n = features.length;

    while (++i < n) streamGeometry(features[i].geometry, stream);
  }
};
var streamGeometryType = {
  Sphere: function (object, stream) {
    stream.sphere();
  },
  Point: function (object, stream) {
    object = object.coordinates;
    stream.point(object[0], object[1], object[2]);
  },
  MultiPoint: function (object, stream) {
    var coordinates = object.coordinates,
        i = -1,
        n = coordinates.length;

    while (++i < n) object = coordinates[i], stream.point(object[0], object[1], object[2]);
  },
  LineString: function (object, stream) {
    streamLine(object.coordinates, stream, 0);
  },
  MultiLineString: function (object, stream) {
    var coordinates = object.coordinates,
        i = -1,
        n = coordinates.length;

    while (++i < n) streamLine(coordinates[i], stream, 0);
  },
  Polygon: function (object, stream) {
    streamPolygon(object.coordinates, stream);
  },
  MultiPolygon: function (object, stream) {
    var coordinates = object.coordinates,
        i = -1,
        n = coordinates.length;

    while (++i < n) streamPolygon(coordinates[i], stream);
  },
  GeometryCollection: function (object, stream) {
    var geometries = object.geometries,
        i = -1,
        n = geometries.length;

    while (++i < n) streamGeometry(geometries[i], stream);
  }
};

function streamLine(coordinates, stream, closed) {
  var i = -1,
      n = coordinates.length - closed,
      coordinate;
  stream.lineStart();

  while (++i < n) coordinate = coordinates[i], stream.point(coordinate[0], coordinate[1], coordinate[2]);

  stream.lineEnd();
}

function streamPolygon(coordinates, stream) {
  var i = -1,
      n = coordinates.length;
  stream.polygonStart();

  while (++i < n) streamLine(coordinates[i], stream, 1);

  stream.polygonEnd();
}

function _default(object, stream) {
  if (object && streamObjectType.hasOwnProperty(object.type)) {
    streamObjectType[object.type](object, stream);
  } else {
    streamGeometry(object, stream);
  }
}
},{}],"../node_modules/d3-geo/src/area.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.areaStream = exports.areaRingSum = void 0;

var _adder = _interopRequireDefault(require("./adder.js"));

var _math = require("./math.js");

var _noop = _interopRequireDefault(require("./noop.js"));

var _stream = _interopRequireDefault(require("./stream.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var areaRingSum = (0, _adder.default)();
exports.areaRingSum = areaRingSum;
var areaSum = (0, _adder.default)(),
    lambda00,
    phi00,
    lambda0,
    cosPhi0,
    sinPhi0;
var areaStream = {
  point: _noop.default,
  lineStart: _noop.default,
  lineEnd: _noop.default,
  polygonStart: function () {
    areaRingSum.reset();
    areaStream.lineStart = areaRingStart;
    areaStream.lineEnd = areaRingEnd;
  },
  polygonEnd: function () {
    var areaRing = +areaRingSum;
    areaSum.add(areaRing < 0 ? _math.tau + areaRing : areaRing);
    this.lineStart = this.lineEnd = this.point = _noop.default;
  },
  sphere: function () {
    areaSum.add(_math.tau);
  }
};
exports.areaStream = areaStream;

function areaRingStart() {
  areaStream.point = areaPointFirst;
}

function areaRingEnd() {
  areaPoint(lambda00, phi00);
}

function areaPointFirst(lambda, phi) {
  areaStream.point = areaPoint;
  lambda00 = lambda, phi00 = phi;
  lambda *= _math.radians, phi *= _math.radians;
  lambda0 = lambda, cosPhi0 = (0, _math.cos)(phi = phi / 2 + _math.quarterPi), sinPhi0 = (0, _math.sin)(phi);
}

function areaPoint(lambda, phi) {
  lambda *= _math.radians, phi *= _math.radians;
  phi = phi / 2 + _math.quarterPi; // half the angular distance from south pole
  // Spherical excess E for a spherical triangle with vertices: south pole,
  // previous point, current point.  Uses a formula derived from Cagnoli’s
  // theorem.  See Todhunter, Spherical Trig. (1871), Sec. 103, Eq. (2).

  var dLambda = lambda - lambda0,
      sdLambda = dLambda >= 0 ? 1 : -1,
      adLambda = sdLambda * dLambda,
      cosPhi = (0, _math.cos)(phi),
      sinPhi = (0, _math.sin)(phi),
      k = sinPhi0 * sinPhi,
      u = cosPhi0 * cosPhi + k * (0, _math.cos)(adLambda),
      v = k * sdLambda * (0, _math.sin)(adLambda);
  areaRingSum.add((0, _math.atan2)(v, u)); // Advance the previous points.

  lambda0 = lambda, cosPhi0 = cosPhi, sinPhi0 = sinPhi;
}

function _default(object) {
  areaSum.reset();
  (0, _stream.default)(object, areaStream);
  return areaSum * 2;
}
},{"./adder.js":"../node_modules/d3-geo/src/adder.js","./math.js":"../node_modules/d3-geo/src/math.js","./noop.js":"../node_modules/d3-geo/src/noop.js","./stream.js":"../node_modules/d3-geo/src/stream.js"}],"../node_modules/d3-geo/src/cartesian.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spherical = spherical;
exports.cartesian = cartesian;
exports.cartesianDot = cartesianDot;
exports.cartesianCross = cartesianCross;
exports.cartesianAddInPlace = cartesianAddInPlace;
exports.cartesianScale = cartesianScale;
exports.cartesianNormalizeInPlace = cartesianNormalizeInPlace;

var _math = require("./math.js");

function spherical(cartesian) {
  return [(0, _math.atan2)(cartesian[1], cartesian[0]), (0, _math.asin)(cartesian[2])];
}

function cartesian(spherical) {
  var lambda = spherical[0],
      phi = spherical[1],
      cosPhi = (0, _math.cos)(phi);
  return [cosPhi * (0, _math.cos)(lambda), cosPhi * (0, _math.sin)(lambda), (0, _math.sin)(phi)];
}

function cartesianDot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function cartesianCross(a, b) {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
} // TODO return a


function cartesianAddInPlace(a, b) {
  a[0] += b[0], a[1] += b[1], a[2] += b[2];
}

function cartesianScale(vector, k) {
  return [vector[0] * k, vector[1] * k, vector[2] * k];
} // TODO return d


function cartesianNormalizeInPlace(d) {
  var l = (0, _math.sqrt)(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
  d[0] /= l, d[1] /= l, d[2] /= l;
}
},{"./math.js":"../node_modules/d3-geo/src/math.js"}],"../node_modules/d3-geo/src/bounds.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _adder = _interopRequireDefault(require("./adder.js"));

var _area = require("./area.js");

var _cartesian = require("./cartesian.js");

var _math = require("./math.js");

var _stream = _interopRequireDefault(require("./stream.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lambda0,
    phi0,
    lambda1,
    phi1,
    // bounds
lambda2,
    // previous lambda-coordinate
lambda00,
    phi00,
    // first point
p0,
    // previous 3D point
deltaSum = (0, _adder.default)(),
    ranges,
    range;
var boundsStream = {
  point: boundsPoint,
  lineStart: boundsLineStart,
  lineEnd: boundsLineEnd,
  polygonStart: function () {
    boundsStream.point = boundsRingPoint;
    boundsStream.lineStart = boundsRingStart;
    boundsStream.lineEnd = boundsRingEnd;
    deltaSum.reset();

    _area.areaStream.polygonStart();
  },
  polygonEnd: function () {
    _area.areaStream.polygonEnd();

    boundsStream.point = boundsPoint;
    boundsStream.lineStart = boundsLineStart;
    boundsStream.lineEnd = boundsLineEnd;
    if (_area.areaRingSum < 0) lambda0 = -(lambda1 = 180), phi0 = -(phi1 = 90);else if (deltaSum > _math.epsilon) phi1 = 90;else if (deltaSum < -_math.epsilon) phi0 = -90;
    range[0] = lambda0, range[1] = lambda1;
  },
  sphere: function () {
    lambda0 = -(lambda1 = 180), phi0 = -(phi1 = 90);
  }
};

function boundsPoint(lambda, phi) {
  ranges.push(range = [lambda0 = lambda, lambda1 = lambda]);
  if (phi < phi0) phi0 = phi;
  if (phi > phi1) phi1 = phi;
}

function linePoint(lambda, phi) {
  var p = (0, _cartesian.cartesian)([lambda * _math.radians, phi * _math.radians]);

  if (p0) {
    var normal = (0, _cartesian.cartesianCross)(p0, p),
        equatorial = [normal[1], -normal[0], 0],
        inflection = (0, _cartesian.cartesianCross)(equatorial, normal);
    (0, _cartesian.cartesianNormalizeInPlace)(inflection);
    inflection = (0, _cartesian.spherical)(inflection);
    var delta = lambda - lambda2,
        sign = delta > 0 ? 1 : -1,
        lambdai = inflection[0] * _math.degrees * sign,
        phii,
        antimeridian = (0, _math.abs)(delta) > 180;

    if (antimeridian ^ (sign * lambda2 < lambdai && lambdai < sign * lambda)) {
      phii = inflection[1] * _math.degrees;
      if (phii > phi1) phi1 = phii;
    } else if (lambdai = (lambdai + 360) % 360 - 180, antimeridian ^ (sign * lambda2 < lambdai && lambdai < sign * lambda)) {
      phii = -inflection[1] * _math.degrees;
      if (phii < phi0) phi0 = phii;
    } else {
      if (phi < phi0) phi0 = phi;
      if (phi > phi1) phi1 = phi;
    }

    if (antimeridian) {
      if (lambda < lambda2) {
        if (angle(lambda0, lambda) > angle(lambda0, lambda1)) lambda1 = lambda;
      } else {
        if (angle(lambda, lambda1) > angle(lambda0, lambda1)) lambda0 = lambda;
      }
    } else {
      if (lambda1 >= lambda0) {
        if (lambda < lambda0) lambda0 = lambda;
        if (lambda > lambda1) lambda1 = lambda;
      } else {
        if (lambda > lambda2) {
          if (angle(lambda0, lambda) > angle(lambda0, lambda1)) lambda1 = lambda;
        } else {
          if (angle(lambda, lambda1) > angle(lambda0, lambda1)) lambda0 = lambda;
        }
      }
    }
  } else {
    ranges.push(range = [lambda0 = lambda, lambda1 = lambda]);
  }

  if (phi < phi0) phi0 = phi;
  if (phi > phi1) phi1 = phi;
  p0 = p, lambda2 = lambda;
}

function boundsLineStart() {
  boundsStream.point = linePoint;
}

function boundsLineEnd() {
  range[0] = lambda0, range[1] = lambda1;
  boundsStream.point = boundsPoint;
  p0 = null;
}

function boundsRingPoint(lambda, phi) {
  if (p0) {
    var delta = lambda - lambda2;
    deltaSum.add((0, _math.abs)(delta) > 180 ? delta + (delta > 0 ? 360 : -360) : delta);
  } else {
    lambda00 = lambda, phi00 = phi;
  }

  _area.areaStream.point(lambda, phi);

  linePoint(lambda, phi);
}

function boundsRingStart() {
  _area.areaStream.lineStart();
}

function boundsRingEnd() {
  boundsRingPoint(lambda00, phi00);

  _area.areaStream.lineEnd();

  if ((0, _math.abs)(deltaSum) > _math.epsilon) lambda0 = -(lambda1 = 180);
  range[0] = lambda0, range[1] = lambda1;
  p0 = null;
} // Finds the left-right distance between two longitudes.
// This is almost the same as (lambda1 - lambda0 + 360°) % 360°, except that we want
// the distance between ±180° to be 360°.


function angle(lambda0, lambda1) {
  return (lambda1 -= lambda0) < 0 ? lambda1 + 360 : lambda1;
}

function rangeCompare(a, b) {
  return a[0] - b[0];
}

function rangeContains(range, x) {
  return range[0] <= range[1] ? range[0] <= x && x <= range[1] : x < range[0] || range[1] < x;
}

function _default(feature) {
  var i, n, a, b, merged, deltaMax, delta;
  phi1 = lambda1 = -(lambda0 = phi0 = Infinity);
  ranges = [];
  (0, _stream.default)(feature, boundsStream); // First, sort ranges by their minimum longitudes.

  if (n = ranges.length) {
    ranges.sort(rangeCompare); // Then, merge any ranges that overlap.

    for (i = 1, a = ranges[0], merged = [a]; i < n; ++i) {
      b = ranges[i];

      if (rangeContains(a, b[0]) || rangeContains(a, b[1])) {
        if (angle(a[0], b[1]) > angle(a[0], a[1])) a[1] = b[1];
        if (angle(b[0], a[1]) > angle(a[0], a[1])) a[0] = b[0];
      } else {
        merged.push(a = b);
      }
    } // Finally, find the largest gap between the merged ranges.
    // The final bounding box will be the inverse of this gap.


    for (deltaMax = -Infinity, n = merged.length - 1, i = 0, a = merged[n]; i <= n; a = b, ++i) {
      b = merged[i];
      if ((delta = angle(a[1], b[0])) > deltaMax) deltaMax = delta, lambda0 = b[0], lambda1 = a[1];
    }
  }

  ranges = range = null;
  return lambda0 === Infinity || phi0 === Infinity ? [[NaN, NaN], [NaN, NaN]] : [[lambda0, phi0], [lambda1, phi1]];
}
},{"./adder.js":"../node_modules/d3-geo/src/adder.js","./area.js":"../node_modules/d3-geo/src/area.js","./cartesian.js":"../node_modules/d3-geo/src/cartesian.js","./math.js":"../node_modules/d3-geo/src/math.js","./stream.js":"../node_modules/d3-geo/src/stream.js"}],"../node_modules/d3-geo/src/centroid.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _math = require("./math.js");

var _noop = _interopRequireDefault(require("./noop.js"));

var _stream = _interopRequireDefault(require("./stream.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var W0, W1, X0, Y0, Z0, X1, Y1, Z1, X2, Y2, Z2, lambda00, phi00, // first point
x0, y0, z0; // previous point

var centroidStream = {
  sphere: _noop.default,
  point: centroidPoint,
  lineStart: centroidLineStart,
  lineEnd: centroidLineEnd,
  polygonStart: function () {
    centroidStream.lineStart = centroidRingStart;
    centroidStream.lineEnd = centroidRingEnd;
  },
  polygonEnd: function () {
    centroidStream.lineStart = centroidLineStart;
    centroidStream.lineEnd = centroidLineEnd;
  }
}; // Arithmetic mean of Cartesian vectors.

function centroidPoint(lambda, phi) {
  lambda *= _math.radians, phi *= _math.radians;
  var cosPhi = (0, _math.cos)(phi);
  centroidPointCartesian(cosPhi * (0, _math.cos)(lambda), cosPhi * (0, _math.sin)(lambda), (0, _math.sin)(phi));
}

function centroidPointCartesian(x, y, z) {
  ++W0;
  X0 += (x - X0) / W0;
  Y0 += (y - Y0) / W0;
  Z0 += (z - Z0) / W0;
}

function centroidLineStart() {
  centroidStream.point = centroidLinePointFirst;
}

function centroidLinePointFirst(lambda, phi) {
  lambda *= _math.radians, phi *= _math.radians;
  var cosPhi = (0, _math.cos)(phi);
  x0 = cosPhi * (0, _math.cos)(lambda);
  y0 = cosPhi * (0, _math.sin)(lambda);
  z0 = (0, _math.sin)(phi);
  centroidStream.point = centroidLinePoint;
  centroidPointCartesian(x0, y0, z0);
}

function centroidLinePoint(lambda, phi) {
  lambda *= _math.radians, phi *= _math.radians;
  var cosPhi = (0, _math.cos)(phi),
      x = cosPhi * (0, _math.cos)(lambda),
      y = cosPhi * (0, _math.sin)(lambda),
      z = (0, _math.sin)(phi),
      w = (0, _math.atan2)((0, _math.sqrt)((w = y0 * z - z0 * y) * w + (w = z0 * x - x0 * z) * w + (w = x0 * y - y0 * x) * w), x0 * x + y0 * y + z0 * z);
  W1 += w;
  X1 += w * (x0 + (x0 = x));
  Y1 += w * (y0 + (y0 = y));
  Z1 += w * (z0 + (z0 = z));
  centroidPointCartesian(x0, y0, z0);
}

function centroidLineEnd() {
  centroidStream.point = centroidPoint;
} // See J. E. Brock, The Inertia Tensor for a Spherical Triangle,
// J. Applied Mechanics 42, 239 (1975).


function centroidRingStart() {
  centroidStream.point = centroidRingPointFirst;
}

function centroidRingEnd() {
  centroidRingPoint(lambda00, phi00);
  centroidStream.point = centroidPoint;
}

function centroidRingPointFirst(lambda, phi) {
  lambda00 = lambda, phi00 = phi;
  lambda *= _math.radians, phi *= _math.radians;
  centroidStream.point = centroidRingPoint;
  var cosPhi = (0, _math.cos)(phi);
  x0 = cosPhi * (0, _math.cos)(lambda);
  y0 = cosPhi * (0, _math.sin)(lambda);
  z0 = (0, _math.sin)(phi);
  centroidPointCartesian(x0, y0, z0);
}

function centroidRingPoint(lambda, phi) {
  lambda *= _math.radians, phi *= _math.radians;
  var cosPhi = (0, _math.cos)(phi),
      x = cosPhi * (0, _math.cos)(lambda),
      y = cosPhi * (0, _math.sin)(lambda),
      z = (0, _math.sin)(phi),
      cx = y0 * z - z0 * y,
      cy = z0 * x - x0 * z,
      cz = x0 * y - y0 * x,
      m = (0, _math.sqrt)(cx * cx + cy * cy + cz * cz),
      w = (0, _math.asin)(m),
      // line weight = angle
  v = m && -w / m; // area weight multiplier

  X2 += v * cx;
  Y2 += v * cy;
  Z2 += v * cz;
  W1 += w;
  X1 += w * (x0 + (x0 = x));
  Y1 += w * (y0 + (y0 = y));
  Z1 += w * (z0 + (z0 = z));
  centroidPointCartesian(x0, y0, z0);
}

function _default(object) {
  W0 = W1 = X0 = Y0 = Z0 = X1 = Y1 = Z1 = X2 = Y2 = Z2 = 0;
  (0, _stream.default)(object, centroidStream);
  var x = X2,
      y = Y2,
      z = Z2,
      m = x * x + y * y + z * z; // If the area-weighted ccentroid is undefined, fall back to length-weighted ccentroid.

  if (m < _math.epsilon2) {
    x = X1, y = Y1, z = Z1; // If the feature has zero length, fall back to arithmetic mean of point vectors.

    if (W1 < _math.epsilon) x = X0, y = Y0, z = Z0;
    m = x * x + y * y + z * z; // If the feature still has an undefined ccentroid, then return.

    if (m < _math.epsilon2) return [NaN, NaN];
  }

  return [(0, _math.atan2)(y, x) * _math.degrees, (0, _math.asin)(z / (0, _math.sqrt)(m)) * _math.degrees];
}
},{"./math.js":"../node_modules/d3-geo/src/math.js","./noop.js":"../node_modules/d3-geo/src/noop.js","./stream.js":"../node_modules/d3-geo/src/stream.js"}],"../node_modules/d3-geo/src/constant.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(x) {
  return function () {
    return x;
  };
}
},{}],"../node_modules/d3-geo/src/compose.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(a, b) {
  function compose(x, y) {
    return x = a(x, y), b(x[0], x[1]);
  }

  if (a.invert && b.invert) compose.invert = function (x, y) {
    return x = b.invert(x, y), x && a.invert(x[0], x[1]);
  };
  return compose;
}
},{}],"../node_modules/d3-geo/src/rotation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rotateRadians = rotateRadians;
exports.default = _default;

var _compose = _interopRequireDefault(require("./compose.js"));

var _math = require("./math.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function rotationIdentity(lambda, phi) {
  return [(0, _math.abs)(lambda) > _math.pi ? lambda + Math.round(-lambda / _math.tau) * _math.tau : lambda, phi];
}

rotationIdentity.invert = rotationIdentity;

function rotateRadians(deltaLambda, deltaPhi, deltaGamma) {
  return (deltaLambda %= _math.tau) ? deltaPhi || deltaGamma ? (0, _compose.default)(rotationLambda(deltaLambda), rotationPhiGamma(deltaPhi, deltaGamma)) : rotationLambda(deltaLambda) : deltaPhi || deltaGamma ? rotationPhiGamma(deltaPhi, deltaGamma) : rotationIdentity;
}

function forwardRotationLambda(deltaLambda) {
  return function (lambda, phi) {
    return lambda += deltaLambda, [lambda > _math.pi ? lambda - _math.tau : lambda < -_math.pi ? lambda + _math.tau : lambda, phi];
  };
}

function rotationLambda(deltaLambda) {
  var rotation = forwardRotationLambda(deltaLambda);
  rotation.invert = forwardRotationLambda(-deltaLambda);
  return rotation;
}

function rotationPhiGamma(deltaPhi, deltaGamma) {
  var cosDeltaPhi = (0, _math.cos)(deltaPhi),
      sinDeltaPhi = (0, _math.sin)(deltaPhi),
      cosDeltaGamma = (0, _math.cos)(deltaGamma),
      sinDeltaGamma = (0, _math.sin)(deltaGamma);

  function rotation(lambda, phi) {
    var cosPhi = (0, _math.cos)(phi),
        x = (0, _math.cos)(lambda) * cosPhi,
        y = (0, _math.sin)(lambda) * cosPhi,
        z = (0, _math.sin)(phi),
        k = z * cosDeltaPhi + x * sinDeltaPhi;
    return [(0, _math.atan2)(y * cosDeltaGamma - k * sinDeltaGamma, x * cosDeltaPhi - z * sinDeltaPhi), (0, _math.asin)(k * cosDeltaGamma + y * sinDeltaGamma)];
  }

  rotation.invert = function (lambda, phi) {
    var cosPhi = (0, _math.cos)(phi),
        x = (0, _math.cos)(lambda) * cosPhi,
        y = (0, _math.sin)(lambda) * cosPhi,
        z = (0, _math.sin)(phi),
        k = z * cosDeltaGamma - y * sinDeltaGamma;
    return [(0, _math.atan2)(y * cosDeltaGamma + z * sinDeltaGamma, x * cosDeltaPhi + k * sinDeltaPhi), (0, _math.asin)(k * cosDeltaPhi - x * sinDeltaPhi)];
  };

  return rotation;
}

function _default(rotate) {
  rotate = rotateRadians(rotate[0] * _math.radians, rotate[1] * _math.radians, rotate.length > 2 ? rotate[2] * _math.radians : 0);

  function forward(coordinates) {
    coordinates = rotate(coordinates[0] * _math.radians, coordinates[1] * _math.radians);
    return coordinates[0] *= _math.degrees, coordinates[1] *= _math.degrees, coordinates;
  }

  forward.invert = function (coordinates) {
    coordinates = rotate.invert(coordinates[0] * _math.radians, coordinates[1] * _math.radians);
    return coordinates[0] *= _math.degrees, coordinates[1] *= _math.degrees, coordinates;
  };

  return forward;
}
},{"./compose.js":"../node_modules/d3-geo/src/compose.js","./math.js":"../node_modules/d3-geo/src/math.js"}],"../node_modules/d3-geo/src/circle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.circleStream = circleStream;
exports.default = _default;

var _cartesian = require("./cartesian.js");

var _constant = _interopRequireDefault(require("./constant.js"));

var _math = require("./math.js");

var _rotation = require("./rotation.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Generates a circle centered at [0°, 0°], with a given radius and precision.
function circleStream(stream, radius, delta, direction, t0, t1) {
  if (!delta) return;
  var cosRadius = (0, _math.cos)(radius),
      sinRadius = (0, _math.sin)(radius),
      step = direction * delta;

  if (t0 == null) {
    t0 = radius + direction * _math.tau;
    t1 = radius - step / 2;
  } else {
    t0 = circleRadius(cosRadius, t0);
    t1 = circleRadius(cosRadius, t1);
    if (direction > 0 ? t0 < t1 : t0 > t1) t0 += direction * _math.tau;
  }

  for (var point, t = t0; direction > 0 ? t > t1 : t < t1; t -= step) {
    point = (0, _cartesian.spherical)([cosRadius, -sinRadius * (0, _math.cos)(t), -sinRadius * (0, _math.sin)(t)]);
    stream.point(point[0], point[1]);
  }
} // Returns the signed angle of a cartesian point relative to [cosRadius, 0, 0].


function circleRadius(cosRadius, point) {
  point = (0, _cartesian.cartesian)(point), point[0] -= cosRadius;
  (0, _cartesian.cartesianNormalizeInPlace)(point);
  var radius = (0, _math.acos)(-point[1]);
  return ((-point[2] < 0 ? -radius : radius) + _math.tau - _math.epsilon) % _math.tau;
}

function _default() {
  var center = (0, _constant.default)([0, 0]),
      radius = (0, _constant.default)(90),
      precision = (0, _constant.default)(6),
      ring,
      rotate,
      stream = {
    point: point
  };

  function point(x, y) {
    ring.push(x = rotate(x, y));
    x[0] *= _math.degrees, x[1] *= _math.degrees;
  }

  function circle() {
    var c = center.apply(this, arguments),
        r = radius.apply(this, arguments) * _math.radians,
        p = precision.apply(this, arguments) * _math.radians;

    ring = [];
    rotate = (0, _rotation.rotateRadians)(-c[0] * _math.radians, -c[1] * _math.radians, 0).invert;
    circleStream(stream, r, p, 1);
    c = {
      type: "Polygon",
      coordinates: [ring]
    };
    ring = rotate = null;
    return c;
  }

  circle.center = function (_) {
    return arguments.length ? (center = typeof _ === "function" ? _ : (0, _constant.default)([+_[0], +_[1]]), circle) : center;
  };

  circle.radius = function (_) {
    return arguments.length ? (radius = typeof _ === "function" ? _ : (0, _constant.default)(+_), circle) : radius;
  };

  circle.precision = function (_) {
    return arguments.length ? (precision = typeof _ === "function" ? _ : (0, _constant.default)(+_), circle) : precision;
  };

  return circle;
}
},{"./cartesian.js":"../node_modules/d3-geo/src/cartesian.js","./constant.js":"../node_modules/d3-geo/src/constant.js","./math.js":"../node_modules/d3-geo/src/math.js","./rotation.js":"../node_modules/d3-geo/src/rotation.js"}],"../node_modules/d3-geo/src/clip/buffer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _noop = _interopRequireDefault(require("../noop.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  var lines = [],
      line;
  return {
    point: function (x, y) {
      line.push([x, y]);
    },
    lineStart: function () {
      lines.push(line = []);
    },
    lineEnd: _noop.default,
    rejoin: function () {
      if (lines.length > 1) lines.push(lines.pop().concat(lines.shift()));
    },
    result: function () {
      var result = lines;
      lines = [];
      line = null;
      return result;
    }
  };
}
},{"../noop.js":"../node_modules/d3-geo/src/noop.js"}],"../node_modules/d3-geo/src/pointEqual.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _math = require("./math.js");

function _default(a, b) {
  return (0, _math.abs)(a[0] - b[0]) < _math.epsilon && (0, _math.abs)(a[1] - b[1]) < _math.epsilon;
}
},{"./math.js":"../node_modules/d3-geo/src/math.js"}],"../node_modules/d3-geo/src/clip/rejoin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _pointEqual = _interopRequireDefault(require("../pointEqual.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Intersection(point, points, other, entry) {
  this.x = point;
  this.z = points;
  this.o = other; // another intersection

  this.e = entry; // is an entry?

  this.v = false; // visited

  this.n = this.p = null; // next & previous
} // A generalized polygon clipping algorithm: given a polygon that has been cut
// into its visible line segments, and rejoins the segments by interpolating
// along the clip edge.


function _default(segments, compareIntersection, startInside, interpolate, stream) {
  var subject = [],
      clip = [],
      i,
      n;
  segments.forEach(function (segment) {
    if ((n = segment.length - 1) <= 0) return;
    var n,
        p0 = segment[0],
        p1 = segment[n],
        x; // If the first and last points of a segment are coincident, then treat as a
    // closed ring. TODO if all rings are closed, then the winding order of the
    // exterior ring should be checked.

    if ((0, _pointEqual.default)(p0, p1)) {
      stream.lineStart();

      for (i = 0; i < n; ++i) stream.point((p0 = segment[i])[0], p0[1]);

      stream.lineEnd();
      return;
    }

    subject.push(x = new Intersection(p0, segment, null, true));
    clip.push(x.o = new Intersection(p0, null, x, false));
    subject.push(x = new Intersection(p1, segment, null, false));
    clip.push(x.o = new Intersection(p1, null, x, true));
  });
  if (!subject.length) return;
  clip.sort(compareIntersection);
  link(subject);
  link(clip);

  for (i = 0, n = clip.length; i < n; ++i) {
    clip[i].e = startInside = !startInside;
  }

  var start = subject[0],
      points,
      point;

  while (1) {
    // Find first unvisited intersection.
    var current = start,
        isSubject = true;

    while (current.v) if ((current = current.n) === start) return;

    points = current.z;
    stream.lineStart();

    do {
      current.v = current.o.v = true;

      if (current.e) {
        if (isSubject) {
          for (i = 0, n = points.length; i < n; ++i) stream.point((point = points[i])[0], point[1]);
        } else {
          interpolate(current.x, current.n.x, 1, stream);
        }

        current = current.n;
      } else {
        if (isSubject) {
          points = current.p.z;

          for (i = points.length - 1; i >= 0; --i) stream.point((point = points[i])[0], point[1]);
        } else {
          interpolate(current.x, current.p.x, -1, stream);
        }

        current = current.p;
      }

      current = current.o;
      points = current.z;
      isSubject = !isSubject;
    } while (!current.v);

    stream.lineEnd();
  }
}

function link(array) {
  if (!(n = array.length)) return;
  var n,
      i = 0,
      a = array[0],
      b;

  while (++i < n) {
    a.n = b = array[i];
    b.p = a;
    a = b;
  }

  a.n = b = array[0];
  b.p = a;
}
},{"../pointEqual.js":"../node_modules/d3-geo/src/pointEqual.js"}],"../node_modules/d3-geo/src/polygonContains.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _adder = _interopRequireDefault(require("./adder.js"));

var _cartesian = require("./cartesian.js");

var _math = require("./math.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sum = (0, _adder.default)();

function longitude(point) {
  if ((0, _math.abs)(point[0]) <= _math.pi) return point[0];else return (0, _math.sign)(point[0]) * (((0, _math.abs)(point[0]) + _math.pi) % _math.tau - _math.pi);
}

function _default(polygon, point) {
  var lambda = longitude(point),
      phi = point[1],
      sinPhi = (0, _math.sin)(phi),
      normal = [(0, _math.sin)(lambda), -(0, _math.cos)(lambda), 0],
      angle = 0,
      winding = 0;
  sum.reset();
  if (sinPhi === 1) phi = _math.halfPi + _math.epsilon;else if (sinPhi === -1) phi = -_math.halfPi - _math.epsilon;

  for (var i = 0, n = polygon.length; i < n; ++i) {
    if (!(m = (ring = polygon[i]).length)) continue;
    var ring,
        m,
        point0 = ring[m - 1],
        lambda0 = longitude(point0),
        phi0 = point0[1] / 2 + _math.quarterPi,
        sinPhi0 = (0, _math.sin)(phi0),
        cosPhi0 = (0, _math.cos)(phi0);

    for (var j = 0; j < m; ++j, lambda0 = lambda1, sinPhi0 = sinPhi1, cosPhi0 = cosPhi1, point0 = point1) {
      var point1 = ring[j],
          lambda1 = longitude(point1),
          phi1 = point1[1] / 2 + _math.quarterPi,
          sinPhi1 = (0, _math.sin)(phi1),
          cosPhi1 = (0, _math.cos)(phi1),
          delta = lambda1 - lambda0,
          sign = delta >= 0 ? 1 : -1,
          absDelta = sign * delta,
          antimeridian = absDelta > _math.pi,
          k = sinPhi0 * sinPhi1;
      sum.add((0, _math.atan2)(k * sign * (0, _math.sin)(absDelta), cosPhi0 * cosPhi1 + k * (0, _math.cos)(absDelta)));
      angle += antimeridian ? delta + sign * _math.tau : delta; // Are the longitudes either side of the point’s meridian (lambda),
      // and are the latitudes smaller than the parallel (phi)?

      if (antimeridian ^ lambda0 >= lambda ^ lambda1 >= lambda) {
        var arc = (0, _cartesian.cartesianCross)((0, _cartesian.cartesian)(point0), (0, _cartesian.cartesian)(point1));
        (0, _cartesian.cartesianNormalizeInPlace)(arc);
        var intersection = (0, _cartesian.cartesianCross)(normal, arc);
        (0, _cartesian.cartesianNormalizeInPlace)(intersection);
        var phiArc = (antimeridian ^ delta >= 0 ? -1 : 1) * (0, _math.asin)(intersection[2]);

        if (phi > phiArc || phi === phiArc && (arc[0] || arc[1])) {
          winding += antimeridian ^ delta >= 0 ? 1 : -1;
        }
      }
    }
  } // First, determine whether the South pole is inside or outside:
  //
  // It is inside if:
  // * the polygon winds around it in a clockwise direction.
  // * the polygon does not (cumulatively) wind around it, but has a negative
  //   (counter-clockwise) area.
  //
  // Second, count the (signed) number of times a segment crosses a lambda
  // from the point to the South pole.  If it is zero, then the point is the
  // same side as the South pole.


  return (angle < -_math.epsilon || angle < _math.epsilon && sum < -_math.epsilon) ^ winding & 1;
}
},{"./adder.js":"../node_modules/d3-geo/src/adder.js","./cartesian.js":"../node_modules/d3-geo/src/cartesian.js","./math.js":"../node_modules/d3-geo/src/math.js"}],"../node_modules/d3-array/src/ascending.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}
},{}],"../node_modules/d3-array/src/bisector.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _ascending = _interopRequireDefault(require("./ascending"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(compare) {
  if (compare.length === 1) compare = ascendingComparator(compare);
  return {
    left: function (a, x, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;

      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (compare(a[mid], x) < 0) lo = mid + 1;else hi = mid;
      }

      return lo;
    },
    right: function (a, x, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;

      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (compare(a[mid], x) > 0) hi = mid;else lo = mid + 1;
      }

      return lo;
    }
  };
}

function ascendingComparator(f) {
  return function (d, x) {
    return (0, _ascending.default)(f(d), x);
  };
}
},{"./ascending":"../node_modules/d3-array/src/ascending.js"}],"../node_modules/d3-array/src/bisect.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.bisectLeft = exports.bisectRight = void 0;

var _ascending = _interopRequireDefault(require("./ascending"));

var _bisector = _interopRequireDefault(require("./bisector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ascendingBisect = (0, _bisector.default)(_ascending.default);
var bisectRight = ascendingBisect.right;
exports.bisectRight = bisectRight;
var bisectLeft = ascendingBisect.left;
exports.bisectLeft = bisectLeft;
var _default = bisectRight;
exports.default = _default;
},{"./ascending":"../node_modules/d3-array/src/ascending.js","./bisector":"../node_modules/d3-array/src/bisector.js"}],"../node_modules/d3-array/src/pairs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.pair = pair;

function _default(array, f) {
  if (f == null) f = pair;
  var i = 0,
      n = array.length - 1,
      p = array[0],
      pairs = new Array(n < 0 ? 0 : n);

  while (i < n) pairs[i] = f(p, p = array[++i]);

  return pairs;
}

function pair(a, b) {
  return [a, b];
}
},{}],"../node_modules/d3-array/src/cross.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _pairs = require("./pairs");

function _default(values0, values1, reduce) {
  var n0 = values0.length,
      n1 = values1.length,
      values = new Array(n0 * n1),
      i0,
      i1,
      i,
      value0;
  if (reduce == null) reduce = _pairs.pair;

  for (i0 = i = 0; i0 < n0; ++i0) {
    for (value0 = values0[i0], i1 = 0; i1 < n1; ++i1, ++i) {
      values[i] = reduce(value0, values1[i1]);
    }
  }

  return values;
}
},{"./pairs":"../node_modules/d3-array/src/pairs.js"}],"../node_modules/d3-array/src/descending.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(a, b) {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
}
},{}],"../node_modules/d3-array/src/number.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(x) {
  return x === null ? NaN : +x;
}
},{}],"../node_modules/d3-array/src/variance.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _number = _interopRequireDefault(require("./number"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(values, valueof) {
  var n = values.length,
      m = 0,
      i = -1,
      mean = 0,
      value,
      delta,
      sum = 0;

  if (valueof == null) {
    while (++i < n) {
      if (!isNaN(value = (0, _number.default)(values[i]))) {
        delta = value - mean;
        mean += delta / ++m;
        sum += delta * (value - mean);
      }
    }
  } else {
    while (++i < n) {
      if (!isNaN(value = (0, _number.default)(valueof(values[i], i, values)))) {
        delta = value - mean;
        mean += delta / ++m;
        sum += delta * (value - mean);
      }
    }
  }

  if (m > 1) return sum / (m - 1);
}
},{"./number":"../node_modules/d3-array/src/number.js"}],"../node_modules/d3-array/src/deviation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _variance = _interopRequireDefault(require("./variance"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(array, f) {
  var v = (0, _variance.default)(array, f);
  return v ? Math.sqrt(v) : v;
}
},{"./variance":"../node_modules/d3-array/src/variance.js"}],"../node_modules/d3-array/src/extent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(values, valueof) {
  var n = values.length,
      i = -1,
      value,
      min,
      max;

  if (valueof == null) {
    while (++i < n) {
      // Find the first comparable value.
      if ((value = values[i]) != null && value >= value) {
        min = max = value;

        while (++i < n) {
          // Compare the remaining values.
          if ((value = values[i]) != null) {
            if (min > value) min = value;
            if (max < value) max = value;
          }
        }
      }
    }
  } else {
    while (++i < n) {
      // Find the first comparable value.
      if ((value = valueof(values[i], i, values)) != null && value >= value) {
        min = max = value;

        while (++i < n) {
          // Compare the remaining values.
          if ((value = valueof(values[i], i, values)) != null) {
            if (min > value) min = value;
            if (max < value) max = value;
          }
        }
      }
    }
  }

  return [min, max];
}
},{}],"../node_modules/d3-array/src/array.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.map = exports.slice = void 0;
var array = Array.prototype;
var slice = array.slice;
exports.slice = slice;
var map = array.map;
exports.map = map;
},{}],"../node_modules/d3-array/src/constant.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(x) {
  return function () {
    return x;
  };
}
},{}],"../node_modules/d3-array/src/identity.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(x) {
  return x;
}
},{}],"../node_modules/d3-array/src/range.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(start, stop, step) {
  start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;
  var i = -1,
      n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
      range = new Array(n);

  while (++i < n) {
    range[i] = start + i * step;
  }

  return range;
}
},{}],"../node_modules/d3-array/src/ticks.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.tickIncrement = tickIncrement;
exports.tickStep = tickStep;
var e10 = Math.sqrt(50),
    e5 = Math.sqrt(10),
    e2 = Math.sqrt(2);

function _default(start, stop, count) {
  var reverse,
      i = -1,
      n,
      ticks,
      step;
  stop = +stop, start = +start, count = +count;
  if (start === stop && count > 0) return [start];
  if (reverse = stop < start) n = start, start = stop, stop = n;
  if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step)) return [];

  if (step > 0) {
    start = Math.ceil(start / step);
    stop = Math.floor(stop / step);
    ticks = new Array(n = Math.ceil(stop - start + 1));

    while (++i < n) ticks[i] = (start + i) * step;
  } else {
    start = Math.floor(start * step);
    stop = Math.ceil(stop * step);
    ticks = new Array(n = Math.ceil(start - stop + 1));

    while (++i < n) ticks[i] = (start - i) / step;
  }

  if (reverse) ticks.reverse();
  return ticks;
}

function tickIncrement(start, stop, count) {
  var step = (stop - start) / Math.max(0, count),
      power = Math.floor(Math.log(step) / Math.LN10),
      error = step / Math.pow(10, power);
  return power >= 0 ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power) : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
}

function tickStep(start, stop, count) {
  var step0 = Math.abs(stop - start) / Math.max(0, count),
      step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
      error = step0 / step1;
  if (error >= e10) step1 *= 10;else if (error >= e5) step1 *= 5;else if (error >= e2) step1 *= 2;
  return stop < start ? -step1 : step1;
}
},{}],"../node_modules/d3-array/src/threshold/sturges.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(values) {
  return Math.ceil(Math.log(values.length) / Math.LN2) + 1;
}
},{}],"../node_modules/d3-array/src/histogram.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _array = require("./array");

var _bisect = _interopRequireDefault(require("./bisect"));

var _constant = _interopRequireDefault(require("./constant"));

var _extent = _interopRequireDefault(require("./extent"));

var _identity = _interopRequireDefault(require("./identity"));

var _range = _interopRequireDefault(require("./range"));

var _ticks = require("./ticks");

var _sturges = _interopRequireDefault(require("./threshold/sturges"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  var value = _identity.default,
      domain = _extent.default,
      threshold = _sturges.default;

  function histogram(data) {
    var i,
        n = data.length,
        x,
        values = new Array(n);

    for (i = 0; i < n; ++i) {
      values[i] = value(data[i], i, data);
    }

    var xz = domain(values),
        x0 = xz[0],
        x1 = xz[1],
        tz = threshold(values, x0, x1); // Convert number of thresholds into uniform thresholds.

    if (!Array.isArray(tz)) {
      tz = (0, _ticks.tickStep)(x0, x1, tz);
      tz = (0, _range.default)(Math.ceil(x0 / tz) * tz, x1, tz); // exclusive
    } // Remove any thresholds outside the domain.


    var m = tz.length;

    while (tz[0] <= x0) tz.shift(), --m;

    while (tz[m - 1] > x1) tz.pop(), --m;

    var bins = new Array(m + 1),
        bin; // Initialize bins.

    for (i = 0; i <= m; ++i) {
      bin = bins[i] = [];
      bin.x0 = i > 0 ? tz[i - 1] : x0;
      bin.x1 = i < m ? tz[i] : x1;
    } // Assign data to bins by value, ignoring any outside the domain.


    for (i = 0; i < n; ++i) {
      x = values[i];

      if (x0 <= x && x <= x1) {
        bins[(0, _bisect.default)(tz, x, 0, m)].push(data[i]);
      }
    }

    return bins;
  }

  histogram.value = function (_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : (0, _constant.default)(_), histogram) : value;
  };

  histogram.domain = function (_) {
    return arguments.length ? (domain = typeof _ === "function" ? _ : (0, _constant.default)([_[0], _[1]]), histogram) : domain;
  };

  histogram.thresholds = function (_) {
    return arguments.length ? (threshold = typeof _ === "function" ? _ : Array.isArray(_) ? (0, _constant.default)(_array.slice.call(_)) : (0, _constant.default)(_), histogram) : threshold;
  };

  return histogram;
}
},{"./array":"../node_modules/d3-array/src/array.js","./bisect":"../node_modules/d3-array/src/bisect.js","./constant":"../node_modules/d3-array/src/constant.js","./extent":"../node_modules/d3-array/src/extent.js","./identity":"../node_modules/d3-array/src/identity.js","./range":"../node_modules/d3-array/src/range.js","./ticks":"../node_modules/d3-array/src/ticks.js","./threshold/sturges":"../node_modules/d3-array/src/threshold/sturges.js"}],"../node_modules/d3-array/src/quantile.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _number = _interopRequireDefault(require("./number"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(values, p, valueof) {
  if (valueof == null) valueof = _number.default;
  if (!(n = values.length)) return;
  if ((p = +p) <= 0 || n < 2) return +valueof(values[0], 0, values);
  if (p >= 1) return +valueof(values[n - 1], n - 1, values);
  var n,
      i = (n - 1) * p,
      i0 = Math.floor(i),
      value0 = +valueof(values[i0], i0, values),
      value1 = +valueof(values[i0 + 1], i0 + 1, values);
  return value0 + (value1 - value0) * (i - i0);
}
},{"./number":"../node_modules/d3-array/src/number.js"}],"../node_modules/d3-array/src/threshold/freedmanDiaconis.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _array = require("../array");

var _ascending = _interopRequireDefault(require("../ascending"));

var _number = _interopRequireDefault(require("../number"));

var _quantile = _interopRequireDefault(require("../quantile"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(values, min, max) {
  values = _array.map.call(values, _number.default).sort(_ascending.default);
  return Math.ceil((max - min) / (2 * ((0, _quantile.default)(values, 0.75) - (0, _quantile.default)(values, 0.25)) * Math.pow(values.length, -1 / 3)));
}
},{"../array":"../node_modules/d3-array/src/array.js","../ascending":"../node_modules/d3-array/src/ascending.js","../number":"../node_modules/d3-array/src/number.js","../quantile":"../node_modules/d3-array/src/quantile.js"}],"../node_modules/d3-array/src/threshold/scott.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _deviation = _interopRequireDefault(require("../deviation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(values, min, max) {
  return Math.ceil((max - min) / (3.5 * (0, _deviation.default)(values) * Math.pow(values.length, -1 / 3)));
}
},{"../deviation":"../node_modules/d3-array/src/deviation.js"}],"../node_modules/d3-array/src/max.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(values, valueof) {
  var n = values.length,
      i = -1,
      value,
      max;

  if (valueof == null) {
    while (++i < n) {
      // Find the first comparable value.
      if ((value = values[i]) != null && value >= value) {
        max = value;

        while (++i < n) {
          // Compare the remaining values.
          if ((value = values[i]) != null && value > max) {
            max = value;
          }
        }
      }
    }
  } else {
    while (++i < n) {
      // Find the first comparable value.
      if ((value = valueof(values[i], i, values)) != null && value >= value) {
        max = value;

        while (++i < n) {
          // Compare the remaining values.
          if ((value = valueof(values[i], i, values)) != null && value > max) {
            max = value;
          }
        }
      }
    }
  }

  return max;
}
},{}],"../node_modules/d3-array/src/mean.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _number = _interopRequireDefault(require("./number"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(values, valueof) {
  var n = values.length,
      m = n,
      i = -1,
      value,
      sum = 0;

  if (valueof == null) {
    while (++i < n) {
      if (!isNaN(value = (0, _number.default)(values[i]))) sum += value;else --m;
    }
  } else {
    while (++i < n) {
      if (!isNaN(value = (0, _number.default)(valueof(values[i], i, values)))) sum += value;else --m;
    }
  }

  if (m) return sum / m;
}
},{"./number":"../node_modules/d3-array/src/number.js"}],"../node_modules/d3-array/src/median.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _ascending = _interopRequireDefault(require("./ascending"));

var _number = _interopRequireDefault(require("./number"));

var _quantile = _interopRequireDefault(require("./quantile"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(values, valueof) {
  var n = values.length,
      i = -1,
      value,
      numbers = [];

  if (valueof == null) {
    while (++i < n) {
      if (!isNaN(value = (0, _number.default)(values[i]))) {
        numbers.push(value);
      }
    }
  } else {
    while (++i < n) {
      if (!isNaN(value = (0, _number.default)(valueof(values[i], i, values)))) {
        numbers.push(value);
      }
    }
  }

  return (0, _quantile.default)(numbers.sort(_ascending.default), 0.5);
}
},{"./ascending":"../node_modules/d3-array/src/ascending.js","./number":"../node_modules/d3-array/src/number.js","./quantile":"../node_modules/d3-array/src/quantile.js"}],"../node_modules/d3-array/src/merge.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(arrays) {
  var n = arrays.length,
      m,
      i = -1,
      j = 0,
      merged,
      array;

  while (++i < n) j += arrays[i].length;

  merged = new Array(j);

  while (--n >= 0) {
    array = arrays[n];
    m = array.length;

    while (--m >= 0) {
      merged[--j] = array[m];
    }
  }

  return merged;
}
},{}],"../node_modules/d3-array/src/min.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(values, valueof) {
  var n = values.length,
      i = -1,
      value,
      min;

  if (valueof == null) {
    while (++i < n) {
      // Find the first comparable value.
      if ((value = values[i]) != null && value >= value) {
        min = value;

        while (++i < n) {
          // Compare the remaining values.
          if ((value = values[i]) != null && min > value) {
            min = value;
          }
        }
      }
    }
  } else {
    while (++i < n) {
      // Find the first comparable value.
      if ((value = valueof(values[i], i, values)) != null && value >= value) {
        min = value;

        while (++i < n) {
          // Compare the remaining values.
          if ((value = valueof(values[i], i, values)) != null && min > value) {
            min = value;
          }
        }
      }
    }
  }

  return min;
}
},{}],"../node_modules/d3-array/src/permute.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(array, indexes) {
  var i = indexes.length,
      permutes = new Array(i);

  while (i--) permutes[i] = array[indexes[i]];

  return permutes;
}
},{}],"../node_modules/d3-array/src/scan.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _ascending = _interopRequireDefault(require("./ascending"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(values, compare) {
  if (!(n = values.length)) return;
  var n,
      i = 0,
      j = 0,
      xi,
      xj = values[j];
  if (compare == null) compare = _ascending.default;

  while (++i < n) {
    if (compare(xi = values[i], xj) < 0 || compare(xj, xj) !== 0) {
      xj = xi, j = i;
    }
  }

  if (compare(xj, xj) === 0) return j;
}
},{"./ascending":"../node_modules/d3-array/src/ascending.js"}],"../node_modules/d3-array/src/shuffle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(array, i0, i1) {
  var m = (i1 == null ? array.length : i1) - (i0 = i0 == null ? 0 : +i0),
      t,
      i;

  while (m) {
    i = Math.random() * m-- | 0;
    t = array[m + i0];
    array[m + i0] = array[i + i0];
    array[i + i0] = t;
  }

  return array;
}
},{}],"../node_modules/d3-array/src/sum.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(values, valueof) {
  var n = values.length,
      i = -1,
      value,
      sum = 0;

  if (valueof == null) {
    while (++i < n) {
      if (value = +values[i]) sum += value; // Note: zero and null are equivalent.
    }
  } else {
    while (++i < n) {
      if (value = +valueof(values[i], i, values)) sum += value;
    }
  }

  return sum;
}
},{}],"../node_modules/d3-array/src/transpose.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _min = _interopRequireDefault(require("./min"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(matrix) {
  if (!(n = matrix.length)) return [];

  for (var i = -1, m = (0, _min.default)(matrix, length), transpose = new Array(m); ++i < m;) {
    for (var j = -1, n, row = transpose[i] = new Array(n); ++j < n;) {
      row[j] = matrix[j][i];
    }
  }

  return transpose;
}

function length(d) {
  return d.length;
}
},{"./min":"../node_modules/d3-array/src/min.js"}],"../node_modules/d3-array/src/zip.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _transpose = _interopRequireDefault(require("./transpose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  return (0, _transpose.default)(arguments);
}
},{"./transpose":"../node_modules/d3-array/src/transpose.js"}],"../node_modules/d3-array/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "bisect", {
  enumerable: true,
  get: function () {
    return _bisect.default;
  }
});
Object.defineProperty(exports, "bisectRight", {
  enumerable: true,
  get: function () {
    return _bisect.bisectRight;
  }
});
Object.defineProperty(exports, "bisectLeft", {
  enumerable: true,
  get: function () {
    return _bisect.bisectLeft;
  }
});
Object.defineProperty(exports, "ascending", {
  enumerable: true,
  get: function () {
    return _ascending.default;
  }
});
Object.defineProperty(exports, "bisector", {
  enumerable: true,
  get: function () {
    return _bisector.default;
  }
});
Object.defineProperty(exports, "cross", {
  enumerable: true,
  get: function () {
    return _cross.default;
  }
});
Object.defineProperty(exports, "descending", {
  enumerable: true,
  get: function () {
    return _descending.default;
  }
});
Object.defineProperty(exports, "deviation", {
  enumerable: true,
  get: function () {
    return _deviation.default;
  }
});
Object.defineProperty(exports, "extent", {
  enumerable: true,
  get: function () {
    return _extent.default;
  }
});
Object.defineProperty(exports, "histogram", {
  enumerable: true,
  get: function () {
    return _histogram.default;
  }
});
Object.defineProperty(exports, "thresholdFreedmanDiaconis", {
  enumerable: true,
  get: function () {
    return _freedmanDiaconis.default;
  }
});
Object.defineProperty(exports, "thresholdScott", {
  enumerable: true,
  get: function () {
    return _scott.default;
  }
});
Object.defineProperty(exports, "thresholdSturges", {
  enumerable: true,
  get: function () {
    return _sturges.default;
  }
});
Object.defineProperty(exports, "max", {
  enumerable: true,
  get: function () {
    return _max.default;
  }
});
Object.defineProperty(exports, "mean", {
  enumerable: true,
  get: function () {
    return _mean.default;
  }
});
Object.defineProperty(exports, "median", {
  enumerable: true,
  get: function () {
    return _median.default;
  }
});
Object.defineProperty(exports, "merge", {
  enumerable: true,
  get: function () {
    return _merge.default;
  }
});
Object.defineProperty(exports, "min", {
  enumerable: true,
  get: function () {
    return _min.default;
  }
});
Object.defineProperty(exports, "pairs", {
  enumerable: true,
  get: function () {
    return _pairs.default;
  }
});
Object.defineProperty(exports, "permute", {
  enumerable: true,
  get: function () {
    return _permute.default;
  }
});
Object.defineProperty(exports, "quantile", {
  enumerable: true,
  get: function () {
    return _quantile.default;
  }
});
Object.defineProperty(exports, "range", {
  enumerable: true,
  get: function () {
    return _range.default;
  }
});
Object.defineProperty(exports, "scan", {
  enumerable: true,
  get: function () {
    return _scan.default;
  }
});
Object.defineProperty(exports, "shuffle", {
  enumerable: true,
  get: function () {
    return _shuffle.default;
  }
});
Object.defineProperty(exports, "sum", {
  enumerable: true,
  get: function () {
    return _sum.default;
  }
});
Object.defineProperty(exports, "ticks", {
  enumerable: true,
  get: function () {
    return _ticks.default;
  }
});
Object.defineProperty(exports, "tickIncrement", {
  enumerable: true,
  get: function () {
    return _ticks.tickIncrement;
  }
});
Object.defineProperty(exports, "tickStep", {
  enumerable: true,
  get: function () {
    return _ticks.tickStep;
  }
});
Object.defineProperty(exports, "transpose", {
  enumerable: true,
  get: function () {
    return _transpose.default;
  }
});
Object.defineProperty(exports, "variance", {
  enumerable: true,
  get: function () {
    return _variance.default;
  }
});
Object.defineProperty(exports, "zip", {
  enumerable: true,
  get: function () {
    return _zip.default;
  }
});

var _bisect = _interopRequireWildcard(require("./bisect"));

var _ascending = _interopRequireDefault(require("./ascending"));

var _bisector = _interopRequireDefault(require("./bisector"));

var _cross = _interopRequireDefault(require("./cross"));

var _descending = _interopRequireDefault(require("./descending"));

var _deviation = _interopRequireDefault(require("./deviation"));

var _extent = _interopRequireDefault(require("./extent"));

var _histogram = _interopRequireDefault(require("./histogram"));

var _freedmanDiaconis = _interopRequireDefault(require("./threshold/freedmanDiaconis"));

var _scott = _interopRequireDefault(require("./threshold/scott"));

var _sturges = _interopRequireDefault(require("./threshold/sturges"));

var _max = _interopRequireDefault(require("./max"));

var _mean = _interopRequireDefault(require("./mean"));

var _median = _interopRequireDefault(require("./median"));

var _merge = _interopRequireDefault(require("./merge"));

var _min = _interopRequireDefault(require("./min"));

var _pairs = _interopRequireDefault(require("./pairs"));

var _permute = _interopRequireDefault(require("./permute"));

var _quantile = _interopRequireDefault(require("./quantile"));

var _range = _interopRequireDefault(require("./range"));

var _scan = _interopRequireDefault(require("./scan"));

var _shuffle = _interopRequireDefault(require("./shuffle"));

var _sum = _interopRequireDefault(require("./sum"));

var _ticks = _interopRequireWildcard(require("./ticks"));

var _transpose = _interopRequireDefault(require("./transpose"));

var _variance = _interopRequireDefault(require("./variance"));

var _zip = _interopRequireDefault(require("./zip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
},{"./bisect":"../node_modules/d3-array/src/bisect.js","./ascending":"../node_modules/d3-array/src/ascending.js","./bisector":"../node_modules/d3-array/src/bisector.js","./cross":"../node_modules/d3-array/src/cross.js","./descending":"../node_modules/d3-array/src/descending.js","./deviation":"../node_modules/d3-array/src/deviation.js","./extent":"../node_modules/d3-array/src/extent.js","./histogram":"../node_modules/d3-array/src/histogram.js","./threshold/freedmanDiaconis":"../node_modules/d3-array/src/threshold/freedmanDiaconis.js","./threshold/scott":"../node_modules/d3-array/src/threshold/scott.js","./threshold/sturges":"../node_modules/d3-array/src/threshold/sturges.js","./max":"../node_modules/d3-array/src/max.js","./mean":"../node_modules/d3-array/src/mean.js","./median":"../node_modules/d3-array/src/median.js","./merge":"../node_modules/d3-array/src/merge.js","./min":"../node_modules/d3-array/src/min.js","./pairs":"../node_modules/d3-array/src/pairs.js","./permute":"../node_modules/d3-array/src/permute.js","./quantile":"../node_modules/d3-array/src/quantile.js","./range":"../node_modules/d3-array/src/range.js","./scan":"../node_modules/d3-array/src/scan.js","./shuffle":"../node_modules/d3-array/src/shuffle.js","./sum":"../node_modules/d3-array/src/sum.js","./ticks":"../node_modules/d3-array/src/ticks.js","./transpose":"../node_modules/d3-array/src/transpose.js","./variance":"../node_modules/d3-array/src/variance.js","./zip":"../node_modules/d3-array/src/zip.js"}],"../node_modules/d3-geo/src/clip/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _buffer = _interopRequireDefault(require("./buffer.js"));

var _rejoin = _interopRequireDefault(require("./rejoin.js"));

var _math = require("../math.js");

var _polygonContains = _interopRequireDefault(require("../polygonContains.js"));

var _d3Array = require("d3-array");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(pointVisible, clipLine, interpolate, start) {
  return function (sink) {
    var line = clipLine(sink),
        ringBuffer = (0, _buffer.default)(),
        ringSink = clipLine(ringBuffer),
        polygonStarted = false,
        polygon,
        segments,
        ring;
    var clip = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: function () {
        clip.point = pointRing;
        clip.lineStart = ringStart;
        clip.lineEnd = ringEnd;
        segments = [];
        polygon = [];
      },
      polygonEnd: function () {
        clip.point = point;
        clip.lineStart = lineStart;
        clip.lineEnd = lineEnd;
        segments = (0, _d3Array.merge)(segments);
        var startInside = (0, _polygonContains.default)(polygon, start);

        if (segments.length) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          (0, _rejoin.default)(segments, compareIntersection, startInside, interpolate, sink);
        } else if (startInside) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          sink.lineStart();
          interpolate(null, null, 1, sink);
          sink.lineEnd();
        }

        if (polygonStarted) sink.polygonEnd(), polygonStarted = false;
        segments = polygon = null;
      },
      sphere: function () {
        sink.polygonStart();
        sink.lineStart();
        interpolate(null, null, 1, sink);
        sink.lineEnd();
        sink.polygonEnd();
      }
    };

    function point(lambda, phi) {
      if (pointVisible(lambda, phi)) sink.point(lambda, phi);
    }

    function pointLine(lambda, phi) {
      line.point(lambda, phi);
    }

    function lineStart() {
      clip.point = pointLine;
      line.lineStart();
    }

    function lineEnd() {
      clip.point = point;
      line.lineEnd();
    }

    function pointRing(lambda, phi) {
      ring.push([lambda, phi]);
      ringSink.point(lambda, phi);
    }

    function ringStart() {
      ringSink.lineStart();
      ring = [];
    }

    function ringEnd() {
      pointRing(ring[0][0], ring[0][1]);
      ringSink.lineEnd();
      var clean = ringSink.clean(),
          ringSegments = ringBuffer.result(),
          i,
          n = ringSegments.length,
          m,
          segment,
          point;
      ring.pop();
      polygon.push(ring);
      ring = null;
      if (!n) return; // No intersections.

      if (clean & 1) {
        segment = ringSegments[0];

        if ((m = segment.length - 1) > 0) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          sink.lineStart();

          for (i = 0; i < m; ++i) sink.point((point = segment[i])[0], point[1]);

          sink.lineEnd();
        }

        return;
      } // Rejoin connected segments.
      // TODO reuse ringBuffer.rejoin()?


      if (n > 1 && clean & 2) ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));
      segments.push(ringSegments.filter(validSegment));
    }

    return clip;
  };
}

function validSegment(segment) {
  return segment.length > 1;
} // Intersections are sorted along the clip edge. For both antimeridian cutting
// and circle clipping, the same comparison is used.


function compareIntersection(a, b) {
  return ((a = a.x)[0] < 0 ? a[1] - _math.halfPi - _math.epsilon : _math.halfPi - a[1]) - ((b = b.x)[0] < 0 ? b[1] - _math.halfPi - _math.epsilon : _math.halfPi - b[1]);
}
},{"./buffer.js":"../node_modules/d3-geo/src/clip/buffer.js","./rejoin.js":"../node_modules/d3-geo/src/clip/rejoin.js","../math.js":"../node_modules/d3-geo/src/math.js","../polygonContains.js":"../node_modules/d3-geo/src/polygonContains.js","d3-array":"../node_modules/d3-array/src/index.js"}],"../node_modules/d3-geo/src/clip/antimeridian.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("./index.js"));

var _math = require("../math.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _index.default)(function () {
  return true;
}, clipAntimeridianLine, clipAntimeridianInterpolate, [-_math.pi, -_math.halfPi]); // Takes a line and cuts into visible segments. Return values: 0 - there were
// intersections or the line was empty; 1 - no intersections; 2 - there were
// intersections, and the first and last segments should be rejoined.


exports.default = _default;

function clipAntimeridianLine(stream) {
  var lambda0 = NaN,
      phi0 = NaN,
      sign0 = NaN,
      clean; // no intersections

  return {
    lineStart: function () {
      stream.lineStart();
      clean = 1;
    },
    point: function (lambda1, phi1) {
      var sign1 = lambda1 > 0 ? _math.pi : -_math.pi,
          delta = (0, _math.abs)(lambda1 - lambda0);

      if ((0, _math.abs)(delta - _math.pi) < _math.epsilon) {
        // line crosses a pole
        stream.point(lambda0, phi0 = (phi0 + phi1) / 2 > 0 ? _math.halfPi : -_math.halfPi);
        stream.point(sign0, phi0);
        stream.lineEnd();
        stream.lineStart();
        stream.point(sign1, phi0);
        stream.point(lambda1, phi0);
        clean = 0;
      } else if (sign0 !== sign1 && delta >= _math.pi) {
        // line crosses antimeridian
        if ((0, _math.abs)(lambda0 - sign0) < _math.epsilon) lambda0 -= sign0 * _math.epsilon; // handle degeneracies

        if ((0, _math.abs)(lambda1 - sign1) < _math.epsilon) lambda1 -= sign1 * _math.epsilon;
        phi0 = clipAntimeridianIntersect(lambda0, phi0, lambda1, phi1);
        stream.point(sign0, phi0);
        stream.lineEnd();
        stream.lineStart();
        stream.point(sign1, phi0);
        clean = 0;
      }

      stream.point(lambda0 = lambda1, phi0 = phi1);
      sign0 = sign1;
    },
    lineEnd: function () {
      stream.lineEnd();
      lambda0 = phi0 = NaN;
    },
    clean: function () {
      return 2 - clean; // if intersections, rejoin first and last segments
    }
  };
}

function clipAntimeridianIntersect(lambda0, phi0, lambda1, phi1) {
  var cosPhi0,
      cosPhi1,
      sinLambda0Lambda1 = (0, _math.sin)(lambda0 - lambda1);
  return (0, _math.abs)(sinLambda0Lambda1) > _math.epsilon ? (0, _math.atan)(((0, _math.sin)(phi0) * (cosPhi1 = (0, _math.cos)(phi1)) * (0, _math.sin)(lambda1) - (0, _math.sin)(phi1) * (cosPhi0 = (0, _math.cos)(phi0)) * (0, _math.sin)(lambda0)) / (cosPhi0 * cosPhi1 * sinLambda0Lambda1)) : (phi0 + phi1) / 2;
}

function clipAntimeridianInterpolate(from, to, direction, stream) {
  var phi;

  if (from == null) {
    phi = direction * _math.halfPi;
    stream.point(-_math.pi, phi);
    stream.point(0, phi);
    stream.point(_math.pi, phi);
    stream.point(_math.pi, 0);
    stream.point(_math.pi, -phi);
    stream.point(0, -phi);
    stream.point(-_math.pi, -phi);
    stream.point(-_math.pi, 0);
    stream.point(-_math.pi, phi);
  } else if ((0, _math.abs)(from[0] - to[0]) > _math.epsilon) {
    var lambda = from[0] < to[0] ? _math.pi : -_math.pi;
    phi = direction * lambda / 2;
    stream.point(-lambda, phi);
    stream.point(0, phi);
    stream.point(lambda, phi);
  } else {
    stream.point(to[0], to[1]);
  }
}
},{"./index.js":"../node_modules/d3-geo/src/clip/index.js","../math.js":"../node_modules/d3-geo/src/math.js"}],"../node_modules/d3-geo/src/clip/circle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _cartesian = require("../cartesian.js");

var _circle = require("../circle.js");

var _math = require("../math.js");

var _pointEqual = _interopRequireDefault(require("../pointEqual.js"));

var _index = _interopRequireDefault(require("./index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(radius) {
  var cr = (0, _math.cos)(radius),
      delta = 6 * _math.radians,
      smallRadius = cr > 0,
      notHemisphere = (0, _math.abs)(cr) > _math.epsilon; // TODO optimise for this common case


  function interpolate(from, to, direction, stream) {
    (0, _circle.circleStream)(stream, radius, delta, direction, from, to);
  }

  function visible(lambda, phi) {
    return (0, _math.cos)(lambda) * (0, _math.cos)(phi) > cr;
  } // Takes a line and cuts into visible segments. Return values used for polygon
  // clipping: 0 - there were intersections or the line was empty; 1 - no
  // intersections 2 - there were intersections, and the first and last segments
  // should be rejoined.


  function clipLine(stream) {
    var point0, // previous point
    c0, // code for previous point
    v0, // visibility of previous point
    v00, // visibility of first point
    clean; // no intersections

    return {
      lineStart: function () {
        v00 = v0 = false;
        clean = 1;
      },
      point: function (lambda, phi) {
        var point1 = [lambda, phi],
            point2,
            v = visible(lambda, phi),
            c = smallRadius ? v ? 0 : code(lambda, phi) : v ? code(lambda + (lambda < 0 ? _math.pi : -_math.pi), phi) : 0;
        if (!point0 && (v00 = v0 = v)) stream.lineStart(); // Handle degeneracies.
        // TODO ignore if not clipping polygons.

        if (v !== v0) {
          point2 = intersect(point0, point1);

          if (!point2 || (0, _pointEqual.default)(point0, point2) || (0, _pointEqual.default)(point1, point2)) {
            point1[0] += _math.epsilon;
            point1[1] += _math.epsilon;
            v = visible(point1[0], point1[1]);
          }
        }

        if (v !== v0) {
          clean = 0;

          if (v) {
            // outside going in
            stream.lineStart();
            point2 = intersect(point1, point0);
            stream.point(point2[0], point2[1]);
          } else {
            // inside going out
            point2 = intersect(point0, point1);
            stream.point(point2[0], point2[1]);
            stream.lineEnd();
          }

          point0 = point2;
        } else if (notHemisphere && point0 && smallRadius ^ v) {
          var t; // If the codes for two points are different, or are both zero,
          // and there this segment intersects with the small circle.

          if (!(c & c0) && (t = intersect(point1, point0, true))) {
            clean = 0;

            if (smallRadius) {
              stream.lineStart();
              stream.point(t[0][0], t[0][1]);
              stream.point(t[1][0], t[1][1]);
              stream.lineEnd();
            } else {
              stream.point(t[1][0], t[1][1]);
              stream.lineEnd();
              stream.lineStart();
              stream.point(t[0][0], t[0][1]);
            }
          }
        }

        if (v && (!point0 || !(0, _pointEqual.default)(point0, point1))) {
          stream.point(point1[0], point1[1]);
        }

        point0 = point1, v0 = v, c0 = c;
      },
      lineEnd: function () {
        if (v0) stream.lineEnd();
        point0 = null;
      },
      // Rejoin first and last segments if there were intersections and the first
      // and last points were visible.
      clean: function () {
        return clean | (v00 && v0) << 1;
      }
    };
  } // Intersects the great circle between a and b with the clip circle.


  function intersect(a, b, two) {
    var pa = (0, _cartesian.cartesian)(a),
        pb = (0, _cartesian.cartesian)(b); // We have two planes, n1.p = d1 and n2.p = d2.
    // Find intersection line p(t) = c1 n1 + c2 n2 + t (n1 ⨯ n2).

    var n1 = [1, 0, 0],
        // normal
    n2 = (0, _cartesian.cartesianCross)(pa, pb),
        n2n2 = (0, _cartesian.cartesianDot)(n2, n2),
        n1n2 = n2[0],
        // cartesianDot(n1, n2),
    determinant = n2n2 - n1n2 * n1n2; // Two polar points.

    if (!determinant) return !two && a;
    var c1 = cr * n2n2 / determinant,
        c2 = -cr * n1n2 / determinant,
        n1xn2 = (0, _cartesian.cartesianCross)(n1, n2),
        A = (0, _cartesian.cartesianScale)(n1, c1),
        B = (0, _cartesian.cartesianScale)(n2, c2);
    (0, _cartesian.cartesianAddInPlace)(A, B); // Solve |p(t)|^2 = 1.

    var u = n1xn2,
        w = (0, _cartesian.cartesianDot)(A, u),
        uu = (0, _cartesian.cartesianDot)(u, u),
        t2 = w * w - uu * ((0, _cartesian.cartesianDot)(A, A) - 1);
    if (t2 < 0) return;
    var t = (0, _math.sqrt)(t2),
        q = (0, _cartesian.cartesianScale)(u, (-w - t) / uu);
    (0, _cartesian.cartesianAddInPlace)(q, A);
    q = (0, _cartesian.spherical)(q);
    if (!two) return q; // Two intersection points.

    var lambda0 = a[0],
        lambda1 = b[0],
        phi0 = a[1],
        phi1 = b[1],
        z;
    if (lambda1 < lambda0) z = lambda0, lambda0 = lambda1, lambda1 = z;

    var delta = lambda1 - lambda0,
        polar = (0, _math.abs)(delta - _math.pi) < _math.epsilon,
        meridian = polar || delta < _math.epsilon;

    if (!polar && phi1 < phi0) z = phi0, phi0 = phi1, phi1 = z; // Check that the first point is between a and b.

    if (meridian ? polar ? phi0 + phi1 > 0 ^ q[1] < ((0, _math.abs)(q[0] - lambda0) < _math.epsilon ? phi0 : phi1) : phi0 <= q[1] && q[1] <= phi1 : delta > _math.pi ^ (lambda0 <= q[0] && q[0] <= lambda1)) {
      var q1 = (0, _cartesian.cartesianScale)(u, (-w + t) / uu);
      (0, _cartesian.cartesianAddInPlace)(q1, A);
      return [q, (0, _cartesian.spherical)(q1)];
    }
  } // Generates a 4-bit vector representing the location of a point relative to
  // the small circle's bounding box.


  function code(lambda, phi) {
    var r = smallRadius ? radius : _math.pi - radius,
        code = 0;
    if (lambda < -r) code |= 1; // left
    else if (lambda > r) code |= 2; // right

    if (phi < -r) code |= 4; // below
    else if (phi > r) code |= 8; // above

    return code;
  }

  return (0, _index.default)(visible, clipLine, interpolate, smallRadius ? [0, -radius] : [-_math.pi, radius - _math.pi]);
}
},{"../cartesian.js":"../node_modules/d3-geo/src/cartesian.js","../circle.js":"../node_modules/d3-geo/src/circle.js","../math.js":"../node_modules/d3-geo/src/math.js","../pointEqual.js":"../node_modules/d3-geo/src/pointEqual.js","./index.js":"../node_modules/d3-geo/src/clip/index.js"}],"../node_modules/d3-geo/src/clip/line.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(a, b, x0, y0, x1, y1) {
  var ax = a[0],
      ay = a[1],
      bx = b[0],
      by = b[1],
      t0 = 0,
      t1 = 1,
      dx = bx - ax,
      dy = by - ay,
      r;
  r = x0 - ax;
  if (!dx && r > 0) return;
  r /= dx;

  if (dx < 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  } else if (dx > 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  }

  r = x1 - ax;
  if (!dx && r < 0) return;
  r /= dx;

  if (dx < 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  } else if (dx > 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  }

  r = y0 - ay;
  if (!dy && r > 0) return;
  r /= dy;

  if (dy < 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  } else if (dy > 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  }

  r = y1 - ay;
  if (!dy && r < 0) return;
  r /= dy;

  if (dy < 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  } else if (dy > 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  }

  if (t0 > 0) a[0] = ax + t0 * dx, a[1] = ay + t0 * dy;
  if (t1 < 1) b[0] = ax + t1 * dx, b[1] = ay + t1 * dy;
  return true;
}
},{}],"../node_modules/d3-geo/src/clip/rectangle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = clipRectangle;

var _math = require("../math.js");

var _buffer = _interopRequireDefault(require("./buffer.js"));

var _line = _interopRequireDefault(require("./line.js"));

var _rejoin = _interopRequireDefault(require("./rejoin.js"));

var _d3Array = require("d3-array");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var clipMax = 1e9,
    clipMin = -clipMax; // TODO Use d3-polygon’s polygonContains here for the ring check?
// TODO Eliminate duplicate buffering in clipBuffer and polygon.push?

function clipRectangle(x0, y0, x1, y1) {
  function visible(x, y) {
    return x0 <= x && x <= x1 && y0 <= y && y <= y1;
  }

  function interpolate(from, to, direction, stream) {
    var a = 0,
        a1 = 0;

    if (from == null || (a = corner(from, direction)) !== (a1 = corner(to, direction)) || comparePoint(from, to) < 0 ^ direction > 0) {
      do stream.point(a === 0 || a === 3 ? x0 : x1, a > 1 ? y1 : y0); while ((a = (a + direction + 4) % 4) !== a1);
    } else {
      stream.point(to[0], to[1]);
    }
  }

  function corner(p, direction) {
    return (0, _math.abs)(p[0] - x0) < _math.epsilon ? direction > 0 ? 0 : 3 : (0, _math.abs)(p[0] - x1) < _math.epsilon ? direction > 0 ? 2 : 1 : (0, _math.abs)(p[1] - y0) < _math.epsilon ? direction > 0 ? 1 : 0 : direction > 0 ? 3 : 2; // abs(p[1] - y1) < epsilon
  }

  function compareIntersection(a, b) {
    return comparePoint(a.x, b.x);
  }

  function comparePoint(a, b) {
    var ca = corner(a, 1),
        cb = corner(b, 1);
    return ca !== cb ? ca - cb : ca === 0 ? b[1] - a[1] : ca === 1 ? a[0] - b[0] : ca === 2 ? a[1] - b[1] : b[0] - a[0];
  }

  return function (stream) {
    var activeStream = stream,
        bufferStream = (0, _buffer.default)(),
        segments,
        polygon,
        ring,
        x__,
        y__,
        v__,
        // first point
    x_,
        y_,
        v_,
        // previous point
    first,
        clean;
    var clipStream = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: polygonStart,
      polygonEnd: polygonEnd
    };

    function point(x, y) {
      if (visible(x, y)) activeStream.point(x, y);
    }

    function polygonInside() {
      var winding = 0;

      for (var i = 0, n = polygon.length; i < n; ++i) {
        for (var ring = polygon[i], j = 1, m = ring.length, point = ring[0], a0, a1, b0 = point[0], b1 = point[1]; j < m; ++j) {
          a0 = b0, a1 = b1, point = ring[j], b0 = point[0], b1 = point[1];

          if (a1 <= y1) {
            if (b1 > y1 && (b0 - a0) * (y1 - a1) > (b1 - a1) * (x0 - a0)) ++winding;
          } else {
            if (b1 <= y1 && (b0 - a0) * (y1 - a1) < (b1 - a1) * (x0 - a0)) --winding;
          }
        }
      }

      return winding;
    } // Buffer geometry within a polygon and then clip it en masse.


    function polygonStart() {
      activeStream = bufferStream, segments = [], polygon = [], clean = true;
    }

    function polygonEnd() {
      var startInside = polygonInside(),
          cleanInside = clean && startInside,
          visible = (segments = (0, _d3Array.merge)(segments)).length;

      if (cleanInside || visible) {
        stream.polygonStart();

        if (cleanInside) {
          stream.lineStart();
          interpolate(null, null, 1, stream);
          stream.lineEnd();
        }

        if (visible) {
          (0, _rejoin.default)(segments, compareIntersection, startInside, interpolate, stream);
        }

        stream.polygonEnd();
      }

      activeStream = stream, segments = polygon = ring = null;
    }

    function lineStart() {
      clipStream.point = linePoint;
      if (polygon) polygon.push(ring = []);
      first = true;
      v_ = false;
      x_ = y_ = NaN;
    } // TODO rather than special-case polygons, simply handle them separately.
    // Ideally, coincident intersection points should be jittered to avoid
    // clipping issues.


    function lineEnd() {
      if (segments) {
        linePoint(x__, y__);
        if (v__ && v_) bufferStream.rejoin();
        segments.push(bufferStream.result());
      }

      clipStream.point = point;
      if (v_) activeStream.lineEnd();
    }

    function linePoint(x, y) {
      var v = visible(x, y);
      if (polygon) ring.push([x, y]);

      if (first) {
        x__ = x, y__ = y, v__ = v;
        first = false;

        if (v) {
          activeStream.lineStart();
          activeStream.point(x, y);
        }
      } else {
        if (v && v_) activeStream.point(x, y);else {
          var a = [x_ = Math.max(clipMin, Math.min(clipMax, x_)), y_ = Math.max(clipMin, Math.min(clipMax, y_))],
              b = [x = Math.max(clipMin, Math.min(clipMax, x)), y = Math.max(clipMin, Math.min(clipMax, y))];

          if ((0, _line.default)(a, b, x0, y0, x1, y1)) {
            if (!v_) {
              activeStream.lineStart();
              activeStream.point(a[0], a[1]);
            }

            activeStream.point(b[0], b[1]);
            if (!v) activeStream.lineEnd();
            clean = false;
          } else if (v) {
            activeStream.lineStart();
            activeStream.point(x, y);
            clean = false;
          }
        }
      }

      x_ = x, y_ = y, v_ = v;
    }

    return clipStream;
  };
}
},{"../math.js":"../node_modules/d3-geo/src/math.js","./buffer.js":"../node_modules/d3-geo/src/clip/buffer.js","./line.js":"../node_modules/d3-geo/src/clip/line.js","./rejoin.js":"../node_modules/d3-geo/src/clip/rejoin.js","d3-array":"../node_modules/d3-array/src/index.js"}],"../node_modules/d3-geo/src/clip/extent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _rectangle = _interopRequireDefault(require("./rectangle.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  var x0 = 0,
      y0 = 0,
      x1 = 960,
      y1 = 500,
      cache,
      cacheStream,
      clip;
  return clip = {
    stream: function (stream) {
      return cache && cacheStream === stream ? cache : cache = (0, _rectangle.default)(x0, y0, x1, y1)(cacheStream = stream);
    },
    extent: function (_) {
      return arguments.length ? (x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1], cache = cacheStream = null, clip) : [[x0, y0], [x1, y1]];
    }
  };
}
},{"./rectangle.js":"../node_modules/d3-geo/src/clip/rectangle.js"}],"../node_modules/d3-geo/src/length.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _adder = _interopRequireDefault(require("./adder.js"));

var _math = require("./math.js");

var _noop = _interopRequireDefault(require("./noop.js"));

var _stream = _interopRequireDefault(require("./stream.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lengthSum = (0, _adder.default)(),
    lambda0,
    sinPhi0,
    cosPhi0;
var lengthStream = {
  sphere: _noop.default,
  point: _noop.default,
  lineStart: lengthLineStart,
  lineEnd: _noop.default,
  polygonStart: _noop.default,
  polygonEnd: _noop.default
};

function lengthLineStart() {
  lengthStream.point = lengthPointFirst;
  lengthStream.lineEnd = lengthLineEnd;
}

function lengthLineEnd() {
  lengthStream.point = lengthStream.lineEnd = _noop.default;
}

function lengthPointFirst(lambda, phi) {
  lambda *= _math.radians, phi *= _math.radians;
  lambda0 = lambda, sinPhi0 = (0, _math.sin)(phi), cosPhi0 = (0, _math.cos)(phi);
  lengthStream.point = lengthPoint;
}

function lengthPoint(lambda, phi) {
  lambda *= _math.radians, phi *= _math.radians;
  var sinPhi = (0, _math.sin)(phi),
      cosPhi = (0, _math.cos)(phi),
      delta = (0, _math.abs)(lambda - lambda0),
      cosDelta = (0, _math.cos)(delta),
      sinDelta = (0, _math.sin)(delta),
      x = cosPhi * sinDelta,
      y = cosPhi0 * sinPhi - sinPhi0 * cosPhi * cosDelta,
      z = sinPhi0 * sinPhi + cosPhi0 * cosPhi * cosDelta;
  lengthSum.add((0, _math.atan2)((0, _math.sqrt)(x * x + y * y), z));
  lambda0 = lambda, sinPhi0 = sinPhi, cosPhi0 = cosPhi;
}

function _default(object) {
  lengthSum.reset();
  (0, _stream.default)(object, lengthStream);
  return +lengthSum;
}
},{"./adder.js":"../node_modules/d3-geo/src/adder.js","./math.js":"../node_modules/d3-geo/src/math.js","./noop.js":"../node_modules/d3-geo/src/noop.js","./stream.js":"../node_modules/d3-geo/src/stream.js"}],"../node_modules/d3-geo/src/distance.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _length = _interopRequireDefault(require("./length.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var coordinates = [null, null],
    object = {
  type: "LineString",
  coordinates: coordinates
};

function _default(a, b) {
  coordinates[0] = a;
  coordinates[1] = b;
  return (0, _length.default)(object);
}
},{"./length.js":"../node_modules/d3-geo/src/length.js"}],"../node_modules/d3-geo/src/contains.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _polygonContains = _interopRequireDefault(require("./polygonContains.js"));

var _distance = _interopRequireDefault(require("./distance.js"));

var _math = require("./math.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var containsObjectType = {
  Feature: function (object, point) {
    return containsGeometry(object.geometry, point);
  },
  FeatureCollection: function (object, point) {
    var features = object.features,
        i = -1,
        n = features.length;

    while (++i < n) if (containsGeometry(features[i].geometry, point)) return true;

    return false;
  }
};
var containsGeometryType = {
  Sphere: function () {
    return true;
  },
  Point: function (object, point) {
    return containsPoint(object.coordinates, point);
  },
  MultiPoint: function (object, point) {
    var coordinates = object.coordinates,
        i = -1,
        n = coordinates.length;

    while (++i < n) if (containsPoint(coordinates[i], point)) return true;

    return false;
  },
  LineString: function (object, point) {
    return containsLine(object.coordinates, point);
  },
  MultiLineString: function (object, point) {
    var coordinates = object.coordinates,
        i = -1,
        n = coordinates.length;

    while (++i < n) if (containsLine(coordinates[i], point)) return true;

    return false;
  },
  Polygon: function (object, point) {
    return containsPolygon(object.coordinates, point);
  },
  MultiPolygon: function (object, point) {
    var coordinates = object.coordinates,
        i = -1,
        n = coordinates.length;

    while (++i < n) if (containsPolygon(coordinates[i], point)) return true;

    return false;
  },
  GeometryCollection: function (object, point) {
    var geometries = object.geometries,
        i = -1,
        n = geometries.length;

    while (++i < n) if (containsGeometry(geometries[i], point)) return true;

    return false;
  }
};

function containsGeometry(geometry, point) {
  return geometry && containsGeometryType.hasOwnProperty(geometry.type) ? containsGeometryType[geometry.type](geometry, point) : false;
}

function containsPoint(coordinates, point) {
  return (0, _distance.default)(coordinates, point) === 0;
}

function containsLine(coordinates, point) {
  var ao, bo, ab;

  for (var i = 0, n = coordinates.length; i < n; i++) {
    bo = (0, _distance.default)(coordinates[i], point);
    if (bo === 0) return true;

    if (i > 0) {
      ab = (0, _distance.default)(coordinates[i], coordinates[i - 1]);
      if (ab > 0 && ao <= ab && bo <= ab && (ao + bo - ab) * (1 - Math.pow((ao - bo) / ab, 2)) < _math.epsilon2 * ab) return true;
    }

    ao = bo;
  }

  return false;
}

function containsPolygon(coordinates, point) {
  return !!(0, _polygonContains.default)(coordinates.map(ringRadians), pointRadians(point));
}

function ringRadians(ring) {
  return ring = ring.map(pointRadians), ring.pop(), ring;
}

function pointRadians(point) {
  return [point[0] * _math.radians, point[1] * _math.radians];
}

function _default(object, point) {
  return (object && containsObjectType.hasOwnProperty(object.type) ? containsObjectType[object.type] : containsGeometry)(object, point);
}
},{"./polygonContains.js":"../node_modules/d3-geo/src/polygonContains.js","./distance.js":"../node_modules/d3-geo/src/distance.js","./math.js":"../node_modules/d3-geo/src/math.js"}],"../node_modules/d3-geo/src/graticule.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = graticule;
exports.graticule10 = graticule10;

var _d3Array = require("d3-array");

var _math = require("./math.js");

function graticuleX(y0, y1, dy) {
  var y = (0, _d3Array.range)(y0, y1 - _math.epsilon, dy).concat(y1);
  return function (x) {
    return y.map(function (y) {
      return [x, y];
    });
  };
}

function graticuleY(x0, x1, dx) {
  var x = (0, _d3Array.range)(x0, x1 - _math.epsilon, dx).concat(x1);
  return function (y) {
    return x.map(function (x) {
      return [x, y];
    });
  };
}

function graticule() {
  var x1,
      x0,
      X1,
      X0,
      y1,
      y0,
      Y1,
      Y0,
      dx = 10,
      dy = dx,
      DX = 90,
      DY = 360,
      x,
      y,
      X,
      Y,
      precision = 2.5;

  function graticule() {
    return {
      type: "MultiLineString",
      coordinates: lines()
    };
  }

  function lines() {
    return (0, _d3Array.range)((0, _math.ceil)(X0 / DX) * DX, X1, DX).map(X).concat((0, _d3Array.range)((0, _math.ceil)(Y0 / DY) * DY, Y1, DY).map(Y)).concat((0, _d3Array.range)((0, _math.ceil)(x0 / dx) * dx, x1, dx).filter(function (x) {
      return (0, _math.abs)(x % DX) > _math.epsilon;
    }).map(x)).concat((0, _d3Array.range)((0, _math.ceil)(y0 / dy) * dy, y1, dy).filter(function (y) {
      return (0, _math.abs)(y % DY) > _math.epsilon;
    }).map(y));
  }

  graticule.lines = function () {
    return lines().map(function (coordinates) {
      return {
        type: "LineString",
        coordinates: coordinates
      };
    });
  };

  graticule.outline = function () {
    return {
      type: "Polygon",
      coordinates: [X(X0).concat(Y(Y1).slice(1), X(X1).reverse().slice(1), Y(Y0).reverse().slice(1))]
    };
  };

  graticule.extent = function (_) {
    if (!arguments.length) return graticule.extentMinor();
    return graticule.extentMajor(_).extentMinor(_);
  };

  graticule.extentMajor = function (_) {
    if (!arguments.length) return [[X0, Y0], [X1, Y1]];
    X0 = +_[0][0], X1 = +_[1][0];
    Y0 = +_[0][1], Y1 = +_[1][1];
    if (X0 > X1) _ = X0, X0 = X1, X1 = _;
    if (Y0 > Y1) _ = Y0, Y0 = Y1, Y1 = _;
    return graticule.precision(precision);
  };

  graticule.extentMinor = function (_) {
    if (!arguments.length) return [[x0, y0], [x1, y1]];
    x0 = +_[0][0], x1 = +_[1][0];
    y0 = +_[0][1], y1 = +_[1][1];
    if (x0 > x1) _ = x0, x0 = x1, x1 = _;
    if (y0 > y1) _ = y0, y0 = y1, y1 = _;
    return graticule.precision(precision);
  };

  graticule.step = function (_) {
    if (!arguments.length) return graticule.stepMinor();
    return graticule.stepMajor(_).stepMinor(_);
  };

  graticule.stepMajor = function (_) {
    if (!arguments.length) return [DX, DY];
    DX = +_[0], DY = +_[1];
    return graticule;
  };

  graticule.stepMinor = function (_) {
    if (!arguments.length) return [dx, dy];
    dx = +_[0], dy = +_[1];
    return graticule;
  };

  graticule.precision = function (_) {
    if (!arguments.length) return precision;
    precision = +_;
    x = graticuleX(y0, y1, 90);
    y = graticuleY(x0, x1, precision);
    X = graticuleX(Y0, Y1, 90);
    Y = graticuleY(X0, X1, precision);
    return graticule;
  };

  return graticule.extentMajor([[-180, -90 + _math.epsilon], [180, 90 - _math.epsilon]]).extentMinor([[-180, -80 - _math.epsilon], [180, 80 + _math.epsilon]]);
}

function graticule10() {
  return graticule()();
}
},{"d3-array":"../node_modules/d3-array/src/index.js","./math.js":"../node_modules/d3-geo/src/math.js"}],"../node_modules/d3-geo/src/interpolate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _math = require("./math.js");

function _default(a, b) {
  var x0 = a[0] * _math.radians,
      y0 = a[1] * _math.radians,
      x1 = b[0] * _math.radians,
      y1 = b[1] * _math.radians,
      cy0 = (0, _math.cos)(y0),
      sy0 = (0, _math.sin)(y0),
      cy1 = (0, _math.cos)(y1),
      sy1 = (0, _math.sin)(y1),
      kx0 = cy0 * (0, _math.cos)(x0),
      ky0 = cy0 * (0, _math.sin)(x0),
      kx1 = cy1 * (0, _math.cos)(x1),
      ky1 = cy1 * (0, _math.sin)(x1),
      d = 2 * (0, _math.asin)((0, _math.sqrt)((0, _math.haversin)(y1 - y0) + cy0 * cy1 * (0, _math.haversin)(x1 - x0))),
      k = (0, _math.sin)(d);
  var interpolate = d ? function (t) {
    var B = (0, _math.sin)(t *= d) / k,
        A = (0, _math.sin)(d - t) / k,
        x = A * kx0 + B * kx1,
        y = A * ky0 + B * ky1,
        z = A * sy0 + B * sy1;
    return [(0, _math.atan2)(y, x) * _math.degrees, (0, _math.atan2)(z, (0, _math.sqrt)(x * x + y * y)) * _math.degrees];
  } : function () {
    return [x0 * _math.degrees, y0 * _math.degrees];
  };
  interpolate.distance = d;
  return interpolate;
}
},{"./math.js":"../node_modules/d3-geo/src/math.js"}],"../node_modules/d3-geo/src/identity.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(x) {
  return x;
}
},{}],"../node_modules/d3-geo/src/path/area.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _adder = _interopRequireDefault(require("../adder.js"));

var _math = require("../math.js");

var _noop = _interopRequireDefault(require("../noop.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var areaSum = (0, _adder.default)(),
    areaRingSum = (0, _adder.default)(),
    x00,
    y00,
    x0,
    y0;
var areaStream = {
  point: _noop.default,
  lineStart: _noop.default,
  lineEnd: _noop.default,
  polygonStart: function () {
    areaStream.lineStart = areaRingStart;
    areaStream.lineEnd = areaRingEnd;
  },
  polygonEnd: function () {
    areaStream.lineStart = areaStream.lineEnd = areaStream.point = _noop.default;
    areaSum.add((0, _math.abs)(areaRingSum));
    areaRingSum.reset();
  },
  result: function () {
    var area = areaSum / 2;
    areaSum.reset();
    return area;
  }
};

function areaRingStart() {
  areaStream.point = areaPointFirst;
}

function areaPointFirst(x, y) {
  areaStream.point = areaPoint;
  x00 = x0 = x, y00 = y0 = y;
}

function areaPoint(x, y) {
  areaRingSum.add(y0 * x - x0 * y);
  x0 = x, y0 = y;
}

function areaRingEnd() {
  areaPoint(x00, y00);
}

var _default = areaStream;
exports.default = _default;
},{"../adder.js":"../node_modules/d3-geo/src/adder.js","../math.js":"../node_modules/d3-geo/src/math.js","../noop.js":"../node_modules/d3-geo/src/noop.js"}],"../node_modules/d3-geo/src/path/bounds.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _noop = _interopRequireDefault(require("../noop.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var x0 = Infinity,
    y0 = x0,
    x1 = -x0,
    y1 = x1;
var boundsStream = {
  point: boundsPoint,
  lineStart: _noop.default,
  lineEnd: _noop.default,
  polygonStart: _noop.default,
  polygonEnd: _noop.default,
  result: function () {
    var bounds = [[x0, y0], [x1, y1]];
    x1 = y1 = -(y0 = x0 = Infinity);
    return bounds;
  }
};

function boundsPoint(x, y) {
  if (x < x0) x0 = x;
  if (x > x1) x1 = x;
  if (y < y0) y0 = y;
  if (y > y1) y1 = y;
}

var _default = boundsStream;
exports.default = _default;
},{"../noop.js":"../node_modules/d3-geo/src/noop.js"}],"../node_modules/d3-geo/src/path/centroid.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _math = require("../math.js");

// TODO Enforce positive area for exterior, negative area for interior?
var X0 = 0,
    Y0 = 0,
    Z0 = 0,
    X1 = 0,
    Y1 = 0,
    Z1 = 0,
    X2 = 0,
    Y2 = 0,
    Z2 = 0,
    x00,
    y00,
    x0,
    y0;
var centroidStream = {
  point: centroidPoint,
  lineStart: centroidLineStart,
  lineEnd: centroidLineEnd,
  polygonStart: function () {
    centroidStream.lineStart = centroidRingStart;
    centroidStream.lineEnd = centroidRingEnd;
  },
  polygonEnd: function () {
    centroidStream.point = centroidPoint;
    centroidStream.lineStart = centroidLineStart;
    centroidStream.lineEnd = centroidLineEnd;
  },
  result: function () {
    var centroid = Z2 ? [X2 / Z2, Y2 / Z2] : Z1 ? [X1 / Z1, Y1 / Z1] : Z0 ? [X0 / Z0, Y0 / Z0] : [NaN, NaN];
    X0 = Y0 = Z0 = X1 = Y1 = Z1 = X2 = Y2 = Z2 = 0;
    return centroid;
  }
};

function centroidPoint(x, y) {
  X0 += x;
  Y0 += y;
  ++Z0;
}

function centroidLineStart() {
  centroidStream.point = centroidPointFirstLine;
}

function centroidPointFirstLine(x, y) {
  centroidStream.point = centroidPointLine;
  centroidPoint(x0 = x, y0 = y);
}

function centroidPointLine(x, y) {
  var dx = x - x0,
      dy = y - y0,
      z = (0, _math.sqrt)(dx * dx + dy * dy);
  X1 += z * (x0 + x) / 2;
  Y1 += z * (y0 + y) / 2;
  Z1 += z;
  centroidPoint(x0 = x, y0 = y);
}

function centroidLineEnd() {
  centroidStream.point = centroidPoint;
}

function centroidRingStart() {
  centroidStream.point = centroidPointFirstRing;
}

function centroidRingEnd() {
  centroidPointRing(x00, y00);
}

function centroidPointFirstRing(x, y) {
  centroidStream.point = centroidPointRing;
  centroidPoint(x00 = x0 = x, y00 = y0 = y);
}

function centroidPointRing(x, y) {
  var dx = x - x0,
      dy = y - y0,
      z = (0, _math.sqrt)(dx * dx + dy * dy);
  X1 += z * (x0 + x) / 2;
  Y1 += z * (y0 + y) / 2;
  Z1 += z;
  z = y0 * x - x0 * y;
  X2 += z * (x0 + x);
  Y2 += z * (y0 + y);
  Z2 += z * 3;
  centroidPoint(x0 = x, y0 = y);
}

var _default = centroidStream;
exports.default = _default;
},{"../math.js":"../node_modules/d3-geo/src/math.js"}],"../node_modules/d3-geo/src/path/context.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PathContext;

var _math = require("../math.js");

var _noop = _interopRequireDefault(require("../noop.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PathContext(context) {
  this._context = context;
}

PathContext.prototype = {
  _radius: 4.5,
  pointRadius: function (_) {
    return this._radius = _, this;
  },
  polygonStart: function () {
    this._line = 0;
  },
  polygonEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    this._point = 0;
  },
  lineEnd: function () {
    if (this._line === 0) this._context.closePath();
    this._point = NaN;
  },
  point: function (x, y) {
    switch (this._point) {
      case 0:
        {
          this._context.moveTo(x, y);

          this._point = 1;
          break;
        }

      case 1:
        {
          this._context.lineTo(x, y);

          break;
        }

      default:
        {
          this._context.moveTo(x + this._radius, y);

          this._context.arc(x, y, this._radius, 0, _math.tau);

          break;
        }
    }
  },
  result: _noop.default
};
},{"../math.js":"../node_modules/d3-geo/src/math.js","../noop.js":"../node_modules/d3-geo/src/noop.js"}],"../node_modules/d3-geo/src/path/measure.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _adder = _interopRequireDefault(require("../adder.js"));

var _math = require("../math.js");

var _noop = _interopRequireDefault(require("../noop.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lengthSum = (0, _adder.default)(),
    lengthRing,
    x00,
    y00,
    x0,
    y0;
var lengthStream = {
  point: _noop.default,
  lineStart: function () {
    lengthStream.point = lengthPointFirst;
  },
  lineEnd: function () {
    if (lengthRing) lengthPoint(x00, y00);
    lengthStream.point = _noop.default;
  },
  polygonStart: function () {
    lengthRing = true;
  },
  polygonEnd: function () {
    lengthRing = null;
  },
  result: function () {
    var length = +lengthSum;
    lengthSum.reset();
    return length;
  }
};

function lengthPointFirst(x, y) {
  lengthStream.point = lengthPoint;
  x00 = x0 = x, y00 = y0 = y;
}

function lengthPoint(x, y) {
  x0 -= x, y0 -= y;
  lengthSum.add((0, _math.sqrt)(x0 * x0 + y0 * y0));
  x0 = x, y0 = y;
}

var _default = lengthStream;
exports.default = _default;
},{"../adder.js":"../node_modules/d3-geo/src/adder.js","../math.js":"../node_modules/d3-geo/src/math.js","../noop.js":"../node_modules/d3-geo/src/noop.js"}],"../node_modules/d3-geo/src/path/string.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PathString;

function PathString() {
  this._string = [];
}

PathString.prototype = {
  _radius: 4.5,
  _circle: circle(4.5),
  pointRadius: function (_) {
    if ((_ = +_) !== this._radius) this._radius = _, this._circle = null;
    return this;
  },
  polygonStart: function () {
    this._line = 0;
  },
  polygonEnd: function () {
    this._line = NaN;
  },
  lineStart: function () {
    this._point = 0;
  },
  lineEnd: function () {
    if (this._line === 0) this._string.push("Z");
    this._point = NaN;
  },
  point: function (x, y) {
    switch (this._point) {
      case 0:
        {
          this._string.push("M", x, ",", y);

          this._point = 1;
          break;
        }

      case 1:
        {
          this._string.push("L", x, ",", y);

          break;
        }

      default:
        {
          if (this._circle == null) this._circle = circle(this._radius);

          this._string.push("M", x, ",", y, this._circle);

          break;
        }
    }
  },
  result: function () {
    if (this._string.length) {
      var result = this._string.join("");

      this._string = [];
      return result;
    } else {
      return null;
    }
  }
};

function circle(radius) {
  return "m0," + radius + "a" + radius + "," + radius + " 0 1,1 0," + -2 * radius + "a" + radius + "," + radius + " 0 1,1 0," + 2 * radius + "z";
}
},{}],"../node_modules/d3-geo/src/path/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _identity = _interopRequireDefault(require("../identity.js"));

var _stream = _interopRequireDefault(require("../stream.js"));

var _area = _interopRequireDefault(require("./area.js"));

var _bounds = _interopRequireDefault(require("./bounds.js"));

var _centroid = _interopRequireDefault(require("./centroid.js"));

var _context = _interopRequireDefault(require("./context.js"));

var _measure = _interopRequireDefault(require("./measure.js"));

var _string = _interopRequireDefault(require("./string.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(projection, context) {
  var pointRadius = 4.5,
      projectionStream,
      contextStream;

  function path(object) {
    if (object) {
      if (typeof pointRadius === "function") contextStream.pointRadius(+pointRadius.apply(this, arguments));
      (0, _stream.default)(object, projectionStream(contextStream));
    }

    return contextStream.result();
  }

  path.area = function (object) {
    (0, _stream.default)(object, projectionStream(_area.default));
    return _area.default.result();
  };

  path.measure = function (object) {
    (0, _stream.default)(object, projectionStream(_measure.default));
    return _measure.default.result();
  };

  path.bounds = function (object) {
    (0, _stream.default)(object, projectionStream(_bounds.default));
    return _bounds.default.result();
  };

  path.centroid = function (object) {
    (0, _stream.default)(object, projectionStream(_centroid.default));
    return _centroid.default.result();
  };

  path.projection = function (_) {
    return arguments.length ? (projectionStream = _ == null ? (projection = null, _identity.default) : (projection = _).stream, path) : projection;
  };

  path.context = function (_) {
    if (!arguments.length) return context;
    contextStream = _ == null ? (context = null, new _string.default()) : new _context.default(context = _);
    if (typeof pointRadius !== "function") contextStream.pointRadius(pointRadius);
    return path;
  };

  path.pointRadius = function (_) {
    if (!arguments.length) return pointRadius;
    pointRadius = typeof _ === "function" ? _ : (contextStream.pointRadius(+_), +_);
    return path;
  };

  return path.projection(projection).context(context);
}
},{"../identity.js":"../node_modules/d3-geo/src/identity.js","../stream.js":"../node_modules/d3-geo/src/stream.js","./area.js":"../node_modules/d3-geo/src/path/area.js","./bounds.js":"../node_modules/d3-geo/src/path/bounds.js","./centroid.js":"../node_modules/d3-geo/src/path/centroid.js","./context.js":"../node_modules/d3-geo/src/path/context.js","./measure.js":"../node_modules/d3-geo/src/path/measure.js","./string.js":"../node_modules/d3-geo/src/path/string.js"}],"../node_modules/d3-geo/src/transform.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.transformer = transformer;

function _default(methods) {
  return {
    stream: transformer(methods)
  };
}

function transformer(methods) {
  return function (stream) {
    var s = new TransformStream();

    for (var key in methods) s[key] = methods[key];

    s.stream = stream;
    return s;
  };
}

function TransformStream() {}

TransformStream.prototype = {
  constructor: TransformStream,
  point: function (x, y) {
    this.stream.point(x, y);
  },
  sphere: function () {
    this.stream.sphere();
  },
  lineStart: function () {
    this.stream.lineStart();
  },
  lineEnd: function () {
    this.stream.lineEnd();
  },
  polygonStart: function () {
    this.stream.polygonStart();
  },
  polygonEnd: function () {
    this.stream.polygonEnd();
  }
};
},{}],"../node_modules/d3-geo/src/projection/fit.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fitExtent = fitExtent;
exports.fitSize = fitSize;
exports.fitWidth = fitWidth;
exports.fitHeight = fitHeight;

var _stream = _interopRequireDefault(require("../stream.js"));

var _bounds = _interopRequireDefault(require("../path/bounds.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fit(projection, fitBounds, object) {
  var clip = projection.clipExtent && projection.clipExtent();
  projection.scale(150).translate([0, 0]);
  if (clip != null) projection.clipExtent(null);
  (0, _stream.default)(object, projection.stream(_bounds.default));
  fitBounds(_bounds.default.result());
  if (clip != null) projection.clipExtent(clip);
  return projection;
}

function fitExtent(projection, extent, object) {
  return fit(projection, function (b) {
    var w = extent[1][0] - extent[0][0],
        h = extent[1][1] - extent[0][1],
        k = Math.min(w / (b[1][0] - b[0][0]), h / (b[1][1] - b[0][1])),
        x = +extent[0][0] + (w - k * (b[1][0] + b[0][0])) / 2,
        y = +extent[0][1] + (h - k * (b[1][1] + b[0][1])) / 2;
    projection.scale(150 * k).translate([x, y]);
  }, object);
}

function fitSize(projection, size, object) {
  return fitExtent(projection, [[0, 0], size], object);
}

function fitWidth(projection, width, object) {
  return fit(projection, function (b) {
    var w = +width,
        k = w / (b[1][0] - b[0][0]),
        x = (w - k * (b[1][0] + b[0][0])) / 2,
        y = -k * b[0][1];
    projection.scale(150 * k).translate([x, y]);
  }, object);
}

function fitHeight(projection, height, object) {
  return fit(projection, function (b) {
    var h = +height,
        k = h / (b[1][1] - b[0][1]),
        x = -k * b[0][0],
        y = (h - k * (b[1][1] + b[0][1])) / 2;
    projection.scale(150 * k).translate([x, y]);
  }, object);
}
},{"../stream.js":"../node_modules/d3-geo/src/stream.js","../path/bounds.js":"../node_modules/d3-geo/src/path/bounds.js"}],"../node_modules/d3-geo/src/projection/resample.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _cartesian = require("../cartesian.js");

var _math = require("../math.js");

var _transform = require("../transform.js");

var maxDepth = 16,
    // maximum depth of subdivision
cosMinDistance = (0, _math.cos)(30 * _math.radians); // cos(minimum angular distance)

function _default(project, delta2) {
  return +delta2 ? resample(project, delta2) : resampleNone(project);
}

function resampleNone(project) {
  return (0, _transform.transformer)({
    point: function (x, y) {
      x = project(x, y);
      this.stream.point(x[0], x[1]);
    }
  });
}

function resample(project, delta2) {
  function resampleLineTo(x0, y0, lambda0, a0, b0, c0, x1, y1, lambda1, a1, b1, c1, depth, stream) {
    var dx = x1 - x0,
        dy = y1 - y0,
        d2 = dx * dx + dy * dy;

    if (d2 > 4 * delta2 && depth--) {
      var a = a0 + a1,
          b = b0 + b1,
          c = c0 + c1,
          m = (0, _math.sqrt)(a * a + b * b + c * c),
          phi2 = (0, _math.asin)(c /= m),
          lambda2 = (0, _math.abs)((0, _math.abs)(c) - 1) < _math.epsilon || (0, _math.abs)(lambda0 - lambda1) < _math.epsilon ? (lambda0 + lambda1) / 2 : (0, _math.atan2)(b, a),
          p = project(lambda2, phi2),
          x2 = p[0],
          y2 = p[1],
          dx2 = x2 - x0,
          dy2 = y2 - y0,
          dz = dy * dx2 - dx * dy2;

      if (dz * dz / d2 > delta2 // perpendicular projected distance
      || (0, _math.abs)((dx * dx2 + dy * dy2) / d2 - 0.5) > 0.3 // midpoint close to an end
      || a0 * a1 + b0 * b1 + c0 * c1 < cosMinDistance) {
        // angular distance
        resampleLineTo(x0, y0, lambda0, a0, b0, c0, x2, y2, lambda2, a /= m, b /= m, c, depth, stream);
        stream.point(x2, y2);
        resampleLineTo(x2, y2, lambda2, a, b, c, x1, y1, lambda1, a1, b1, c1, depth, stream);
      }
    }
  }

  return function (stream) {
    var lambda00, x00, y00, a00, b00, c00, // first point
    lambda0, x0, y0, a0, b0, c0; // previous point

    var resampleStream = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: function () {
        stream.polygonStart();
        resampleStream.lineStart = ringStart;
      },
      polygonEnd: function () {
        stream.polygonEnd();
        resampleStream.lineStart = lineStart;
      }
    };

    function point(x, y) {
      x = project(x, y);
      stream.point(x[0], x[1]);
    }

    function lineStart() {
      x0 = NaN;
      resampleStream.point = linePoint;
      stream.lineStart();
    }

    function linePoint(lambda, phi) {
      var c = (0, _cartesian.cartesian)([lambda, phi]),
          p = project(lambda, phi);
      resampleLineTo(x0, y0, lambda0, a0, b0, c0, x0 = p[0], y0 = p[1], lambda0 = lambda, a0 = c[0], b0 = c[1], c0 = c[2], maxDepth, stream);
      stream.point(x0, y0);
    }

    function lineEnd() {
      resampleStream.point = point;
      stream.lineEnd();
    }

    function ringStart() {
      lineStart();
      resampleStream.point = ringPoint;
      resampleStream.lineEnd = ringEnd;
    }

    function ringPoint(lambda, phi) {
      linePoint(lambda00 = lambda, phi), x00 = x0, y00 = y0, a00 = a0, b00 = b0, c00 = c0;
      resampleStream.point = linePoint;
    }

    function ringEnd() {
      resampleLineTo(x0, y0, lambda0, a0, b0, c0, x00, y00, lambda00, a00, b00, c00, maxDepth, stream);
      resampleStream.lineEnd = lineEnd;
      lineEnd();
    }

    return resampleStream;
  };
}
},{"../cartesian.js":"../node_modules/d3-geo/src/cartesian.js","../math.js":"../node_modules/d3-geo/src/math.js","../transform.js":"../node_modules/d3-geo/src/transform.js"}],"../node_modules/d3-geo/src/projection/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = projection;
exports.projectionMutator = projectionMutator;

var _antimeridian = _interopRequireDefault(require("../clip/antimeridian.js"));

var _circle = _interopRequireDefault(require("../clip/circle.js"));

var _rectangle = _interopRequireDefault(require("../clip/rectangle.js"));

var _compose = _interopRequireDefault(require("../compose.js"));

var _identity = _interopRequireDefault(require("../identity.js"));

var _math = require("../math.js");

var _rotation = require("../rotation.js");

var _transform = require("../transform.js");

var _fit = require("./fit.js");

var _resample = _interopRequireDefault(require("./resample.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transformRadians = (0, _transform.transformer)({
  point: function (x, y) {
    this.stream.point(x * _math.radians, y * _math.radians);
  }
});

function transformRotate(rotate) {
  return (0, _transform.transformer)({
    point: function (x, y) {
      var r = rotate(x, y);
      return this.stream.point(r[0], r[1]);
    }
  });
}

function scaleTranslate(k, dx, dy) {
  function transform(x, y) {
    return [dx + k * x, dy - k * y];
  }

  transform.invert = function (x, y) {
    return [(x - dx) / k, (dy - y) / k];
  };

  return transform;
}

function scaleTranslateRotate(k, dx, dy, alpha) {
  var cosAlpha = (0, _math.cos)(alpha),
      sinAlpha = (0, _math.sin)(alpha),
      a = cosAlpha * k,
      b = sinAlpha * k,
      ai = cosAlpha / k,
      bi = sinAlpha / k,
      ci = (sinAlpha * dy - cosAlpha * dx) / k,
      fi = (sinAlpha * dx + cosAlpha * dy) / k;

  function transform(x, y) {
    return [a * x - b * y + dx, dy - b * x - a * y];
  }

  transform.invert = function (x, y) {
    return [ai * x - bi * y + ci, fi - bi * x - ai * y];
  };

  return transform;
}

function projection(project) {
  return projectionMutator(function () {
    return project;
  })();
}

function projectionMutator(projectAt) {
  var project,
      k = 150,
      // scale
  x = 480,
      y = 250,
      // translate
  lambda = 0,
      phi = 0,
      // center
  deltaLambda = 0,
      deltaPhi = 0,
      deltaGamma = 0,
      rotate,
      // pre-rotate
  alpha = 0,
      // post-rotate
  theta = null,
      preclip = _antimeridian.default,
      // pre-clip angle
  x0 = null,
      y0,
      x1,
      y1,
      postclip = _identity.default,
      // post-clip extent
  delta2 = 0.5,
      // precision
  projectResample,
      projectTransform,
      projectRotateTransform,
      cache,
      cacheStream;

  function projection(point) {
    return projectRotateTransform(point[0] * _math.radians, point[1] * _math.radians);
  }

  function invert(point) {
    point = projectRotateTransform.invert(point[0], point[1]);
    return point && [point[0] * _math.degrees, point[1] * _math.degrees];
  }

  projection.stream = function (stream) {
    return cache && cacheStream === stream ? cache : cache = transformRadians(transformRotate(rotate)(preclip(projectResample(postclip(cacheStream = stream)))));
  };

  projection.preclip = function (_) {
    return arguments.length ? (preclip = _, theta = undefined, reset()) : preclip;
  };

  projection.postclip = function (_) {
    return arguments.length ? (postclip = _, x0 = y0 = x1 = y1 = null, reset()) : postclip;
  };

  projection.clipAngle = function (_) {
    return arguments.length ? (preclip = +_ ? (0, _circle.default)(theta = _ * _math.radians) : (theta = null, _antimeridian.default), reset()) : theta * _math.degrees;
  };

  projection.clipExtent = function (_) {
    return arguments.length ? (postclip = _ == null ? (x0 = y0 = x1 = y1 = null, _identity.default) : (0, _rectangle.default)(x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]), reset()) : x0 == null ? null : [[x0, y0], [x1, y1]];
  };

  projection.scale = function (_) {
    return arguments.length ? (k = +_, recenter()) : k;
  };

  projection.translate = function (_) {
    return arguments.length ? (x = +_[0], y = +_[1], recenter()) : [x, y];
  };

  projection.center = function (_) {
    return arguments.length ? (lambda = _[0] % 360 * _math.radians, phi = _[1] % 360 * _math.radians, recenter()) : [lambda * _math.degrees, phi * _math.degrees];
  };

  projection.rotate = function (_) {
    return arguments.length ? (deltaLambda = _[0] % 360 * _math.radians, deltaPhi = _[1] % 360 * _math.radians, deltaGamma = _.length > 2 ? _[2] % 360 * _math.radians : 0, recenter()) : [deltaLambda * _math.degrees, deltaPhi * _math.degrees, deltaGamma * _math.degrees];
  };

  projection.angle = function (_) {
    return arguments.length ? (alpha = _ % 360 * _math.radians, recenter()) : alpha * _math.degrees;
  };

  projection.precision = function (_) {
    return arguments.length ? (projectResample = (0, _resample.default)(projectTransform, delta2 = _ * _), reset()) : (0, _math.sqrt)(delta2);
  };

  projection.fitExtent = function (extent, object) {
    return (0, _fit.fitExtent)(projection, extent, object);
  };

  projection.fitSize = function (size, object) {
    return (0, _fit.fitSize)(projection, size, object);
  };

  projection.fitWidth = function (width, object) {
    return (0, _fit.fitWidth)(projection, width, object);
  };

  projection.fitHeight = function (height, object) {
    return (0, _fit.fitHeight)(projection, height, object);
  };

  function recenter() {
    var center = scaleTranslateRotate(k, 0, 0, alpha).apply(null, project(lambda, phi)),
        transform = (alpha ? scaleTranslateRotate : scaleTranslate)(k, x - center[0], y - center[1], alpha);
    rotate = (0, _rotation.rotateRadians)(deltaLambda, deltaPhi, deltaGamma);
    projectTransform = (0, _compose.default)(project, transform);
    projectRotateTransform = (0, _compose.default)(rotate, projectTransform);
    projectResample = (0, _resample.default)(projectTransform, delta2);
    return reset();
  }

  function reset() {
    cache = cacheStream = null;
    return projection;
  }

  return function () {
    project = projectAt.apply(this, arguments);
    projection.invert = project.invert && invert;
    return recenter();
  };
}
},{"../clip/antimeridian.js":"../node_modules/d3-geo/src/clip/antimeridian.js","../clip/circle.js":"../node_modules/d3-geo/src/clip/circle.js","../clip/rectangle.js":"../node_modules/d3-geo/src/clip/rectangle.js","../compose.js":"../node_modules/d3-geo/src/compose.js","../identity.js":"../node_modules/d3-geo/src/identity.js","../math.js":"../node_modules/d3-geo/src/math.js","../rotation.js":"../node_modules/d3-geo/src/rotation.js","../transform.js":"../node_modules/d3-geo/src/transform.js","./fit.js":"../node_modules/d3-geo/src/projection/fit.js","./resample.js":"../node_modules/d3-geo/src/projection/resample.js"}],"../node_modules/d3-geo/src/projection/conic.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.conicProjection = conicProjection;

var _math = require("../math.js");

var _index = require("./index.js");

function conicProjection(projectAt) {
  var phi0 = 0,
      phi1 = _math.pi / 3,
      m = (0, _index.projectionMutator)(projectAt),
      p = m(phi0, phi1);

  p.parallels = function (_) {
    return arguments.length ? m(phi0 = _[0] * _math.radians, phi1 = _[1] * _math.radians) : [phi0 * _math.degrees, phi1 * _math.degrees];
  };

  return p;
}
},{"../math.js":"../node_modules/d3-geo/src/math.js","./index.js":"../node_modules/d3-geo/src/projection/index.js"}],"../node_modules/d3-geo/src/projection/cylindricalEqualArea.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cylindricalEqualAreaRaw = cylindricalEqualAreaRaw;

var _math = require("../math.js");

function cylindricalEqualAreaRaw(phi0) {
  var cosPhi0 = (0, _math.cos)(phi0);

  function forward(lambda, phi) {
    return [lambda * cosPhi0, (0, _math.sin)(phi) / cosPhi0];
  }

  forward.invert = function (x, y) {
    return [x / cosPhi0, (0, _math.asin)(y * cosPhi0)];
  };

  return forward;
}
},{"../math.js":"../node_modules/d3-geo/src/math.js"}],"../node_modules/d3-geo/src/projection/conicEqualArea.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.conicEqualAreaRaw = conicEqualAreaRaw;
exports.default = _default;

var _math = require("../math.js");

var _conic = require("./conic.js");

var _cylindricalEqualArea = require("./cylindricalEqualArea.js");

function conicEqualAreaRaw(y0, y1) {
  var sy0 = (0, _math.sin)(y0),
      n = (sy0 + (0, _math.sin)(y1)) / 2; // Are the parallels symmetrical around the Equator?

  if ((0, _math.abs)(n) < _math.epsilon) return (0, _cylindricalEqualArea.cylindricalEqualAreaRaw)(y0);
  var c = 1 + sy0 * (2 * n - sy0),
      r0 = (0, _math.sqrt)(c) / n;

  function project(x, y) {
    var r = (0, _math.sqrt)(c - 2 * n * (0, _math.sin)(y)) / n;
    return [r * (0, _math.sin)(x *= n), r0 - r * (0, _math.cos)(x)];
  }

  project.invert = function (x, y) {
    var r0y = r0 - y;
    return [(0, _math.atan2)(x, (0, _math.abs)(r0y)) / n * (0, _math.sign)(r0y), (0, _math.asin)((c - (x * x + r0y * r0y) * n * n) / (2 * n))];
  };

  return project;
}

function _default() {
  return (0, _conic.conicProjection)(conicEqualAreaRaw).scale(155.424).center([0, 33.6442]);
}
},{"../math.js":"../node_modules/d3-geo/src/math.js","./conic.js":"../node_modules/d3-geo/src/projection/conic.js","./cylindricalEqualArea.js":"../node_modules/d3-geo/src/projection/cylindricalEqualArea.js"}],"../node_modules/d3-geo/src/projection/albers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _conicEqualArea = _interopRequireDefault(require("./conicEqualArea.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  return (0, _conicEqualArea.default)().parallels([29.5, 45.5]).scale(1070).translate([480, 250]).rotate([96, 0]).center([-0.6, 38.7]);
}
},{"./conicEqualArea.js":"../node_modules/d3-geo/src/projection/conicEqualArea.js"}],"../node_modules/d3-geo/src/projection/albersUsa.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _math = require("../math.js");

var _albers = _interopRequireDefault(require("./albers.js"));

var _conicEqualArea = _interopRequireDefault(require("./conicEqualArea.js"));

var _fit = require("./fit.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// The projections must have mutually exclusive clip regions on the sphere,
// as this will avoid emitting interleaving lines and polygons.
function multiplex(streams) {
  var n = streams.length;
  return {
    point: function (x, y) {
      var i = -1;

      while (++i < n) streams[i].point(x, y);
    },
    sphere: function () {
      var i = -1;

      while (++i < n) streams[i].sphere();
    },
    lineStart: function () {
      var i = -1;

      while (++i < n) streams[i].lineStart();
    },
    lineEnd: function () {
      var i = -1;

      while (++i < n) streams[i].lineEnd();
    },
    polygonStart: function () {
      var i = -1;

      while (++i < n) streams[i].polygonStart();
    },
    polygonEnd: function () {
      var i = -1;

      while (++i < n) streams[i].polygonEnd();
    }
  };
} // A composite projection for the United States, configured by default for
// 960×500. The projection also works quite well at 960×600 if you change the
// scale to 1285 and adjust the translate accordingly. The set of standard
// parallels for each region comes from USGS, which is published here:
// http://egsc.usgs.gov/isb/pubs/MapProjections/projections.html#albers


function _default() {
  var cache,
      cacheStream,
      lower48 = (0, _albers.default)(),
      lower48Point,
      alaska = (0, _conicEqualArea.default)().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]),
      alaskaPoint,
      // EPSG:3338
  hawaii = (0, _conicEqualArea.default)().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]),
      hawaiiPoint,
      // ESRI:102007
  point,
      pointStream = {
    point: function (x, y) {
      point = [x, y];
    }
  };

  function albersUsa(coordinates) {
    var x = coordinates[0],
        y = coordinates[1];
    return point = null, (lower48Point.point(x, y), point) || (alaskaPoint.point(x, y), point) || (hawaiiPoint.point(x, y), point);
  }

  albersUsa.invert = function (coordinates) {
    var k = lower48.scale(),
        t = lower48.translate(),
        x = (coordinates[0] - t[0]) / k,
        y = (coordinates[1] - t[1]) / k;
    return (y >= 0.120 && y < 0.234 && x >= -0.425 && x < -0.214 ? alaska : y >= 0.166 && y < 0.234 && x >= -0.214 && x < -0.115 ? hawaii : lower48).invert(coordinates);
  };

  albersUsa.stream = function (stream) {
    return cache && cacheStream === stream ? cache : cache = multiplex([lower48.stream(cacheStream = stream), alaska.stream(stream), hawaii.stream(stream)]);
  };

  albersUsa.precision = function (_) {
    if (!arguments.length) return lower48.precision();
    lower48.precision(_), alaska.precision(_), hawaii.precision(_);
    return reset();
  };

  albersUsa.scale = function (_) {
    if (!arguments.length) return lower48.scale();
    lower48.scale(_), alaska.scale(_ * 0.35), hawaii.scale(_);
    return albersUsa.translate(lower48.translate());
  };

  albersUsa.translate = function (_) {
    if (!arguments.length) return lower48.translate();
    var k = lower48.scale(),
        x = +_[0],
        y = +_[1];
    lower48Point = lower48.translate(_).clipExtent([[x - 0.455 * k, y - 0.238 * k], [x + 0.455 * k, y + 0.238 * k]]).stream(pointStream);
    alaskaPoint = alaska.translate([x - 0.307 * k, y + 0.201 * k]).clipExtent([[x - 0.425 * k + _math.epsilon, y + 0.120 * k + _math.epsilon], [x - 0.214 * k - _math.epsilon, y + 0.234 * k - _math.epsilon]]).stream(pointStream);
    hawaiiPoint = hawaii.translate([x - 0.205 * k, y + 0.212 * k]).clipExtent([[x - 0.214 * k + _math.epsilon, y + 0.166 * k + _math.epsilon], [x - 0.115 * k - _math.epsilon, y + 0.234 * k - _math.epsilon]]).stream(pointStream);
    return reset();
  };

  albersUsa.fitExtent = function (extent, object) {
    return (0, _fit.fitExtent)(albersUsa, extent, object);
  };

  albersUsa.fitSize = function (size, object) {
    return (0, _fit.fitSize)(albersUsa, size, object);
  };

  albersUsa.fitWidth = function (width, object) {
    return (0, _fit.fitWidth)(albersUsa, width, object);
  };

  albersUsa.fitHeight = function (height, object) {
    return (0, _fit.fitHeight)(albersUsa, height, object);
  };

  function reset() {
    cache = cacheStream = null;
    return albersUsa;
  }

  return albersUsa.scale(1070);
}
},{"../math.js":"../node_modules/d3-geo/src/math.js","./albers.js":"../node_modules/d3-geo/src/projection/albers.js","./conicEqualArea.js":"../node_modules/d3-geo/src/projection/conicEqualArea.js","./fit.js":"../node_modules/d3-geo/src/projection/fit.js"}],"../node_modules/d3-geo/src/projection/azimuthal.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.azimuthalRaw = azimuthalRaw;
exports.azimuthalInvert = azimuthalInvert;

var _math = require("../math.js");

function azimuthalRaw(scale) {
  return function (x, y) {
    var cx = (0, _math.cos)(x),
        cy = (0, _math.cos)(y),
        k = scale(cx * cy);
    return [k * cy * (0, _math.sin)(x), k * (0, _math.sin)(y)];
  };
}

function azimuthalInvert(angle) {
  return function (x, y) {
    var z = (0, _math.sqrt)(x * x + y * y),
        c = angle(z),
        sc = (0, _math.sin)(c),
        cc = (0, _math.cos)(c);
    return [(0, _math.atan2)(x * sc, z * cc), (0, _math.asin)(z && y * sc / z)];
  };
}
},{"../math.js":"../node_modules/d3-geo/src/math.js"}],"../node_modules/d3-geo/src/projection/azimuthalEqualArea.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.azimuthalEqualAreaRaw = void 0;

var _math = require("../math.js");

var _azimuthal = require("./azimuthal.js");

var _index = _interopRequireDefault(require("./index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var azimuthalEqualAreaRaw = (0, _azimuthal.azimuthalRaw)(function (cxcy) {
  return (0, _math.sqrt)(2 / (1 + cxcy));
});
exports.azimuthalEqualAreaRaw = azimuthalEqualAreaRaw;
azimuthalEqualAreaRaw.invert = (0, _azimuthal.azimuthalInvert)(function (z) {
  return 2 * (0, _math.asin)(z / 2);
});

function _default() {
  return (0, _index.default)(azimuthalEqualAreaRaw).scale(124.75).clipAngle(180 - 1e-3);
}
},{"../math.js":"../node_modules/d3-geo/src/math.js","./azimuthal.js":"../node_modules/d3-geo/src/projection/azimuthal.js","./index.js":"../node_modules/d3-geo/src/projection/index.js"}],"../node_modules/d3-geo/src/projection/azimuthalEquidistant.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.azimuthalEquidistantRaw = void 0;

var _math = require("../math.js");

var _azimuthal = require("./azimuthal.js");

var _index = _interopRequireDefault(require("./index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var azimuthalEquidistantRaw = (0, _azimuthal.azimuthalRaw)(function (c) {
  return (c = (0, _math.acos)(c)) && c / (0, _math.sin)(c);
});
exports.azimuthalEquidistantRaw = azimuthalEquidistantRaw;
azimuthalEquidistantRaw.invert = (0, _azimuthal.azimuthalInvert)(function (z) {
  return z;
});

function _default() {
  return (0, _index.default)(azimuthalEquidistantRaw).scale(79.4188).clipAngle(180 - 1e-3);
}
},{"../math.js":"../node_modules/d3-geo/src/math.js","./azimuthal.js":"../node_modules/d3-geo/src/projection/azimuthal.js","./index.js":"../node_modules/d3-geo/src/projection/index.js"}],"../node_modules/d3-geo/src/projection/mercator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mercatorRaw = mercatorRaw;
exports.default = _default;
exports.mercatorProjection = mercatorProjection;

var _math = require("../math.js");

var _rotation = _interopRequireDefault(require("../rotation.js"));

var _index = _interopRequireDefault(require("./index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mercatorRaw(lambda, phi) {
  return [lambda, (0, _math.log)((0, _math.tan)((_math.halfPi + phi) / 2))];
}

mercatorRaw.invert = function (x, y) {
  return [x, 2 * (0, _math.atan)((0, _math.exp)(y)) - _math.halfPi];
};

function _default() {
  return mercatorProjection(mercatorRaw).scale(961 / _math.tau);
}

function mercatorProjection(project) {
  var m = (0, _index.default)(project),
      center = m.center,
      scale = m.scale,
      translate = m.translate,
      clipExtent = m.clipExtent,
      x0 = null,
      y0,
      x1,
      y1; // clip extent

  m.scale = function (_) {
    return arguments.length ? (scale(_), reclip()) : scale();
  };

  m.translate = function (_) {
    return arguments.length ? (translate(_), reclip()) : translate();
  };

  m.center = function (_) {
    return arguments.length ? (center(_), reclip()) : center();
  };

  m.clipExtent = function (_) {
    return arguments.length ? (_ == null ? x0 = y0 = x1 = y1 = null : (x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]), reclip()) : x0 == null ? null : [[x0, y0], [x1, y1]];
  };

  function reclip() {
    var k = _math.pi * scale(),
        t = m((0, _rotation.default)(m.rotate()).invert([0, 0]));
    return clipExtent(x0 == null ? [[t[0] - k, t[1] - k], [t[0] + k, t[1] + k]] : project === mercatorRaw ? [[Math.max(t[0] - k, x0), y0], [Math.min(t[0] + k, x1), y1]] : [[x0, Math.max(t[1] - k, y0)], [x1, Math.min(t[1] + k, y1)]]);
  }

  return reclip();
}
},{"../math.js":"../node_modules/d3-geo/src/math.js","../rotation.js":"../node_modules/d3-geo/src/rotation.js","./index.js":"../node_modules/d3-geo/src/projection/index.js"}],"../node_modules/d3-geo/src/projection/conicConformal.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.conicConformalRaw = conicConformalRaw;
exports.default = _default;

var _math = require("../math.js");

var _conic = require("./conic.js");

var _mercator = require("./mercator.js");

function tany(y) {
  return (0, _math.tan)((_math.halfPi + y) / 2);
}

function conicConformalRaw(y0, y1) {
  var cy0 = (0, _math.cos)(y0),
      n = y0 === y1 ? (0, _math.sin)(y0) : (0, _math.log)(cy0 / (0, _math.cos)(y1)) / (0, _math.log)(tany(y1) / tany(y0)),
      f = cy0 * (0, _math.pow)(tany(y0), n) / n;
  if (!n) return _mercator.mercatorRaw;

  function project(x, y) {
    if (f > 0) {
      if (y < -_math.halfPi + _math.epsilon) y = -_math.halfPi + _math.epsilon;
    } else {
      if (y > _math.halfPi - _math.epsilon) y = _math.halfPi - _math.epsilon;
    }

    var r = f / (0, _math.pow)(tany(y), n);
    return [r * (0, _math.sin)(n * x), f - r * (0, _math.cos)(n * x)];
  }

  project.invert = function (x, y) {
    var fy = f - y,
        r = (0, _math.sign)(n) * (0, _math.sqrt)(x * x + fy * fy);
    return [(0, _math.atan2)(x, (0, _math.abs)(fy)) / n * (0, _math.sign)(fy), 2 * (0, _math.atan)((0, _math.pow)(f / r, 1 / n)) - _math.halfPi];
  };

  return project;
}

function _default() {
  return (0, _conic.conicProjection)(conicConformalRaw).scale(109.5).parallels([30, 30]);
}
},{"../math.js":"../node_modules/d3-geo/src/math.js","./conic.js":"../node_modules/d3-geo/src/projection/conic.js","./mercator.js":"../node_modules/d3-geo/src/projection/mercator.js"}],"../node_modules/d3-geo/src/projection/equirectangular.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.equirectangularRaw = equirectangularRaw;
exports.default = _default;

var _index = _interopRequireDefault(require("./index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function equirectangularRaw(lambda, phi) {
  return [lambda, phi];
}

equirectangularRaw.invert = equirectangularRaw;

function _default() {
  return (0, _index.default)(equirectangularRaw).scale(152.63);
}
},{"./index.js":"../node_modules/d3-geo/src/projection/index.js"}],"../node_modules/d3-geo/src/projection/conicEquidistant.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.conicEquidistantRaw = conicEquidistantRaw;
exports.default = _default;

var _math = require("../math.js");

var _conic = require("./conic.js");

var _equirectangular = require("./equirectangular.js");

function conicEquidistantRaw(y0, y1) {
  var cy0 = (0, _math.cos)(y0),
      n = y0 === y1 ? (0, _math.sin)(y0) : (cy0 - (0, _math.cos)(y1)) / (y1 - y0),
      g = cy0 / n + y0;
  if ((0, _math.abs)(n) < _math.epsilon) return _equirectangular.equirectangularRaw;

  function project(x, y) {
    var gy = g - y,
        nx = n * x;
    return [gy * (0, _math.sin)(nx), g - gy * (0, _math.cos)(nx)];
  }

  project.invert = function (x, y) {
    var gy = g - y;
    return [(0, _math.atan2)(x, (0, _math.abs)(gy)) / n * (0, _math.sign)(gy), g - (0, _math.sign)(n) * (0, _math.sqrt)(x * x + gy * gy)];
  };

  return project;
}

function _default() {
  return (0, _conic.conicProjection)(conicEquidistantRaw).scale(131.154).center([0, 13.9389]);
}
},{"../math.js":"../node_modules/d3-geo/src/math.js","./conic.js":"../node_modules/d3-geo/src/projection/conic.js","./equirectangular.js":"../node_modules/d3-geo/src/projection/equirectangular.js"}],"../node_modules/d3-geo/src/projection/equalEarth.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.equalEarthRaw = equalEarthRaw;
exports.default = _default;

var _index = _interopRequireDefault(require("./index.js"));

var _math = require("../math.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var A1 = 1.340264,
    A2 = -0.081106,
    A3 = 0.000893,
    A4 = 0.003796,
    M = (0, _math.sqrt)(3) / 2,
    iterations = 12;

function equalEarthRaw(lambda, phi) {
  var l = (0, _math.asin)(M * (0, _math.sin)(phi)),
      l2 = l * l,
      l6 = l2 * l2 * l2;
  return [lambda * (0, _math.cos)(l) / (M * (A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2))), l * (A1 + A2 * l2 + l6 * (A3 + A4 * l2))];
}

equalEarthRaw.invert = function (x, y) {
  var l = y,
      l2 = l * l,
      l6 = l2 * l2 * l2;

  for (var i = 0, delta, fy, fpy; i < iterations; ++i) {
    fy = l * (A1 + A2 * l2 + l6 * (A3 + A4 * l2)) - y;
    fpy = A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2);
    l -= delta = fy / fpy, l2 = l * l, l6 = l2 * l2 * l2;
    if ((0, _math.abs)(delta) < _math.epsilon2) break;
  }

  return [M * x * (A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2)) / (0, _math.cos)(l), (0, _math.asin)((0, _math.sin)(l) / M)];
};

function _default() {
  return (0, _index.default)(equalEarthRaw).scale(177.158);
}
},{"./index.js":"../node_modules/d3-geo/src/projection/index.js","../math.js":"../node_modules/d3-geo/src/math.js"}],"../node_modules/d3-geo/src/projection/gnomonic.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gnomonicRaw = gnomonicRaw;
exports.default = _default;

var _math = require("../math.js");

var _azimuthal = require("./azimuthal.js");

var _index = _interopRequireDefault(require("./index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function gnomonicRaw(x, y) {
  var cy = (0, _math.cos)(y),
      k = (0, _math.cos)(x) * cy;
  return [cy * (0, _math.sin)(x) / k, (0, _math.sin)(y) / k];
}

gnomonicRaw.invert = (0, _azimuthal.azimuthalInvert)(_math.atan);

function _default() {
  return (0, _index.default)(gnomonicRaw).scale(144.049).clipAngle(60);
}
},{"../math.js":"../node_modules/d3-geo/src/math.js","./azimuthal.js":"../node_modules/d3-geo/src/projection/azimuthal.js","./index.js":"../node_modules/d3-geo/src/projection/index.js"}],"../node_modules/d3-geo/src/projection/identity.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _rectangle = _interopRequireDefault(require("../clip/rectangle.js"));

var _identity = _interopRequireDefault(require("../identity.js"));

var _transform = require("../transform.js");

var _fit = require("./fit.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function scaleTranslate(kx, ky, tx, ty) {
  return kx === 1 && ky === 1 && tx === 0 && ty === 0 ? _identity.default : (0, _transform.transformer)({
    point: function (x, y) {
      this.stream.point(x * kx + tx, y * ky + ty);
    }
  });
}

function _default() {
  var k = 1,
      tx = 0,
      ty = 0,
      sx = 1,
      sy = 1,
      transform = _identity.default,
      // scale, translate and reflect
  x0 = null,
      y0,
      x1,
      y1,
      // clip extent
  postclip = _identity.default,
      cache,
      cacheStream,
      projection;

  function reset() {
    cache = cacheStream = null;
    return projection;
  }

  return projection = {
    stream: function (stream) {
      return cache && cacheStream === stream ? cache : cache = transform(postclip(cacheStream = stream));
    },
    postclip: function (_) {
      return arguments.length ? (postclip = _, x0 = y0 = x1 = y1 = null, reset()) : postclip;
    },
    clipExtent: function (_) {
      return arguments.length ? (postclip = _ == null ? (x0 = y0 = x1 = y1 = null, _identity.default) : (0, _rectangle.default)(x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]), reset()) : x0 == null ? null : [[x0, y0], [x1, y1]];
    },
    scale: function (_) {
      return arguments.length ? (transform = scaleTranslate((k = +_) * sx, k * sy, tx, ty), reset()) : k;
    },
    translate: function (_) {
      return arguments.length ? (transform = scaleTranslate(k * sx, k * sy, tx = +_[0], ty = +_[1]), reset()) : [tx, ty];
    },
    reflectX: function (_) {
      return arguments.length ? (transform = scaleTranslate(k * (sx = _ ? -1 : 1), k * sy, tx, ty), reset()) : sx < 0;
    },
    reflectY: function (_) {
      return arguments.length ? (transform = scaleTranslate(k * sx, k * (sy = _ ? -1 : 1), tx, ty), reset()) : sy < 0;
    },
    fitExtent: function (extent, object) {
      return (0, _fit.fitExtent)(projection, extent, object);
    },
    fitSize: function (size, object) {
      return (0, _fit.fitSize)(projection, size, object);
    },
    fitWidth: function (width, object) {
      return (0, _fit.fitWidth)(projection, width, object);
    },
    fitHeight: function (height, object) {
      return (0, _fit.fitHeight)(projection, height, object);
    }
  };
}
},{"../clip/rectangle.js":"../node_modules/d3-geo/src/clip/rectangle.js","../identity.js":"../node_modules/d3-geo/src/identity.js","../transform.js":"../node_modules/d3-geo/src/transform.js","./fit.js":"../node_modules/d3-geo/src/projection/fit.js"}],"../node_modules/d3-geo/src/projection/naturalEarth1.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.naturalEarth1Raw = naturalEarth1Raw;
exports.default = _default;

var _index = _interopRequireDefault(require("./index.js"));

var _math = require("../math.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function naturalEarth1Raw(lambda, phi) {
  var phi2 = phi * phi,
      phi4 = phi2 * phi2;
  return [lambda * (0.8707 - 0.131979 * phi2 + phi4 * (-0.013791 + phi4 * (0.003971 * phi2 - 0.001529 * phi4))), phi * (1.007226 + phi2 * (0.015085 + phi4 * (-0.044475 + 0.028874 * phi2 - 0.005916 * phi4)))];
}

naturalEarth1Raw.invert = function (x, y) {
  var phi = y,
      i = 25,
      delta;

  do {
    var phi2 = phi * phi,
        phi4 = phi2 * phi2;
    phi -= delta = (phi * (1.007226 + phi2 * (0.015085 + phi4 * (-0.044475 + 0.028874 * phi2 - 0.005916 * phi4))) - y) / (1.007226 + phi2 * (0.015085 * 3 + phi4 * (-0.044475 * 7 + 0.028874 * 9 * phi2 - 0.005916 * 11 * phi4)));
  } while ((0, _math.abs)(delta) > _math.epsilon && --i > 0);

  return [x / (0.8707 + (phi2 = phi * phi) * (-0.131979 + phi2 * (-0.013791 + phi2 * phi2 * phi2 * (0.003971 - 0.001529 * phi2)))), phi];
};

function _default() {
  return (0, _index.default)(naturalEarth1Raw).scale(175.295);
}
},{"./index.js":"../node_modules/d3-geo/src/projection/index.js","../math.js":"../node_modules/d3-geo/src/math.js"}],"../node_modules/d3-geo/src/projection/orthographic.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orthographicRaw = orthographicRaw;
exports.default = _default;

var _math = require("../math.js");

var _azimuthal = require("./azimuthal.js");

var _index = _interopRequireDefault(require("./index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function orthographicRaw(x, y) {
  return [(0, _math.cos)(y) * (0, _math.sin)(x), (0, _math.sin)(y)];
}

orthographicRaw.invert = (0, _azimuthal.azimuthalInvert)(_math.asin);

function _default() {
  return (0, _index.default)(orthographicRaw).scale(249.5).clipAngle(90 + _math.epsilon);
}
},{"../math.js":"../node_modules/d3-geo/src/math.js","./azimuthal.js":"../node_modules/d3-geo/src/projection/azimuthal.js","./index.js":"../node_modules/d3-geo/src/projection/index.js"}],"../node_modules/d3-geo/src/projection/stereographic.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stereographicRaw = stereographicRaw;
exports.default = _default;

var _math = require("../math.js");

var _azimuthal = require("./azimuthal.js");

var _index = _interopRequireDefault(require("./index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stereographicRaw(x, y) {
  var cy = (0, _math.cos)(y),
      k = 1 + (0, _math.cos)(x) * cy;
  return [cy * (0, _math.sin)(x) / k, (0, _math.sin)(y) / k];
}

stereographicRaw.invert = (0, _azimuthal.azimuthalInvert)(function (z) {
  return 2 * (0, _math.atan)(z);
});

function _default() {
  return (0, _index.default)(stereographicRaw).scale(250).clipAngle(142);
}
},{"../math.js":"../node_modules/d3-geo/src/math.js","./azimuthal.js":"../node_modules/d3-geo/src/projection/azimuthal.js","./index.js":"../node_modules/d3-geo/src/projection/index.js"}],"../node_modules/d3-geo/src/projection/transverseMercator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transverseMercatorRaw = transverseMercatorRaw;
exports.default = _default;

var _math = require("../math.js");

var _mercator = require("./mercator.js");

function transverseMercatorRaw(lambda, phi) {
  return [(0, _math.log)((0, _math.tan)((_math.halfPi + phi) / 2)), -lambda];
}

transverseMercatorRaw.invert = function (x, y) {
  return [-y, 2 * (0, _math.atan)((0, _math.exp)(x)) - _math.halfPi];
};

function _default() {
  var m = (0, _mercator.mercatorProjection)(transverseMercatorRaw),
      center = m.center,
      rotate = m.rotate;

  m.center = function (_) {
    return arguments.length ? center([-_[1], _[0]]) : (_ = center(), [_[1], -_[0]]);
  };

  m.rotate = function (_) {
    return arguments.length ? rotate([_[0], _[1], _.length > 2 ? _[2] + 90 : 90]) : (_ = rotate(), [_[0], _[1], _[2] - 90]);
  };

  return rotate([0, 0, 90]).scale(159.155);
}
},{"../math.js":"../node_modules/d3-geo/src/math.js","./mercator.js":"../node_modules/d3-geo/src/projection/mercator.js"}],"../node_modules/d3-geo/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "geoArea", {
  enumerable: true,
  get: function () {
    return _area.default;
  }
});
Object.defineProperty(exports, "geoBounds", {
  enumerable: true,
  get: function () {
    return _bounds.default;
  }
});
Object.defineProperty(exports, "geoCentroid", {
  enumerable: true,
  get: function () {
    return _centroid.default;
  }
});
Object.defineProperty(exports, "geoCircle", {
  enumerable: true,
  get: function () {
    return _circle.default;
  }
});
Object.defineProperty(exports, "geoClipAntimeridian", {
  enumerable: true,
  get: function () {
    return _antimeridian.default;
  }
});
Object.defineProperty(exports, "geoClipCircle", {
  enumerable: true,
  get: function () {
    return _circle2.default;
  }
});
Object.defineProperty(exports, "geoClipExtent", {
  enumerable: true,
  get: function () {
    return _extent.default;
  }
});
Object.defineProperty(exports, "geoClipRectangle", {
  enumerable: true,
  get: function () {
    return _rectangle.default;
  }
});
Object.defineProperty(exports, "geoContains", {
  enumerable: true,
  get: function () {
    return _contains.default;
  }
});
Object.defineProperty(exports, "geoDistance", {
  enumerable: true,
  get: function () {
    return _distance.default;
  }
});
Object.defineProperty(exports, "geoGraticule", {
  enumerable: true,
  get: function () {
    return _graticule.default;
  }
});
Object.defineProperty(exports, "geoGraticule10", {
  enumerable: true,
  get: function () {
    return _graticule.graticule10;
  }
});
Object.defineProperty(exports, "geoInterpolate", {
  enumerable: true,
  get: function () {
    return _interpolate.default;
  }
});
Object.defineProperty(exports, "geoLength", {
  enumerable: true,
  get: function () {
    return _length.default;
  }
});
Object.defineProperty(exports, "geoPath", {
  enumerable: true,
  get: function () {
    return _index.default;
  }
});
Object.defineProperty(exports, "geoAlbers", {
  enumerable: true,
  get: function () {
    return _albers.default;
  }
});
Object.defineProperty(exports, "geoAlbersUsa", {
  enumerable: true,
  get: function () {
    return _albersUsa.default;
  }
});
Object.defineProperty(exports, "geoAzimuthalEqualArea", {
  enumerable: true,
  get: function () {
    return _azimuthalEqualArea.default;
  }
});
Object.defineProperty(exports, "geoAzimuthalEqualAreaRaw", {
  enumerable: true,
  get: function () {
    return _azimuthalEqualArea.azimuthalEqualAreaRaw;
  }
});
Object.defineProperty(exports, "geoAzimuthalEquidistant", {
  enumerable: true,
  get: function () {
    return _azimuthalEquidistant.default;
  }
});
Object.defineProperty(exports, "geoAzimuthalEquidistantRaw", {
  enumerable: true,
  get: function () {
    return _azimuthalEquidistant.azimuthalEquidistantRaw;
  }
});
Object.defineProperty(exports, "geoConicConformal", {
  enumerable: true,
  get: function () {
    return _conicConformal.default;
  }
});
Object.defineProperty(exports, "geoConicConformalRaw", {
  enumerable: true,
  get: function () {
    return _conicConformal.conicConformalRaw;
  }
});
Object.defineProperty(exports, "geoConicEqualArea", {
  enumerable: true,
  get: function () {
    return _conicEqualArea.default;
  }
});
Object.defineProperty(exports, "geoConicEqualAreaRaw", {
  enumerable: true,
  get: function () {
    return _conicEqualArea.conicEqualAreaRaw;
  }
});
Object.defineProperty(exports, "geoConicEquidistant", {
  enumerable: true,
  get: function () {
    return _conicEquidistant.default;
  }
});
Object.defineProperty(exports, "geoConicEquidistantRaw", {
  enumerable: true,
  get: function () {
    return _conicEquidistant.conicEquidistantRaw;
  }
});
Object.defineProperty(exports, "geoEqualEarth", {
  enumerable: true,
  get: function () {
    return _equalEarth.default;
  }
});
Object.defineProperty(exports, "geoEqualEarthRaw", {
  enumerable: true,
  get: function () {
    return _equalEarth.equalEarthRaw;
  }
});
Object.defineProperty(exports, "geoEquirectangular", {
  enumerable: true,
  get: function () {
    return _equirectangular.default;
  }
});
Object.defineProperty(exports, "geoEquirectangularRaw", {
  enumerable: true,
  get: function () {
    return _equirectangular.equirectangularRaw;
  }
});
Object.defineProperty(exports, "geoGnomonic", {
  enumerable: true,
  get: function () {
    return _gnomonic.default;
  }
});
Object.defineProperty(exports, "geoGnomonicRaw", {
  enumerable: true,
  get: function () {
    return _gnomonic.gnomonicRaw;
  }
});
Object.defineProperty(exports, "geoIdentity", {
  enumerable: true,
  get: function () {
    return _identity.default;
  }
});
Object.defineProperty(exports, "geoProjection", {
  enumerable: true,
  get: function () {
    return _index2.default;
  }
});
Object.defineProperty(exports, "geoProjectionMutator", {
  enumerable: true,
  get: function () {
    return _index2.projectionMutator;
  }
});
Object.defineProperty(exports, "geoMercator", {
  enumerable: true,
  get: function () {
    return _mercator.default;
  }
});
Object.defineProperty(exports, "geoMercatorRaw", {
  enumerable: true,
  get: function () {
    return _mercator.mercatorRaw;
  }
});
Object.defineProperty(exports, "geoNaturalEarth1", {
  enumerable: true,
  get: function () {
    return _naturalEarth.default;
  }
});
Object.defineProperty(exports, "geoNaturalEarth1Raw", {
  enumerable: true,
  get: function () {
    return _naturalEarth.naturalEarth1Raw;
  }
});
Object.defineProperty(exports, "geoOrthographic", {
  enumerable: true,
  get: function () {
    return _orthographic.default;
  }
});
Object.defineProperty(exports, "geoOrthographicRaw", {
  enumerable: true,
  get: function () {
    return _orthographic.orthographicRaw;
  }
});
Object.defineProperty(exports, "geoStereographic", {
  enumerable: true,
  get: function () {
    return _stereographic.default;
  }
});
Object.defineProperty(exports, "geoStereographicRaw", {
  enumerable: true,
  get: function () {
    return _stereographic.stereographicRaw;
  }
});
Object.defineProperty(exports, "geoTransverseMercator", {
  enumerable: true,
  get: function () {
    return _transverseMercator.default;
  }
});
Object.defineProperty(exports, "geoTransverseMercatorRaw", {
  enumerable: true,
  get: function () {
    return _transverseMercator.transverseMercatorRaw;
  }
});
Object.defineProperty(exports, "geoRotation", {
  enumerable: true,
  get: function () {
    return _rotation.default;
  }
});
Object.defineProperty(exports, "geoStream", {
  enumerable: true,
  get: function () {
    return _stream.default;
  }
});
Object.defineProperty(exports, "geoTransform", {
  enumerable: true,
  get: function () {
    return _transform.default;
  }
});

var _area = _interopRequireDefault(require("./area.js"));

var _bounds = _interopRequireDefault(require("./bounds.js"));

var _centroid = _interopRequireDefault(require("./centroid.js"));

var _circle = _interopRequireDefault(require("./circle.js"));

var _antimeridian = _interopRequireDefault(require("./clip/antimeridian.js"));

var _circle2 = _interopRequireDefault(require("./clip/circle.js"));

var _extent = _interopRequireDefault(require("./clip/extent.js"));

var _rectangle = _interopRequireDefault(require("./clip/rectangle.js"));

var _contains = _interopRequireDefault(require("./contains.js"));

var _distance = _interopRequireDefault(require("./distance.js"));

var _graticule = _interopRequireWildcard(require("./graticule.js"));

var _interpolate = _interopRequireDefault(require("./interpolate.js"));

var _length = _interopRequireDefault(require("./length.js"));

var _index = _interopRequireDefault(require("./path/index.js"));

var _albers = _interopRequireDefault(require("./projection/albers.js"));

var _albersUsa = _interopRequireDefault(require("./projection/albersUsa.js"));

var _azimuthalEqualArea = _interopRequireWildcard(require("./projection/azimuthalEqualArea.js"));

var _azimuthalEquidistant = _interopRequireWildcard(require("./projection/azimuthalEquidistant.js"));

var _conicConformal = _interopRequireWildcard(require("./projection/conicConformal.js"));

var _conicEqualArea = _interopRequireWildcard(require("./projection/conicEqualArea.js"));

var _conicEquidistant = _interopRequireWildcard(require("./projection/conicEquidistant.js"));

var _equalEarth = _interopRequireWildcard(require("./projection/equalEarth.js"));

var _equirectangular = _interopRequireWildcard(require("./projection/equirectangular.js"));

var _gnomonic = _interopRequireWildcard(require("./projection/gnomonic.js"));

var _identity = _interopRequireDefault(require("./projection/identity.js"));

var _index2 = _interopRequireWildcard(require("./projection/index.js"));

var _mercator = _interopRequireWildcard(require("./projection/mercator.js"));

var _naturalEarth = _interopRequireWildcard(require("./projection/naturalEarth1.js"));

var _orthographic = _interopRequireWildcard(require("./projection/orthographic.js"));

var _stereographic = _interopRequireWildcard(require("./projection/stereographic.js"));

var _transverseMercator = _interopRequireWildcard(require("./projection/transverseMercator.js"));

var _rotation = _interopRequireDefault(require("./rotation.js"));

var _stream = _interopRequireDefault(require("./stream.js"));

var _transform = _interopRequireDefault(require("./transform.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./area.js":"../node_modules/d3-geo/src/area.js","./bounds.js":"../node_modules/d3-geo/src/bounds.js","./centroid.js":"../node_modules/d3-geo/src/centroid.js","./circle.js":"../node_modules/d3-geo/src/circle.js","./clip/antimeridian.js":"../node_modules/d3-geo/src/clip/antimeridian.js","./clip/circle.js":"../node_modules/d3-geo/src/clip/circle.js","./clip/extent.js":"../node_modules/d3-geo/src/clip/extent.js","./clip/rectangle.js":"../node_modules/d3-geo/src/clip/rectangle.js","./contains.js":"../node_modules/d3-geo/src/contains.js","./distance.js":"../node_modules/d3-geo/src/distance.js","./graticule.js":"../node_modules/d3-geo/src/graticule.js","./interpolate.js":"../node_modules/d3-geo/src/interpolate.js","./length.js":"../node_modules/d3-geo/src/length.js","./path/index.js":"../node_modules/d3-geo/src/path/index.js","./projection/albers.js":"../node_modules/d3-geo/src/projection/albers.js","./projection/albersUsa.js":"../node_modules/d3-geo/src/projection/albersUsa.js","./projection/azimuthalEqualArea.js":"../node_modules/d3-geo/src/projection/azimuthalEqualArea.js","./projection/azimuthalEquidistant.js":"../node_modules/d3-geo/src/projection/azimuthalEquidistant.js","./projection/conicConformal.js":"../node_modules/d3-geo/src/projection/conicConformal.js","./projection/conicEqualArea.js":"../node_modules/d3-geo/src/projection/conicEqualArea.js","./projection/conicEquidistant.js":"../node_modules/d3-geo/src/projection/conicEquidistant.js","./projection/equalEarth.js":"../node_modules/d3-geo/src/projection/equalEarth.js","./projection/equirectangular.js":"../node_modules/d3-geo/src/projection/equirectangular.js","./projection/gnomonic.js":"../node_modules/d3-geo/src/projection/gnomonic.js","./projection/identity.js":"../node_modules/d3-geo/src/projection/identity.js","./projection/index.js":"../node_modules/d3-geo/src/projection/index.js","./projection/mercator.js":"../node_modules/d3-geo/src/projection/mercator.js","./projection/naturalEarth1.js":"../node_modules/d3-geo/src/projection/naturalEarth1.js","./projection/orthographic.js":"../node_modules/d3-geo/src/projection/orthographic.js","./projection/stereographic.js":"../node_modules/d3-geo/src/projection/stereographic.js","./projection/transverseMercator.js":"../node_modules/d3-geo/src/projection/transverseMercator.js","./rotation.js":"../node_modules/d3-geo/src/rotation.js","./stream.js":"../node_modules/d3-geo/src/stream.js","./transform.js":"../node_modules/d3-geo/src/transform.js"}],"../node_modules/d3-color/src/define.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.extend = extend;

function _default(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}

function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);

  for (var key in definition) prototype[key] = definition[key];

  return prototype;
}
},{}],"../node_modules/d3-color/src/color.js":[function(require,module,exports) {

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Color = Color;
exports.default = color;
exports.rgbConvert = rgbConvert;
exports.rgb = rgb;
exports.Rgb = Rgb;
exports.hslConvert = hslConvert;
exports.hsl = hsl;
exports.brighter = exports.darker = void 0;

var _define = _interopRequireWildcard(require("./define.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Color() {}

var darker = 0.7;
exports.darker = darker;
var brighter = 1 / darker;
exports.brighter = brighter;
var reI = "\\s*([+-]?\\d+)\\s*",
    reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    reHex = /^#([0-9a-f]{3,8})$/,
    reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
    reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
    reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
    reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
    reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
    reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");
var named = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32
};
(0, _define.default)(Color, color, {
  copy: function (channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable: function () {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});

function color_formatHex() {
  return this.rgb().formatHex();
}

function color_formatHsl() {
  return hslConvert(this).formatHsl();
}

function color_formatRgb() {
  return this.rgb().formatRgb();
}

function color(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
  : l === 3 ? new Rgb(m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, (m & 0xf) << 4 | m & 0xf, 1) // #f00
  : l === 8 ? new Rgb(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
  : l === 4 ? new Rgb(m >> 12 & 0xf | m >> 8 & 0xf0, m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, ((m & 0xf) << 4 | m & 0xf) / 0xff) // #f000
  : null // invalid hex
  ) : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
  : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
  : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
  : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
  : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
  : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
  : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
  : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}

function rgbn(n) {
  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}

function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}

function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}

function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}

function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}

(0, _define.default)(Rgb, rgb, (0, _define.extend)(Color, {
  brighter: function (k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function (k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function () {
    return this;
  },
  displayable: function () {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: rgb_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));

function rgb_formatHex() {
  return "#" + hex(this.r) + hex(this.g) + hex(this.b);
}

function rgb_formatRgb() {
  var a = this.opacity;
  a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
  return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
}

function hex(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
  return (value < 16 ? "0" : "") + value.toString(16);
}

function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;else if (l <= 0 || l >= 1) h = s = NaN;else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}

function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl();
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      h = NaN,
      s = max - min,
      l = (max + min) / 2;

  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6;else if (g === max) h = (b - r) / s + 2;else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }

  return new Hsl(h, s, l, o.opacity);
}

function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}

function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

(0, _define.default)(Hsl, hsl, (0, _define.extend)(Color, {
  brighter: function (k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function (k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function () {
    var h = this.h % 360 + (this.h < 0) * 360,
        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l + (l < 0.5 ? l : 1 - l) * s,
        m1 = 2 * l - m2;
    return new Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
  },
  displayable: function () {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl: function () {
    var a = this.opacity;
    a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "hsl(" : "hsla(") + (this.h || 0) + ", " + (this.s || 0) * 100 + "%, " + (this.l || 0) * 100 + "%" + (a === 1 ? ")" : ", " + a + ")");
  }
}));
/* From FvD 13.37, CSS Color Module Level 3 */

function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}
},{"./define.js":"../node_modules/d3-color/src/define.js"}],"../node_modules/d3-color/src/math.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rad2deg = exports.deg2rad = void 0;
var deg2rad = Math.PI / 180;
exports.deg2rad = deg2rad;
var rad2deg = 180 / Math.PI;
exports.rad2deg = rad2deg;
},{}],"../node_modules/d3-color/src/lab.js":[function(require,module,exports) {

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gray = gray;
exports.default = lab;
exports.Lab = Lab;
exports.lch = lch;
exports.hcl = hcl;
exports.Hcl = Hcl;

var _define = _interopRequireWildcard(require("./define.js"));

var _color = require("./color.js");

var _math = require("./math.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// https://observablehq.com/@mbostock/lab-and-rgb
var K = 18,
    Xn = 0.96422,
    Yn = 1,
    Zn = 0.82521,
    t0 = 4 / 29,
    t1 = 6 / 29,
    t2 = 3 * t1 * t1,
    t3 = t1 * t1 * t1;

function labConvert(o) {
  if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
  if (o instanceof Hcl) return hcl2lab(o);
  if (!(o instanceof _color.Rgb)) o = (0, _color.rgbConvert)(o);
  var r = rgb2lrgb(o.r),
      g = rgb2lrgb(o.g),
      b = rgb2lrgb(o.b),
      y = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn),
      x,
      z;
  if (r === g && g === b) x = z = y;else {
    x = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
    z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
  }
  return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
}

function gray(l, opacity) {
  return new Lab(l, 0, 0, opacity == null ? 1 : opacity);
}

function lab(l, a, b, opacity) {
  return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
}

function Lab(l, a, b, opacity) {
  this.l = +l;
  this.a = +a;
  this.b = +b;
  this.opacity = +opacity;
}

(0, _define.default)(Lab, lab, (0, _define.extend)(_color.Color, {
  brighter: function (k) {
    return new Lab(this.l + K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  darker: function (k) {
    return new Lab(this.l - K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  rgb: function () {
    var y = (this.l + 16) / 116,
        x = isNaN(this.a) ? y : y + this.a / 500,
        z = isNaN(this.b) ? y : y - this.b / 200;
    x = Xn * lab2xyz(x);
    y = Yn * lab2xyz(y);
    z = Zn * lab2xyz(z);
    return new _color.Rgb(lrgb2rgb(3.1338561 * x - 1.6168667 * y - 0.4906146 * z), lrgb2rgb(-0.9787684 * x + 1.9161415 * y + 0.0334540 * z), lrgb2rgb(0.0719453 * x - 0.2289914 * y + 1.4052427 * z), this.opacity);
  }
}));

function xyz2lab(t) {
  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
}

function lab2xyz(t) {
  return t > t1 ? t * t * t : t2 * (t - t0);
}

function lrgb2rgb(x) {
  return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
}

function rgb2lrgb(x) {
  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}

function hclConvert(o) {
  if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
  if (!(o instanceof Lab)) o = labConvert(o);
  if (o.a === 0 && o.b === 0) return new Hcl(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);

  var h = Math.atan2(o.b, o.a) * _math.rad2deg;

  return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
}

function lch(l, c, h, opacity) {
  return arguments.length === 1 ? hclConvert(l) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}

function hcl(h, c, l, opacity) {
  return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}

function Hcl(h, c, l, opacity) {
  this.h = +h;
  this.c = +c;
  this.l = +l;
  this.opacity = +opacity;
}

function hcl2lab(o) {
  if (isNaN(o.h)) return new Lab(o.l, 0, 0, o.opacity);
  var h = o.h * _math.deg2rad;
  return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
}

(0, _define.default)(Hcl, hcl, (0, _define.extend)(_color.Color, {
  brighter: function (k) {
    return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);
  },
  darker: function (k) {
    return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);
  },
  rgb: function () {
    return hcl2lab(this).rgb();
  }
}));
},{"./define.js":"../node_modules/d3-color/src/define.js","./color.js":"../node_modules/d3-color/src/color.js","./math.js":"../node_modules/d3-color/src/math.js"}],"../node_modules/d3-color/src/cubehelix.js":[function(require,module,exports) {

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cubehelix;
exports.Cubehelix = Cubehelix;

var _define = _interopRequireWildcard(require("./define.js"));

var _color = require("./color.js");

var _math = require("./math.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var A = -0.14861,
    B = +1.78277,
    C = -0.29227,
    D = -0.90649,
    E = +1.97294,
    ED = E * D,
    EB = E * B,
    BC_DA = B * C - D * A;

function cubehelixConvert(o) {
  if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof _color.Rgb)) o = (0, _color.rgbConvert)(o);
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),
      bl = b - l,
      k = (E * (g - l) - C * bl) / D,
      s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)),
      // NaN if l=0 or l=1
  h = s ? Math.atan2(k, bl) * _math.rad2deg - 120 : NaN;
  return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
}

function cubehelix(h, s, l, opacity) {
  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
}

function Cubehelix(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

(0, _define.default)(Cubehelix, cubehelix, (0, _define.extend)(_color.Color, {
  brighter: function (k) {
    k = k == null ? _color.brighter : Math.pow(_color.brighter, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function (k) {
    k = k == null ? _color.darker : Math.pow(_color.darker, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function () {
    var h = isNaN(this.h) ? 0 : (this.h + 120) * _math.deg2rad,
        l = +this.l,
        a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
        cosh = Math.cos(h),
        sinh = Math.sin(h);
    return new _color.Rgb(255 * (l + a * (A * cosh + B * sinh)), 255 * (l + a * (C * cosh + D * sinh)), 255 * (l + a * (E * cosh)), this.opacity);
  }
}));
},{"./define.js":"../node_modules/d3-color/src/define.js","./color.js":"../node_modules/d3-color/src/color.js","./math.js":"../node_modules/d3-color/src/math.js"}],"../node_modules/d3-color/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "color", {
  enumerable: true,
  get: function () {
    return _color.default;
  }
});
Object.defineProperty(exports, "rgb", {
  enumerable: true,
  get: function () {
    return _color.rgb;
  }
});
Object.defineProperty(exports, "hsl", {
  enumerable: true,
  get: function () {
    return _color.hsl;
  }
});
Object.defineProperty(exports, "lab", {
  enumerable: true,
  get: function () {
    return _lab.default;
  }
});
Object.defineProperty(exports, "hcl", {
  enumerable: true,
  get: function () {
    return _lab.hcl;
  }
});
Object.defineProperty(exports, "lch", {
  enumerable: true,
  get: function () {
    return _lab.lch;
  }
});
Object.defineProperty(exports, "gray", {
  enumerable: true,
  get: function () {
    return _lab.gray;
  }
});
Object.defineProperty(exports, "cubehelix", {
  enumerable: true,
  get: function () {
    return _cubehelix.default;
  }
});

var _color = _interopRequireWildcard(require("./color.js"));

var _lab = _interopRequireWildcard(require("./lab.js"));

var _cubehelix = _interopRequireDefault(require("./cubehelix.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
},{"./color.js":"../node_modules/d3-color/src/color.js","./lab.js":"../node_modules/d3-color/src/lab.js","./cubehelix.js":"../node_modules/d3-color/src/cubehelix.js"}],"../node_modules/d3-interpolate/src/basis.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.basis = basis;
exports.default = _default;

function basis(t1, v0, v1, v2, v3) {
  var t2 = t1 * t1,
      t3 = t2 * t1;
  return ((1 - 3 * t1 + 3 * t2 - t3) * v0 + (4 - 6 * t2 + 3 * t3) * v1 + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2 + t3 * v3) / 6;
}

function _default(values) {
  var n = values.length - 1;
  return function (t) {
    var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n),
        v1 = values[i],
        v2 = values[i + 1],
        v0 = i > 0 ? values[i - 1] : 2 * v1 - v2,
        v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}
},{}],"../node_modules/d3-interpolate/src/basisClosed.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _basis = require("./basis.js");

function _default(values) {
  var n = values.length;
  return function (t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n),
        v0 = values[(i + n - 1) % n],
        v1 = values[i % n],
        v2 = values[(i + 1) % n],
        v3 = values[(i + 2) % n];
    return (0, _basis.basis)((t - i / n) * n, v0, v1, v2, v3);
  };
}
},{"./basis.js":"../node_modules/d3-interpolate/src/basis.js"}],"../node_modules/d3-interpolate/src/constant.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(x) {
  return function () {
    return x;
  };
}
},{}],"../node_modules/d3-interpolate/src/color.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hue = hue;
exports.gamma = gamma;
exports.default = nogamma;

var _constant = _interopRequireDefault(require("./constant.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function linear(a, d) {
  return function (t) {
    return a + t * d;
  };
}

function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function (t) {
    return Math.pow(a + t * b, y);
  };
}

function hue(a, b) {
  var d = b - a;
  return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : (0, _constant.default)(isNaN(a) ? b : a);
}

function gamma(y) {
  return (y = +y) === 1 ? nogamma : function (a, b) {
    return b - a ? exponential(a, b, y) : (0, _constant.default)(isNaN(a) ? b : a);
  };
}

function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : (0, _constant.default)(isNaN(a) ? b : a);
}
},{"./constant.js":"../node_modules/d3-interpolate/src/constant.js"}],"../node_modules/d3-interpolate/src/rgb.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rgbBasisClosed = exports.rgbBasis = exports.default = void 0;

var _d3Color = require("d3-color");

var _basis = _interopRequireDefault(require("./basis.js"));

var _basisClosed = _interopRequireDefault(require("./basisClosed.js"));

var _color = _interopRequireWildcard(require("./color.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function rgbGamma(y) {
  var color = (0, _color.gamma)(y);

  function rgb(start, end) {
    var r = color((start = (0, _d3Color.rgb)(start)).r, (end = (0, _d3Color.rgb)(end)).r),
        g = color(start.g, end.g),
        b = color(start.b, end.b),
        opacity = (0, _color.default)(start.opacity, end.opacity);
    return function (t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }

  rgb.gamma = rgbGamma;
  return rgb;
}(1);

exports.default = _default;

function rgbSpline(spline) {
  return function (colors) {
    var n = colors.length,
        r = new Array(n),
        g = new Array(n),
        b = new Array(n),
        i,
        color;

    for (i = 0; i < n; ++i) {
      color = (0, _d3Color.rgb)(colors[i]);
      r[i] = color.r || 0;
      g[i] = color.g || 0;
      b[i] = color.b || 0;
    }

    r = spline(r);
    g = spline(g);
    b = spline(b);
    color.opacity = 1;
    return function (t) {
      color.r = r(t);
      color.g = g(t);
      color.b = b(t);
      return color + "";
    };
  };
}

var rgbBasis = rgbSpline(_basis.default);
exports.rgbBasis = rgbBasis;
var rgbBasisClosed = rgbSpline(_basisClosed.default);
exports.rgbBasisClosed = rgbBasisClosed;
},{"d3-color":"../node_modules/d3-color/src/index.js","./basis.js":"../node_modules/d3-interpolate/src/basis.js","./basisClosed.js":"../node_modules/d3-interpolate/src/basisClosed.js","./color.js":"../node_modules/d3-interpolate/src/color.js"}],"../node_modules/d3-interpolate/src/numberArray.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.isNumberArray = isNumberArray;

function _default(a, b) {
  if (!b) b = [];
  var n = a ? Math.min(b.length, a.length) : 0,
      c = b.slice(),
      i;
  return function (t) {
    for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b[i] * t;

    return c;
  };
}

function isNumberArray(x) {
  return ArrayBuffer.isView(x) && !(x instanceof DataView);
}
},{}],"../node_modules/d3-interpolate/src/array.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.genericArray = genericArray;

var _value = _interopRequireDefault(require("./value.js"));

var _numberArray = _interopRequireWildcard(require("./numberArray.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(a, b) {
  return ((0, _numberArray.isNumberArray)(b) ? _numberArray.default : genericArray)(a, b);
}

function genericArray(a, b) {
  var nb = b ? b.length : 0,
      na = a ? Math.min(nb, a.length) : 0,
      x = new Array(na),
      c = new Array(nb),
      i;

  for (i = 0; i < na; ++i) x[i] = (0, _value.default)(a[i], b[i]);

  for (; i < nb; ++i) c[i] = b[i];

  return function (t) {
    for (i = 0; i < na; ++i) c[i] = x[i](t);

    return c;
  };
}
},{"./value.js":"../node_modules/d3-interpolate/src/value.js","./numberArray.js":"../node_modules/d3-interpolate/src/numberArray.js"}],"../node_modules/d3-interpolate/src/date.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(a, b) {
  var d = new Date();
  return a = +a, b = +b, function (t) {
    return d.setTime(a * (1 - t) + b * t), d;
  };
}
},{}],"../node_modules/d3-interpolate/src/number.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(a, b) {
  return a = +a, b = +b, function (t) {
    return a * (1 - t) + b * t;
  };
}
},{}],"../node_modules/d3-interpolate/src/object.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _value = _interopRequireDefault(require("./value.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(a, b) {
  var i = {},
      c = {},
      k;
  if (a === null || typeof a !== "object") a = {};
  if (b === null || typeof b !== "object") b = {};

  for (k in b) {
    if (k in a) {
      i[k] = (0, _value.default)(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }

  return function (t) {
    for (k in i) c[k] = i[k](t);

    return c;
  };
}
},{"./value.js":"../node_modules/d3-interpolate/src/value.js"}],"../node_modules/d3-interpolate/src/string.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _number = _interopRequireDefault(require("./number.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    reB = new RegExp(reA.source, "g");

function zero(b) {
  return function () {
    return b;
  };
}

function one(b) {
  return function (t) {
    return b(t) + "";
  };
}

function _default(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0,
      // scan index for next number in b
  am,
      // current match in a
  bm,
      // current match in b
  bs,
      // string preceding current number in b, if any
  i = -1,
      // index in s
  s = [],
      // string constants and placeholders
  q = []; // number interpolators
  // Coerce inputs to strings.

  a = a + "", b = b + ""; // Interpolate pairs of numbers in a & b.

  while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) {
      // a string precedes the next number in b
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }

    if ((am = am[0]) === (bm = bm[0])) {
      // numbers in a & b match
      if (s[i]) s[i] += bm; // coalesce with previous string
      else s[++i] = bm;
    } else {
      // interpolate non-matching numbers
      s[++i] = null;
      q.push({
        i: i,
        x: (0, _number.default)(am, bm)
      });
    }

    bi = reB.lastIndex;
  } // Add remains of b.


  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs; // coalesce with previous string
    else s[++i] = bs;
  } // Special optimization for only a single match.
  // Otherwise, interpolate each of the numbers and rejoin the string.


  return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function (t) {
    for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);

    return s.join("");
  });
}
},{"./number.js":"../node_modules/d3-interpolate/src/number.js"}],"../node_modules/d3-interpolate/src/value.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _d3Color = require("d3-color");

var _rgb = _interopRequireDefault(require("./rgb.js"));

var _array = require("./array.js");

var _date = _interopRequireDefault(require("./date.js"));

var _number = _interopRequireDefault(require("./number.js"));

var _object = _interopRequireDefault(require("./object.js"));

var _string = _interopRequireDefault(require("./string.js"));

var _constant = _interopRequireDefault(require("./constant.js"));

var _numberArray = _interopRequireWildcard(require("./numberArray.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(a, b) {
  var t = typeof b,
      c;
  return b == null || t === "boolean" ? (0, _constant.default)(b) : (t === "number" ? _number.default : t === "string" ? (c = (0, _d3Color.color)(b)) ? (b = c, _rgb.default) : _string.default : b instanceof _d3Color.color ? _rgb.default : b instanceof Date ? _date.default : (0, _numberArray.isNumberArray)(b) ? _numberArray.default : Array.isArray(b) ? _array.genericArray : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? _object.default : _number.default)(a, b);
}
},{"d3-color":"../node_modules/d3-color/src/index.js","./rgb.js":"../node_modules/d3-interpolate/src/rgb.js","./array.js":"../node_modules/d3-interpolate/src/array.js","./date.js":"../node_modules/d3-interpolate/src/date.js","./number.js":"../node_modules/d3-interpolate/src/number.js","./object.js":"../node_modules/d3-interpolate/src/object.js","./string.js":"../node_modules/d3-interpolate/src/string.js","./constant.js":"../node_modules/d3-interpolate/src/constant.js","./numberArray.js":"../node_modules/d3-interpolate/src/numberArray.js"}],"../node_modules/d3-interpolate/src/discrete.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(range) {
  var n = range.length;
  return function (t) {
    return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
  };
}
},{}],"../node_modules/d3-interpolate/src/hue.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _color = require("./color.js");

function _default(a, b) {
  var i = (0, _color.hue)(+a, +b);
  return function (t) {
    var x = i(t);
    return x - 360 * Math.floor(x / 360);
  };
}
},{"./color.js":"../node_modules/d3-interpolate/src/color.js"}],"../node_modules/d3-interpolate/src/round.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(a, b) {
  return a = +a, b = +b, function (t) {
    return Math.round(a * (1 - t) + b * t);
  };
}
},{}],"../node_modules/d3-interpolate/src/transform/decompose.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.identity = void 0;
var degrees = 180 / Math.PI;
var identity = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
exports.identity = identity;

function _default(a, b, c, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX: scaleX,
    scaleY: scaleY
  };
}
},{}],"../node_modules/d3-interpolate/src/transform/parse.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseCss = parseCss;
exports.parseSvg = parseSvg;

var _decompose = _interopRequireWildcard(require("./decompose.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var cssNode, cssRoot, cssView, svgNode;

function parseCss(value) {
  if (value === "none") return _decompose.identity;
  if (!cssNode) cssNode = document.createElement("DIV"), cssRoot = document.documentElement, cssView = document.defaultView;
  cssNode.style.transform = value;
  value = cssView.getComputedStyle(cssRoot.appendChild(cssNode), null).getPropertyValue("transform");
  cssRoot.removeChild(cssNode);
  value = value.slice(7, -1).split(",");
  return (0, _decompose.default)(+value[0], +value[1], +value[2], +value[3], +value[4], +value[5]);
}

function parseSvg(value) {
  if (value == null) return _decompose.identity;
  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate())) return _decompose.identity;
  value = value.matrix;
  return (0, _decompose.default)(value.a, value.b, value.c, value.d, value.e, value.f);
}
},{"./decompose.js":"../node_modules/d3-interpolate/src/transform/decompose.js"}],"../node_modules/d3-interpolate/src/transform/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interpolateTransformSvg = exports.interpolateTransformCss = void 0;

var _number = _interopRequireDefault(require("../number.js"));

var _parse = require("./parse.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function interpolateTransform(parse, pxComma, pxParen, degParen) {
  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }

  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({
        i: i - 4,
        x: (0, _number.default)(xa, xb)
      }, {
        i: i - 2,
        x: (0, _number.default)(ya, yb)
      });
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }

  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180) b += 360;else if (b - a > 180) a += 360; // shortest path

      q.push({
        i: s.push(pop(s) + "rotate(", null, degParen) - 2,
        x: (0, _number.default)(a, b)
      });
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }

  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({
        i: s.push(pop(s) + "skewX(", null, degParen) - 2,
        x: (0, _number.default)(a, b)
      });
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }

  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({
        i: i - 4,
        x: (0, _number.default)(xa, xb)
      }, {
        i: i - 2,
        x: (0, _number.default)(ya, yb)
      });
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }

  return function (a, b) {
    var s = [],
        // string constants and placeholders
    q = []; // number interpolators

    a = parse(a), b = parse(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null; // gc

    return function (t) {
      var i = -1,
          n = q.length,
          o;

      while (++i < n) s[(o = q[i]).i] = o.x(t);

      return s.join("");
    };
  };
}

var interpolateTransformCss = interpolateTransform(_parse.parseCss, "px, ", "px)", "deg)");
exports.interpolateTransformCss = interpolateTransformCss;
var interpolateTransformSvg = interpolateTransform(_parse.parseSvg, ", ", ")", ")");
exports.interpolateTransformSvg = interpolateTransformSvg;
},{"../number.js":"../node_modules/d3-interpolate/src/number.js","./parse.js":"../node_modules/d3-interpolate/src/transform/parse.js"}],"../node_modules/d3-interpolate/src/zoom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var rho = Math.SQRT2,
    rho2 = 2,
    rho4 = 4,
    epsilon2 = 1e-12;

function cosh(x) {
  return ((x = Math.exp(x)) + 1 / x) / 2;
}

function sinh(x) {
  return ((x = Math.exp(x)) - 1 / x) / 2;
}

function tanh(x) {
  return ((x = Math.exp(2 * x)) - 1) / (x + 1);
} // p0 = [ux0, uy0, w0]
// p1 = [ux1, uy1, w1]


function _default(p0, p1) {
  var ux0 = p0[0],
      uy0 = p0[1],
      w0 = p0[2],
      ux1 = p1[0],
      uy1 = p1[1],
      w1 = p1[2],
      dx = ux1 - ux0,
      dy = uy1 - uy0,
      d2 = dx * dx + dy * dy,
      i,
      S; // Special case for u0 ≅ u1.

  if (d2 < epsilon2) {
    S = Math.log(w1 / w0) / rho;

    i = function (t) {
      return [ux0 + t * dx, uy0 + t * dy, w0 * Math.exp(rho * t * S)];
    };
  } // General case.
  else {
      var d1 = Math.sqrt(d2),
          b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
          b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
          r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
          r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
      S = (r1 - r0) / rho;

      i = function (t) {
        var s = t * S,
            coshr0 = cosh(r0),
            u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
        return [ux0 + u * dx, uy0 + u * dy, w0 * coshr0 / cosh(rho * s + r0)];
      };
    }

  i.duration = S * 1000;
  return i;
}
},{}],"../node_modules/d3-interpolate/src/hsl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hslLong = exports.default = void 0;

var _d3Color = require("d3-color");

var _color = _interopRequireWildcard(require("./color.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function hsl(hue) {
  return function (start, end) {
    var h = hue((start = (0, _d3Color.hsl)(start)).h, (end = (0, _d3Color.hsl)(end)).h),
        s = (0, _color.default)(start.s, end.s),
        l = (0, _color.default)(start.l, end.l),
        opacity = (0, _color.default)(start.opacity, end.opacity);
    return function (t) {
      start.h = h(t);
      start.s = s(t);
      start.l = l(t);
      start.opacity = opacity(t);
      return start + "";
    };
  };
}

var _default = hsl(_color.hue);

exports.default = _default;
var hslLong = hsl(_color.default);
exports.hslLong = hslLong;
},{"d3-color":"../node_modules/d3-color/src/index.js","./color.js":"../node_modules/d3-interpolate/src/color.js"}],"../node_modules/d3-interpolate/src/lab.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = lab;

var _d3Color = require("d3-color");

var _color = _interopRequireDefault(require("./color.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function lab(start, end) {
  var l = (0, _color.default)((start = (0, _d3Color.lab)(start)).l, (end = (0, _d3Color.lab)(end)).l),
      a = (0, _color.default)(start.a, end.a),
      b = (0, _color.default)(start.b, end.b),
      opacity = (0, _color.default)(start.opacity, end.opacity);
  return function (t) {
    start.l = l(t);
    start.a = a(t);
    start.b = b(t);
    start.opacity = opacity(t);
    return start + "";
  };
}
},{"d3-color":"../node_modules/d3-color/src/index.js","./color.js":"../node_modules/d3-interpolate/src/color.js"}],"../node_modules/d3-interpolate/src/hcl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hclLong = exports.default = void 0;

var _d3Color = require("d3-color");

var _color = _interopRequireWildcard(require("./color.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function hcl(hue) {
  return function (start, end) {
    var h = hue((start = (0, _d3Color.hcl)(start)).h, (end = (0, _d3Color.hcl)(end)).h),
        c = (0, _color.default)(start.c, end.c),
        l = (0, _color.default)(start.l, end.l),
        opacity = (0, _color.default)(start.opacity, end.opacity);
    return function (t) {
      start.h = h(t);
      start.c = c(t);
      start.l = l(t);
      start.opacity = opacity(t);
      return start + "";
    };
  };
}

var _default = hcl(_color.hue);

exports.default = _default;
var hclLong = hcl(_color.default);
exports.hclLong = hclLong;
},{"d3-color":"../node_modules/d3-color/src/index.js","./color.js":"../node_modules/d3-interpolate/src/color.js"}],"../node_modules/d3-interpolate/src/cubehelix.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cubehelixLong = exports.default = void 0;

var _d3Color = require("d3-color");

var _color = _interopRequireWildcard(require("./color.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function cubehelix(hue) {
  return function cubehelixGamma(y) {
    y = +y;

    function cubehelix(start, end) {
      var h = hue((start = (0, _d3Color.cubehelix)(start)).h, (end = (0, _d3Color.cubehelix)(end)).h),
          s = (0, _color.default)(start.s, end.s),
          l = (0, _color.default)(start.l, end.l),
          opacity = (0, _color.default)(start.opacity, end.opacity);
      return function (t) {
        start.h = h(t);
        start.s = s(t);
        start.l = l(Math.pow(t, y));
        start.opacity = opacity(t);
        return start + "";
      };
    }

    cubehelix.gamma = cubehelixGamma;
    return cubehelix;
  }(1);
}

var _default = cubehelix(_color.hue);

exports.default = _default;
var cubehelixLong = cubehelix(_color.default);
exports.cubehelixLong = cubehelixLong;
},{"d3-color":"../node_modules/d3-color/src/index.js","./color.js":"../node_modules/d3-interpolate/src/color.js"}],"../node_modules/d3-interpolate/src/piecewise.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = piecewise;

function piecewise(interpolate, values) {
  var i = 0,
      n = values.length - 1,
      v = values[0],
      I = new Array(n < 0 ? 0 : n);

  while (i < n) I[i] = interpolate(v, v = values[++i]);

  return function (t) {
    var i = Math.max(0, Math.min(n - 1, Math.floor(t *= n)));
    return I[i](t - i);
  };
}
},{}],"../node_modules/d3-interpolate/src/quantize.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(interpolator, n) {
  var samples = new Array(n);

  for (var i = 0; i < n; ++i) samples[i] = interpolator(i / (n - 1));

  return samples;
}
},{}],"../node_modules/d3-interpolate/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "interpolate", {
  enumerable: true,
  get: function () {
    return _value.default;
  }
});
Object.defineProperty(exports, "interpolateArray", {
  enumerable: true,
  get: function () {
    return _array.default;
  }
});
Object.defineProperty(exports, "interpolateBasis", {
  enumerable: true,
  get: function () {
    return _basis.default;
  }
});
Object.defineProperty(exports, "interpolateBasisClosed", {
  enumerable: true,
  get: function () {
    return _basisClosed.default;
  }
});
Object.defineProperty(exports, "interpolateDate", {
  enumerable: true,
  get: function () {
    return _date.default;
  }
});
Object.defineProperty(exports, "interpolateDiscrete", {
  enumerable: true,
  get: function () {
    return _discrete.default;
  }
});
Object.defineProperty(exports, "interpolateHue", {
  enumerable: true,
  get: function () {
    return _hue.default;
  }
});
Object.defineProperty(exports, "interpolateNumber", {
  enumerable: true,
  get: function () {
    return _number.default;
  }
});
Object.defineProperty(exports, "interpolateNumberArray", {
  enumerable: true,
  get: function () {
    return _numberArray.default;
  }
});
Object.defineProperty(exports, "interpolateObject", {
  enumerable: true,
  get: function () {
    return _object.default;
  }
});
Object.defineProperty(exports, "interpolateRound", {
  enumerable: true,
  get: function () {
    return _round.default;
  }
});
Object.defineProperty(exports, "interpolateString", {
  enumerable: true,
  get: function () {
    return _string.default;
  }
});
Object.defineProperty(exports, "interpolateTransformCss", {
  enumerable: true,
  get: function () {
    return _index.interpolateTransformCss;
  }
});
Object.defineProperty(exports, "interpolateTransformSvg", {
  enumerable: true,
  get: function () {
    return _index.interpolateTransformSvg;
  }
});
Object.defineProperty(exports, "interpolateZoom", {
  enumerable: true,
  get: function () {
    return _zoom.default;
  }
});
Object.defineProperty(exports, "interpolateRgb", {
  enumerable: true,
  get: function () {
    return _rgb.default;
  }
});
Object.defineProperty(exports, "interpolateRgbBasis", {
  enumerable: true,
  get: function () {
    return _rgb.rgbBasis;
  }
});
Object.defineProperty(exports, "interpolateRgbBasisClosed", {
  enumerable: true,
  get: function () {
    return _rgb.rgbBasisClosed;
  }
});
Object.defineProperty(exports, "interpolateHsl", {
  enumerable: true,
  get: function () {
    return _hsl.default;
  }
});
Object.defineProperty(exports, "interpolateHslLong", {
  enumerable: true,
  get: function () {
    return _hsl.hslLong;
  }
});
Object.defineProperty(exports, "interpolateLab", {
  enumerable: true,
  get: function () {
    return _lab.default;
  }
});
Object.defineProperty(exports, "interpolateHcl", {
  enumerable: true,
  get: function () {
    return _hcl.default;
  }
});
Object.defineProperty(exports, "interpolateHclLong", {
  enumerable: true,
  get: function () {
    return _hcl.hclLong;
  }
});
Object.defineProperty(exports, "interpolateCubehelix", {
  enumerable: true,
  get: function () {
    return _cubehelix.default;
  }
});
Object.defineProperty(exports, "interpolateCubehelixLong", {
  enumerable: true,
  get: function () {
    return _cubehelix.cubehelixLong;
  }
});
Object.defineProperty(exports, "piecewise", {
  enumerable: true,
  get: function () {
    return _piecewise.default;
  }
});
Object.defineProperty(exports, "quantize", {
  enumerable: true,
  get: function () {
    return _quantize.default;
  }
});

var _value = _interopRequireDefault(require("./value.js"));

var _array = _interopRequireDefault(require("./array.js"));

var _basis = _interopRequireDefault(require("./basis.js"));

var _basisClosed = _interopRequireDefault(require("./basisClosed.js"));

var _date = _interopRequireDefault(require("./date.js"));

var _discrete = _interopRequireDefault(require("./discrete.js"));

var _hue = _interopRequireDefault(require("./hue.js"));

var _number = _interopRequireDefault(require("./number.js"));

var _numberArray = _interopRequireDefault(require("./numberArray.js"));

var _object = _interopRequireDefault(require("./object.js"));

var _round = _interopRequireDefault(require("./round.js"));

var _string = _interopRequireDefault(require("./string.js"));

var _index = require("./transform/index.js");

var _zoom = _interopRequireDefault(require("./zoom.js"));

var _rgb = _interopRequireWildcard(require("./rgb.js"));

var _hsl = _interopRequireWildcard(require("./hsl.js"));

var _lab = _interopRequireDefault(require("./lab.js"));

var _hcl = _interopRequireWildcard(require("./hcl.js"));

var _cubehelix = _interopRequireWildcard(require("./cubehelix.js"));

var _piecewise = _interopRequireDefault(require("./piecewise.js"));

var _quantize = _interopRequireDefault(require("./quantize.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./value.js":"../node_modules/d3-interpolate/src/value.js","./array.js":"../node_modules/d3-interpolate/src/array.js","./basis.js":"../node_modules/d3-interpolate/src/basis.js","./basisClosed.js":"../node_modules/d3-interpolate/src/basisClosed.js","./date.js":"../node_modules/d3-interpolate/src/date.js","./discrete.js":"../node_modules/d3-interpolate/src/discrete.js","./hue.js":"../node_modules/d3-interpolate/src/hue.js","./number.js":"../node_modules/d3-interpolate/src/number.js","./numberArray.js":"../node_modules/d3-interpolate/src/numberArray.js","./object.js":"../node_modules/d3-interpolate/src/object.js","./round.js":"../node_modules/d3-interpolate/src/round.js","./string.js":"../node_modules/d3-interpolate/src/string.js","./transform/index.js":"../node_modules/d3-interpolate/src/transform/index.js","./zoom.js":"../node_modules/d3-interpolate/src/zoom.js","./rgb.js":"../node_modules/d3-interpolate/src/rgb.js","./hsl.js":"../node_modules/d3-interpolate/src/hsl.js","./lab.js":"../node_modules/d3-interpolate/src/lab.js","./hcl.js":"../node_modules/d3-interpolate/src/hcl.js","./cubehelix.js":"../node_modules/d3-interpolate/src/cubehelix.js","./piecewise.js":"../node_modules/d3-interpolate/src/piecewise.js","./quantize.js":"../node_modules/d3-interpolate/src/quantize.js"}],"../node_modules/d3-dispatch/src/dispatch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var noop = {
  value: function () {}
};

function dispatch() {
  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + "") || t in _ || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
    _[t] = [];
  }

  return new Dispatch(_);
}

function Dispatch(_) {
  this._ = _;
}

function parseTypenames(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function (t) {
    var name = "",
        i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    return {
      type: t,
      name: name
    };
  });
}

Dispatch.prototype = dispatch.prototype = {
  constructor: Dispatch,
  on: function (typename, callback) {
    var _ = this._,
        T = parseTypenames(typename + "", _),
        t,
        i = -1,
        n = T.length; // If no callback was specified, return the callback of the given type and name.

    if (arguments.length < 2) {
      while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;

      return;
    } // If a type was specified, set the callback for the given type and name.
    // Otherwise, if a null callback was specified, remove callbacks of the given name.


    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);

    while (++i < n) {
      if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);else if (callback == null) for (t in _) _[t] = set(_[t], typename.name, null);
    }

    return this;
  },
  copy: function () {
    var copy = {},
        _ = this._;

    for (var t in _) copy[t] = _[t].slice();

    return new Dispatch(copy);
  },
  call: function (type, that) {
    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);

    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  },
  apply: function (type, that, args) {
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);

    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  }
};

function get(type, name) {
  for (var i = 0, n = type.length, c; i < n; ++i) {
    if ((c = type[i]).name === name) {
      return c.value;
    }
  }
}

function set(type, name, callback) {
  for (var i = 0, n = type.length; i < n; ++i) {
    if (type[i].name === name) {
      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
      break;
    }
  }

  if (callback != null) type.push({
    name: name,
    value: callback
  });
  return type;
}

var _default = dispatch;
exports.default = _default;
},{}],"../node_modules/d3-dispatch/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "dispatch", {
  enumerable: true,
  get: function () {
    return _dispatch.default;
  }
});

var _dispatch = _interopRequireDefault(require("./dispatch.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./dispatch.js":"../node_modules/d3-dispatch/src/dispatch.js"}],"../node_modules/d3-timer/src/timer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.now = now;
exports.Timer = Timer;
exports.timer = timer;
exports.timerFlush = timerFlush;
var frame = 0,
    // is an animation frame pending?
timeout = 0,
    // is a timeout pending?
interval = 0,
    // are any timers active?
pokeDelay = 1000,
    // how frequently we check for clock skew
taskHead,
    taskTail,
    clockLast = 0,
    clockNow = 0,
    clockSkew = 0,
    clock = typeof performance === "object" && performance.now ? performance : Date,
    setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function (f) {
  setTimeout(f, 17);
};

function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}

function clearNow() {
  clockNow = 0;
}

function Timer() {
  this._call = this._time = this._next = null;
}

Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function (callback, delay, time) {
    if (typeof callback !== "function") throw new TypeError("callback is not a function");
    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);

    if (!this._next && taskTail !== this) {
      if (taskTail) taskTail._next = this;else taskHead = this;
      taskTail = this;
    }

    this._call = callback;
    this._time = time;
    sleep();
  },
  stop: function () {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};

function timer(callback, delay, time) {
  var t = new Timer();
  t.restart(callback, delay, time);
  return t;
}

function timerFlush() {
  now(); // Get the current time, if not already set.

  ++frame; // Pretend we’ve set an alarm, if we haven’t already.

  var t = taskHead,
      e;

  while (t) {
    if ((e = clockNow - t._time) >= 0) t._call.call(null, e);
    t = t._next;
  }

  --frame;
}

function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  frame = timeout = 0;

  try {
    timerFlush();
  } finally {
    frame = 0;
    nap();
    clockNow = 0;
  }
}

function poke() {
  var now = clock.now(),
      delay = now - clockLast;
  if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
}

function nap() {
  var t0,
      t1 = taskHead,
      t2,
      time = Infinity;

  while (t1) {
    if (t1._call) {
      if (time > t1._time) time = t1._time;
      t0 = t1, t1 = t1._next;
    } else {
      t2 = t1._next, t1._next = null;
      t1 = t0 ? t0._next = t2 : taskHead = t2;
    }
  }

  taskTail = t0;
  sleep(time);
}

function sleep(time) {
  if (frame) return; // Soonest alarm already set, or will be.

  if (timeout) timeout = clearTimeout(timeout);
  var delay = time - clockNow; // Strictly less than if we recomputed clockNow.

  if (delay > 24) {
    if (time < Infinity) timeout = setTimeout(wake, time - clock.now() - clockSkew);
    if (interval) interval = clearInterval(interval);
  } else {
    if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    frame = 1, setFrame(wake);
  }
}
},{}],"../node_modules/d3-timer/src/timeout.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _timer = require("./timer.js");

function _default(callback, delay, time) {
  var t = new _timer.Timer();
  delay = delay == null ? 0 : +delay;
  t.restart(function (elapsed) {
    t.stop();
    callback(elapsed + delay);
  }, delay, time);
  return t;
}
},{"./timer.js":"../node_modules/d3-timer/src/timer.js"}],"../node_modules/d3-timer/src/interval.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _timer = require("./timer.js");

function _default(callback, delay, time) {
  var t = new _timer.Timer(),
      total = delay;
  if (delay == null) return t.restart(callback, delay, time), t;
  delay = +delay, time = time == null ? (0, _timer.now)() : +time;
  t.restart(function tick(elapsed) {
    elapsed += total;
    t.restart(tick, total += delay, time);
    callback(elapsed);
  }, delay, time);
  return t;
}
},{"./timer.js":"../node_modules/d3-timer/src/timer.js"}],"../node_modules/d3-timer/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "now", {
  enumerable: true,
  get: function () {
    return _timer.now;
  }
});
Object.defineProperty(exports, "timer", {
  enumerable: true,
  get: function () {
    return _timer.timer;
  }
});
Object.defineProperty(exports, "timerFlush", {
  enumerable: true,
  get: function () {
    return _timer.timerFlush;
  }
});
Object.defineProperty(exports, "timeout", {
  enumerable: true,
  get: function () {
    return _timeout.default;
  }
});
Object.defineProperty(exports, "interval", {
  enumerable: true,
  get: function () {
    return _interval.default;
  }
});

var _timer = require("./timer.js");

var _timeout = _interopRequireDefault(require("./timeout.js"));

var _interval = _interopRequireDefault(require("./interval.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./timer.js":"../node_modules/d3-timer/src/timer.js","./timeout.js":"../node_modules/d3-timer/src/timeout.js","./interval.js":"../node_modules/d3-timer/src/interval.js"}],"../node_modules/d3-transition/src/transition/schedule.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.init = init;
exports.set = set;
exports.get = get;
exports.ENDED = exports.ENDING = exports.RUNNING = exports.STARTED = exports.STARTING = exports.SCHEDULED = exports.CREATED = void 0;

var _d3Dispatch = require("d3-dispatch");

var _d3Timer = require("d3-timer");

var emptyOn = (0, _d3Dispatch.dispatch)("start", "end", "cancel", "interrupt");
var emptyTween = [];
var CREATED = 0;
exports.CREATED = CREATED;
var SCHEDULED = 1;
exports.SCHEDULED = SCHEDULED;
var STARTING = 2;
exports.STARTING = STARTING;
var STARTED = 3;
exports.STARTED = STARTED;
var RUNNING = 4;
exports.RUNNING = RUNNING;
var ENDING = 5;
exports.ENDING = ENDING;
var ENDED = 6;
exports.ENDED = ENDED;

function _default(node, name, id, index, group, timing) {
  var schedules = node.__transition;
  if (!schedules) node.__transition = {};else if (id in schedules) return;
  create(node, id, {
    name: name,
    index: index,
    // For context during callback.
    group: group,
    // For context during callback.
    on: emptyOn,
    tween: emptyTween,
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null,
    state: CREATED
  });
}

function init(node, id) {
  var schedule = get(node, id);
  if (schedule.state > CREATED) throw new Error("too late; already scheduled");
  return schedule;
}

function set(node, id) {
  var schedule = get(node, id);
  if (schedule.state > STARTED) throw new Error("too late; already running");
  return schedule;
}

function get(node, id) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id])) throw new Error("transition not found");
  return schedule;
}

function create(node, id, self) {
  var schedules = node.__transition,
      tween; // Initialize the self timer when the transition is created.
  // Note the actual delay is not known until the first callback!

  schedules[id] = self;
  self.timer = (0, _d3Timer.timer)(schedule, 0, self.time);

  function schedule(elapsed) {
    self.state = SCHEDULED;
    self.timer.restart(start, self.delay, self.time); // If the elapsed delay is less than our first sleep, start immediately.

    if (self.delay <= elapsed) start(elapsed - self.delay);
  }

  function start(elapsed) {
    var i, j, n, o; // If the state is not SCHEDULED, then we previously errored on start.

    if (self.state !== SCHEDULED) return stop();

    for (i in schedules) {
      o = schedules[i];
      if (o.name !== self.name) continue; // While this element already has a starting transition during this frame,
      // defer starting an interrupting transition until that transition has a
      // chance to tick (and possibly end); see d3/d3-transition#54!

      if (o.state === STARTED) return (0, _d3Timer.timeout)(start); // Interrupt the active transition, if any.

      if (o.state === RUNNING) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("interrupt", node, node.__data__, o.index, o.group);
        delete schedules[i];
      } // Cancel any pre-empted transitions.
      else if (+i < id) {
          o.state = ENDED;
          o.timer.stop();
          o.on.call("cancel", node, node.__data__, o.index, o.group);
          delete schedules[i];
        }
    } // Defer the first tick to end of the current frame; see d3/d3#1576.
    // Note the transition may be canceled after start and before the first tick!
    // Note this must be scheduled before the start event; see d3/d3-transition#16!
    // Assuming this is successful, subsequent callbacks go straight to tick.


    (0, _d3Timer.timeout)(function () {
      if (self.state === STARTED) {
        self.state = RUNNING;
        self.timer.restart(tick, self.delay, self.time);
        tick(elapsed);
      }
    }); // Dispatch the start event.
    // Note this must be done before the tween are initialized.

    self.state = STARTING;
    self.on.call("start", node, node.__data__, self.index, self.group);
    if (self.state !== STARTING) return; // interrupted

    self.state = STARTED; // Initialize the tween, deleting null tween.

    tween = new Array(n = self.tween.length);

    for (i = 0, j = -1; i < n; ++i) {
      if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
        tween[++j] = o;
      }
    }

    tween.length = j + 1;
  }

  function tick(elapsed) {
    var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1),
        i = -1,
        n = tween.length;

    while (++i < n) {
      tween[i].call(node, t);
    } // Dispatch the end event.


    if (self.state === ENDING) {
      self.on.call("end", node, node.__data__, self.index, self.group);
      stop();
    }
  }

  function stop() {
    self.state = ENDED;
    self.timer.stop();
    delete schedules[id];

    for (var i in schedules) return; // eslint-disable-line no-unused-vars


    delete node.__transition;
  }
}
},{"d3-dispatch":"../node_modules/d3-dispatch/src/index.js","d3-timer":"../node_modules/d3-timer/src/index.js"}],"../node_modules/d3-transition/src/interrupt.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _schedule = require("./transition/schedule.js");

function _default(node, name) {
  var schedules = node.__transition,
      schedule,
      active,
      empty = true,
      i;
  if (!schedules) return;
  name = name == null ? null : name + "";

  for (i in schedules) {
    if ((schedule = schedules[i]).name !== name) {
      empty = false;
      continue;
    }

    active = schedule.state > _schedule.STARTING && schedule.state < _schedule.ENDING;
    schedule.state = _schedule.ENDED;
    schedule.timer.stop();
    schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
    delete schedules[i];
  }

  if (empty) delete node.__transition;
}
},{"./transition/schedule.js":"../node_modules/d3-transition/src/transition/schedule.js"}],"../node_modules/d3-transition/src/selection/interrupt.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _interrupt = _interopRequireDefault(require("../interrupt.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(name) {
  return this.each(function () {
    (0, _interrupt.default)(this, name);
  });
}
},{"../interrupt.js":"../node_modules/d3-transition/src/interrupt.js"}],"../node_modules/d3-transition/src/transition/tween.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.tweenValue = tweenValue;

var _schedule = require("./schedule.js");

function tweenRemove(id, name) {
  var tween0, tween1;
  return function () {
    var schedule = (0, _schedule.set)(this, id),
        tween = schedule.tween; // If this node shared tween with the previous node,
    // just assign the updated shared tween and we’re done!
    // Otherwise, copy-on-write.

    if (tween !== tween0) {
      tween1 = tween0 = tween;

      for (var i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1 = tween1.slice();
          tween1.splice(i, 1);
          break;
        }
      }
    }

    schedule.tween = tween1;
  };
}

function tweenFunction(id, name, value) {
  var tween0, tween1;
  if (typeof value !== "function") throw new Error();
  return function () {
    var schedule = (0, _schedule.set)(this, id),
        tween = schedule.tween; // If this node shared tween with the previous node,
    // just assign the updated shared tween and we’re done!
    // Otherwise, copy-on-write.

    if (tween !== tween0) {
      tween1 = (tween0 = tween).slice();

      for (var t = {
        name: name,
        value: value
      }, i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1[i] = t;
          break;
        }
      }

      if (i === n) tween1.push(t);
    }

    schedule.tween = tween1;
  };
}

function _default(name, value) {
  var id = this._id;
  name += "";

  if (arguments.length < 2) {
    var tween = (0, _schedule.get)(this.node(), id).tween;

    for (var i = 0, n = tween.length, t; i < n; ++i) {
      if ((t = tween[i]).name === name) {
        return t.value;
      }
    }

    return null;
  }

  return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
}

function tweenValue(transition, name, value) {
  var id = transition._id;
  transition.each(function () {
    var schedule = (0, _schedule.set)(this, id);
    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
  });
  return function (node) {
    return (0, _schedule.get)(node, id).value[name];
  };
}
},{"./schedule.js":"../node_modules/d3-transition/src/transition/schedule.js"}],"../node_modules/d3-transition/src/transition/interpolate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _d3Color = require("d3-color");

var _d3Interpolate = require("d3-interpolate");

function _default(a, b) {
  var c;
  return (typeof b === "number" ? _d3Interpolate.interpolateNumber : b instanceof _d3Color.color ? _d3Interpolate.interpolateRgb : (c = (0, _d3Color.color)(b)) ? (b = c, _d3Interpolate.interpolateRgb) : _d3Interpolate.interpolateString)(a, b);
}
},{"d3-color":"../node_modules/d3-color/src/index.js","d3-interpolate":"../node_modules/d3-interpolate/src/index.js"}],"../node_modules/d3-transition/src/transition/attr.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _d3Interpolate = require("d3-interpolate");

var _d3Selection = require("d3-selection");

var _tween = require("./tween.js");

var _interpolate = _interopRequireDefault(require("./interpolate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function attrRemove(name) {
  return function () {
    this.removeAttribute(name);
  };
}

function attrRemoveNS(fullname) {
  return function () {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attrConstant(name, interpolate, value1) {
  var string00,
      string1 = value1 + "",
      interpolate0;
  return function () {
    var string0 = this.getAttribute(name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}

function attrConstantNS(fullname, interpolate, value1) {
  var string00,
      string1 = value1 + "",
      interpolate0;
  return function () {
    var string0 = this.getAttributeNS(fullname.space, fullname.local);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}

function attrFunction(name, interpolate, value) {
  var string00, string10, interpolate0;
  return function () {
    var string0,
        value1 = value(this),
        string1;
    if (value1 == null) return void this.removeAttribute(name);
    string0 = this.getAttribute(name);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}

function attrFunctionNS(fullname, interpolate, value) {
  var string00, string10, interpolate0;
  return function () {
    var string0,
        value1 = value(this),
        string1;
    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
    string0 = this.getAttributeNS(fullname.space, fullname.local);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}

function _default(name, value) {
  var fullname = (0, _d3Selection.namespace)(name),
      i = fullname === "transform" ? _d3Interpolate.interpolateTransformSvg : _interpolate.default;
  return this.attrTween(name, typeof value === "function" ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, (0, _tween.tweenValue)(this, "attr." + name, value)) : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname) : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
}
},{"d3-interpolate":"../node_modules/d3-interpolate/src/index.js","d3-selection":"../node_modules/d3-selection/src/index.js","./tween.js":"../node_modules/d3-transition/src/transition/tween.js","./interpolate.js":"../node_modules/d3-transition/src/transition/interpolate.js"}],"../node_modules/d3-transition/src/transition/attrTween.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _d3Selection = require("d3-selection");

function attrInterpolate(name, i) {
  return function (t) {
    this.setAttribute(name, i.call(this, t));
  };
}

function attrInterpolateNS(fullname, i) {
  return function (t) {
    this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
  };
}

function attrTweenNS(fullname, value) {
  var t0, i0;

  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
    return t0;
  }

  tween._value = value;
  return tween;
}

function attrTween(name, value) {
  var t0, i0;

  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
    return t0;
  }

  tween._value = value;
  return tween;
}

function _default(name, value) {
  var key = "attr." + name;
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  var fullname = (0, _d3Selection.namespace)(name);
  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
}
},{"d3-selection":"../node_modules/d3-selection/src/index.js"}],"../node_modules/d3-transition/src/transition/delay.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _schedule = require("./schedule.js");

function delayFunction(id, value) {
  return function () {
    (0, _schedule.init)(this, id).delay = +value.apply(this, arguments);
  };
}

function delayConstant(id, value) {
  return value = +value, function () {
    (0, _schedule.init)(this, id).delay = value;
  };
}

function _default(value) {
  var id = this._id;
  return arguments.length ? this.each((typeof value === "function" ? delayFunction : delayConstant)(id, value)) : (0, _schedule.get)(this.node(), id).delay;
}
},{"./schedule.js":"../node_modules/d3-transition/src/transition/schedule.js"}],"../node_modules/d3-transition/src/transition/duration.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _schedule = require("./schedule.js");

function durationFunction(id, value) {
  return function () {
    (0, _schedule.set)(this, id).duration = +value.apply(this, arguments);
  };
}

function durationConstant(id, value) {
  return value = +value, function () {
    (0, _schedule.set)(this, id).duration = value;
  };
}

function _default(value) {
  var id = this._id;
  return arguments.length ? this.each((typeof value === "function" ? durationFunction : durationConstant)(id, value)) : (0, _schedule.get)(this.node(), id).duration;
}
},{"./schedule.js":"../node_modules/d3-transition/src/transition/schedule.js"}],"../node_modules/d3-transition/src/transition/ease.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _schedule = require("./schedule.js");

function easeConstant(id, value) {
  if (typeof value !== "function") throw new Error();
  return function () {
    (0, _schedule.set)(this, id).ease = value;
  };
}

function _default(value) {
  var id = this._id;
  return arguments.length ? this.each(easeConstant(id, value)) : (0, _schedule.get)(this.node(), id).ease;
}
},{"./schedule.js":"../node_modules/d3-transition/src/transition/schedule.js"}],"../node_modules/d3-transition/src/transition/filter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _d3Selection = require("d3-selection");

var _index = require("./index.js");

function _default(match) {
  if (typeof match !== "function") match = (0, _d3Selection.matcher)(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new _index.Transition(subgroups, this._parents, this._name, this._id);
}
},{"d3-selection":"../node_modules/d3-selection/src/index.js","./index.js":"../node_modules/d3-transition/src/transition/index.js"}],"../node_modules/d3-transition/src/transition/merge.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _index = require("./index.js");

function _default(transition) {
  if (transition._id !== this._id) throw new Error();

  for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }

  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }

  return new _index.Transition(merges, this._parents, this._name, this._id);
}
},{"./index.js":"../node_modules/d3-transition/src/transition/index.js"}],"../node_modules/d3-transition/src/transition/on.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _schedule = require("./schedule.js");

function start(name) {
  return (name + "").trim().split(/^|\s+/).every(function (t) {
    var i = t.indexOf(".");
    if (i >= 0) t = t.slice(0, i);
    return !t || t === "start";
  });
}

function onFunction(id, name, listener) {
  var on0,
      on1,
      sit = start(name) ? _schedule.init : _schedule.set;
  return function () {
    var schedule = sit(this, id),
        on = schedule.on; // If this node shared a dispatch with the previous node,
    // just assign the updated shared dispatch and we’re done!
    // Otherwise, copy-on-write.

    if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);
    schedule.on = on1;
  };
}

function _default(name, listener) {
  var id = this._id;
  return arguments.length < 2 ? (0, _schedule.get)(this.node(), id).on.on(name) : this.each(onFunction(id, name, listener));
}
},{"./schedule.js":"../node_modules/d3-transition/src/transition/schedule.js"}],"../node_modules/d3-transition/src/transition/remove.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function removeFunction(id) {
  return function () {
    var parent = this.parentNode;

    for (var i in this.__transition) if (+i !== id) return;

    if (parent) parent.removeChild(this);
  };
}

function _default() {
  return this.on("end.remove", removeFunction(this._id));
}
},{}],"../node_modules/d3-transition/src/transition/select.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _d3Selection = require("d3-selection");

var _index = require("./index.js");

var _schedule = _interopRequireWildcard(require("./schedule.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _default(select) {
  var name = this._name,
      id = this._id;
  if (typeof select !== "function") select = (0, _d3Selection.selector)(select);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
        (0, _schedule.default)(subgroup[i], name, id, i, subgroup, (0, _schedule.get)(node, id));
      }
    }
  }

  return new _index.Transition(subgroups, this._parents, name, id);
}
},{"d3-selection":"../node_modules/d3-selection/src/index.js","./index.js":"../node_modules/d3-transition/src/transition/index.js","./schedule.js":"../node_modules/d3-transition/src/transition/schedule.js"}],"../node_modules/d3-transition/src/transition/selectAll.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _d3Selection = require("d3-selection");

var _index = require("./index.js");

var _schedule = _interopRequireWildcard(require("./schedule.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _default(select) {
  var name = this._name,
      id = this._id;
  if (typeof select !== "function") select = (0, _d3Selection.selectorAll)(select);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        for (var children = select.call(node, node.__data__, i, group), child, inherit = (0, _schedule.get)(node, id), k = 0, l = children.length; k < l; ++k) {
          if (child = children[k]) {
            (0, _schedule.default)(child, name, id, k, children, inherit);
          }
        }

        subgroups.push(children);
        parents.push(node);
      }
    }
  }

  return new _index.Transition(subgroups, parents, name, id);
}
},{"d3-selection":"../node_modules/d3-selection/src/index.js","./index.js":"../node_modules/d3-transition/src/transition/index.js","./schedule.js":"../node_modules/d3-transition/src/transition/schedule.js"}],"../node_modules/d3-transition/src/transition/selection.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _d3Selection = require("d3-selection");

var Selection = _d3Selection.selection.prototype.constructor;

function _default() {
  return new Selection(this._groups, this._parents);
}
},{"d3-selection":"../node_modules/d3-selection/src/index.js"}],"../node_modules/d3-transition/src/transition/style.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _d3Interpolate = require("d3-interpolate");

var _d3Selection = require("d3-selection");

var _schedule = require("./schedule.js");

var _tween = require("./tween.js");

var _interpolate = _interopRequireDefault(require("./interpolate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function styleNull(name, interpolate) {
  var string00, string10, interpolate0;
  return function () {
    var string0 = (0, _d3Selection.style)(this, name),
        string1 = (this.style.removeProperty(name), (0, _d3Selection.style)(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : interpolate0 = interpolate(string00 = string0, string10 = string1);
  };
}

function styleRemove(name) {
  return function () {
    this.style.removeProperty(name);
  };
}

function styleConstant(name, interpolate, value1) {
  var string00,
      string1 = value1 + "",
      interpolate0;
  return function () {
    var string0 = (0, _d3Selection.style)(this, name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}

function styleFunction(name, interpolate, value) {
  var string00, string10, interpolate0;
  return function () {
    var string0 = (0, _d3Selection.style)(this, name),
        value1 = value(this),
        string1 = value1 + "";
    if (value1 == null) string1 = value1 = (this.style.removeProperty(name), (0, _d3Selection.style)(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}

function styleMaybeRemove(id, name) {
  var on0,
      on1,
      listener0,
      key = "style." + name,
      event = "end." + key,
      remove;
  return function () {
    var schedule = (0, _schedule.set)(this, id),
        on = schedule.on,
        listener = schedule.value[key] == null ? remove || (remove = styleRemove(name)) : undefined; // If this node shared a dispatch with the previous node,
    // just assign the updated shared dispatch and we’re done!
    // Otherwise, copy-on-write.

    if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);
    schedule.on = on1;
  };
}

function _default(name, value, priority) {
  var i = (name += "") === "transform" ? _d3Interpolate.interpolateTransformCss : _interpolate.default;
  return value == null ? this.styleTween(name, styleNull(name, i)).on("end.style." + name, styleRemove(name)) : typeof value === "function" ? this.styleTween(name, styleFunction(name, i, (0, _tween.tweenValue)(this, "style." + name, value))).each(styleMaybeRemove(this._id, name)) : this.styleTween(name, styleConstant(name, i, value), priority).on("end.style." + name, null);
}
},{"d3-interpolate":"../node_modules/d3-interpolate/src/index.js","d3-selection":"../node_modules/d3-selection/src/index.js","./schedule.js":"../node_modules/d3-transition/src/transition/schedule.js","./tween.js":"../node_modules/d3-transition/src/transition/tween.js","./interpolate.js":"../node_modules/d3-transition/src/transition/interpolate.js"}],"../node_modules/d3-transition/src/transition/styleTween.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function styleInterpolate(name, i, priority) {
  return function (t) {
    this.style.setProperty(name, i.call(this, t), priority);
  };
}

function styleTween(name, value, priority) {
  var t, i0;

  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
    return t;
  }

  tween._value = value;
  return tween;
}

function _default(name, value, priority) {
  var key = "style." + (name += "");
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
}
},{}],"../node_modules/d3-transition/src/transition/text.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _tween = require("./tween.js");

function textConstant(value) {
  return function () {
    this.textContent = value;
  };
}

function textFunction(value) {
  return function () {
    var value1 = value(this);
    this.textContent = value1 == null ? "" : value1;
  };
}

function _default(value) {
  return this.tween("text", typeof value === "function" ? textFunction((0, _tween.tweenValue)(this, "text", value)) : textConstant(value == null ? "" : value + ""));
}
},{"./tween.js":"../node_modules/d3-transition/src/transition/tween.js"}],"../node_modules/d3-transition/src/transition/textTween.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function textInterpolate(i) {
  return function (t) {
    this.textContent = i.call(this, t);
  };
}

function textTween(value) {
  var t0, i0;

  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && textInterpolate(i);
    return t0;
  }

  tween._value = value;
  return tween;
}

function _default(value) {
  var key = "text";
  if (arguments.length < 1) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  return this.tween(key, textTween(value));
}
},{}],"../node_modules/d3-transition/src/transition/transition.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _index = require("./index.js");

var _schedule = _interopRequireWildcard(require("./schedule.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _default() {
  var name = this._name,
      id0 = this._id,
      id1 = (0, _index.newId)();

  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        var inherit = (0, _schedule.get)(node, id0);
        (0, _schedule.default)(node, name, id1, i, group, {
          time: inherit.time + inherit.delay + inherit.duration,
          delay: 0,
          duration: inherit.duration,
          ease: inherit.ease
        });
      }
    }
  }

  return new _index.Transition(groups, this._parents, name, id1);
}
},{"./index.js":"../node_modules/d3-transition/src/transition/index.js","./schedule.js":"../node_modules/d3-transition/src/transition/schedule.js"}],"../node_modules/d3-transition/src/transition/end.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _schedule = require("./schedule.js");

function _default() {
  var on0,
      on1,
      that = this,
      id = that._id,
      size = that.size();
  return new Promise(function (resolve, reject) {
    var cancel = {
      value: reject
    },
        end = {
      value: function () {
        if (--size === 0) resolve();
      }
    };
    that.each(function () {
      var schedule = (0, _schedule.set)(this, id),
          on = schedule.on; // If this node shared a dispatch with the previous node,
      // just assign the updated shared dispatch and we’re done!
      // Otherwise, copy-on-write.

      if (on !== on0) {
        on1 = (on0 = on).copy();

        on1._.cancel.push(cancel);

        on1._.interrupt.push(cancel);

        on1._.end.push(end);
      }

      schedule.on = on1;
    });
  });
}
},{"./schedule.js":"../node_modules/d3-transition/src/transition/schedule.js"}],"../node_modules/d3-transition/src/transition/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Transition = Transition;
exports.default = transition;
exports.newId = newId;

var _d3Selection = require("d3-selection");

var _attr = _interopRequireDefault(require("./attr.js"));

var _attrTween = _interopRequireDefault(require("./attrTween.js"));

var _delay = _interopRequireDefault(require("./delay.js"));

var _duration = _interopRequireDefault(require("./duration.js"));

var _ease = _interopRequireDefault(require("./ease.js"));

var _filter = _interopRequireDefault(require("./filter.js"));

var _merge = _interopRequireDefault(require("./merge.js"));

var _on = _interopRequireDefault(require("./on.js"));

var _remove = _interopRequireDefault(require("./remove.js"));

var _select = _interopRequireDefault(require("./select.js"));

var _selectAll = _interopRequireDefault(require("./selectAll.js"));

var _selection = _interopRequireDefault(require("./selection.js"));

var _style = _interopRequireDefault(require("./style.js"));

var _styleTween = _interopRequireDefault(require("./styleTween.js"));

var _text = _interopRequireDefault(require("./text.js"));

var _textTween = _interopRequireDefault(require("./textTween.js"));

var _transition = _interopRequireDefault(require("./transition.js"));

var _tween = _interopRequireDefault(require("./tween.js"));

var _end = _interopRequireDefault(require("./end.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var id = 0;

function Transition(groups, parents, name, id) {
  this._groups = groups;
  this._parents = parents;
  this._name = name;
  this._id = id;
}

function transition(name) {
  return (0, _d3Selection.selection)().transition(name);
}

function newId() {
  return ++id;
}

var selection_prototype = _d3Selection.selection.prototype;
Transition.prototype = transition.prototype = {
  constructor: Transition,
  select: _select.default,
  selectAll: _selectAll.default,
  filter: _filter.default,
  merge: _merge.default,
  selection: _selection.default,
  transition: _transition.default,
  call: selection_prototype.call,
  nodes: selection_prototype.nodes,
  node: selection_prototype.node,
  size: selection_prototype.size,
  empty: selection_prototype.empty,
  each: selection_prototype.each,
  on: _on.default,
  attr: _attr.default,
  attrTween: _attrTween.default,
  style: _style.default,
  styleTween: _styleTween.default,
  text: _text.default,
  textTween: _textTween.default,
  remove: _remove.default,
  tween: _tween.default,
  delay: _delay.default,
  duration: _duration.default,
  ease: _ease.default,
  end: _end.default
};
},{"d3-selection":"../node_modules/d3-selection/src/index.js","./attr.js":"../node_modules/d3-transition/src/transition/attr.js","./attrTween.js":"../node_modules/d3-transition/src/transition/attrTween.js","./delay.js":"../node_modules/d3-transition/src/transition/delay.js","./duration.js":"../node_modules/d3-transition/src/transition/duration.js","./ease.js":"../node_modules/d3-transition/src/transition/ease.js","./filter.js":"../node_modules/d3-transition/src/transition/filter.js","./merge.js":"../node_modules/d3-transition/src/transition/merge.js","./on.js":"../node_modules/d3-transition/src/transition/on.js","./remove.js":"../node_modules/d3-transition/src/transition/remove.js","./select.js":"../node_modules/d3-transition/src/transition/select.js","./selectAll.js":"../node_modules/d3-transition/src/transition/selectAll.js","./selection.js":"../node_modules/d3-transition/src/transition/selection.js","./style.js":"../node_modules/d3-transition/src/transition/style.js","./styleTween.js":"../node_modules/d3-transition/src/transition/styleTween.js","./text.js":"../node_modules/d3-transition/src/transition/text.js","./textTween.js":"../node_modules/d3-transition/src/transition/textTween.js","./transition.js":"../node_modules/d3-transition/src/transition/transition.js","./tween.js":"../node_modules/d3-transition/src/transition/tween.js","./end.js":"../node_modules/d3-transition/src/transition/end.js"}],"../node_modules/d3-ease/src/linear.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linear = linear;

function linear(t) {
  return +t;
}
},{}],"../node_modules/d3-ease/src/quad.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.quadIn = quadIn;
exports.quadOut = quadOut;
exports.quadInOut = quadInOut;

function quadIn(t) {
  return t * t;
}

function quadOut(t) {
  return t * (2 - t);
}

function quadInOut(t) {
  return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;
}
},{}],"../node_modules/d3-ease/src/cubic.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cubicIn = cubicIn;
exports.cubicOut = cubicOut;
exports.cubicInOut = cubicInOut;

function cubicIn(t) {
  return t * t * t;
}

function cubicOut(t) {
  return --t * t * t + 1;
}

function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
},{}],"../node_modules/d3-ease/src/poly.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.polyInOut = exports.polyOut = exports.polyIn = void 0;
var exponent = 3;

var polyIn = function custom(e) {
  e = +e;

  function polyIn(t) {
    return Math.pow(t, e);
  }

  polyIn.exponent = custom;
  return polyIn;
}(exponent);

exports.polyIn = polyIn;

var polyOut = function custom(e) {
  e = +e;

  function polyOut(t) {
    return 1 - Math.pow(1 - t, e);
  }

  polyOut.exponent = custom;
  return polyOut;
}(exponent);

exports.polyOut = polyOut;

var polyInOut = function custom(e) {
  e = +e;

  function polyInOut(t) {
    return ((t *= 2) <= 1 ? Math.pow(t, e) : 2 - Math.pow(2 - t, e)) / 2;
  }

  polyInOut.exponent = custom;
  return polyInOut;
}(exponent);

exports.polyInOut = polyInOut;
},{}],"../node_modules/d3-ease/src/sin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sinIn = sinIn;
exports.sinOut = sinOut;
exports.sinInOut = sinInOut;
var pi = Math.PI,
    halfPi = pi / 2;

function sinIn(t) {
  return 1 - Math.cos(t * halfPi);
}

function sinOut(t) {
  return Math.sin(t * halfPi);
}

function sinInOut(t) {
  return (1 - Math.cos(pi * t)) / 2;
}
},{}],"../node_modules/d3-ease/src/exp.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expIn = expIn;
exports.expOut = expOut;
exports.expInOut = expInOut;

function expIn(t) {
  return Math.pow(2, 10 * t - 10);
}

function expOut(t) {
  return 1 - Math.pow(2, -10 * t);
}

function expInOut(t) {
  return ((t *= 2) <= 1 ? Math.pow(2, 10 * t - 10) : 2 - Math.pow(2, 10 - 10 * t)) / 2;
}
},{}],"../node_modules/d3-ease/src/circle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.circleIn = circleIn;
exports.circleOut = circleOut;
exports.circleInOut = circleInOut;

function circleIn(t) {
  return 1 - Math.sqrt(1 - t * t);
}

function circleOut(t) {
  return Math.sqrt(1 - --t * t);
}

function circleInOut(t) {
  return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2;
}
},{}],"../node_modules/d3-ease/src/bounce.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bounceIn = bounceIn;
exports.bounceOut = bounceOut;
exports.bounceInOut = bounceInOut;
var b1 = 4 / 11,
    b2 = 6 / 11,
    b3 = 8 / 11,
    b4 = 3 / 4,
    b5 = 9 / 11,
    b6 = 10 / 11,
    b7 = 15 / 16,
    b8 = 21 / 22,
    b9 = 63 / 64,
    b0 = 1 / b1 / b1;

function bounceIn(t) {
  return 1 - bounceOut(1 - t);
}

function bounceOut(t) {
  return (t = +t) < b1 ? b0 * t * t : t < b3 ? b0 * (t -= b2) * t + b4 : t < b6 ? b0 * (t -= b5) * t + b7 : b0 * (t -= b8) * t + b9;
}

function bounceInOut(t) {
  return ((t *= 2) <= 1 ? 1 - bounceOut(1 - t) : bounceOut(t - 1) + 1) / 2;
}
},{}],"../node_modules/d3-ease/src/back.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.backInOut = exports.backOut = exports.backIn = void 0;
var overshoot = 1.70158;

var backIn = function custom(s) {
  s = +s;

  function backIn(t) {
    return t * t * ((s + 1) * t - s);
  }

  backIn.overshoot = custom;
  return backIn;
}(overshoot);

exports.backIn = backIn;

var backOut = function custom(s) {
  s = +s;

  function backOut(t) {
    return --t * t * ((s + 1) * t + s) + 1;
  }

  backOut.overshoot = custom;
  return backOut;
}(overshoot);

exports.backOut = backOut;

var backInOut = function custom(s) {
  s = +s;

  function backInOut(t) {
    return ((t *= 2) < 1 ? t * t * ((s + 1) * t - s) : (t -= 2) * t * ((s + 1) * t + s) + 2) / 2;
  }

  backInOut.overshoot = custom;
  return backInOut;
}(overshoot);

exports.backInOut = backInOut;
},{}],"../node_modules/d3-ease/src/elastic.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.elasticInOut = exports.elasticOut = exports.elasticIn = void 0;
var tau = 2 * Math.PI,
    amplitude = 1,
    period = 0.3;

var elasticIn = function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

  function elasticIn(t) {
    return a * Math.pow(2, 10 * --t) * Math.sin((s - t) / p);
  }

  elasticIn.amplitude = function (a) {
    return custom(a, p * tau);
  };

  elasticIn.period = function (p) {
    return custom(a, p);
  };

  return elasticIn;
}(amplitude, period);

exports.elasticIn = elasticIn;

var elasticOut = function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

  function elasticOut(t) {
    return 1 - a * Math.pow(2, -10 * (t = +t)) * Math.sin((t + s) / p);
  }

  elasticOut.amplitude = function (a) {
    return custom(a, p * tau);
  };

  elasticOut.period = function (p) {
    return custom(a, p);
  };

  return elasticOut;
}(amplitude, period);

exports.elasticOut = elasticOut;

var elasticInOut = function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

  function elasticInOut(t) {
    return ((t = t * 2 - 1) < 0 ? a * Math.pow(2, 10 * t) * Math.sin((s - t) / p) : 2 - a * Math.pow(2, -10 * t) * Math.sin((s + t) / p)) / 2;
  }

  elasticInOut.amplitude = function (a) {
    return custom(a, p * tau);
  };

  elasticInOut.period = function (p) {
    return custom(a, p);
  };

  return elasticInOut;
}(amplitude, period);

exports.elasticInOut = elasticInOut;
},{}],"../node_modules/d3-ease/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "easeLinear", {
  enumerable: true,
  get: function () {
    return _linear.linear;
  }
});
Object.defineProperty(exports, "easeQuad", {
  enumerable: true,
  get: function () {
    return _quad.quadInOut;
  }
});
Object.defineProperty(exports, "easeQuadIn", {
  enumerable: true,
  get: function () {
    return _quad.quadIn;
  }
});
Object.defineProperty(exports, "easeQuadOut", {
  enumerable: true,
  get: function () {
    return _quad.quadOut;
  }
});
Object.defineProperty(exports, "easeQuadInOut", {
  enumerable: true,
  get: function () {
    return _quad.quadInOut;
  }
});
Object.defineProperty(exports, "easeCubic", {
  enumerable: true,
  get: function () {
    return _cubic.cubicInOut;
  }
});
Object.defineProperty(exports, "easeCubicIn", {
  enumerable: true,
  get: function () {
    return _cubic.cubicIn;
  }
});
Object.defineProperty(exports, "easeCubicOut", {
  enumerable: true,
  get: function () {
    return _cubic.cubicOut;
  }
});
Object.defineProperty(exports, "easeCubicInOut", {
  enumerable: true,
  get: function () {
    return _cubic.cubicInOut;
  }
});
Object.defineProperty(exports, "easePoly", {
  enumerable: true,
  get: function () {
    return _poly.polyInOut;
  }
});
Object.defineProperty(exports, "easePolyIn", {
  enumerable: true,
  get: function () {
    return _poly.polyIn;
  }
});
Object.defineProperty(exports, "easePolyOut", {
  enumerable: true,
  get: function () {
    return _poly.polyOut;
  }
});
Object.defineProperty(exports, "easePolyInOut", {
  enumerable: true,
  get: function () {
    return _poly.polyInOut;
  }
});
Object.defineProperty(exports, "easeSin", {
  enumerable: true,
  get: function () {
    return _sin.sinInOut;
  }
});
Object.defineProperty(exports, "easeSinIn", {
  enumerable: true,
  get: function () {
    return _sin.sinIn;
  }
});
Object.defineProperty(exports, "easeSinOut", {
  enumerable: true,
  get: function () {
    return _sin.sinOut;
  }
});
Object.defineProperty(exports, "easeSinInOut", {
  enumerable: true,
  get: function () {
    return _sin.sinInOut;
  }
});
Object.defineProperty(exports, "easeExp", {
  enumerable: true,
  get: function () {
    return _exp.expInOut;
  }
});
Object.defineProperty(exports, "easeExpIn", {
  enumerable: true,
  get: function () {
    return _exp.expIn;
  }
});
Object.defineProperty(exports, "easeExpOut", {
  enumerable: true,
  get: function () {
    return _exp.expOut;
  }
});
Object.defineProperty(exports, "easeExpInOut", {
  enumerable: true,
  get: function () {
    return _exp.expInOut;
  }
});
Object.defineProperty(exports, "easeCircle", {
  enumerable: true,
  get: function () {
    return _circle.circleInOut;
  }
});
Object.defineProperty(exports, "easeCircleIn", {
  enumerable: true,
  get: function () {
    return _circle.circleIn;
  }
});
Object.defineProperty(exports, "easeCircleOut", {
  enumerable: true,
  get: function () {
    return _circle.circleOut;
  }
});
Object.defineProperty(exports, "easeCircleInOut", {
  enumerable: true,
  get: function () {
    return _circle.circleInOut;
  }
});
Object.defineProperty(exports, "easeBounce", {
  enumerable: true,
  get: function () {
    return _bounce.bounceOut;
  }
});
Object.defineProperty(exports, "easeBounceIn", {
  enumerable: true,
  get: function () {
    return _bounce.bounceIn;
  }
});
Object.defineProperty(exports, "easeBounceOut", {
  enumerable: true,
  get: function () {
    return _bounce.bounceOut;
  }
});
Object.defineProperty(exports, "easeBounceInOut", {
  enumerable: true,
  get: function () {
    return _bounce.bounceInOut;
  }
});
Object.defineProperty(exports, "easeBack", {
  enumerable: true,
  get: function () {
    return _back.backInOut;
  }
});
Object.defineProperty(exports, "easeBackIn", {
  enumerable: true,
  get: function () {
    return _back.backIn;
  }
});
Object.defineProperty(exports, "easeBackOut", {
  enumerable: true,
  get: function () {
    return _back.backOut;
  }
});
Object.defineProperty(exports, "easeBackInOut", {
  enumerable: true,
  get: function () {
    return _back.backInOut;
  }
});
Object.defineProperty(exports, "easeElastic", {
  enumerable: true,
  get: function () {
    return _elastic.elasticOut;
  }
});
Object.defineProperty(exports, "easeElasticIn", {
  enumerable: true,
  get: function () {
    return _elastic.elasticIn;
  }
});
Object.defineProperty(exports, "easeElasticOut", {
  enumerable: true,
  get: function () {
    return _elastic.elasticOut;
  }
});
Object.defineProperty(exports, "easeElasticInOut", {
  enumerable: true,
  get: function () {
    return _elastic.elasticInOut;
  }
});

var _linear = require("./linear.js");

var _quad = require("./quad.js");

var _cubic = require("./cubic.js");

var _poly = require("./poly.js");

var _sin = require("./sin.js");

var _exp = require("./exp.js");

var _circle = require("./circle.js");

var _bounce = require("./bounce.js");

var _back = require("./back.js");

var _elastic = require("./elastic.js");
},{"./linear.js":"../node_modules/d3-ease/src/linear.js","./quad.js":"../node_modules/d3-ease/src/quad.js","./cubic.js":"../node_modules/d3-ease/src/cubic.js","./poly.js":"../node_modules/d3-ease/src/poly.js","./sin.js":"../node_modules/d3-ease/src/sin.js","./exp.js":"../node_modules/d3-ease/src/exp.js","./circle.js":"../node_modules/d3-ease/src/circle.js","./bounce.js":"../node_modules/d3-ease/src/bounce.js","./back.js":"../node_modules/d3-ease/src/back.js","./elastic.js":"../node_modules/d3-ease/src/elastic.js"}],"../node_modules/d3-transition/src/selection/transition.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _index = require("../transition/index.js");

var _schedule = _interopRequireDefault(require("../transition/schedule.js"));

var _d3Ease = require("d3-ease");

var _d3Timer = require("d3-timer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultTiming = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: _d3Ease.easeCubicInOut
};

function inherit(node, id) {
  var timing;

  while (!(timing = node.__transition) || !(timing = timing[id])) {
    if (!(node = node.parentNode)) {
      return defaultTiming.time = (0, _d3Timer.now)(), defaultTiming;
    }
  }

  return timing;
}

function _default(name) {
  var id, timing;

  if (name instanceof _index.Transition) {
    id = name._id, name = name._name;
  } else {
    id = (0, _index.newId)(), (timing = defaultTiming).time = (0, _d3Timer.now)(), name = name == null ? null : name + "";
  }

  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        (0, _schedule.default)(node, name, id, i, group, timing || inherit(node, id));
      }
    }
  }

  return new _index.Transition(groups, this._parents, name, id);
}
},{"../transition/index.js":"../node_modules/d3-transition/src/transition/index.js","../transition/schedule.js":"../node_modules/d3-transition/src/transition/schedule.js","d3-ease":"../node_modules/d3-ease/src/index.js","d3-timer":"../node_modules/d3-timer/src/index.js"}],"../node_modules/d3-transition/src/selection/index.js":[function(require,module,exports) {
"use strict";

var _d3Selection = require("d3-selection");

var _interrupt = _interopRequireDefault(require("./interrupt.js"));

var _transition = _interopRequireDefault(require("./transition.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_d3Selection.selection.prototype.interrupt = _interrupt.default;
_d3Selection.selection.prototype.transition = _transition.default;
},{"d3-selection":"../node_modules/d3-selection/src/index.js","./interrupt.js":"../node_modules/d3-transition/src/selection/interrupt.js","./transition.js":"../node_modules/d3-transition/src/selection/transition.js"}],"../node_modules/d3-transition/src/active.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _index = require("./transition/index.js");

var _schedule = require("./transition/schedule.js");

var root = [null];

function _default(node, name) {
  var schedules = node.__transition,
      schedule,
      i;

  if (schedules) {
    name = name == null ? null : name + "";

    for (i in schedules) {
      if ((schedule = schedules[i]).state > _schedule.SCHEDULED && schedule.name === name) {
        return new _index.Transition([[node]], root, name, +i);
      }
    }
  }

  return null;
}
},{"./transition/index.js":"../node_modules/d3-transition/src/transition/index.js","./transition/schedule.js":"../node_modules/d3-transition/src/transition/schedule.js"}],"../node_modules/d3-transition/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "transition", {
  enumerable: true,
  get: function () {
    return _index2.default;
  }
});
Object.defineProperty(exports, "active", {
  enumerable: true,
  get: function () {
    return _active.default;
  }
});
Object.defineProperty(exports, "interrupt", {
  enumerable: true,
  get: function () {
    return _interrupt.default;
  }
});

require("./selection/index.js");

var _index2 = _interopRequireDefault(require("./transition/index.js"));

var _active = _interopRequireDefault(require("./active.js"));

var _interrupt = _interopRequireDefault(require("./interrupt.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./selection/index.js":"../node_modules/d3-transition/src/selection/index.js","./transition/index.js":"../node_modules/d3-transition/src/transition/index.js","./active.js":"../node_modules/d3-transition/src/active.js","./interrupt.js":"../node_modules/d3-transition/src/interrupt.js"}],"../node_modules/topojson-client/src/identity.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(x) {
  return x;
}
},{}],"../node_modules/topojson-client/src/transform.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _identity = _interopRequireDefault(require("./identity.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(transform) {
  if (transform == null) return _identity.default;
  var x0,
      y0,
      kx = transform.scale[0],
      ky = transform.scale[1],
      dx = transform.translate[0],
      dy = transform.translate[1];
  return function (input, i) {
    if (!i) x0 = y0 = 0;
    var j = 2,
        n = input.length,
        output = new Array(n);
    output[0] = (x0 += input[0]) * kx + dx;
    output[1] = (y0 += input[1]) * ky + dy;

    while (j < n) output[j] = input[j], ++j;

    return output;
  };
}
},{"./identity.js":"../node_modules/topojson-client/src/identity.js"}],"../node_modules/topojson-client/src/bbox.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _transform = _interopRequireDefault(require("./transform.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(topology) {
  var t = (0, _transform.default)(topology.transform),
      key,
      x0 = Infinity,
      y0 = x0,
      x1 = -x0,
      y1 = -x0;

  function bboxPoint(p) {
    p = t(p);
    if (p[0] < x0) x0 = p[0];
    if (p[0] > x1) x1 = p[0];
    if (p[1] < y0) y0 = p[1];
    if (p[1] > y1) y1 = p[1];
  }

  function bboxGeometry(o) {
    switch (o.type) {
      case "GeometryCollection":
        o.geometries.forEach(bboxGeometry);
        break;

      case "Point":
        bboxPoint(o.coordinates);
        break;

      case "MultiPoint":
        o.coordinates.forEach(bboxPoint);
        break;
    }
  }

  topology.arcs.forEach(function (arc) {
    var i = -1,
        n = arc.length,
        p;

    while (++i < n) {
      p = t(arc[i], i);
      if (p[0] < x0) x0 = p[0];
      if (p[0] > x1) x1 = p[0];
      if (p[1] < y0) y0 = p[1];
      if (p[1] > y1) y1 = p[1];
    }
  });

  for (key in topology.objects) {
    bboxGeometry(topology.objects[key]);
  }

  return [x0, y0, x1, y1];
}
},{"./transform.js":"../node_modules/topojson-client/src/transform.js"}],"../node_modules/topojson-client/src/reverse.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(array, n) {
  var t,
      j = array.length,
      i = j - n;

  while (i < --j) t = array[i], array[i++] = array[j], array[j] = t;
}
},{}],"../node_modules/topojson-client/src/feature.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.object = object;

var _reverse = _interopRequireDefault(require("./reverse.js"));

var _transform = _interopRequireDefault(require("./transform.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(topology, o) {
  if (typeof o === "string") o = topology.objects[o];
  return o.type === "GeometryCollection" ? {
    type: "FeatureCollection",
    features: o.geometries.map(function (o) {
      return feature(topology, o);
    })
  } : feature(topology, o);
}

function feature(topology, o) {
  var id = o.id,
      bbox = o.bbox,
      properties = o.properties == null ? {} : o.properties,
      geometry = object(topology, o);
  return id == null && bbox == null ? {
    type: "Feature",
    properties: properties,
    geometry: geometry
  } : bbox == null ? {
    type: "Feature",
    id: id,
    properties: properties,
    geometry: geometry
  } : {
    type: "Feature",
    id: id,
    bbox: bbox,
    properties: properties,
    geometry: geometry
  };
}

function object(topology, o) {
  var transformPoint = (0, _transform.default)(topology.transform),
      arcs = topology.arcs;

  function arc(i, points) {
    if (points.length) points.pop();

    for (var a = arcs[i < 0 ? ~i : i], k = 0, n = a.length; k < n; ++k) {
      points.push(transformPoint(a[k], k));
    }

    if (i < 0) (0, _reverse.default)(points, n);
  }

  function point(p) {
    return transformPoint(p);
  }

  function line(arcs) {
    var points = [];

    for (var i = 0, n = arcs.length; i < n; ++i) arc(arcs[i], points);

    if (points.length < 2) points.push(points[0]); // This should never happen per the specification.

    return points;
  }

  function ring(arcs) {
    var points = line(arcs);

    while (points.length < 4) points.push(points[0]); // This may happen if an arc has only two points.


    return points;
  }

  function polygon(arcs) {
    return arcs.map(ring);
  }

  function geometry(o) {
    var type = o.type,
        coordinates;

    switch (type) {
      case "GeometryCollection":
        return {
          type: type,
          geometries: o.geometries.map(geometry)
        };

      case "Point":
        coordinates = point(o.coordinates);
        break;

      case "MultiPoint":
        coordinates = o.coordinates.map(point);
        break;

      case "LineString":
        coordinates = line(o.arcs);
        break;

      case "MultiLineString":
        coordinates = o.arcs.map(line);
        break;

      case "Polygon":
        coordinates = polygon(o.arcs);
        break;

      case "MultiPolygon":
        coordinates = o.arcs.map(polygon);
        break;

      default:
        return null;
    }

    return {
      type: type,
      coordinates: coordinates
    };
  }

  return geometry(o);
}
},{"./reverse.js":"../node_modules/topojson-client/src/reverse.js","./transform.js":"../node_modules/topojson-client/src/transform.js"}],"../node_modules/topojson-client/src/stitch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(topology, arcs) {
  var stitchedArcs = {},
      fragmentByStart = {},
      fragmentByEnd = {},
      fragments = [],
      emptyIndex = -1; // Stitch empty arcs first, since they may be subsumed by other arcs.

  arcs.forEach(function (i, j) {
    var arc = topology.arcs[i < 0 ? ~i : i],
        t;

    if (arc.length < 3 && !arc[1][0] && !arc[1][1]) {
      t = arcs[++emptyIndex], arcs[emptyIndex] = i, arcs[j] = t;
    }
  });
  arcs.forEach(function (i) {
    var e = ends(i),
        start = e[0],
        end = e[1],
        f,
        g;

    if (f = fragmentByEnd[start]) {
      delete fragmentByEnd[f.end];
      f.push(i);
      f.end = end;

      if (g = fragmentByStart[end]) {
        delete fragmentByStart[g.start];
        var fg = g === f ? f : f.concat(g);
        fragmentByStart[fg.start = f.start] = fragmentByEnd[fg.end = g.end] = fg;
      } else {
        fragmentByStart[f.start] = fragmentByEnd[f.end] = f;
      }
    } else if (f = fragmentByStart[end]) {
      delete fragmentByStart[f.start];
      f.unshift(i);
      f.start = start;

      if (g = fragmentByEnd[start]) {
        delete fragmentByEnd[g.end];
        var gf = g === f ? f : g.concat(f);
        fragmentByStart[gf.start = g.start] = fragmentByEnd[gf.end = f.end] = gf;
      } else {
        fragmentByStart[f.start] = fragmentByEnd[f.end] = f;
      }
    } else {
      f = [i];
      fragmentByStart[f.start = start] = fragmentByEnd[f.end = end] = f;
    }
  });

  function ends(i) {
    var arc = topology.arcs[i < 0 ? ~i : i],
        p0 = arc[0],
        p1;
    if (topology.transform) p1 = [0, 0], arc.forEach(function (dp) {
      p1[0] += dp[0], p1[1] += dp[1];
    });else p1 = arc[arc.length - 1];
    return i < 0 ? [p1, p0] : [p0, p1];
  }

  function flush(fragmentByEnd, fragmentByStart) {
    for (var k in fragmentByEnd) {
      var f = fragmentByEnd[k];
      delete fragmentByStart[f.start];
      delete f.start;
      delete f.end;
      f.forEach(function (i) {
        stitchedArcs[i < 0 ? ~i : i] = 1;
      });
      fragments.push(f);
    }
  }

  flush(fragmentByEnd, fragmentByStart);
  flush(fragmentByStart, fragmentByEnd);
  arcs.forEach(function (i) {
    if (!stitchedArcs[i < 0 ? ~i : i]) fragments.push([i]);
  });
  return fragments;
}
},{}],"../node_modules/topojson-client/src/mesh.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.meshArcs = meshArcs;

var _feature = require("./feature.js");

var _stitch = _interopRequireDefault(require("./stitch.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(topology) {
  return (0, _feature.object)(topology, meshArcs.apply(this, arguments));
}

function meshArcs(topology, object, filter) {
  var arcs, i, n;
  if (arguments.length > 1) arcs = extractArcs(topology, object, filter);else for (i = 0, arcs = new Array(n = topology.arcs.length); i < n; ++i) arcs[i] = i;
  return {
    type: "MultiLineString",
    arcs: (0, _stitch.default)(topology, arcs)
  };
}

function extractArcs(topology, object, filter) {
  var arcs = [],
      geomsByArc = [],
      geom;

  function extract0(i) {
    var j = i < 0 ? ~i : i;
    (geomsByArc[j] || (geomsByArc[j] = [])).push({
      i: i,
      g: geom
    });
  }

  function extract1(arcs) {
    arcs.forEach(extract0);
  }

  function extract2(arcs) {
    arcs.forEach(extract1);
  }

  function extract3(arcs) {
    arcs.forEach(extract2);
  }

  function geometry(o) {
    switch (geom = o, o.type) {
      case "GeometryCollection":
        o.geometries.forEach(geometry);
        break;

      case "LineString":
        extract1(o.arcs);
        break;

      case "MultiLineString":
      case "Polygon":
        extract2(o.arcs);
        break;

      case "MultiPolygon":
        extract3(o.arcs);
        break;
    }
  }

  geometry(object);
  geomsByArc.forEach(filter == null ? function (geoms) {
    arcs.push(geoms[0].i);
  } : function (geoms) {
    if (filter(geoms[0].g, geoms[geoms.length - 1].g)) arcs.push(geoms[0].i);
  });
  return arcs;
}
},{"./feature.js":"../node_modules/topojson-client/src/feature.js","./stitch.js":"../node_modules/topojson-client/src/stitch.js"}],"../node_modules/topojson-client/src/merge.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.mergeArcs = mergeArcs;

var _feature = require("./feature.js");

var _stitch = _interopRequireDefault(require("./stitch.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function planarRingArea(ring) {
  var i = -1,
      n = ring.length,
      a,
      b = ring[n - 1],
      area = 0;

  while (++i < n) a = b, b = ring[i], area += a[0] * b[1] - a[1] * b[0];

  return Math.abs(area); // Note: doubled area!
}

function _default(topology) {
  return (0, _feature.object)(topology, mergeArcs.apply(this, arguments));
}

function mergeArcs(topology, objects) {
  var polygonsByArc = {},
      polygons = [],
      groups = [];
  objects.forEach(geometry);

  function geometry(o) {
    switch (o.type) {
      case "GeometryCollection":
        o.geometries.forEach(geometry);
        break;

      case "Polygon":
        extract(o.arcs);
        break;

      case "MultiPolygon":
        o.arcs.forEach(extract);
        break;
    }
  }

  function extract(polygon) {
    polygon.forEach(function (ring) {
      ring.forEach(function (arc) {
        (polygonsByArc[arc = arc < 0 ? ~arc : arc] || (polygonsByArc[arc] = [])).push(polygon);
      });
    });
    polygons.push(polygon);
  }

  function area(ring) {
    return planarRingArea((0, _feature.object)(topology, {
      type: "Polygon",
      arcs: [ring]
    }).coordinates[0]);
  }

  polygons.forEach(function (polygon) {
    if (!polygon._) {
      var group = [],
          neighbors = [polygon];
      polygon._ = 1;
      groups.push(group);

      while (polygon = neighbors.pop()) {
        group.push(polygon);
        polygon.forEach(function (ring) {
          ring.forEach(function (arc) {
            polygonsByArc[arc < 0 ? ~arc : arc].forEach(function (polygon) {
              if (!polygon._) {
                polygon._ = 1;
                neighbors.push(polygon);
              }
            });
          });
        });
      }
    }
  });
  polygons.forEach(function (polygon) {
    delete polygon._;
  });
  return {
    type: "MultiPolygon",
    arcs: groups.map(function (polygons) {
      var arcs = [],
          n; // Extract the exterior (unique) arcs.

      polygons.forEach(function (polygon) {
        polygon.forEach(function (ring) {
          ring.forEach(function (arc) {
            if (polygonsByArc[arc < 0 ? ~arc : arc].length < 2) {
              arcs.push(arc);
            }
          });
        });
      }); // Stitch the arcs into one or more rings.

      arcs = (0, _stitch.default)(topology, arcs); // If more than one ring is returned,
      // at most one of these rings can be the exterior;
      // choose the one with the greatest absolute area.

      if ((n = arcs.length) > 1) {
        for (var i = 1, k = area(arcs[0]), ki, t; i < n; ++i) {
          if ((ki = area(arcs[i])) > k) {
            t = arcs[0], arcs[0] = arcs[i], arcs[i] = t, k = ki;
          }
        }
      }

      return arcs;
    }).filter(function (arcs) {
      return arcs.length > 0;
    })
  };
}
},{"./feature.js":"../node_modules/topojson-client/src/feature.js","./stitch.js":"../node_modules/topojson-client/src/stitch.js"}],"../node_modules/topojson-client/src/bisect.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(a, x) {
  var lo = 0,
      hi = a.length;

  while (lo < hi) {
    var mid = lo + hi >>> 1;
    if (a[mid] < x) lo = mid + 1;else hi = mid;
  }

  return lo;
}
},{}],"../node_modules/topojson-client/src/neighbors.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _bisect = _interopRequireDefault(require("./bisect.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(objects) {
  var indexesByArc = {},
      // arc index -> array of object indexes
  neighbors = objects.map(function () {
    return [];
  });

  function line(arcs, i) {
    arcs.forEach(function (a) {
      if (a < 0) a = ~a;
      var o = indexesByArc[a];
      if (o) o.push(i);else indexesByArc[a] = [i];
    });
  }

  function polygon(arcs, i) {
    arcs.forEach(function (arc) {
      line(arc, i);
    });
  }

  function geometry(o, i) {
    if (o.type === "GeometryCollection") o.geometries.forEach(function (o) {
      geometry(o, i);
    });else if (o.type in geometryType) geometryType[o.type](o.arcs, i);
  }

  var geometryType = {
    LineString: line,
    MultiLineString: polygon,
    Polygon: polygon,
    MultiPolygon: function (arcs, i) {
      arcs.forEach(function (arc) {
        polygon(arc, i);
      });
    }
  };
  objects.forEach(geometry);

  for (var i in indexesByArc) {
    for (var indexes = indexesByArc[i], m = indexes.length, j = 0; j < m; ++j) {
      for (var k = j + 1; k < m; ++k) {
        var ij = indexes[j],
            ik = indexes[k],
            n;
        if ((n = neighbors[ij])[i = (0, _bisect.default)(n, ik)] !== ik) n.splice(i, 0, ik);
        if ((n = neighbors[ik])[i = (0, _bisect.default)(n, ij)] !== ij) n.splice(i, 0, ij);
      }
    }
  }

  return neighbors;
}
},{"./bisect.js":"../node_modules/topojson-client/src/bisect.js"}],"../node_modules/topojson-client/src/untransform.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _identity = _interopRequireDefault(require("./identity.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(transform) {
  if (transform == null) return _identity.default;
  var x0,
      y0,
      kx = transform.scale[0],
      ky = transform.scale[1],
      dx = transform.translate[0],
      dy = transform.translate[1];
  return function (input, i) {
    if (!i) x0 = y0 = 0;
    var j = 2,
        n = input.length,
        output = new Array(n),
        x1 = Math.round((input[0] - dx) / kx),
        y1 = Math.round((input[1] - dy) / ky);
    output[0] = x1 - x0, x0 = x1;
    output[1] = y1 - y0, y0 = y1;

    while (j < n) output[j] = input[j], ++j;

    return output;
  };
}
},{"./identity.js":"../node_modules/topojson-client/src/identity.js"}],"../node_modules/topojson-client/src/quantize.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _bbox = _interopRequireDefault(require("./bbox.js"));

var _untransform = _interopRequireDefault(require("./untransform.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(topology, transform) {
  if (topology.transform) throw new Error("already quantized");

  if (!transform || !transform.scale) {
    if (!((n = Math.floor(transform)) >= 2)) throw new Error("n must be ≥2");
    box = topology.bbox || (0, _bbox.default)(topology);
    var x0 = box[0],
        y0 = box[1],
        x1 = box[2],
        y1 = box[3],
        n;
    transform = {
      scale: [x1 - x0 ? (x1 - x0) / (n - 1) : 1, y1 - y0 ? (y1 - y0) / (n - 1) : 1],
      translate: [x0, y0]
    };
  } else {
    box = topology.bbox;
  }

  var t = (0, _untransform.default)(transform),
      box,
      key,
      inputs = topology.objects,
      outputs = {};

  function quantizePoint(point) {
    return t(point);
  }

  function quantizeGeometry(input) {
    var output;

    switch (input.type) {
      case "GeometryCollection":
        output = {
          type: "GeometryCollection",
          geometries: input.geometries.map(quantizeGeometry)
        };
        break;

      case "Point":
        output = {
          type: "Point",
          coordinates: quantizePoint(input.coordinates)
        };
        break;

      case "MultiPoint":
        output = {
          type: "MultiPoint",
          coordinates: input.coordinates.map(quantizePoint)
        };
        break;

      default:
        return input;
    }

    if (input.id != null) output.id = input.id;
    if (input.bbox != null) output.bbox = input.bbox;
    if (input.properties != null) output.properties = input.properties;
    return output;
  }

  function quantizeArc(input) {
    var i = 0,
        j = 1,
        n = input.length,
        p,
        output = new Array(n); // pessimistic

    output[0] = t(input[0], 0);

    while (++i < n) if ((p = t(input[i], i))[0] || p[1]) output[j++] = p; // non-coincident points


    if (j === 1) output[j++] = [0, 0]; // an arc must have at least two points

    output.length = j;
    return output;
  }

  for (key in inputs) outputs[key] = quantizeGeometry(inputs[key]);

  return {
    type: "Topology",
    bbox: box,
    transform: transform,
    objects: outputs,
    arcs: topology.arcs.map(quantizeArc)
  };
}
},{"./bbox.js":"../node_modules/topojson-client/src/bbox.js","./untransform.js":"../node_modules/topojson-client/src/untransform.js"}],"../node_modules/topojson-client/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "bbox", {
  enumerable: true,
  get: function () {
    return _bbox.default;
  }
});
Object.defineProperty(exports, "feature", {
  enumerable: true,
  get: function () {
    return _feature.default;
  }
});
Object.defineProperty(exports, "mesh", {
  enumerable: true,
  get: function () {
    return _mesh.default;
  }
});
Object.defineProperty(exports, "meshArcs", {
  enumerable: true,
  get: function () {
    return _mesh.meshArcs;
  }
});
Object.defineProperty(exports, "merge", {
  enumerable: true,
  get: function () {
    return _merge.default;
  }
});
Object.defineProperty(exports, "mergeArcs", {
  enumerable: true,
  get: function () {
    return _merge.mergeArcs;
  }
});
Object.defineProperty(exports, "neighbors", {
  enumerable: true,
  get: function () {
    return _neighbors.default;
  }
});
Object.defineProperty(exports, "quantize", {
  enumerable: true,
  get: function () {
    return _quantize.default;
  }
});
Object.defineProperty(exports, "transform", {
  enumerable: true,
  get: function () {
    return _transform.default;
  }
});
Object.defineProperty(exports, "untransform", {
  enumerable: true,
  get: function () {
    return _untransform.default;
  }
});

var _bbox = _interopRequireDefault(require("./bbox.js"));

var _feature = _interopRequireDefault(require("./feature.js"));

var _mesh = _interopRequireWildcard(require("./mesh.js"));

var _merge = _interopRequireWildcard(require("./merge.js"));

var _neighbors = _interopRequireDefault(require("./neighbors.js"));

var _quantize = _interopRequireDefault(require("./quantize.js"));

var _transform = _interopRequireDefault(require("./transform.js"));

var _untransform = _interopRequireDefault(require("./untransform.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./bbox.js":"../node_modules/topojson-client/src/bbox.js","./feature.js":"../node_modules/topojson-client/src/feature.js","./mesh.js":"../node_modules/topojson-client/src/mesh.js","./merge.js":"../node_modules/topojson-client/src/merge.js","./neighbors.js":"../node_modules/topojson-client/src/neighbors.js","./quantize.js":"../node_modules/topojson-client/src/quantize.js","./transform.js":"../node_modules/topojson-client/src/transform.js","./untransform.js":"../node_modules/topojson-client/src/untransform.js"}],"../node_modules/canvas-dpi-scaler/canvas-dpi-scaler.js":[function(require,module,exports) {
//
//
// Based on: http://www.html5rocks.com/en/tutorials/canvas/hidpi/

//
var scaleFn = function(canvas, context, customWidth, customHeight) {
  if(!canvas || !context) { throw new Error('Must pass in `canvas` and `context`.'); }

  var width = customWidth ||
              canvas.width || // attr, eg: <canvas width='400'>
              canvas.clientWidth; // keep existing width
  var height = customHeight ||
               canvas.height ||
               canvas.clientHeight;
  var deviceRatio = window.devicePixelRatio || 1;
  var bsRatio = context.webkitBackingStorePixelRatio ||
                context.mozBackingStorePixelRatio ||
                context.msBackingStorePixelRatio ||
                context.oBackingStorePixelRatio ||
                context.backingStorePixelRatio || 1;
  var ratio = deviceRatio / bsRatio;

  // Adjust canvas if ratio =/= 1
  if (deviceRatio !== bsRatio) {
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    context.scale(ratio, ratio);
  }
  return ratio;
};

// expose functionality
if(typeof window !== 'undefined') { window.canvasDpiScaler = scaleFn; }
module.exports = scaleFn;

},{}],"../node_modules/papaparse/papaparse.min.js":[function(require,module,exports) {
var define;
/* @license
Papa Parse
v5.1.1
https://github.com/mholt/PapaParse
License: MIT
*/
!function(e,t){"function"==typeof define&&define.amd?define([],t):"object"==typeof module&&"undefined"!=typeof exports?module.exports=t():e.Papa=t()}(this,function s(){"use strict";var f="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==f?f:{};var n=!f.document&&!!f.postMessage,o=n&&/blob:/i.test((f.location||{}).protocol),a={},h=0,b={parse:function(e,t){var i=(t=t||{}).dynamicTyping||!1;q(i)&&(t.dynamicTypingFunction=i,i={});if(t.dynamicTyping=i,t.transform=!!q(t.transform)&&t.transform,t.worker&&b.WORKERS_SUPPORTED){var r=function(){if(!b.WORKERS_SUPPORTED)return!1;var e=(i=f.URL||f.webkitURL||null,r=s.toString(),b.BLOB_URL||(b.BLOB_URL=i.createObjectURL(new Blob(["(",r,")();"],{type:"text/javascript"})))),t=new f.Worker(e);var i,r;return t.onmessage=m,t.id=h++,a[t.id]=t}();return r.userStep=t.step,r.userChunk=t.chunk,r.userComplete=t.complete,r.userError=t.error,t.step=q(t.step),t.chunk=q(t.chunk),t.complete=q(t.complete),t.error=q(t.error),delete t.worker,void r.postMessage({input:e,config:t,workerId:r.id})}var n=null;b.NODE_STREAM_INPUT,"string"==typeof e?n=t.download?new l(t):new p(t):!0===e.readable&&q(e.read)&&q(e.on)?n=new g(t):(f.File&&e instanceof File||e instanceof Object)&&(n=new c(t));return n.stream(e)},unparse:function(e,t){var n=!1,m=!0,_=",",v="\r\n",s='"',a=s+s,i=!1,r=null;!function(){if("object"!=typeof t)return;"string"!=typeof t.delimiter||b.BAD_DELIMITERS.filter(function(e){return-1!==t.delimiter.indexOf(e)}).length||(_=t.delimiter);("boolean"==typeof t.quotes||"function"==typeof t.quotes||Array.isArray(t.quotes))&&(n=t.quotes);"boolean"!=typeof t.skipEmptyLines&&"string"!=typeof t.skipEmptyLines||(i=t.skipEmptyLines);"string"==typeof t.newline&&(v=t.newline);"string"==typeof t.quoteChar&&(s=t.quoteChar);"boolean"==typeof t.header&&(m=t.header);if(Array.isArray(t.columns)){if(0===t.columns.length)throw new Error("Option columns is empty");r=t.columns}void 0!==t.escapeChar&&(a=t.escapeChar+s)}();var o=new RegExp(U(s),"g");"string"==typeof e&&(e=JSON.parse(e));if(Array.isArray(e)){if(!e.length||Array.isArray(e[0]))return u(null,e,i);if("object"==typeof e[0])return u(r||h(e[0]),e,i)}else if("object"==typeof e)return"string"==typeof e.data&&(e.data=JSON.parse(e.data)),Array.isArray(e.data)&&(e.fields||(e.fields=e.meta&&e.meta.fields),e.fields||(e.fields=Array.isArray(e.data[0])?e.fields:h(e.data[0])),Array.isArray(e.data[0])||"object"==typeof e.data[0]||(e.data=[e.data])),u(e.fields||[],e.data||[],i);throw new Error("Unable to serialize unrecognized input");function h(e){if("object"!=typeof e)return[];var t=[];for(var i in e)t.push(i);return t}function u(e,t,i){var r="";"string"==typeof e&&(e=JSON.parse(e)),"string"==typeof t&&(t=JSON.parse(t));var n=Array.isArray(e)&&0<e.length,s=!Array.isArray(t[0]);if(n&&m){for(var a=0;a<e.length;a++)0<a&&(r+=_),r+=y(e[a],a);0<t.length&&(r+=v)}for(var o=0;o<t.length;o++){var h=n?e.length:t[o].length,u=!1,f=n?0===Object.keys(t[o]).length:0===t[o].length;if(i&&!n&&(u="greedy"===i?""===t[o].join("").trim():1===t[o].length&&0===t[o][0].length),"greedy"===i&&n){for(var d=[],l=0;l<h;l++){var c=s?e[l]:l;d.push(t[o][c])}u=""===d.join("").trim()}if(!u){for(var p=0;p<h;p++){0<p&&!f&&(r+=_);var g=n&&s?e[p]:p;r+=y(t[o][g],p)}o<t.length-1&&(!i||0<h&&!f)&&(r+=v)}}return r}function y(e,t){if(null==e)return"";if(e.constructor===Date)return JSON.stringify(e).slice(1,25);var i=e.toString().replace(o,a),r="boolean"==typeof n&&n||"function"==typeof n&&n(e,t)||Array.isArray(n)&&n[t]||function(e,t){for(var i=0;i<t.length;i++)if(-1<e.indexOf(t[i]))return!0;return!1}(i,b.BAD_DELIMITERS)||-1<i.indexOf(_)||" "===i.charAt(0)||" "===i.charAt(i.length-1);return r?s+i+s:i}}};if(b.RECORD_SEP=String.fromCharCode(30),b.UNIT_SEP=String.fromCharCode(31),b.BYTE_ORDER_MARK="\ufeff",b.BAD_DELIMITERS=["\r","\n",'"',b.BYTE_ORDER_MARK],b.WORKERS_SUPPORTED=!n&&!!f.Worker,b.NODE_STREAM_INPUT=1,b.LocalChunkSize=10485760,b.RemoteChunkSize=5242880,b.DefaultDelimiter=",",b.Parser=E,b.ParserHandle=i,b.NetworkStreamer=l,b.FileStreamer=c,b.StringStreamer=p,b.ReadableStreamStreamer=g,f.jQuery){var d=f.jQuery;d.fn.parse=function(o){var i=o.config||{},h=[];return this.each(function(e){if(!("INPUT"===d(this).prop("tagName").toUpperCase()&&"file"===d(this).attr("type").toLowerCase()&&f.FileReader)||!this.files||0===this.files.length)return!0;for(var t=0;t<this.files.length;t++)h.push({file:this.files[t],inputElem:this,instanceConfig:d.extend({},i)})}),e(),this;function e(){if(0!==h.length){var e,t,i,r,n=h[0];if(q(o.before)){var s=o.before(n.file,n.inputElem);if("object"==typeof s){if("abort"===s.action)return e="AbortError",t=n.file,i=n.inputElem,r=s.reason,void(q(o.error)&&o.error({name:e},t,i,r));if("skip"===s.action)return void u();"object"==typeof s.config&&(n.instanceConfig=d.extend(n.instanceConfig,s.config))}else if("skip"===s)return void u()}var a=n.instanceConfig.complete;n.instanceConfig.complete=function(e){q(a)&&a(e,n.file,n.inputElem),u()},b.parse(n.file,n.instanceConfig)}else q(o.complete)&&o.complete()}function u(){h.splice(0,1),e()}}}function u(e){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},function(e){var t=w(e);t.chunkSize=parseInt(t.chunkSize),e.step||e.chunk||(t.chunkSize=null);this._handle=new i(t),(this._handle.streamer=this)._config=t}.call(this,e),this.parseChunk=function(e,t){if(this.isFirstChunk&&q(this._config.beforeFirstChunk)){var i=this._config.beforeFirstChunk(e);void 0!==i&&(e=i)}this.isFirstChunk=!1,this._halted=!1;var r=this._partialLine+e;this._partialLine="";var n=this._handle.parse(r,this._baseIndex,!this._finished);if(!this._handle.paused()&&!this._handle.aborted()){var s=n.meta.cursor;this._finished||(this._partialLine=r.substring(s-this._baseIndex),this._baseIndex=s),n&&n.data&&(this._rowCount+=n.data.length);var a=this._finished||this._config.preview&&this._rowCount>=this._config.preview;if(o)f.postMessage({results:n,workerId:b.WORKER_ID,finished:a});else if(q(this._config.chunk)&&!t){if(this._config.chunk(n,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);n=void 0,this._completeResults=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(n.data),this._completeResults.errors=this._completeResults.errors.concat(n.errors),this._completeResults.meta=n.meta),this._completed||!a||!q(this._config.complete)||n&&n.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),a||n&&n.meta.paused||this._nextChunk(),n}this._halted=!0},this._sendError=function(e){q(this._config.error)?this._config.error(e):o&&this._config.error&&f.postMessage({workerId:b.WORKER_ID,error:e,finished:!1})}}function l(e){var r;(e=e||{}).chunkSize||(e.chunkSize=b.RemoteChunkSize),u.call(this,e),this._nextChunk=n?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(e){this._input=e,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(r=new XMLHttpRequest,this._config.withCredentials&&(r.withCredentials=this._config.withCredentials),n||(r.onload=y(this._chunkLoaded,this),r.onerror=y(this._chunkError,this)),r.open("GET",this._input,!n),this._config.downloadRequestHeaders){var e=this._config.downloadRequestHeaders;for(var t in e)r.setRequestHeader(t,e[t])}if(this._config.chunkSize){var i=this._start+this._config.chunkSize-1;r.setRequestHeader("Range","bytes="+this._start+"-"+i)}try{r.send()}catch(e){this._chunkError(e.message)}n&&0===r.status&&this._chunkError()}},this._chunkLoaded=function(){4===r.readyState&&(r.status<200||400<=r.status?this._chunkError():(this._start+=this._config.chunkSize?this._config.chunkSize:r.responseText.length,this._finished=!this._config.chunkSize||this._start>=function(e){var t=e.getResponseHeader("Content-Range");if(null===t)return-1;return parseInt(t.substring(t.lastIndexOf("/")+1))}(r),this.parseChunk(r.responseText)))},this._chunkError=function(e){var t=r.statusText||e;this._sendError(new Error(t))}}function c(e){var r,n;(e=e||{}).chunkSize||(e.chunkSize=b.LocalChunkSize),u.call(this,e);var s="undefined"!=typeof FileReader;this.stream=function(e){this._input=e,n=e.slice||e.webkitSlice||e.mozSlice,s?((r=new FileReader).onload=y(this._chunkLoaded,this),r.onerror=y(this._chunkError,this)):r=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var e=this._input;if(this._config.chunkSize){var t=Math.min(this._start+this._config.chunkSize,this._input.size);e=n.call(e,this._start,t)}var i=r.readAsText(e,this._config.encoding);s||this._chunkLoaded({target:{result:i}})},this._chunkLoaded=function(e){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(e.target.result)},this._chunkError=function(){this._sendError(r.error)}}function p(e){var i;u.call(this,e=e||{}),this.stream=function(e){return i=e,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var e,t=this._config.chunkSize;return t?(e=i.substring(0,t),i=i.substring(t)):(e=i,i=""),this._finished=!i,this.parseChunk(e)}}}function g(e){u.call(this,e=e||{});var t=[],i=!0,r=!1;this.pause=function(){u.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){u.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(e){this._input=e,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){r&&1===t.length&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),t.length?this.parseChunk(t.shift()):i=!0},this._streamData=y(function(e){try{t.push("string"==typeof e?e:e.toString(this._config.encoding)),i&&(i=!1,this._checkIsFinished(),this.parseChunk(t.shift()))}catch(e){this._streamError(e)}},this),this._streamError=y(function(e){this._streamCleanUp(),this._sendError(e)},this),this._streamEnd=y(function(){this._streamCleanUp(),r=!0,this._streamData("")},this),this._streamCleanUp=y(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)},this)}function i(_){var a,o,h,r=Math.pow(2,53),n=-r,s=/^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i,u=/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,t=this,i=0,f=0,d=!1,e=!1,l=[],c={data:[],errors:[],meta:{}};if(q(_.step)){var p=_.step;_.step=function(e){if(c=e,m())g();else{if(g(),0===c.data.length)return;i+=e.data.length,_.preview&&i>_.preview?o.abort():(c.data=c.data[0],p(c,t))}}}function v(e){return"greedy"===_.skipEmptyLines?""===e.join("").trim():1===e.length&&0===e[0].length}function g(){if(c&&h&&(k("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+b.DefaultDelimiter+"'"),h=!1),_.skipEmptyLines)for(var e=0;e<c.data.length;e++)v(c.data[e])&&c.data.splice(e--,1);return m()&&function(){if(!c)return;function e(e){q(_.transformHeader)&&(e=_.transformHeader(e)),l.push(e)}if(Array.isArray(c.data[0])){for(var t=0;m()&&t<c.data.length;t++)c.data[t].forEach(e);c.data.splice(0,1)}else c.data.forEach(e)}(),function(){if(!c||!_.header&&!_.dynamicTyping&&!_.transform)return c;function e(e,t){var i,r=_.header?{}:[];for(i=0;i<e.length;i++){var n=i,s=e[i];_.header&&(n=i>=l.length?"__parsed_extra":l[i]),_.transform&&(s=_.transform(s,n)),s=y(n,s),"__parsed_extra"===n?(r[n]=r[n]||[],r[n].push(s)):r[n]=s}return _.header&&(i>l.length?k("FieldMismatch","TooManyFields","Too many fields: expected "+l.length+" fields but parsed "+i,f+t):i<l.length&&k("FieldMismatch","TooFewFields","Too few fields: expected "+l.length+" fields but parsed "+i,f+t)),r}var t=1;!c.data.length||Array.isArray(c.data[0])?(c.data=c.data.map(e),t=c.data.length):c.data=e(c.data,0);_.header&&c.meta&&(c.meta.fields=l);return f+=t,c}()}function m(){return _.header&&0===l.length}function y(e,t){return i=e,_.dynamicTypingFunction&&void 0===_.dynamicTyping[i]&&(_.dynamicTyping[i]=_.dynamicTypingFunction(i)),!0===(_.dynamicTyping[i]||_.dynamicTyping)?"true"===t||"TRUE"===t||"false"!==t&&"FALSE"!==t&&(function(e){if(s.test(e)){var t=parseFloat(e);if(n<t&&t<r)return!0}return!1}(t)?parseFloat(t):u.test(t)?new Date(t):""===t?null:t):t;var i}function k(e,t,i,r){var n={type:e,code:t,message:i};void 0!==r&&(n.row=r),c.errors.push(n)}this.parse=function(e,t,i){var r=_.quoteChar||'"';if(_.newline||(_.newline=function(e,t){e=e.substring(0,1048576);var i=new RegExp(U(t)+"([^]*?)"+U(t),"gm"),r=(e=e.replace(i,"")).split("\r"),n=e.split("\n"),s=1<n.length&&n[0].length<r[0].length;if(1===r.length||s)return"\n";for(var a=0,o=0;o<r.length;o++)"\n"===r[o][0]&&a++;return a>=r.length/2?"\r\n":"\r"}(e,r)),h=!1,_.delimiter)q(_.delimiter)&&(_.delimiter=_.delimiter(e),c.meta.delimiter=_.delimiter);else{var n=function(e,t,i,r,n){var s,a,o,h;n=n||[",","\t","|",";",b.RECORD_SEP,b.UNIT_SEP];for(var u=0;u<n.length;u++){var f=n[u],d=0,l=0,c=0;o=void 0;for(var p=new E({comments:r,delimiter:f,newline:t,preview:10}).parse(e),g=0;g<p.data.length;g++)if(i&&v(p.data[g]))c++;else{var m=p.data[g].length;l+=m,void 0!==o?0<m&&(d+=Math.abs(m-o),o=m):o=m}0<p.data.length&&(l/=p.data.length-c),(void 0===a||d<=a)&&(void 0===h||h<l)&&1.99<l&&(a=d,s=f,h=l)}return{successful:!!(_.delimiter=s),bestDelimiter:s}}(e,_.newline,_.skipEmptyLines,_.comments,_.delimitersToGuess);n.successful?_.delimiter=n.bestDelimiter:(h=!0,_.delimiter=b.DefaultDelimiter),c.meta.delimiter=_.delimiter}var s=w(_);return _.preview&&_.header&&s.preview++,a=e,o=new E(s),c=o.parse(a,t,i),g(),d?{meta:{paused:!0}}:c||{meta:{paused:!1}}},this.paused=function(){return d},this.pause=function(){d=!0,o.abort(),a=q(_.chunk)?"":a.substring(o.getCharIndex())},this.resume=function(){t.streamer._halted?(d=!1,t.streamer.parseChunk(a,!0)):setTimeout(this.resume,3)},this.aborted=function(){return e},this.abort=function(){e=!0,o.abort(),c.meta.aborted=!0,q(_.complete)&&_.complete(c),a=""}}function U(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function E(e){var O,D=(e=e||{}).delimiter,I=e.newline,T=e.comments,A=e.step,L=e.preview,F=e.fastMode,z=O=void 0===e.quoteChar?'"':e.quoteChar;if(void 0!==e.escapeChar&&(z=e.escapeChar),("string"!=typeof D||-1<b.BAD_DELIMITERS.indexOf(D))&&(D=","),T===D)throw new Error("Comment character same as delimiter");!0===T?T="#":("string"!=typeof T||-1<b.BAD_DELIMITERS.indexOf(T))&&(T=!1),"\n"!==I&&"\r"!==I&&"\r\n"!==I&&(I="\n");var M=0,j=!1;this.parse=function(a,t,i){if("string"!=typeof a)throw new Error("Input must be a string");var r=a.length,e=D.length,n=I.length,s=T.length,o=q(A),h=[],u=[],f=[],d=M=0;if(!a)return R();if(F||!1!==F&&-1===a.indexOf(O)){for(var l=a.split(I),c=0;c<l.length;c++){if(f=l[c],M+=f.length,c!==l.length-1)M+=I.length;else if(i)return R();if(!T||f.substring(0,s)!==T){if(o){if(h=[],b(f.split(D)),S(),j)return R()}else b(f.split(D));if(L&&L<=c)return h=h.slice(0,L),R(!0)}}return R()}for(var p=a.indexOf(D,M),g=a.indexOf(I,M),m=new RegExp(U(z)+U(O),"g"),_=a.indexOf(O,M);;)if(a[M]!==O)if(T&&0===f.length&&a.substring(M,M+s)===T){if(-1===g)return R();M=g+n,g=a.indexOf(I,M),p=a.indexOf(D,M)}else{if(-1!==p&&(p<g||-1===g)){if(!(p<_)){f.push(a.substring(M,p)),M=p+e,p=a.indexOf(D,M);continue}var v=x(p,_,g);if(v&&void 0!==v.nextDelim){p=v.nextDelim,_=v.quoteSearch,f.push(a.substring(M,p)),M=p+e,p=a.indexOf(D,M);continue}}if(-1===g)break;if(f.push(a.substring(M,g)),C(g+n),o&&(S(),j))return R();if(L&&h.length>=L)return R(!0)}else for(_=M,M++;;){if(-1===(_=a.indexOf(O,_+1)))return i||u.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:h.length,index:M}),w();if(_===r-1)return w(a.substring(M,_).replace(m,O));if(O!==z||a[_+1]!==z){if(O===z||0===_||a[_-1]!==z){-1!==p&&p<_+1&&(p=a.indexOf(D,_+1)),-1!==g&&g<_+1&&(g=a.indexOf(I,_+1));var y=E(-1===g?p:Math.min(p,g));if(a[_+1+y]===D){f.push(a.substring(M,_).replace(m,O)),a[M=_+1+y+e]!==O&&(_=a.indexOf(O,M)),p=a.indexOf(D,M),g=a.indexOf(I,M);break}var k=E(g);if(a.substring(_+1+k,_+1+k+n)===I){if(f.push(a.substring(M,_).replace(m,O)),C(_+1+k+n),p=a.indexOf(D,M),_=a.indexOf(O,M),o&&(S(),j))return R();if(L&&h.length>=L)return R(!0);break}u.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:h.length,index:M}),_++}}else _++}return w();function b(e){h.push(e),d=M}function E(e){var t=0;if(-1!==e){var i=a.substring(_+1,e);i&&""===i.trim()&&(t=i.length)}return t}function w(e){return i||(void 0===e&&(e=a.substring(M)),f.push(e),M=r,b(f),o&&S()),R()}function C(e){M=e,b(f),f=[],g=a.indexOf(I,M)}function R(e){return{data:h,errors:u,meta:{delimiter:D,linebreak:I,aborted:j,truncated:!!e,cursor:d+(t||0)}}}function S(){A(R()),h=[],u=[]}function x(e,t,i){var r={nextDelim:void 0,quoteSearch:void 0},n=a.indexOf(O,t+1);if(t<e&&e<n&&(n<i||-1===i)){var s=a.indexOf(D,n);if(-1===s)return r;n<s&&(n=a.indexOf(O,n+1)),r=x(s,n,i)}else r={nextDelim:e,quoteSearch:t};return r}},this.abort=function(){j=!0},this.getCharIndex=function(){return M}}function m(e){var t=e.data,i=a[t.workerId],r=!1;if(t.error)i.userError(t.error,t.file);else if(t.results&&t.results.data){var n={abort:function(){r=!0,_(t.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:v,resume:v};if(q(i.userStep)){for(var s=0;s<t.results.data.length&&(i.userStep({data:t.results.data[s],errors:t.results.errors,meta:t.results.meta},n),!r);s++);delete t.results}else q(i.userChunk)&&(i.userChunk(t.results,n,t.file),delete t.results)}t.finished&&!r&&_(t.workerId,t.results)}function _(e,t){var i=a[e];q(i.userComplete)&&i.userComplete(t),i.terminate(),delete a[e]}function v(){throw new Error("Not implemented.")}function w(e){if("object"!=typeof e||null===e)return e;var t=Array.isArray(e)?[]:{};for(var i in e)t[i]=w(e[i]);return t}function y(e,t){return function(){e.apply(t,arguments)}}function q(e){return"function"==typeof e}return o&&(f.onmessage=function(e){var t=e.data;void 0===b.WORKER_ID&&t&&(b.WORKER_ID=t.workerId);if("string"==typeof t.input)f.postMessage({workerId:b.WORKER_ID,results:b.parse(t.input,t.config),finished:!0});else if(f.File&&t.input instanceof File||t.input instanceof Object){var i=b.parse(t.input,t.config);i&&f.postMessage({workerId:b.WORKER_ID,results:i,finished:!0})}}),(l.prototype=Object.create(u.prototype)).constructor=l,(c.prototype=Object.create(u.prototype)).constructor=c,(p.prototype=Object.create(p.prototype)).constructor=p,(g.prototype=Object.create(u.prototype)).constructor=g,b});
},{}],"world-map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  "type": "Topology",
  "objects": {
    "countries": {
      "type": "GeometryCollection",
      "bbox": [-179.99999999999997, -90.00000000000003, 180.00000000000014, 83.64513000000001],
      "geometries": [{
        "type": "Polygon",
        "id": 4,
        "arcs": [[0, 1, 2, 3, 4, 5]]
      }, {
        "type": "MultiPolygon",
        "id": 24,
        "arcs": [[[6, 7, 8, 9]], [[10, 11, 12]]]
      }, {
        "type": "Polygon",
        "id": 8,
        "arcs": [[13, 14, 15, 16, 17]]
      }, {
        "type": "Polygon",
        "id": 784,
        "arcs": [[18, 19, 20, 21, 22]]
      }, {
        "type": "MultiPolygon",
        "id": 32,
        "arcs": [[[23, 24]], [[25, 26, 27, 28, 29, 30]]]
      }, {
        "type": "Polygon",
        "id": 51,
        "arcs": [[31, 32, 33, 34, 35]]
      }, {
        "type": "MultiPolygon",
        "id": 10,
        "arcs": [[[36]], [[37]], [[38]], [[39]], [[40]], [[41]], [[42]], [[43]]]
      }, {
        "type": "Polygon",
        "id": 260,
        "arcs": [[44]]
      }, {
        "type": "MultiPolygon",
        "id": 36,
        "arcs": [[[45]], [[46]]]
      }, {
        "type": "Polygon",
        "id": 40,
        "arcs": [[47, 48, 49, 50, 51, 52, 53]]
      }, {
        "type": "MultiPolygon",
        "id": 31,
        "arcs": [[[54, -35]], [[55, 56, -33, 57, 58]]]
      }, {
        "type": "Polygon",
        "id": 108,
        "arcs": [[59, 60, 61]]
      }, {
        "type": "Polygon",
        "id": 56,
        "arcs": [[62, 63, 64, 65, 66]]
      }, {
        "type": "Polygon",
        "id": 204,
        "arcs": [[67, 68, 69, 70, 71]]
      }, {
        "type": "Polygon",
        "id": 854,
        "arcs": [[72, 73, 74, -70, 75, 76]]
      }, {
        "type": "Polygon",
        "id": 50,
        "arcs": [[77, 78, 79]]
      }, {
        "type": "Polygon",
        "id": 100,
        "arcs": [[80, 81, 82, 83, 84, 85]]
      }, {
        "type": "MultiPolygon",
        "id": 44,
        "arcs": [[[86]], [[87]], [[88]]]
      }, {
        "type": "Polygon",
        "id": 70,
        "arcs": [[89, 90, 91]]
      }, {
        "type": "Polygon",
        "id": 112,
        "arcs": [[92, 93, 94, 95, 96]]
      }, {
        "type": "Polygon",
        "id": 84,
        "arcs": [[97, 98, 99]]
      }, {
        "type": "Polygon",
        "id": 68,
        "arcs": [[100, 101, 102, 103, -31]]
      }, {
        "type": "Polygon",
        "id": 76,
        "arcs": [[-27, 104, -103, 105, 106, 107, 108, 109, 110, 111, 112]]
      }, {
        "type": "Polygon",
        "id": 96,
        "arcs": [[113, 114]]
      }, {
        "type": "Polygon",
        "id": 64,
        "arcs": [[115, 116]]
      }, {
        "type": "Polygon",
        "id": 72,
        "arcs": [[117, 118, 119, 120]]
      }, {
        "type": "Polygon",
        "id": 140,
        "arcs": [[121, 122, 123, 124, 125, 126, 127]]
      }, {
        "type": "MultiPolygon",
        "id": 124,
        "arcs": [[[128]], [[129]], [[130]], [[131]], [[132]], [[133]], [[134]], [[135]], [[136]], [[137]], [[138, 139, 140, 141]], [[142]], [[143]], [[144]], [[145]], [[146]], [[147]], [[148]], [[149]], [[150]], [[151]], [[152]], [[153]], [[154]], [[155]], [[156]], [[157]], [[158]], [[159]], [[160]]]
      }, {
        "type": "Polygon",
        "id": 756,
        "arcs": [[-51, 161, 162, 163]]
      }, {
        "type": "MultiPolygon",
        "id": 152,
        "arcs": [[[-24, 164]], [[-30, 165, 166, -101]]]
      }, {
        "type": "MultiPolygon",
        "id": 156,
        "arcs": [[[167]], [[168, 169, 170, 171, 172, 173, -117, 174, 175, 176, 177, -4, 178, 179, 180, 181, 182, 183]]]
      }, {
        "type": "Polygon",
        "id": 384,
        "arcs": [[184, 185, 186, 187, -73, 188]]
      }, {
        "type": "Polygon",
        "id": 120,
        "arcs": [[189, 190, 191, 192, 193, 194, -128, 195]]
      }, {
        "type": "Polygon",
        "id": 180,
        "arcs": [[196, 197, -60, 198, 199, -10, 200, -13, 201, -126, 202]]
      }, {
        "type": "Polygon",
        "id": 178,
        "arcs": [[-12, 203, 204, -196, -127, -202]]
      }, {
        "type": "Polygon",
        "id": 170,
        "arcs": [[205, 206, 207, 208, 209, -107, 210]]
      }, {
        "type": "Polygon",
        "id": 188,
        "arcs": [[211, 212, 213, 214]]
      }, {
        "type": "Polygon",
        "id": 192,
        "arcs": [[215]]
      }, {
        "type": "Polygon",
        "id": -99,
        "arcs": [[216, 217]]
      }, {
        "type": "Polygon",
        "id": 196,
        "arcs": [[218, -218]]
      }, {
        "type": "Polygon",
        "id": 203,
        "arcs": [[-53, 219, 220, 221]]
      }, {
        "type": "Polygon",
        "id": 276,
        "arcs": [[222, 223, -220, -52, -164, 224, 225, -64, 226, 227, 228]]
      }, {
        "type": "Polygon",
        "id": 262,
        "arcs": [[229, 230, 231, 232]]
      }, {
        "type": "MultiPolygon",
        "id": 208,
        "arcs": [[[233]], [[-229, 234]]]
      }, {
        "type": "Polygon",
        "id": 214,
        "arcs": [[235, 236]]
      }, {
        "type": "Polygon",
        "id": 12,
        "arcs": [[237, 238, 239, 240, 241, 242, 243, 244]]
      }, {
        "type": "Polygon",
        "id": 218,
        "arcs": [[245, -206, 246]]
      }, {
        "type": "Polygon",
        "id": 818,
        "arcs": [[247, 248, 249, 250, 251]]
      }, {
        "type": "Polygon",
        "id": 232,
        "arcs": [[252, 253, 254, -233]]
      }, {
        "type": "Polygon",
        "id": 724,
        "arcs": [[255, 256, 257, 258]]
      }, {
        "type": "Polygon",
        "id": 233,
        "arcs": [[259, 260, 261]]
      }, {
        "type": "Polygon",
        "id": 231,
        "arcs": [[-232, 262, 263, 264, 265, 266, 267, -253]]
      }, {
        "type": "Polygon",
        "id": 246,
        "arcs": [[268, 269, 270, 271]]
      }, {
        "type": "MultiPolygon",
        "id": 242,
        "arcs": [[[272]], [[273]]]
      }, {
        "type": "Polygon",
        "id": 238,
        "arcs": [[274]]
      }, {
        "type": "MultiPolygon",
        "id": 250,
        "arcs": [[[275, 276, 277, -111]], [[278]], [[279, -225, -163, 280, 281, -257, 282, -66]]]
      }, {
        "type": "Polygon",
        "id": 266,
        "arcs": [[283, 284, -190, -205]]
      }, {
        "type": "MultiPolygon",
        "id": 826,
        "arcs": [[[285, 286]], [[287]]]
      }, {
        "type": "Polygon",
        "id": 268,
        "arcs": [[288, 289, -58, -32, 290]]
      }, {
        "type": "Polygon",
        "id": 288,
        "arcs": [[291, -189, -77, 292]]
      }, {
        "type": "Polygon",
        "id": 324,
        "arcs": [[293, 294, 295, 296, 297, 298, -187]]
      }, {
        "type": "Polygon",
        "id": 270,
        "arcs": [[299, 300]]
      }, {
        "type": "Polygon",
        "id": 624,
        "arcs": [[301, 302, -297]]
      }, {
        "type": "Polygon",
        "id": 226,
        "arcs": [[303, -191, -285]]
      }, {
        "type": "MultiPolygon",
        "id": 300,
        "arcs": [[[304]], [[305, -15, 306, -84, 307]]]
      }, {
        "type": "Polygon",
        "id": 304,
        "arcs": [[308]]
      }, {
        "type": "Polygon",
        "id": 320,
        "arcs": [[309, 310, -100, 311, 312, 313]]
      }, {
        "type": "Polygon",
        "id": 328,
        "arcs": [[314, 315, -109, 316]]
      }, {
        "type": "Polygon",
        "id": 340,
        "arcs": [[317, 318, -313, 319, 320]]
      }, {
        "type": "Polygon",
        "id": 191,
        "arcs": [[321, -92, 322, 323, 324, 325]]
      }, {
        "type": "Polygon",
        "id": 332,
        "arcs": [[-237, 326]]
      }, {
        "type": "Polygon",
        "id": 348,
        "arcs": [[-48, 327, 328, 329, 330, -326, 331]]
      }, {
        "type": "MultiPolygon",
        "id": 360,
        "arcs": [[[332]], [[333, 334]], [[335]], [[336]], [[337]], [[338]], [[339]], [[340]], [[341, 342]], [[343]], [[344]], [[345, 346]], [[347]]]
      }, {
        "type": "Polygon",
        "id": 356,
        "arcs": [[-177, 348, -175, -116, -174, 349, -80, 350, 351]]
      }, {
        "type": "Polygon",
        "id": 372,
        "arcs": [[352, -286]]
      }, {
        "type": "Polygon",
        "id": 364,
        "arcs": [[353, -6, 354, 355, 356, 357, -55, -34, -57, 358]]
      }, {
        "type": "Polygon",
        "id": 368,
        "arcs": [[359, 360, 361, 362, 363, 364, -357]]
      }, {
        "type": "Polygon",
        "id": 352,
        "arcs": [[365]]
      }, {
        "type": "Polygon",
        "id": 376,
        "arcs": [[366, 367, 368, -252, 369, 370, 371]]
      }, {
        "type": "MultiPolygon",
        "id": 380,
        "arcs": [[[372]], [[373]], [[374, 375, -281, -162, -50]]]
      }, {
        "type": "Polygon",
        "id": 388,
        "arcs": [[376]]
      }, {
        "type": "Polygon",
        "id": 400,
        "arcs": [[-367, 377, -363, 378, 379, -369, 380]]
      }, {
        "type": "MultiPolygon",
        "id": 392,
        "arcs": [[[381]], [[382]], [[383]]]
      }, {
        "type": "Polygon",
        "id": 398,
        "arcs": [[384, 385, 386, 387, -181, 388]]
      }, {
        "type": "Polygon",
        "id": 404,
        "arcs": [[389, 390, 391, 392, -265, 393]]
      }, {
        "type": "Polygon",
        "id": 417,
        "arcs": [[-389, -180, 394, 395]]
      }, {
        "type": "Polygon",
        "id": 116,
        "arcs": [[396, 397, 398, 399]]
      }, {
        "type": "Polygon",
        "id": 410,
        "arcs": [[400, 401]]
      }, {
        "type": "Polygon",
        "id": -99,
        "arcs": [[-18, 402, 403, 404]]
      }, {
        "type": "Polygon",
        "id": 414,
        "arcs": [[405, 406, -361]]
      }, {
        "type": "Polygon",
        "id": 418,
        "arcs": [[407, 408, -172, 409, -398]]
      }, {
        "type": "Polygon",
        "id": 422,
        "arcs": [[-371, 410, 411]]
      }, {
        "type": "Polygon",
        "id": 430,
        "arcs": [[412, 413, -294, -186]]
      }, {
        "type": "Polygon",
        "id": 434,
        "arcs": [[414, -245, 415, 416, -250, 417, 418]]
      }, {
        "type": "Polygon",
        "id": 144,
        "arcs": [[419]]
      }, {
        "type": "Polygon",
        "id": 426,
        "arcs": [[420]]
      }, {
        "type": "Polygon",
        "id": 440,
        "arcs": [[421, 422, 423, -93, 424]]
      }, {
        "type": "Polygon",
        "id": 442,
        "arcs": [[-226, -280, -65]]
      }, {
        "type": "Polygon",
        "id": 428,
        "arcs": [[425, -262, 426, -94, -424]]
      }, {
        "type": "Polygon",
        "id": 504,
        "arcs": [[-242, 427, 428]]
      }, {
        "type": "Polygon",
        "id": 498,
        "arcs": [[429, 430]]
      }, {
        "type": "Polygon",
        "id": 450,
        "arcs": [[431]]
      }, {
        "type": "Polygon",
        "id": 484,
        "arcs": [[432, -98, -311, 433, 434]]
      }, {
        "type": "Polygon",
        "id": 807,
        "arcs": [[-405, 435, -85, -307, -14]]
      }, {
        "type": "Polygon",
        "id": 466,
        "arcs": [[436, -239, 437, -74, -188, -299, 438]]
      }, {
        "type": "Polygon",
        "id": 104,
        "arcs": [[439, -78, -350, -173, -409, 440]]
      }, {
        "type": "Polygon",
        "id": 499,
        "arcs": [[441, -323, -91, 442, -403, -17]]
      }, {
        "type": "Polygon",
        "id": 496,
        "arcs": [[443, -183]]
      }, {
        "type": "Polygon",
        "id": 508,
        "arcs": [[444, 445, 446, 447, 448, 449, 450, 451]]
      }, {
        "type": "Polygon",
        "id": 478,
        "arcs": [[452, 453, 454, -240, -437]]
      }, {
        "type": "Polygon",
        "id": 454,
        "arcs": [[-452, 455, 456]]
      }, {
        "type": "MultiPolygon",
        "id": 458,
        "arcs": [[[457, 458]], [[-346, 459, -115, 460]]]
      }, {
        "type": "Polygon",
        "id": 516,
        "arcs": [[461, -8, 462, -119, 463]]
      }, {
        "type": "Polygon",
        "id": 540,
        "arcs": [[464]]
      }, {
        "type": "Polygon",
        "id": 562,
        "arcs": [[-75, -438, -238, -415, 465, -194, 466, -71]]
      }, {
        "type": "Polygon",
        "id": 566,
        "arcs": [[467, -72, -467, -193]]
      }, {
        "type": "Polygon",
        "id": 558,
        "arcs": [[468, -321, 469, -213]]
      }, {
        "type": "Polygon",
        "id": 528,
        "arcs": [[-227, -63, 470]]
      }, {
        "type": "MultiPolygon",
        "id": 578,
        "arcs": [[[471, -272, 472, 473]], [[474]], [[475]], [[476]]]
      }, {
        "type": "Polygon",
        "id": 524,
        "arcs": [[-349, -176]]
      }, {
        "type": "MultiPolygon",
        "id": 554,
        "arcs": [[[477]], [[478]]]
      }, {
        "type": "MultiPolygon",
        "id": 512,
        "arcs": [[[479, 480, -22, 481]], [[-20, 482]]]
      }, {
        "type": "Polygon",
        "id": 586,
        "arcs": [[-178, -352, 483, -355, -5]]
      }, {
        "type": "Polygon",
        "id": 591,
        "arcs": [[484, -215, 485, -208]]
      }, {
        "type": "Polygon",
        "id": 604,
        "arcs": [[-167, 486, -247, -211, -106, -102]]
      }, {
        "type": "MultiPolygon",
        "id": 608,
        "arcs": [[[487]], [[488]], [[489]], [[490]], [[491]], [[492]], [[493]]]
      }, {
        "type": "MultiPolygon",
        "id": 598,
        "arcs": [[[494]], [[495]], [[-342, 496]], [[497]]]
      }, {
        "type": "Polygon",
        "id": 616,
        "arcs": [[-224, 498, 499, -425, -97, 500, 501, -221]]
      }, {
        "type": "Polygon",
        "id": 630,
        "arcs": [[502]]
      }, {
        "type": "Polygon",
        "id": 408,
        "arcs": [[503, 504, -402, 505, -169]]
      }, {
        "type": "Polygon",
        "id": 620,
        "arcs": [[-259, 506]]
      }, {
        "type": "Polygon",
        "id": 600,
        "arcs": [[-104, -105, -26]]
      }, {
        "type": "Polygon",
        "id": 275,
        "arcs": [[-381, -368]]
      }, {
        "type": "Polygon",
        "id": 634,
        "arcs": [[507, 508]]
      }, {
        "type": "Polygon",
        "id": 642,
        "arcs": [[509, -431, 510, 511, -81, 512, -330]]
      }, {
        "type": "MultiPolygon",
        "id": 643,
        "arcs": [[[513]], [[-500, 514, -422]], [[515]], [[516]], [[517]], [[518]], [[519]], [[-504, -184, -444, -182, -388, 520, -59, -290, 521, 522, -95, -427, -261, 523, -269, -472, 524]], [[525]], [[526]], [[527]]]
      }, {
        "type": "Polygon",
        "id": 646,
        "arcs": [[528, -61, -198, 529]]
      }, {
        "type": "Polygon",
        "id": 732,
        "arcs": [[-241, -455, 530, -428]]
      }, {
        "type": "Polygon",
        "id": 682,
        "arcs": [[531, -379, -362, -407, 532, -509, 533, -23, -481, 534]]
      }, {
        "type": "Polygon",
        "id": 729,
        "arcs": [[535, 536, -123, 537, -418, -249, 538, -254, -268, 539]]
      }, {
        "type": "Polygon",
        "id": 728,
        "arcs": [[540, -266, -393, 541, -203, -125, 542, -536]]
      }, {
        "type": "Polygon",
        "id": 686,
        "arcs": [[543, -453, -439, -298, -303, 544, -301]]
      }, {
        "type": "MultiPolygon",
        "id": 90,
        "arcs": [[[545]], [[546]], [[547]], [[548]], [[549]]]
      }, {
        "type": "Polygon",
        "id": 694,
        "arcs": [[550, -295, -414]]
      }, {
        "type": "Polygon",
        "id": 222,
        "arcs": [[551, -314, -319]]
      }, {
        "type": "Polygon",
        "id": -99,
        "arcs": [[-263, -231, 552, 553]]
      }, {
        "type": "Polygon",
        "id": 706,
        "arcs": [[-394, -264, -554, 554]]
      }, {
        "type": "Polygon",
        "id": 688,
        "arcs": [[-86, -436, -404, -443, -90, -322, -331, -513]]
      }, {
        "type": "Polygon",
        "id": 740,
        "arcs": [[555, -277, 556, -110, -316]]
      }, {
        "type": "Polygon",
        "id": 703,
        "arcs": [[-502, 557, -328, -54, -222]]
      }, {
        "type": "Polygon",
        "id": 705,
        "arcs": [[-49, -332, -325, 558, -375]]
      }, {
        "type": "Polygon",
        "id": 752,
        "arcs": [[-473, -271, 559]]
      }, {
        "type": "Polygon",
        "id": 748,
        "arcs": [[560, -448]]
      }, {
        "type": "Polygon",
        "id": 760,
        "arcs": [[-378, -372, -412, 561, 562, -364]]
      }, {
        "type": "Polygon",
        "id": 148,
        "arcs": [[-466, -419, -538, -122, -195]]
      }, {
        "type": "Polygon",
        "id": 768,
        "arcs": [[563, -293, -76, -69]]
      }, {
        "type": "Polygon",
        "id": 764,
        "arcs": [[564, -459, 565, -441, -408, -397]]
      }, {
        "type": "Polygon",
        "id": 762,
        "arcs": [[-395, -179, -3, 566]]
      }, {
        "type": "Polygon",
        "id": 795,
        "arcs": [[-354, 567, -386, 568, -1]]
      }, {
        "type": "Polygon",
        "id": 626,
        "arcs": [[569, -334]]
      }, {
        "type": "Polygon",
        "id": 780,
        "arcs": [[570]]
      }, {
        "type": "Polygon",
        "id": 788,
        "arcs": [[-244, 571, -416]]
      }, {
        "type": "MultiPolygon",
        "id": 792,
        "arcs": [[[-291, -36, -358, -365, -563, 572]], [[-308, -83, 573]]]
      }, {
        "type": "Polygon",
        "id": 158,
        "arcs": [[574]]
      }, {
        "type": "Polygon",
        "id": 834,
        "arcs": [[-391, 575, -445, -457, 576, -199, -62, -529, 577]]
      }, {
        "type": "Polygon",
        "id": 800,
        "arcs": [[-530, -197, -542, -392, -578]]
      }, {
        "type": "Polygon",
        "id": 804,
        "arcs": [[-523, 578, -511, -430, -510, -329, -558, -501, -96]]
      }, {
        "type": "Polygon",
        "id": 858,
        "arcs": [[-113, 579, -28]]
      }, {
        "type": "MultiPolygon",
        "id": 840,
        "arcs": [[[580]], [[581]], [[582]], [[583]], [[584]], [[585, -435, 586, -139]], [[587]], [[588]], [[589]], [[-141, 590]]]
      }, {
        "type": "Polygon",
        "id": 860,
        "arcs": [[-569, -385, -396, -567, -2]]
      }, {
        "type": "Polygon",
        "id": 862,
        "arcs": [[591, -317, -108, -210]]
      }, {
        "type": "Polygon",
        "id": 704,
        "arcs": [[592, -399, -410, -171]]
      }, {
        "type": "MultiPolygon",
        "id": 548,
        "arcs": [[[593]], [[594]]]
      }, {
        "type": "Polygon",
        "id": 887,
        "arcs": [[595, -535, -480]]
      }, {
        "type": "Polygon",
        "id": 710,
        "arcs": [[-464, -118, 596, -449, -561, -447, 597], [-421]]
      }, {
        "type": "Polygon",
        "id": 894,
        "arcs": [[-456, -451, 598, -120, -463, -7, -200, -577]]
      }, {
        "type": "Polygon",
        "id": 716,
        "arcs": [[-597, -121, -599, -450]]
      }]
    },
    "land": {
      "type": "MultiPolygon",
      "arcs": [[[592, 399, 564, 457, 565, 439, 78, 350, 483, 355, 359, 405, 532, 507, 533, 18, 482, 20, 481, 595, 531, 379, 247, 538, 254, 229, 552, 554, 389, 575, 445, 597, 461, 8, 200, 10, 203, 283, 303, 191, 467, 67, 563, 291, 184, 412, 550, 295, 301, 544, 299, 543, 453, 530, 428, 242, 571, 416, 250, 369, 410, 561, 572, 288, 521, 578, 511, 81, 573, 305, 15, 441, 323, 558, 375, 281, 257, 506, 255, 282, 66, 470, 227, 234, 222, 498, 514, 422, 425, 259, 523, 269, 559, 473, 524, 504, 400, 505, 169], [123, 542, 536], [540, 266, 539], [386, 520, 55, 358, 567]], [[24, 164]], [[579, 28, 165, 486, 245, 206, 484, 211, 468, 317, 551, 309, 433, 586, 139, 590, 141, 585, 432, 98, 311, 319, 469, 213, 485, 208, 591, 314, 555, 277, 111], [556, 275]], [[36]], [[37]], [[38]], [[39]], [[40]], [[41]], [[42]], [[43]], [[44]], [[45]], [[46]], [[86]], [[87]], [[88]], [[459, 113, 460, 346]], [[128]], [[129]], [[130]], [[131]], [[132]], [[133]], [[134]], [[135]], [[136]], [[137]], [[142]], [[143]], [[144]], [[145]], [[146]], [[147]], [[148]], [[149]], [[150]], [[151]], [[152]], [[153]], [[154]], [[155]], [[156]], [[157]], [[158]], [[159]], [[160]], [[167]], [[215]], [[216, 218]], [[233]], [[235, 326]], [[272]], [[273]], [[274]], [[278]], [[286, 352]], [[287]], [[304]], [[308]], [[332]], [[334, 569]], [[335]], [[336]], [[337]], [[338]], [[339]], [[340]], [[342, 496]], [[343]], [[344]], [[347]], [[365]], [[372]], [[373]], [[376]], [[381]], [[382]], [[383]], [[419]], [[431]], [[464]], [[474]], [[475]], [[476]], [[477]], [[478]], [[487]], [[488]], [[489]], [[490]], [[491]], [[492]], [[493]], [[494]], [[495]], [[497]], [[502]], [[513]], [[515]], [[516]], [[517]], [[518]], [[519]], [[525]], [[526]], [[527]], [[545]], [[546]], [[547]], [[548]], [[549]], [[570]], [[574]], [[580]], [[581]], [[582]], [[583]], [[584]], [[587]], [[588]], [[589]], [[593]], [[594]]]
    }
  },
  "arcs": [[[67002, 72360], [284, -219], [209, 77], [58, 261], [219, 87], [157, 175], [55, 460], [234, 112], [44, 205], [131, -154], [84, -18]], [[68477, 73346], [154, -4], [210, -122]], [[68841, 73220], [85, -70], [201, 185], [93, -111], [90, 264], [166, -12], [43, 84], [29, 233], [120, 200], [150, -131], [-30, -176], [84, -27], [-26, -484], [110, -189], [97, 121], [123, 57], [173, 258], [192, -42], [286, -1]], [[70827, 73379], [50, -165]], [[70877, 73214], [-162, -65], [-141, -106], [-319, -67], [-298, -121], [-163, -251], [66, -244], [32, -287], [-139, -242], [12, -221], [-76, -207], [-265, 18], [110, -381], [-177, -146], [-118, -347], [15, -346], [-108, -162], [-103, 53], [-212, -75], [-31, -161], [-207, 1], [-154, -326], [-10, -490], [-361, -239], [-194, 50], [-56, -126], [-166, 74], [-278, -87], [-465, 294]], [[66909, 69007], [252, 523], [-23, 370], [-210, 97], [-22, 366], [-91, 460], [119, 315], [-121, 85], [76, 419], [113, 718]], [[56642, 45537], [29, -179], [-32, -279], [49, -270], [-41, -216], [24, -199], [-579, 7], [-13, -1832], [188, -471], [181, -360]], [[56448, 41738], [-510, -235], [-673, 82], [-192, 276], [-1126, -25], [-42, -40], [-166, 260], [-180, 17], [-166, -98], [-134, -110]], [[53259, 41865], [-26, 363], [38, 506], [96, 527], [15, 247], [90, 519], [66, 236], [159, 377], [90, 256], [29, 427], [-15, 326], [-83, 206], [-74, 350], [-68, 345], [15, 120], [85, 228], [-84, 557], [-57, 385], [-139, 364], [26, 112]], [[53422, 48316], [115, 78], [80, -11], [98, 69], [820, -7], [68, -430], [80, -345], [64, -186], [106, -301], [184, 46], [91, 81], [154, -81], [42, 144], [69, 336], [172, 22], [15, 100], [142, 2], [-24, -207], [337, 5], [5, -363], [56, -222], [-41, -347], [21, -354], [93, -214], [-15, -685], [68, 53], [121, -15], [172, 87], [127, -34]], [[53383, 48495], [-74, 433]], [[53309, 48928], [112, 249], [84, 97], [104, -198]], [[53609, 49076], [-101, -121], [-45, -148], [-9, -251], [-71, -61]], [[55719, 75933], [-35, -196], [39, -247], [115, -140]], [[55838, 75350], [-5, -151], [-91, -84], [-16, -187], [-129, -279]], [[55597, 74649], [-48, 40], [-5, 127], [-154, 193], [-24, 274], [23, 393], [38, 179], [-47, 91]], [[55380, 75946], [-18, 183], [120, 284], [18, -109], [75, 51]], [[55575, 76355], [59, -154], [66, -59], [19, -209]], [[64327, 65792], [49, 28], [11, -158], [217, 91], [230, -15], [168, -17], [190, 389], [207, 369], [176, 355]], [[65575, 66834], [52, -196]], [[65627, 66638], [38, -455]], [[65665, 66183], [-142, -2], [-23, -375], [50, -80], [-126, -114], [-1, -235], [-81, -238], [-7, -232]], [[65335, 64907], [-56, -122], [-835, 290], [-106, 584], [-11, 133]], [[31400, 20215], [-168, 16], [-297, 0], [0, 1286]], [[30935, 21517], [106, -267], [139, -432], [361, -345], [389, -144], [-125, -288], [-264, -29], [-141, 203]], [[32587, 39017], [511, -940], [227, -88], [339, -425], [286, -225], [40, -254], [-273, -876], [280, -156], [312, -88], [220, 92], [252, 441], [45, 509]], [[34826, 37007], [138, 110], [139, -332], [-6, -460], [-234, -318], [-186, -234], [-314, -559], [-370, -786]], [[33993, 34428], [-70, -461], [-74, -592], [3, -573], [-61, -128], [-21, -372]], [[33770, 32302], [-19, -301], [353, -493], [-38, -397], [173, -251], [-14, -282], [-267, -738], [-412, -309], [-557, -120], [-305, 58], [59, -343], [-57, -431], [51, -291], [-167, -202], [-284, -80], [-267, 210], [-108, -151], [39, -572], [188, -173], [152, 181], [82, -299], [-255, -179], [-223, -358], [-41, -579], [-66, -309], [-262, -1], [-218, -295], [-80, -432], [273, -422], [266, -116], [-96, -517], [-328, -325], [-180, -675], [-254, -227], [-113, -270], [89, -598], [185, -333], [-117, 29]], [[30952, 21711], [-257, 90], [-672, 77], [-115, 336], [6, 431], [-185, -37], [-98, 209], [-24, 611], [213, 253], [88, 365], [-33, 292], [148, 491], [101, 763], [-30, 338], [122, 109], [-30, 217], [-129, 115], [92, 242], [-126, 218], [-65, 665], [112, 117], [-47, 702], [65, 590], [75, 513], [166, 209], [-84, 563], [-1, 529], [210, 376], [-7, 481], [159, 562], [1, 530], [-72, 105], [-128, 994], [171, 592], [-27, 558], [100, 523], [182, 540], [196, 358], [-83, 226], [58, 186], [-9, 960], [302, 284], [96, 598], [-34, 144]], [[31359, 38736], [231, 521], [364, -141], [163, -416], [109, 464], [316, -24], [45, -123]], [[62106, 75494], [386, 89]], [[62492, 75583], [57, -151], [106, -100], [-56, -144], [148, -198], [-78, -183], [118, -157], [124, -94], [7, -399]], [[62918, 74157], [-101, -17]], [[62817, 74140], [-113, 333], [1, 89], [-123, -2], [-82, 155], [-58, -16]], [[62442, 74699], [-109, 168], [-207, 144], [27, 280], [-47, 203]], [[33452, 5736], [-82, -294], [-81, -259], [-582, 79], [-621, -34], [-348, 192], [0, 22], [-152, 170], [625, -23], [599, -56], [207, 237], [147, 203], [288, -237]], [[5775, 6048], [-533, -79], [-364, 204], [-163, 203], [-11, 34], [-180, 158], [169, 214], [517, -90], [277, -181], [212, -203], [76, -260]], [[37457, 6883], [342, -248], [120, -350], [33, -248], [11, -293], [-430, -181], [-452, -146], [-522, -136], [-582, -113], [-658, 34], [-365, 192], [49, 237], [593, 158], [239, 192], [174, 248], [126, 214], [168, 203], [180, 238], [0, -1], [141, 0], [414, 125], [419, -125]], [[16330, 9501], [359, -90], [332, 102], [-158, -203], [-261, -147], [-386, 45], [-278, 203], [60, 192], [332, -102]], [[15122, 9513], [425, -226], [-164, 23], [-359, 56], [-381, 158], [202, 124], [277, -135]], [[22505, 10404], [305, -79], [304, 68], [163, -327], [-217, 45], [-337, -23], [-343, 23], [-376, -34], [-283, 113], [-146, 237], [174, 101], [353, -79], [403, -45]], [[30985, 10967], [33, -259], [-49, -226], [-76, -214], [-326, -79], [-311, -113], [-364, 11], [136, 226], [-327, -79], [-310, -79], [-212, 169], [-16, 237], [305, 226], [190, 67], [321, -22], [82, 293], [16, 215], [-6, 462], [158, 271], [256, 90], [147, -214], [65, -214], [120, -260], [92, -248], [76, -260]], [[0, 3044], [16, -4], [245, 335], [501, -181], [32, 21], [294, 183], [38, -6], [32, -5], [402, -239], [352, 239], [63, 33], [816, 102], [265, -135], [130, -68], [419, -192], [789, -147], [625, -180], [1072, -136], [800, 158], [1181, -113], [669, -180], [734, 169], [773, 158], [60, 271], [-1094, 22], [-898, 136], [-234, 225], [-745, 125], [49, 259], [103, 237], [104, 214], [-55, 237], [-462, 158], [-212, 204], [-430, 180], [675, -34], [642, 91], [402, -192], [495, 169], [457, 214], [223, 192], [-98, 237], [-359, 158], [-408, 169], [-571, 34], [-500, 79], [-539, 57], [-180, 214], [-359, 181], [-217, 203], [-87, 654], [136, -56], [250, -181], [457, 57], [441, 79], [228, -249], [441, 57], [370, 124], [348, 158], [315, 192], [419, 56], [-11, 215], [-97, 214], [81, 203], [359, 102], [163, -192], [425, 113], [321, 146], [397, 12], [375, 56], [376, 136], [299, 124], [337, 124], [218, -34], [190, -45], [414, 79], [370, -102], [381, 12], [364, 79], [375, -57], [414, -56], [386, 22], [403, -11], [413, -11], [381, 22], [283, 170], [337, 90], [349, -124], [331, 101], [300, 203], [179, -180], [98, -203], [180, -192], [288, 169], [332, -214], [375, -68], [321, -158], [392, 34], [354, 101], [418, -22], [376, -79], [381, -102], [147, 249], [-180, 191], [-136, 204], [-359, 45], [-158, 214], [-60, 214], [-98, 429], [213, -79], [364, -34], [359, 34], [327, -90], [283, -169], [119, -203], [376, -34], [359, 79], [381, 113], [342, 67], [283, -135], [370, 45], [239, 440], [224, -259], [321, -102], [348, 56], [228, -225], [365, -23], [337, -68], [332, -124], [218, 215], [108, 203], [278, -226], [381, 57], [283, -125], [190, -191], [370, 56], [288, 124], [283, 147], [337, 79], [392, 68], [354, 79], [272, 124], [163, 180], [65, 249], [-32, 236], [-87, 226], [-98, 226], [-87, 226], [-71, 203], [-16, 225], [27, 226], [130, 214], [109, 237], [44, 226], [-55, 248], [-32, 226], [136, 260], [152, 169], [180, 214], [190, 181], [223, 169], [109, 248], [152, 158], [174, 147], [267, 34], [174, 180], [196, 113], [228, 68], [202, 147], [157, 180], [218, 68], [163, -147], [-103, -192], [-283, -169], [-120, -124], [-206, 90], [-229, -56], [-190, -136], [-202, -146], [-136, -170], [-38, -225], [17, -215], [130, -191], [-190, -136], [-261, -45], [-153, -192], [-163, -180], [-174, -249], [-44, -214], [98, -237], [147, -181], [229, -135], [212, -181], [114, -225], [60, -215], [82, -225], [130, -192], [82, -215], [38, -530], [81, -214], [22, -226], [87, -226], [-38, -304], [-152, -237], [-163, -192], [-370, -79], [-125, -203], [-169, -192], [-419, -215], [-370, -90], [-348, -124], [-376, -124], [-223, -237], [-446, -23], [-489, 23], [-441, -45], [-468, 0], [87, -226], [424, -101], [311, -158], [174, -204], [-310, -180], [-479, 56], [-397, -146], [-17, -237], [-11, -226], [327, -192], [60, -214], [353, -215], [588, -90], [500, -158], [398, -180], [506, -181], [690, -90], [681, -158], [473, -170], [517, -191], [272, -271], [136, -215], [337, 204], [457, 169], [484, 180], [577, 147], [495, 158], [691, 11], [680, -79], [560, -135], [180, 248], [386, 169], [702, 12], [550, 124], [522, 124], [577, 79], [614, 102], [430, 146], [-196, 203], [-119, 203], [0, 215], [-539, -23], [-571, -90], [-544, 0], [-77, 214], [39, 429], [125, 124], [397, 136], [468, 135], [337, 169], [337, 170], [251, 225], [380, 102], [376, 79], [190, 45], [430, 23], [408, 79], [343, 112], [337, 136], [305, 135], [386, 181], [245, 192], [261, 169], [82, 226], [-294, 135], [98, 237], [185, 181], [288, 112], [305, 136], [283, 180], [217, 226], [136, 271], [202, 158], [331, -34], [136, -192], [332, -22], [11, 214], [142, 226], [299, -57], [71, -214], [331, -34], [360, 102], [348, 67], [315, -34], [120, -237], [305, 192], [283, 102], [315, 79], [310, 79], [283, 135], [310, 91], [240, 124], [168, 203], [207, -147], [288, 79], [202, -271], [157, -203], [316, 113], [125, 226], [283, 158], [365, -34], [108, -215], [229, 215], [299, 68], [326, 22], [294, -11], [310, -68], [300, -34], [130, -192], [180, -169], [304, 102], [327, 22], [315, 0], [310, 12], [278, 79], [294, 67], [245, 158], [261, 102], [283, 56], [212, 158], [152, 316], [158, 192], [288, -90], [109, -203], [239, -136], [289, 45], [196, -203], [206, -146], [283, 135], [98, 248], [250, 102], [289, 192], [272, 79], [326, 112], [218, 125], [228, 135], [218, 124], [261, -68], [250, 203], [180, 158], [261, -11], [229, 136], [54, 203], [234, 158], [228, 113], [278, 90], [256, 45], [244, -34], [262, -56], [223, -158], [27, -249], [245, -191], [168, -158], [332, -68], [185, -158], [229, -158], [266, -34], [223, 113], [240, 237], [261, -124], [272, -68], [261, -68], [272, -45], [277, 0], [229, -598], [-11, -147], [-33, -259], [-266, -147], [-218, -214], [38, -226], [310, 11], [-38, -225], [-141, -215], [-131, -237], [212, -180], [321, -57], [321, 102], [153, 226], [92, 214], [153, 181], [174, 169], [70, 203], [147, 282], [174, 57], [316, 22], [277, 68], [283, 90], [136, 226], [82, 214], [190, 215], [272, 146], [234, 113], [153, 192], [157, 101], [202, 91], [277, -57], [250, 57], [272, 67], [305, -33], [201, 158], [142, 383], [103, -158], [131, -271], [234, -112], [266, -46], [267, 68], [283, -45], [261, -11], [174, 56], [234, -34], [212, -124], [250, 79], [300, 0], [255, 79], [289, -79], [185, 192], [141, 192], [191, 158], [348, 429], [179, -79], [212, -158], [185, -203], [354, -350], [272, -12], [256, 0], [299, 68], [299, 79], [229, 158], [190, 169], [310, 23], [207, 124], [218, -113], [141, -180], [196, -181], [305, 23], [190, -147], [332, -147], [348, -56], [288, 45], [218, 181], [185, 180], [250, 45], [251, -79], [288, -56], [261, 90], [250, 0], [245, -56], [256, -57], [250, 102], [299, 90], [283, 23], [316, 0], [255, 56], [251, 45], [76, 282], [11, 237], [174, -158], [49, -259], [92, -237], [115, -192], [234, -102], [315, 34], [365, 12], [250, 33], [364, 0], [262, 12], [364, -23], [310, -45], [196, -181], [-54, -214], [179, -169], [299, -136], [310, -146], [360, -102], [375, -90], [283, -90], [315, -12], [180, 192], [245, -158], [212, -180], [245, -136], [337, -56], [321, -68], [136, -226], [316, -135], [212, -203], [310, -90], [321, 11], [299, -34], [332, 11], [332, -45], [310, -79], [288, -135], [289, -113], [195, -169], [-32, -226], [-147, -203], [-125, -260], [-98, -203], [-131, -237], [-364, -90], [-163, -203], [-360, -124], [-125, -226], [-190, -214], [-201, -181], [-115, -237], [-70, -214], [-28, -260], [6, -214], [158, -226], [60, -214], [130, -204], [517, -78], [109, -249], [-501, -90], [-424, -124], [-528, -23], [-234, -327], [-49, -271], [-119, -214], [-147, -215], [370, -191], [141, -237], [239, -215], [338, -192], [386, -180], [419, -181], [636, -180], [142, -282], [800, -125], [53, -44], [208, -170], [767, 147], [636, -181], [-99520, -139]], [[69148, 23827], [179, -181], [263, -72], [9, -110], [-77, -262], [-427, -37], [-7, 306], [41, 238], [19, 118]], [[90387, 28338], [269, -199], [151, 79], [217, 111], [166, -39], [20, -684], [-95, -198], [-29, -463], [-97, 157], [-193, -401], [-57, 31], [-171, 18], [-171, 493], [-38, 380], [-160, 502], [7, 264], [181, -51]], [[89877, 43903], [100, -452], [179, 217], [92, -243], [133, -225], [-29, -255], [60, -494], [42, -288], [70, -70], [75, -492], [-27, -299], [90, -390], [301, -301], [197, -274], [186, -251], [-37, -139], [159, -361], [108, -623], [111, 126], [113, -249], [68, 88], [48, -610], [197, -354], [129, -220], [217, -466], [78, -463], [7, -328], [-19, -356], [132, -490], [-16, -509], [-48, -267], [-75, -514], [6, -330], [-55, -413], [-123, -524], [-205, -283], [-102, -446], [-93, -284], [-82, -497], [-107, -287], [-70, -431], [-36, -397], [14, -182], [-159, -200], [-311, -21], [-257, -236], [-127, -223], [-168, -248], [-230, 255], [-170, 101], [43, 301], [-152, -109], [-243, -417], [-240, 156], [-158, 91], [-159, 41], [-269, 167], [-179, 355], [-52, 437], [-64, 291], [-137, 233], [-267, 70], [91, 279], [-67, 428], [-136, -399], [-247, -106], [146, 319], [42, 332], [107, 282], [-22, 427], [-226, -491], [-174, -197], [-106, -458], [-217, 237], [9, 305], [-174, 418], [-147, 216], [52, 133], [-356, 349], [-195, 16], [-267, 280], [-498, -54], [-359, -206], [-317, -192], [-265, 38], [-294, -296], [-241, -132], [-53, -302], [-103, -234], [-236, -14], [-174, -52], [-246, 105], [-199, -62], [-191, -27], [-165, -307], [-81, 26], [-140, -163], [-133, -183], [-203, 23], [-186, 0], [-295, 368], [-149, 109], [6, 330], [138, 79], [47, 131], [-10, 207], [34, 400], [-31, 341], [-147, 582], [-45, 329], [12, 328], [-111, 375], [-7, 169], [-123, 230], [-35, 451], [-158, 456], [-39, 245], [122, -249], [-93, 535], [137, -167], [83, -223], [-5, 294], [-138, 454], [-26, 181], [-65, 173], [31, 333], [56, 141], [38, 289], [-29, 336], [114, 415], [21, -439], [118, 396], [225, 193], [136, 245], [212, 212], [126, 45], [77, -71], [219, 214], [168, 64], [42, 126], [74, 53], [153, -14], [292, 169], [151, 256], [71, 307], [163, 293], [13, 229], [7, 314], [194, 489], [117, -497], [119, 115], [-99, 272], [87, 279], [122, -125], [34, 439], [152, 283], [67, 227], [140, 98], [4, 161], [122, -67], [5, 145], [122, 82], [134, 78], [205, -264], [155, -342], [173, -3], [177, -54], [-59, 316], [133, 462], [126, 150], [-44, 144], [121, 329], [168, 203], [142, -68], [234, 108], [-5, 294], [-204, 190], [148, 84], [184, -143], [148, -236], [234, -148], [79, 59], [172, -177], [162, 164], [105, -50], [65, 111], [127, -285], [-74, -308], [-105, -233], [-96, -19], [32, -230], [-81, -288], [-99, -283], [20, -163], [221, -318], [214, -184], [143, -199], [201, -341], [78, 1], [145, -148], [43, -178], [265, -195], [183, 197], [55, 309], [56, 255], [34, 316], [85, 458], [-39, 279], [20, 167], [-32, 330], [37, 434], [53, 117], [-43, 192], [67, 305], [52, 317], [7, 164], [104, 216], [78, -282], [19, -361], [70, -70], [11, -242], [101, -293], [21, -326], [-10, -209]], [[54716, 79543], [-21, -236], [-156, -1], [53, -125], [-92, -370]], [[54500, 78811], [-53, -97], [-243, -15], [-140, -130], [-229, 44]], [[53835, 78613], [-398, 149], [-62, 200], [-274, -100], [-32, -109], [-169, 81]], [[52900, 78834], [-142, 16], [-125, 105], [42, 141], [-10, 102]], [[52665, 79198], [83, 32], [141, -160], [39, 152], [245, -25], [199, 104], [133, -18], [87, -118], [26, 98], [-40, 375], [100, 73], [98, 266]], [[53776, 79977], [206, -186], [157, 236], [98, 43], [215, -176], [131, 30], [128, -109]], [[54711, 79815], [-23, -73], [28, -199]], [[62817, 74140], [-190, 76], [-141, 266], [-44, 217]], [[63495, 75906], [146, -303], [141, -408], [130, -27], [85, -156], [-228, -46], [-49, -447], [-48, -202], [-101, -135], [7, -285]], [[63578, 73897], [-69, -28], [-173, 301], [95, 285], [-82, 169], [-104, -43], [-327, -424]], [[62492, 75583], [68, 94], [207, -165], [149, -34], [38, 67], [-136, 312], [72, 79]], [[62890, 75936], [78, -19], [191, -350], [122, -39], [48, 146], [166, 232]], [[58149, 49238], [-17, 694], [-70, 262]], [[58062, 50194], [169, -45], [85, 328], [147, -38]], [[58463, 50439], [16, -227], [60, -130], [3, -187], [-69, -121], [-108, -300], [-101, -209], [-115, -27]], [[50920, 81398], [204, -45], [257, 120], [176, -252], [153, -135]], [[51710, 81086], [-32, -389]], [[51678, 80697], [-72, -22], [-30, -323]], [[51576, 80352], [-243, 263], [-143, -45], [-194, 272], [-129, 231], [-129, 9], [-40, 203]], [[50698, 81285], [222, 113]], [[50747, 55434], [-229, -68]], [[50518, 55366], [-69, 398], [13, 1322], [-56, 119], [-11, 283], [-96, 201], [-85, 170], [35, 303]], [[50249, 58162], [96, 66], [56, 251], [136, 54], [61, 172]], [[50598, 58705], [93, 169], [100, 2], [212, -332]], [[51003, 58544], [-11, -191], [62, -342], [-54, -232], [29, -154], [-135, -357], [-86, -176], [-52, -364], [7, -366], [-16, -928]], [[49214, 57382], [-190, 149], [-130, -22], [-97, -145], [-125, 122], [-49, 190], [-125, 126]], [[48498, 57802], [-18, 334], [76, 244], [-7, 195], [221, 477], [41, 395], [76, 141], [134, -78], [116, 117], [38, 148], [216, 259], [53, 180], [259, 238], [153, 82], [70, -110], [178, 3]], [[50104, 60427], [-22, -280], [37, -262], [156, -376], [9, -279], [320, -130], [-6, -395]], [[50249, 58162], [-243, 13]], [[50006, 58175], [-128, 46], [-90, -93], [-123, 42], [-482, -27], [-7, -327], [38, -434]], [[75742, 64522], [-6, -413], [-97, 88], [18, -464]], [[75657, 63733], [-79, 301], [-16, 293], [-53, 277], [-116, 335], [-256, 23], [25, -237], [-87, -321], [-118, 117], [-41, -105], [-78, 63], [-108, 52]], [[74730, 64531], [-43, 474], [-96, 433], [47, 347], [-171, 154], [62, 210], [173, 215], [-200, 305], [98, 390], [220, -248], [133, -29], [24, -400], [265, -79], [257, 8], [160, -98], [-128, -487], [-124, -34], [-86, -327], [152, -299], [46, 368], [76, 2], [147, -914]], [[56293, 77303], [80, -236], [108, 42], [213, -90], [408, -30], [138, 147], [327, 133], [202, -209], [163, -60]], [[57932, 77000], [-144, -239], [-101, -412], [89, -328]], [[57776, 76021], [-239, 77], [-283, -181]], [[57254, 75917], [-3, -287], [-252, -55], [-196, 202], [-222, -159], [-206, 17]], [[56375, 75635], [-20, 381], [-139, 185]], [[56216, 76201], [46, 81], [-30, 69], [47, 183], [105, 180], [-135, 248], [-24, 211], [68, 130]], [[28462, 65512], [-68, -29], [-70, 332], [-104, 167], [60, 365], [84, -23], [97, -478], [1, -334]], [[28383, 67136], [-303, -92], [-19, 213], [130, 46], [184, -17], [8, -150]], [[28611, 67142], [-48, -409], [-51, 73], [4, 301], [-124, 228], [-1, 66], [220, -259]], [[55279, 77663], [100, 2], [-69, -253], [134, -222], [-41, -271], [-65, -25]], [[55338, 76894], [-52, -53], [-90, -134], [-41, -316]], [[55155, 76391], [-246, 218], [-105, 240], [-106, 128], [-127, 215], [-61, 178], [-136, 270], [59, 239], [99, -133], [60, 120], [130, 13], [239, -96], [192, 8], [126, -128]], [[56523, 82877], [268, -4], [302, 217], [64, 325], [228, 184], [-26, 258]], [[57359, 83857], [169, 97], [298, 222]], [[57826, 84176], [293, -144], [39, -143], [146, 68], [272, -137], [27, -270], [-60, -156], [174, -377], [113, -105], [-16, -104], [187, -101], [80, -154], [-108, -126], [-224, 20], [-54, -53], [66, -192], [68, -368]], [[58829, 81834], [-239, -34], [-85, -127], [-18, -290], [-111, 56], [-250, -28], [-73, 135], [-104, -100], [-105, 83], [-218, 11], [-310, 139], [-281, 45], [-215, -13], [-152, -156], [-133, -23]], [[56535, 81532], [-6, 257], [-85, 267], [166, 117], [2, 230], [-77, 219], [-12, 255]], [[25238, 62085], [-2, 85], [33, 26], [51, -68], [99, 348], [53, 7]], [[25472, 62483], [1, -84], [53, -3], [-5, -157], [-45, -249], [24, -89], [-29, -206], [18, -55], [-32, -291], [-55, -153], [-50, -18], [-55, -199]], [[25297, 60979], [-83, -1], [22, 650], [2, 457]], [[31359, 38736], [-200, -79], [-109, 794], [-150, 646], [88, 557], [-146, 244], [-37, 416], [-136, 391]], [[30669, 41705], [175, 622], [-119, 484], [63, 194], [-49, 213], [108, 288], [6, 490], [13, 405], [60, 195], [-240, 926]], [[30686, 45522], [206, -48], [143, 12], [62, 174], [243, 234], [147, 216], [363, 98], [-29, -432], [34, -221], [-23, -386], [302, -516], [311, -95], [109, -216], [188, -114], [115, -167], [175, 6], [161, -171], [12, -333], [55, -168], [3, -248], [-81, -10], [107, -671], [533, -23], [-41, -333], [30, -227], [151, -162], [66, -358], [-49, -453], [-77, -253], [27, -328], [-87, -119]], [[33842, 40210], [-4, 177], [-259, 295], [-258, 8], [-484, -167], [-133, -507], [-7, -310], [-110, -689]], [[34826, 37007], [54, 332], [38, 340], [0, 317], [-100, 105], [-104, -94], [-103, 26], [-33, 222], [-26, 527], [-52, 172], [-187, 156], [-114, -113], [-293, 111], [18, 782], [-82, 320]], [[30686, 45522], [-157, -99], [-126, 66], [18, 875], [-228, -339], [-245, 15], [-105, 307], [-184, 33], [59, 247], [-155, 351], [-115, 518], [73, 106], [0, 243], [168, 166], [-28, 312], [71, 200], [20, 269], [318, 392], [227, 111], [37, 86], [251, -27]], [[30585, 49354], [125, 1579], [6, 250], [-43, 330], [-123, 210], [1, 418], [156, 95], [56, -60], [9, 221], [-162, 60], [-4, 360], [541, -13], [92, 198], [77, -182], [55, -340], [52, 71]], [[31423, 52551], [153, -304], [216, 37], [54, 176], [206, 135], [115, 94], [32, 244], [198, 164], [-15, 121], [-235, 49], [-39, 363], [12, 386], [-125, 149], [52, 53], [206, -73], [221, -144], [80, 136], [200, 89], [310, 216], [102, 220], [-37, 162]], [[33129, 54824], [145, 26], [64, -133], [-36, -253], [96, -87], [63, -268], [-77, -203], [-44, -490], [71, -291], [20, -267], [171, -270], [137, -28], [30, 112], [88, 25], [126, 101], [90, 153], [154, -48], [67, 20]], [[34294, 52923], [151, -47], [25, 118], [-46, 114], [28, 167], [112, -51], [131, 59], [159, -122]], [[34854, 53161], [121, -119], [86, 156], [62, -24], [38, -162], [133, 41], [107, 219], [85, 424], [164, 527]], [[35650, 54223], [95, 27], [69, -318], [155, -1008], [149, -95], [7, -397], [-208, -474], [86, -174], [491, -90], [10, -578], [211, 378], [349, -207], [462, -351], [135, -338], [-45, -319], [323, 178], [540, -305], [415, 23], [411, -477], [355, -645], [214, -166], [237, -23], [101, -182], [94, -733], [46, -348], [-110, -953], [-142, -376], [-391, -801], [-177, -651], [-206, -499], [-69, -11], [-78, -424], [20, -1079], [-77, -888], [-30, -379], [-88, -228], [-49, -769], [-282, -752], [-47, -595], [-225, -250], [-65, -345], [-302, 2], [-437, -222], [-195, -256], [-311, -168], [-327, -459], [-235, -571], [-41, -430], [46, -318], [-51, -582], [-63, -281], [-195, -317], [-308, -1013], [-244, -457], [-189, -269], [-127, -548], [-183, -329]], [[35174, 32383], [-77, 326], [122, 273], [-160, 392], [-218, 318], [-286, 369], [-103, -17], [-279, 446], [-180, -62]], [[81723, 54436], [110, 215], [236, 316]], [[82069, 54967], [-13, -284], [-16, -368], [-133, 18], [-58, -196], [-126, 299]], [[75471, 67823], [113, -184], [-20, -354], [-227, -17], [-234, 39], [-175, -90], [-252, 218], [-6, 115]], [[74670, 67550], [184, 429], [150, 146], [198, -134], [147, -14], [122, -154]], [[58175, 39107], [-393, -424], [-249, -430], [-93, -383], [-83, -217], [-152, -46], [-48, -275], [-28, -180], [-178, -134], [-226, 28], [-133, 162], [-117, 70], [-135, -134], [-68, -276], [-132, -173], [-139, -257], [-199, -59], [-62, 202], [26, 351], [-165, 548], [-75, 86]], [[55526, 37566], [0, 1681], [274, 20], [8, 2051], [207, 19], [428, 202], [106, -238], [177, 226], [85, 1], [156, 130]], [[56967, 41658], [50, -43]], [[57017, 41615], [107, -460], [56, -103], [87, -333], [315, -633], [119, -62], [0, -203], [82, -365], [215, -88], [177, -261]], [[54244, 56103], [229, 44], [52, 148], [46, -11], [69, -131], [350, 221], [118, 224], [145, 202], [-28, 202], [78, 53], [269, -35], [261, 266], [201, 629], [141, 233], [176, 98]], [[56351, 58246], [31, -246], [160, -360], [1, -235], [-45, -240], [18, -179], [96, -166]], [[56612, 56820], [212, -252]], [[56824, 56568], [152, -232], [2, -188], [187, -299], [116, -250], [70, -345], [208, -228], [44, -183]], [[57603, 54843], [-91, -61], [-178, 14], [-209, 60], [-104, -49], [-41, -140], [-90, -17], [-110, 121], [-309, -287], [-127, 58], [-38, -45], [-83, -347], [-207, 112], [-203, 57], [-177, 212], [-229, 196], [-149, -186], [-108, -292], [-25, -402]], [[55125, 53847], [-178, 33], [-188, 96], [-166, -305], [-146, -536]], [[54447, 53135], [-29, 167], [-12, 263], [-127, 185], [-103, 297], [-23, 207], [-132, 301], [23, 171], [-28, 243], [21, 446], [67, 105], [140, 583]], [[32315, 78637], [202, -78], [257, 16], [-137, -236], [-102, -37], [-353, 244], [-69, 193], [105, 177], [97, -279]], [[32831, 80108], [-135, -10], [-360, 180], [-258, 272], [96, 49], [365, -145], [284, -240], [8, -106]], [[15692, 79765], [-140, -80], [-456, 262], [-84, 204], [-248, 202], [-50, 164], [-286, 103], [-107, 314], [24, 133], [291, -125], [171, -88], [261, -61], [94, -198], [138, -274], [277, -238], [115, -318]], [[34407, 81019], [-184, -504], [181, 195], [187, -124], [-98, -200], [247, -158], [128, 140], [277, -177], [-86, -422], [194, 99], [36, -306], [86, -358], [-117, -507], [-125, -21], [-183, 109], [60, 471], [-77, 73], [-322, -499], [-166, 20], [196, 270], [-267, 140], [-298, -34], [-539, 17], [-43, 171], [173, 202], [-121, 157], [234, 347], [287, 917], [172, 328], [241, 198], [129, -25], [-54, -156], [-148, -363]], [[13005, 83025], [131, -75], [267, 46], [-84, -654], [242, -463], [-111, 1], [-167, 264], [-103, 265], [-140, 179], [-51, 253], [16, 184]], [[27981, 87625], [-108, -302], [-123, 49], [-73, 171], [13, 40], [107, 173], [114, -13], [70, -118]], [[27250, 87943], [-325, -317], [-196, 13], [-61, 156], [207, 265], [381, -5], [-6, -112]], [[26344, 89640], [51, -253], [143, 89], [161, -151], [304, -198], [318, -179], [25, -274], [204, 45], [199, -191], [-247, -181], [-432, 138], [-156, 259], [-275, -306], [-396, -298], [-95, 337], [-377, -55], [242, 284], [35, 454], [95, 527], [201, -47]], [[28926, 90499], [-312, -29], [-69, 282], [118, 323], [255, 80], [217, -160], [3, -246], [-32, -80], [-180, -170]], [[23431, 91627], [-173, -202], [-374, 175], [-226, -63], [-380, 259], [245, 178], [194, 250], [295, -164], [166, -103], [84, -110], [169, -220]], [[31350, 77823], [-181, 326], [0, 785], [-123, 166], [-187, -98], [-92, 152], [-212, -435], [-84, -448], [-99, -262], [-118, -89], [-89, -29], [-28, -142], [-512, -1], [-422, -4], [-125, -106], [-294, -414], [-34, -45], [-89, -225], [-255, 0], [-273, -2], [-125, -91], [44, -113], [25, -176], [-5, -58], [-363, -287], [-286, -90], [-323, -308], [-70, 0], [-94, 91], [-31, 82], [6, 60], [61, 202], [131, 317], [81, 340], [-56, 500], [-59, 523], [-290, 270], [35, 103], [-41, 70], [-76, 0], [-56, 91], [-14, 137], [-54, -60], [-75, 18], [17, 57], [-65, 57], [-27, 151], [-216, 185], [-224, 191], [-272, 223], [-261, 209], [-248, -163], [-91, -6], [-342, 150], [-225, -75], [-269, 179], [-284, 91], [-194, 36], [-86, 97], [-49, 317], [-94, -3], [-1, -221], [-575, 0], [-951, 0], [-944, -1], [-833, 1], [-834, 0], [-819, 0], [-847, 0], [-273, 0], [-825, 0], [-788, 0]], [[15878, 80048], [-38, 1], [-537, 566], [-199, 248], [-503, 239], [-155, 510], [40, 353], [-356, 245], [-48, 464], [-336, 419], [-6, 296]], [[13740, 83389], [154, 278], [-7, 363], [-473, 367], [-284, 657], [-173, 413], [-255, 259], [-187, 236], [-147, 298], [-279, -187], [-270, -321], [-247, 378], [-194, 252], [-271, 160], [-273, 17], [1, 3279], [2, 2137]], [[10837, 91975], [518, -139], [438, -277], [289, -53], [244, 241], [336, 179], [413, -70], [416, 253], [455, 144], [191, -239], [207, 134], [62, 272], [192, -62], [470, -516], [369, 390], [38, -437], [341, 95], [105, 168], [337, -33], [424, -242], [650, -211], [383, -98], [272, 37], [374, -292], [-390, -286], [502, -123], [750, 68], [236, 100], [296, -345], [302, 291], [-283, 245], [179, 197], [338, 26], [223, 58], [224, -138], [279, -312], [310, 46], [491, -260], [431, 91], [405, -13], [-32, 358], [247, 100], [431, -195], [-2, -545], [177, 459], [223, -15], [126, 579], [-298, 355], [-324, 233], [22, 636], [329, 418], [366, -92], [281, -255], [378, -649], [-247, -283], [517, -116], [-1, -589], [371, 451], [332, -371], [-83, -427], [269, -388], [290, 416], [202, 497], [16, 632], [394, -44], [411, -85], [373, -286], [17, -285], [-207, -307], [196, -309], [-36, -280], [-544, -403], [-386, -88], [-287, 173], [-83, -289], [-268, -486], [-81, -252], [-322, -389], [-397, -38], [-220, -244], [-18, -374], [-323, -72], [-340, -467], [-301, -648], [-108, -454], [-16, -669], [409, -96], [125, -539], [130, -437], [388, 114], [517, -250], [277, -219], [199, -272], [348, -158], [294, -243], [459, -33], [302, -56], [-45, -499], [86, -578], [201, -645], [414, -547], [214, 188], [150, 592], [-145, 909], [-196, 303], [445, 270], [314, 404], [154, 401], [-23, 385], [-188, 489], [-338, 434], [328, 603], [-121, 522], [-93, 899], [194, 133], [476, -157], [286, -56], [230, 152], [258, -196], [342, -333], [85, -224], [495, -44], [-8, -483], [92, -728], [254, -90], [201, -339], [402, 319], [266, 636], [184, 267], [216, -514], [362, -734], [307, -691], [-112, -362], [370, -325], [250, -329], [442, -149], [179, -183], [110, -488], [216, -76], [112, -217], [20, -647], [-202, -217], [-199, -202], [-458, -205], [-349, -473], [-470, -93], [-594, 121], [-417, 4], [-287, -40], [-233, -413], [-354, -255], [-401, -762], [-320, -532], [236, 95], [446, 756], [583, 480], [415, 58], [246, -283], [-262, -387], [88, -620], [91, -435], [361, -287], [459, 83], [278, 647], [19, -417], [180, -209], [-344, -377], [-615, -343], [-276, -233], [-310, -415], [-211, 43], [-11, 487], [483, 476], [-445, -19], [-309, -70]], [[18287, 93939], [-139, -270], [618, 174], [386, -291], [314, 294], [254, -188], [227, -566], [140, 238], [-197, 590], [244, 85], [276, -93], [311, -232], [175, -561], [86, -406], [466, -285], [502, -273], [-31, -253], [-456, -47], [178, -221], [-94, -211], [-503, 90], [-478, 156], [-322, -35], [-522, -196], [-704, -86], [-494, -54], [-151, 271], [-379, 157], [-246, -64], [-343, 456], [185, 61], [429, 99], [392, -26], [362, 100], [-537, 135], [-594, -46], [-394, 11], [-146, 213], [644, 230], [-428, -8], [-485, 152], [233, 431], [193, 229], [744, 351], [284, -111]], [[20972, 94111], [-244, -381], [-434, 404], [95, 80], [372, 23], [211, -126]], [[28794, 93928], [25, -159], [-296, 16], [-299, 13], [-304, -78], [-80, 35], [-306, 306], [12, 207], [133, 38], [636, -62], [479, -316]], [[25955, 93959], [219, -359], [256, 465], [704, 236], [477, -596], [-42, -377], [550, 168], [263, 228], [616, -291], [383, -274], [36, -252], [515, 131], [290, -367], [670, -228], [242, -232], [263, -539], [-510, -268], [654, -376], [441, -127], [400, -529], [437, -38], [-87, -404], [-487, -669], [-342, 246], [-437, 554], [-359, -72], [-35, -330], [292, -335], [377, -265], [114, -153], [181, -570], [-96, -414], [-350, 156], [-697, 461], [393, -496], [289, -348], [45, -201], [-753, 230], [-596, 334], [-337, 281], [97, 162], [-414, 296], [-405, 280], [5, -167], [-803, -92], [-235, 198], [183, 424], [522, 10], [571, 74], [-92, 205], [96, 287], [360, 561], [-77, 255], [-107, 197], [-425, 280], [-563, 196], [178, 145], [-294, 358], [-245, 33], [-219, 196], [-149, -170], [-503, -74], [-1011, 129], [-588, 169], [-450, 87], [-231, 202], [290, 263], [-394, 2], [-88, 583], [213, 515], [286, 235], [717, 154], [-204, -373]], [[22123, 94355], [331, -122], [496, 73], [72, -167], [-259, -276], [420, -248], [-50, -518], [-455, -223], [-268, 48], [-192, 220], [-690, 444], [5, 185], [567, -72], [-306, 377], [329, 279]], [[24112, 93737], [-298, -430], [-317, 21], [-173, 506], [4, 287], [145, 244], [276, 157], [579, -20], [530, -140], [-415, -513], [-331, -112]], [[16539, 92938], [-731, -278], [-147, 253], [-641, 304], [119, 244], [192, 421], [241, 378], [-272, 353], [939, 90], [397, -119], [709, -32], [270, -167], [298, -243], [-349, -145], [-681, -405], [-344, -403], [0, -251]], [[23996, 95009], [-151, -223], [-403, 43], [-337, 150], [148, 259], [399, 155], [243, -202], [101, -182]], [[22639, 96011], [212, -267], [9, -295], [-127, -429], [-458, -59], [-298, 92], [5, 336], [-455, -44], [-18, 445], [299, -18], [419, 197], [390, -34], [22, 76]], [[19941, 95712], [109, -205], [247, 97], [291, -25], [49, -282], [-169, -274], [-940, -89], [-701, -249], [-423, -13], [-35, 187], [577, 255], [-1255, -69], [-389, 103], [379, 563], [262, 161], [782, -194], [493, -341], [485, -44], [-397, 551], [255, 210], [286, -67], [94, -275]], [[23699, 96229], [308, -186], [547, 2], [240, -190], [-64, -216], [319, -130], [177, -137], [374, -26], [406, -48], [441, 125], [566, 49], [451, -40], [298, -218], [62, -238], [-174, -153], [-414, -124], [-355, 70], [-797, -88], [-570, -11], [-449, 71], [-738, 186], [-96, 316], [-34, 286], [-279, 251], [-574, 70], [-322, 179], [104, 236], [573, -36]], [[17722, 96544], [-38, -443], [-214, -199], [-259, -29], [-517, -246], [-444, -88], [-377, 124], [472, 431], [570, 373], [426, -8], [381, 85]], [[23933, 96472], [-126, -17], [-521, 37], [-74, 161], [559, -9], [195, -107], [-33, -65]], [[19392, 96574], [-518, -166], [-411, 186], [224, 183], [406, 59], [392, -90], [-93, -172]], [[19538, 97095], [-339, -113], [-461, 1], [5, 82], [285, 173], [149, -27], [361, -116]], [[23380, 96781], [-411, -119], [-226, 134], [-119, 216], [-22, 238], [360, -23], [162, -38], [332, -200], [-76, -208]], [[22205, 96935], [108, -240], [-453, 64], [-457, 187], [-619, 21], [268, 171], [-335, 139], [-21, 221], [546, -79], [751, -210], [212, -274]], [[25828, 97704], [334, -186], [-381, -171], [-513, -434], [-492, -41], [-575, 74], [-299, 235], [4, 208], [220, 154], [-508, -5], [-306, 192], [-176, 261], [193, 256], [192, 175], [285, 41], [-122, 132], [646, 29], [355, -308], [468, -123], [455, -109], [220, -380]], [[30972, 99689], [742, -45], [597, -74], [508, -156], [-12, -154], [-678, -250], [-672, -117], [-251, -129], [605, 3], [-656, -349], [-452, -163], [-476, -470], [-573, -96], [-177, -117], [-841, -62], [383, -72], [-192, -103], [230, -284], [-264, -198], [-429, -163], [-132, -225], [-388, -172], [39, -130], [475, 22], [6, -141], [-742, -345], [-726, 159], [-816, -89], [-414, 69], [-525, 30], [-35, 277], [514, 130], [-137, 415], [170, 41], [742, -249], [-379, 370], [-450, 110], [225, 223], [492, 137], [79, 201], [-392, 225], [-118, 297], [759, -25], [220, -63], [433, 210], [-625, 67], [-972, -37], [-491, 196], [-232, 232], [-324, 169], [-61, 197], [413, 110], [324, 18], [545, 94], [409, 214], [344, -30], [300, -161], [211, 311], [367, 92], [498, 64], [849, 24], [148, -63], [802, 98], [601, -37], [602, -36]], [[52900, 78834], [-22, -236], [-122, -97], [-206, 72], [-60, -232], [-132, -18], [-48, 91], [-156, -195], [-134, -28], [-120, 124]], [[51900, 78315], [-95, 252], [-133, -90], [5, 261], [203, 323], [-9, 147], [126, -53], [77, 98]], [[52074, 79253], [236, -4], [57, 125], [298, -176]], [[31400, 20215], [-92, -233], [-238, -178], [-137, 18], [-164, 46], [-202, 174], [-291, 83], [-350, 322], [-283, 309], [-383, 645], [229, -121], [390, -384], [369, -207], [143, 264], [90, 394], [256, 238], [198, -68]], [[30952, 21711], [-247, 4], [-134, -141], [-250, -208], [-45, -538], [-118, -14], [-313, 188], [-318, 401], [-346, 329], [-87, 365], [79, 337], [-140, 383], [-36, 982], [119, 554], [293, 445], [-422, 168], [265, 509], [94, 956], [309, -202], [145, 1193], [-186, 153], [-87, -719], [-175, 81], [87, 823], [95, 1067], [127, 394], [-80, 562], [-22, 649], [117, 18], [170, 930], [192, 922], [118, 858], [-64, 863], [83, 475], [-34, 711], [163, 703], [50, 1114], [89, 1196], [87, 1287], [-20, 943], [-58, 811]], [[30452, 41263], [143, 147], [74, 295]], [[80649, 62586], [-240, -277], [-228, 179], [-8, 495], [137, 261], [304, 161], [159, -13], [62, -220], [-122, -254], [-64, -332]], [[86288, 76244], [-179, 340], [-111, -323], [-429, -248], [44, -304], [-241, 21], [-131, 181], [-191, -409], [-306, -309], [-227, -370]], [[84517, 74823], [-388, -167], [-204, -269], [-300, -157], [148, 267], [-58, 224], [220, 387], [-147, 302], [-242, -204], [-314, -400], [-171, -372], [-272, -28], [-142, -268], [147, -390], [227, -94], [9, -259], [220, -168], [311, 411], [247, -224], [179, -15], [45, -302], [-393, -161], [-130, -311], [-270, -289], [-142, -403], [299, -316], [109, -567], [169, -527], [189, -443], [-5, -428], [-174, -157], [66, -307], [164, -179], [-43, -469], [-71, -456], [-155, -52], [-203, -623], [-225, -756], [-258, -687], [-382, -532], [-386, -484], [-313, -67], [-170, -255], [-96, 186], [-157, -286], [-388, -288], [-294, -88], [-95, -609], [-154, -33], [-73, 418], [66, 222], [-373, 185], [-131, -94]], [[80013, 64241], [-280, 149], [-132, 234], [44, 332], [-254, 105], [-134, 216], [-236, -307], [-271, -66], [-221, 3], [-149, -141]], [[78380, 64766], [-144, -84], [42, -659], [-148, 16], [-25, 135]], [[78105, 64174], [-9, 238], [-203, -167], [-121, 106], [-206, 216], [81, 478], [-176, 112], [-66, 530], [-293, -96], [33, 684], [263, 480], [11, 475], [-8, 441], [-121, 137], [-93, 339], [-162, -42]], [[77035, 68105], [-300, 86], [94, 242], [-130, 358], [-198, -243], [-233, 142], [-321, -367], [-252, -428], [-224, -72]], [[74670, 67550], [-23, 454], [-170, -121]], [[74477, 67883], [-324, 56], [-314, 132], [-225, 253], [-216, 114], [-93, 276], [-157, 83], [-280, 375], [-223, 177], [-115, -138]], [[72530, 69211], [-386, 403], [-273, 365], [-78, 635], [200, -78], [9, 294], [-111, 295], [28, 470], [-298, 675]], [[71621, 72270], [-457, 233], [-82, 442], [-205, 269]], [[70827, 73379], [-42, 328], [10, 224], [-169, 131], [-91, -58], [-70, 533]], [[70465, 74537], [79, 132], [-39, 135], [266, 272], [192, 112], [294, -77], [105, 368], [356, 68], [99, 229], [438, 312], [39, 130]], [[72294, 76218], [-22, 328], [190, 150], [-250, 1000], [550, 231], [143, 128], [200, 1031], [551, -190], [155, 261], [13, 577], [230, 54], [212, 383]], [[74266, 80171], [109, 48]], [[74375, 80219], [73, -402], [233, -306], [396, -216], [192, -464], [-107, -673], [100, -249], [330, -99], [374, -80], [336, -359], [171, -64], [127, -531], [163, -342], [306, 14], [574, -129], [369, 80], [274, -86], [411, -350], [336, 1], [123, -179], [324, 309], [448, 200], [417, 21], [324, 203], [200, 309], [194, 193], [-45, 190], [-89, 222], [146, 371], [156, -52], [286, -117], [277, 306], [423, 223], [204, 380], [195, 164], [404, 77], [219, -65], [30, 204], [-251, 403], [-223, 184], [-214, -212], [-274, 89], [-157, -73], [-72, 236], [197, 575], [135, 434]], [[82410, 80559], [333, -217], [392, 364], [-3, 253], [251, 611], [155, 184], [-4, 318], [-152, 137], [229, 287], [345, 104], [369, 15], [415, -171], [244, -212], [172, -581], [104, -248], [97, -354], [103, -564], [483, -184], [329, -409], [112, -541], [423, -1], [240, 227], [459, 170], [-146, -518], [-107, -211], [-96, -631], [-186, -560], [-338, 102], [-238, -203], [73, -494], [-40, -680], [-142, -16], [2, -292]], [[49206, 54706], [-126, -6], [-194, 112], [-178, -6], [-329, -101], [-193, -166], [-275, -211], [-54, 15]], [[47857, 54343], [22, 474], [26, 72], [-8, 227], [-118, 241], [-88, 39], [-81, 158], [60, 256], [-28, 278], [13, 168]], [[47655, 56256], [44, 0], [17, 251], [-22, 112], [27, 80], [103, 69], [-69, 461], [-64, 238], [23, 195], [55, 45]], [[47769, 57707], [36, 52], [77, -86], [215, -5], [51, 168], [48, -11], [80, 65], [43, -246], [65, 72], [114, 86]], [[49214, 57382], [74, -819], [-117, -484], [-73, -650], [121, -496], [-13, -227]], [[53632, 53135], [-35, 31], [-164, -74], [-169, 77], [-132, -38]], [[53132, 53131], [-452, 14]], [[52680, 53145], [40, 454], [-108, 381], [-127, 98], [-56, 258], [-72, 82], [4, 159]], [[52361, 54577], [71, 408], [132, 556], [81, 5], [165, 337], [105, 9], [156, -236], [191, 194], [26, 239], [63, 232], [43, 291], [148, 238], [56, 403], [59, 128], [39, 299], [74, 368], [234, 446], [14, 191], [31, 104], [-110, 229]], [[53939, 59018], [9, 184], [78, 33]], [[54026, 59235], [111, -369], [18, -382], [-10, -383], [151, -523], [-155, 6], [-78, -41], [-127, 57], [-60, -271], [164, -336], [121, -98], [39, -239], [87, -397], [-43, -156]], [[54447, 53135], [-20, -311], [-220, 136], [-225, 152], [-350, 23]], [[58564, 53850], [-16, -673], [111, -78], [-89, -205], [-107, -153], [-106, -300], [-59, -268], [-15, -462], [-65, -220], [-2, -434]], [[58216, 51057], [-80, -161], [-10, -342], [-38, -45], [-26, -315]], [[58149, 49238], [50, -530], [-27, -299], [55, -334], [161, -323], [150, -726]], [[58538, 47026], [-109, 59], [-373, -97], [-75, -69], [-79, -368], [62, -254], [-49, -681], [-34, -578], [75, -103], [194, -224], [76, 105], [23, -621], [-212, 4], [-114, 317], [-103, 246], [-213, 80], [-62, 302], [-170, -182], [-222, 81], [-93, 261], [-176, 53], [-131, -14], [-15, 179], [-96, 15]], [[53422, 48316], [-39, 179]], [[53609, 49076], [73, -59], [95, 221], [152, -6], [17, -163], [104, -102], [164, 361], [161, 281], [71, 185], [-10, 473], [121, 560], [127, 296], [183, 278], [32, 184], [7, 211], [45, 200], [-14, 326], [34, 510], [55, 360], [83, 308], [16, 347]], [[57603, 54843], [169, -475], [124, -70], [75, 97], [128, -38], [155, 122], [66, -246], [244, -383]], [[53309, 48928], [-228, 610]], [[53081, 49538], [212, 318], [-105, 381], [95, 144], [187, 71], [23, 255], [148, -276], [245, -25], [85, 273], [36, 382], [-31, 450], [-131, 341], [120, 667], [-69, 114], [-207, -47], [-78, 298], [21, 251]], [[29063, 51742], [-119, 136], [-137, 191], [-79, -92], [-235, 80], [-68, 248], [-52, -9], [-278, 329]], [[28095, 52625], [-37, 178], [103, 44], [-12, 288], [65, 209], [138, 38], [117, 362], [106, 302], [-102, 137], [52, 335], [-62, 526], [59, 152], [-44, 487], [-112, 306]], [[28366, 55989], [36, 280], [89, -41], [52, 171], [-64, 339], [34, 85]], [[28513, 56823], [143, -19], [209, 402], [114, 62], [3, 190], [51, 487], [159, 267], [175, 11], [22, 120], [218, -48], [218, 291], [109, 128], [134, 278], [98, -36], [73, -151], [-54, -194]], [[30185, 58611], [-178, -96], [-71, -288], [-107, -165], [-81, -215], [-34, -410], [-77, -337], [144, -39], [35, -265], [62, -126], [21, -232], [-33, -213], [10, -120], [69, -48], [66, -201], [357, 55], [161, -73], [196, -496], [112, 62], [200, -31], [158, 66], [99, -99], [-50, -311], [-62, -193], [-22, -413], [56, -383], [79, -171], [9, -129], [-140, -286], [100, -127], [74, -202], [85, -574]], [[30585, 49354], [-139, 306], [-83, 14], [179, 586], [-213, 270], [-166, -50], [-101, 100], [-153, -152], [-207, 72], [-163, 603], [-129, 149], [-89, 272], [-184, 272], [-74, -54]], [[26954, 56566], [-151, 128], [-56, 121], [32, 100], [-11, 127], [-77, 138], [-109, 113], [-95, 74], [-19, 168], [-73, 103], [18, -167], [-55, -138], [-64, 160], [-89, 57], [-38, 116], [2, 175], [36, 182], [-78, 81], [64, 111]], [[26191, 58215], [42, 74], [183, -152], [63, 75], [89, -48], [46, -119], [82, -38], [66, 122]], [[26762, 58129], [70, -313], [108, -232], [130, -246]], [[27070, 57338], [-107, -51], [1, -232], [58, -86], [-41, -68], [10, -104], [-23, -117], [-14, -114]], [[27147, 65183], [240, -41], [219, -6], [261, -197], [110, -210], [260, 65], [98, -136], [235, -356], [173, -260], [92, 8], [165, -118], [-20, -162], [205, -23], [210, -236], [-33, -135], [-185, -73], [-187, -29], [-191, 46], [-398, -56], [186, 321], [-113, 150], [-179, 38], [-96, 166], [-66, 328], [-157, -22], [-259, 154], [-83, 121], [-362, 89], [-97, 113], [104, 144], [-273, 29], [-199, -299], [-115, -8], [-40, -141], [-138, -63], [-118, 55], [146, 178], [60, 208], [126, 128], [142, 112], [210, 55], [67, 63]], [[59092, 72066], [19, 3], [40, 139], [200, -8], [253, 172], [-188, -245], [21, -108]], [[59437, 72019], [-30, 20], [-53, -44], [-42, 12], [-14, -22], [-5, 59], [-20, 35], [-54, 6], [-75, -49], [-52, 30]], [[59437, 72019], [8, -46], [-285, -234], [-136, 74], [-64, 232], [132, 21]], [[53776, 79977], [-157, 247], [-141, 139], [-30, 243], [-49, 171], [202, 125], [103, 144], [200, 111], [70, 110], [73, -66], [124, 60]], [[54171, 81261], [132, -186], [207, -50], [-17, -158], [151, -119], [41, 148], [191, -64], [26, -180], [207, -35], [127, -284]], [[55236, 80333], [-82, 0], [-43, -104], [-64, -25], [-18, -131], [-54, -28], [-7, -53], [-95, -60], [-123, 10], [-39, -127]], [[52756, 83493], [4, -222], [281, -135], [-3, -204], [283, 108], [156, 158], [313, -228], [132, -183]], [[53922, 82787], [64, -293], [-77, -154], [101, -205], [69, -308], [-22, -199], [114, -367]], [[52074, 79253], [35, 410], [140, 395], [-400, 106], [-131, 151]], [[51718, 80315], [16, 252], [-56, 130]], [[51710, 81086], [-47, 604], [167, 0], [70, 217], [69, 527], [-51, 195]], [[51918, 82629], [54, 122], [232, 31], [52, -127], [188, 284], [-63, 216], [-13, 326]], [[52368, 83481], [210, -76], [178, 88]], [[61966, 59143], [66, -178], [-9, -240], [-158, -137], [119, -158]], [[61984, 58430], [-102, -308]], [[61882, 58122], [-62, 103], [-67, -41], [-155, 9], [-4, 176], [-22, 159], [94, 269], [98, 255]], [[61764, 59052], [119, -50], [83, 141]], [[53524, 83854], [-166, -466], [-291, 325], [-39, 239], [408, 191], [88, -289]], [[52368, 83481], [-113, 320], [-8, 589], [46, 155], [80, 173], [244, 36], [98, 159], [223, 162], [-9, -296], [-82, -188], [33, -161], [151, -87], [-68, -217], [-83, 62], [-200, -415], [76, -280]], [[30080, 63183], [34, 98], [217, -3], [165, -148], [73, 14], [50, -204], [152, 11], [-9, -171], [124, -21], [136, -211], [-103, -235], [-132, 126], [-127, -25], [-92, 28], [-50, -105], [-106, -36], [-43, 140], [-92, -83], [-111, -394], [-71, 92], [-14, 165]], [[30081, 62221], [5, 157], [-71, 172], [68, 97], [21, 222], [-24, 314]], [[53333, 65346], [-952, -1097], [-804, -1132], [-392, -257]], [[51185, 62860], [-308, -56], [-3, 366], [-129, 94], [-173, 165], [-66, 270], [-937, 1256], [-937, 1257]], [[48632, 66212], [-1045, 1394]], [[47587, 67606], [6, 112], [-1, 38]], [[47592, 67756], [-2, 682], [449, 425], [277, 88], [227, 155], [107, 288], [324, 228], [12, 427], [161, 50], [126, 213], [363, 97], [51, 224], [-73, 122], [-96, 608], [-17, 350], [-104, 369]], [[49397, 72082], [267, 315], [300, 100], [175, 238], [268, 175], [471, 102], [459, 47], [140, -85], [262, 227], [297, 4], [113, -134], [190, 35]], [[52339, 73106], [-57, -295], [44, -549], [-65, -475], [-171, -322], [24, -433], [227, -344], [3, -139], [171, -232], [118, -1034]], [[52633, 69283], [90, -509], [15, -267], [-49, -470], [21, -263], [-36, -315], [24, -362], [-110, -240], [164, -420], [11, -247], [99, -321], [130, 105], [219, -267], [122, -361]], [[27693, 49869], [148, 430], [-60, 251], [-106, -267], [-166, 252], [56, 163], [-47, 522], [97, 87], [52, 359], [105, 371], [-20, 235], [153, 123], [190, 230]], [[29063, 51742], [38, -438], [-86, -374], [-303, -603], [-334, -227], [-170, -501], [-53, -389], [-157, -237], [-116, 291], [-113, 62], [-114, -45], [-8, 211], [79, 137], [-33, 240]], [[59700, 68819], [-78, -232], [-60, -435], [-75, -300], [-65, -100], [-93, 186], [-125, 257], [-198, 825], [-29, -52], [115, -608], [171, -579], [210, -897], [102, -313], [90, -325], [249, -638], [-55, -100], [9, -374], [323, -517], [49, -118]], [[60240, 64499], [-1102, 0], [-1077, 0], [-1117, 0]], [[56944, 64499], [0, 2120], [0, 2048], [-83, 464], [71, 356], [-43, 246], [101, 276]], [[56990, 70009], [369, 10], [268, -152], [275, -171], [129, -89], [214, 182], [114, 165], [245, 48], [198, -73], [75, -286], [65, 189], [222, -136], [217, -33], [137, 145]], [[59518, 69808], [182, -989]], [[61764, 59052], [-95, 187], [-114, 337], [-124, 185], [-71, 199], [-242, 231], [-191, 7], [-67, 120], [-163, -135], [-168, 261], [-87, -430], [-323, 121]], [[60119, 60135], [-30, 230], [120, 847], [27, 382], [88, 177], [204, 95], [141, 328]], [[60669, 62194], [161, -666], [77, -529], [152, -281], [379, -544], [154, -328], [151, -332], [87, -198], [136, -173]], [[47490, 75948], [14, 410], [-114, 250], [393, 415], [340, -104], [373, 4], [296, -98], [230, 30], [449, -19]], [[49471, 76836], [111, -224], [511, -262], [101, 125], [313, -261], [322, 75]], [[50829, 76289], [15, -335], [-263, -383], [-356, -122], [-25, -194], [-171, -319], [-107, -469], [108, -329], [-160, -257], [-60, -374], [-210, -115], [-197, -443], [-352, -8], [-265, 10], [-174, -203], [-106, -218], [-136, 48], [-103, 195], [-79, 331], [-259, 89]], [[47929, 73193], [-23, 191], [103, 216], [38, 156], [-96, 172], [77, 378], [-111, 345], [120, 48], [11, 272], [45, 84], [3, 449], [129, 156], [-78, 289], [-162, 20], [-47, -72], [-164, -1], [-70, 282], [-113, -84], [-101, -146]], [[56753, 85111], [32, 340], [-102, -72], [-176, 204], [-24, 331], [351, 161], [350, 83], [301, -95], [287, 17]], [[57772, 86080], [42, -100], [-198, -332], [83, -537], [-120, -183]], [[57579, 84928], [-229, 1], [-239, 214], [-121, 70], [-237, -102]], [[61882, 58122], [-61, -204], [103, -317], [102, -277], [106, -206], [909, -683], [233, 3]], [[63274, 56438], [-785, -1728], [-362, -26], [-247, -406], [-178, -10], [-76, -182]], [[61626, 54086], [-190, 0], [-112, 195], [-254, -241], [-82, -240], [-185, 45], [-62, 67], [-65, -16], [-87, 6], [-352, 489], [-193, 0], [-95, 189], [0, 324], [-145, 96]], [[59804, 55000], [-164, 627], [-127, 133], [-48, 231], [-141, 280], [-171, 42], [95, 328], [147, 14], [42, 176]], [[59437, 56831], [-4, 517]], [[59433, 57348], [82, 603], [132, 161], [28, 236], [119, 440], [168, 285], [112, 567], [45, 495]], [[57942, 91602], [-41, -403], [425, -383], [-256, -435], [323, -655], [-187, -494], [250, -429], [-113, -375], [411, -394], [-105, -294], [-258, -333], [-594, -735]], [[57797, 86672], [-504, -46], [-489, -211], [-452, -121], [-161, 314], [-269, 189], [62, 567], [-135, 520], [133, 335], [252, 362], [635, 624], [185, 121], [-28, 243], [-387, 272]], [[56639, 89841], [-93, 225], [-8, 886], [-433, 392], [-371, 282]], [[55734, 91626], [167, 152], [309, -304], [362, 29], [298, -140], [265, 255], [137, 422], [431, 196], [356, -229], [-117, -405]], [[99547, 41844], [96, -167], [-46, -300], [-172, -79], [-153, 71], [-27, 253], [107, 198], [126, -71], [69, 95]], [[0, 42577], [57, 26], [-34, -277], [-23, -31], [99822, -141], [-177, -122], [-36, 215], [139, 118], [88, 32], [-99836, 180]], [[33000, 21970], [333, 345], [236, -144], [167, 231], [222, -259], [-83, -202], [-375, -173], [-125, 202], [-236, -259], [-139, 259]], [[34854, 53161], [70, 246], [24, 262], [48, 246], [-107, 340]], [[34889, 54255], [-22, 394], [144, 495]], [[35011, 55144], [95, -63], [204, -136], [294, -486], [46, -236]], [[52655, 76104], [-92, -445], [-126, 118], [-64, 387], [56, 214], [179, 220], [47, -494]], [[51576, 80352], [62, -50], [80, 13]], [[51900, 78315], [-11, -163], [82, -216], [-97, -176], [72, -445], [151, -73], [-32, -250]], [[52065, 76992], [-252, -326], [-548, 156], [-404, -186], [-32, -347]], [[49471, 76836], [144, 345], [53, 1147], [-287, 605], [-205, 291], [-424, 222], [-28, 420], [360, 125], [466, -148], [-88, 652], [263, -247], [646, 449], [84, 472], [243, 116]], [[53081, 49538], [-285, 581], [-184, 475], [-169, 595], [9, 192], [61, 184], [67, 419], [56, 427]], [[52636, 52411], [94, 33], [404, -6], [-2, 693]], [[48278, 82851], [-210, 118], [-172, -8], [57, 309], [-57, 309]], [[47896, 83579], [233, 23], [298, -356], [-149, -395]], [[49165, 85596], [-297, -623], [283, 79], [304, -3], [-72, -469], [-250, -516], [287, -37], [22, -61], [248, -679], [190, -93], [171, -656], [79, -227], [337, -110], [-34, -368], [-142, -169], [111, -298], [-250, -302], [-371, 6], [-473, -159], [-130, 114], [-183, -270], [-257, 65], [-195, -220], [-148, 115], [407, 605], [249, 125], [-2, 0], [-434, 96], [-79, 229], [291, 179], [-152, 310], [52, 377], [413, -52], [1, 0], [40, 334], [-186, 355], [-4, 8], [-337, 101], [-66, 156], [101, 258], [-92, 158], [-149, -272], [-17, 555], [-140, 294], [101, 595], [216, 467], [222, -45], [335, 48]], [[61542, 75749], [42, 246], [-70, 393], [-160, 212], [-154, 66], [-102, 177]], [[61098, 76843], [34, 68], [235, -99], [409, -93], [378, -276], [48, -107], [169, 90], [259, -120], [85, -236], [175, -134]], [[62106, 75494], [-268, 282], [-296, -27]], [[50294, 55244], [-436, -337], [-154, -198], [-250, -167], [-248, 164]], [[50006, 58175], [-20, -180], [116, -297], [-1, -418], [27, -454], [69, -210], [-61, -518], [22, -287], [74, -365], [62, -202]], [[47655, 56256], [-78, 14], [-57, -232], [-78, 3], [-55, 123], [19, 231], [-116, 353], [-73, -65], [-59, -13]], [[47158, 56670], [-77, -33], [3, 211], [-44, 151], [9, 168], [-60, 242], [-78, 206], [-222, 0], [-65, -108], [-76, -13], [-48, -125], [-32, -159], [-148, -254]], [[46320, 56956], [-122, 341], [-108, 226], [-71, 74], [-69, 115], [-32, 254], [-41, 127], [-80, 94]], [[45797, 58187], [123, 281], [84, -11], [73, 97], [61, 1], [44, 76], [-24, 191], [31, 60], [5, 195]], [[46194, 59077], [134, -5], [200, -141], [61, 13], [21, 64], [151, -45], [40, 32]], [[46801, 58995], [16, -211], [44, 1], [73, 77], [46, -20], [77, -146], [119, -46], [76, 125], [90, 77], [67, 80], [55, -15], [62, -126], [33, -159], [114, -241], [-57, -149], [-11, -187], [59, 57], [35, -67], [-15, -172], [85, -166]], [[45321, 59403], [36, 255]], [[45357, 59658], [302, 17], [63, 136], [88, 10], [110, -142], [86, -3], [92, 97], [56, -166], [-120, -130], [-121, 11], [-119, 121], [-103, -133], [-50, -5], [-67, -80], [-253, 12]], [[45797, 58187], [-149, 241], [-117, 38], [-63, 162], [1, 88], [-84, 122], [-18, 124]], [[45367, 58962], [147, 93], [92, -18], [75, 65], [513, -25]], [[52636, 52411], [-52, 87], [96, 647]], [[56583, 72391], [152, -194], [216, 33], [207, -41], [-7, -100], [151, 69], [-35, -170], [-400, -49], [3, 95], [-339, 112], [52, 245]], [[57237, 75339], [-169, 17], [-145, 54], [-336, -150], [192, -323], [-141, -94], [-154, -1], [-147, 297], [-52, -127], [62, -344], [139, -270], [-105, -126], [155, -265], [137, -167], [4, -326], [-257, 153], [82, -294], [-176, -60], [105, -509], [-184, -7], [-228, 251], [-104, 460], [-49, 384], [-108, 264], [-143, 329], [-18, 164]], [[55838, 75350], [182, 51], [106, 126], [150, -11], [46, 100], [53, 19]], [[57254, 75917], [135, -153], [-86, -360], [-66, -65]], [[37010, 99413], [932, 344], [975, -26], [354, 213], [982, 55], [2219, -72], [1737, -457], [-513, -222], [-1062, -25], [-1496, -56], [140, -103], [984, 63], [836, -198], [540, 176], [231, -206], [-305, -335], [707, 214], [1348, 223], [833, -111], [156, -246], [-1132, -410], [-157, -133], [-888, -99], [643, -28], [-324, -420], [-224, -373], [9, -641], [333, -376], [-434, -24], [-457, -182], [513, -305], [65, -490], [-297, -53], [360, -495], [-617, -42], [322, -234], [-91, -203], [-391, -89], [-388, -2], [348, -390], [4, -256], [-549, 238], [-143, -154], [375, -144], [364, -352], [105, -464], [-495, -111], [-214, 222], [-344, 331], [95, -391], [-322, -303], [732, -24], [383, -31], [-745, -502], [-755, -454], [-813, -199], [-306, -2], [-288, -222], [-386, -608], [-597, -404], [-192, -23], [-370, -142], [-399, -134], [-238, -357], [-4, -403], [-141, -378], [-453, -461], [112, -450], [-125, -476], [-142, -563], [-391, -35], [-410, 471], [-556, 3], [-269, 315], [-186, 563], [-481, 716], [-141, 375], [-38, 517], [-384, 532], [100, 424], [-186, 203], [275, 673], [418, 214], [110, 241], [58, 450], [-318, -204], [-151, -85], [-249, -83], [-341, 188], [-19, 392], [109, 306], [258, 8], [567, -153], [-478, 366], [-249, 197], [-276, -81], [-232, 143], [310, 536], [-169, 215], [-220, 398], [-335, 611], [-353, 223], [3, 241], [-745, 337], [-590, 42], [-743, -23], [-677, -42], [-323, 183], [-482, 362], [729, 181], [559, 31], [-1188, 149], [-627, 236], [39, 223], [1051, 277], [1018, 277], [107, 210], [-750, 206], [243, 230], [961, 402], [404, 62], [-115, 258], [658, 152], [854, 90], [853, 6], [303, -180], [737, 317], [663, -215], [390, -45], [577, -188], [-660, 311], [38, 246]], [[24973, 59739], [-142, 101], [-174, 10], [-127, 114], [-149, 238]], [[24381, 60202], [7, 168], [32, 135], [-39, 107], [133, 470], [357, 1], [7, 197], [-45, 35], [-31, 124], [-103, 133], [-103, 193], [125, 1], [1, 324], [259, 1], [257, -6]], [[25297, 60979], [90, -105], [24, 86], [82, -73]], [[25493, 60887], [-127, -220], [-131, -161], [-20, -111], [22, -113], [-58, -146]], [[25179, 60136], [-65, -36], [15, -67], [-52, -64], [-95, -145], [-9, -85]], [[33400, 56648], [183, -212], [171, -375], [8, -297], [105, -13], [149, -281], [109, -201]], [[34125, 55269], [-44, -518], [-169, -150], [15, -136], [-51, -297], [123, -418], [89, -1], [37, -325], [169, -501]], [[33129, 54824], [-188, 437], [75, 159], [-5, 265], [171, 93], [69, 108], [-95, 213], [24, 210], [220, 339]], [[25745, 59307], [-48, 180], [-84, 50]], [[25613, 59537], [19, 231], [-38, 62], [-57, 41], [-122, -68], [-10, 77], [-84, 93], [-60, 114], [-82, 49]], [[25493, 60887], [29, -23], [61, 101], [79, 9], [26, -47], [43, 28], [129, -52], [128, 15], [90, 64], [32, 65], [89, -30], [66, -39], [73, 13], [55, 50], [127, -80], [44, -13], [85, -107], [80, -129], [101, -88], [73, -159]], [[26903, 60465], [-95, 12], [-38, -79], [-97, -75], [-70, 0], [-61, -73], [-56, 26], [-47, 88], [-29, -17], [-36, -138], [-27, 5], [-4, -118], [-97, -159], [-51, -68], [-29, -72], [-82, 117], [-60, -154], [-58, 4], [-65, -14], [6, -283], [-41, -5], [-35, -131], [-86, -24]], [[55230, 78267], [67, -223], [89, -164], [-107, -217]], [[55155, 76391], [-31, -98]], [[55124, 76293], [-261, 213], [-161, 207], [-254, 171], [-233, 424], [56, 43], [-127, 242], [-5, 195], [-179, 91], [-85, -249], [-82, 193], [6, 200], [10, 9]], [[53809, 78032], [194, -20], [51, 98], [94, -94], [109, -12], [-1, 161], [97, 59], [27, 233], [221, 153]], [[54601, 78610], [88, -71], [208, -247], [229, -111], [104, 86]], [[30081, 62221], [-185, 98], [-131, -40], [-169, 42], [-130, -108], [-149, 179], [24, 186], [256, -80], [210, -46], [100, 128], [-127, 250], [2, 220], [-175, 89], [62, 159], [170, -25], [241, -90]], [[54716, 79543], [141, -148], [103, -62], [233, 70], [22, 116], [111, 17], [135, 89], [30, -37], [130, 72], [66, 136], [91, 35], [297, -175], [59, 59]], [[56134, 79715], [155, -157], [19, -154]], [[56308, 79404], [-170, -121], [-131, -391], [-168, -390], [-223, -109]], [[55616, 78393], [-173, 26], [-213, -152]], [[54601, 78610], [-54, 194], [-47, 7]], [[83531, 45933], [-117, -11], [-368, 403], [259, 113], [146, -175], [97, -175], [-17, -155]], [[84713, 46708], [28, -113], [5, -175]], [[84746, 46420], [-181, -430], [-238, -127], [-33, 69], [25, 196], [119, 351], [275, 229]], [[82749, 47167], [100, -153], [172, 47], [69, -245], [-321, -116], [-193, -77], [-149, 4], [95, 332], [153, 5], [74, 203]], [[84139, 47168], [-41, -320], [-417, -163], [-370, 71], [0, 210], [220, 120], [174, -173], [185, 44], [249, 211]], [[80172, 47926], [533, -57], [61, 237], [515, -277], [101, -373], [417, -105], [341, -342], [-317, -220], [-306, 232], [-251, -15], [-288, 42], [-260, 104], [-322, 220], [-204, 57], [-116, -72], [-506, 237], [-48, 247], [-255, 43], [191, 550], [337, -34], [224, -225], [115, -44], [38, -205]], [[87423, 48251], [-143, -393], [-27, 434], [49, 207], [58, 195], [63, -169], [0, -274]], [[85346, 49837], [-104, -191], [-192, 106], [-54, 248], [281, 27], [69, -190]], [[86241, 50048], [101, -441], [-234, 238], [-232, 48], [-157, -38], [-192, 20], [65, 317], [344, 24], [305, -168]], [[89166, 50332], [5, -1877], [4, -1876]], [[89175, 46579], [-247, 472], [-282, 116], [-69, -164], [-352, -18], [118, 469], [175, 160], [-72, 626], [-134, 483], [-538, 488], [-229, 48], [-417, 532], [-82, -279], [-107, -51], [-63, 211], [-1, 250], [-212, 283], [299, 207], [198, -11], [-23, 153], [-407, 1], [-110, 343], [-248, 106], [-117, 285], [374, 140], [142, 188], [446, -237], [44, -214], [78, -931], [287, -345], [232, 611], [319, 347], [247, 1], [238, -201], [206, -206], [298, -110]], [[84788, 52647], [-223, -571], [-209, -111], [-267, 113], [-463, -29], [-243, -83], [-39, -436], [248, -512], [150, 261], [518, 196], [-22, -265], [-121, 83], [-121, -337], [-245, -223], [263, -738], [-50, -198], [249, -665], [-2, -378], [-148, -170], [-109, 203], [134, 471], [-273, -222], [-69, 159], [36, 222], [-200, 338], [21, 561], [-186, -175], [24, -671], [11, -824], [-176, -84], [-119, 169], [79, 530], [-43, 556], [-117, 4], [-86, 395], [115, 377], [40, 457], [139, 868], [58, 238], [237, 427], [217, -170], [350, -80], [319, 24], [275, 419], [48, -129]], [[85746, 52481], [-15, -503], [-143, 57], [-42, -351], [114, -304], [-78, -69], [-112, 365], [-82, 736], [56, 460], [92, 210], [20, -315], [164, -50], [26, -236]], [[80461, 52985], [47, -385], [190, -325], [179, 117], [177, -42], [162, 291], [133, 51], [263, -162], [226, 123], [143, 801], [107, 200], [96, 655], [319, 0], [241, -97]], [[82744, 54212], [-158, -520], [204, -545], [-48, -265], [312, -533], [-329, -68], [-93, -393], [12, -522], [-267, -393], [-7, -574], [-107, -881], [-41, 205], [-316, -259], [-110, 352], [-198, 33], [-139, 184], [-330, -207], [-101, 279], [-182, -32], [-229, 67], [-43, 772], [-138, 160], [-134, 493], [-38, 504], [32, 533], [165, 383]], [[79393, 48459], [-308, -12], [-234, 481], [-356, 471], [-119, 349], [-210, 469], [-138, 432], [-212, 806], [-244, 480], [-81, 495], [-103, 449], [-250, 363], [-145, 493], [-209, 322], [-290, 635], [-24, 293], [178, -23], [430, -111], [246, -564], [215, -390], [153, -240], [263, -619], [283, -9], [233, -394], [161, -482], [211, -263], [-111, -471], [159, -200], [100, -14], [47, -402], [97, -321], [204, -51], [135, -365], [-70, -716], [-11, -891]], [[72530, 69211], [-176, -261], [-108, -538], [269, -218], [262, -283], [362, -323], [381, -75], [160, -293], [215, -54], [334, -135], [231, 10], [32, 228], [-36, 366], [21, 248]], [[77035, 68105], [20, -219], [-97, -105], [23, -355], [-199, 104], [-359, -397], [8, -330], [-153, -483], [-14, -281], [-124, -474], [-217, 131], [-11, -596], [-63, -196], [30, -245], [-137, -137]], [[74730, 64531], [-39, -210], [-189, 7], [-343, -120], [16, -433], [-148, -341], [-400, -387], [-311, -678], [-209, -363], [-276, -377], [-1, -265], [-138, -142], [-251, -206], [-129, -31], [-84, -439], [58, -749], [15, -478], [-118, -547], [-1, -978], [-144, -28], [-126, -439], [84, -190], [-253, -163], [-93, -392], [-112, -165], [-263, 537], [-128, 807], [-107, 581], [-97, 272], [-148, 553], [-69, 720], [-48, 360], [-253, 791], [-115, 1116], [-83, 737], [1, 698], [-54, 539], [-404, -345], [-196, 69], [-362, 698], [133, 208], [-82, 226], [-326, 489]], [[68937, 65473], [185, 384], [612, -1], [-56, 494], [-156, 292], [-31, 444], [-182, 258], [306, 604], [323, -44], [290, 604], [174, 584], [270, 578], [-4, 411], [236, 333], [-224, 284], [-96, 390], [-99, 504], [137, 249], [421, -141], [310, 86], [268, 484]], [[48278, 82851], [46, -412], [-210, -514], [-493, -340], [-393, 87], [225, 601], [-145, 586], [378, 451], [210, 269]], [[64978, 73251], [244, 112], [197, 329], [186, -17], [122, 108], [197, -53], [308, -292], [221, -63], [318, -510], [207, -21], [24, -484]], [[66909, 69007], [137, -302], [112, -348], [266, -253], [7, -508], [133, -93], [23, -265], [-400, -298], [-105, -669]], [[67082, 66271], [-523, 174], [-303, 133], [-313, 74], [-118, 707], [-133, 102], [-214, -103], [-280, -279], [-339, 191], [-281, 443], [-267, 164], [-186, 546], [-205, 768], [-149, -93], [-177, 190], [-104, -224]], [[63490, 69064], [-153, 302], [-3, 307], [-89, 0], [46, 417], [-143, 438], [-340, 315], [-193, 548], [65, 449], [139, 199], [-21, 336], [-182, 173], [-180, 687]], [[62436, 73235], [-152, 461], [55, 179], [-87, 660], [190, 164]], [[63578, 73897], [88, -424], [263, -120], [193, -289], [395, -100], [434, 153], [27, 134]], [[63490, 69064], [-164, 28]], [[63326, 69092], [-187, 48], [-204, -553]], [[62935, 68587], [-516, 46], [-784, 1158], [-413, 403], [-335, 156]], [[60887, 70350], [-112, 701]], [[60775, 71051], [615, 600], [105, 696], [-26, 421], [152, 142], [142, 359]], [[61763, 73269], [119, 90], [324, -75], [97, -146], [133, 97]], [[45969, 90100], [-64, -373], [314, -392], [-361, -440], [-801, -394], [-240, -105], [-365, 85], [-775, 182], [273, 254], [-605, 282], [492, 112], [-12, 169], [-583, 134], [188, 375], [421, 85], [433, -391], [422, 314], [349, -163], [453, 307], [461, -41]], [[59922, 70666], [-49, -182]], [[59873, 70484], [-100, 80], [-58, -383], [69, -65], [-71, -79], [-12, -152], [131, 78]], [[59832, 69963], [7, -224], [-139, -920]], [[59518, 69808], [80, 190], [-19, 32], [74, 270], [56, 434], [40, 146], [8, 6]], [[59757, 70886], [93, -1], [25, 101], [75, 7]], [[59950, 70993], [4, -236], [-38, -87], [6, -4]], [[54311, 73846], [-100, -453], [41, -179], [-58, -296], [-213, 217], [-141, 62], [-387, 293], [38, 296], [325, -53], [284, 63], [211, 50]], [[52558, 75561], [166, -408], [-39, -762], [-126, 36], [-113, -192], [-105, 153], [-11, 694], [-64, 330], [153, -29], [139, 178]], [[53835, 78613], [-31, -283], [67, -246]], [[53871, 78084], [-221, 84], [-226, -204], [15, -286], [-34, -164], [91, -293], [261, -290], [140, -476], [309, -464], [217, 3], [68, -127], [-78, -115], [249, -208], [204, -174], [238, -301], [29, -107], [-52, -206], [-154, 268], [-242, 95], [-116, -372], [200, -214], [-33, -300], [-116, -34], [-148, -494], [-116, -45], [1, 176], [57, 309], [60, 123], [-108, 334], [-85, 290], [-115, 72], [-82, 249], [-179, 104], [-120, 232], [-206, 37], [-217, 260], [-254, 375], [-189, 332], [-86, 569], [-138, 67], [-226, 190], [-128, -78], [-161, -267], [-115, -42]], [[28453, 62478], [187, -52], [147, -138], [46, -158], [-195, -11], [-84, -96], [-156, 92], [-159, 210], [34, 132], [116, 40], [64, -19]], [[59922, 70666], [309, -228], [544, 613]], [[60887, 70350], [-53, -87], [-556, -289], [277, -575], [-92, -98], [-46, -193], [-212, -80], [-66, -207], [-120, -177], [-310, 91]], [[59709, 68735], [-9, 84]], [[59832, 69963], [41, 169], [0, 352]], [[87399, 71495], [35, -197], [-156, -349], [-114, 185], [-143, -134], [-73, -337], [-181, 164], [2, 273], [154, 344], [158, -67], [114, 242], [204, -124]], [[89159, 73219], [-104, -460], [48, -288], [-145, -406], [-355, -271], [-488, -36], [-396, -657], [-186, 221], [-12, 431], [-483, -127], [-329, -271], [-325, -11], [282, -424], [-186, -979], [-179, -242], [-135, 224], [69, 519], [-176, 167], [-113, 395], [263, 177], [145, 362], [280, 298], [203, 394], [553, 171], [297, -117], [291, 1024], [185, -275], [408, 575], [158, 224], [174, 704], [-47, 648], [117, 364], [295, 105], [152, -798], [-9, -467], [-256, -580], [4, -594]], [[89974, 77268], [195, -122], [197, 244], [62, -647], [-412, -157], [-244, -572], [-436, 393], [-152, -630], [-308, -9], [-39, 573], [138, 443], [296, 32], [81, 797], [83, 449], [326, -600], [213, -194]], [[69711, 76170], [-159, -107], [-367, -401], [-121, -412], [-104, -4], [-76, 273], [-353, 18], [-57, 472], [-135, 4], [21, 578], [-333, 421], [-476, -45], [-326, -84], [-265, 519], [-227, 218], [-431, 412], [-52, 50], [-715, -340], [11, -2124]], [[65546, 75618], [-142, -28], [-195, 452], [-188, 161], [-315, -120], [-123, -191]], [[64583, 75892], [-15, 140], [68, 240], [-53, 201], [-322, 196], [-125, 517], [-154, 146], [-9, 187], [270, -54], [11, 421], [236, 93], [243, -86], [50, 562], [-50, 356], [-278, -28], [-236, 141], [-321, -253], [-259, -121]], [[63639, 78550], [-142, 93], [29, 296], [-177, 385], [-207, -16], [-235, 391], [160, 436], [-81, 118], [222, 632], [285, -334], [35, 421], [573, 626], [434, 15], [612, -399], [329, -233], [295, 243], [440, 12], [356, -298], [80, 170], [391, -24], [69, 272], [-450, 396], [267, 281], [-52, 157], [266, 150], [-200, 394], [127, 197], [1039, 200], [136, 142], [695, 213], [250, 239], [499, -124], [88, -597], [290, 140], [356, -197], [-23, -314], [267, 33], [696, 543], [-102, -180], [355, -445], [620, -1463], [148, 302], [383, -332], [399, 148], [154, -104], [133, -332], [194, -112], [119, -244], [358, 77], [147, -353]], [[72294, 76218], [-171, 84], [-140, 207], [-412, 61], [-461, 15], [-100, -63], [-396, 242], [-158, -119], [-43, -340], [-457, 198], [-183, -81], [-62, -252]], [[61551, 50860], [-195, -230], [-68, -240], [-104, -42], [-40, -406], [-89, -233], [-54, -383], [-112, -190]], [[60889, 49136], [-399, 576], [-19, 334], [-1007, 1173], [-47, 63]], [[59417, 51282], [-3, 611], [80, 233], [137, 381], [101, 420], [-123, 661], [-32, 289], [-132, 400]], [[59445, 54277], [171, 344], [188, 379]], [[61626, 54086], [-243, -653], [3, -2098], [165, -475]], [[70465, 74537], [-526, -87], [-343, 187], [-301, -45], [26, 332], [303, -96], [101, 177]], [[69725, 75005], [212, -56], [355, 414], [-329, 304], [-198, -144], [-205, 217], [234, 373], [-83, 57]], [[78495, 58847], [-66, 696], [178, 479], [359, 110], [261, -83]], [[79227, 60049], [229, -226], [126, 397], [246, -212]], [[79828, 60008], [64, -384], [-34, -690], [-467, -443], [122, -349], [-292, -42], [-240, -232]], [[78981, 57868], [-233, 84], [-112, 301], [-141, 594]], [[85652, 74065], [240, -679], [68, -373], [3, -664], [-105, -316], [-252, -111], [-222, -239], [-250, -49], [-31, 313], [51, 432], [-122, 600], [206, 97], [-190, 493]], [[85048, 73569], [17, 52], [124, -21], [108, 260], [197, 28], [118, 38], [40, 139]], [[55575, 76355], [52, 129]], [[55627, 76484], [66, 42], [38, 191], [50, 32], [40, -81], [52, -36], [36, -92], [46, -27], [54, -107], [39, 3], [-31, -140], [-33, -68], [9, -43]], [[55993, 76158], [-62, -23], [-164, -89], [-13, -118], [-35, 5]], [[63326, 69092], [58, -254], [-25, -132], [89, -434]], [[63448, 68272], [-196, -15], [-69, 274], [-248, 56]], [[79227, 60049], [90, 260], [12, 487], [-224, 502], [-18, 568], [-211, 468], [-210, 40], [-56, -201], [-163, -17], [-83, 102], [-293, -344], [-6, 517], [68, 606], [-188, 27], [-16, 346], [-120, 178]], [[77809, 63588], [59, 212], [237, 374]], [[78380, 64766], [162, -454], [125, -524], [342, -4], [108, -502], [-178, -151], [-80, -207], [333, -345], [231, -680], [175, -508], [210, -400], [70, -407], [-50, -576]], [[59757, 70886], [99, 469], [138, 406], [5, 20]], [[59999, 71781], [125, -30], [45, -226], [-151, -217], [-68, -315]], [[47857, 54343], [-73, -5], [-286, 274], [-252, 439], [-237, 315], [-187, 371]], [[46822, 55737], [66, 184], [15, 168], [126, 313], [129, 268]], [[54125, 64996], [-197, -214], [-156, 316], [-439, 248]], [[52633, 69283], [136, 133], [24, 244], [-30, 238], [191, 222], [86, 185], [135, 165], [16, 442]], [[53191, 70912], [326, -198], [117, 50], [232, -96], [368, -258], [130, -512], [250, -111], [391, -242], [296, -286], [136, 150], [133, 264], [-65, 442], [87, 280], [200, 270], [192, 78], [375, -118], [95, -257], [104, -3], [88, -98], [276, -67], [68, -191]], [[56944, 64499], [0, -1150], [-320, -2], [-3, -242]], [[56621, 63105], [-1108, 1103], [-1108, 1103], [-280, -315]], [[72718, 56162], [-42, -600], [-116, -164], [-242, -132], [-132, 458], [-49, 828], [126, 935], [192, -320], [129, -406], [134, -599]], [[58049, 35154], [96, -173], [-85, -281], [-47, -187], [-155, -90], [-51, -184], [-99, -58], [-209, 443], [148, 365], [151, 225], [130, 118], [121, -178]], [[56314, 83116], [-23, 147], [30, 157], [-123, 92], [-291, 100]], [[55907, 83612], [-59, 485]], [[55848, 84097], [318, 176], [466, -37], [273, 57], [39, -120], [148, -37], [267, -279]], [[56523, 82877], [-67, 177], [-142, 62]], [[55848, 84097], [10, 433], [136, 362], [262, 196], [221, -430], [223, 11], [53, 442]], [[57579, 84928], [134, -133], [24, -279], [89, -340]], [[47592, 67756], [-42, 0], [7, -308], [-172, -19], [-90, -131], [-126, 0], [-100, 75], [-234, -62], [-91, -449], [-86, -42], [-131, -726], [-386, -621], [-92, -796], [-114, -258], [-33, -208], [-625, -46], [-5, 1]], [[45272, 64166], [13, 267], [106, 157], [91, 300], [-18, 195], [96, 406], [155, 366], [93, 93], [74, 336], [6, 307], [100, 356], [185, 210], [177, 588], [5, 8], [139, 221], [259, 64], [218, 393], [140, 154], [232, 481], [-70, 716], [106, 495], [37, 304], [179, 389], [278, 263], [206, 238], [186, 596], [87, 354], [205, -3], [167, -244], [264, 39], [288, -127], [121, -6]], [[57394, 79599], [66, 85], [185, 57], [204, -180], [115, -21], [125, -155], [-20, -195], [101, -95], [40, -240], [97, -147], [-19, -86], [52, -58], [-74, -43], [-164, 17], [-27, 80], [-58, -46], [20, -103], [-76, -184], [-49, -197], [-70, -63]], [[57842, 78025], [-50, 263], [30, 246], [-9, 253], [-160, 342], [-89, 243], [-86, 171], [-84, 56]], [[63761, 44648], [74, -245], [69, -380], [45, -693], [72, -269], [-28, -277], [-49, -169], [-94, 338], [-53, -171], [53, -427], [-24, -244], [-77, -133], [-18, -488], [-109, -671], [-137, -793], [-172, -1092], [-106, -800], [-125, -668], [-226, -136], [-243, -244], [-160, 147], [-220, 206], [-77, 304], [-18, 510], [-98, 460], [-26, 414], [50, 415], [128, 100], [1, 191], [133, 437], [25, 367], [-65, 272], [-52, 364], [-23, 530], [97, 322], [38, 366], [138, 21], [155, 118], [103, 104], [122, 8], [158, 328], [229, 355], [83, 289], [-38, 247], [118, -70], [153, 401], [6, 346], [92, 257], [96, -247]], [[23016, 66727], [-107, -505], [-49, -415], [-20, -771], [-27, -281], [48, -315], [86, -280], [56, -447], [184, -429], [65, -328], [109, -284], [295, -153], [114, -241], [244, 161], [212, 58], [208, 104], [175, 99], [176, 235], [67, 336], [22, 483], [48, 169], [188, 151], [294, 133], [246, -20], [169, 49], [66, -122], [-9, -278], [-149, -342], [-66, -351], [51, -100], [-42, -249], [-69, -449], [-71, 148], [-58, -10]], [[24381, 60202], [-314, 620], [-144, 187], [-226, 150], [-156, -42], [-223, -216], [-140, -57], [-196, 152], [-208, 109], [-260, 264], [-208, 81], [-314, 268], [-233, 275], [-70, 154], [-155, 34], [-284, 183], [-116, 262], [-299, 327], [-139, 363], [-66, 281], [93, 56], [-29, 164], [64, 150], [1, 199], [-93, 259], [-25, 229], [-94, 290], [-244, 573], [-280, 450], [-135, 359], [-238, 235], [-51, 140], [42, 356], [-142, 135], [-164, 279], [-69, 402], [-149, 47], [-162, 303], [-130, 281], [-12, 180], [-149, 434], [-99, 441], [5, 221], [-201, 229], [-93, -26], [-159, 159], [-44, -234], [46, -276], [27, -433], [95, -237], [206, -397], [46, -135], [42, -41], [37, -198], [49, 8], [56, -372], [85, -146], [59, -204], [174, -293], [92, -536], [83, -252], [77, -270], [15, -304], [134, -19], [112, -261], [100, -257], [-6, -104], [-117, -211], [-49, 3], [-74, 350], [-181, 328], [-201, 278], [-142, 147], [9, 421], [-42, 312], [-132, 179], [-191, 257], [-37, -75], [-70, 151], [-171, 139], [-164, 334], [20, 44], [115, -33], [103, 215], [10, 260], [-214, 411], [-163, 159], [-102, 360], [-103, 377], [-129, 461], [-113, 518]], [[17464, 70566], [316, 44], [353, 63], [-26, -113], [419, -280], [634, -406], [552, 5], [221, 0], [0, 237], [481, 0], [102, -204], [142, -182], [165, -253], [92, -301], [69, -317], [144, -174], [230, -172], [175, 455], [227, 11], [196, -230], [139, -394], [96, -338], [164, -328], [61, -403], [78, -271], [217, -178], [197, -127], [108, 17]], [[55993, 76158], [95, 33], [128, 10]], [[46619, 60247], [93, 105], [47, 339], [88, 13], [194, -160], [157, 114], [107, -38], [42, 128], [1114, 8], [62, 404], [-48, 71], [-134, 2485], [-134, 2485], [425, 11]], [[51185, 62860], [1, -1326], [-152, -384], [-24, -355], [-247, -92], [-379, -49], [-102, -205], [-178, -22]], [[46801, 58995], [13, 179], [-24, 223], [-104, 162], [-54, 330], [-13, 358]], [[77375, 57550], [-27, 427], [86, 441], [-94, 341], [23, 627], [-113, 299], [-90, 689], [-50, 727], [-121, 477], [-183, -289], [-315, -410], [-156, 51], [-172, 135], [96, 714], [-58, 539], [-218, 664], [34, 208], [-163, 74], [-197, 469]], [[77809, 63588], [-159, -134], [-162, -249], [-196, -26], [-127, -623], [-117, -104], [134, -506], [177, -420], [113, -380], [-101, -501], [-96, -106], [66, -289], [185, -458], [32, -321], [-4, -268], [108, -525], [-152, -537], [-135, -591]], [[55380, 75946], [-58, 44], [-78, 188], [-120, 115]], [[55338, 76894], [74, -99], [40, -80], [91, -62], [106, -119], [-22, -50]], [[74375, 80219], [292, 99], [530, 496], [423, 271], [242, -176], [289, -9], [186, -269], [277, -21], [402, -144], [270, 401], [-113, 339], [288, 596], [311, -238], [252, -67], [327, -148], [53, -432], [394, -242], [263, 107], [351, 75], [279, -76], [272, -276], [168, -295], [258, 6], [350, -94], [255, 143], [366, 96], [407, 405], [166, -62], [146, -193], [331, 48]], [[59599, 45195], [209, 47], [334, -163], [73, 73], [193, 15], [99, 173], [167, -10], [303, 224], [221, 334]], [[61198, 45888], [45, -258], [-11, -574], [34, -505], [11, -900], [49, -282], [-83, -412], [-108, -400], [-177, -357], [-254, -219], [-313, -279], [-313, -618], [-107, -106], [-194, -409], [-115, -133], [-23, -411], [132, -436], [54, -337], [4, -173], [49, 29], [-8, -565], [-45, -267], [65, -99], [-41, -239], [-116, -205], [-229, -195], [-334, -312], [-122, -213], [24, -242], [71, -39], [-24, -303]], [[59119, 36429], [-211, 5]], [[58908, 36434], [-24, 254], [-41, 259]], [[58843, 36947], [-23, 206], [49, 642], [-72, 410], [-133, 810]], [[58664, 39015], [292, 654], [74, 415], [42, 52], [31, 339], [-45, 171], [12, 430], [54, 400], [0, 728], [-145, 185], [-132, 42], [-60, 143], [-128, 121], [-232, -11], [-18, 215]], [[58409, 42899], [-26, 410], [843, 474]], [[59226, 43783], [159, -276], [77, 53], [110, -146], [16, -231], [-59, -268], [21, -405], [181, -356], [85, 399], [120, 122], [-24, 740], [-116, 417], [-100, 185], [-97, -8], [-77, 748], [77, 438]], [[46619, 60247], [-184, 395], [-168, 424], [-184, 153], [-133, 169], [-155, -6], [-135, -126], [-138, 50], [-96, -185]], [[45426, 61121], [-24, 311], [78, 283], [34, 543], [-30, 569], [-34, 286], [28, 287], [-72, 274], [-146, 249]], [[45260, 63923], [60, 192], [1088, -4], [-53, 832], [68, 296], [261, 51], [-9, 1474], [911, -30], [1, 872]], [[59226, 43783], [-147, 149], [85, 535], [87, 201], [-53, 477], [56, 467], [47, 156], [-71, 489], [-131, 257]], [[59099, 46514], [273, -108], [55, -159], [95, -269], [77, -783]], [[78372, 55412], [64, -54], [164, -347], [116, -386], [16, -388], [-29, -262], [27, -198], [20, -340], [98, -159], [109, -509], [-5, -195], [-197, -38], [-263, 426], [-329, 457], [-32, 294], [-161, 385], [-38, 477], [-100, 314], [30, 419], [-61, 244]], [[77801, 55552], [48, 103], [227, -252], [22, -296], [183, 69], [91, 236]], [[80461, 52985], [204, -198], [214, 108], [56, 488], [119, 108], [333, 125], [199, 456], [137, 364]], [[82069, 54967], [214, 400], [140, 450], [112, 2], [143, -291], [13, -251], [183, -160], [231, -173], [-20, -226], [-186, -29], [50, -281], [-205, -196]], [[54540, 35373], [-207, 435], [-108, 420], [-62, 561], [-68, 417], [-93, 887], [-7, 689], [-35, 314], [-108, 237], [-144, 476], [-146, 691], [-60, 361], [-226, 563], [-17, 441]], [[56448, 41738], [228, 131], [180, -33], [109, -130], [2, -48]], [[55526, 37566], [0, -2127], [-248, -294], [-149, -42], [-175, 108], [-125, 42], [-47, 247], [-109, 157], [-133, -284]], [[96049, 39690], [228, -357], [144, -265], [-105, -138], [-153, 155], [-199, 259], [-179, 306], [-184, 406], [-38, 195], [119, -8], [156, -196], [122, -196], [89, -161]], [[54125, 64996], [68, -895], [104, -150], [4, -183], [116, -198], [-60, -248], [-107, -1168], [-15, -749], [-354, -543], [-120, -759], [115, -213], [0, -371], [178, -13], [-28, -271]], [[53939, 59018], [-52, -12], [-188, 630], [-65, 23], [-217, -322], [-215, 168], [-150, 34], [-80, -81], [-163, 17], [-164, -245], [-141, -14], [-337, 298], [-131, -142], [-142, 10], [-104, 218], [-279, 214], [-298, -68], [-72, -124], [-39, -331], [-80, -233], [-19, -514]], [[52361, 54577], [-289, -207], [-105, 30], [-107, -129], [-222, 13], [-149, 360], [-91, 417], [-197, 379], [-209, -7], [-245, 1]], [[26191, 58215], [-96, 181], [-130, 233], [-61, 194], [-117, 181], [-140, 260], [31, 89], [46, -87], [21, 41]], [[26903, 60465], [-24, -55], [-14, -129], [29, -210], [-64, -197], [-30, -231], [-9, -254], [15, -148], [7, -260], [-43, -56], [-26, -247], [19, -152], [-56, -147], [12, -156], [43, -94]], [[50920, 81398], [143, 159], [244, 847], [380, 241], [231, -16]], [[58639, 91887], [-473, -231], [-224, -54]], [[55734, 91626], [-172, -23], [-41, -379], [-523, 92], [-74, -321], [-267, 2], [-183, -409], [-278, -639], [-431, -810], [101, -197], [-97, -228], [-275, 10], [-180, -540], [17, -765], [177, -292], [-92, -677], [-231, -395], [-122, -332]], [[53063, 85723], [-187, 354], [-548, -666], [-371, -135], [-384, 293], [-99, 619], [-88, 1329], [256, 371], [733, 483], [549, 595], [508, 802], [668, 1112], [465, 434], [763, 722], [610, 252], [457, -31], [423, 477], [506, -25], [499, 115], [869, -422], [-358, -154], [305, -361]], [[56867, 96664], [-620, -236], [-490, 134], [191, 149], [-167, 184], [575, 115], [110, -216], [401, -130]], [[55069, 97728], [915, -429], [-699, -227], [-155, -424], [-243, -108], [-132, -478], [-335, -22], [-598, 351], [252, 205], [-416, 166], [-541, 487], [-216, 451], [757, 206], [152, -202], [396, 8], [105, 197], [408, 20], [350, -201]], [[57068, 98134], [545, -202], [-412, -310], [-806, -68], [-819, 96], [-50, 159], [-398, 10], [-304, 264], [858, 161], [403, -138], [281, 172], [702, -144]], [[98060, 28265], [63, -238], [198, 233], [80, -243], [0, -242], [-103, -267], [-182, -424], [-142, -232], [103, -277], [-214, -7], [-238, -217], [-75, -377], [-157, -583], [-219, -257], [-138, -164], [-256, 12], [-180, 190], [-302, 40], [-46, 212], [149, 427], [349, 568], [179, 109], [200, 219], [238, 301], [167, 299], [123, 429], [106, 146], [41, 321], [195, 267], [61, -245]], [[98502, 31008], [202, -607], [5, 394], [126, -158], [41, -435], [224, -188], [188, -46], [158, 220], [141, -67], [-67, -511], [-85, -336], [-212, 12], [-74, -175], [26, -248], [-41, -107], [-105, -310], [-138, -395], [-214, -229], [-48, 151], [-116, 83], [160, 474], [-91, 317], [-299, 230], [8, 209], [201, 200], [47, 444], [-13, 372], [-113, 386], [8, 102], [-133, 237], [-218, 510], [-117, 408], [104, 45], [151, -320], [216, -149], [78, -513]], [[64752, 61418], [-91, 403], [-217, 950]], [[64444, 62771], [833, 576], [185, 1152], [-127, 408]], [[65665, 66183], [125, -393], [155, -209], [203, -76], [165, -105], [125, -330], [75, -191], [100, -73], [-1, -128], [-101, -344], [-44, -161], [-117, -184], [-104, -395], [-126, 30], [-58, -137], [-44, -292], [34, -385], [-26, -71], [-128, 2], [-174, -215], [-27, -281], [-63, -121], [-173, 4], [-109, -145], [1, -232], [-134, -160], [-153, 54], [-186, -194], [-128, -33]], [[65575, 66834], [80, 196], [35, -50], [-26, -238], [-37, -104]], [[68937, 65473], [-203, 146], [-83, 414], [-215, 438], [-512, -108], [-451, -11], [-391, -81]], [[28366, 55989], [-93, 166], [-59, 311], [68, 154], [-70, 40], [-52, 190], [-138, 160], [-122, -37], [-56, -200], [-112, -145], [-61, -20], [-27, -120], [132, -312], [-75, -74], [-40, -85], [-130, -29], [-48, 344], [-36, -98], [-92, 33], [-56, 232], [-114, 38], [-72, 68], [-119, -1], [-8, -125], [-32, 87]], [[27070, 57338], [100, -206], [-6, -122], [111, -26], [26, 47], [77, -142], [136, 42], [119, 145], [168, 116], [95, 172], [153, -33], [-10, -57], [155, -20], [124, -99], [90, -173], [105, -159]], [[30452, 41263], [-279, 331], [-24, 236], [-551, 578], [-498, 630], [-214, 355], [-115, 476], [46, 166], [-236, 755], [-274, 1063], [-262, 1147], [-114, 262], [-87, 424], [-216, 376], [-198, 233], [90, 257], [-134, 550], [86, 403], [221, 364]], [[85104, 56675], [28, -382], [16, -323], [-94, -527], [-102, 587], [-130, -292], [89, -425], [-79, -270], [-327, 335], [-78, 416], [84, 274], [-176, 273], [-87, -239], [-131, 22], [-205, -321], [-46, 168], [109, 486], [175, 161], [151, 217], [98, -260], [212, 157], [45, 257], [196, 16], [-16, 445], [225, -273], [23, -290], [20, -212]], [[84439, 57749], [-100, -190], [-87, -363], [-87, -171], [-171, 398], [57, 154], [70, 162], [30, 357], [153, 34], [-44, -388], [205, 556], [-26, -549]], [[82917, 57194], [-369, -546], [136, 403], [200, 355], [167, 399], [146, 572], [49, -470], [-183, -317], [-146, -396]], [[83856, 58678], [166, -179], [177, 1], [-5, -240], [-129, -245], [-176, -173], [-10, 268], [20, 293], [-43, 275]], [[84861, 58834], [78, -643], [-214, 152], [5, -193], [68, -355], [-132, -129], [-11, 405], [-84, 30], [-43, 348], [163, -46], [-4, 218], [-169, 440], [266, -13], [77, -214]], [[83757, 59356], [-74, -498], [-119, 288], [-142, 438], [238, -21], [97, -207]], [[83700, 62485], [171, -164], [85, 150], [26, -146], [-46, -239], [95, -413], [-73, -478], [-164, -191], [-43, -465], [62, -458], [147, -64], [123, 68], [347, -319], [-27, -313], [91, -139], [-29, -265], [-216, 283], [-103, 302], [-71, -211], [-177, 345], [-253, -86], [-138, 128], [14, 238], [87, 146], [-83, 133], [-36, -207], [-137, 331], [-41, 251], [-11, 551], [112, -190], [29, 901], [90, 522], [169, -1]], [[93299, 47902], [-78, -58], [-120, 221], [-122, 366], [-59, 439], [38, 55], [30, -171], [84, -130], [135, -366], [131, -195], [-39, -161]], [[92217, 48675], [-146, -48], [-44, -161], [-152, -140], [-142, -135], [-148, 1], [-228, 167], [-158, 161], [23, 178], [249, -84], [152, 45], [42, 276], [40, 14], [27, -306], [158, 44], [78, 197], [155, 206], [-30, 339], [166, 11], [56, -94], [-5, -320], [-93, -351]], [[89166, 50332], [482, -397], [513, -329], [192, -295], [154, -290], [43, -339], [462, -356], [68, -306], [-256, -62], [62, -383], [248, -378], [180, -611], [159, 19], [-11, -255], [215, -98], [-84, -108], [295, -243], [-30, -166], [-184, -40], [-69, 149], [-238, 65], [-281, 86], [-216, 368], [-158, 316], [-144, 504], [-362, 252], [-235, -164], [-170, -190], [35, -425], [-218, -198], [-155, 96], [-288, 25]], [[92538, 49238], [-87, -154], [-52, 340], [-65, 223], [-126, 189], [-158, 245], [-200, 170], [77, 139], [150, -162], [94, -126], [117, -139], [111, -241], [106, -185], [33, -299]], [[53922, 82787], [189, 169], [434, 266], [350, 195], [277, -97], [21, -140], [268, -8]], [[55461, 83172], [342, -65], [511, 9]], [[56535, 81532], [139, -502], [-29, -162], [-138, -67], [-252, -479], [71, -259], [-60, 34]], [[56266, 80097], [-264, 221], [-200, -81], [-131, 59], [-165, -123], [-140, 204], [-114, -78], [-16, 34]], [[31588, 62492], [142, -51], [50, -114], [-71, -146], [-209, 4], [-163, -21], [-16, 247], [40, 84], [227, -3]], [[86288, 76244], [39, -101]], [[86327, 76143], [-106, 35], [-120, -195], [-83, -196], [10, -414], [-143, -127], [-50, -102], [-104, -170], [-185, -95], [-121, -154], [-9, -250], [-32, -63], [111, -94], [157, -253]], [[85048, 73569], [-135, 109], [-34, -108], [-81, -48], [-10, 109], [-72, 52], [-75, 92], [76, 254], [66, 67], [-25, 105], [71, 311], [-18, 94], [-163, 63], [-131, 154]], [[47929, 73193], [-112, -149], [-146, 81], [-143, -64], [42, 451], [-26, 354], [-124, 53], [-67, 218], [22, 377], [111, 210], [20, 232], [58, 347], [-6, 244], [-56, 206], [-12, 195]], [[64113, 66085], [-18, 419], [75, 302], [76, 62], [84, -180], [5, -337], [-61, -339]], [[64274, 66012], [-77, -41], [-84, 114]], [[56308, 79404], [120, 123], [172, -64], [178, -2], [129, -141], [95, 89], [205, 55], [69, 135], [118, 0]], [[57842, 78025], [124, -106], [131, 93], [126, -99]], [[58223, 77913], [6, -149], [-135, -124], [-84, 54], [-78, -694]], [[56293, 77303], [-51, 101], [65, 97], [-69, 72], [-87, -129], [-162, 167], [-22, 237], [-169, 136], [-31, 183], [-151, 226]], [[89901, 81054], [280, -1020], [-411, 190], [-171, -832], [271, -590], [-8, -403], [-211, 347], [-182, -445], [-51, 483], [31, 561], [-32, 621], [64, 436], [13, 770], [-163, 566], [24, 787], [257, 265], [-110, 267], [123, 81], [73, -381], [96, -555], [-7, -567], [114, -581]], [[55461, 83172], [63, 254], [383, 186]], [[99999, 92620], [-305, -29], [-49, 183], [-99645, 240], [36, 24], [235, -1], [402, -165], [-24, -79], [-286, -138], [-363, -35], [99999, 0]], [[89889, 93991], [-421, -4], [-569, 64], [-49, 31], [263, 227], [348, 54], [394, -221], [34, -151]], [[91869, 95069], [-321, -228], [-444, 52], [-516, 227], [66, 187], [518, -87], [697, -151]], [[90301, 95344], [-219, -427], [-1023, 16], [-461, -136], [-550, 374], [149, 396], [366, 108], [734, -25], [1004, -306]], [[65981, 92556], [-164, -51], [-907, 75], [-74, 256], [-503, 154], [-40, 311], [284, 124], [-10, 314], [551, 491], [-255, 70], [665, 506], [-75, 261], [621, 304], [917, 370], [925, 108], [475, 214], [541, 74], [193, -227], [-187, -179], [-984, -286], [-848, -274], [-863, -548], [-414, -563], [-435, -553], [56, -479], [531, -472]], [[63639, 78550], [-127, -342], [-269, -95], [-276, -594], [252, -547], [-27, -388], [303, -678]], [[61098, 76843], [-354, 486], [-317, 218], [-240, 338], [202, 92], [231, 482], [-156, 227], [410, 236], [-8, 125], [-249, -92]], [[60617, 78955], [9, 255], [143, 161], [269, 42], [44, 192], [-62, 318], [113, 302], [-3, 169], [-410, 187], [-162, -6], [-172, 270], [-213, -92], [-352, 203], [6, 113], [-99, 250], [-222, 28], [-23, 178], [70, 117], [-178, 326], [-288, -56], [-84, 29], [-70, -131], [-104, 24]], [[57772, 86080], [316, 318], [-291, 274]], [[58639, 91887], [286, 200], [456, -348], [761, -137], [1050, -652], [213, -273], [18, -384], [-308, -302], [-454, -154], [-1240, 438], [-204, -73], [453, -422], [18, -267], [18, -589], [358, -175], [217, -150], [36, 279], [-168, 248], [177, 218], [672, -358], [233, 140], [-186, 422], [647, 564], [256, -33], [260, -202], [161, 396], [-231, 343], [136, 345], [-204, 357], [777, -185], [158, -322], [-351, -71], [1, -321], [219, -197], [429, 125], [68, 367], [580, 274], [970, 495], [209, -28], [-273, -350], [344, -60], [199, 197], [521, 16], [412, 239], [317, -347], [315, 381], [-291, 334], [145, 190], [820, -175], [385, -180], [1006, -658], [186, 302], [-282, 304], [-8, 122], [-335, 57], [92, 273], [-149, 449], [-8, 185], [512, 521], [183, 523], [206, 114], [736, -152], [57, -320], [-263, -468], [173, -183], [89, -403], [-63, -789], [307, -353], [-120, -384], [-544, -818], [318, -85], [110, 207], [306, 148], [74, 285], [240, 274], [-162, 328], [130, 380], [-304, 47], [-67, 321], [222, 578], [-361, 469], [497, 389], [-64, 409], [139, 13], [145, -319], [-109, -556], [297, -105], [-127, 415], [465, 227], [577, 30], [513, -328], [-247, 479], [-28, 614], [483, 116], [669, -25], [602, 75], [-226, 301], [321, 378], [319, 16], [540, 286], [734, 77], [93, 157], [729, 54], [227, -129], [624, 306], [510, -10], [77, 249], [265, 245], [656, 236], [476, -186], [-378, -142], [629, -89], [75, -284], [254, 140], [812, -8], [626, -281], [223, -215], [-69, -300], [-307, -170], [-730, -320], [-209, -171], [345, -80], [410, -146], [251, 109], [141, -369], [122, 149], [444, 91], [892, -95], [67, -269], [1162, -86], [15, 440], [590, -101], [443, 3], [449, -303], [128, -369], [-165, -241], [349, -453], [437, -234], [268, 605], [446, -260], [473, 155], [538, -177], [204, 162], [455, -81], [-201, 534], [367, 250], [2509, -374], [236, -342], [727, -440], [1122, 109], [553, -95], [231, -238], [-33, -421], [342, -164], [372, 118], [492, 15], [525, -113], [526, 64], [484, -512], [344, 184], [-224, 368], [123, 256], [886, -161], [578, 34], [799, -275], [-99610, -251], [681, -440], [728, -572], [-24, -358], [187, -143], [-64, 418], [754, -86], [544, -539], [-276, -251], [-455, -59], [-7, -563], [-111, -120], [-260, 17], [-212, 201], [-369, 168], [-62, 250], [-283, 94], [-315, -74], [-151, 201], [60, 214], [-333, -137], [126, -271], [-158, -244], [0, -3], [99640, -253], [-360, 42], [250, -307], [166, -474], [128, -155], [32, -238], [-71, -153], [-518, 126], [-777, -434], [-247, -67], [-425, -405], [-403, -353], [-102, -262], [-397, 399], [-724, -453], [-126, 214], [-268, -246], [-371, 79], [-90, -379], [-333, -557], [10, -233], [316, -129], [-37, -839], [-258, -21], [-119, -482], [116, -248], [-486, -294], [-96, -657], [-415, -141], [-83, -585], [-400, -536], [-103, 396], [-119, 841], [-155, 1279], [134, 799], [234, 344], [14, 269], [432, 129], [496, 725], [479, 592], [499, 459], [223, 812], [-337, -49], [-167, -474], [-705, -632], [-227, 708], [-717, -196], [-696, -965], [230, -353], [-620, -151], [-430, -59], [20, 417], [-431, 87], [-344, -283], [-850, 99], [-914, -171], [-899, -1124], [-1065, -1358], [438, -73], [136, -360], [270, -128], [178, 288], [305, -38], [401, -633], [9, -490], [-217, -576], [-23, -687], [-126, -921], [-418, -833], [-94, -399], [-377, -670], [-374, -665], [-179, -340], [-370, -338], [-175, -8], [-175, 280], [-373, -421], [-43, -192]], [[79187, 96925], [-1566, -222], [507, 756], [229, 64], [208, -37], [704, -327], [-82, -234]], [[64204, 98215], [-373, -76], [-250, -44], [-39, -94], [-324, -95], [-301, 136], [158, 180], [-618, 17], [542, 105], [422, 7], [57, -155], [159, 138], [262, 95], [412, -126], [-107, -88]], [[77760, 97255], [-606, -71], [-773, 166], [-462, 220], [-213, 413], [-379, 113], [722, 394], [600, 130], [540, -290], [640, -557], [-69, -518]], [[58449, 51176], [110, -325], [-16, -339], [-80, -73]], [[58216, 51057], [67, -59], [166, 178]], [[45260, 63923], [12, 243]], [[61883, 61244], [-37, 246], [-83, 173], [-22, 230], [-143, 206], [-148, 483], [-79, 469], [-192, 397], [-124, 94], [-184, 549], [-32, 400], [12, 342], [-159, 638], [-130, 225], [-150, 119], [-92, 330], [15, 130], [-77, 299], [-81, 128], [-108, 429], [-170, 464], [-141, 395], [-139, -2], [44, 316], [12, 201], [34, 230]], [[63448, 68272], [109, -497], [137, -131], [47, -203], [190, -242], [16, -237], [-27, -192], [35, -193], [80, -162], [37, -189], [41, -141]], [[64274, 66012], [53, -220]], [[64444, 62771], [-801, -221], [-259, -259], [-199, -604], [-130, -96], [-70, 191], [-106, -28], [-269, 57], [-50, 58], [-321, -13], [-75, -52], [-114, 149], [-74, -283], [28, -243], [-121, -183]], [[59434, 57280], [-39, 11], [5, 287], [-33, 197], [-143, 228], [-34, 415], [34, 425], [-129, 40], [-19, -129], [-167, -29], [67, -169], [23, -346], [-152, -316], [-138, -415], [-144, -59], [-233, 336], [-105, -119], [-29, -168], [-143, -109], [-9, -118], [-277, 0], [-38, 118], [-200, 20], [-100, -99], [-77, 50], [-143, 336], [-48, 158], [-200, -79], [-76, -267], [-72, -514], [-95, -109], [-85, -63]], [[56635, 56793], [-23, 27]], [[56351, 58246], [3, 140], [-102, 169], [-3, 335], [-58, 222], [-98, -33], [28, 211], [72, 240], [-32, 239], [92, 176], [-58, 135], [73, 355], [127, 425], [240, -41], [-14, 2286]], [[60240, 64499], [90, -565], [-61, -105], [40, -593], [102, -687], [106, -142], [152, -213]], [[59433, 57348], [1, -68]], [[59434, 57280], [3, -449]], [[59445, 54277], [-171, -265], [-195, 1], [-224, -135], [-176, 129], [-115, -157]], [[56824, 56568], [-189, 225]], [[45357, 59658], [-115, 449], [-138, 205], [122, 109], [134, 404], [66, 296]], [[45367, 58962], [-46, 441]], [[95032, 45793], [78, -198], [-194, 3], [-106, 355], [166, -140], [56, -20]], [[94680, 46144], [-108, -13], [-170, 58], [-58, 89], [17, 228], [183, -90], [91, -121], [45, -151]], [[94910, 46301], [-42, -106], [-206, 499], [-57, 344], [94, 0], [100, -461], [111, -276]], [[94409, 47028], [12, -116], [-218, 245], [-152, 206], [-104, 192], [41, 59], [128, -138], [228, -265], [65, -183]], [[93760, 47598], [-56, -33], [-121, 131], [-114, 237], [14, 96], [166, -243], [111, -188]], [[46822, 55737], [-75, 43], [-200, 232], [-144, 308], [-49, 211], [-34, 425]], [[25613, 59537], [-31, -135], [-161, 8], [-100, 55], [-115, 115], [-154, 36], [-79, 123]], [[61984, 58430], [91, -106], [54, -238], [125, -241], [138, -2], [262, 147], [302, 68], [245, 179], [138, 38], [99, 105], [158, 20]], [[63596, 58400], [-2, -9], [-1, -237], [0, -581], [0, -301], [-125, -353], [-194, -481]], [[63596, 58400], [89, 12], [128, 85], [147, 58], [132, 198], [105, 1], [6, -159], [-25, -335], [1, -303], [-59, -208], [-78, -622], [-134, -644], [-172, -735], [-238, -844], [-237, -645], [-327, -785], [-278, -467], [-415, -571], [-259, -438], [-304, -698], [-64, -304], [-63, -136]], [[34125, 55269], [333, -115], [30, 104], [225, 41], [298, -155]], [[34889, 54255], [109, -341], [-49, -248], [-24, -263], [-71, -242]], [[56266, 80097], [-77, -150], [-55, -232]], [[53809, 78032], [62, 52]], [[56639, 89841], [-478, -163], [-269, -401], [43, -353], [-441, -463], [-537, -495], [-202, -811], [198, -406], [265, -320], [-255, -649], [-289, -135], [-106, -967], [-157, -539], [-337, 55], [-158, -456], [-321, -27], [-89, 545], [-232, 653], [-211, 814]], [[58908, 36434], [-56, -256], [-163, -62], [-166, 312], [-2, 199], [76, 216], [26, 168], [80, 41], [140, -105]], [[59999, 71781], [-26, 440], [68, 237]], [[60041, 72458], [74, 126], [75, 127], [15, 321], [91, -112], [306, 160], [147, -108], [229, 1], [320, 217], [149, -10], [316, 89]], [[50518, 55366], [-224, -122]], [[78495, 58847], [-249, 265], [-238, -11], [41, 452], [-245, -3], [-22, -633], [-150, -841], [-90, -509], [19, -417], [181, -18], [113, -526], [50, -498], [155, -330], [168, -67], [144, -299]], [[77801, 55552], [-110, 221], [-47, 285], [-148, 325], [-135, 274], [-45, -339], [-53, 320], [30, 359], [82, 553]], [[68841, 73220], [156, 583], [-60, 429], [-204, 137], [72, 254], [232, -27], [132, 318], [89, 370], [371, 134], [-58, -267], [40, -161], [114, 15]], [[64978, 73251], [-52, 408], [40, 602], [-216, 195], [71, 394], [-184, 34], [61, 485], [262, -141], [244, 184], [-202, 346], [-80, 329], [-224, -147], [-28, -422], [-87, 374]], [[65546, 75618], [313, 8], [-45, 290], [237, 199], [234, 334], [374, -304], [30, -460], [106, -118], [301, 27], [93, -105], [137, -593], [317, -398], [181, -271], [291, -282], [369, -247], [-7, -352]], [[84713, 46708], [32, 136], [239, 129], [194, 20], [87, 72], [105, -72], [-102, -156], [-289, -252], [-233, -165]], [[32866, 58026], [160, 75], [58, -20], [-11, -430], [-232, -63], [-50, 52], [81, 158], [-6, 228]], [[52339, 73106], [302, 232], [195, -69], [-9, -291], [236, 212], [20, -111], [-139, -282], [-2, -266], [96, -143], [-36, -499], [-183, -289], [53, -314], [143, -10], [70, -274], [106, -90]], [[60041, 72458], [-102, 261], [105, 217], [-169, -49], [-233, 132], [-191, -331], [-421, -65], [-225, 309], [-300, 19], [-64, -238], [-192, -69], [-268, 307], [-303, -11], [-165, 573], [-203, 320], [135, 447], [-176, 276], [308, 550], [428, 23], [117, 438], [529, -76], [334, 373], [324, 163], [459, 13], [485, -406], [399, -223], [323, 89], [239, -52], [328, 301]], [[57776, 76021], [33, -222], [243, -186], [-51, -141], [-330, -32], [-118, -178], [-232, -310], [-87, 268], [3, 119]], [[83826, 65878], [-167, -924], [-119, -472], [-146, 486], [-32, 427], [163, 566], [223, 436], [127, -172], [-49, -347]], [[60889, 49136], [-128, -710], [16, -326], [178, -210], [8, -149], [-76, -348], [16, -175], [-18, -275], [97, -361], [115, -568], [101, -126]], [[59099, 46514], [-157, 172], [-177, 97], [-111, 97], [-116, 146]], [[58449, 51176], [98, 69], [304, -7], [566, 44]], [[60617, 78955], [-222, -46], [-185, -187], [-260, -30], [-239, -215], [16, -358], [136, -139], [284, 35], [-55, -206], [-304, -100], [-377, -333], [-154, 117], [61, 271], [-304, 169], [50, 110], [265, 191], [-80, 132], [-432, 146], [-19, 215], [-257, -71], [-103, -317], [-215, -426]], [[35174, 32383], [-121, -362], [-313, -320], [-205, 115], [-151, -62], [-256, 247], [-189, -18], [-169, 319]], [[6794, 62819], [-41, -96], [-69, 82], [8, 161], [-46, 210], [14, 64], [48, 94], [-19, 113], [16, 54], [21, -11], [107, -97], [49, -50], [45, -77], [71, -202], [-7, -32], [-108, -123], [-89, -90]], [[6645, 63718], [-94, -41], [-47, 121], [-32, 47], [-3, 36], [27, 49], [99, -55], [73, -88], [-23, -69]], [[6456, 64025], [-9, -63], [-149, 17], [21, 70], [137, -24]], [[6207, 64108], [-15, -33], [-19, 8], [-97, 20], [-35, 130], [-11, 23], [74, 80], [23, -37], [80, -191]], [[5737, 64488], [-33, -57], [-93, 105], [14, 42], [43, 57], [64, -13], [5, -134]], [[31350, 77823], [48, -189], [-296, -279], [-286, -198], [-293, -171], [-147, -342], [-47, -129], [-3, -306], [92, -305], [115, -14], [-29, 210], [83, -128], [-22, -165], [-188, -93], [-133, 11], [-205, -100], [-121, -29], [-162, -28], [-231, -167], [408, 108], [82, -109], [-389, -173], [-177, -1], [8, 71], [-84, -160], [82, -26], [-60, -414], [-203, -443], [-20, 148], [-61, 30], [-91, 144], [57, -310], [69, -103], [5, -217], [-89, -224], [-157, -460], [-25, 23], [86, 392], [-142, 220], [-33, 478], [-53, -249], [59, -365], [-183, 90], [191, -185], [12, -548], [79, -40], [29, -199], [39, -577], [-176, -427], [-288, -171], [-182, -338], [-139, -37], [-141, -211], [-39, -193], [-305, -374], [-157, -274], [-131, -342], [-43, -409], [50, -400], [92, -492], [124, -408], [1, -249], [132, -668], [-9, -388], [-12, -224], [-69, -352], [-83, -73], [-137, 70], [-44, 253], [-105, 132], [-148, 496], [-129, 440], [-42, 225], [57, 383], [-77, 316], [-217, 482], [-108, 89], [-281, -262], [-49, 29], [-135, 269], [-174, 142], [-314, -72], [-247, 63], [-212, -39], [-114, -90], [50, -153], [-5, -234], [59, -113], [-53, -76], [-103, 85], [-104, -109], [-202, 17], [-207, 305], [-242, -72], [-202, 133], [-173, -40], [-234, -135], [-253, -427], [-276, -248], [-152, -275], [-63, -259], [-3, -397], [14, -277], [52, -196]], [[17464, 70566], [-46, 294], [-180, 331], [-130, 69], [-30, 165], [-156, 29], [-100, 156], [-258, 57], [-71, 93], [-33, 316], [-270, 578], [-231, 801], [10, 133], [-123, 190], [-215, 483], [-38, 469], [-148, 315], [61, 477], [-10, 494], [-89, 441], [109, 543], [34, 523], [33, 522], [-50, 773], [-88, 492], [-80, 268], [33, 112], [402, -195], [148, -544], [69, 152], [-45, 472], [-94, 473]], [[7498, 84721], [-277, -219], [-142, 148], [-43, 270], [252, 205], [148, 88], [185, -39], [117, -179], [-240, -274]], [[4006, 86330], [-171, -89], [-182, 107], [-168, 157], [274, 98], [220, -52], [27, -221]], [[2297, 88560], [171, -109], [173, 59], [225, -152], [276, -77], [-23, -63], [-211, -121], [-211, 125], [-106, 104], [-245, -33], [-66, 51], [17, 216]], [[13740, 83389], [-153, 217], [-245, 183], [-78, 503], [-358, 466], [-150, 543], [-267, 38], [-441, 14], [-326, 165], [-574, 598], [-266, 109], [-486, 206], [-385, -49], [-546, 264], [-330, 246], [-309, -122], [58, -400], [-154, -37], [-321, -120], [-245, -195], [-308, -122], [-39, 339], [125, 565], [295, 177], [-76, 145], [-354, -321], [-190, -383], [-400, -410], [203, -280], [-262, -413], [-299, -241], [-278, -176], [-69, -255], [-434, -297], [-87, -271], [-325, -246], [-191, 44], [-259, -160], [-282, -196], [-231, -193], [-477, -164], [-43, 96], [304, 270], [271, 177], [296, 315], [345, 65], [137, 236], [385, 345], [62, 115], [205, 204], [48, 437], [141, 340], [-320, -175], [-90, 99], [-150, -209], [-181, 292], [-75, -207], [-104, 287], [-278, -230], [-170, 0], [-24, 343], [50, 211], [-179, 205], [-361, -110], [-235, 270], [-190, 138], [-1, 327], [-214, 245], [108, 331], [226, 322], [99, 295], [225, 42], [191, -92], [224, 278], [201, -50], [212, 179], [-52, 263], [-155, 104], [205, 222], [-170, -7], [-295, -125], [-85, -127], [-219, 127], [-392, -65], [-407, 138], [-117, 232], [-351, 334], [390, 241], [620, 282], [228, 0], [-38, -288], [586, 22], [-225, 357], [-342, 219], [-197, 288], [-267, 246], [-381, 182], [155, 302], [493, 19], [350, 262], [66, 280], [284, 274], [271, 66], [526, 256], [256, -39], [427, 307], [421, -121], [201, -260], [123, 112], [469, -35], [-16, -132], [425, -98], [283, 57], [585, -182], [534, -54], [214, -75], [370, 94], [421, -173], [302, -81]], [[30185, 58611], [-8, -136], [-163, -67], [91, -262], [-3, -301], [-123, -334], [105, -457], [120, 37], [62, 417], [-86, 202], [-14, 436], [346, 234], [-38, 272], [97, 181], [100, -404], [195, -10], [180, -321], [11, -190], [249, -6], [297, 60], [159, -258], [213, -71], [155, 180], [4, 145], [344, 34], [333, 8], [-236, -170], [95, -272], [222, -43], [210, -283], [45, -462], [144, 13], [109, -135]], [[80013, 64241], [-371, -493], [-231, -544], [-61, -399], [212, -607], [260, -753], [252, -356], [169, -462], [127, -1066], [-37, -1013], [-232, -379], [-318, -371], [-227, -480], [-346, -536], [-101, 369], [78, 390], [-206, 327]], [[96623, 42347], [-92, -76], [-93, 252], [10, 155], [175, -331]], [[96418, 43229], [45, -464], [-75, 72], [-58, -31], [-39, 159], [-6, 441], [133, -177]], [[64752, 61418], [-201, -154], [-54, -256], [-6, -196], [-277, -244], [-444, -268], [-249, -406], [-122, -32], [-83, 34], [-163, -239], [-177, -111], [-233, -30], [-70, -33], [-61, -152], [-73, -42], [-43, -146], [-137, 12], [-89, -78], [-192, 30], [-72, 336], [8, 315], [-46, 170], [-54, 426], [-80, 236], [56, 28], [-29, 264], [34, 111], [-12, 251]], [[58175, 39107], [113, -6], [134, -97], [94, 69], [148, -58]], [[59119, 36429], [-70, -419], [-32, -479], [-72, -260], [-190, -290], [-54, -84], [-118, -292], [-77, -296], [-158, -413], [-314, -594], [-196, -345], [-210, -262], [-290, -224], [-141, -30], [-36, -160], [-169, 85], [-138, -109], [-301, 111], [-168, -71], [-115, 31], [-286, -228], [-238, -91], [-171, -218], [-127, -13], [-117, 205], [-94, 10], [-120, 258], [-13, -80], [-37, 155], [2, 337], [-90, 386], [89, 105], [-7, 442], [-182, 539], [-139, 488], [-1, 1], [-199, 749]], [[58409, 42899], [-210, -79], [-159, -230], [-33, -199], [-100, -46], [-241, -473], [-154, -373], [-94, -13], [-90, 66], [-311, 63]]],
  "transform": {
    "scale": [0.0036000360003600037, 0.0017364686646866468],
    "translate": [-180, -90]
  }
};
exports.default = _default;
},{}],"story-data.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  id: "australia",
  name: "Australia",
  longlat: [133.775136, -25.274398],
  range: 163.518,
  scale: 90
}, {
  id: "brisbane",
  name: "Brisbane",
  longlat: [153.021072, -27.470125],
  range: 163.518,
  scale: 120
}, {
  id: "tasmania",
  name: "Tasmania",
  longlat: [146.315918, -41.640079],
  range: 163.518,
  scale: 120
}];
exports.default = _default;
},{}],"aus-states.topo.json":[function(require,module,exports) {
module.exports = {
  "type": "Topology",
  "arcs": [[[30761, 4540], [-1479, 524], [-72, -3], [19, 48], [66, 63], [6, 38], [-78, 35], [1, 64], [-73, 55], [-13, 158], [-34, 66], [-60, 63], [-139, 33], [-27, 21], [-130, -56], [-48, 45], [-74, 0], [-43, -65], [-122, -14], [-65, 24], [-55, -36], [-91, -33], [-37, 19], [-120, 19], [-26, 27], [-63, -2], [-36, 39], [-93, -13], [-38, 21], [-115, -56], [-108, -3], [-128, 35], [-49, -15], [-58, 46], [-52, -22], [-78, 14], [-60, 28], [-39, 47], [-128, 39], [-97, -43], [-79, 24], [-89, -6], [-33, 17], [-115, -47], [-43, -78], [49, -61], [-99, 9], [-46, -47], [-49, 1], [-50, 45], [-59, -12], [-45, 51], [-39, 10], [-74, 56], [-65, 112], [-70, 12], [-42, 48], [-43, 11], [-47, 59], [-96, 27], [-23, 30], [-86, 25], [-89, 68], [-69, 12], [-21, -21], [-67, 47], [24, 41], [-17, 55], [-82, -9], [-64, 20], [-45, 71], [6, 225], [-50, -3], [-73, 58], [-188, 16], [-41, 35], [-146, 53]], [[24760, 6704], [-27, -18]], [[24733, 6686], [-12, -18]], [[24721, 6668], [-8, -57]], [[24713, 6611], [-6, -9]], [[24707, 6602], [-4, -6]], [[24703, 6596], [-49, -26]], [[24654, 6570], [-44, -7]], [[24610, 6563], [-9, -6]], [[24601, 6557], [-41, 19]], [[24560, 6576], [4, 6]], [[24564, 6582], [6, 28]], [[24570, 6610], [-18, 25]], [[24552, 6635], [-28, 32]], [[24524, 6667], [4, 46], [-50, -3], [-47, 127], [27, 36]], [[24458, 6873], [-44, 6]], [[24414, 6879], [-30, 12], [-49, 73]], [[24335, 6964], [-2, 7]], [[24333, 6971], [-41, 29]], [[24292, 7000], [-14, 3]], [[24278, 7003], [-7, 0]], [[24271, 7003], [-32, -3]], [[24239, 7000], [-65, 52]], [[24174, 7052], [-24, 0]], [[24150, 7052], [-36, -11]], [[24114, 7041], [-20, 0]], [[24094, 7041], [-16, -11]], [[24078, 7030], [-3, 15]], [[24075, 7045], [-31, 0]], [[24044, 7045], [-36, -13], [-79, 21]], [[23929, 7053], [-57, 2]], [[23872, 7055], [-61, -36]], [[23811, 7019], [-1, -9]], [[23810, 7010], [-70, -14]], [[23740, 6996], [-62, 9]], [[23678, 7005], [-71, 43], [-38, -11], [-44, 35], [-60, -1]], [[23465, 7071], [-11, 4]], [[23454, 7075], [-110, 9]], [[23344, 7084], [-32, 25]], [[23312, 7109], [0, 4], [-3, 3711]], [[23309, 10824], [6607, 0], [61, 32], [54, 91], [68, 22], [56, 47], [93, 40], [24, -8], [54, 74], [112, 17], [96, -45], [15, 18], [117, 5], [95, -8], [33, 24], [87, 15], [89, -6], [51, 23], [51, -28], [15, -34], [75, -35], [143, -6], [100, 32], [154, -72], [60, -7], [37, -81], [24, 11], [97, -36], [62, -41], [4, -119], [29, -48], [65, -9], [90, 79], [-3, 37], [39, 50], [108, 33], [130, -38], [15, 38], [55, -16], [78, 16], [23, 32], [4, 98], [-72, 157], [51, -4], [44, 42], [75, 26], [47, -12], [77, 64], [63, -4], [24, 52], [40, 28], [52, -34], [117, -4], [70, -39], [107, 40], [45, -21], [93, -1], [52, -13], [55, 61]], [[33416, 11359], [47, 7]], [[33463, 11366], [82, 21]], [[33545, 11387], [49, 1]], [[33594, 11388], [73, 58], [48, -15]], [[33715, 11431], [42, -60], [-4, -77], [-21, -67], [11, -101], [41, -38], [-19, -99], [11, -50], [-120, -130], [-26, -60], [20, -29], [-47, -46], [-46, -70], [26, -51], [-11, -118], [-25, -45], [1, -65], [-35, -59], [-26, -146], [-53, -66], [8, -85], [-55, -74], [-3, -44], [-87, -135], [-18, -81], [9, -29], [-27, -62], [21, -95], [51, -13], [13, -33], [-43, -60], [14, -56], [-41, -32], [-33, -67], [-2, -69], [-41, -76], [19, -49], [-77, -72], [4, -50], [-37, -30], [0, -36], [-57, -59], [15, -26], [-121, -75], [-51, -60], [-32, -106], [51, -32], [-39, -71], [24, -17], [-30, -55], [20, -26], [-101, -28], [-69, -33], [-42, -50], [-74, -40], [-105, -30], [-21, 21], [-74, -12], [12, -28], [75, -16], [85, 20], [9, -39], [-47, -23], [-52, 6], [-140, -39], [-69, -35], [-110, -123], [-61, 30], [-39, -57], [77, 1], [-2, -66], [-60, -50], [-76, -28], [-30, -44], [40, -24], [-35, -45], [-23, -65], [-89, -23], [27, -52], [-27, -46], [6, -41], [-52, -75], [26, -36], [-17, -56], [-81, 14], [-24, -40], [27, -61], [-36, -38], [-116, -70], [-50, -62], [-22, -68], [6, -63], [-44, -89], [4, -55], [-20, -49], [-45, -27], [-27, -47], [29, -97], [-95, -38], [26, -63], [-80, -24], [-106, -101], [1, -56], [-72, -71], [3, -51], [-80, -84], [-19, -57], [-105, -123], [6, -87], [-27, -99], [20, -92], [-68, -97], [1, -115], [-71, -110], [-5, -49], [-30, -31], [-30, -76], [36, -77], [-63, -48], [82, -26], [50, -88], [-72, -30], [23, -37], [-18, -34], [22, -97]], [[30282, 6155], [-137, 56], [-58, 75], [-36, 13], [-260, -137], [0, -54], [-34, -61], [0, -134], [20, -42], [54, -37], [44, -73], [41, -32], [75, -18], [39, 55], [11, 110], [-26, 82], [61, 58], [-4, 68], [50, 52], [108, 4], [52, 15]], [[23281, 4133], [6, 439], [-8, 1266], [0, 1306], [14, -26]], [[23293, 7118], [19, -9]], [[23312, 7109], [32, -25]], [[23454, 7075], [11, -4]], [[23678, 7005], [62, -9]], [[23810, 7010], [1, 9]], [[23872, 7055], [57, -2]], [[24044, 7045], [31, 0]], [[24078, 7030], [16, 11]], [[24114, 7041], [36, 11]], [[24150, 7052], [24, 0]], [[24239, 7000], [32, 3]], [[24278, 7003], [14, -3]], [[24292, 7000], [41, -29]], [[24333, 6971], [2, -7]], [[24414, 6879], [44, -6]], [[24524, 6667], [28, -32]], [[24570, 6610], [-6, -28]], [[24560, 6576], [41, -19]], [[24610, 6563], [44, 7]], [[24703, 6596], [4, 6]], [[24713, 6611], [8, 57]], [[24721, 6668], [12, 18]], [[24733, 6686], [27, 18]], [[30761, 4540], [-58, -28], [-72, -1], [-68, -30], [-51, -74], [-149, -50], [-10, -16], [-300, -2], [-262, -6], [-151, -17], [-148, 5], [-132, -7], [-91, -15], [-189, -46], [-136, -45], [-121, -60], [-138, -85], [-339, -239], [-153, -118], [-369, -48], [-162, 12], [-48, -44], [70, -87], [120, 6], [49, -47], [-31, -48], [-17, -107], [-58, 0], [-2, 48], [-63, 52], [-65, 86], [-88, 43], [-41, 2], [-45, -60], [-54, 17], [-80, 117], [-74, 50], [-102, -25], [-38, 21], [-64, 70], [-50, 14], [9, 76], [68, 14], [27, 32], [-49, 102], [-118, 15], [-101, -43], [-12, -79], [-67, -9], [-67, -29], [-20, -33], [-73, -16], [-42, 14], [-100, 89], [70, -9], [114, 39], [-5, 15], [113, 111], [1, 54], [-48, 61], [-36, 6], [-40, 90], [-47, 13], [-82, -24], [-13, -35], [-123, -58], [-49, -3], [-63, -30], [-8, -34], [-90, 13], [-35, -47], [101, -20], [67, 7], [61, 35], [50, -9], [23, -39], [-80, -58], [-162, -22], [-80, -31], [-65, -53], [-180, -60], [-52, -66], [-114, -94], [-129, -33], [-106, -87], [-35, -2], [-69, 55], [-60, 22], [-102, -9], [-127, 85], [-54, 19], [-131, 15], [-58, 26], [-186, 109], [-76, 13], [-82, 41], [-93, -12], [-13, -23], [-83, 4], [-119, 60], [-100, 32], [-116, 10], [-116, -45], [40, -59], [-109, 3], [-93, 15], [-41, 70], [-108, 77], [-165, 73], [-52, 11]], [[27048, 3913], [-81, -14], [-45, -34], [-63, 20], [17, 81], [46, -21], [83, 3], [43, -35]], [[26932, 3766], [-77, 36], [-103, 1], [44, 39], [91, -7], [45, -69]], [[33594, 11388], [-49, -1]], [[33463, 11366], [-47, -7]], [[23309, 10824], [0, 2218]], [[23309, 13042], [-2491, 0]], [[20818, 13042], [2, 6982]], [[20820, 20024], [145, -105], [122, -47], [32, 7], [55, -27], [93, -3], [74, 10], [43, -24], [166, -57], [82, -7], [49, -19], [40, -63], [59, -23], [-14, -37], [12, -62], [68, -116], [57, -33], [92, -7], [50, -20], [94, -60], [47, -41], [134, -29], [107, -40], [10, -31], [46, -30], [74, -6], [241, 33], [174, 59], [96, 65], [99, 40], [49, 54], [21, 110], [23, 36], [5, 107], [22, 52], [76, 73], [14, 50], [39, 17], [63, 65], [24, 77], [31, 22], [28, 75], [-15, 36], [28, 48], [26, 92], [67, 106], [-33, 91], [35, 217], [37, 118], [15, 14], [60, 135], [9, 72], [43, 28], [-1, 42], [27, 74], [-61, 108], [-19, 87], [-11, 109], [-24, 78], [22, 82], [42, 99], [-3, 104], [-97, 109], [-12, 66], [47, 216], [58, 83], [26, 60], [47, 56], [8, 49], [-51, 57], [-10, 88], [-29, 32], [44, 65], [62, 22], [43, 46], [54, 124], [-6, 35], [-50, 46], [-111, -33], [-28, 18], [67, 140], [35, 100], [17, 12], [62, 125], [33, 48], [30, -1], [38, -63], [66, 23], [-58, 69], [17, 93], [33, 49], [41, 147], [57, 138], [6, 74], [25, 108], [-26, 104], [56, 49], [75, -2], [56, 25], [32, 42], [40, 87], [50, -6], [27, 22], [65, -46], [-82, -83], [88, -23], [-6, -30], [89, -20], [58, -84], [11, -61], [-5, -90], [39, -30], [23, -46], [-29, -38], [1, -94], [21, -56], [2, -85], [-12, -54], [51, -49], [88, -35], [65, 25], [45, -11], [31, -53], [-70, -114], [-18, -142], [84, -4], [78, -48], [-1, -74], [25, -32], [43, -9], [53, -39], [-51, -135], [-5, -74], [45, 23], [115, 19], [-38, -79], [14, -43], [-10, -76], [17, -49], [-6, -61], [14, -61], [54, -60], [-9, -81], [-31, -73], [-15, -91], [49, -76], [26, -81], [49, -35], [19, -83], [0, -60], [34, -92], [61, -81], [55, -29], [120, 0], [55, 27], [84, 78], [-1, 58], [122, -35], [78, 37], [45, 68], [21, 0], [66, -70], [-7, -74], [53, 2], [-27, -86], [80, -64], [56, -24], [106, -15], [33, -47], [9, -45], [53, -42], [92, -29], [78, 3], [-8, -38], [52, -54], [60, -20], [-54, -44], [-46, -72], [31, -88], [13, -86], [-33, -30], [30, -61], [-10, -32], [43, -21], [-9, -57], [41, -54], [-8, -64], [20, -24], [-11, -61], [42, -22], [53, -92], [-30, -73], [31, -69], [-50, -52], [-11, -70], [54, -60], [93, -127], [74, -37], [115, -127], [123, 9], [-48, -63], [-9, -56], [50, -54], [18, -82], [41, -78], [44, -35], [-5, -85], [68, -103], [-30, -32], [-19, -79], [24, -42], [-21, -87], [-44, -51], [-28, -57], [7, -92], [57, -64], [62, -48], [55, -75], [93, -21], [-4, -85], [-26, -47], [-24, -114], [53, -71], [50, -32], [48, -55], [90, -51], [96, -36], [74, 5], [19, -41], [47, -12], [29, -35], [80, 14], [20, 37], [48, -16], [4, -64], [58, -47], [93, -19], [47, 18], [114, -10], [55, -41], [43, -54], [22, -73], [1, -56], [70, -77], [56, -14], [35, 22], [-30, 36], [14, 31], [52, 13], [34, -104], [44, -43], [62, -14], [73, 34], [26, -44], [90, -11], [83, -133], [84, -18], [37, 16], [-20, 47], [92, -14], [25, -77], [64, -14], [65, -48], [65, -29], [12, -46], [44, -77], [-23, -29], [-62, 47], [-55, -23], [-44, -67], [23, -10], [34, -87], [91, -55], [7, -41], [55, -33], [94, -5], [-12, -69], [62, 12], [57, -18], [40, -57], [14, -52], [-31, -38], [59, -34], [49, -81], [-34, -91], [101, -11], [-19, -32], [94, -26], [-40, -51], [27, -51], [-33, -27], [34, -69], [-5, -64], [48, -75], [-6, -36], [31, -48], [36, -104], [49, -40], [62, -9], [99, -50], [32, -57], [61, -34], [34, 6], [-75, 139], [36, 116], [37, 31], [48, 8], [34, -59], [43, -35], [22, -74], [33, -25], [138, -53], [55, -42], [102, -40], [-14, 74], [-19, 20], [5, 72], [19, 26], [87, -22], [22, -62], [45, -17], [-46, -74], [43, -23], [76, -73], [-38, -134], [-15, -141], [-18, -54], [37, -25], [25, -87], [-29, -21], [17, -72], [51, -55], [5, -53], [47, 7], [76, -21], [10, -38], [70, -36], [42, -106], [120, -29], [31, -60], [60, -38], [114, -37], [87, -11], [-21, 55], [103, -61], [30, -63], [59, -19], [57, -51], [51, -143], [29, -47], [90, -95], [104, -63], [87, -15], [74, -62], [22, -74], [-7, -40], [107, -157], [40, -45], [49, -19], [70, 4], [77, -13], [23, -139], [-43, -64], [27, -127], [132, -116], [79, -48], [-8, -41], [-63, -162], [-12, -65], [13, -49], [35, 0], [-23, -102], [6, -92], [33, -27], [-2, -70], [-20, -71], [-57, -74], [83, -78], [-64, -26], [-31, -53], [49, -18], [-16, -79], [80, -62], [35, -62], [44, -2], [45, -115], [7, -45], [58, -5], [28, -53], [-26, -29], [1, -50], [27, -38], [18, -108], [70, -69]], [[33725, 11979], [-55, -108], [-22, -109], [-51, 16], [24, 48], [-8, 97], [23, 74], [89, -18]], [[33660, 12279], [-41, -129], [-45, 2], [-3, 103], [89, 24]], [[33229, 13354], [32, 46], [-1, 47], [53, 76], [-18, 125], [109, 68], [51, 65], [3, 62], [-47, 59], [-42, 13], [48, 52], [75, 29], [3, -139], [75, -84], [-143, -269], [-67, -140], [-24, -80], [9, -66], [-42, -26], [-40, 56], [-34, 106]], [[33443, 12240], [-35, -13], [-72, 94], [-1, 46], [44, 26], [31, -94], [33, -59]], [[31872, 14695], [-58, -26], [-39, 10], [-57, 82], [-68, 34], [-48, 93], [23, 33], [114, -43], [39, -1], [39, -107], [31, -20], [24, -55]], [[31246, 15776], [-47, -29], [-28, 39], [40, 42], [35, -52]], [[30722, 15895], [-9, -52], [-47, 26], [56, 26]], [[30002, 17255], [-33, -21], [-79, 30], [53, 23], [59, -32]], [[29924, 17421], [-26, -25], [12, -40], [-58, -4], [37, 65], [35, 4]], [[28193, 18126], [-31, -50], [-46, 49], [77, 1]], [[27657, 18740], [32, -26], [50, -84], [-10, -40], [-63, -2], [-39, 38], [5, 29], [-46, 63], [-42, 20], [21, 38], [92, -36]], [[24804, 25320], [-78, -39], [-81, 10], [31, 37], [51, -13], [77, 5]], [[24425, 24731], [-54, -64], [-51, 15], [-28, 37], [30, 44], [38, 10], [65, -42]], [[24410, 24407], [-49, -23], [-26, 26], [59, 27], [16, -30]], [[24370, 24337], [-106, -43], [-31, 33], [-2, 43], [63, 47], [49, -37], [27, -43]], [[24299, 24780], [-4, -31], [-44, -23], [-41, 49], [80, 40], [9, -35]], [[22240, 20034], [-46, 9], [-50, -26], [-46, 49], [-46, -40], [-29, -92], [-40, 19], [-81, -62], [-62, -5], [-53, 47], [-4, 44], [43, 29], [24, 48], [51, 30], [134, 13], [69, 41], [47, -9], [78, -56], [11, -39]], [[22041, 19617], [-41, 13], [56, 46], [53, -40], [-37, -39], [-31, 20]], [[13349, 8838], [0, 4202], [9960, 2]], [[23309, 13042], [3, -5911], [-19, -13]], [[23281, 4133], [-106, 11], [-146, -15], [-121, 53], [-117, 68], [-106, 157], [-112, 79], [6, 35], [-59, 39], [-44, 1], [-129, 114], [-66, 91], [29, 46], [-46, 86], [-59, 47], [98, 46], [46, 41], [16, 64], [-10, 78], [-56, 139], [-106, 175], [-110, 132], [-121, 112], [-137, 101], [-130, 78], [-143, 68], [-144, 32], [-65, -22], [-91, -73], [-204, 3], [-99, -14], [-50, 24], [26, 52], [138, 64], [39, 56], [83, 31], [24, 82], [-1, 96], [40, 57], [-34, 130], [47, 88], [-85, 51], [-18, 50], [-119, 91], [-35, 123], [-100, 127], [-49, -26], [-35, -61], [5, -68], [-75, -59], [-25, -58], [-18, -200], [-28, -26], [-62, -136], [1, -87], [-100, -39], [-69, 37], [-109, 14], [-73, -51], [-81, 2], [-53, -53], [-143, 10], [-48, -44], [-79, 0], [-2, 68], [79, 45], [16, 35], [-25, 39], [31, 22], [38, 79], [66, -20], [152, 19], [82, -44], [69, 51], [1, 57], [42, 140], [-30, 79], [2, 88], [20, 59], [0, 63], [-42, 67], [47, -1], [51, 69], [-8, 41], [60, 49], [-25, 34], [104, 79], [24, 41], [103, 86], [34, 7], [18, 52], [-59, 89], [7, 50], [-51, 32], [17, 58], [180, 68], [-30, 59], [-51, 40], [-47, 151], [37, 14], [-70, 51], [6, 19], [-85, 49], [-12, -56], [49, -56], [0, -71], [-19, -115], [-105, 37], [-41, -18], [-12, -45], [-50, -44], [-78, -42], [-7, -58], [-41, -50], [-20, -104], [-38, -24], [-30, -69], [-54, -71], [-38, -22], [-146, -25], [-112, -54], [-48, -4], [-109, -56], [-63, -15], [-14, -33], [-117, -50], [-59, -43], [-32, -83], [-114, -113], [-41, -4], [-18, -50], [-3, -79], [-47, 27], [-103, -37], [-58, -77], [-7, -61], [-56, -69], [161, 18], [-17, -47], [37, -98], [-63, 24], [-113, 65], [-66, -3], [-22, -59], [-52, 28], [-124, 120], [-103, 47], [-7, 38], [-97, 63], [-83, -24], [12, 54], [68, 3], [79, -16], [50, -89], [97, 21], [-79, 42], [-8, 85], [-35, 128], [-56, 109], [-6, 74], [-65, 74], [-9, 31], [-118, 91], [-164, 98], [17, 56], [-15, 81], [-36, 79], [-54, 41], [-29, 73], [-89, 27], [-30, -17], [-89, 12], [-102, -40], [-57, 35], [2, 40], [-57, 62], [-22, 64], [-71, 6], [-8, 26], [55, 33], [-16, 41], [28, 44], [73, -18], [41, 41], [-20, 88], [-43, 46], [-77, 43], [-70, -5], [-38, -33], [-117, 32], [30, 44], [54, 10], [-90, 98], [-61, -6], [-85, 118], [-62, 13], [-30, -53], [-50, 6], [-19, 37], [-65, -31], [-4, -43], [-56, 15], [-77, -8], [-76, 12], [-42, 35], [-153, 67], [-64, 41], [-192, 35], [-97, -9], [-52, -39], [-179, -21], [-41, 18], [-64, 63], [-261, 146], [-263, 109], [-164, 59], [-80, 21], [-101, -54], [-183, -51], [-198, 15], [-66, -5], [-177, 14], [-128, -9], [-168, -3], [-63, -13], [-261, -11], [-395, -38], [-42, -10]], [[20931, 5769], [-78, -46], [-108, 33], [-90, 7], [-118, -26], [-52, -43], [19, -26], [-133, -71], [-74, 56], [-134, 18], [-66, -44], [-111, 12], [-68, -19], [-51, 20], [-79, -25], [-41, 10], [-36, 45], [-56, 10], [-54, 63], [26, 20], [19, 75], [91, 7], [72, 29], [140, 19], [97, 4], [203, 66], [170, -12], [104, -43], [-40, -60], [153, 8], [60, -52], [40, 55], [87, -5], [52, -24], [56, -61]], [[13349, 21254], [0, -12416]], [[13349, 8838], [-87, -22], [-158, -68], [-53, -31], [-273, -95], [-242, -70], [-263, -46], [-100, -28], [-55, -29], [-254, -46], [-213, -16], [-152, 4], [-83, -12], [-208, 18], [-182, 38], [-101, -31], [-108, -12], [-125, -56], [-223, -135], [-180, -43], [-177, -79], [-63, -10], [-109, -77], [-128, -50], [-288, -36], [-129, -51], [-70, -58], [-44, -59], [-18, -54], [-68, -131], [-18, -97], [-84, -30], [-98, -92], [6, -53], [-158, -68], [-17, -30], [-151, 23], [-99, -75], [-74, -14], [-2, 53], [-64, 54], [-123, -10], [-88, -18], [-175, 13], [-90, -45], [-54, 25], [-67, 4], [-74, -33], [-21, -34], [-77, -6], [-59, 81], [-71, 55], [-71, -7], [-42, -39], [-62, -13], [-78, 35], [-41, -19], [-83, 44], [-34, -9], [-119, 18], [-157, -38], [-61, 13], [-76, -17], [-116, 12], [-47, -23], [-181, 1], [-29, -30], [-101, -34], [-101, 22], [-115, 6], [-42, -15], [-70, 23], [-81, -40], [-78, 6], [-57, -42], [-153, -80], [-78, -113], [4, -53], [-77, -10], [-11, -59], [-93, 1], [-42, -48], [-101, 34], [-130, 14], [-39, -38], [-85, -5], [-60, -47], [-14, -62], [-168, -44], [-66, -32], [-36, -86], [-184, -47], [-117, -59], [-46, 22], [-50, -34], [24, -68], [-68, 14], [-86, 41], [-64, 8], [-47, -51], [-124, 29], [-92, 76], [-35, -35], [-109, 0], [-37, -33], [-44, 22], [-117, 10], [-29, -34], [-127, 37], [-92, -27], [-157, 41], [-172, 86], [-106, 26], [-87, 5], [-68, 86], [-169, 135], [-138, 86], [-132, 59], [-129, 26], [-119, -25], [-80, 65], [13, 40], [-40, 74], [8, 61], [-20, 112], [20, 52], [-21, 71], [44, 47], [-20, 54], [42, 13], [57, -60], [69, -20], [78, -2], [106, 34], [121, 114], [52, 107], [37, 25], [6, 123], [-12, 81], [-34, 122], [-20, 123], [115, 16], [25, 36], [-49, 24], [26, 92], [-16, 96], [37, 86], [-20, 127], [1, 128], [-55, 144], [-88, 116], [-34, 65], [-81, 96], [-48, 116], [-59, 110], [-107, 148], [-104, 193], [-10, 162], [-39, 50], [6, 48], [-43, 81], [23, 102], [-20, 168], [33, 141], [-59, 133], [-5, 42], [-40, 103], [-34, 37], [-161, 139], [-21, 61], [5, 56], [-18, 80], [-52, 87], [-84, 74], [-23, 43], [-68, 76], [-70, 33], [-53, 57], [-58, 192], [48, 106], [-49, 151], [-115, 201], [-151, 223], [-165, 190], [-239, 201], [2, 42], [-85, 125], [53, -13], [47, -37], [57, 21], [36, 55], [42, -98], [32, -10], [34, -51], [15, -112], [-16, -51], [56, 2], [13, -35], [80, 1], [62, 31], [58, 50], [-10, 86], [9, 41], [-69, 62], [-91, 26], [-41, 70], [-49, 18], [-17, 112], [-35, 20], [-4, 49], [-28, 51], [-53, 44], [14, 73], [66, 90], [11, -77], [42, -22], [26, -57], [96, -58], [10, -163], [-28, -23], [0, -64], [51, -60], [43, 25], [54, 82], [57, -55], [-11, -45], [21, -30], [11, -73], [97, -85], [100, 63], [23, 66], [-28, 28], [-11, 57], [42, 2], [-2, 69], [-37, 65], [52, 1], [-21, 79], [-93, 89], [-108, 122], [-38, 97], [-35, 36], [-9, 54], [-28, 33], [-46, 100], [-74, 40], [-39, 59], [0, 94], [-40, 27], [5, 84], [-111, 125], [-69, 68], [0, 134], [-14, 58], [45, 31], [-18, 103], [30, 22], [10, 85], [36, 37], [15, 54], [29, 17], [39, 89], [116, 76], [20, 37], [14, 135], [-25, 87], [5, 35], [49, 74], [-11, 91], [-51, 111], [-38, 31], [-34, 64], [-2, 58], [60, 58], [10, 46], [59, 76], [38, 114], [107, 204], [93, 53], [69, -8], [-35, -38], [-9, -68], [-48, -145], [4, -27], [78, -120], [-47, -46], [0, -42], [55, -36], [44, 46], [115, 13], [61, 172], [55, 63], [42, 90], [46, 21], [19, 95], [60, 34], [48, 6], [161, 88], [54, -10], [59, 39], [113, 32], [44, -4], [116, 48], [178, 158], [84, 23], [67, 58], [70, 94], [59, 28], [165, 53], [14, 100], [35, -24], [68, -2], [14, 22], [94, 12], [55, 51], [45, 6], [12, 45], [81, 5], [45, 41], [68, -64], [59, -11], [76, 48], [158, 31], [-4, -35], [32, -31], [110, -22], [164, 21], [72, 32], [61, -23], [74, 29], [98, 74], [24, 56], [64, 16], [27, 27], [121, 62], [30, -22], [94, 28], [110, -15], [70, 41], [65, -3], [30, -21], [76, 33], [49, 7], [57, 78], [52, 30], [29, 67], [62, 15], [26, 42], [39, -15], [59, 19], [86, -27], [124, -12], [82, -48], [71, 18], [21, 32], [54, -6], [35, 28], [154, 30], [185, 14], [361, 106], [291, 110], [190, 115], [102, 92], [148, 183], [109, 204], [11, 37], [-31, 45], [82, 0], [58, 39], [-19, 75], [42, 75], [47, -16], [121, 60], [38, 48], [56, 14], [70, 76], [83, 24], [46, 41], [2, 91], [-139, 35], [6, 53], [-11, 140], [-45, 92], [4, 151], [19, 68], [24, 13], [78, 132], [59, 51], [67, 21], [35, 38], [81, -29], [-44, 89], [38, 55], [48, -28], [80, 17], [6, 69], [31, 73], [57, 29], [47, 42], [18, 74], [52, 6], [46, -44], [-50, -18], [10, -130], [82, -51], [13, -62], [39, -9], [10, -88], [55, -33], [36, -49], [10, -53], [45, -41], [32, -57], [8, -56], [55, -25], [71, -88], [48, 96], [18, 104], [-34, 122], [54, 25], [94, -65], [23, -48], [37, 25], [-31, 85], [81, 71], [-81, -3], [-32, 54], [-153, 157], [9, 80], [65, 20], [-53, 31], [-1, 32], [84, 34], [-30, 34], [-58, 1], [-7, 109], [90, 10], [64, -15], [25, -33], [-25, -32], [22, -42], [68, -29], [101, 67], [103, -12], [46, -21], [36, -81], [92, -7], [45, 61], [51, -48], [125, -3], [121, 18], [-43, 34], [-102, 11], [-75, -20], [-57, -1], [-11, 139], [30, -7], [19, 57], [47, -46], [61, 40], [-7, 81], [24, 81], [86, 38], [-9, 41], [-77, -20], [-64, -108], [-45, 11], [11, 41], [-67, 17], [-11, 98], [33, 65], [0, 71], [34, 51], [101, -21], [64, 78], [-16, 47], [42, 12], [-2, 50], [66, -43], [43, -4], [91, -49], [48, -42], [49, -15], [22, 91], [-52, 27], [-88, -41], [-37, 40], [4, 69], [-29, 34], [39, 36], [68, -16], [70, 79], [55, -11], [16, -68], [121, 26], [29, -39], [60, 16], [12, 62], [-40, 31], [-65, 5], [-55, 51], [73, 7], [-9, 33], [-72, 8], [-52, 83], [73, 67], [-6, 25], [46, 36], [60, 20], [90, -39], [2, 51], [112, 31], [17, 60], [-32, 67], [38, 65], [64, -79], [-45, -33], [31, -84], [88, 24], [46, -51], [-1, -41], [96, 53], [64, -13], [4, 48], [-23, 45], [45, 84], [-16, 32], [66, 17], [16, 78], [-40, 37], [-60, -15], [12, 104], [32, 25], [39, -17], [21, -40], [52, -14], [-34, -84], [30, -78], [71, 2], [18, 56], [-7, 45], [68, 61], [74, 14], [-30, -65], [94, -64], [2, -34], [72, 32], [-3, 26], [95, 65], [-10, 57], [47, -10], [2, 51], [-55, 93], [63, 16], [132, 6], [6, -19], [80, -39], [-10, -42], [32, -35], [98, 1], [33, 30], [68, -3], [89, -55], [-2, -58], [71, -20], [42, -43], [67, -34], [18, -39], [59, -44], [22, -63], [51, -71], [66, -14], [-2, -40], [29, -24], [55, 8], [110, -95], [12, -62], [-56, -115], [-4, -87], [-23, -29], [20, -47], [-27, -124], [48, -29], [3, 61], [-15, 61], [65, -14], [58, -57], [16, 20], [-48, 55], [1, 54], [-22, 28], [28, 67], [51, 21], [57, 66], [50, -48], [15, 102], [58, 23], [143, -11], [90, -48], [99, 4], [79, -18]], [[12685, 21061], [-63, -11], [-1, 85], [64, -74]], [[10219, 21113], [-47, -38], [-15, 54], [62, -16]], [[10206, 21538], [-16, -70], [-34, -35], [-52, 8], [8, 43], [94, 54]], [[9740, 20871], [-73, -34], [-24, 50], [-44, -3], [9, 65], [52, 27], [57, -88], [23, -17]], [[2122, 16930], [-47, -97], [-95, 3], [13, 38], [92, 105], [37, -49]], [[262, 12962], [-46, -13], [-38, 74], [-72, 67], [-21, 52], [-47, 57], [11, 25], [-49, 119], [6, 46], [35, 34], [57, -102], [31, -111], [66, -88], [-25, -25], [65, -60], [27, -75]], [[29520, 2376], [-109, -43], [-34, 49], [-69, -29], [-150, 13], [-37, 54], [118, 29], [103, -3], [53, 30], [125, -100]], [[26426, 1913], [-96, 12], [-23, 81], [60, 21], [24, 53], [-28, 88], [39, 55], [38, -47], [205, -62], [121, -27], [79, 15], [70, -33], [85, -15], [54, 13], [41, -47], [136, -38], [63, -43], [131, -27], [188, -67], [123, -2], [52, -12], [125, 32], [41, -11], [98, 51], [75, 4], [59, 38], [60, -5], [41, 30], [135, -21], [75, 44], [80, 10], [43, -47], [106, 39], [54, 58], [66, 38], [30, -29], [96, -20], [51, 14], [63, 90], [100, -17], [65, -53], [54, -4], [89, -113], [-50, -93], [10, -112], [23, -30], [-35, -106], [44, -118], [-23, -28], [-17, -140], [43, -51], [-33, -90], [51, -59], [-26, -116], [-44, 16], [30, 84], [-46, 37], [-62, 4], [-81, -20], [12, -41], [-59, -53], [-11, -52], [22, -29], [-38, -42], [25, -26], [-51, -83], [-51, 6], [62, -99], [-13, -36], [-56, -31], [-20, -58], [-69, -37], [-86, 5], [-63, 67], [-53, -34], [-28, -47], [49, -55], [-28, -26], [-62, 41], [-24, 42], [-77, -72], [17, -34], [-88, -76], [19, -51], [-35, -42], [-101, 0], [-44, -23], [1, -50], [-41, -61], [-45, -12], [-18, -90], [-39, -17], [-73, 17], [-67, -25], [-108, 81], [-141, -12], [-110, 31], [-108, -4], [-27, -39], [-53, 3], [-37, 85], [1, 68], [-41, 48], [-69, -31], [-45, 32], [-17, 64], [-104, 82], [10, 23], [-76, 58], [-72, -3], [-64, 119], [-37, 34], [-13, 83], [-71, 31], [-38, 106], [-18, 128], [80, -17], [119, -62], [68, -1], [-145, 127], [-11, 48], [-73, 1], [-6, 80], [-51, 84], [-99, 67], [-60, 74], [-60, 25], [-32, 102], [-86, 101], [-21, 78], [-63, 78], [-16, 85], [26, 53], [49, -10]], [[29398, 2543], [-118, -7], [-6, -23], [-80, -14], [-54, 42], [-14, 79], [-61, 52], [-45, 94], [-62, -7], [-47, 32], [113, 83], [63, 23], [135, -124], [53, -36], [61, -15], [8, -92], [54, -87]], [[29326, 2337], [-58, -79], [-54, 22], [15, 46], [97, 11]], [[29260, 741], [-88, -12], [-32, 26], [36, 43], [44, -10], [40, -47]], [[29130, 317], [-132, 32], [-46, -28], [-71, 17], [-7, 53], [-63, 36], [-7, 49], [101, -5], [7, -22], [92, -10], [-38, 88], [22, 36], [119, -1], [13, -54], [-58, -34], [68, -157]], [[28458, 158], [37, 98], [92, 36], [18, 59], [-69, 14], [46, 69], [41, -47], [27, -77], [-93, -53], [50, -50], [-37, -38], [-11, -59], [-64, 7], [-37, 41]], [[26571, 2238], [81, -47], [-111, -41], [-18, 46], [48, 42]], [[26605, 2382], [-61, -42], [-52, 30], [44, 40], [69, -28]], [[26458, 2389], [-14, -121], [-42, 5], [4, 63], [52, 53]], [[25914, 2746], [-8, -44], [-84, -75], [-126, -16], [14, 91], [-44, 42], [23, 76], [-19, 87], [39, 13], [45, 87], [137, -66], [-8, -61], [9, -119], [22, -15]], [[20818, 13042], [-7470, -2], [1, 8214]], [[13349, 21254], [53, -9], [102, -71], [-16, -47], [38, -76], [34, 89], [-12, 91], [13, 34], [50, 4], [41, -32], [96, -28], [119, -146], [22, 29], [-50, 154], [47, 41], [128, -17], [-57, 47], [-51, 23], [-7, 27], [-55, 39], [-12, 42], [71, 27], [-119, 21], [-43, 45], [-97, 50], [8, 63], [36, 37], [-1, 38], [46, 32], [36, 66], [72, 9], [39, 33], [66, 25], [22, 69], [-21, 53], [50, 43], [7, 91], [37, 78], [-3, 37], [57, 9], [47, -27], [43, 1], [81, 57], [29, 0], [47, 61], [72, 51], [-37, 17], [-63, 77], [-40, 10], [21, 171], [29, 17], [59, -28], [75, 43], [17, 61], [-5, 101], [72, 27], [68, -52], [90, -18], [-27, 43], [-42, 27], [17, 39], [12, 87], [36, 55], [117, -36], [-7, -33], [26, -49], [44, -5], [47, 50], [-52, 45], [51, 71], [72, -8], [25, 13], [14, 68], [-29, 47], [42, 19], [108, -37], [38, -26], [24, 68], [40, 48], [20, -91], [48, -46], [76, -20], [175, -1], [76, 12], [87, 40], [50, -44], [108, -22], [84, 67], [75, 29], [14, -38], [62, 19], [30, -28], [44, 67], [94, 35], [61, 10], [-8, 51], [30, 94], [-16, 50], [-46, 26], [12, 42], [-79, 35], [48, 34], [-27, 67], [-57, 65], [-86, 12], [-42, -18], [-53, 8], [-83, -49], [-59, -3], [-89, 107], [13, 21], [-96, 44], [-17, 48], [38, 15], [63, -34], [21, 61], [66, -16], [27, -82], [47, -15], [-3, -51], [47, -16], [23, 55], [-32, 28], [-1, 101], [57, -8], [76, 20], [47, -66], [31, 15], [47, -40], [-4, -43], [37, -9], [62, -50], [39, -78], [53, -3], [75, 85], [61, -16], [18, 70], [42, -63], [33, -12], [81, -148], [37, -51], [85, -21], [35, 21], [21, -50], [54, 13], [21, -20], [75, -1], [24, -24], [111, -4], [62, 27], [46, 43], [36, 1], [66, -37], [-12, -24], [-66, -24], [60, -56], [32, -5], [81, 48], [34, -58], [52, 10], [14, -50], [35, -30], [50, -4], [27, 37], [51, -41], [119, -28], [95, 21], [68, 64], [69, 2], [23, -65], [36, -48], [52, -30], [56, -4], [70, -78], [56, 20], [34, -21], [85, 30], [32, 74], [76, 32], [48, -24], [44, 21], [52, -11], [130, 67], [67, 21], [-41, -73], [-82, -52], [-6, -38], [48, -45], [129, 77], [97, 5], [-45, -52], [79, -72], [-40, -56], [48, -58], [98, 28], [67, -22], [68, 62], [41, 92], [-8, 34], [-104, -1], [-43, 40], [58, 35], [17, 34], [102, 40], [21, 39], [96, -25], [57, -155], [40, -50], [48, -14], [50, 39], [-32, 47], [46, 10], [30, -39], [72, -26], [33, -91], [-38, -17], [-78, -84], [-9, 42], [-54, -21], [15, -54], [-47, -60], [-13, -53], [-36, 3], [-41, -50], [-47, 7], [-39, -62], [56, -55], [76, -25], [-57, -35], [-2, -45], [-94, -122], [-45, -14], [-47, -61], [-20, 20], [58, 53], [-19, 22], [5, 93], [-74, -72], [-43, 10], [-24, -68], [-56, 29], [-70, -31], [-31, 26], [-78, -40], [-32, -70], [38, -40], [-55, -17], [-17, -93], [33, -108], [30, -26], [52, 12], [48, -11], [-16, -60], [-50, -90], [-38, -30], [2, -39], [-26, -102], [-75, -37], [-51, -48], [-61, -90], [-30, -4], [-69, -102], [-8, -59], [-120, -62], [9, -62], [31, -75], [40, -48], [84, -51], [49, 0], [186, -102], [51, -49], [199, -106], [62, -17], [42, -116], [43, -30], [59, -10], [107, -83], [66, 24], [19, 25], [67, -17], [-35, -61], [39, -114], [78, 25], [67, -28], [29, 42], [54, 5], [37, -36], [171, -67], [45, -54], [157, -61], [63, -5], [129, -42], [110, -141], [116, -90]], [[20077, 20594], [-7, -29], [-48, -17], [-88, 102], [55, 55], [63, -29], [2, -73], [23, -9]], [[19959, 21782], [-23, -35], [-1, -58], [-149, 24], [-88, -28], [-18, 23], [-114, 21], [-66, 49], [26, 34], [-29, 109], [24, 63], [-12, 56], [61, -19], [58, 8], [54, 47], [-35, 31], [118, 28], [-33, -43], [32, -55], [65, -27], [25, 10], [2, 72], [54, -14], [6, -32], [-45, -78], [-66, -16], [0, -66], [-66, -67], [22, -55], [62, 31], [44, -44], [92, 31]], [[19853, 20658], [-50, -44], [-37, -9], [3, 82], [49, 2], [35, -31]], [[19795, 24099], [-50, -135], [-69, -68], [-29, -59], [-58, -35], [-17, 28], [54, 33], [17, 49], [61, 71], [41, 13], [50, 103]], [[19671, 20755], [-23, -67], [-63, 17], [10, 68], [70, 5], [6, -23]], [[19472, 23689], [-96, -58], [-26, 12], [29, 54], [93, -8]], [[19409, 22100], [-75, -66], [-88, 6], [33, 50], [30, 9], [15, 52], [46, -6], [39, -45]], [[19205, 23637], [-52, -48], [-28, 36], [80, 12]], [[18939, 23428], [-1, -48], [-81, -12], [-61, 7], [26, 42], [117, 11]], [[16325, 24129], [13, -96], [-19, -31], [33, -54], [0, -39], [-53, -19], [-10, 43], [-43, 72], [6, 73], [51, 20], [22, 31]], [[14512, 23851], [2, 46], [-35, 37], [8, 60], [33, -3], [64, -65], [87, -20], [-31, -69], [69, 8], [69, -73], [9, 62], [95, 24], [41, 34], [75, -23], [83, 29], [20, 30], [44, -4], [102, 53], [54, -42], [69, -12], [-5, -28], [42, -70], [36, 4], [16, -43], [-65, -34], [4, -81], [-75, 11], [-38, -64], [-126, -83], [-83, -33], [-110, -77], [-72, 63], [-51, 8], [-63, 31], [-85, 58], [-108, 51], [1, 67], [-52, 46], [-24, 102]], [[14354, 23594], [9, 31], [-55, 132], [19, 46], [42, 16], [18, 45], [71, 20], [55, -95], [-24, -27], [23, -41], [51, -26], [3, -67], [73, -20], [71, -47], [-24, -48], [-90, -7], [-159, 44], [-151, -40], [-89, 21], [82, 66], [75, -3]]],
  "transform": {
    "scale": [0.0012046296460523228, 0.0013537179093912222],
    "translate": [112.921124, -43.651435]
  },
  "objects": {
    "states": {
      "type": "GeometryCollection",
      "geometries": [{
        "arcs": [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45], [46]],
        "type": "Polygon",
        "properties": {
          "STATE_CODE": "1",
          "STATE_NAME": "New South Wales"
        },
        "id": 0
      }, {
        "arcs": [[[47, 48, 49, -38, 50, -36, 51, -34, 52, -32, 53, -30, 54, -28, 55, -26, 56, 57, -23, 58, -21, 59, 60, 61, -17, 62, -15, 63, -13, 64, -11, 65, -9, 66, -7, 67, -5, 68, 69, 70, -1, 71]], [[72]], [[73]]],
        "type": "MultiPolygon",
        "properties": {
          "STATE_CODE": "2",
          "STATE_NAME": "Victoria"
        },
        "id": 1
      }, {
        "arcs": [[[-45, 74, -43, 75, -41, 76, 77, 78, 79]], [[80]], [[81]], [[82]], [[83]], [[84]], [[85]], [[86]], [[87]], [[88]], [[89]], [[90]], [[91]], [[92]], [[93]], [[94]], [[95]], [[96]], [[97]]],
        "type": "MultiPolygon",
        "properties": {
          "STATE_CODE": "3",
          "STATE_NAME": "Queensland"
        },
        "id": 2
      }, {
        "arcs": [[[98, 99, -48, 100]], [[101]]],
        "type": "MultiPolygon",
        "properties": {
          "STATE_CODE": "4",
          "STATE_NAME": "South Australia"
        },
        "id": 3
      }, {
        "arcs": [[[102, 103]], [[104]], [[105]], [[106]], [[107]], [[108]], [[109]]],
        "type": "MultiPolygon",
        "properties": {
          "STATE_CODE": "5",
          "STATE_NAME": "Western Australia"
        },
        "id": 4
      }, {
        "arcs": [[[110]], [[111]], [[112]], [[113]], [[114]], [[115]], [[116]], [[117]], [[118]], [[119]], [[120]]],
        "type": "MultiPolygon",
        "properties": {
          "STATE_CODE": "6",
          "STATE_NAME": "Tasmania"
        },
        "id": 5
      }, {
        "arcs": [[[-79, 121, 122]], [[123]], [[124]], [[125]], [[126]], [[127]], [[128]], [[129]], [[130]], [[131]], [[132]], [[133]], [[134]]],
        "type": "MultiPolygon",
        "properties": {
          "STATE_CODE": "7",
          "STATE_NAME": "Northern Territory"
        },
        "id": 6
      }, {
        "arcs": [[-47]],
        "type": "Polygon",
        "properties": {
          "STATE_CODE": "8",
          "STATE_NAME": "Australian Capital Territory"
        },
        "id": 7
      }]
    }
  }
};
},{}],"aus-larger.geo.json":[function(require,module,exports) {
module.exports = {
  "type": "FeatureCollection",
  "features": [{
    "type": "Feature",
    "properties": {
      "scalerank": 1,
      "featurecla": "Admin-0 country",
      "labelrank": 2,
      "sovereignt": "Australia",
      "sov_a3": "AU1",
      "adm0_dif": 1,
      "level": 2,
      "type": "Country",
      "admin": "Australia",
      "adm0_a3": "AUS",
      "geou_dif": 0,
      "geounit": "Australia",
      "gu_a3": "AUS",
      "su_dif": 0,
      "subunit": "Australia",
      "su_a3": "AUS",
      "brk_diff": 0,
      "name": "Australia",
      "name_long": "Australia",
      "brk_a3": "AUS",
      "brk_name": "Australia",
      "brk_group": null,
      "abbrev": "Auz.",
      "postal": "AU",
      "formal_en": "Commonwealth of Australia",
      "formal_fr": null,
      "note_adm0": null,
      "note_brk": null,
      "name_sort": "Australia",
      "name_alt": null,
      "mapcolor7": 1,
      "mapcolor8": 2,
      "mapcolor9": 2,
      "mapcolor13": 7,
      "pop_est": 21262641,
      "gdp_md_est": 800200,
      "pop_year": -99,
      "lastcensus": 2006,
      "gdp_year": -99,
      "economy": "2. Developed region: nonG7",
      "income_grp": "1. High income: OECD",
      "wikipedia": -99,
      "fips_10": null,
      "iso_a2": "AU",
      "iso_a3": "AUS",
      "iso_n3": "036",
      "un_a3": "036",
      "wb_a2": "AU",
      "wb_a3": "AUS",
      "woe_id": -99,
      "adm0_a3_is": "AUS",
      "adm0_a3_us": "AUS",
      "adm0_a3_un": -99,
      "adm0_a3_wb": -99,
      "continent": "Oceania",
      "region_un": "Oceania",
      "subregion": "Australia and New Zealand",
      "region_wb": "East Asia & Pacific",
      "name_len": 9,
      "long_len": 9,
      "abbrev_len": 4,
      "tiny": -99,
      "homepart": 1,
      "filename": "AUS.geojson"
    },
    "geometry": {
      "type": "MultiPolygon",
      "coordinates": [[[[158.87880859375005, -54.70976562499999], [158.84521484375003, -54.74921875000004], [158.83593750000003, -54.70400390624997], [158.89697265625003, -54.506054687499976], [158.95888671875, -54.47236328125004], [158.94560546875007, -54.575], [158.87880859375005, -54.70976562499999]]], [[[147.35605468750006, -43.39697265625001], [147.30888671875007, -43.50078125000002], [147.23144531250003, -43.48310546874997], [147.15380859375003, -43.5001953125], [147.10498046875003, -43.43115234374996], [147.1046875, -43.412890624999974], [147.16308593750003, -43.43027343749996], [147.18466796875006, -43.4078125], [147.19843750000004, -43.37919921875003], [147.21972656250003, -43.371386718750045], [147.23398437500006, -43.33046874999996], [147.28388671875004, -43.278906250000034], [147.3125, -43.28027343749996], [147.3424804687501, -43.34628906249999], [147.35605468750006, -43.39697265625001]]], [[[147.4345703125, -43.24072265624997], [147.371875, -43.24082031249999], [147.34882812500004, -43.23242187499997], [147.33759765625004, -43.18330078125], [147.29609375000004, -43.16171874999996], [147.31914062500002, -43.14531249999999], [147.3273437500001, -43.114648437499966], [147.35253906249997, -43.08027343749997], [147.39726562500007, -43.11826171874999], [147.4345703125, -43.24072265624997]]], [[[148.10429687500002, -42.710449218750036], [148.04814453125002, -42.71923828124996], [148.0296875, -42.71484374999996], [148.03085937500003, -42.663378906250045], [148.02275390625002, -42.64042968749999], [148.07255859375002, -42.59316406249995], [148.14277343750004, -42.61591796874997], [148.16953125000006, -42.65175781249998], [148.10058593749997, -42.68056640624999], [148.10429687500002, -42.710449218750036]]], [[[145.04296875000003, -40.78671875], [145.15869140624997, -40.790625], [145.22431640625004, -40.76513671875002], [145.28300781250002, -40.76992187500002], [145.34941406250002, -40.82636718749998], [145.42939453125004, -40.85820312499999], [145.48515625000007, -40.85234375000003], [145.53349609375002, -40.86396484374999], [145.57646484375002, -40.9041015625], [145.68603515625003, -40.93906250000002], [145.7337890625, -40.96201171874999], [145.77539062500003, -40.99716796874996], [145.8214843750001, -41.02460937500004], [146.11113281250002, -41.118066406249994], [146.31748046875006, -41.1634765625], [146.5744140625001, -41.142382812499974], [146.6505859375001, -41.11621093749997], [146.72343750000002, -41.07802734375001], [146.78603515625005, -41.11367187499997], [146.84814453124997, -41.16806640624996], [146.8360351562501, -41.109375], [146.856640625, -41.05830078124998], [146.91943359374997, -41.01777343749998], [146.98984375000006, -40.99238281249996], [147.10576171875007, -40.99423828124999], [147.21884765625012, -40.98339843749999], [147.2689453125, -40.959765624999974], [147.32050781250004, -40.95644531250001], [147.38769531249994, -40.985546875], [147.45478515625004, -41.00166015624998], [147.50078125000002, -40.96416015624999], [147.5792968750001, -40.87558593749998], [147.62167968750012, -40.844726562499986], [147.81767578125007, -40.87167968749998], [147.87294921875002, -40.87255859374997], [147.96875, -40.779589843750045], [148.03281250000012, -40.78095703124996], [148.215234375, -40.85488281250002], [148.29287109375, -40.947070312499974], [148.28544921875007, -41.115332031249956], [148.29160156250003, -41.17460937500004], [148.30625, -41.233105468749976], [148.31220703125004, -41.34970703125002], [148.28984375000007, -41.46503906249998], [148.28691406250002, -41.55498046875], [148.29658203125004, -41.646191406250026], [148.28759765624997, -41.81572265625001], [148.31572265625002, -41.927734375], [148.30166015625, -42.004199218750045], [148.30146484375004, -42.03994140624995], [148.32802734375005, -42.07373046875], [148.34082031249997, -42.111132812499974], [148.33105468749997, -42.1591796875], [148.34257812500007, -42.21533203124997], [148.33125, -42.261621093749994], [148.29033203125002, -42.25498046874998], [148.27695312500012, -42.21943359375001], [148.2845703125, -42.17343749999996], [148.27714843750007, -42.13642578124998], [148.25576171875, -42.10263671875002], [148.18310546875003, -42.06474609375003], [148.20439453125007, -42.041992187500014], [148.2416015625, -42.021875], [148.21367187500002, -41.97001953125], [148.16718750000004, -42.012304687500006], [148.14121093750006, -42.06982421875], [148.15625, -42.08828125000002], [148.12753906250006, -42.10371093749997], [148.0666015625001, -42.17031249999995], [148.02275390625002, -42.25947265625], [148.00488281250003, -42.34511718749995], [148.009375, -42.4359375], [147.97353515625005, -42.505859375000014], [147.92441406250006, -42.5724609375], [147.91210937499997, -42.65849609375001], [147.9150390625, -42.81640624999996], [147.95771484375007, -42.960449218749986], [147.980859375, -43.157031249999974], [147.94541015625006, -43.18183593749997], [147.8385742187501, -43.19511718750001], [147.78583984375007, -43.22001953125002], [147.69892578125004, -43.12255859374997], [147.64794921874997, -43.02060546874999], [147.68730468750007, -42.97988281249995], [147.77392578124997, -43.00341796875004], [147.80039062500012, -42.980273437500024], [147.80742187500002, -42.95410156250003], [147.8, -42.928125], [147.69345703125006, -42.871972656249994], [147.57382812500006, -42.845703124999964], [147.53583984375004, -42.87802734374998], [147.54902343750004, -42.97451171875], [147.53671875000012, -42.99648437499995], [147.4523437500001, -43.03339843750001], [147.40800781250002, -42.89384765625], [147.29794921875003, -42.790917968749994], [147.3019531250001, -42.84052734374998], [147.34765624999997, -42.92656250000002], [147.34267578125005, -42.964453125], [147.325, -43.01347656250004], [147.28076171875003, -43.03173828125003], [147.259765625, -43.071093749999974], [147.259765625, -43.12646484374997], [147.24501953125005, -43.21591796874999], [147.17285156249997, -43.25585937499996], [146.99697265625005, -43.15634765625002], [146.98486328124997, -43.18984375], [146.9875, -43.21875], [147.07734375000004, -43.27587890625002], [147.03593750000005, -43.31904296875004], [147.00468750000002, -43.36962890625004], [146.95468750000012, -43.50244140625], [146.87392578125, -43.6125], [146.83427734375002, -43.61933593750001], [146.69921875000003, -43.60195312500002], [146.54853515625004, -43.508886718749984], [146.4131835937501, -43.51953125000003], [146.1867187500001, -43.51279296874998], [146.04316406250004, -43.547167968749974], [146.01308593750005, -43.444824218749986], [145.98173828125005, -43.408398437500026], [145.99443359375005, -43.37607421875002], [146.1087890625, -43.35439453124995], [146.22636718750007, -43.35527343750004], [146.20800781249994, -43.31621093749999], [146.17646484375004, -43.30175781249997], [146.12509765625006, -43.31123046875004], [145.9752929687501, -43.27714843750003], [145.87324218750007, -43.292382812500016], [145.80273437500003, -43.24404296875004], [145.68154296875, -43.07597656249999], [145.60996093750006, -42.998242187500054], [145.56738281250003, -42.96796875000001], [145.51757812499997, -42.9513671875], [145.48759765625002, -42.92666015625004], [145.26816406250006, -42.544335937499945], [145.23710937500007, -42.455566406249986], [145.19882812500006, -42.23085937500004], [145.37294921875, -42.33847656250002], [145.43486328125002, -42.40654296875003], [145.46826171874997, -42.492871093750026], [145.52724609375, -42.388183593750014], [145.51660156249997, -42.3544921875], [145.36035156250003, -42.22753906249997], [145.33964843750007, -42.19072265625003], [145.33105468750003, -42.14707031250002], [145.29443359375003, -42.19101562499999], [145.23486328124997, -42.19697265624997], [145.2589843750001, -42.10732421874999], [145.23818359375, -42.01962890624999], [145.0553710937501, -41.82675781250003], [144.91552734375003, -41.64404296875003], [144.77792968750012, -41.41884765624998], [144.76611328125003, -41.39003906249998], [144.76435546875004, -41.34150390625004], [144.69775390624997, -41.190722656250045], [144.66240234375002, -41.07890625], [144.64609375000006, -40.980859375], [144.7096679687501, -40.78291015625001], [144.7185546875, -40.67226562500002], [144.81855468750004, -40.72167968749997], [145.04296875000003, -40.78671875]]], [[[148.23691406250006, -40.515136718749986], [148.18779296875007, -40.59257812500004], [148.12695312500003, -40.5439453125], [148.11728515625012, -40.52148437499996], [148.19316406250002, -40.503125], [148.21835937500003, -40.50507812499998], [148.23691406250006, -40.515136718749986]]], [[[144.784375, -40.506738281249966], [144.74804687499997, -40.589453125000034], [144.7101562500001, -40.48525390625004], [144.7511718750001, -40.470214843749986], [144.7833984375001, -40.434863281249974], [144.79082031250002, -40.44033203125002], [144.784375, -40.506738281249966]]], [[[148.32626953125006, -40.30693359375003], [148.42070312500002, -40.36718749999996], [148.47421875000006, -40.43242187500001], [148.40400390625004, -40.486523437500026], [148.3527343750001, -40.497265625], [148.31943359375006, -40.434570312500014], [148.2140625000001, -40.45751953124997], [148.1025390625, -40.45166015625003], [148.02011718750012, -40.40419921874995], [148.0104492187501, -40.380566406250026], [148.0587890625001, -40.35683593749997], [148.19814453125005, -40.35791015625003], [148.32626953125006, -40.30693359375003]]], [[[148.000390625, -39.75761718750003], [148.17792968750004, -39.938476562500014], [148.27001953124997, -39.966699218749994], [148.29736328125003, -39.98574218749996], [148.28984375000007, -40.06542968750003], [148.25078125000002, -40.099511718749966], [148.32324218749997, -40.144433593749966], [148.31357421875012, -40.17353515625002], [148.29941406250006, -40.17246093749999], [148.21035156250005, -40.23369140625003], [148.10566406250004, -40.26210937499995], [148.0736328125, -40.24082031249998], [148.046875, -40.21279296874995], [148.02480468749997, -40.17197265624998], [147.89052734375, -40.014550781249966], [147.90595703125004, -39.97138671874997], [147.87626953125002, -39.90546875000003], [147.81230468750007, -39.91044921874998], [147.76718750000012, -39.87031249999998], [147.83916015625002, -39.83154296874998], [147.93300781250005, -39.72597656249998], [148.000390625, -39.75761718750003]]], [[[143.92792968750004, -40.11611328124996], [143.89873046875005, -40.12021484375], [143.87578125, -40.06396484375], [143.88759765625, -39.98359374999997], [143.83857421875004, -39.90410156250003], [143.86523437499997, -39.824218750000014], [143.86181640625, -39.737988281250026], [143.87939453125003, -39.7], [143.93935546875, -39.65810546875001], [143.94882812500006, -39.58369140625004], [144.00078125000007, -39.580175781250034], [144.09130859374997, -39.63808593750001], [144.12089843750002, -39.78525390624998], [144.1060546875001, -39.87402343750003], [144.14101562500002, -39.953808593750026], [144.11191406250006, -40.02207031249999], [144.03505859375005, -40.07822265624998], [143.92792968750004, -40.11611328124996]]], [[[145.31445312500003, -38.49082031249996], [145.34921875000006, -38.53818359375002], [145.35507812500012, -38.55703124999995], [145.27089843749997, -38.5197265625], [145.12841796875003, -38.527636718749996], [145.21777343750003, -38.45859374999998], [145.28789062500002, -38.472167968749986], [145.31445312500003, -38.49082031249996]]], [[[145.48652343750004, -38.35488281249998], [145.33583984374997, -38.420996093750034], [145.28027343749997, -38.390625], [145.28583984375004, -38.341015625], [145.2953125, -38.318945312500034], [145.42656250000002, -38.31416015625004], [145.48652343750004, -38.35488281249998]]], [[[137.59648437500007, -35.73867187499998], [137.83593750000003, -35.762109374999966], [137.92890625000004, -35.72607421875], [138.04658203125004, -35.755175781249974], [138.12343750000005, -35.85234375], [138.06650390625006, -35.900585937500026], [138.01191406250007, -35.90761718750004], [137.83554687500012, -35.867773437499984], [137.67089843749997, -35.897949218750014], [137.6222656250001, -35.93808593750002], [137.59023437500002, -36.02714843749996], [137.44843750000004, -36.07480468749999], [137.38222656250005, -36.02089843750002], [137.20957031250012, -35.982421875], [137.14775390625007, -36.039062499999986], [137.02587890625003, -36.023925781250014], [136.91269531250006, -36.04667968750003], [136.7550781250001, -36.03310546875002], [136.58925781250005, -35.9353515625], [136.540625, -35.89013671875003], [136.57910156250003, -35.808691406250034], [136.63867187499997, -35.74882812500001], [137.09179687500003, -35.66386718750002], [137.33408203125006, -35.59248046875004], [137.53046875000004, -35.605078125000034], [137.58496093749997, -35.620214843750006], [137.63544921875004, -35.656445312500026], [137.59814453124997, -35.72226562500002], [137.59648437500007, -35.73867187499998]]], [[[153.53876953125004, -27.436425781250037], [153.45273437500012, -27.71171874999999], [153.42656250000002, -27.70644531249998], [153.39580078125007, -27.665039062499982], [153.40087890625003, -27.50566406250003], [153.43544921875, -27.405371093750016], [153.521875, -27.422460937500034], [153.53876953125004, -27.436425781250037]]], [[[153.44248046875006, -27.31601562500002], [153.42089843750003, -27.330957031249966], [153.37656250000003, -27.23535156250003], [153.3650390625, -27.138867187499997], [153.37988281250003, -27.049414062499977], [153.43232421875004, -27.02988281249999], [153.46679687499997, -27.038085937499986], [153.42636718750006, -27.20146484374996], [153.44248046875006, -27.31601562500002]]], [[[113.18300781250005, -26.053125], [113.15644531250004, -26.094531249999957], [112.96425781250005, -25.78310546875001], [112.90820312499996, -25.56982421875], [112.94707031250002, -25.531542968750017], [112.98242187500003, -25.52021484375001], [113.09628906250012, -25.815039062500034], [113.13154296875004, -25.88261718750003], [113.13183593749997, -25.951953125000042], [113.14833984375, -25.97382812499997], [113.18300781250005, -26.053125]]], [[[153.07744140625, -25.75078125], [153.0519531250001, -25.778320312500014], [153.00693359375006, -25.728906249999977], [152.9766601562501, -25.551367187499963], [152.99902343749997, -25.448437500000036], [153.05156250000002, -25.35429687499996], [153.0607421875, -25.30224609375001], [153.0380859375, -25.193164062500003], [153.18925781250002, -25.070507812499965], [153.22753906249997, -25.00576171875001], [153.24199218750002, -24.922558593750026], [153.18632812500002, -24.832617187499988], [153.14375, -24.81484375000002], [153.18095703125002, -24.76484375000004], [153.22314453124997, -24.73955078124996], [153.25693359375012, -24.72890625], [153.28212890625, -24.738281249999957], [153.2979492187501, -24.91523437500004], [153.35927734374997, -24.97773437499998], [153.35019531250012, -25.063085937499963], [153.14140625000002, -25.512792968750006], [153.08378906250002, -25.682519531250037], [153.07744140625, -25.75078125]]], [[[151.14658203125006, -23.49082031250002], [151.18076171875003, -23.516210937500034], [151.21201171875006, -23.513085937500023], [151.24013671875, -23.529687500000037], [151.22880859375002, -23.594921875], [151.27431640625005, -23.66845703124997], [151.29580078125, -23.72031249999996], [151.26152343750002, -23.76230468749999], [151.23828124999997, -23.77578125], [151.18417968750006, -23.740722656250043], [151.03330078125006, -23.530175781250037], [151.0599609375, -23.460546874999974], [151.14658203125006, -23.49082031250002]]], [[[150.51669921875006, -22.322558593749957], [150.4884765625001, -22.324707031250043], [150.46240234375003, -22.307714843750034], [150.48466796875002, -22.267871093750003], [150.4884765625001, -22.210742187500003], [150.52148437499997, -22.22832031250003], [150.54882812499994, -22.306933593749974], [150.51669921875006, -22.322558593749957]]], [[[149.92832031250012, -22.19306640625004], [149.89365234375006, -22.223242187499977], [149.86953125000005, -22.150390624999957], [149.875390625, -22.07402343750003], [149.91230468750004, -22.048730468750033], [149.92792968750004, -22.149316406250005], [149.92832031250012, -22.19306640625004]]], [[[115.44619140625005, -20.78779296875001], [115.3880859375, -20.866015624999957], [115.31806640625004, -20.850585937500014], [115.30859374999997, -20.811132812499963], [115.35429687500007, -20.746289062499997], [115.43457031249997, -20.66796875000003], [115.45761718750006, -20.716308593750014], [115.44619140625005, -20.78779296875001]]], [[[149.04375, -20.29150390624997], [149.01992187500005, -20.302539062500003], [148.98740234375006, -20.30175781250003], [148.93886718750005, -20.283691406249986], [148.9810546875001, -20.153515625000026], [149.00439453124997, -20.221484375000017], [149.0453125, -20.27753906249997], [149.04375, -20.29150390624997]]], [[[148.93554687499997, -20.14990234375], [148.91347656250005, -20.154296875], [148.88691406250004, -20.14355468750003], [148.90644531250004, -20.10195312499999], [148.93164062500003, -20.06894531250002], [148.96787109375012, -20.04433593749998], [148.95625, -20.134667968749994], [148.93554687499997, -20.14990234375]]], [[[146.27832031249997, -18.23125], [146.29882812499997, -18.32607421875005], [146.3419921875001, -18.400097656250026], [146.32705078125, -18.448632812499966], [146.29882812499997, -18.48476562500005], [146.23564453125002, -18.450781249999963], [146.19130859375005, -18.36289062499999], [146.11621093750003, -18.292382812500023], [146.09882812500004, -18.251757812500003], [146.1867187500001, -18.255175781249985], [146.230859375, -18.241406250000026], [146.24912109375006, -18.225878906249974], [146.27832031249997, -18.23125]]], [[[139.45917968750004, -17.11455078124996], [139.42167968750002, -17.131640624999974], [139.40820312499997, -17.090625], [139.45917968750004, -17.049121093749957], [139.49277343750006, -16.990429687499983], [139.56005859374994, -17.041992187500014], [139.57089843750006, -17.09443359375004], [139.45917968750004, -17.11455078124996]]], [[[139.50781250000003, -16.57304687499996], [139.43056640624997, -16.66103515625002], [139.39150390625, -16.648632812499983], [139.35429687500007, -16.69658203124999], [139.28300781250002, -16.719433593750026], [139.23906250000007, -16.718652343750037], [139.1595703125, -16.74169921875003], [139.1476562500001, -16.713867187499954], [139.16269531250012, -16.625878906249966], [139.2287109375001, -16.52753906250001], [139.29296875000003, -16.467285156249986], [139.45888671875, -16.438476562499986], [139.58789062499997, -16.39521484374997], [139.60449218749997, -16.403222656249994], [139.69775390624997, -16.514941406250017], [139.55966796875006, -16.52949218749997], [139.50781250000003, -16.57304687499996]]], [[[137.09365234375005, -15.778125], [137.0508789062501, -15.824414062500027], [136.99648437500005, -15.77578125], [136.98505859375004, -15.72597656250005], [136.94267578125002, -15.711718749999989], [136.96337890624997, -15.665722656250024], [136.9857421875, -15.652441406249991], [137.00957031250007, -15.594824218749975], [137.06455078125006, -15.662890624999987], [137.07109375000007, -15.738085937500031], [137.09365234375005, -15.778125]]], [[[136.591015625, -15.62822265625003], [136.53115234375005, -15.63242187499999], [136.51425781250006, -15.627343750000023], [136.50273437500002, -15.583105468749977], [136.52255859375006, -15.543164062500013], [136.58603515625012, -15.53369140624996], [136.61230468749997, -15.54414062500004], [136.591015625, -15.62822265625003]]], [[[136.86269531249997, -15.619921875000017], [136.84677734375012, -15.627343750000023], [136.84560546875005, -15.54404296875002], [136.87685546874997, -15.502539062500006], [136.89023437500006, -15.5888671875], [136.86269531249997, -15.619921875000017]]], [[[124.59726562500006, -15.401953125000018], [124.55957031250001, -15.430175781250002], [124.52421875, -15.421484375], [124.52373046875002, -15.382421875000047], [124.48281250000005, -15.340332031250002], [124.5041015625001, -15.292480468750014], [124.51933593750002, -15.267480468749978], [124.55087890625012, -15.270312500000031], [124.56455078125006, -15.310839843750031], [124.60507812500006, -15.356542968750006], [124.59726562500006, -15.401953125000018]]], [[[125.19882812500006, -14.57949218749998], [125.13476562499997, -14.641699218750032], [125.0912109375, -14.591699218749978], [125.1173828125001, -14.491992187500003], [125.1599609375, -14.456054687499972], [125.19814453125, -14.47480468749997], [125.19355468750003, -14.552636718750009], [125.19882812500006, -14.57949218749998]]], [[[136.71464843750002, -13.803906249999983], [136.75800781250004, -13.845410156249995], [136.80449218750002, -13.842480468750024], [136.84531250000006, -13.750976562500027], [136.87070312500012, -13.763671874999957], [136.89082031250004, -13.786621093750014], [136.90556640625002, -13.826953124999958], [136.84296875000004, -13.896582031250034], [136.81494140625003, -13.907324218749991], [136.78818359375006, -13.945800781250014], [136.74531250000004, -14.072656250000023], [136.74990234375, -14.115234374999984], [136.78701171875, -14.157812499999961], [136.8854492187501, -14.197265625], [136.93388671875002, -14.179003906250015], [136.95078125000006, -14.184277343750026], [136.93134765625004, -14.245996093749978], [136.89433593750002, -14.293066406249977], [136.76318359374997, -14.2734375], [136.64970703125002, -14.280468749999981], [136.46054687500012, -14.234570312499967], [136.36328125000003, -14.228906249999966], [136.33544921875003, -14.211816406250037], [136.39218750000006, -14.175488281250011], [136.42773437500003, -14.126464843749972], [136.41113281249997, -14.011132812500009], [136.42470703125, -13.864843749999961], [136.53378906250012, -13.79375], [136.58281250000005, -13.72109375], [136.6556640625, -13.675878906250006], [136.70195312500002, -13.681640625000028], [136.69599609375004, -13.726171875000032], [136.71464843750002, -13.803906249999983]]], [[[136.23740234375003, -13.824511718750003], [136.21367187500002, -13.835937500000014], [136.12265625000012, -13.816601562499981], [136.12226562500004, -13.780566406250017], [136.13437500000012, -13.753125], [136.1595703125, -13.736718749999966], [136.21542968750012, -13.664746093750054], [136.2574218750001, -13.706640624999963], [136.27539062499997, -13.791113281250034], [136.23740234375003, -13.824511718750003]]], [[[136.33867187500007, -11.602343749999989], [136.18027343750006, -11.676757812499957], [136.26738281250002, -11.57646484374996], [136.44921875000003, -11.48710937499996], [136.47929687500002, -11.465917968749991], [136.47050781250002, -11.509277343749943], [136.37939453125003, -11.583203125], [136.33867187500007, -11.602343749999989]]], [[[130.45927734375007, -11.679296875000034], [130.54179687500002, -11.703125], [130.57988281250002, -11.737109375], [130.6027343750001, -11.773242187499989], [130.60625, -11.816601562500026], [130.50253906250012, -11.835644531249997], [130.31748046875006, -11.771777343749958], [130.13125, -11.82451171874996], [130.0765625, -11.825488281249974], [130.04326171875007, -11.78730468750001], [130.07207031250007, -11.680761718749977], [130.13906250000002, -11.697070312500017], [130.19755859375007, -11.658203125], [130.18710937500003, -11.541210937499967], [130.15283203124997, -11.47753906249997], [130.25117187500004, -11.360546875000026], [130.29492187499997, -11.33681640624998], [130.33925781250002, -11.33701171875002], [130.37675781250007, -11.420117187499997], [130.38564453125, -11.509863281249977], [130.4328125000001, -11.592187499999966], [130.45927734375007, -11.679296875000034]]], [[[130.6188476562501, -11.376074218749991], [130.75224609375005, -11.384375], [130.9127929687501, -11.309277343749969], [130.98740234375012, -11.339843749999986], [131.02304687500006, -11.334375], [131.140625, -11.26308593749998], [131.21718750000002, -11.242578124999966], [131.26826171875004, -11.18984375], [131.32050781250004, -11.246875], [131.43691406250005, -11.313183593749969], [131.4733398437501, -11.382519531249969], [131.52226562500002, -11.415234374999969], [131.53857421874997, -11.436914062500037], [131.46787109375012, -11.509570312500003], [131.4585937500001, -11.587890624999972], [131.38281250000003, -11.582519531249943], [131.29208984375012, -11.7109375], [130.95097656250005, -11.926464843750026], [130.644921875, -11.74238281250001], [130.51191406250004, -11.617871093749955], [130.42275390625, -11.445800781249986], [130.40478515624997, -11.304980468749989], [130.3685546875, -11.21494140625002], [130.38457031250002, -11.1921875], [130.40292968750006, -11.180468750000017], [130.42666015625, -11.183105468750028], [130.51914062500012, -11.279492187500024], [130.55976562500004, -11.305957031250001], [130.6188476562501, -11.376074218749991]]], [[[136.59853515625, -11.378906249999941], [136.52656250000004, -11.438867187499994], [136.52167968750004, -11.393847656249974], [136.5597656250001, -11.357910156250012], [136.64902343750006, -11.211621093749969], [136.68798828125003, -11.17763671874998], [136.71054687500006, -11.158398437499967], [136.72734375000002, -11.10478515624996], [136.73173828125, -11.024609374999969], [136.78027343749997, -11.0125], [136.74140625000004, -11.194628906249973], [136.59853515625, -11.378906249999941]]], [[[132.59335937500006, -11.302832031249991], [132.5736328125, -11.318359374999957], [132.49375, -11.163671874999977], [132.51630859375004, -11.116015625000031], [132.48378906250005, -11.037304687499983], [132.53779296875004, -11.028417968749949], [132.57880859375004, -10.968847656249977], [132.59326171874997, -10.99765625], [132.596875, -11.106445312499943], [132.6291015625001, -11.169140625000026], [132.59335937500006, -11.302832031249991]]], [[[143.17890625000004, -11.954492187499964], [143.15292968750012, -12.075878906250011], [143.10468750000004, -12.169628906250011], [143.09902343750005, -12.225976562500037], [143.11025390625, -12.303515625000015], [143.190625, -12.361230468749966], [143.2541015625001, -12.397656250000011], [143.28964843750006, -12.498828125000017], [143.40156250000004, -12.639941406249989], [143.39755859375012, -12.73613281249996], [143.45771484375007, -12.855761718749989], [143.51201171875007, -13.094531249999958], [143.52949218750007, -13.303808593749963], [143.5866210937501, -13.443652343750031], [143.54843750000012, -13.74101562499996], [143.5892578125, -13.862792968749986], [143.64335937500002, -13.963671875000017], [143.70722656250004, -14.164550781249998], [143.75634765625003, -14.348828124999969], [143.82236328125006, -14.401074218750038], [143.96181640625005, -14.462890625000027], [144.105859375, -14.394531249999957], [144.20986328125005, -14.301953125000011], [144.3216796875, -14.279394531250034], [144.473046875, -14.231835937500023], [144.58642578125003, -14.354687500000011], [144.64804687500006, -14.492480468750017], [144.91572265625004, -14.674316406250028], [145.06445312499997, -14.791015625], [145.17998046875007, -14.856933593750014], [145.28769531250006, -14.943164062499989], [145.27695312500012, -15.029394531249977], [145.2516601562501, -15.097460937499989], [145.27617187500002, -15.20390625], [145.29306640625006, -15.327246093749993], [145.27158203125006, -15.476660156249961], [145.34951171875005, -15.701562500000051], [145.375390625, -15.881054687500026], [145.45800781250003, -16.05644531249996], [145.45185546875004, -16.23691406250005], [145.43642578125, -16.30498046874996], [145.42607421875, -16.406152343749962], [145.49042968750004, -16.532128906249966], [145.54990234375012, -16.625097656249988], [145.63828125000006, -16.726074218749957], [145.75478515625, -16.879492187500034], [145.83789062499997, -16.91035156250001], [145.91210937499994, -16.9125], [145.90195312500006, -17.070214843749994], [146.04980468749997, -17.381054687499983], [146.12587890625005, -17.63525390625], [146.07402343750002, -17.97734375], [146.0228515625, -18.175781249999986], [146.03222656249997, -18.272851562500037], [146.223046875, -18.509863281250006], [146.3332031250001, -18.55371093749997], [146.31171875000004, -18.666699218749983], [146.296875, -18.84121093750001], [146.38339843750006, -18.97705078124997], [146.48115234375004, -19.07871093749999], [146.58730468749997, -19.139453125000017], [146.69199218750003, -19.187402343750023], [146.82900390625, -19.23574218750001], [147.00263671875004, -19.256054687499965], [147.09277343750003, -19.332617187500016], [147.13876953125003, -19.39316406250002], [147.278125, -19.414160156250034], [147.34150390625, -19.40292968749996], [147.41855468750012, -19.378125], [147.47089843750004, -19.419335937500023], [147.50976562499997, -19.474121093749986], [147.58603515625006, -19.622753906249983], [147.7423828125001, -19.770117187499977], [147.85322265625004, -19.794726562500017], [147.915625, -19.869238281250016], [148.00449218750012, -19.88955078124998], [148.08105468749994, -19.89863281249997], [148.1896484375001, -19.95585937499999], [148.36689453125004, -20.0875], [148.52675781250005, -20.108886718749986], [148.60048828125005, -20.14521484375001], [148.759375, -20.28955078125003], [148.82099609375004, -20.36640625000005], [148.88476562499997, -20.480859375], [148.805078125, -20.491699218749996], [148.72998046874997, -20.4677734375], [148.6836914062501, -20.58017578124999], [148.789453125, -20.735644531249957], [148.91240234375007, -20.845214843749986], [149.06054687499994, -20.96113281249997], [149.20488281250005, -21.125097656249977], [149.24140625, -21.25019531249998], [149.28027343749997, -21.29951171874998], [149.3292968750001, -21.476074218749986], [149.45410156249997, -21.57871093750002], [149.46005859375012, -21.76542968749996], [149.52402343750006, -22.023632812499983], [149.59570312500003, -22.25761718749996], [149.64531250000002, -22.32832031249997], [149.70390625000002, -22.440527343750002], [149.77158203125006, -22.42626953125003], [149.82246093750004, -22.389843749999983], [149.92031249999997, -22.501367187499966], [149.97441406250005, -22.55068359374998], [150.00556640625004, -22.521582031250006], [149.94189453125003, -22.30810546875003], [149.98125, -22.184277343750026], [150.02060546875006, -22.168359374999977], [150.07617187500003, -22.16445312499998], [150.14296875000005, -22.265429687500045], [150.23486328125, -22.37294921875001], [150.40507812500007, -22.468945312500026], [150.54130859375002, -22.55908203125], [150.57958984375003, -22.555761718750034], [150.56435546875, -22.48613281249997], [150.56855468750004, -22.383984375000036], [150.62285156250002, -22.367285156250006], [150.67246093750012, -22.418164062499983], [150.76386718750004, -22.576171875000014], [150.78281250000012, -22.902929687499977], [150.78300781250007, -23.17656250000003], [150.84316406250005, -23.4580078125], [150.9310546875, -23.53193359375004], [150.98876953124997, -23.60175781249997], [151.08769531250002, -23.69609375], [151.15380859375, -23.78408203124999], [151.23632812499997, -23.825], [151.50078125000002, -24.01240234374997], [151.5753906250001, -24.033593750000023], [151.69091796875003, -24.038378906250017], [151.83164062500006, -24.122949218750005], [151.902734375, -24.200976562500017], [152.0553710937501, -24.494433593750017], [152.12988281250003, -24.597558593749977], [152.28203125000002, -24.69931640625002], [152.35312500000012, -24.732519531250034], [152.45634765625005, -24.80244140624998], [152.49316406250003, -24.90400390624997], [152.50205078125006, -24.96396484375002], [152.56328125000002, -25.072070312500017], [152.65429687499997, -25.201953125000017], [152.7891601562501, -25.27412109374997], [152.91347656250005, -25.432128906250014], [152.92050781250006, -25.688574218750034], [152.9849609375001, -25.816210937500003], [153.02822265625005, -25.87031250000001], [153.12548828124997, -25.922656250000017], [153.16494140625, -25.964160156250045], [153.0841796875001, -26.303808593749963], [153.16210937499997, -26.982714843749974], [153.11679687500006, -27.19443359375003], [153.1979492187501, -27.404687499999966], [153.38574218749997, -27.76855468750003], [153.42841796875004, -27.89765625000004], [153.45488281250002, -28.04833984375], [153.57568359375003, -28.24052734374999], [153.56914062500002, -28.53339843749997], [153.6168945312501, -28.67304687499999], [153.60458984375006, -28.854492187500014], [153.46220703125, -29.050195312500005], [153.348046875, -29.290429687500005], [153.34697265625005, -29.496582031249996], [153.27236328125005, -29.89248046875001], [153.22382812500004, -29.998632812499963], [153.18818359375004, -30.16386718749996], [153.03056640625002, -30.56337890624999], [153.02373046875002, -30.720117187500033], [153.04785156249997, -30.907128906250033], [153.02158203125012, -31.086621093750015], [152.98222656250002, -31.20878906250003], [152.94394531250012, -31.43486328124999], [152.78583984375, -31.78632812500001], [152.55927734375007, -32.045703125], [152.5453125, -32.24306640624998], [152.5166015625, -32.33017578124996], [152.47041015625007, -32.43906250000003], [152.33125, -32.55751953125001], [152.2474609375, -32.60869140625003], [152.21572265625, -32.678125], [152.13652343750002, -32.678125], [152.13457031250007, -32.69990234374997], [152.18808593750006, -32.72167968749996], [152.1642578125001, -32.75742187499996], [151.954296875, -32.820312499999986], [151.812890625, -32.90107421875001], [151.66835937500002, -33.098632812500014], [151.60771484375002, -33.20185546875], [151.530078125, -33.300976562500026], [151.4837890625, -33.3474609375], [151.46337890625003, -33.39736328125004], [151.43203125000005, -33.521582031250034], [151.35751953125012, -33.54394531249997], [151.29208984375012, -33.580957031249966], [151.32275390624997, -33.699316406250006], [151.28837890625007, -33.834863281249994], [151.28027343750003, -33.92666015625005], [151.24462890624997, -33.98505859375004], [151.20166015624997, -33.964062500000026], [151.16787109375005, -33.97343749999999], [151.12480468750007, -34.00527343749998], [151.19121093750002, -34.01523437499998], [151.23154296875003, -34.0296875], [151.08994140625006, -34.1625], [150.96035156250005, -34.29707031250001], [150.9274414062501, -34.386621093749966], [150.8712890625001, -34.499121093749956], [150.821875, -34.749218750000026], [150.78105468750002, -34.89218750000002], [150.80917968750006, -34.99384765625004], [150.80458984375, -35.01289062500001], [150.77460937500004, -35.02041015625002], [150.7560546875001, -35.00712890624999], [150.69736328125012, -35.041894531249966], [150.68095703125007, -35.07666015625003], [150.70566406250012, -35.119726562500006], [150.72216796875003, -35.13457031250002], [150.71464843750007, -35.15517578125004], [150.69033203125, -35.177734375000014], [150.6344726562501, -35.177636718749994], [150.56748046875012, -35.214257812499994], [150.37412109375006, -35.58417968750004], [150.2921875000001, -35.68232421874997], [150.19531249999997, -35.83359374999996], [150.15849609375002, -35.97060546874998], [150.12890625000003, -36.120410156250045], [150.09531250000012, -36.37265625], [150.06279296875007, -36.55039062499998], [149.98818359375005, -36.722753906250006], [149.96025390625002, -36.845507812499974], [149.9505859375, -37.080273437500004], [149.98632812500003, -37.25839843749998], [149.96289062499997, -37.353027343749986], [149.9623046875, -37.443847656250014], [149.93271484375012, -37.52851562500002], [149.809375, -37.54785156249997], [149.70898437500003, -37.61699218750002], [149.56542968749997, -37.72998046875004], [149.480859375, -37.77119140625], [149.29843750000012, -37.802148437499994], [148.94394531250012, -37.788476562499966], [148.2625, -37.830664062500034], [148.13066406250007, -37.85605468749996], [147.87675781250002, -37.93417968749998], [147.63144531250006, -38.05566406249996], [147.39560546875006, -38.21914062499995], [146.8568359375, -38.663476562499966], [146.4357421875001, -38.71181640624995], [146.35625, -38.71181640624995], [146.29257812500006, -38.69980468749999], [146.21748046875004, -38.72744140625004], [146.21621093750005, -38.782714843750014], [146.28554687500005, -38.840234375], [146.33662109375, -38.89423828125], [146.4269531250001, -38.81962890624998], [146.46660156250005, -38.84033203125003], [146.48164062500004, -38.977929687499994], [146.4837890625, -39.06503906249998], [146.45664062500003, -39.112304687500014], [146.40000000000012, -39.14550781250003], [146.34003906250004, -39.123828125000045], [146.33203125000003, -39.07666015625003], [146.254296875, -38.964453125], [146.1583984375001, -38.86572265624996], [146.06992187500006, -38.834082031249984], [146.01816406250012, -38.867089843749966], [145.93535156250002, -38.90175781250002], [145.86552734375002, -38.77597656249998], [145.79082031250007, -38.66699218749997], [145.69189453124997, -38.65566406249998], [145.60634765625005, -38.656835937500034], [145.53535156250004, -38.60966796875002], [145.39726562500002, -38.53535156249998], [145.42421875, -38.477343749999974], [145.46279296875005, -38.416308593749974], [145.54218750000004, -38.39384765625002], [145.51835937500007, -38.31142578125001], [145.4757812500001, -38.24375], [145.36640625000004, -38.225683593750034], [145.29277343750002, -38.237597656249974], [145.24892578125, -38.29121093749998], [145.19121093750002, -38.383593749999974], [144.95957031250012, -38.500781250000045], [144.84726562500006, -38.43632812500005], [144.71777343749997, -38.34033203125004], [144.78027343749994, -38.347363281250054], [144.91142578125007, -38.34404296874999], [145.02011718750006, -38.25839843750005], [145.06699218750003, -38.204882812499974], [145.11992187500007, -38.091308593750014], [145.04960937500007, -38.01093749999998], [144.98486328125003, -37.95224609375002], [144.89130859375004, -37.899804687499994], [144.5384765625, -38.077148437499964], [144.46533203125003, -38.1025390625], [144.39550781250003, -38.13691406249998], [144.51777343750004, -38.16640624999995], [144.5894531250001, -38.15761718750002], [144.6652343750001, -38.20996093750002], [144.5436523437501, -38.28408203124995], [144.44785156250012, -38.30371093750004], [144.32871093750006, -38.34824218749996], [144.10156249999997, -38.46230468750002], [143.8117187500001, -38.69882812499998], [143.68671875000004, -38.76689453124999], [143.53896484375005, -38.82089843749998], [143.33847656250006, -38.7578125], [143.22646484375, -38.74316406250004], [143.08261718750003, -38.64589843750002], [142.840234375, -38.58085937500002], [142.61210937500007, -38.451660156249986], [142.45585937500002, -38.38632812499999], [142.34453125000007, -38.372167968750034], [142.1876953125001, -38.3994140625], [141.92470703125, -38.28378906249998], [141.725, -38.27138671875002], [141.5939453125001, -38.38779296875002], [141.49179687500006, -38.379785156249994], [141.42421875, -38.36347656250004], [141.21386718750003, -38.17197265625002], [141.0109375000001, -38.07695312500003], [140.62724609375007, -38.02841796874999], [140.39042968750007, -37.89667968749998], [140.21210937500004, -37.6421875], [139.87480468750007, -37.35205078124996], [139.78427734375012, -37.24580078124998], [139.74228515625006, -37.141699218750006], [139.73847656250007, -37.05957031249997], [139.78388671875004, -36.902636718749974], [139.84658203125, -36.748046875], [139.85732421875, -36.662109375], [139.72900390625003, -36.37138671875001], [139.54873046875, -36.0966796875], [139.46591796875006, -36.010351562500006], [139.24492187500002, -35.827343750000026], [139.03769531250003, -35.68925781249996], [138.9850585937501, -35.617578125], [138.96894531250007, -35.58076171874997], [139.06689453124994, -35.59843750000002], [139.1125, -35.54228515625003], [139.17802734375007, -35.52304687500002], [139.23056640625012, -35.59765625000003], [139.289453125, -35.61132812499997], [139.29208984375012, -35.4859375], [139.32509765625, -35.42666015625001], [139.3025390625, -35.39941406249997], [139.28251953125002, -35.37539062499996], [139.19277343750002, -35.347265625], [139.09375, -35.38955078125001], [139.01767578125006, -35.44326171875002], [138.9152343750001, -35.48886718749999], [138.87529296875002, -35.53681640624998], [138.77099609374997, -35.53837890625003], [138.72968750000004, -35.550781249999986], [138.521875, -35.6423828125], [138.38925781250012, -35.644726562500026], [138.184375, -35.61269531249999], [138.2521484375001, -35.48652343750004], [138.33291015625, -35.41171875], [138.39980468750005, -35.32578125], [138.5111328125, -35.02441406249995], [138.48994140625004, -34.76357421875002], [138.43623046875007, -34.65625], [138.2643554687501, -34.44033203124998], [138.18623046875004, -34.307226562500034], [138.0892578125, -34.16982421875002], [138.04130859375002, -34.249804687499974], [138.01230468750006, -34.334082031250006], [137.91923828125002, -34.456054687499986], [137.87412109375006, -34.72744140625002], [137.69169921875002, -35.14296875000004], [137.56640624999997, -35.148046875], [137.45957031250006, -35.13134765624998], [137.27236328125005, -35.17871093750004], [137.14443359375, -35.23642578124998], [137.02988281250012, -35.2365234375], [136.96660156250002, -35.254882812500014], [136.88359375000007, -35.23974609375004], [137.0142578125001, -34.91582031250003], [137.12841796875003, -34.92470703124998], [137.25205078125003, -34.911523437499966], [137.30839843750002, -34.916992187500014], [137.39101562500005, -34.91328124999997], [137.45429687500004, -34.76445312500002], [137.49296875000002, -34.59775390624999], [137.46855468750002, -34.490234375], [137.45898437499997, -34.378906249999986], [137.4835937500001, -34.25214843750001], [137.49384765625004, -34.16113281250003], [137.65039062499994, -33.85908203125004], [137.78085937500006, -33.703125], [137.9318359375001, -33.57910156250003], [137.91396484375, -33.461328125], [137.86601562500002, -33.314062500000034], [137.85234375000007, -33.20078124999996], [137.92431640624997, -33.16513671874998], [137.99257812500005, -33.094238281250014], [137.91318359375012, -32.770703125], [137.86308593750002, -32.673730468749966], [137.783203125, -32.578125], [137.78183593750012, -32.70195312500003], [137.79091796875, -32.82324218749996], [137.68017578124997, -32.97802734374995], [137.53623046875006, -33.08916015624996], [137.44228515625, -33.19355468749999], [137.3541992187501, -33.430175781249964], [137.23730468750003, -33.62949218749999], [137.13027343750005, -33.703027343749966], [137.03447265625007, -33.71953125000003], [136.93652343750003, -33.75019531249998], [136.78349609375002, -33.8296875], [136.63554687500007, -33.89658203124996], [136.52587890625003, -33.984179687500045], [136.43066406249997, -34.02998046875004], [136.12109374999997, -34.428710937500014], [135.97968750000004, -34.561914062499966], [135.95058593750005, -34.61572265625], [135.891015625, -34.660937499999974], [135.90263671875007, -34.723828125], [135.95058593750005, -34.76679687499997], [135.99853515624997, -34.94375], [135.96972656249997, -34.98183593749998], [135.91914062500004, -34.961914062500014], [135.7923828125, -34.863281249999986], [135.7125, -34.89921875000003], [135.64755859375006, -34.93964843750001], [135.480859375, -34.75820312499999], [135.41171875000006, -34.71552734375], [135.32421874999997, -34.642675781249984], [135.23066406250004, -34.57978515624997], [135.1908203125, -34.57265625000002], [135.12304687499997, -34.58574218750003], [135.12958984375004, -34.53652343750003], [135.1759765625001, -34.496582031249986], [135.21679687499997, -34.48730468749996], [135.29248046875003, -34.545605468750026], [135.37871093750007, -34.59765624999997], [135.4273437500001, -34.60195312500004], [135.45, -34.58105468749996], [135.36796875000002, -34.37558593750002], [135.31201171874997, -34.19550781250001], [135.28632812500007, -34.14228515625001], [135.21894531250004, -33.959765625000045], [135.18544921875005, -33.906738281249986], [135.04208984375006, -33.77773437499999], [134.88876953125012, -33.62636718749998], [134.84667968749997, -33.44462890624999], [134.79101562499997, -33.32832031250001], [134.71904296875007, -33.25517578125003], [134.60771484375002, -33.19013671875001], [134.30126953124997, -33.16503906249996], [134.17353515625004, -32.979101562500006], [134.10039062500007, -32.748632812500034], [134.1583984375, -32.73339843749996], [134.22714843750006, -32.73056640624999], [134.2492187500001, -32.658691406250014], [134.23417968750007, -32.54853515625004], [133.93017578125003, -32.41171874999996], [133.78671875000012, -32.26884765624999], [133.66533203125005, -32.207226562500054], [133.55136718750012, -32.18291015624997], [133.40058593750004, -32.18847656249996], [133.21210937500004, -32.18378906249998], [132.75742187500012, -31.95625], [132.64863281250004, -31.94931640624999], [132.3236328125, -32.02001953125001], [132.21464843750002, -32.00712890624996], [131.72119140625003, -31.696289062499954], [131.39316406250006, -31.54853515624997], [131.28496093750005, -31.520996093749957], [131.14365234375006, -31.49570312500005], [131.02929687500003, -31.53183593750003], [130.94814453125, -31.565820312500023], [130.78300781250002, -31.604003906249986], [130.12978515625, -31.579101562499982], [129.56884765624997, -31.627246093750014], [129.1876953125001, -31.659960937500014], [128.94619140625, -31.70263671875001], [128.54609375000004, -31.887695312499968], [128.06767578125002, -32.06650390624998], [127.67802734375003, -32.15126953125002], [127.31982421874996, -32.26406249999999], [127.08408203125005, -32.296875], [126.77929687499997, -32.31093750000004], [126.1365234375, -32.25683593750003], [125.91718750000004, -32.296972656250034], [125.5674804687501, -32.50585937499996], [125.46367187500002, -32.55654296874998], [125.26660156250003, -32.61445312499997], [124.75878906250003, -32.882714843749994], [124.52460937500008, -32.94013671874997], [124.3732421875001, -32.958398437499966], [124.24375, -33.015234374999984], [124.12607421875006, -33.129394531249986], [123.96718750000005, -33.44628906249997], [123.8683593750001, -33.59638671875], [123.65039062499996, -33.83632812500002], [123.50683593749997, -33.916210937500054], [123.36542968750004, -33.90537109374998], [123.20761718750012, -33.988281249999986], [123.06757812500008, -33.90058593749997], [122.95566406250012, -33.883789062500014], [122.7775390625001, -33.890820312500026], [122.15097656250005, -33.99179687499999], [122.06113281250005, -33.87441406249996], [121.94638671875012, -33.85673828125002], [121.72968750000003, -33.8625], [121.40507812500007, -33.826757812500034], [120.81455078125012, -33.87128906250004], [120.53056640625006, -33.91972656249996], [120.41835937500005, -33.96308593750001], [120.209375, -33.935449218749966], [119.8541015625001, -33.97470703124998], [119.72910156250012, -34.04150390625], [119.63515625, -34.10117187499998], [119.45058593750004, -34.368261718750034], [119.24765625000012, -34.45644531249998], [119.08134765625009, -34.459375], [118.89531250000009, -34.47988281250004], [118.52011718750012, -34.73710937499996], [118.135546875, -34.98662109374999], [118.0064453125001, -35.01328125], [117.86308593750002, -35.05498046874996], [117.67539062500006, -35.074902343750026], [117.58193359375004, -35.09775390624998], [117.1439453125, -35.033691406249986], [116.8654296875001, -35.02656250000004], [116.51718750000012, -34.98789062499997], [116.21708984375007, -34.86582031249998], [115.98671875000004, -34.795019531250034], [115.72626953125008, -34.52607421875004], [115.56503906250012, -34.42578125000003], [115.27763671875006, -34.30390624999998], [115.19482421874997, -34.30849609375004], [115.12792968749996, -34.34179687499997], [115.00878906250003, -34.25585937499997], [115.0056640625, -34.14511718749996], [114.97343750000002, -34.051171875], [114.97568359375012, -33.80419921874997], [114.9938476562501, -33.51533203125], [115.09892578125006, -33.5802734375], [115.18164062499997, -33.64345703124999], [115.35878906250001, -33.63994140624999], [115.5153320312501, -33.53134765624998], [115.60449218749997, -33.37226562499998], [115.68300781250005, -33.19287109375003], [115.67089843749997, -33.0021484375], [115.61855468749998, -32.666992187500014], [115.65429687499997, -32.596582031249966], [115.70791015625, -32.56796875], [115.72539062500007, -32.40107421875001], [115.7380859375, -31.887890625], [115.6984375000001, -31.694531250000054], [115.45458984374996, -31.30253906250003], [115.29433593749998, -30.96181640624999], [115.17685546875006, -30.808007812500005], [115.07792968750007, -30.560449218750023], [114.99453125000004, -30.216210937499962], [114.96884765625005, -30.042285156249974], [114.9420898437501, -29.72158203125001], [114.97138671875005, -29.539746093749997], [114.95898437499997, -29.433593749999954], [114.85683593750005, -29.14296875], [114.62841796874997, -28.87177734374998], [114.590625, -28.771679687500026], [114.59179687499997, -28.666210937500022], [114.53740234375006, -28.542871093750037], [114.35351562500003, -28.294921874999968], [114.16513671875012, -28.08066406250002], [114.13349609375004, -27.976464843750023], [114.09843750000002, -27.544238281249974], [114.028125, -27.347265624999988], [113.709375, -26.84775390625002], [113.33300781250003, -26.417382812500005], [113.23105468750006, -26.24140625000004], [113.18476562500004, -26.182226562499963], [113.21074218750007, -26.174218750000023], [113.253125, -26.197265625000014], [113.30009765625007, -26.24023437499997], [113.32324218749996, -26.243847656249997], [113.34531250000006, -26.208300781250042], [113.34287109375005, -26.126074218749988], [113.35605468750012, -26.080468750000023], [113.38896484375007, -26.105566406249977], [113.4274414062501, -26.19804687499999], [113.54658203125004, -26.43671875000004], [113.58164062500006, -26.558105468749986], [113.73369140625, -26.595117187499977], [113.78037109375006, -26.563281249999974], [113.83642578125003, -26.500585937499988], [113.85283203125007, -26.33212890625005], [113.77578125, -26.255957031249977], [113.7064453125, -26.22363281249997], [113.58906250000004, -26.098632812499986], [113.5133789062501, -25.898339843750037], [113.39531250000002, -25.71328125], [113.39736328124998, -25.647167968750026], [113.4513671875001, -25.599121093750014], [113.539453125, -25.625195312499997], [113.62119140625012, -25.73164062500001], [113.7130859375001, -25.83076171875004], [113.69785156250012, -26.004199218750028], [113.68359374999997, -26.05166015625001], [113.69169921875002, -26.091699218749994], [113.72373046875006, -26.129785156250037], [113.76582031250008, -26.159765625], [113.81181640625007, -26.115820312500034], [113.85390625, -26.01445312499999], [113.87988281249997, -26.02763671875], [113.94238281250001, -26.25869140625001], [113.99199218750006, -26.32148437500001], [114.09033203124997, -26.393652343749963], [114.17597656250008, -26.3375], [114.21572265625, -26.289453124999966], [114.20332031250004, -26.12636718750005], [114.22851562500003, -25.96875], [114.2142578125, -25.85156250000001], [113.99277343750006, -25.544824218749966], [113.7923828125, -25.165722656249997], [113.67080078124998, -24.97705078125003], [113.56923828125, -24.692968749999963], [113.50351562500012, -24.59462890625001], [113.41767578125004, -24.435644531250034], [113.41298828124998, -24.254003906249974], [113.4212890625, -24.13232421874997], [113.48984375000012, -23.869628906250014], [113.5529296875001, -23.73281250000002], [113.7570312500001, -23.41816406250005], [113.7669921875, -23.28251953125003], [113.7648437500001, -23.18046875000003], [113.79492187499997, -23.02363281249997], [113.79511718750003, -22.914550781250025], [113.76787109375006, -22.812890625000023], [113.68281250000004, -22.637792968749963], [113.79501953125012, -22.332128906250034], [113.95839843749998, -21.939160156250008], [114.02285156250004, -21.881445312499977], [114.12392578125005, -21.828613281249957], [114.14257812500003, -21.909765624999963], [114.09277343750003, -22.18134765624997], [114.16386718750002, -22.32333984375002], [114.14160156250003, -22.483105468749983], [114.20517578125006, -22.455859375000017], [114.30351562500002, -22.425390625000034], [114.37773437500007, -22.341503906249997], [114.41699218749996, -22.26103515625003], [114.60283203125002, -21.9421875], [114.70927734375, -21.82343749999997], [114.85908203125003, -21.735937499999988], [115.16171875000006, -21.630566406250026], [115.45615234375012, -21.49169921874997], [115.59609375000004, -21.358105468750026], [115.77148437499997, -21.242285156249963], [115.89355468749997, -21.116699218749957], [116.01093750000008, -21.030371093749963], [116.60585937500005, -20.71337890625004], [116.70673828125008, -20.653808593749986], [116.836328125, -20.647070312500034], [116.99531250000005, -20.65761718750005], [117.13906250000007, -20.640917968750017], [117.2927734375, -20.713085937499983], [117.40625, -20.72119140625003], [117.68388671875002, -20.64277343750004], [117.83232421875007, -20.572558593750028], [118.08730468750005, -20.41904296875002], [118.19921875000001, -20.37519531249997], [118.45830078125, -20.32666015625003], [118.75146484374996, -20.261914062499983], [119.10449218749997, -19.995312500000026], [119.35878906249998, -20.012304687500034], [119.58593750000001, -20.03828125], [119.76777343750011, -19.958398437499966], [120.19628906250001, -19.909472656250045], [120.43369140625006, -19.841992187499965], [120.87841796874997, -19.665039062499982], [120.99794921874998, -19.604394531249966], [121.17978515625008, -19.477929687499966], [121.3376953125, -19.31992187500002], [121.49355468750005, -19.106445312499957], [121.58945312500006, -18.915136718749977], [121.6306640625, -18.81660156249997], [121.72197265625007, -18.65996093750003], [121.78486328125008, -18.53593749999999], [121.8337890625, -18.477050781249986], [122.00625, -18.393652343749963], [122.26210937500007, -18.159082031250033], [122.34541015625003, -18.11191406250002], [122.36093750000012, -18.036914062500017], [122.30576171875006, -17.99492187499999], [122.23740234375006, -17.968554687500045], [122.19130859375001, -17.7203125], [122.14746093749999, -17.54902343750001], [122.14316406250006, -17.42841796875004], [122.16025390625006, -17.313671875000026], [122.26093750000011, -17.135742187500014], [122.33271484375003, -17.059375], [122.43203125000005, -16.970410156249994], [122.52255859375006, -16.942871093749982], [122.59794921875006, -16.864941406249997], [122.72041015625003, -16.787695312499988], [122.77207031250012, -16.71015625], [122.84804687500005, -16.552441406250026], [122.91679687500002, -16.43261718750003], [122.97070312499996, -16.436816406250003], [123.07441406250004, -16.715332031249986], [123.14208984374997, -16.863085937499974], [123.26591796875002, -17.036816406250022], [123.383203125, -17.29277343750003], [123.47880859375002, -17.409960937500017], [123.52519531250006, -17.485742187499994], [123.56308593750005, -17.520898437499966], [123.5714843750001, -17.472265625], [123.56181640625006, -17.41542968749998], [123.60791015624996, -17.219921875000026], [123.586328125, -17.082714843750054], [123.59355468750007, -17.03037109375005], [123.61767578124996, -17.008300781249986], [123.66406250000003, -17.023242187500017], [123.75380859375, -17.099804687499983], [123.79902343750008, -17.12714843750004], [123.83105468750001, -17.120800781249997], [123.82949218749998, -16.996875], [123.87441406249998, -16.918652343750026], [123.85634765625004, -16.864746093749957], [123.778125, -16.867773437499963], [123.74501953125, -16.800976562500026], [123.68046875000006, -16.723632812499986], [123.60712890625004, -16.668066406250034], [123.51796875, -16.540722656250022], [123.49042968750008, -16.49072265624997], [123.52509765625003, -16.46757812499996], [123.58134765625009, -16.47089843750001], [123.62597656249996, -16.416308593750003], [123.64648437499997, -16.343066406250003], [123.60703125000005, -16.224023437499994], [123.64746093750001, -16.17988281249997], [123.72890625, -16.192480468749963], [123.85917968750006, -16.38232421875], [123.91523437500003, -16.363574218750003], [123.961328125, -16.286914062500017], [124.04443359374999, -16.264941406249974], [124.12978515625004, -16.278808593749957], [124.18603515624997, -16.33359375000002], [124.30039062500005, -16.388281249999977], [124.4527343750001, -16.382031250000026], [124.52998046875003, -16.39521484374997], [124.69238281249997, -16.38613281249998], [124.77197265624996, -16.40263671874996], [124.75703125000003, -16.37333984375003], [124.66923828125007, -16.33876953125001], [124.57031249999996, -16.331835937500017], [124.45449218750005, -16.335253906250003], [124.40488281250005, -16.298925781249974], [124.38828125000006, -16.20302734374998], [124.41640625, -16.133496093750026], [124.43457031249997, -16.103808593750017], [124.50996093750005, -16.11630859374999], [124.57685546875008, -16.11367187499998], [124.58505859375005, -16.020117187500016], [124.6085937500001, -15.9375], [124.64853515625013, -15.870214843750034], [124.64833984374998, -15.805468749999989], [124.60664062500004, -15.822656250000021], [124.50429687500005, -15.972460937499989], [124.45527343750011, -15.850585937500028], [124.381640625, -15.758203125000037], [124.39658203125006, -15.625878906249993], [124.43955078125012, -15.493554687500037], [124.50566406250007, -15.475390624999974], [124.5616210937501, -15.496289062499967], [124.64433593750006, -15.418847656250009], [124.69091796874997, -15.359667968750031], [124.68017578124996, -15.311035156249972], [124.69257812500004, -15.273632812499997], [124.75048828125003, -15.285253906249963], [124.97207031250005, -15.40429687499997], [125.01640625000002, -15.466503906250024], [125.06298828125003, -15.442285156249978], [125.0779296875, -15.374511718750027], [125.07294921875008, -15.306738281249991], [125.02402343750006, -15.316992187500032], [124.90917968750001, -15.310058593749957], [124.88271484375005, -15.271972656250014], [124.8926757812501, -15.240527343750001], [124.83906250000004, -15.160742187500006], [124.91416015625006, -15.109960937499963], [124.97871093750004, -15.106640625], [125.02333984375, -15.071875], [125.02402343750006, -15.024414062500028], [125.03818359375012, -15.004101562499969], [125.07294921875008, -15.032324218750034], [125.18867187500004, -15.045410156249956], [125.30234375000012, -15.106835937500035], [125.35566406250003, -15.119824218750011], [125.37558593750012, -15.086816406250037], [125.38378906249996, -15.015625], [125.24326171875005, -14.944531250000011], [125.23945312500008, -14.874609374999975], [125.18037109375004, -14.79404296874999], [125.17871093749997, -14.714746093749993], [125.26650390625001, -14.648437499999988], [125.28457031250005, -14.58408203125002], [125.33544921875003, -14.557910156250015], [125.43593750000007, -14.556835937499981], [125.5037109375, -14.502246093749962], [125.57978515625003, -14.48320312499999], [125.59833984375008, -14.361621093750001], [125.5970703125, -14.278125], [125.627734375, -14.256640625000017], [125.70458984374997, -14.29140625], [125.68125000000012, -14.38798828124996], [125.68095703125007, -14.480175781249997], [125.66162109375001, -14.529492187500013], [125.69052734375006, -14.52539062499997], [125.70839843750004, -14.504882812499972], [125.73847656250004, -14.444335937499972], [125.81953125000003, -14.469140624999966], [125.83955078125004, -14.533886718750011], [125.85009765624996, -14.597265624999961], [125.890625, -14.61796875], [125.94609375000007, -14.520410156250021], [126.0207031250001, -14.49453125], [126.01660156249996, -14.371289062500013], [126.04482421874998, -14.283007812499974], [126.05361328125004, -14.216699218749966], [126.10087890625007, -14.184375], [126.11132812499997, -14.114062500000017], [126.07343750000008, -14.065527343749991], [126.05390625000008, -13.977246093750026], [126.11904296875005, -13.957714843750054], [126.1842773437501, -14.00205078125002], [126.22822265625011, -14.113378906249963], [126.25849609375004, -14.163574218749972], [126.29882812499997, -14.13623046875], [126.32304687500002, -14.062109375], [126.403125, -14.018945312499994], [126.48242187499997, -14.07890625], [126.5697265625, -14.160937499999974], [126.67910156249998, -14.089355468749957], [126.78066406249998, -13.955175781249977], [126.76445312500007, -13.873046875000028], [126.77558593750004, -13.788476562500035], [126.90322265624998, -13.74414062499997], [127.0060546875001, -13.776757812500035], [127.09921875000005, -13.867382812500026], [127.29306640625012, -13.934765625], [127.45761718750006, -14.031445312499967], [127.53105468750002, -14.094628906249966], [127.67285156249997, -14.195117187500003], [127.76347656250002, -14.299414062500034], [127.88759765625, -14.485156250000031], [128.18046875000007, -14.711621093749983], [128.19941406250004, -14.751757812499989], [128.15986328125004, -14.827343750000024], [128.1244140625, -14.924121093750017], [128.08046875000005, -15.087988281250006], [128.06943359375012, -15.329296874999967], [128.11171875, -15.312011718749998], [128.15546875000004, -15.225585937499972], [128.20175781250006, -15.243359375000038], [128.25468750000002, -15.29853515625001], [128.2589843750001, -15.24560546874997], [128.2272460937501, -15.21357421875001], [128.17294921875006, -15.102246093749981], [128.175, -15.043164062500024], [128.21835937500006, -14.995703125000034], [128.28515624999997, -14.938867187500009], [128.35820312500002, -14.901660156249974], [128.40322265625, -14.869140625000014], [128.4098632812501, -14.828906249999987], [128.47744140625, -14.787988281249994], [128.57578125000006, -14.774511718750007], [128.63554687500007, -14.780957031249981], [129.05820312500012, -14.884375], [129.16513671875012, -14.987597656249987], [129.17519531250005, -15.115039062500017], [129.21582031249997, -15.16025390624999], [129.23789062500012, -15.08017578125002], [129.23359375000004, -14.906054687499987], [129.26757812500003, -14.871484375000053], [129.38125, -14.898437500000028], [129.45898437499997, -14.933203125], [129.56708984375004, -15.047363281250002], [129.58769531250007, -15.103320312500031], [129.63476562499997, -15.139746093749991], [129.65029296875, -15.086816406250037], [129.62822265625007, -15.011816406250032], [129.6126953125, -14.92587890625002], [129.637109375, -14.850976562500039], [129.76347656250007, -14.845019531249989], [129.84873046875012, -14.828906249999987], [129.80839843750007, -14.799707031249994], [129.75351562500006, -14.78955078124996], [129.66298828125005, -14.720898437500011], [129.60468750000004, -14.647070312499977], [129.6986328125, -14.575292968750004], [129.69794921875004, -14.557421875000015], [129.60791015625003, -14.559667968750022], [129.48388671874997, -14.489746093749984], [129.37871093750002, -14.392480468749978], [129.4591796875001, -14.21347656250002], [129.61962890624997, -14.03837890624996], [129.70986328125, -13.979980468749972], [129.71835937500012, -13.920898437500012], [129.76171874999997, -13.811914062500007], [129.7892578125001, -13.719921875000011], [129.79716796875002, -13.648437500000014], [129.83886718749997, -13.572949218749997], [129.937890625, -13.50166015625004], [130.07265625, -13.476171875], [130.13593750000004, -13.44833984375002], [130.19931640625006, -13.382617187500031], [130.25976562500003, -13.30224609375], [130.1349609375001, -13.145507812499957], [130.14531250000007, -13.059179687499963], [130.1681640625001, -12.957421875], [130.31796875000006, -12.88291015625002], [130.39990234374997, -12.68789062499999], [130.45419921875012, -12.658593749999966], [130.57187500000012, -12.664355468749989], [130.61748046875007, -12.646875], [130.60957031250004, -12.491308593749991], [130.62265625000006, -12.43105468749998], [130.67236328124997, -12.40693359375004], [130.73613281250007, -12.427734375000014], [130.77656250000004, -12.495312500000011], [130.8673828125001, -12.557812499999955], [130.89824218750007, -12.523632812500011], [130.88291015625006, -12.455078124999986], [130.87382812500007, -12.367187500000028], [130.95664062500006, -12.348242187499977], [131.02343749999997, -12.342871093749949], [131.03007812500002, -12.27109375], [131.01953124999997, -12.213867187499957], [131.04570312500002, -12.189648437499997], [131.219921875, -12.177929687500011], [131.26542968750002, -12.119042968750009], [131.29160156250006, -12.067871093749972], [131.31376953125007, -12.095898437499997], [131.34208984375007, -12.210058593749991], [131.43828125, -12.27695312500002], [131.72626953125007, -12.278125], [131.88798828125002, -12.23193359375], [131.95673828125004, -12.259277343749972], [132.06406250000006, -12.28076171875], [132.1823242187501, -12.226953124999966], [132.25322265625005, -12.186035156249972], [132.37207031250003, -12.239160156249966], [132.41103515625, -12.295117187499995], [132.4416015625001, -12.176367187499963], [132.51054687500002, -12.134863281250034], [132.58378906250002, -12.110253906249994], [132.67636718750012, -12.13007812500004], [132.71279296875, -12.1234375], [132.63046875000012, -12.035156249999972], [132.63525390625003, -11.9546875], [132.62988281249997, -11.83583984374995], [132.64472656250004, -11.72714843750002], [132.67421875000005, -11.649023437499991], [132.47519531250006, -11.491503906249974], [132.27792968750012, -11.467675781249994], [132.13359375000002, -11.500683593749969], [132.07285156250006, -11.474707031250006], [131.94462890625005, -11.34853515624998], [131.82246093750004, -11.302441406249997], [131.81181640625, -11.271386718749978], [131.96152343750006, -11.180859375000011], [132.01855468749997, -11.196386718749977], [132.10576171875002, -11.281152343750007], [132.15546875000004, -11.311132812499991], [132.19775390624997, -11.304980468749989], [132.225, -11.23876953125], [132.26269531249997, -11.204003906250023], [132.33398437499997, -11.223535156249994], [132.55732421875004, -11.366894531249981], [132.6828125000001, -11.505566406249997], [132.74707031249997, -11.468945312499997], [132.8571289062501, -11.391113281249943], [132.9610351562501, -11.407324218749963], [133.02490234374994, -11.452832031249997], [133.11435546875006, -11.621777343750038], [133.18525390625004, -11.705664062499991], [133.35615234375004, -11.728222656249967], [133.44316406250002, -11.760351562500034], [133.53320312499997, -11.816210937499946], [133.6544921875001, -11.811328125000017], [133.90419921875, -11.832031249999972], [134.13945312500002, -11.940136718749969], [134.23710937500002, -12.00771484374998], [134.35107421874994, -12.02578125], [134.4173828125, -12.052734375], [134.53808593749997, -12.06083984374996], [134.73027343750002, -11.984375], [134.81640625000003, -12.054687499999956], [134.8546875000001, -12.102539062500014], [135.02968750000005, -12.19375], [135.2179687500001, -12.221679687499957], [135.35234375000002, -12.129199218750031], [135.54873046875, -12.060644531250006], [135.68554687499997, -11.956152343749947], [135.7884765625, -11.907031249999974], [135.88525390624997, -11.821679687499994], [135.92246093750012, -11.825781250000034], [135.84355468750002, -11.905468750000011], [135.83398437500003, -11.950683593749986], [135.89580078125002, -11.969531250000017], [135.88945312500002, -11.992773437499949], [135.80429687500012, -12.054785156249977], [135.70253906250005, -12.151562499999969], [135.70439453125007, -12.209863281250037], [135.74394531250007, -12.241699218749943], [135.79082031250002, -12.2275390625], [135.85742187499997, -12.17851562499996], [135.93779296875002, -12.152148437500003], [136.00849609375004, -12.19140625], [136.0314453125001, -12.330859374999989], [136.08183593750007, -12.422460937500006], [136.19267578125007, -12.43515625000002], [136.26064453125, -12.433789062499997], [136.32851562500005, -12.305566406249994], [136.29189453125005, -12.196386718749949], [136.24990234375, -12.173046875], [136.27011718750006, -12.131640625], [136.44335937499997, -11.951464843749973], [136.5402343750001, -11.957617187499977], [136.60976562500005, -12.133593749999946], [136.7194335937501, -12.226464843749952], [136.83642578124997, -12.219140624999966], [136.89746093749997, -12.243554687499966], [136.94746093750004, -12.34990234374996], [136.53701171875, -12.784277343749991], [136.5177734375, -12.83281250000003], [136.57304687500002, -12.91162109375], [136.5943359375001, -13.00380859375005], [136.46103515625006, -13.225195312500034], [136.41191406250007, -13.236132812500031], [136.36455078125002, -13.176367187500034], [136.29414062500004, -13.137988281250031], [136.23232421875, -13.164941406250009], [136.16611328125006, -13.181054687500007], [135.92734375000012, -13.304296874999977], [135.92919921874997, -13.621582031249957], [135.98955078125002, -13.81015625], [135.95449218750005, -13.934863281250017], [135.88339843750006, -14.153125], [135.80634765625004, -14.234179687499974], [135.74453125, -14.28662109375], [135.53886718750002, -14.584960937500027], [135.47324218750006, -14.65664062499998], [135.40517578125005, -14.758203124999966], [135.42802734375002, -14.855664062500027], [135.4533203125001, -14.923144531250003], [135.53076171874994, -15.000390625000023], [135.83261718750006, -15.16015625], [135.96953125000002, -15.270214843750011], [136.20537109375002, -15.403417968749961], [136.25927734374997, -15.49521484375002], [136.29140625000005, -15.570117187500001], [136.46191406249997, -15.655273437500028], [136.58359375000006, -15.70654296875], [136.61875000000012, -15.693359374999972], [136.64414062500006, -15.675585937499989], [136.67460937500002, -15.675390625000047], [136.70488281250007, -15.685253906250011], [136.70009765625, -15.751953125000012], [136.6867187500001, -15.788476562499993], [136.69814453125002, -15.834960937499956], [136.78466796874997, -15.89423828125004], [136.92265625000002, -15.892382812500015], [137.00214843750004, -15.878320312499996], [137.08984374999997, -15.941308593750035], [137.16894531250003, -15.982128906250011], [137.29931640625003, -16.06630859375001], [137.52636718750003, -16.167089843750034], [137.70371093750006, -16.233007812499963], [137.91289062500007, -16.476562500000014], [138.07158203125007, -16.61699218750003], [138.24501953125005, -16.718359374999977], [138.50566406250002, -16.789550781250014], [138.62568359375004, -16.777832031250014], [138.82031250000003, -16.860644531250017], [139.00986328125006, -16.899316406249994], [139.11035156250003, -17.0140625], [139.14453124999997, -17.10107421874997], [139.15410156250007, -17.16777343749997], [139.2484375, -17.328613281249957], [139.44052734375006, -17.380566406249983], [139.6896484375001, -17.54072265625001], [139.89453125, -17.611328125], [139.9459960937501, -17.653613281250003], [140.03583984375004, -17.702636718749957], [140.2096679687501, -17.70439453124996], [140.51113281250005, -17.62451171875003], [140.6484375, -17.54375], [140.83046875, -17.414453125000037], [140.91582031250007, -17.192578125000054], [140.96601562500007, -17.014550781250023], [141.21914062500005, -16.646191406250026], [141.29140625, -16.46347656250002], [141.35566406250004, -16.221093750000023], [141.41191406250007, -16.069531250000054], [141.39316406250006, -15.904687500000035], [141.45156250000005, -15.605273437499974], [141.58144531250005, -15.195410156249963], [141.62548828124997, -15.056640625000012], [141.60351562500003, -14.85273437500004], [141.52294921875003, -14.470117187499994], [141.558984375, -14.337890624999956], [141.59433593750003, -14.152832031250012], [141.53544921875002, -14.018652343750034], [141.48066406250004, -13.926757812499957], [141.47255859375, -13.797558593750011], [141.53417968750003, -13.553808593750004], [141.58876953125, -13.425097656249987], [141.64541015625, -13.259082031250003], [141.61357421875002, -12.943457031250006], [141.73457031250004, -12.833496093749986], [141.78222656249997, -12.778710937500023], [141.87578125000007, -12.778222656250009], [141.9203125, -12.802929687499981], [141.92978515625003, -12.73984375], [141.89287109375007, -12.681347656249983], [141.87832031250005, -12.613281249999972], [141.85214843750012, -12.578710937500034], [141.79453125000012, -12.566601562499967], [141.74667968750006, -12.529394531250034], [141.67773437500003, -12.491406250000011], [141.68857421875012, -12.351074218750028], [141.80576171875003, -12.080078124999972], [141.87050781250002, -11.9755859375], [141.91298828125, -12.01923828125001], [141.96113281250004, -12.054296874999963], [141.96777343749997, -11.976269531249967], [141.95156250000005, -11.896191406249995], [142.04052734374994, -11.631738281250023], [142.13896484375002, -11.273242187500003], [142.168359375, -10.946582031249974], [142.32646484375002, -10.884179687499964], [142.40683593750006, -10.802246093749972], [142.45644531250005, -10.707324218749989], [142.54482421875, -10.707324218749989], [142.60507812500012, -10.748242187499983], [142.56542968749997, -10.819433593750006], [142.55273437500003, -10.874414062500023], [142.723046875, -11.010449218750026], [142.7796875, -11.115332031249977], [142.80332031250012, -11.213964843750006], [142.83681640625, -11.306933593750031], [142.8529296875, -11.432226562499977], [142.85058593749997, -11.632324218749972], [142.87255859374997, -11.821386718750034], [142.933984375, -11.88076171874995], [142.9884765625001, -11.919042968750032], [143.06640624999997, -11.924121093750003], [143.17890625000004, -11.954492187499964]]], [[[142.2748046875, -10.704785156250011], [142.19140624999994, -10.762011718750031], [142.13720703125003, -10.731933593749943], [142.12548828125, -10.668457031249986], [142.1310546875001, -10.640625], [142.19794921875004, -10.591992187500038], [142.2748046875, -10.704785156250011]]], [[[142.33896484375006, -10.192187500000031], [142.27939453125012, -10.25419921874996], [142.21621093750005, -10.235644531250001], [142.19511718750002, -10.199316406249977], [142.21875, -10.149414062500014], [142.29873046875, -10.14042968749996], [142.33896484375006, -10.192187500000031]]], [[[142.16757812500006, -10.154101562500003], [142.1419921875, -10.18125], [142.09765624999997, -10.121777343749983], [142.148828125, -10.051757812500014], [142.19199218750006, -10.085253906250003], [142.16757812500006, -10.154101562500003]]]]
    }
  }]
};
},{}],"script.js":[function(require,module,exports) {
"use strict";

var d3Selection = _interopRequireWildcard(require("d3-selection"));

var d3Geo = _interopRequireWildcard(require("d3-geo"));

var d3Interpolate = _interopRequireWildcard(require("d3-interpolate"));

var d3Transition = _interopRequireWildcard(require("d3-transition"));

var topojson = _interopRequireWildcard(require("topojson-client"));

var _canvasDpiScaler = _interopRequireDefault(require("canvas-dpi-scaler"));

var Papa = _interopRequireWildcard(require("papaparse"));

var _worldMap = _interopRequireDefault(require("./world-map.js"));

var _storyData = _interopRequireDefault(require("./story-data.js"));

var _ausStatesTopo = _interopRequireDefault(require("./aus-states.topo.json"));

var _ausLargerGeo = _interopRequireDefault(require("./aus-larger.geo.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Then combine them all into a single d3 var
var d3 = _objectSpread({}, d3Selection, {}, d3Geo, {}, d3Transition, {}, d3Interpolate);

var margin = 100;
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;
var currentRangeInKms = 163.518;
var previousRangeInKms = 0;
var currentLongLat = [133.15399233370441, -24.656909465155994];
// import fires from "./fires.json";
var world = topojson.feature(_worldMap.default, _worldMap.default.objects.land);
var land = topojson.feature(_ausStatesTopo.default, _ausStatesTopo.default.objects.states);
var globe = {
  type: "Sphere"
};
console.log(land);
var body = d3.select("body").style("background-color", "#f9f9f9").style("margin", 0);
var canvas = d3.select(".world").append("canvas").style("display", "block").attr("width", screenWidth).attr("height", screenHeight).classed("stage", true);
var projection = d3 // .geoMercator() // D3 Projection
.geoOrthographic() // .clipAngle(90) // Only display front side of the world
.rotate(invertLongLat(currentLongLat)).fitExtent( // Auto zoom
[[margin, margin], [screenWidth - margin, screenHeight - margin]], land.features[0]); // Context needed to draw on canvas

var context = canvas.node().getContext("2d"); // A non-d3 element selection for Retina dn High DPI scaling

var canvasEl = document.querySelector(".stage"); // Auto-convert canvas to Retina display and High DPI monitor scaling

(0, _canvasDpiScaler.default)(canvasEl, context);
var path = d3.geoPath().projection(projection).context(context).pointRadius(1); // Set the main point

var initialPoint = getItem("australia").longlat; // projection.rotate([-initialPoint[0], -initialPoint[1]]);
// A helper function to index an array of objects

function getItem(id) {
  return _storyData.default.find(function (item) {
    return item.id === id;
  });
}

var rangeCircle = d3.geoCircle().center(currentLongLat).radius(kmsToRadius(currentRangeInKms)); // Helper to turn kilometres into a D3 radius

function kmsToRadius(kms) {
  return kms / 111.319444; // This many kilometres per degree
}

Papa.parse("http://localhost:1234/7days.csv", {
  download: true,
  header: true,
  step: function step(row) {
    var fire = row.data;
    currentFireTime = fire.acq_time;
    fires.push(fire);

    if (previousFireTime === null || currentFireTime === previousFireTime) {
      fireGroup.push(fire);
      previousFireTime = currentFireTime;
    } else {
      fireGroups.push(fireGroup);
      fireGroup = [];
      previousFireTime = currentFireTime;
    }
  },
  complete: function complete() {
    console.log("All done!");
    var index = 0;
    var fps = 2;

    function repeatOften() {
      setTimeout(function () {
        console.log("Frame"); // drawWorld();

        if (index !== 0) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = fireGroups[index - 1][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var fire = _step.value;
              drawPoint([fire.longitude, fire.latitude], "#111111");
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = fireGroups[index][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _fire = _step2.value;
            drawPoint([_fire.longitude, _fire.latitude], "#FF4D00");
          } // drawPoint([fires[index].longitude, fires[index].latitude]);

        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        index++;
        if (index < fireGroups.length) requestAnimationFrame(repeatOften);
      }, 1000 / fps);
    }

    requestAnimationFrame(repeatOften);
  }
}); // Draw the inital state of the world

drawWorld();

function drawWorld() {
  // Clear the canvas ready for redraw
  // context.clearRect(0, 0, screenWidth, screenHeight);
  // Draw the oceans and the seas
  context.beginPath();
  context.lineWidth = 1.2;
  context.strokeStyle = "#B6CED6";
  context.fillStyle = "#E4EDF0";
  path(globe);
  context.fill();
  context.stroke(); // Draw all landmasses

  context.beginPath();
  context.strokeStyle = "darkgrey";
  context.fillStyle = "white";
  context.lineWidth = 1.1;
  path(_ausLargerGeo.default);
  context.fill();
  context.stroke(); // Draw circle launch radius
  // context.beginPath();
  // context.strokeStyle = "#FF6100";
  // context.globalAlpha = 0.1;
  // context.fillStyle = "#FF4D00";
  // context.lineWidth = 2.2;
  // path(rangeCircle());
  // context.fill();
  // context.globalAlpha = 1;
  // context.stroke();
  // Draw a circle outline around the world
  // First clear any radius around the outside

  context.beginPath();
  context.strokeStyle = "#f9f9f9";
  context.lineWidth = 12;
  path(globe); // context.stroke();
  // Draw a little circle a bit smaller radius
  // We mess with the scale then put it back
  // This is to hide the range border when past clipAngle

  context.beginPath();
  context.strokeStyle = "#B6CED6";
  context.lineWidth = 2;
  projection.scale(projection.scale() - 5);
  path(globe); // context.stroke();

  projection.scale(projection.scale() + 5);
}

var fires = [];
var fireGroups = [];
var fireGroup = [];
var previousFireTime = null;
var currentFireTime; // for (const fire of fires) {
//   currentFireTime = fire.acq_time;
//   if (previousFireTime === null || currentFireTime === previousFireTime) {
//     fireGroup.push(fire);
//     previousFireTime = currentFireTime;
//   } else {
//     fireGroups.push(fireGroup);
//     fireGroup = [];
//     previousFireTime = currentFireTime;
//   }
// }

function drawPoint(longlat, color) {
  // Draw some points
  context.beginPath(); // context.strokeStyle = color;

  context.globalAlpha = 0.3;
  context.fillStyle = color; // context.lineWidth = 2.2;
  // path(rangeCircle());

  path({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: longlat
    },
    properties: {
      name: "Fire"
    }
  });
  context.fill(); // context.globalAlpha = 1;
} // The story starts here


var currentStoryPosition = 0;
var storyPositionMax = _storyData.default.length; // Set initial global scale to handle zoom ins and outs

var initialGlobeScale = projection.scale();
body.on("keydown", function (e) {
  // Advance the story on keydown event
  console.log("Keycode: " + d3Selection.event.keyCode); // If back left arrow key go back one

  if (d3Selection.event.keyCode === 37) {
    currentStoryPosition--;
    if (currentStoryPosition < 0) currentStoryPosition = storyPositionMax - 1;
  } else {
    // Otherwise proceed
    currentStoryPosition++;
    if (currentStoryPosition >= storyPositionMax) currentStoryPosition = 0;
  } // Set ranges


  previousRangeInKms = currentRangeInKms;
  currentRangeInKms = _storyData.default[currentStoryPosition].range; // Set rotations

  var previousRotation = projection.rotate();
  var currentRotation = _storyData.default[currentStoryPosition].longlat; // Set scales

  var previousScale = projection.scale();
  var currentScale = initialGlobeScale * (_storyData.default[currentStoryPosition].scale / 100); // Set circle position

  var circlePos = _storyData.default[currentStoryPosition].longlat;
  rangeCircle.center(circlePos);
  console.log("Story position: " + currentStoryPosition);
  console.log(_storyData.default[currentStoryPosition].name);
  console.log("Missile range: " + currentRangeInKms);
  console.log("Earth's rotation: " + currentRotation);
  console.log("Zoom: " + currentScale);
  var dummyTransition = {};
  d3.select(dummyTransition).transition("transition").delay(0).duration(1000).tween("spinner", function () {
    var rotationInterpolate = d3.interpolate(previousRotation, [-currentRotation[0], -currentRotation[1], 0]);
    var radiusInterpolate = d3.interpolate(kmsToRadius(previousRangeInKms), kmsToRadius(currentRangeInKms));
    var scaleInterpolate = d3.interpolate(previousScale, currentScale); // Return the tween function

    return function (time) {
      projection.rotate(rotationInterpolate(time));
      rangeCircle.radius(radiusInterpolate(time));
      projection.scale(scaleInterpolate(time));
      drawWorld();
    };
  });
});

function invertLongLat(longlat) {
  return [-longlat[0], -longlat[1]];
}

function delayLoop(fn, delay) {
  return function (name, i) {
    setTimeout(function () {
      display(name);
    }, i * 1000);
  };
}
},{"d3-selection":"../node_modules/d3-selection/src/index.js","d3-geo":"../node_modules/d3-geo/src/index.js","d3-interpolate":"../node_modules/d3-interpolate/src/index.js","d3-transition":"../node_modules/d3-transition/src/index.js","topojson-client":"../node_modules/topojson-client/src/index.js","canvas-dpi-scaler":"../node_modules/canvas-dpi-scaler/canvas-dpi-scaler.js","papaparse":"../node_modules/papaparse/papaparse.min.js","./world-map.js":"world-map.js","./story-data.js":"story-data.js","./aus-states.topo.json":"aus-states.topo.json","./aus-larger.geo.json":"aus-larger.geo.json"}],"../../../.nvm/versions/node/v12.14.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64860" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../.nvm/versions/node/v12.14.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map