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
    <br>
    Telefone: {{ $fornecedores[1]['ddd'] . ' - ' . $fornecedores[1]['telefone'] ?? 'Dado não foi preenchido'}}
    @switch($fornecedores[3]['ddd'])
        @case('11')
            São Paulo - SP
            @break
        @case('14')
            Bauru - SP
            @break
        @case('85')
            Fortaleza - CE
            @break
        @case('32')
            Juiz de Fora - MG
            @break
        @case('47')
            Joinville - SC
            @break
        @default
            DDD não identificado
    @endswitch
@endisset

@endisset

