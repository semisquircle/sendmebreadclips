$(".bread-clip").eq(0).load("img/clips/svgs/2.svg");
$(".bread-clip").eq(1).load("img/clips/svgs/1.svg");
$(".bread-clip").eq(2).load("img/clips/svgs/3.svg");

$(".how-img").eq(0).load("img/icons/bread-clipboard.svg");
$(".how-img").eq(1).load("img/icons/email-notif.svg");
$(".how-img").eq(2).load("img/icons/clip-envelope.svg");


const SVG_NS = "http://www.w3.org/2000/svg";
const breadData = "M 49.999512,0 C -12.189872,7.6158405e-7 -1.8596576,31.618633 5.8139648,34.999512 2.7878059,38.27601 1.1066243,41.85622 1.0927734,46.268555 V 93.00049 a 7,7 45 0 0 7,7 H 91.906 a 7,7 135 0 0 7,-7 V 46.268555 C 98.90593,41.862679 97.244286,38.283266 94.236328,34.999512 101.82857,31.625774 112.19451,-7.6165294e-7 49.999512,0 Z";

const sliceDimension = parseFloat($(".bread").css("--slice-dimension"));
const sliceBorderWidth = parseFloat($(".bread").css("--slice-border-width"));
const strokeWidth = sliceBorderWidth / (sliceDimension + 2 * sliceBorderWidth) * 100;

const bgClr = $(":root").css("--bread-clr1");
const breadClr1 = $(":root").css("--bread-clr1");
const breadClr2 = $(":root").css("--bread-clr2");
const breadClr3 = $(":root").css("--bread-clr3");
const shadowColor = breadClr3;
const shadowOpacity = 0.4;

function createSvgElement(tag, attributes = {}) {
	const element = document.createElementNS(SVG_NS, tag);
	for (const [name, value] of Object.entries(attributes)) {
		element.setAttribute(name, value);
	}
	return element;
}

$(".bread-slice").each(function() {
	var idx = $(this).index();
	var zIndex = 15 - idx;
	$(this).css("z-index", zIndex);

	var clipPath = createSvgElement("clipPath", { "id": `bread-path-clip-path-${idx}` });
	var breadPathClip = createSvgElement("path", { "d": breadData });
	clipPath.appendChild(breadPathClip);

	//* Bread shape
	var breadShape = createSvgElement("svg", {
		"viewBox": "0 0 100 100",
		"class": "bread-shape"
	});

	var breadShapeDefs = createSvgElement("defs");

	var patternId = "bread-texture-" + idx;
	var pattern = createSvgElement("pattern", {
		"id": patternId,
		"patternUnits": "objectBoundingBox",
		"patternContentUnits": "objectBoundingBox",
		"width": "1",
		"height": "1"
	});
	breadShapeDefs.appendChild(pattern);
	var texture = createSvgElement("image", {
		"x": "0",
		"y": "0",
		"width": "1",
		"height": "1",
		"preserveAspectRatio": "xMidYMid slice",
		"href": "img/bread/bread-texture.png"
	});
	pattern.appendChild(texture);

	breadShapeDefs.appendChild(clipPath);

	breadShape.appendChild(breadShapeDefs);

	breadShape.appendChild(createSvgElement("path", {
		"stroke": breadClr2,
		"stroke-width": 2 * strokeWidth,
		"stroke-linejoin": "round",
		"fill": `url(#${patternId})`,
		"d": breadData,
		"clip-path": `url(#bread-path-clip-path-${idx})`
	}));

	this.prepend(breadShape);

	//* Bread shadow
	var breadShadow = createSvgElement("svg", {
		"viewBox": "0 0 100 100",
		"class": "bread-shadow"
	});

	var breadShadowDefs = createSvgElement("defs");

	// Shadow overlay 1 gradient
	var gradient1Class = "bread-shadow-gradient-1";
	var gradient1Id = `${gradient1Class}-${idx}`;
	var gradient1 = createSvgElement("linearGradient", {
		"class": gradient1Class,
		"id": gradient1Id,
		"gradientTransform": "rotate(90)"
	});
	gradient1.appendChild(createSvgElement("stop", {
		"offset": "0%",
		"stop-color": shadowColor,
		"stop-opacity": 0
	}));
	gradient1.appendChild(createSvgElement("stop", {
		"offset": "20%",
		"stop-color": shadowColor,
		"stop-opacity": 0
	}));
	gradient1.appendChild(createSvgElement("stop", {
		"offset": "35%",
		"stop-color": shadowColor,
		"stop-opacity": shadowOpacity
	}));
	gradient1.appendChild(createSvgElement("stop", {
		"offset": "52.5%",
		"stop-color": shadowColor,
		"stop-opacity": 0
	}));
	gradient1.appendChild(createSvgElement("stop", {
		"offset": "93%",
		"stop-color": shadowColor,
		"stop-opacity": 0
	}));
	gradient1.appendChild(createSvgElement("stop", {
		"offset": "100%",
		"stop-color": shadowColor,
		"stop-opacity": shadowOpacity
	}));
	breadShadowDefs.appendChild(gradient1);

	// Shadow overlay 2 gradient
	var gradient2Class = "bread-shadow-gradient-2";
	var gradient2Id = `${gradient2Class}-${idx}`;
	var gradient2 = createSvgElement("linearGradient", {
		"class": gradient2Class,
		"id": gradient2Id
	});
	gradient2.appendChild(createSvgElement("stop", {
		"offset": "84%",
		"stop-color": shadowColor,
		"stop-opacity": 0
	}));
	gradient2.appendChild(createSvgElement("stop", {
		"offset": "100%",
		"stop-color": shadowColor,
		"stop-opacity": shadowOpacity
	}));
	breadShadowDefs.appendChild(gradient2);

	// Shadow overlay mobile gradient
	var gradientMobileClass = "bread-shadow-gradient-mobile";
	var gradientMobileId = `${gradientMobileClass}-${idx}`;
	var gradientMobile = createSvgElement("linearGradient", {
		"class": gradientMobileClass,
		"id": gradientMobileId,
		"gradientTransform": "rotate(90)"
	});
	gradientMobile.appendChild(createSvgElement("stop", {
		"offset": "84%",
		"stop-color": shadowColor,
		"stop-opacity": 0
	}));
	gradientMobile.appendChild(createSvgElement("stop", {
		"offset": "100%",
		"stop-color": shadowColor,
		"stop-opacity": shadowOpacity
	}));
	breadShadowDefs.appendChild(gradientMobile);

	breadShadow.appendChild(breadShadowDefs);

	// Background color path
	breadShadow.appendChild(createSvgElement("path", {
		"fill": breadClr2,
		"d": breadData,
	}));

	// Shadow overlay 1 path
	breadShadow.appendChild(createSvgElement("path", {
		"fill": `url(#${gradient1Id})`,
		"d": breadData
	}));

	// Shadow overlay 2 path
	breadShadow.appendChild(createSvgElement("path", {
		"fill": `url(#${gradient2Id})`,
		"d": breadData
	}));

	// Shadow overlay mobile path
	breadShadow.appendChild(createSvgElement("path", {
		"fill": `url(#${gradientMobileId})`,
		"d": breadData
	}));

	this.append(breadShadow);

	// Mobile visual fix
	$(this).append(`<div class="bread-shadow-mobile-fix"></div>`);
});


