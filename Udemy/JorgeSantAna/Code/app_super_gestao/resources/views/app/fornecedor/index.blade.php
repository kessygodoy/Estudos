<h3>Fornecedor</h3>

@php
    
@endphp
 
{{-- @dd($fornecedores) --}}

@isset($fornecedores) <!-- verifica se a variavel existe -->
@if(count($fornecedores) >0 && count($fornecedores) <=10)
    <h3>Existem alguns fornecedores cadastrados</h3>
@elseif(count($fornecedores) > 10)
    <h3>Existem varios fornecedores cadastrados</h3>
@else
    <h3>Nenhum fornecedor cadastrado</h3>
@endif


Fornecedor: {{ $fornecedores[1]['nome'] }}
<br>
Status:
@if( !($fornecedores[1]['status'] == 'S'))
    Inativo
@else
    Ativo
@endif
<br>
@isset($fornecedores[0]['cnpj'])
    CNPJ: {{ $fornecedores[1]['cnpj'] ?? 'Dado não foi preenchido'}}
    {{-- @empty($fornecedores[0]['cnpj'])
        Não informado
    @endempty --}}
@endisset

@endisset

{{-- {{ $fornecedores[0]['cnpj'] ? 'Não informado' : 'CNPJ informado' }} --}}

