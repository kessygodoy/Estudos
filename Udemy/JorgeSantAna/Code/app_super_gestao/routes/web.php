<?php

use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return "Olá seja bem vindo ao curso";
// });

Route::get('/', [\App\Http\Controllers\PrincipalController::class , 'principal']);

Route::get('/sobre-nos', [\App\Http\Controllers\SobreNosController::class , 'sobreNos']);

Route::get('/contato', [App\Http\Controllers\ContatoController::class , 'contato']);


Route::get('/contato/{nome}/{categoria}/{assunto?}/{mensagem?}', function (string $nome, string $categoria, string $assunto = 'assunto não informado', string $mensagem = 'mensagem não informada') {
    echo "Estamos aqui: $nome - $categoria - $assunto - $mensagem";
});