$(document).ready(function() {
    $('#addbutton').click(function() {
    	$("#select").append($('<option>', {
          	    value: ID,
                text: "Screen"+ID.toString()            
        }))

        $("#select").val(ID).change();

        AddScreen(ID);
        ID=ID+1;
    })

    $('#deletebutton').click(function() {
        var currentID=$('select').val();

        if(currentID!=null){
            console.log(currentID);
            $('#select option').each(function() {
                if ($(this).val() == currentID) {
                    $(this).remove();
                    RemoveScreen(currentID);
                }
            });
        }
    })
})