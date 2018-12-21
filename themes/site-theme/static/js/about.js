$(document).ready( function() {

    var prompt = $('#cmd-prompt');
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

});