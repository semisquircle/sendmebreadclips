$(".name-input").on("propertychange input", function() {
	var val = $(this).val();
	var formattedVal = val.replace(/\d+/g, "");
		formattedVal = formattedVal.replaceAll(".", "");
		formattedVal = formattedVal.replaceAll(",", "");
		formattedVal = formattedVal.substr(0, 1).toUpperCase() + val.substr(1).toLowerCase();

	$(this).val(formattedVal);
});



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

	var data = {
		service_id: "service_2tm9qnb",
		template_id: "template_o4xzp0c",
		user_id: "wWd71XxZYhY1eYL9J",
		template_params: {
			"from_name": name,
			"from_email": email,
			"num_clips": numClips
		}
	};

	$.ajax({
		url: "https://api.emailjs.com/api/v1.0/email/send",
		type: "POST",
		data: JSON.stringify(data),
		contentType: "application/json",
		success: function(xhr) {
			slice.addClass("submitted");
		}
	});
});
