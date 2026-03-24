<h3>Fornecedor</h3>

@php

@endphp

{{-- @dd($fornecedores) --}}

@isset($fornecedores) <!-- verifica se a variavel existe -->
    @if(count($fornecedores) > 0 && count($fornecedores) <= 10)
        <h3>Existem alguns fornecedores cadastrados</h3>
    @elseif(count($fornecedores) > 10)
        <h3>Existem varios fornecedores cadastrados</h3>
    @else
        <h3>Nenhum fornecedor cadastrado</h3>
    @endif


    Fornecedor: {{ $fornecedores[1]['nome'] }}
    <br>
    Status:
    @if(!($fornecedores[1]['status'] == 'S'))
        Inativo
    @else
        Ativo
    @endif
    <br>
    @isset($fornecedores[0]['cnpj'])
        @php $i = 0 @endphp
        @while(isset($fornecedores[$i]['nome']))
            CNPJ: {{ $fornecedores[$i]['cnpj'] ?? 'Dado não foi preenchido'}}
            <br>
            Telefone: {{ $fornecedores[$i]['ddd'] . ' - ' . $fornecedores[$i]['telefone'] ?? 'Dado não foi preenchido'}}
            <hr>
            @php $i++ @endphp
        @endwhile
    @endisset
    <br>

@endisset