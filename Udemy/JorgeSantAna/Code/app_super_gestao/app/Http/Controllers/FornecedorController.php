<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FornecedorController extends Controller
{
    public function index()
    {
        $fornecedores = [
            0 => ['nome' => 'Fornecedor 1', 'site' => 'www.fornecedor1.com.br', 'status'=> 'S', 'cnpj' => '561645656561'],
            1 => ['nome' => 'Fornecedor 2', 'site' => 'www.fornecedor2.com.br', 'status'=> 'N'],
            2 => ['nome' => 'Fornecedor 3', 'site' => 'www.fornecedor3.com.br', 'status'=> 'S', 'cnpj' => '00.000.000/0001-00'],
            3=> ['nome'=> 'Fornecedor 4', 'site'=> 'www.fornecedor4.com.br', 'status'=> 'N', 'cnpj' => '00.000.000/0001-00'],
            4=> ['nome'=> 'Fornecedor 5', 'site'=> 'www.fornecedor5.com.br', 'status'=> 'S', 'cnpj' => '00.000.000/0001-00'],
            5=> ['nome'=> 'Fornecedor 6', 'site'=> 'www.fornecedor6.com.br', 'status'=> 'N', 'cnpj' => '00.000.000/0001-00'],
            6=> ['nome'=> 'Fornecedor 7', 'site'=> 'www.fornecedor7.com.br', 'status'=> 'S', 'cnpj' => '00.000.000/0001-00'],
            7=> ['nome'=> 'Fornecedor 8', 'site'=> 'www.fornecedor8.com.br', 'status'=> 'S', 'cnpj' => '00.000.000/0001-00'],
            8=> ['nome'=> 'Fornecedor 9', 'site'=> 'www.fornecedor9.com.br', 'status'=> 'N', 'cnpj' => '00.000.000/0001-00'],
            9=> ['nome'=> 'Fornecedor 10', 'site'=> 'www.fornecedor10.com.br', 'status'=> 'S', 'cnpj' => '00.000.000/0001-00'],
            10=> ['nome'=> 'Fornecedor 11', 'site'=> 'www.fornecedor11.com.br', 'status'=> 'N', 'cnpj' => '00.000.000/0001-00'],
        ];
        return view('app.fornecedor.index', compact('fornecedores'));
    }
}
