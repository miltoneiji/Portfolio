!function(l){"use strict";function d(t){return t.is('[type="checkbox"]')?t.prop("checked"):t.is('[type="radio"]')?!!l('[name="'+t.attr("name")+'"]:checked').length:t.val()}function e(a){return this.each(function(){var t=l(this),e=l.extend({},i.DEFAULTS,t.data(),"object"==typeof a&&a),r=t.data("bs.validator");(r||"destroy"!=a)&&(r||t.data("bs.validator",r=new i(this,e)),"string"==typeof a&&r[a]())})}var i=function(t,e){this.options=e,this.validators=l.extend({},i.VALIDATORS,e.custom),this.$element=l(t),this.$btn=l('button[type="submit"], input[type="submit"]').filter('[form="'+this.$element.attr("id")+'"]').add(this.$element.find('input[type="submit"], button[type="submit"]')),this.update(),this.$element.on("input.bs.validator change.bs.validator focusout.bs.validator",l.proxy(this.onInput,this)),this.$element.on("submit.bs.validator",l.proxy(this.onSubmit,this)),this.$element.on("reset.bs.validator",l.proxy(this.reset,this)),this.$element.find("[data-match]").each(function(){var t=l(this),e=t.data("match");l(e).on("input.bs.validator",function(){d(t)&&t.trigger("input.bs.validator")})}),this.$inputs.filter(function(){return d(l(this))}).trigger("focusout"),this.$element.attr("novalidate",!0),this.toggleSubmit()};i.VERSION="0.11.5",i.INPUT_SELECTOR=':input:not([type="hidden"], [type="submit"], [type="reset"], button)',i.FOCUS_OFFSET=80,i.DEFAULTS={delay:500,html:!1,disable:!0,focus:!0,custom:{},errors:{match:"Does not match",minlength:"Not long enough"},feedback:{success:"glyphicon-ok",error:"glyphicon-remove"}},i.VALIDATORS={"native":function(t){var e=t[0];return e.checkValidity?!e.checkValidity()&&!e.validity.valid&&(e.validationMessage||"error!"):void 0},match:function(t){var e=t.data("match");return t.val()!==l(e).val()&&i.DEFAULTS.errors.match},minlength:function(t){var e=t.data("minlength");return t.val().length<e&&i.DEFAULTS.errors.minlength}},i.prototype.update=function(){return this.$inputs=this.$element.find(i.INPUT_SELECTOR).add(this.$element.find('[data-validate="true"]')).not(this.$element.find('[data-validate="false"]')),this},i.prototype.onInput=function(t){var e=this,r=l(t.target),a="focusout"!==t.type;this.$inputs.is(r)&&this.validateInput(r,a).done(function(){e.toggleSubmit()})},i.prototype.validateInput=function(e,r){var a=(d(e),e.data("bs.validator.errors"));e.is('[type="radio"]')&&(e=this.$element.find('input[name="'+e.attr("name")+'"]'));var i=l.Event("validate.bs.validator",{relatedTarget:e[0]});if(this.$element.trigger(i),!i.isDefaultPrevented()){var o=this;return this.runValidators(e).done(function(t){e.data("bs.validator.errors",t),t.length?r?o.defer(e,o.showErrors):o.showErrors(e):o.clearErrors(e),a&&t.toString()===a.toString()||(i=t.length?l.Event("invalid.bs.validator",{relatedTarget:e[0],detail:t}):l.Event("valid.bs.validator",{relatedTarget:e[0],detail:a}),o.$element.trigger(i)),o.toggleSubmit(),o.$element.trigger(l.Event("validated.bs.validator",{relatedTarget:e[0]}))})}},i.prototype.runValidators=function(a){function e(t){return a.data(t+"-error")}function r(){var t=a[0].validity;return t.typeMismatch?a.data("type-error"):t.patternMismatch?a.data("pattern-error"):t.stepMismatch?a.data("step-error"):t.rangeOverflow?a.data("max-error"):t.rangeUnderflow?a.data("min-error"):t.valueMissing?a.data("required-error"):null}function i(){return a.data("error")}function o(t){return e(t)||r()||i()}var s=[],n=l.Deferred();return a.data("bs.validator.deferred")&&a.data("bs.validator.deferred").reject(),a.data("bs.validator.deferred",n),l.each(this.validators,l.proxy(function(t,e){var r=null;(d(a)||a.attr("required"))&&(a.data(t)||"native"==t)&&(r=e.call(this,a))&&(r=o(t)||r,!~s.indexOf(r)&&s.push(r))},this)),!s.length&&d(a)&&a.data("remote")?this.defer(a,function(){var t={};t[a.attr("name")]=d(a),l.get(a.data("remote"),t).fail(function(t,e,r){s.push(o("remote")||r)}).always(function(){n.resolve(s)})}):n.resolve(s),n.promise()},i.prototype.validate=function(){var t=this;return l.when(this.$inputs.map(function(){return t.validateInput(l(this),!1)})).then(function(){t.toggleSubmit(),t.focusError()}),this},i.prototype.focusError=function(){if(this.options.focus){var t=this.$element.find(".has-error:first :input");0!==t.length&&(l("html, body").animate({scrollTop:t.offset().top-i.FOCUS_OFFSET},250),t.focus())}},i.prototype.showErrors=function(t){var e=this.options.html?"html":"text",r=t.data("bs.validator.errors"),a=t.closest(".form-group"),i=a.find(".help-block.with-errors"),o=a.find(".form-control-feedback");r.length&&(r=l("<ul/>").addClass("list-unstyled").append(l.map(r,function(t){return l("<li/>")[e](t)})),void 0===i.data("bs.validator.originalContent")&&i.data("bs.validator.originalContent",i.html()),i.empty().append(r),a.addClass("has-error has-danger"),a.hasClass("has-feedback")&&o.removeClass(this.options.feedback.success)&&o.addClass(this.options.feedback.error)&&a.removeClass("has-success"))},i.prototype.clearErrors=function(t){var e=t.closest(".form-group"),r=e.find(".help-block.with-errors"),a=e.find(".form-control-feedback");r.html(r.data("bs.validator.originalContent")),e.removeClass("has-error has-danger has-success"),e.hasClass("has-feedback")&&a.removeClass(this.options.feedback.error)&&a.removeClass(this.options.feedback.success)&&d(t)&&a.addClass(this.options.feedback.success)&&e.addClass("has-success")},i.prototype.hasErrors=function(){function t(){return!!(l(this).data("bs.validator.errors")||[]).length}return!!this.$inputs.filter(t).length},i.prototype.isIncomplete=function(){function t(){var t=d(l(this));return!("string"==typeof t?l.trim(t):t)}return!!this.$inputs.filter("[required]").filter(t).length},i.prototype.onSubmit=function(t){this.validate(),(this.isIncomplete()||this.hasErrors())&&t.preventDefault()},i.prototype.toggleSubmit=function(){this.options.disable&&this.$btn.toggleClass("disabled",this.isIncomplete()||this.hasErrors())},i.prototype.defer=function(t,e){return e=l.proxy(e,this,t),this.options.delay?(window.clearTimeout(t.data("bs.validator.timeout")),void t.data("bs.validator.timeout",window.setTimeout(e,this.options.delay))):e()},i.prototype.reset=function(){return this.$element.find(".form-control-feedback").removeClass(this.options.feedback.error).removeClass(this.options.feedback.success),this.$inputs.removeData(["bs.validator.errors","bs.validator.deferred"]).each(function(){var t=l(this),e=t.data("bs.validator.timeout");window.clearTimeout(e)&&t.removeData("bs.validator.timeout")}),this.$element.find(".help-block.with-errors").each(function(){var t=l(this),e=t.data("bs.validator.originalContent");t.removeData("bs.validator.originalContent").html(e)}),this.$btn.removeClass("disabled"),this.$element.find(".has-error, .has-danger, .has-success").removeClass("has-error has-danger has-success"),this},i.prototype.destroy=function(){return this.reset(),this.$element.removeAttr("novalidate").removeData("bs.validator").off(".bs.validator"),this.$inputs.off(".bs.validator"),this.options=null,this.validators=null,this.$element=null,this.$btn=null,this};var t=l.fn.validator;l.fn.validator=e,l.fn.validator.Constructor=i,l.fn.validator.noConflict=function(){return l.fn.validator=t,this},l(window).on("load",function(){l('form[data-toggle="validator"]').each(function(){var t=l(this);e.call(t,t.data())})})}(jQuery);