(function () {

  var Model = hd.model(function Model() {
    this.a = hd.variable(1);
    this.b = hd.variable(2);
    this.sum = hd.variable();

    hd.constraint()
      .method(this.a, function () {
        return this.sum() - this.b();
      })
      .method(this.b, function () {
        return this.sum() - this.a();
      })
      .method(this.sum, function () {
        return this.a() + this.b();
      });
  });

  module("pinning", {
    setup: function () {
      this.model = new Model();
    }
  });

  test("test initialized correctly", function () {
    expect(3);

    strictEqual(this.model.a(), 1,
      "a initialized");
    strictEqual(this.model.b(), 2,
      "b initialized");
    strictEqual(this.model.sum(), 3,
      "sum computed");
  });

  test("pinning should permit user edit", function () {
    expect(3);

    this.model.a.pin(true);
    this.model.a(2);
    hd.update();

    strictEqual(this.model.a(), 2,
      "edited variable (a) unchanged");
    strictEqual(this.model.b(), 2,
      "b unchanged");
    strictEqual(this.model.sum(), 4,
      "sum recomputed");
  });

  test("pinning should redirect flow", function () {
    expect(9);

    this.model.sum.pin(true);
    this.model.b(3);
    hd.update();

    strictEqual(this.model.sum(), 3,
      "pinned variable (sum) unchanged");
    strictEqual(this.model.b(), 3,
      "edited variable (b) unchanged");
    strictEqual(this.model.a(), 0,
      "third variable (a) computed");

    this.model.a(2);
    hd.update();

    strictEqual(this.model.sum(), 3,
      "pinned variable (sum) unchanged");
    strictEqual(this.model.a(), 2,
      "edited variable (a) unchanged");
    strictEqual(this.model.b(), 1,
      "third variable (b) computed");

    this.model.sum(5);
    hd.update();

    strictEqual(this.model.sum(), 5,
      "pinned variable (sum) unchanged");
    strictEqual(this.model.a(), 2,
      "more-recently-edited variable (a) unchanged");
    strictEqual(this.model.b(), 3,
      "third variable (b) computed");
  });

}());

