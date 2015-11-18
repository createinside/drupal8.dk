jQuery(function () {
	
	fix_search_form();
	fix_contact_form();
	fix_newsletter_form();
	fix_placeholder();
	fix_forms_on_firefox();
	
	function fix_search_form() {
		jQuery('.form-search').attr('placeholder', Drupal.t('Keywords'));
	}
	
	function fix_contact_form() {
		jQuery('.contact-form #edit-name').attr('placeholder', Drupal.t('Your name'));
		jQuery('.contact-form #edit-mail').attr('placeholder', Drupal.t('Your email address'));
		
		jQuery('.contact-form').on('submit', function (e) {
			var self = jQuery(this);
			var email = self.find('#edit-mail');
			if (!validateEmail(email.val())) {
				e.preventDefault();
				email.css({ 'border' : '2px solid #db1c2f' });
				return false;
			} else {
				
			}
		});
		
		jQuery('.contact-form #edit-preview').hide();
	}
	
	function fix_newsletter_form() {
		jQuery('form[id*="simplenews"]').on('submit', function (e) {
			var self = jQuery(this);
			var email = self.find('#edit-mail-0-value');
			if (!validateEmail(email.val())) {
				e.preventDefault();
				email.css({ 'border' : '2px solid #db1c2f' });
				return false;
			} else {
				
			}
		});
	}
	
	function validateEmail(email) {
		var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		return re.test(email);
	}

	function fix_placeholder() {
		(jQuery)('[placeholder]').focus(function() {
			var input = (jQuery)(this);
			if (input.val() == input.attr('placeholder')) {
				input.val('');
				input.removeClass('placeholder');
			}
		}).blur(function() {
			var input = (jQuery)(this);
			if (input.val() == '' || input.val() == input.attr('placeholder')) {
				input.addClass('placeholder');
				input.val(input.attr('placeholder'));
			}
		}).blur().parents('form').submit(function() {
			(jQuery)(this).find('[placeholder]').each(function() {
				var input = (jQuery)(this);
				if (input.val() == input.attr('placeholder')) {
					input.val('');
				}
			})
		});
	}
	
	function fix_forms_on_firefox() {
		var userAgent = window.navigator.userAgent;
		if (userAgent.indexOf('Firefox')) {
			// contact form
			var form = (jQuery)('#contact-message-feedback-form');
			var parent = form.parent();
			var formHTML = parent.html();
			parent.empty();
			parent.html(formHTML);
			
			// newletter form
			form = (jQuery)('[id*="simplenews-subscriptions"]');
			parent = form.parent();
			formHTML = parent.html();
			parent.empty();
			parent.html(formHTML);
		}
	}
});