<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Criando a tabela filiais
        Schema::create('filiais', function (Blueprint $table) {
            $table->id();
            $table->string('filial', 30);
            $table->timestamps();
        });

        //criando a tabela produto_filiais
        Schema::create('produto_filiais', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('produto_id');
            $table->unsignedBigInteger('filial_id');
            $table->decimal('preco_venda', 8, 2)->default(0);
            $table->integer('estoque_minimo');
            $table->integer('estoque_maximo');
            $table->timestamps();

            //constraint
            $table->foreign('produto_id')->references('id')->on('produtos');
            $table->foreign('filial_id')->references('id')->on('filiais');
           
        });
        //removendo colunas da tabela produto
         Schema::table('produtos', function (Blueprint $table) {
                $table->dropColumn('preco_venda');
                $table->dropColumn('estoque_minimo');
                $table->dropColumn('estoque_maximo');
            });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //adicionar colunas da tabela produto
         Schema::table('produtos', function (Blueprint $table) {
                $table->decimal('preco_venda', 8, 2)->default(0);
                $table->integer('estoque_minimo');
                $table->integer('estoque_maximo');
            });
            Schema::dropIfExists('produto_filiais');
            Schema::dropIfExists('filiais');
    }
};