setInterval(function() {
	$(".bread-clip").each(function() {
		var min = -8;
		var max = 8;
		var randRotate = Math.floor(Math.random() * (max - min + 1) + min);
		$(this).css("transform", "rotate(" + randRotate + "deg)");
	});
}, 500);


var currentSlice = 1;
const sliceCount = $(".bread-slice").length;
const sliceDuration = parseFloat($(".bread-slice").css("--slice-duration"));
var sliceCoolDown = null;
function setSliceCoolDown() {
	sliceCoolDown = setTimeout(() => {
		sliceCoolDown = null;
	}, 1000 * sliceDuration);
}

function newSlice(slice) {
	$(".bread-slice").removeClass("current-slice");
	$(`.bread-slice:nth-child(${slice})`).addClass("current-slice");
}

$(document).keydown(function(e) {
	if (e.key.startsWith("Arrow")) {
		if (sliceCoolDown == null) {
			if (e.key == "ArrowLeft") {
				if (currentSlice > 1) currentSlice--;
			} else if (e.key == "ArrowRight") {
				if (currentSlice < sliceCount) currentSlice++;
			}

			setSliceCoolDown();
		}
	}

	newSlice(currentSlice);
});

$(document).on("swipedown", function() {
	if (sliceCoolDown == null) {
		if (currentSlice > 1) currentSlice--;
		newSlice(currentSlice);
		setSliceCoolDown();
	}
});

$(document).on("swipeup", function() {
	if (sliceCoolDown == null) {
		if (currentSlice < sliceCount) currentSlice++;
		newSlice(currentSlice);
		setSliceCoolDown();
	}
});


$(".clip-adj").click(function() {
	var clipInput = $(".clip-input");
	var clipCount = parseInt(clipInput.val());
	var min = parseInt($(this).parent().attr("data-min"));
	var max = parseInt($(this).parent().attr("data-max"));
	var $this = $(this);

	if ($this.is(".dec")) {
		if (clipCount > min) newClipCount = clipCount - 1;
	} else {
		if (clipCount < max) newClipCount = clipCount + 1;
	}

	clipInput.val(newClipCount);
});

$(".clip-input").on("propertychange input", function() {
	var min = parseInt($(this).parent().attr("data-min"));
	var max = parseInt($(this).parent().attr("data-max"));
	var formattedVal = parseInt($(this).val());

	if (formattedVal > max) formattedVal = max
	if (isNaN(formattedVal)) formattedVal = min;

	$(this).val(formattedVal);
});
