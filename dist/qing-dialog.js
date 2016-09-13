/**
 * qing-dialog v0.0.1
 * http://mycolorway.github.io/qing-dialog
 *
 * Copyright Mycolorway Design
 * Released under the MIT license
 * http://mycolorway.github.io/qing-dialog/license.html
 *
 * Date: 2016-09-14
 */
;(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('jquery'),require('qing-module'));
  } else {
    root.QingDialog = factory(root.jQuery,root.QingModule);
  }
}(this, function ($,QingModule) {
var define, module, exports;
var b = require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = "<div class=\"qing-dialog\">\n  <div class=\"wrapper\">\n    <div class=\"content\"></div>\n    <a href=\"javascript:;\" class=\"close-button\">\n      <span>&times;</span>\n    </a>\n  </div>\n</div>";

},{}],"qing-dialog":[function(require,module,exports){
var QingDialog, forceReflow, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

template = require('./template.coffee');

QingDialog = (function(superClass) {
  extend(QingDialog, superClass);

  QingDialog.opts = {
    content: null,
    width: 600,
    modal: true,
    cls: null,
    fullscreen: false
  };

  QingDialog.count = 0;

  QingDialog.removeAll = function() {
    return $('.qing-dialog').each(function(_, el) {
      var ref;
      return (ref = $(el).data('qingDialog')) != null ? ref._cleanup() : void 0;
    });
  };

  function QingDialog(opts) {
    QingDialog.__super__.constructor.apply(this, arguments);
    $.extend(this.opts, QingDialog.opts, opts);
    if (this.opts.content === null) {
      throw new Error('QingDialog: option content is required');
    }
    this.id = ++QingDialog.count;
    QingDialog.removeAll();
    this._render();
    this._bind();
    this.el.data('qingDialog', this);
  }

  QingDialog.prototype._render = function() {
    this.el = $(template);
    this.wrapper = this.el.find('.wrapper');
    this.contentWrapper = this.wrapper.find('.content');
    this._setup();
    this.el.appendTo('body');
    return this._show();
  };

  QingDialog.prototype._bind = function() {
    this.el.on('click', (function(_this) {
      return function(e) {
        if ($(e.target).is('.qing-dialog') && _this.opts.modal) {
          return _this.remove();
        }
      };
    })(this)).on('click', '.close-button', (function(_this) {
      return function() {
        return _this.remove();
      };
    })(this));
    return $(document).on("keydown.qing-dialog-" + this.id, (function(_this) {
      return function(e) {
        if (e.which === 27) {
          return _this.remove();
        }
      };
    })(this));
  };

  QingDialog.prototype._setup = function() {
    if (this.opts.cls) {
      this.el.addClass(this.opts.cls);
    }
    if (this.opts.modal) {
      this.el.addClass('modal');
    }
    if (this.opts.fullscreen) {
      this.el.addClass('fullscreen');
    }
    this.setContent(this.opts.content);
    return this.setWidth(this.opts.width);
  };

  QingDialog.prototype._show = function() {
    $('body').addClass('qing-dialog-open');
    this.el.show() && forceReflow(this.el);
    if (this.opts.modal) {
      return this.el.addClass('in').one('transitionend', (function(_this) {
        return function() {
          return _this.el.addClass('open');
        };
      })(this));
    } else {
      return this.el.addClass('open');
    }
  };

  QingDialog.prototype.remove = function() {
    this.el.removeClass('open');
    return this.wrapper.on('transitionend', (function(_this) {
      return function() {
        if (_this.opts.modal) {
          return setTimeout(function() {
            return _this.el.removeClass('in').one('transitionend', function() {
              return _this._cleanup();
            });
          }, 0);
        } else {
          return _this._cleanup();
        }
      };
    })(this));
  };

  QingDialog.prototype.setContent = function(content) {
    return this.contentWrapper.html(content);
  };

  QingDialog.prototype.setWidth = function(width) {
    if (!this.opts.fullscreen) {
      return this.wrapper.css('width', width);
    }
  };

  QingDialog.prototype._cleanup = function() {
    this.trigger('remove');
    this.el.remove().removeData('qingDialog');
    $(document).off("keydown.qing-dialog-" + this.id);
    return $('body').removeClass('qing-dialog-open');
  };

  return QingDialog;

})(QingModule);

forceReflow = function($el) {
  var el;
  el = $el instanceof $ ? $el[0] : $el;
  return el.offsetHeight;
};

module.exports = QingDialog;

},{"./template.coffee":1}]},{},[]);

return b('qing-dialog');
}));
