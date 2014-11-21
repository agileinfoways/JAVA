$(function() {

  var console = window.console || {log: function () {}};

  // Overview
  // -------------------------------------------------------------------------

  (function() {
    var $image = $(".eg-wrapper img"),
        $dataX = $("#dataX"),
        $dataY = $("#dataY"),
        $dataHeight = $("#dataHeight"),
        $dataWidth = $("#dataWidth"),
        options = {
          aspectRatio: 1,
          data: {
            x: 480,
            y: 60,
            width: 640,
            height: 360
          },
          preview: ".img-preview",
          done: function(data) {
            $dataX.val(data.x);
            $dataY.val(data.y);
            $dataHeight.val(data.height);
            $dataWidth.val(data.width);
          }
        };

    $image.cropper(options).on({
      "build.cropper": function(e) {
        console.log(e.type);
      },
      "built.cropper": function(e) {
        console.log(e.type);
      }
    });

    $(document).on("click", "[data-method]", function () {
      var data = $(this).data();

      if (data.method) {
        $image.cropper(data.method, data.option);
      }
    });

    var $inputImage = $("#inputImage");

    if (window.FileReader) {

      $inputImage.change(function() {
        var fileReader = new FileReader(),
            files = this.files,
            file;

        if (files.length) {
          file = files[0];

          if (/^image\/\w+$/.test(file.type)) {
            fileReader.readAsDataURL(file);
            fileReader.onload = function () {
              console.log($image);
              $image.cropper("reset", true).cropper("replace", this.result);
            };
          }
        }
      });
    } else {
      $inputImage.addClass("hide");
    }

    $("#download").click(function() {
      window.open($image.cropper("getDataURL"));
    });

    var $zoomWith = $("#zoomWith");

    $("#zoom").click(function() {
      $image.cropper("zoom", $zoomWith.val());
    });


    var $rotateWith = $("#rotateWith");

    $("#rotate").click(function() {
      $image.cropper("rotate", $rotateWith.val());
    });


    var $getDataInto = $("#getDataInto");

    $("#getData").click(function() {
      var data = $image.cropper("getData"),
          val = "";

      try {
        val = JSON.stringify(data);
      } catch (e) {
        console.log(data);
      }

      $getDataInto.val(val);
    });


    var $setDataX = $("#setDataX"),
        $setDataY = $("#setDataY"),
        $setDataWidth = $("#setDataWidth"),
        $setDataHeight = $("#setDataHeight");

    $("#setData").click(function() {
      var data = {
            x: $setDataX.val(),
            y: $setDataY.val(),
            width: $setDataWidth.val(),
            height: $setDataHeight.val()
          };

      $image.cropper("setData", data);
    });


    var $setAspectRatioWith = $("#setAspectRatioWith");

    $("#setAspectRatio").click(function() {
      $image.cropper("setAspectRatio", $setAspectRatioWith.val());
    });


    var $replaceWith = $("#replaceWith");

    $("#replace").click(function() {
      $image.cropper("replace", $replaceWith.val());
    });


    var $getImageDataInto = $("#getImageDataInto");

    $("#getImageData").click(function() {
      var data = $image.cropper("getImageData"),
          val = "";

      try {
        val = JSON.stringify(data);
      } catch (e) {
        console.log(data);
      }

      $getImageDataInto.val(val);
    });


    var $dataURLInto = $("#dataURLInto"),
        $dataURLView = $("#dataURLView");

    $("#getDataURL").click(function() {
      var dataURL = $image.cropper("getDataURL");

      $dataURLInto.text(dataURL);
      $dataURLView.html('<img src="' + dataURL + '">');
    });

    $("#getDataURL2").click(function() {
      var dataURL = $image.cropper("getDataURL", "image/jpeg");

      $dataURLInto.text(dataURL);
      $dataURLView.html('<img src="' + dataURL + '">');
    });

    $(".docs-options :radio").on("change", function (e) {
      var $this = $(this);

      if ($this.is(":checked")) {
        options[$this.attr("name")] = $this.val() === "true" ? true : false;
        $image.cropper("destroy").cropper(options);
      }
    });

    $("[data-toggle='tooltip']").tooltip();
  }());

  // Sidebar
  // -------------------------------------------------------------------------

  (function() {
    var $sidebar = $(".docs-sidebar"),
        offset = $sidebar.offset();
        offsetTop = offset.top;
        mainHeight = $sidebar.parents(".row").height() - $sidebar.height();

    $(window).bind("scroll", function() {
      var st = $(this).scrollTop();

      if (st > offsetTop && (st - offsetTop) < mainHeight) {
        $sidebar.addClass("fixed");
      } else {
        $sidebar.removeClass("fixed");
      }
    });
  }());

  // Examples
  // -------------------------------------------------------------------------

  // Example 1

});
