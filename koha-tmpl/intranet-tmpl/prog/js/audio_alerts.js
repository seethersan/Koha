$( document ).ready(function() {
    var checkboxes = $("#delete-alert-form input[type='checkbox']");
    var checkedcheckboxes = 0;
    checkboxes.on("change",function(){
        if( $("#delete-alert-form").find("input:checked").length > 0){
            checkedcheckboxes = 1;
            $("#delete-alerts").removeClass("disabled");
        } else {
            checkedcheckboxes = 0;
            $("#delete-alerts").addClass("disabled");
        }
    });

    var soundfield = $("#sound");
    var playsound = $('#play-sound');

    soundfield.on("change",function(){
        enablePlayButton($(this).val(),playsound);
    });

    $(".edit-alert").hide();
    $("#new-alert-form").hide();

    $("#newalert").on("click",function(e){
        e.preventDefault();
        $("#new-alert-form").show();
        $("#toolbar, #delete-alert-form").hide();
    });

    $('#koha-sounds').on('change', function() {
        soundfield.val( this.value );
        enablePlayButton($(this).val(),playsound);
    });

    playsound.on('click', function(e) {
        e.preventDefault();
        if( soundfield.val() !== '' ){
            playSound( soundfield.val() );
        } else {
            alert( MSG_AUDIO_EMPTY_SOUND );
        }
    });

    $('#cancel-edit').on('click', function(e) {
        e.preventDefault();

        enablePlayButton("",playsound);
        $("#id").val("");
        $("#selector").val("");
        soundfield.val("");
        $("#koha-sounds").val("");

        $("#toolbar").show();
        $(".edit-alert").hide();
        $(".create-alert").show();
        $("#new-alert-form").hide();
        $("#delete-alert-form").show();
    });

    $('#delete-alert-form').on('submit', function() {
        if( checkedcheckboxes == 1 ){
            return confirm( MSG_AUDIO_CONFIRM_DELETE );
        } else {
            alert( MSG_AUDIO_CHECK_CHECKBOXES );
            return false;
        }
    });
});

function enablePlayButton(sound_field_value,playbutton){
    if( sound_field_value !== '' ){
        playbutton.removeClass("disabled");
    } else {
        playbutton.addClass("disabled");
    }
}

function EditAlert( elt, id, precedence, selector, sound ) {
    $("#new-alert-form").show();
    $("#delete-alert-form").hide();
    $("#toolbar").hide();
    $(".create-alert").hide();
    $(".edit-alert").show();
    $("#id").val(id);
    $("#selector").val(selector);
    $("#sound").val(sound);
    $("#koha-sounds").val(sound);
    enablePlayButton(sound,$('#play-sound'));
}
