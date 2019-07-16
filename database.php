<?php

    $connection = mysqli_connect(
        'localhost',
        'root',
        'password',
        'taskweb'
    );

    if($connection) {
        echo 'Database is connected';
    }else {
        echo 'Error en la conexión';
    }

?>