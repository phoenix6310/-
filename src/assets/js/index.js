// import axios from 'axios';

const axios = require('axios')

var server = false;
var domaindata = {};
if (server) {
  domaindata.protocol = window.location.protocol;
  domaindata.host = window.location.host;
  domaindata.urlArr = [domaindata.protocol, '//', domaindata.host, '/'];
  domaindata.rps_url = domaindata.urlArr.join('')
} else {
  //    domaindata.rps_url = 'http://172.19.24.133:35092/'
  domaindata.rps_url = 'https://test-yi005.weilian.cn/mes/rps/'
}



function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var result = window.location.search.substr(1).match(reg);
  return result ? decodeURIComponent(result[2]) : null;
}

function getSuffix(fullName){
  let index = fullName.lastIndexOf('.');
  return fullName.substring(index+1)
}


function getFileType(fullName){
  var fileSuffix = getSuffix(fullName)
  switch (fileSuffix) {
    case "xls":
    case "xlsx":
      return "xls";
      break;
    case "doc":
    case "docx":
      return "word";
      break;
    case "zip":
      return "rar";
      break;
    case "png":
      return "pic";
      break;
    default:
      return "mark";
  }
}

const rpsParams = {
  aliasName: getUrlParam('aliasName') || '刘伯',
  id: getUrlParam('id') || '1064467478555607040',  //   代签收：1064467478555607040  办理中：1064466337725890560  1072749
  enterpriseId: getUrlParam('enterpriseId') || 55,
  taskId: getUrlParam('taskId') || '1072761'
}

const instance = axios.create({
  baseURL: domaindata.rps_url,
  timeout: 10000
})

instance.defaults.headers.post['Content-Type'] = 'application/json';

//ajax错误处理
const catchError = function (error) {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        Vue.prototype.$message({
          message: error.response.data.message || '请求参数异常',
          type: 'error'
        });
        break;
      case 403:
        Vue.prototype.$message({
          message: error.response.data.message || '无访问权限，请联系企业管理员',
          type: 'warning'
        });
        break;
      default:
        Vue.prototype.$message({
          message: error.response.data.message || '服务端异常，请联系技术支持',
          type: 'error'
        });
    }
  }
  return Promise.reject(error);
}

//错误处理
instance.interceptors.response.use(function (response) {
  return response;
}, catchError);

