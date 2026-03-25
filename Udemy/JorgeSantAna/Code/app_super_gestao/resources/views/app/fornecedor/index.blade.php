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


    <br>
    @isset($fornecedores[0]['cnpj'])
        @forelse($fornecedores as $indice => $fornecedor)
            Iteração atual: {{ $loop->iteration }}
            Fornecedor: {{ $fornecedor['nome'] }}
            <br>
            Status:
            @if(!($fornecedor['status'] == 'S'))
                Inativo
            @else
                Ativo
            @endif
            <br>
            CNPJ: {{ $fornecedor['cnpj'] ?? 'Dado não foi preenchido'}}
            <br>
            Telefone: {{ $fornecedor['ddd'] . ' - ' . $fornecedor['telefone'] ?? 'Dado não foi preenchido'}}

            @if($loop->first)
                Primeira iteração
            @endif
            @if($loop->last)
                Última iteração do loop
                <br>
                Total de registros: {{ $loop->count }}

            @endif
            <hr>
        @empty
            Não existem fornecedores cadastrados
        @endforelse
    @endisset
    <br>

@endisset