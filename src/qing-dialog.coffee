template = require './template.coffee'

class QingDialog extends QingModule

  @opts:
    content: null
    width: 600
    backdrop: true
    cls: null
    fullscreen: false

  @count: 0

  @removeAll: ->
    $('.qing-dialog').each (_, el) ->
      $(el).data('qingDialog')?._cleanup()

  constructor: (opts) ->
    super
    $.extend @opts, QingDialog.opts, opts

    if @opts.content is null
      throw new Error 'QingDialog: option content is required'

    @id = ++QingDialog.count
    QingDialog.removeAll()

    @_render()
    @_bind()
    @el.data 'qingDialog', @

  _render: ->
    @el = $ template.dialog
    @wrapper = @el.find '.wrapper'
    @contentWrapper = @wrapper.find '.content'

    @el.addClass @opts.cls if @opts.cls
    @el.addClass 'fullscreen' if @opts.fullscreen
    @setContent @opts.content
    @setWidth @opts.width

    $('body').addClass 'qing-dialog-open'
    @_showBackdrop => @_showDialog()

  _bind: ->
    @el.on 'click', (e) =>
      @remove() if $(e.target).is('.qing-dialog') && @opts.backdrop

    $(document).on "keydown.qing-dialog-#{@id}", (e) =>
      @remove() if e.which is 27

  _showDialog: ->
    @el.appendTo('body').addClass('show').scrollTop 0
    forceReflow(@el) and @el.addClass 'open'

  _showBackdrop: (callback) ->
    if @opts.backdrop
      @backdrop = $(template.backdrop).appendTo 'body'
      forceReflow(@backdrop) and @backdrop.addClass 'open'
      @backdrop.one 'transitionend', callback
    else
      callback()

  remove: ->
    @_hideDialog => @_hideBackdrop => @_cleanup()

  _hideDialog: (callback) ->
    @el.removeClass('open') and forceReflow(@el)
    @el.on 'transitionend', =>
      @el.removeClass 'show'
      callback()

  _hideBackdrop: (callback) ->
    if @opts.backdrop
      @backdrop.removeClass 'open'
      @backdrop.one 'transitionend', callback
    else
      callback()

  setContent: (content) ->
    @contentWrapper.html content

  setWidth: (width) ->
    @wrapper.css 'width', width unless @opts.fullscreen

  _cleanup: ->
    @trigger 'remove'
    @el.remove().removeData 'qingDialog'
    @backdrop?.remove()

    $(document).off "keydown.qing-dialog-#{@id}"
    $('body').removeClass 'qing-dialog-open'

forceReflow = ($el) ->
  el = if $el instanceof $ then $el[0] else $el
  el.offsetHeight
  true

module.exports = QingDialog
