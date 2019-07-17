$(function () {
    console.log("Jquery esta funcionando");
    $('#task-result').hide();
    fetchTask();

    $('#search').keyup(function (e) {
        if ($('#search').val()) {
            let search = $('#search').val();
            $.ajax({
                url: 'task-search.php',
                type: 'POST',
                data: { search },
                success: function (response) {
                    let task = JSON.parse(response);
                    let template = '';

                    task.forEach(task => {
                        template += `<li>
                        ${task.name}
                    </li>`
                    });

                    $('#container').html(template);
                    $('#task-result').show();
                }
            })
        }
    })

    $('#task-form').submit(function (e) {
        const postData = {
            name: $('#name').val(),
            description: $('#description').val(),
        }

        $.post('task-add.php', postData, function (response) {
            fetchTask();
            $('#task-form').trigger('reset');
        });
        e.preventDefault();

    });

    function fetchTask() {
        $.ajax({
            url: 'task-list.php',
            type: 'GET',
            success: function (response) {
                let task = JSON.parse(response);
                let template = '';
                task.forEach(task => {
                    template += `
                        <tr>
                            <td>${task.id}</td>
                            <td>${task.name}</td>
                            <td>${task.description}</td>
                        </tr>
                    `
                });
                $('#tasks').html(template);
            }
        });
    }

});