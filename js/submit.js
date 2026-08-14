emailjs.init({ publicKey: "wWd71XxZYhY1eYL9J" });

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

	slice.attr("data-state", "submitting");
	// setTimeout(() => slice.attr("data-state", "error"), 500);

	var templateParams = {
		"from_name": name,
		"from_email": email,
		"num_clips": numClips
	};
	emailjs.send("service_2tm9qnb", "template_o4xzp0c", templateParams).then(
		(response) => {
			slice.attr("data-state", "submitted");
			console.log("Email successfully sent.", response.status, response.text);
		},
		(error) => {
			slice.attr("data-state", "error");
			console.error("Email failed to send.", error);
		},
	);
});
