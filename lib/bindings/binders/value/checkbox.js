(function () {

  var common = hd.__private.bindings;

  var write = function writeCheckbox(view, value) {
    ASSERT(view instanceof jQuery, "expected jQuery object");
    ASSERT(typeof value === "boolean",
      "expected boolean value for checkbox; got " + typeof value);
    view.prop("checked", value);
  };

  var onChange = function onChangeCheckbox(view, listener) {
    ASSERT(view instanceof jQuery, "expected jQuery object");
    /* keyup instead of keypress, otherwise we'll read the
     * value before the user's edit. */
    view.on("click keyup", listener);
  };

  var read = function readCheckbox(view) {
    ASSERT(view instanceof jQuery, "expected jQuery object");
    return { value: view.prop("checked") };
  };

  hd.binders["checkbox"] = common.binder({
    write:    write,
    onChange: onChange,
    read:     read
  });

  /* Would like to split this out into pin.js, but need to reuse above
   * checkbox helpers. */

  hd.binders["pin"] = function bindPin(view, variable) {
    ASSERT(hd.isVariable(variable) &&
      variable.unwrap().cellType === "interface",
      "can only pin interface variables");

    onChange(view, function () {
      variable.pin(read(view).value);
    });

    variable.subscribe("isPinned", function () {
      write(view, variable.unwrap().isPinned);
    });
  };

}());

