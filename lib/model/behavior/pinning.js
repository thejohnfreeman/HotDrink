(function () {

  var runtime   = hd.__private.runtime;

  hd.__private.Variable.prototype.pin = function pin(truthy) {
    ASSERT(this.cellType == "interface",
      "can pin only interface variables, not " + this.cellType);
    this.isPinned = !!truthy;
    this.draft("isPinned", !!truthy);
  };

  hd.proxy.pin = function pin(truthy) {
    var vv = this.unwrap();
    vv.pin(truthy);
    /* No touching? */
    runtime.touch(vv);
  };

}());

