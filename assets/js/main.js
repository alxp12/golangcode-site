/*!
 * GoLangCode Main JS
 */

"use strict";

// non-jQuery equivalent to $( function() {})
// https://stackoverflow.com/a/53601942/402585
function domReady(fn) {
    document.addEventListener("DOMContentLoaded", fn);
    if (document.readyState === "interactive" || document.readyState === "complete") {
        fn();
    }
}

domReady(function() { 


    // =============================
    // Lazy-load Disqus
    // =============================

    var disqusEl = document.getElementById("disqus_thread");
    if (disqusEl !== null) {
        if ("IntersectionObserver" in window) {
            startDisqusObserver();
        } else {
            loadDisqus(disqusEl.getAttribute('data-shortname'));
        }
    }

    // Look for when the user hits the comments before loading
    function startDisqusObserver() {
        var disqus_observer = new IntersectionObserver(function(entries) {
            if (entries[0].isIntersecting) {
                loadDisqus(entries[0].target.getAttribute('data-shortname'));
                disqus_observer.disconnect();
            }
        }, {threshold: [0], rootMargin: "0px 0px 300px 0px"});
        disqus_observer.observe(document.querySelector("#disqus_thread"));
    }

    // Load the script
    function loadDisqus(disqusShortname) {
        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
        dsq.src = '//' + disqusShortname + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    }

    // =============================
    // Tags
    // =============================

    var tagList = $('.headline .tags a').each( function(i, val) {
        $(val).data('original', $(val).css('color'));
    });
    var palette = ['maroon', 'red', 'Tomato', 'orange', 'LimeGreen', 'ForestGreen', 'MediumVioletRed', 'RebeccaPurple', 'SlateBlue', 'MidnightBlue'];
    tagList.parent().hover( function() {
        tagList.each( function(i, val) {
            $(val).css({color: palette[i]});
        });
    }, function() {
        tagList.each( function(i, val) {
            $(val).css({color: $(val).data('original')})
        });
    });

    // =============================
    // SEARCH
    // =============================

    $('.js-nav-search-button').click(function() {
        logEvent({ eventCategory: 'search', eventAction: 'click' });
        var area = $('.search-form');
        if (area.length > 0) {
            // Early return for pages with search form already open
            // e.g. home page and search page itself
            if (area.hasClass('non-close')) {
                area.find('input[type="text"]').focus();
                return false;
            }
            if (area.hasClass('closed')) {
                // Slide down form + focus
                area.removeClass('closed');
                area.show().find('input[type="text"]').focus();
            } else {
                // Close
                area.addClass('closed');
            }
            return false;
        }
    });

    // =============================
    // SUBSCRIBE
    // =============================

    $('.js-nav-subscribe-button').click( function() {
        logEvent({
            eventCategory: 'subscribe',
            eventAction: 'click',
            transport: 'beacon'
        });
    });

    // =============================
    // ABOUT
    // =============================

    var prompt = $('#cmd-prompt');
    if (prompt.length) {
        var cmds = [
            $('template#cmd-1').html().trim(),
            $('template#cmd-2').html().trim().replace('&gt;', '>').replace('&gt;', '>'),
            $('template#cmd-3').html().trim(),
            $('template#cmd-4').html().trim(),
            $('template#cmd-5').html().trim(),
        ];

        setTimeout( function() {
            prompt.val(cmds[0]);

            setTimeout( function() {
                prompt.val(prompt.val() + ' ' + cmds[1]);

                setTimeout( function() {
                    prompt.val(prompt.val() + ' ' + cmds[2]); // clear

                    setTimeout( function() {
                        prompt.val('$');

                        setTimeout( function() {
                            prompt.val(prompt.val() + ' ' + cmds[3]);

                            setTimeout( function() {
                                prompt.val(prompt.val() + "\n\n" + cmds[4] + ' ');
                                prompt.scrollTop(prompt[0].scrollHeight);
                                prompt.focus();
                            }, 700);
                        }, 700);
                    }, 700);
                }, 1500);
            }, 1500);
        }, 600);
    }

    // =============================
    // DONATE
    // =============================

    $('.dontate-button').submit( function() {
        logEvent({
            eventCategory: 'donate',
            eventAction: 'submit',
            transport: 'beacon'
        });
    });

    // =============================
    // COPY TO CLIPBOARD BUTTON
    // =============================

    document.querySelectorAll('pre').forEach( function(val) {

        if (!ClipboardJS.isSupported()) {
            return;
        }

        // skip line numbers
        if (val.className === 'chroma') {
            if (val.childNodes[0].className === "") {
                return;
            }
        }

        // non syntax highlighted - add wrapper to contain button
        if (val.parentNode.nodeName !== 'TD') {
            var wrapper = document.createElement('div');
            wrapper.className = 'highlight-no-syntax';
            val.parentNode.appendChild(wrapper);
            wrapper.appendChild(val);
        }

        var button = document.createElement('a');
        button.setAttribute('href', 'javascript:void(0);');
        button.setAttribute('data-tooltip', 'Copy to Clipboard');
        button.innerHTML = '<i class="icon-docs"></i>';
        button.className = 'pre-copy-to-clipboard tooltip-bottom';
        val.parentNode.insertBefore(button, val);

        var clip = new ClipboardJS(button, {
            text: function(trigger) {
                return trigger.parentNode.innerText;
            }
        });

        clip.on('success', function(e) {
            e.trigger.setAttribute('data-tooltip', 'Copied!');
            setTimeout( function() {
                e.trigger.setAttribute('data-tooltip', 'Copy to Clipboard');
            }, 2000);
        });

    });

});


function logEvent(opt) {
    // Ignore local
    if (["localhost", "127.0.0.1", ""].includes(window.location.hostname)) {
        console.log("Analytics ignored as it's localhost");
        return;
    }
    // Ignore DNT
    if (navigator.doNotTrack) {
        console.log("Analytics ignored as DNT is enabled for this user");
        return;
    }
    // Only run if ganalytics is loaded and has search term
    if (typeof ga === 'function') {
        ga('send', opt);
    }
}