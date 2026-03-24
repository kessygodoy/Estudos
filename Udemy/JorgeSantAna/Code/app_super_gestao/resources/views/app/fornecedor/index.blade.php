<h3>Fornecedor</h3>

@php
    
@endphp
 
{{-- @dd($fornecedores) --}}

@if(count($fornecedores) >0 && count($fornecedores) <=10)
    <h3>Existem alguns fornecedores cadastrados</h3>
@elseif(count($fornecedores) > 10)
    <h3>Existem varios fornecedores cadastrados</h3>
@else
    <h3>Nenhum fornecedor cadastrado</h3>
@endif

Fornecedor: {{ $fornecedores[0]['nome'] }}
<br>
Status: {{ $fornecedores[0]['status'] }}
@if( !($fornecedores[0]['status'] == 'S'))
    Inativo
@else
    Ativo
@endif

@unless($fornecedores[0]['status'] == 'S')
    Inativo
@else
    Ativo
@endunless