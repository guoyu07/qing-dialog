/**
 * qing-dialog v0.0.1
 * http://mycolorway.github.io/qing-dialog
 *
 * Copyright Mycolorway Design
 * Released under the MIT license
 * http://mycolorway.github.io/qing-dialog/license.html
 *
 * Date: 2016-09-13
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
var backdrop, dialog;

backdrop = "<div class=\"qing-dialog-backdrop\"></div>";

dialog = "<div class=\"qing-dialog\">\n  <div class=\"wrapper\">\n    <div class=\"content\"></div>\n  </div>\n</div>";

module.exports = {
  backdrop: backdrop,
  dialog: dialog
};

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
    backdrop: true,
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
    this.el = $(template.dialog);
    this.wrapper = this.el.find('.wrapper');
    this.contentWrapper = this.wrapper.find('.content');
    if (this.opts.cls) {
      this.el.addClass(this.opts.cls);
    }
    if (this.opts.fullscreen) {
      this.el.addClass('fullscreen');
    }
    this.setContent(this.opts.content);
    this.setWidth(this.opts.width);
    $('body').addClass('qing-dialog-open');
    return this._showBackdrop((function(_this) {
      return function() {
        return _this._showDialog();
      };
    })(this));
  };

  QingDialog.prototype._bind = function() {
    this.el.on('click', (function(_this) {
      return function(e) {
        if ($(e.target).is('.qing-dialog') && _this.opts.backdrop) {
          return _this.remove();
        }
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

  QingDialog.prototype._showDialog = function() {
    this.el.appendTo('body').addClass('show').scrollTop(0);
    return forceReflow(this.el) && this.el.addClass('open');
  };

  QingDialog.prototype._showBackdrop = function(callback) {
    if (this.opts.backdrop) {
      this.backdrop = $(template.backdrop).appendTo('body');
      forceReflow(this.backdrop) && this.backdrop.addClass('open');
      return this.backdrop.one('transitionend', callback);
    } else {
      return callback();
    }
  };

  QingDialog.prototype.remove = function() {
    return this._hideDialog((function(_this) {
      return function() {
        return _this._hideBackdrop(function() {
          return _this._cleanup();
        });
      };
    })(this));
  };

  QingDialog.prototype._hideDialog = function(callback) {
    this.el.removeClass('open') && forceReflow(this.el);
    return this.el.on('transitionend', (function(_this) {
      return function() {
        _this.el.removeClass('show');
        return callback();
      };
    })(this));
  };

  QingDialog.prototype._hideBackdrop = function(callback) {
    if (this.opts.backdrop) {
      this.backdrop.removeClass('open');
      return this.backdrop.one('transitionend', callback);
    } else {
      return callback();
    }
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
    var ref;
    this.trigger('remove');
    this.el.remove().removeData('qingDialog');
    if ((ref = this.backdrop) != null) {
      ref.remove();
    }
    $(document).off("keydown.qing-dialog-" + this.id);
    return $('body').removeClass('qing-dialog-open');
  };

  return QingDialog;

})(QingModule);

forceReflow = function($el) {
  var el;
  el = $el instanceof $ ? $el[0] : $el;
  el.offsetHeight;
  return true;
};

module.exports = QingDialog;

},{"./template.coffee":1}]},{},[]);

return b('qing-dialog');
}));
