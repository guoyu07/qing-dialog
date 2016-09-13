QingDialog = require '../src/qing-dialog'
expect = chai.expect

describe 'QingDialog', ->

  $el = null
  qingDialog = null

  before ->
    $el = $('<div class="test-el"></div>').appendTo 'body'

  after ->
    $el.remove()
    $el = null

  beforeEach ->
    qingDialog = new QingDialog
      el: '.test-el'

  afterEach ->
    qingDialog.destroy()
    qingDialog = null

  it 'should inherit from QingModule', ->
    expect(qingDialog).to.be.instanceof QingModule
    expect(qingDialog).to.be.instanceof QingDialog

  it 'should throw error when element not found', ->
    spy = sinon.spy QingDialog
    try
      new spy
        el: '.not-exists'
    catch e

    expect(spy.calledWithNew()).to.be.true
    expect(spy.threw()).to.be.true