//fgnass.github.com/spin.js#v1.2.7
! function (e, t, n) {
  function o(e, n) {
    var r = t.createElement(e || "div"),
      i;
    for (i in n) r[i] = n[i];
    return r
  }

  function u(e) {
    for (var t = 1, n = arguments.length; t < n; t++) e.appendChild(arguments[t]);
    return e
  }

  function f(e, t, n, r) {
    var o = ["opacity", t, ~~(e * 100), n, r].join("-"),
      u = .01 + n / r * 100,
      f = Math.max(1 - (1 - e) / t * (100 - u), e),
      l = s.substring(0, s.indexOf("Animation")).toLowerCase(),
      c = l && "-" + l + "-" || "";
    return i[o] || (a.insertRule("@" + c + "keyframes " + o + "{" + "0%{opacity:" + f + "}" + u + "%{opacity:" + e + "}" + (u + .01) + "%{opacity:1}" + (u + t) % 100 + "%{opacity:" + e + "}" + "100%{opacity:" + f + "}" + "}", a.cssRules.length), i[o] = 1), o
  }

  function l(e, t) {
    var i = e.style,
      s, o;
    if (i[t] !== n) return t;
    t = t.charAt(0).toUpperCase() + t.slice(1);
    for (o = 0; o < r.length; o++) {
      s = r[o] + t;
      if (i[s] !== n) return s
    }
  }

  function c(e, t) {
    for (var n in t) e.style[l(e, n) || n] = t[n];
    return e
  }

  function h(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var i in r) e[i] === n && (e[i] = r[i])
    }
    return e
  }

  function p(e) {
    var t = {
      x: e.offsetLeft,
      y: e.offsetTop
    };
    while (e = e.offsetParent) t.x += e.offsetLeft, t.y += e.offsetTop;
    return t
  }

  var r = ["webkit", "Moz", "ms", "O"],
    i = {},
    s, a = function () {
      var e = o("style", {
        type: "text/css"
      });
      return u(t.getElementsByTagName("head")[0], e), e.sheet || e.styleSheet
    }(),
    d = {
      lines: 12,
      length: 7,
      width: 5,
      radius: 10,
      rotate: 0,
      corners: 1,
      color: "#000",
      speed: 1,
      trail: 100,
      opacity: .25,
      fps: 20,
      zIndex: 2e9,
      className: "spinner",
      top: "auto",
      left: "auto",
      position: "relative"
    },
    v = function m(e) {
      if (!this.spin) return new m(e);
      this.opts = h(e || {}, m.defaults, d)
    };
  v.defaults = {}, h(v.prototype, {
      spin: function (e) {
        this.stop();
        var t = this,
          n = t.opts,
          r = t.el = c(o(0, {
            className: n.className
          }), {
            position: n.position,
            width: 0,
            zIndex: n.zIndex
          }),
          i = n.radius + n.length + n.width,
          u, a;
        e && (e.insertBefore(r, e.firstChild || null), a = p(e), u = p(r), c(r, {
          left: (n.left == "auto" ? a.x - u.x + (e.offsetWidth >> 1) : parseInt(n.left, 10) + i) + "px",
          top: (n.top == "auto" ? a.y - u.y + (e.offsetHeight >> 1) : parseInt(n.top, 10) + i) + "px"
        })), r.setAttribute("aria-role", "progressbar"), t.lines(r, t.opts);
        if (!s) {
          var f = 0,
            l = n.fps,
            h = l / n.speed,
            d = (1 - n.opacity) / (h * n.trail / 100),
            v = h / n.lines;
          (function m() {
            f++;
            for (var e = n.lines; e; e--) {
              var i = Math.max(1 - (f + e * v) % h * d, n.opacity);
              t.opacity(r, n.lines - e, i, n)
            }
            t.timeout = t.el && setTimeout(m, ~~(1e3 / l))
          })()
        }
        return t
      },
      stop: function () {
        var e = this.el;
        return e && (clearTimeout(this.timeout), e.parentNode && e.parentNode.removeChild(e), this.el = n), this
      },
      lines: function (e, t) {
        function i(e, r) {
          return c(o(), {
            position: "absolute",
            width: t.length + t.width + "px",
            height: t.width + "px",
            background: e,
            boxShadow: r,
            transformOrigin: "left",
            transform: "rotate(" + ~~(360 / t.lines * n + t.rotate) + "deg) translate(" + t.radius + "px" + ",0)",
            borderRadius: (t.corners * t.width >> 1) + "px"
          })
        }

        var n = 0,
          r;
        for (; n < t.lines; n++) r = c(o(), {
          position: "absolute",
          top: 1 + ~(t.width / 2) + "px",
          transform: t.hwaccel ? "translate3d(0,0,0)" : "",
          opacity: t.opacity,
          animation: s && f(t.opacity, t.trail, n, t.lines) + " " + 1 / t.speed + "s linear infinite"
        }), t.shadow && u(r, c(i("#000", "0 0 4px #000"), {
          top: "2px"
        })), u(e, u(r, i(t.color, "0 0 1px rgba(0,0,0,.1)")));
        return e
      },
      opacity: function (e, t, n) {
        t < e.childNodes.length && (e.childNodes[t].style.opacity = n)
      }
    }),
    function () {
      function e(e, t) {
        return o("<" + e + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', t)
      }

      var t = c(o("group"), {
        behavior: "url(#default#VML)"
      });
      !l(t, "transform") && t.adj ? (a.addRule(".spin-vml", "behavior:url(#default#VML)"), v.prototype.lines = function (t, n) {
        function s() {
          return c(e("group", {
            coordsize: i + " " + i,
            coordorigin: -r + " " + -r
          }), {
            width: i,
            height: i
          })
        }

        function l(t, i, o) {
          u(a, u(c(s(), {
            rotation: 360 / n.lines * t + "deg",
            left: ~~i
          }), u(c(e("roundrect", {
            arcsize: n.corners
          }), {
            width: r,
            height: n.width,
            left: n.radius,
            top: -n.width >> 1,
            filter: o
          }), e("fill", {
            color: n.color,
            opacity: n.opacity
          }), e("stroke", {
            opacity: 0
          }))))
        }

        var r = n.length + n.width,
          i = 2 * r,
          o = -(n.width + n.length) * 2 + "px",
          a = c(s(), {
            position: "absolute",
            top: o,
            left: o
          }),
          f;
        if (n.shadow)
          for (f = 1; f <= n.lines; f++) l(f, -2, "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");
        for (f = 1; f <= n.lines; f++) l(f);
        return u(t, a)
      }, v.prototype.opacity = function (e, t, n, r) {
        var i = e.firstChild;
        r = r.shadow && r.lines || 0, i && t + r < i.childNodes.length && (i = i.childNodes[t + r], i = i && i.firstChild, i = i && i.firstChild, i && (i.opacity = n))
      }) : s = l(t, "animation")
    }(), typeof define == "function" && define.amd ? define(function () {
      return v
    }) : e.Spinner = v
}(window, document);

var rpsObj = {
  addLoading: function (target) {
    var opts = {
      lines: 11, // The number of lines to draw
      length: 7, // The length of each line
      width: 4, // The line thickness
      radius: 11, // The radius of the inner circle
      corners: 1, // Corner roundness (0..1)
      rotate: 0, // The rotation offset
      color: '#000', // #rgb or #rrggbb
      speed: 0.7, // Rounds per second
      trail: 42, // Afterglow percentage
      shadow: false, // Whether to render a shadow
      hwaccel: false, // Whether to use hardware acceleration
      className: 'spinner', // The CSS class to assign to the spinner
      zIndex: 2e9, // The z-index (defaults to 2000000000)
      top: 'auto', // Top position relative to parent in px
      left: 'auto' // Left position relative to parent in px
    };
    var _target = document.createElement('div');
    _target.setAttribute('id', 'rps_loading');

    if (!target) {
      _target.style.width = '100%';
      _target.style.height = '100%';
      _target.style.backgroundColor = '#fff';
      _target.style.position = 'absolute';
      _target.style.top = 0;
      _target.style.zIndex = 11111;

      document.querySelector('body').append(_target);
    } else {
      _target = document.querySelector("#" + target)
    }
    var spinner = new Spinner(opts).spin(_target);
  },
  showLoading: function (target) {
    var wrapper = this.wrapperEl(target);
    if (!target) {
      if (!wrapper) {
        this.addLoading()
      } else {
        wrapper.style.display = 'block'
      }
    } else {
      this.addLoading(target)
    }
  },
  closeLoading: function (target) {
    var wrapper = this.wrapperEl(target);
    var wrapperParent = wrapper.parentNode
    if (!target) {
      wrapperParent.removeChild(wrapper)
    } else {
      wrapper.style.display = 'none'
    }
  },
  wrapperEl: function (target) {
    return target ? document.querySelector("#" + target) : document.querySelector("#rps_loading")
  }
};



export {
  instance,
  rpsObj, // 添加loading
  getUrlParam, // 得到url后边的参数
  getSuffix,  // 得到文件名的后缀
  getFileType, // 根据文件名后缀得到文件类型,还不够完整  比如 doc -> word
  rpsParams
};
