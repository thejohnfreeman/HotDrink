<?php

$model = <<<EOS
var model = {
  name:   "James Bond",
  actors: [
    { name: "Sean Connery" },
    { name: "Pierce Brosnan" },
    { name: "Daniel Craig", latest: true }
  ]
};

$(function () {
  hd.bind(model);
});
EOS;

$view = <<<EOS
<p>
  <span data-bind="text: name"></span> has been played by:
</p>
<ul data-bind="foreach: actors">
  <li>
    <span data-bind="text: name"></span><span data-bind="ifnot: latest">, and</span>
  </li>
</ul>
EOS;

include "template.php";

