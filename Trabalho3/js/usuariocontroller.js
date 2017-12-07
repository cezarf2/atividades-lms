let listUsers;

function getUsers(){
    $.ajax({
        type: "GET",
        url: "http://rest.learncode.academy/api/mirrorfashion1/users",
        success: function(data){
            if(data != null){
                listUsers = data;
            }
        }
    });    
}