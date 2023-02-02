$(".form-input").on("input", function() {
	var slice = $(this).closest(".bread-slice");
	var nameVal = $(".name-input").val();
	var emailVal = $(".email-input").val();

	var containsAt = emailVal.indexOf("@") >= 0;
	var containsDot = emailVal.indexOf(".") >= 0;

	if (nameVal.length > 0 && containsAt && containsDot) slice.addClass("ready-to-submit");
	else slice.removeClass("ready-to-submit");
});



$(".submit-btn").click(function() {
	var slice = $(this).closest(".bread-slice");
	var name = $(".name-input").val();
	var email = $(".email-input").val();
	var numClips = $(".clip-input").val();

	$.ajax({
		type: "GET",
		data: {
			name: name,
			email: email,
			numClips: numClips
		},
		url: "https://sendmebreadclips-backend.000webhostapp.com/mail.php",
		success: function(xhr) {
			slice.addClass("submitted");
		}
	});
});