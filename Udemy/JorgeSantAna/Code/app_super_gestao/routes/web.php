<?php

use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return "Olá seja bem vindo ao curso";
// });

Route::get('/', [\App\Http\Controllers\PrincipalController::class , 'principal'])->name('site.principal');
Route::get('/sobre-nos', [\App\Http\Controllers\SobreNosController::class , 'sobreNos'])->name('site.sobre-nos');
Route::get('/contato', [App\Http\Controllers\ContatoController::class , 'contato'])->name('site.contato');
Route::get("/login", function () {
    return "Login";
});

//app
Route::prefix('app')->group(function () {
    Route::get("/clientes", function () {
            return "Clientes";
        }
        )->name('app.clientes');
        Route::get("/fornecedores", function () {
            return "Fornecedores";
        }
        )->name('app.fornecedores');
        Route::get("/produtos", function () {
            return "Produtos";
        }
        )->name('app.produtos');
    });

Route::get('/rota1', function () {
    echo "<h1>Rota 1</h1>";
})->name('site.rota1');

// Route::get('/rota2', function () {
//     echo "<h1>Rota 2</h1>";
// })->name('site.rota2');

Route::redirect('rota2', 'rota1');