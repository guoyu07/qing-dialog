template = require './template.coffee'

class QingDialog extends QingModule

  @opts:
    content: null
    width: 600
    modal: true
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
    @el = $ template
    @wrapper = @el.find '.wrapper'
    @contentWrapper = @wrapper.find '.content'

    @_setup()
    @el.appendTo 'body'
    @_show()

  _bind: ->
    @el
      .on 'click', (e) =>
        @remove() if $(e.target).is('.qing-dialog') && @opts.modal
      .on 'click', '.close-button', =>
        @remove()

    $(document).on "keydown.qing-dialog-#{@id}", (e) =>
      @remove() if e.which is 27

  _setup: ->
    @el.addClass @opts.cls if @opts.cls
    @el.addClass 'modal' if @opts.modal
    @el.addClass 'fullscreen' if @opts.fullscreen

    @setContent @opts.content
    @setWidth @opts.width

  _show: ->
    $('body').addClass 'qing-dialog-open'
    @el.show() and forceReflow(@el)

    if @opts.modal
      @el.addClass('in').one 'transitionend', =>
        @el.addClass 'open'
    else
      @el.addClass 'open'

  remove: ->
    @el.removeClass('open')
    @wrapper.on 'transitionend', =>
      if @opts.modal
        setTimeout =>
          @el.removeClass('in').one 'transitionend', => @_cleanup()
        , 0
      else
        @_cleanup()

  setContent: (content) ->
    @contentWrapper.html content

  setWidth: (width) ->
    @wrapper.css 'width', width unless @opts.fullscreen

  _cleanup: ->
    @trigger 'remove'
    @el.remove().removeData 'qingDialog'

    $(document).off "keydown.qing-dialog-#{@id}"
    $('body').removeClass 'qing-dialog-open'

forceReflow = ($el) ->
  el = if $el instanceof $ then $el[0] else $el
  el.offsetHeight

module.exports = QingDialog
