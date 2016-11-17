template = require './template.coffee'

class QingDialog extends QingModule
  name: 'QingDialog'

  @opts:
    content: null
    width: 600
    modal: true
    cls: null
    fullscreen: false
    appendTo: 'body'
    renderer: null

  @count: 0

  @removeAll: ->
    $('.qing-dialog').each (_, el) ->
      $(el).data('qingDialog')?.destroy()

  _setOptions: (opts) ->
    super
    $.extend @opts, QingDialog.opts, opts

  _init: ->
    if @opts.content is null
      throw new Error 'QingDialog: option content is required'

    if (@el = $ '.qing-dialog').length
      @_rerender()
      @_unbind()
    else
      @_render()

    @id = ++QingDialog.count
    @_bind()
    @el.data 'qingDialog', @

    if $.isFunction @opts.renderer
      @opts.renderer.call @, @wrapper, @

  _render: ->
    @el = $ template
    @wrapper = @el.find '.qing-dialog-wrapper'
    @content = @el.find '.qing-dialog-content'

    @_setup()
    @el.appendTo @opts.appendTo
    @_show()

  _rerender: ->
    previousDialog = @el.data 'qingDialog'
    @wrapper = previousDialog.wrapper
    @content = previousDialog.content
    @el.removeClass "#{previousDialog.opts.cls} modal fullscreen"
    @_setup()

  _bind: ->
    @el
      .on 'click', (e) =>
        @remove() if $(e.target).is('.qing-dialog') && @opts.modal
      .on 'click', '.close-button', =>
        @remove()
      .on 'wheel', (e) =>
        e.stopPropagation()

    $(document).on "keydown.qing-dialog-#{@id}", (e) =>
      @remove() if e.which is 27

    $(window).on "resize.qing-dialog-#{@id}", =>
      @_setMaxHeight()

  _setup: ->
    @el.addClass @opts.cls if @opts.cls
    @el.addClass 'modal' if @opts.modal
    @el.addClass 'fullscreen' if @opts.fullscreen

    @setContent @opts.content
    @setWidth @opts.width
    @_setMaxHeight()

  _show: ->
    $('body').addClass 'qing-dialog-open'
    @el.show() and forceReflow(@el)
    @el.addClass 'open'

  remove: (callback) ->
    @el.removeClass('open')
    @wrapper.one 'transitionend', => @destroy(callback)

  setContent: (content) ->
    @content.empty()
    @content.append $(content)

  setWidth: (width) ->
    @wrapper.css 'width', width unless @opts.fullscreen

  _setMaxHeight: ->
    unless @opts.fullscreen
      @wrapper.css 'maxHeight', document.documentElement.clientHeight - 40

  _unbind: ->
    @el.off()
    $(document).off "keydown.qing-dialog-#{@id}"
    $(window).off "resize.qing-dialog-#{@id}"

  destroy: (callback) ->
    @trigger 'before-destroy'
    @el.remove().removeData 'qingDialog'
    @_unbind()
    $('body').removeClass 'qing-dialog-open'
    callback?()
    @trigger 'destroy'

forceReflow = ($el) ->
  el = if $el instanceof $ then $el[0] else $el
  el.offsetHeight

module.exports = QingDialog
