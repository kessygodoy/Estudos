<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FornecedorController extends Controller
{
    public function index()
    {
        $fornecedores = [
            0 => ['nome' => 'Fornecedor 1', 'site' => 'www.fornecedor1.com.br'],
            1 => ['nome' => 'Fornecedor 2', 'site' => 'www.fornecedor2.com.br'],
            2 => ['nome' => 'Fornecedor 3', 'site' => 'www.fornecedor3.com.br'],
            3=> ['nome'=> 'Fornecedor 4', 'site'=> 'www.fornecedor4.com.br'],
            4=> ['nome'=> 'Fornecedor 5', 'site'=> 'www.fornecedor5.com.br'],
            5=> ['nome'=> 'Fornecedor 6', 'site'=> 'www.fornecedor6.com.br'],
            6=> ['nome'=> 'Fornecedor 7', 'site'=> 'www.fornecedor7.com.br'],
            7=> ['nome'=> 'Fornecedor 8', 'site'=> 'www.fornecedor8.com.br'],
            8=> ['nome'=> 'Fornecedor 9', 'site'=> 'www.fornecedor9.com.br'],
            9=> ['nome'=> 'Fornecedor 10', 'site'=> 'www.fornecedor10.com.br'],
            10=> ['nome'=> 'Fornecedor 11', 'site'=> 'www.fornecedor11.com.br'],
        ];
        return view('app.fornecedor.index', compact('fornecedores'));
    }
}
